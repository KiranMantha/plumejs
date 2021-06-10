/**
 * Useful Links
 * https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
 * https://www.programmersought.com/article/9331587598/
 * https://medium.com/@trukrs/tagged-template-literal-for-html-templates-4820cf5538f9
 */

const isAttributeRegex = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/;
const isNodeRegex = /<[a-z][^>]+$/i;
const attributePrefix = 'attr';
const attributeRegex = /^attr([^ ]+)/;
const insertNodePrefix = 'insertNode';
const insertNodeRegex = /^insertNode([^ ]+)/;

const _createFragment = (markup: string): DocumentFragment => {
  const temp = document.createElement('div');
  temp.innerHTML = markup;
  const frag = document.createDocumentFragment();
  const children = Array.prototype.slice.apply(temp.childNodes);
  children.map((el) => frag.appendChild(el));
  return frag;
};

const _bindFragments = (fragment: DocumentFragment, values: Array<any>) => {
  const elementsWalker = document.createTreeWalker(fragment, NodeFilter.SHOW_ELEMENT, null);
  let node = elementsWalker.nextNode() as unknown as HTMLElement;
  while (node) {
    if (node.hasAttributes()) {
      const customAttributes = Array.from(node.attributes).filter((attr) => attributeRegex.test(attr.nodeName));
      for (const { nodeName, nodeValue } of customAttributes) {
        const i = attributeRegex.exec(nodeName)[1];
        switch (true) {
          case /^on+/.test(nodeValue): {
            const eventName = nodeValue.slice(2).toLowerCase();
            node.removeEventListener(eventName, values[i]);
            node.addEventListener(eventName, values[i]);
            ((node as any).eventListenersMap || ((node as any).eventListenersMap = {}))[eventName] = values[i];
            break;
          }
          case /ref/.test(nodeValue): {
            values[i](node);
            break;
          }
          case /^data-+/.test(nodeValue):
          case /^attr-+/.test(nodeValue): {
            break;
          }
          case /class/.test(nodeValue): {
            node.classList.add(values[i]);
            break;
          }
          case /value/.test(nodeValue): {
            (node as any).value = values[i];
            break;
          }
          default: {
            node[nodeValue] = values[i];
          }
        }
        node.removeAttribute(nodeName);
      }
    }
    node = elementsWalker.nextNode() as unknown as HTMLElement;
  }
};

const _replaceInsertNodeComments = (fragment: DocumentFragment, values: Array<any>) => {
  const commentsWalker = document.createTreeWalker(fragment, NodeFilter.SHOW_COMMENT, null);
  const commentNodes = [];
  let match;
  while (commentsWalker.nextNode()) {
    commentNodes.push(commentsWalker.currentNode);
  }
  const { length } = commentNodes;
  for (let i = 0; i < length; i++) {
    const node = commentNodes[i];
    if ((match = insertNodeRegex.exec(node.data))) {
      const nodesList = Array.isArray(values[match[1]]) ? values[match[1]] : [values[match[1]]];
      node.replaceWith(...nodesList);
    }
  }
};

const html = (templates: TemplateStringsArray, ...values: Array<any>): DocumentFragment => {
  let result = '';
  const { length } = templates;

  for (let i = 1; i < length; i++) {
    const variable = values[i - 1];
    let isAttributePart = false;
    result += templates[i - 1];
    if (isAttributeRegex.test(result) && isNodeRegex.test(result)) {
      result = result.replace(
        isAttributeRegex,
        (_, $1, $2) => `${attributePrefix}${i - 1}=${$2 || '"'}${$1}${$2 ? '' : '"'}`
      );
      isAttributePart = true;
    }

    if (!isAttributePart) {
      if (Array.isArray(variable) || variable instanceof DocumentFragment) {
        result += `<!--${insertNodePrefix}${i - 1}-->`;
      } else {
        result += variable;
      }
    }
  }

  result += templates[length - 1];
  const fragment = _createFragment(result.trim());
  _bindFragments(fragment, values);
  _replaceInsertNodeComments(fragment, values);
  return fragment;
};

const render = (where: HTMLElement, what: DocumentFragment) => {
  where.textContent = '';
  where.appendChild(what);
};

export { html, render };
