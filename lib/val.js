let valOf = (() => {
  let rreturn = /\r/g,
    rnothtmlwhite = /[^\x20\t\r\n\f]+/g,
    support = {};

  let isFunction = (obj) => {
    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === 'function' && typeof obj.nodeType !== 'number';
  };

  let isWindow = (obj) => {
    return obj != null && obj === obj.window;
  };

  let merge = (first, second) => {
    let len = +second.length,
      j = 0,
      i = first.length;

    for (; j < len; j++) {
      first[i++] = second[j];
    }

    first.length = i;

    return first;
  };

  let makeArray = (arr, results) => {
    let ret = results || [];

    if (arr != null) {
      if (isArrayLike(Object(arr))) {
        merge(ret, typeof arr === 'string' ? [arr] : arr);
      } else {
        [].push.call(ret, arr);
      }
    }
    return ret;
  };

  let inArray = (elem, arr, i) => {
    return arr == null ? -1 : [].indexOf.call(arr, elem, i);
  };

  let nodeName = (elem, name) => {
    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
  };

  let stripAndCollapse = (value) => {
    let tokens = value.match(rnothtmlwhite) || [];
    return tokens.join(' ');
  };

  let isArrayLike = (obj) => {
    // Support: real iOS 8.2 only (not reproducible in simulator)
    // `in` check used to prevent JIT error (gh-2145)
    // hasOwn isn't used here due to false negatives
    // regarding Nodelist length in IE
    let length = !!obj && 'length' in obj && obj.length,
      type = typeof obj;

    if (isFunction(obj) || isWindow(obj)) {
      return false;
    }

    return (
      type === 'array' ||
      length === 0 ||
      (typeof length === 'number' && length > 0 && length - 1 in obj)
    );
  };

  let valHooks = {
    option: {
      get: (elem) => {
        let val = elem.getAttribute('value') || null;
        return val != null ?
          val // Support: IE <=10 - 11 only
          : // option.text throws exceptions (#14686, #14858)
          // Strip and collapse whitespace
          // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
          stripAndCollapse(elem.textContent);
      }
    },
    select: {
      get: (elem) => {
        let value,
          option,
          i,
          options = elem.options,
          index = elem.selectedIndex,
          one = elem.type === 'select-one',
          values = one ? null : [],
          max = one ? index + 1 : options.length;

        if (index < 0) {
          i = max;
        } else {
          i = one ? index : 0;
        }

        // Loop through all the selected options
        for (; i < max; i++) {
          option = options[i];

          // Support: IE <=9 only
          // IE8-9 doesn't update selected after form reset (#2551)
          if (
            (option.selected || i === index) &&
            // Don't return options that are disabled or in a disabled optgroup
            !option.disabled &&
            (!option.parentNode.disabled ||
              !nodeName(option.parentNode, 'optgroup'))
          ) {
            // Get the specific value for the option
            value = val(option);

            // We don't need an array for one selects
            if (one) {
              return value;
            }

            // Multi-Selects return an array
            values.push(value);
          }
        }

        return values;
      },

      set: (elem, value) => {
        let optionSet,
          option,
          options = elem.options,
          values = makeArray(value),
          i = options.length;

        while (i--) {
          option = options[i];

          /* eslint-disable no-cond-assign */

          if (
            (option.selected =
              inArray(valHooks.option.get(option), values) > -1)
          ) {
            optionSet = true;
          }

          /* eslint-enable no-cond-assign */
        }

        // Force browsers to behave consistently when non-matching value is set
        if (!optionSet) {
          elem.selectedIndex = -1;
        }
        return values;
      }
    }
  };

  // Radios and checkboxes getter/setter
  ['radio', 'checkbox'].forEach(i => {
    valHooks[i] = {
      set: (elem, value) => {
        if (Array.isArray(value)) {
          return (elem.checked = inArray(val(elem), value) > -1);
        }
      }
    };
    if (!support.checkOn) {
      valHooks[i].get = elem => {
        return elem.getAttribute('value') === null ? 'on' : elem.value;
      };
    }
  });

  let _val = function(el, value) {
    let hooks,
      ret,
      valueIsFunction,
      elem = el[0] || el;
    if (arguments.length === 1) {
      if (elem) {
        hooks = valHooks[elem.type] || valHooks[elem.nodeName.toLowerCase()];

        if (
          hooks &&
          'get' in hooks &&
          (ret = hooks.get(elem, 'value')) !== undefined
        ) {
          return ret;
        }

        ret = elem.value;

        // Handle most common string cases
        if (typeof ret === 'string') {
          return ret.replace(rreturn, '');
        }

        // Handle cases where value is null/undef or number
        return ret == null ? '' : ret;
      }

      return;
    }

    valueIsFunction = isFunction(value);

    return [].forEach.call(el, (elem, i) => {
      let val;

      if (elem.nodeType !== 1) {
        return;
      }

      if (valueIsFunction) {
        val = value.call(elem, i, _val(elem));
      } else {
        val = value;
      }

      // Treat null/undefined as ""; convert numbers to string
      if (val == null) {
        val = '';
      } else if (typeof val === 'number') {
        val += '';
      } else if (Array.isArray(val)) {
        val = [].map.call(val, function (value) {
          return value == null ? '' : value + '';
        });
      }

      hooks = valHooks[elem.type] || valHooks[elem.nodeName.toLowerCase()];

      // If set returns undefined, fall back to normal setting
      if (
        !hooks ||
        !('set' in hooks) ||
        hooks.set(elem, val, 'value') === undefined
      ) {
        elem.value = val;
      }
    });
  }
  return _val;
})();
export default valOf;