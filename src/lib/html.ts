const { html, render } = (() => {
  const isAttributeRegex = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/;
  const isNodeRegex = /<[a-z][^>]+$/i;
  const attributePrefix = 'attr';
  const attributeRegex = /^attr([^ ]+)/;
  const insertNodePrefix = 'insertNode';
  const insertNodeRegex = /^insertNode([^ ]+)/;

  const _sanitize = (data) => {
    const tagsToReplace = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '(': '%28',
      ')': '%29'
    };
    let str = JSON.stringify(data);
    const replaceTag = (tag) => tagsToReplace[tag] || tag;
    const safe_tags_replace = (str) => str.replace(/[&<>\(\)]/g, replaceTag);
    str = safe_tags_replace(str);
    return JSON.parse(str);
  };

  const _setValuesForDropdown = (node: HTMLSelectElement, value) => {
    const options = node.options,
      values = Array.isArray(value) ? value : [value];
    let optionSet,
      option,
      i = options.length;

    while (i--) {
      option = options[i];
      const value = option.getAttribute('value') ?? (option.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(' ');
      if ((option.selected = values.indexOf(value) > -1)) {
        optionSet = true;
      }
    }

    // Force browsers to behave consistently when non-matching value is set
    if (!optionSet) {
      node.selectedIndex = -1;
    }
  };

  const _createFragment = (markup: string): DocumentFragment => {
    const temp = document.createElement('template');
    temp.innerHTML = markup;
    return temp.content;
  };

  const _bindFragments = (fragment: DocumentFragment, values: Array<any>) => {
    const elementsWalker = document.createTreeWalker(fragment, NodeFilter.SHOW_ELEMENT, null);
    let node = elementsWalker.nextNode() as unknown as HTMLElement;
    while (node) {
      (node as any).eventSubscriptions = [];
      if (node.hasAttributes()) {
        const customAttributes = Array.from(node.attributes).filter((attr) => attributeRegex.test(attr.nodeName));
        for (const { nodeName, nodeValue } of customAttributes) {
          const i = attributeRegex.exec(nodeName)[1];
          switch (true) {
            case /^on+/.test(nodeValue): {
              const eventName = nodeValue.slice(2).toLowerCase();
              node.removeEventListener(eventName, values[i]);
              node.addEventListener(eventName, values[i]);
              break;
            }
            case /ref/.test(nodeValue): {
              values[i](node);
              break;
            }
            case /^data-+/.test(nodeValue): {
              node.setAttribute(`data-${nodeValue}`, _sanitize(values[i]));
              break;
            }
            case /^aria-+/.test(nodeValue): {
              node.setAttribute(`aria-${nodeValue}`, _sanitize(values[i]));
              break;
            }
            case /class/.test(nodeValue): {
              if (values[i]) {
                node.classList.add(...values[i].split(' '));
              } else {
                node.setAttribute('class', '');
              }
              break;
            }
            case /value/.test(nodeValue): {
              if (node.nodeName.toLowerCase() === 'select') {
                _setValuesForDropdown(node as any, values[i]);
              } else {
                (node as any).value = _sanitize(values[i]);
              }
              break;
            }
            case /disabled/.test(nodeValue):
            case /checked/.test(nodeValue): {
              if (values[i]) {
                node.setAttribute(nodeValue, values[i]);
              } else {
                node.removeAttribute(nodeValue);
              }
              break;
            }
            default: {
              node.setAttribute(nodeValue, _sanitize(values[i]));
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
    let node = commentsWalker.nextNode() as Comment;
    let match;
    while (node) {
      if ((match = insertNodeRegex.exec(node.data))) {
        const nodesList = Array.isArray(values[match[1]]) ? values[match[1]] : [values[match[1]]];
        node.replaceWith(...nodesList);
        commentsWalker.currentNode = fragment;
      }
      node = commentsWalker.nextNode() as Comment;
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

  return { html, render };
})();

export { html, render };
