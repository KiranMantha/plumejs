//https://github.com/unrealprogrammer/how-to-test-web-component

require('document-register-element');
require('./mo.mock.js');
require('@ungap/custom-elements-builtin');

Element.prototype.trigger = function(eventName, isBubbleing) {
  let event = new Event(eventName, { bubbles: isBubbleing !== undefined ? isBubbleing : false, cancelable: false });
  this.dispatchEvent(event);
};

function createXHRmock() {
  var open, send, status, onloadend, setRequestHeader, response, responseText;
    open = jest.fn();
    status = 200;
    onloadend = jest.fn();
    setRequestHeader = jest.fn();
    response = '';
    responseText = '';
    // be aware we use *function* because we need to get *this* 
    // from *new XmlHttpRequest()* call
    send = jest.fn().mockImplementation(function(){
      this.onloadend && this.onloadend.call(this);
      this.onerror && this.onerror.call(this);
      this.setRequestHeader && this.setRequestHeader.call(this);
    });

    var xhrMockClass = function () {
        return {
            open: open,
            send: send,
            status: status,
            setRequestHeader: setRequestHeader,
            response: response,
            responseText: responseText
        };
    };

    window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
    window.returnMockHttpResponse = function(res) {
      status = res.status ? res.status : 200;
      response = res.response ? res.response : '';
      responseText = res.responseText ? res.responseText : '';
    }
}

createXHRmock();