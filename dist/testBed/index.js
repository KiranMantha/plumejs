import mo from './mutation-observer';
import { MockComponent } from '../src/lib/decorators';
var TestBed = (function () {
    function TestBed() {
    }
    TestBed.createComponent = function (options) {
        var appRoot;
        MockComponent({
            selector: options.selector
        })(options.target);
        appRoot = document.createElement(options.selector);
        document.body.appendChild(appRoot);
        mo.ready(options.selector, function (ele) {
            appRoot = ele;
        });
        return appRoot;
    };
    return TestBed;
}());
export default TestBed;
//# sourceMappingURL=index.js.map