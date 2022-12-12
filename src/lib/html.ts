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
              if (eventName !== 'bindprops') {
                node.addEventListener(eventName, values[i]);
              } else {
                node.addEventListener(eventName, (event: CustomEvent) => {
                  event.detail.setProps(values[i]());
                });
              }
              break;
            }
            case /ref/.test(nodeValue): {
              if (node.tagName.includes('-')) {
                node.addEventListener('load', (e: CustomEvent) => {
                  values[i](e.detail);
                });
              } else {
                values[i](node);
              }
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

  const _diffAttributes = (templateNode: HTMLElement, domNode: HTMLElement) => {
    if (!templateNode || !domNode || templateNode.nodeType !== 1 || domNode.nodeType !== 1) return;
    const templateAtts = templateNode.attributes;
    const existingAtts = domNode.attributes;

    for (const { name, value } of templateAtts) {
      if (/class/.test(name)) {
        Array.from(templateNode.classList).every((className) => {
          if (!domNode.classList.contains(className)) {
            domNode.classList.add(className);
          }
        });
      } else {
        if (!existingAtts[name] || existingAtts[name] !== value) {
          domNode.setAttribute(name, value);
        }
      }
    }

    for (const { name } of existingAtts) {
      if (/class/.test(name)) {
        Array.from(domNode.classList).every((className) => {
          if (!templateNode.classList.contains(className)) {
            domNode.classList.remove(className);
          }
        });
      } else {
        if (!templateAtts[name]) {
          domNode.removeAttribute(name);
        }
      }
    }
  };

  /**
   * Get the type for a node
   * @param  {Node}   node The node
   * @return {String}      The type
   */
  const _getNodeType = (node: HTMLElement) => {
    if (node.nodeType === 3) return 'text';
    if (node.nodeType === 8) return 'comment';
    return node.tagName.toLowerCase();
  };

  /**
   * Get the content from a node
   * @param  {Node}   node The node
   * @return {String}      The type
   */
  const _getNodeContent = (node: HTMLElement) => {
    if (node.childNodes && node.childNodes.length > 0) return null;
    return node.textContent;
  };

  /**
   * Compare the template to the UI and make updates
   * @param  {Node} template The template HTML
   * @param  {Node} elem     The UI HTML
   */
  const _diff = (template: HTMLElement | DocumentFragment, element: HTMLElement | DocumentFragment) => {
    // Get arrays of child nodes
    const domNodes = element ? Array.from(element.childNodes) : [];
    const templateNodes = template ? Array.from(template.childNodes) : [];

    // If extra elements in DOM, remove them
    let count = domNodes.length - templateNodes.length;
    if (count > 0) {
      for (; count > 0; count--) {
        domNodes[domNodes.length - count].parentNode.removeChild(domNodes[domNodes.length - count]);
      }
    }

    // Diff each item in the templateNodes
    templateNodes.forEach((node: HTMLElement, index) => {
      const domNode = domNodes[index] as HTMLElement;
      _diffAttributes(node, domNode);

      // If element doesn't exist, create it
      if (!domNode) {
        element && element.appendChild(node);
        return;
      }

      // If element is not the same type, replace it with new element
      if (_getNodeType(node) !== _getNodeType(domNode)) {
        domNode.replaceWith(node);
        return;
      }

      // If content is different, update it
      const templateContent = _getNodeContent(node);
      if (templateContent && templateContent !== _getNodeContent(domNode)) {
        domNode.textContent = templateContent;
        return;
      }

      // If target element should be empty, wipe it
      if (domNode.childNodes.length > 0 && node.childNodes.length < 1) {
        domNode.innerHTML = '';
        return;
      }

      // If element is empty and shouldn't be, build it up
      // This uses a document fragment to minimize reflows
      if (domNode.childNodes.length < 1 && node.childNodes.length > 0) {
        const fragment = document.createDocumentFragment();
        _diff(node, fragment);
        domNode.appendChild(fragment);
        return;
      }

      // If there are existing child elements that need to be modified, diff them
      if (node.childNodes.length > 0) {
        _diff(node, domNode);
        return;
      }
    });
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
    if (!where.children.length) {
      where.innerHTML = '';
      where.appendChild(what);
    } else {
      _diff(what, where);
    }
  };

  return { html, render };
})();

export { html, render };
