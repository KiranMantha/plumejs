interface Element {
  trigger: (eventName:string, isBubbling:boolean) => void;
}

interface Array<T> {
  item: (index:number) => StyleSheet;
}

interface Window {
  XMLHttpRequest: jest.Mock<any, any>;
  returnMockHttpResponse: (response: any) => void;
  MutationObserver: any;
  WebKitMutationObserver: any;
}