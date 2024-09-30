const { html, render } = (() => {
  const isAttributeRegex = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/;
  const isNodeRegex = /<[a-z][^>]+$/i;
  const attributePrefix = 'attr';
  const attributeRegex = /^attr([^ ]+)/;
  const insertNodePrefix = 'insertNode';
  const insertNodeRegex = /^insertNode([^ ]+)/;
  let refNodes: Array<() => void> = [];
  let inputPropsNodes: Array<() => void> = [];

  const _sanitize = (data: string) => {
    const tagsToReplace: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '(': '%28',
      ')': '%29'
    };
    let str = JSON.stringify(data);
    const replaceTag = (tag: string) => tagsToReplace[tag] || tag;
    const safe_tags_replace = (str: string) => str.replace(/[&<>()]/g, replaceTag);
    str = safe_tags_replace(str);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(str);
  };

  const _setValuesForDropdown = (node: HTMLSelectElement, value) => {
    const options = node.options,
      values = Array.isArray(value) ? value : [value];
    let optionSet: boolean,
      option: HTMLOptionElement,
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

  const _bindDataInput = (node: HTMLElement, val: Record<string, unknown>, symbol: symbol) => {
    const fn = () => {
      setTimeout(() => {
        if (node.isConnected) {
          const event = new CustomEvent('bindprops', {
            detail: {
              props: val
            },
            bubbles: false
          });
          node.dispatchEvent(event);
        }
      });
    };
    node[symbol] = val ? JSON.stringify(val) : '';
    inputPropsNodes.push(fn);
  };

  /**
   * bind attribute and its value to node
   * @param {HTMLElement} node
   * @param {String} attributeName
   * @param {any} attributeValue
   */
  const _bindAttributes = (node: HTMLElement, attributeName: string, attributeValue) => {
    switch (true) {
      case /attrs/.test(attributeName): {
        const attributesList = (attributeValue as { attrs: Record<string, unknown> }).attrs;
        for (const attr in attributesList) {
          _bindAttributes(node, attr, attributesList[attr]);
        }
        break;
      }
      case /^on+/.test(attributeName): {
        const eventName = attributeName.slice(2).toLowerCase();
        node.removeEventListener(eventName, attributeValue);
        node.addEventListener(eventName, attributeValue);
        break;
      }
      case /ref/.test(attributeName): {
        const closure = ((node: HTMLElement, fn: (node: HTMLElement) => void) => {
          return () => {
            node.isConnected && fn(node);
          };
        })(node, attributeValue as (node: HTMLElement) => void);
        refNodes.push(closure);
        break;
      }
      case /key/.test(attributeName): {
        node[Symbol('key')] = attributeValue as unknown;
        break;
      }
      case /^data-+/.test(attributeName):
      case /^aria-+/.test(attributeName): {
        if (attributeName === 'data-input') {
          _bindDataInput(node, attributeValue, Symbol('input'));
        } else {
          node.setAttribute(attributeName, _sanitize(attributeValue));
        }
        break;
      }
      case /class/.test(attributeName): {
        if (attributeValue) {
          node.classList.add(...(attributeValue as string).split(' '));
        } else {
          node.setAttribute('class', '');
        }
        break;
      }
      case /value/.test(attributeName): {
        if (node.nodeName.toLowerCase() === 'select') {
          _setValuesForDropdown(node as HTMLSelectElement, attributeValue);
        } else {
          (node as HTMLInputElement).value = _sanitize(attributeValue) as string;
        }
        break;
      }
      case /disabled/.test(attributeName):
      case /checked/.test(attributeName): {
        if (attributeValue) {
          node.setAttribute(attributeName, attributeValue);
        } else {
          node.removeAttribute(attributeName);
        }
        break;
      }
      default: {
        node.setAttribute(attributeName, _sanitize(attributeValue));
      }
    }
  };

  const _bindFragments = (fragment: DocumentFragment, values: Array<unknown>) => {
    const elementsWalker = document.createTreeWalker(fragment, NodeFilter.SHOW_ELEMENT, null);
    let node = elementsWalker.nextNode() as unknown as HTMLElement;
    while (node) {
      if (node.hasAttributes()) {
        const customAttributes = Array.from(node.attributes).filter((attr) => attributeRegex.test(attr.nodeName));
        for (const { nodeName, nodeValue } of customAttributes) {
          const i = attributeRegex.exec(nodeName)[1];
          _bindAttributes(node, nodeValue, values[i]);
          node.removeAttribute(nodeName);
        }
      }
      node = elementsWalker.nextNode() as unknown as HTMLElement;
    }
  };

  const _replaceInsertNodeComments = (fragment: DocumentFragment, values: Array<unknown>) => {
    const commentsWalker = document.createTreeWalker(fragment, NodeFilter.SHOW_COMMENT, null);
    let node = commentsWalker.nextNode() as Comment,
      match: RegExpExecArray;
    while (node) {
      if ((match = insertNodeRegex.exec(node.data))) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const nodesList = Array.isArray(values[match[1]]) ? values[match[1]] : [values[match[1]]];
        node.replaceWith(...nodesList);
        commentsWalker.currentNode = fragment;
      }
      node = commentsWalker.nextNode() as Comment;
    }
  };

  const _getSymbolFromNode = (node: HTMLElement, symbolName: string): [symbol, string] => {
    if (!node) {
      return [null, ''];
    }
    const namedSymbol = Object.getOwnPropertySymbols(node).find((symbol) => symbol.description === symbolName);
    const symbolValue = namedSymbol ? (node[namedSymbol] as string) : '';
    return [namedSymbol, symbolValue];
  };

  /**
   * update node attributes y comparing present node and compiled node
   * @param {HTMLElement} templateNode
   * @param {HTMLElement} domNode
   */
  const _diffAttributes = (templateNode: HTMLElement, domNode: HTMLElement) => {
    if (!templateNode || !domNode || templateNode.nodeType !== 1 || domNode.nodeType !== 1) return;
    const templateAtts = templateNode.attributes;
    const existingAtts = domNode.attributes;
    const preserveAttributesAttr = domNode.getAttribute('data-preserve-attributes');
    const preserveExistingAttributes = preserveAttributesAttr && preserveAttributesAttr === 'true';

    for (const { name, value } of templateAtts) {
      if (!existingAtts[name] || existingAtts[name] !== value) {
        domNode.setAttribute(name, value);
      }
    }

    if (!preserveExistingAttributes) {
      for (const { name } of existingAtts) {
        if (!templateAtts[name]) {
          domNode.removeAttribute(name);
        }
      }
    }

    if (['input', 'textarea'].includes(domNode.tagName.toLowerCase())) {
      (domNode as HTMLInputElement).value = (templateNode as HTMLInputElement).value;
    }

    if (domNode.tagName.indexOf('-') > -1 && templateNode.tagName.indexOf('-') > -1) {
      const templateInput = _getSymbolFromNode(templateNode, 'input')[1];
      const domSymbol = _getSymbolFromNode(domNode, 'input');
      if (templateInput && domSymbol[1] && templateInput !== domSymbol[1]) {
        _bindDataInput(domNode, JSON.parse(templateInput), domSymbol[0]);
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
   * @param  {Node} node The node
   * @return {String} The type
   */
  const _getNodeContent = (node: HTMLElement) => {
    if (node.childNodes && node.childNodes.length > 0) return null;
    return node.textContent;
  };

  /**
   * Compare the template to the UI and make updates
   * @param  {Node} template The template HTML
   * @param  {Node} element The UI HTML
   */
  const _diff = (
    template: HTMLElement | DocumentFragment,
    element: HTMLElement | DocumentFragment,
    isChildDiffing: boolean
  ) => {
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
      const templateNodeKeyValue = _getSymbolFromNode(node, 'key')[1];
      const domNodeKeyValue = _getSymbolFromNode(domNode, 'key')[1];

      _diffAttributes(node, domNode);

      // Discard diffing of children custom elements
      if (isChildDiffing && domNode && domNode.nodeType === 1 && domNode.tagName.indexOf('-') > -1) {
        return;
      }

      // If element doesn't exist, create it
      if (!domNode) {
        element && element.appendChild(node);
        return;
      }

      // If element is not the same type or the keys are different then replace it with new element
      if (
        (templateNodeKeyValue && domNodeKeyValue && templateNodeKeyValue !== domNodeKeyValue) ||
        _getNodeType(node) !== _getNodeType(domNode)
      ) {
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
        _diff(node, fragment, false);
        domNode.appendChild(fragment);
        return;
      }

      // If there are existing child elements that need to be modified, diff them
      if (node.childNodes.length > 0) {
        _diff(node, domNode, true);
        return;
      }
    });
  };

  /**
   * tagged literals which construct dom nodes
   * @param {.*} templates
   * @param {...any[]} values
   * @return DocumentFragment
   */
  const html = (templates: TemplateStringsArray, ...values: Array<unknown>): DocumentFragment => {
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
        switch (true) {
          case Array.isArray(variable):
          case variable instanceof DocumentFragment: {
            result += `<!--${insertNodePrefix}${i - 1}-->`;
            break;
          }
          case typeof variable === 'object' && variable !== null: {
            if ('attrs' in variable) {
              result += `${attributePrefix}${i - 1}="attrs"`;
            }
            break;
          }
          default: {
            result += variable ?? '';
          }
        }
      }
    }

    result += templates[length - 1];
    const fragment = _createFragment(result.trim());
    _bindFragments(fragment, values);
    _replaceInsertNodeComments(fragment, values);
    return fragment;
  };

  /**
   * Renders template literals to target dom node
   * @param {HTMLElement} where
   * @param {(templates: any, ...values: any[]) => DocumentFragment} what
   */
  const render = (where: HTMLElement | HTMLUnknownElement, what: DocumentFragment) => {
    if (where && !where.children.length) {
      where.innerHTML = '';
      where.appendChild(what);
    } else {
      _diff(what, where, false);
    }
    refNodes.forEach((fn) => {
      fn();
    });
    refNodes = [];

    inputPropsNodes.forEach((fn) => {
      fn();
    });
    inputPropsNodes = [];
  };

  return { html, render };
})();

export { html, render };
