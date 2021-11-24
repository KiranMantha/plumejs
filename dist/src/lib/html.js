"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = exports.html = void 0;
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
const _createFragment = (markup) => {
    const temp = document.createElement('template');
    temp.innerHTML = markup;
    return temp.content;
};
const _bindFragments = (fragment, values) => {
    const elementsWalker = document.createTreeWalker(fragment, NodeFilter.SHOW_ELEMENT, null);
    let node = elementsWalker.nextNode();
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
                        (node.eventListenersMap || (node.eventListenersMap = {}))[eventName] = values[i];
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
                        }
                        else {
                            node.setAttribute('class', '');
                        }
                        break;
                    }
                    case /value/.test(nodeValue): {
                        node.value = _sanitize(values[i]);
                        break;
                    }
                    case /disabled/.test(nodeValue):
                    case /checked/.test(nodeValue): {
                        if (values[i]) {
                            node.setAttribute(nodeValue, values[i]);
                        }
                        else {
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
        node = elementsWalker.nextNode();
    }
};
const _replaceInsertNodeComments = (fragment, values) => {
    const commentsWalker = document.createTreeWalker(fragment, NodeFilter.SHOW_COMMENT, null);
    let node = commentsWalker.nextNode();
    let match;
    while (node) {
        if ((match = insertNodeRegex.exec(node.data))) {
            const nodesList = Array.isArray(values[match[1]]) ? values[match[1]] : [values[match[1]]];
            node.replaceWith(...nodesList);
            commentsWalker.currentNode = fragment;
        }
        node = commentsWalker.nextNode();
    }
};
const html = (templates, ...values) => {
    let result = '';
    const { length } = templates;
    for (let i = 1; i < length; i++) {
        const variable = values[i - 1];
        let isAttributePart = false;
        result += templates[i - 1];
        if (isAttributeRegex.test(result) && isNodeRegex.test(result)) {
            result = result.replace(isAttributeRegex, (_, $1, $2) => `${attributePrefix}${i - 1}=${$2 || '"'}${$1}${$2 ? '' : '"'}`);
            isAttributePart = true;
        }
        if (!isAttributePart) {
            if (Array.isArray(variable) || variable instanceof DocumentFragment) {
                result += `<!--${insertNodePrefix}${i - 1}-->`;
            }
            else {
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
exports.html = html;
const render = (where, what) => {
    where.textContent = '';
    where.appendChild(what);
};
exports.render = render;
