interface HTMLElement {
	trigger: (eventName: string, isBubbling?: boolean) => void;
}

interface Window {
	XMLHttpRequest: any;
	returnMockHttpResponse: (response: any) => void;
	MutationObserver: any;
	WebKitMutationObserver: any;
}

interface Type<T> {
	new(...args: any[]): T;
}

interface String {
	translate: (...args: any) => string;
}

interface fetch {
	resetMocks: () => void;
	mockResponseOnce: (mockResponse: string) => void;
}
