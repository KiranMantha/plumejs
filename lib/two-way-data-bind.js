var twdb = function () {
  var scopedElemns = {};

  function xval(sel, val, l, i) {
    if (val == null) {
      return 'value' in sel ? sel.value : sel.innerHTML
    }
    else if ('value' in sel) {
      sel.value = val
      if (sel.tagName.toLowerCase() === 'select')
        Array.prototype.forEach.call(sel.querySelectorAll('option'), function (opt) {
          opt.selected = (opt.value == val)
        });
    }
    else {
      var index = sel.getAttribute('te_index');
      if (index) {
        sel.childNodes[index].nodeValue = val;
      }
    }
  }

  this.bind = function (sel, obj, prop, isEnum) {
    if (!scopedElemns[prop]) {
      scopedElemns[prop] = [];
    }
    scopedElemns[prop].push(sel);

    if (isEnum) {
      if (sel.type === 'text' || sel.type === 'password') {
        sel.onkeyup = function () {
          obj[prop] = sel.value;
          scopedElemns[prop].forEach(function (node) {
            xval(node, sel.value);
          });
        }
      } else if (sel.type === 'select-one') {
        var ref_func = sel['techange'] || sel['onchange'];
        sel.onchange = function (e) {
          obj[prop] = sel.value;
          scopedElemns[prop].forEach(function (node) {
            xval(node, sel.value);
          });
          ref_func && ref_func();
        }
      }
    }
  }
};

export default twdb;