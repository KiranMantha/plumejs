const MutationObserver = require('./mo.mock');

Object.defineProperty(window, 'MutationObserver', { value: MutationObserver.default });

function trigger(eventName, isBubbleing) {
  var event = new Event(eventName, { bubbles: isBubbleing !== undefined ? isBubbleing : false, cancelable: false });
  this.dispatchEvent(event);
}

Element.prototype.trigger = trigger;


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