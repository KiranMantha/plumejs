/// <reference no-default-lib="true"/>
interface Element {
  trigger: (eventName:string, isBubbling?:boolean) => void;
}

interface Window {
  XMLHttpRequest: jest.Mock<any, any>;
  returnMockHttpResponse: (response: any) => void;
  MutationObserver: any;
  WebKitMutationObserver: any;
}