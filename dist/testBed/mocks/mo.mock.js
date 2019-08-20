"use strict";
/*!
 * Shim for MutationObserver interface
 * Author: Graeme Yeates (github.com/megawac)
 * Repository: https://github.com/megawac/MutationObserver.js
 * License: WTFPL V2, 2004 (wtfpl.net).
 * Though credit and staring the repo will make me feel pretty, you can modify and redistribute as you please.
 * Attempts to follow spec (https://www.w3.org/TR/dom/#mutation-observers) as closely as possible for native javascript
 * See https://github.com/WebKit/webkit/blob/master/Source/WebCore/dom/MutationObserver.cpp for current webkit source c++ implementation
 */
var MutationObserver = (function () {
    "use strict";
    function MutationObserver(listener) {
        this._watched = [];
        this._listener = listener;
    }
    function startMutationChecker(observer) {
        (function check() {
            var mutations = observer.takeRecords();
            if (mutations.length) {
                observer._listener(mutations, observer);
            }
            observer._timeout = setTimeout(check, MutationObserver._period);
        })();
    }
    MutationObserver._period = 30;
    MutationObserver.prototype = {
        observe: function ($target, config) {
            var settings = {
                attr: !!(config.attributes || config.attributeFilter || config.attributeOldValue),
                kids: !!config.childList,
                descendents: !!config.subtree,
                charData: !!(config.characterData || config.characterDataOldValue)
            };
            var watched = this._watched;
            for (var i = 0; i < watched.length; i++) {
                if (watched[i].tar === $target)
                    watched.splice(i, 1);
            }
            if (config.attributeFilter) {
                settings.afilter = reduce(config.attributeFilter, function (a, b) {
                    a[b] = true;
                    return a;
                }, {});
            }
            watched.push({
                tar: $target,
                fn: createMutationSearcher($target, settings)
            });
            if (!this._timeout) {
                startMutationChecker(this);
            }
        },
        takeRecords: function () {
            var mutations = [];
            var watched = this._watched;
            for (var i = 0; i < watched.length; i++) {
                watched[i].fn(mutations);
            }
            return mutations;
        },
        disconnect: function () {
            this._watched = [];
            clearTimeout(this._timeout);
            this._timeout = null;
        }
    };
    function MutationRecord(data) {
        var settings = {
            type: null,
            target: null,
            addedNodes: [],
            removedNodes: [],
            previousSibling: null,
            nextSibling: null,
            attributeName: null,
            attributeNamespace: null,
            oldValue: null
        };
        for (var prop in data) {
            if (has(settings, prop) && data[prop] !== undefined)
                settings[prop] = data[prop];
        }
        return settings;
    }
    function createMutationSearcher($target, config) {
        var $oldstate = clone($target, config);
        return function (mutations) {
            var olen = mutations.length, dirty;
            if (config.charData && $target.nodeType === 3 && $target.nodeValue !== $oldstate.charData) {
                mutations.push(new MutationRecord({
                    type: "characterData",
                    target: $target,
                    oldValue: $oldstate.charData
                }));
            }
            if (config.attr && $oldstate.attr) {
                findAttributeMutations(mutations, $target, $oldstate.attr, config.afilter);
            }
            if (config.kids || config.descendents) {
                dirty = searchSubtree(mutations, $target, $oldstate, config);
            }
            if (dirty || mutations.length !== olen) {
                $oldstate = clone($target, config);
            }
        };
    }
    var hasAttributeBug = document.createElement("i");
    hasAttributeBug.style.top = 0;
    hasAttributeBug = hasAttributeBug.attributes.style.value != "null";
    function getAttributeSimple(el, attr) {
        return attr.value;
    }
    function getAttributeWithStyleHack(el, attr) {
        return attr.name !== "style" ? attr.value : el.style.cssText;
    }
    var getAttributeValue = hasAttributeBug ? getAttributeSimple : getAttributeWithStyleHack;
    function findAttributeMutations(mutations, $target, $oldstate, filter) {
        var checked = {};
        var attributes = $target.attributes;
        var attr;
        var name;
        var i = attributes.length;
        while (i--) {
            attr = attributes[i];
            name = attr.name;
            if (!filter || has(filter, name)) {
                if (getAttributeValue($target, attr) !== $oldstate[name]) {
                    mutations.push(MutationRecord({
                        type: "attributes",
                        target: $target,
                        attributeName: name,
                        oldValue: $oldstate[name],
                        attributeNamespace: attr.namespaceURI
                    }));
                }
                checked[name] = true;
            }
        }
        for (name in $oldstate) {
            if (!(checked[name])) {
                mutations.push(MutationRecord({
                    target: $target,
                    type: "attributes",
                    attributeName: name,
                    oldValue: $oldstate[name]
                }));
            }
        }
    }
    function searchSubtree(mutations, $target, $oldstate, config) {
        var dirty;
        function resolveConflicts(conflicts, node, $kids, $oldkids, numAddedNodes) {
            var distance = conflicts.length - 1;
            var counter = -~((distance - numAddedNodes) / 2);
            var $cur;
            var oldstruct;
            var conflict;
            while ((conflict = conflicts.pop())) {
                $cur = $kids[conflict.i];
                oldstruct = $oldkids[conflict.j];
                if (config.kids && counter && Math.abs(conflict.i - conflict.j) >= distance) {
                    mutations.push(MutationRecord({
                        type: "childList",
                        target: node,
                        addedNodes: [$cur],
                        removedNodes: [$cur],
                        nextSibling: $cur.nextSibling,
                        previousSibling: $cur.previousSibling
                    }));
                    counter--;
                }
                if (config.attr && oldstruct.attr)
                    findAttributeMutations(mutations, $cur, oldstruct.attr, config.afilter);
                if (config.charData && $cur.nodeType === 3 && $cur.nodeValue !== oldstruct.charData) {
                    mutations.push(MutationRecord({
                        type: "characterData",
                        target: $cur,
                        oldValue: oldstruct.charData
                    }));
                }
                if (config.descendents)
                    findMutations($cur, oldstruct);
            }
        }
        function findMutations(node, old) {
            var $kids = node.childNodes;
            var $oldkids = old.kids;
            var klen = $kids.length;
            var olen = $oldkids ? $oldkids.length : 0;
            var map;
            var conflicts;
            var id;
            var idx;
            var oldstruct;
            var $cur;
            var $old;
            var numAddedNodes = 0;
            var i = 0, j = 0;
            while (i < klen || j < olen) {
                $cur = $kids[i];
                oldstruct = $oldkids[j];
                $old = oldstruct && oldstruct.node;
                if ($cur === $old) {
                    if (config.attr && oldstruct.attr)
                        findAttributeMutations(mutations, $cur, oldstruct.attr, config.afilter);
                    if (config.charData && oldstruct.charData !== undefined && $cur.nodeValue !== oldstruct.charData) {
                        mutations.push(MutationRecord({
                            type: "characterData",
                            target: $cur,
                            oldValue: oldstruct.charData
                        }));
                    }
                    if (conflicts)
                        resolveConflicts(conflicts, node, $kids, $oldkids, numAddedNodes);
                    if (config.descendents && ($cur.childNodes.length || oldstruct.kids && oldstruct.kids.length))
                        findMutations($cur, oldstruct);
                    i++;
                    j++;
                }
                else {
                    dirty = true;
                    if (!map) {
                        map = {};
                        conflicts = [];
                    }
                    if ($cur) {
                        if (!(map[id = getElementId($cur)])) {
                            map[id] = true;
                            if ((idx = indexOfCustomNode($oldkids, $cur, j)) === -1) {
                                if (config.kids) {
                                    mutations.push(MutationRecord({
                                        type: "childList",
                                        target: node,
                                        addedNodes: [$cur],
                                        nextSibling: $cur.nextSibling,
                                        previousSibling: $cur.previousSibling
                                    }));
                                    numAddedNodes++;
                                }
                            }
                            else {
                                conflicts.push({
                                    i: i,
                                    j: idx
                                });
                            }
                        }
                        i++;
                    }
                    if ($old &&
                        $old !== $kids[i]) {
                        if (!(map[id = getElementId($old)])) {
                            map[id] = true;
                            if ((idx = indexOf($kids, $old, i)) === -1) {
                                if (config.kids) {
                                    mutations.push(MutationRecord({
                                        type: "childList",
                                        target: old.node,
                                        removedNodes: [$old],
                                        nextSibling: $oldkids[j + 1],
                                        previousSibling: $oldkids[j - 1]
                                    }));
                                    numAddedNodes--;
                                }
                            }
                            else {
                                conflicts.push({
                                    i: idx,
                                    j: j
                                });
                            }
                        }
                        j++;
                    }
                }
            }
            if (conflicts)
                resolveConflicts(conflicts, node, $kids, $oldkids, numAddedNodes);
        }
        findMutations($target, $oldstate);
        return dirty;
    }
    function clone($target, config) {
        var recurse = true;
        return (function copy($target) {
            var elestruct = {
                node: $target
            };
            if (config.charData && ($target.nodeType === 3 || $target.nodeType === 8)) {
                elestruct.charData = $target.nodeValue;
            }
            else {
                if (config.attr && recurse && $target.nodeType === 1) {
                    elestruct.attr = reduce($target.attributes, function (memo, attr) {
                        if (!config.afilter || config.afilter[attr.name]) {
                            memo[attr.name] = getAttributeValue($target, attr);
                        }
                        return memo;
                    }, {});
                }
                if (recurse && ((config.kids || config.charData) || (config.attr && config.descendents))) {
                    elestruct.kids = map($target.childNodes, copy);
                }
                recurse = config.descendents;
            }
            return elestruct;
        })($target);
    }
    function indexOfCustomNode(set, $node, idx) {
        return indexOf(set, $node, idx, JSCompiler_renameProperty("node"));
    }
    var counter = 1;
    var expando = "mo_id";
    function getElementId($ele) {
        try {
            return $ele.id || ($ele[expando] = $ele[expando] || counter++);
        }
        catch (o_O) {
            try {
                return $ele.nodeValue;
            }
            catch (shitie) {
                return counter++;
            }
        }
    }
    function map(set, iterator) {
        var results = [];
        for (var index = 0; index < set.length; index++) {
            results[index] = iterator(set[index], index, set);
        }
        return results;
    }
    function reduce(set, iterator, memo) {
        for (var index = 0; index < set.length; index++) {
            memo = iterator(memo, set[index], index, set);
        }
        return memo;
    }
    function indexOf(set, item, idx, prop) {
        for (; idx < set.length; idx++) {
            if ((prop ? set[idx][prop] : set[idx]) === item)
                return idx;
        }
        return -1;
    }
    function has(obj, prop) {
        return obj[prop] !== undefined;
    }
    function JSCompiler_renameProperty(a) {
        return a;
    }
    return MutationObserver;
})();
Object.defineProperty(window, 'MutationObserver', { value: MutationObserver });
//# sourceMappingURL=mo.mock.js.map