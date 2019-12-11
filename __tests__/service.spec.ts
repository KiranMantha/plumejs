class SampleService {
	data: any = {};
	callApi() {
		return fetch("https://jsonplaceholder.typicode.com/users").then((res:any) => res.json()).then((res: any) => {
			this.data = res;
		});
	}
}

describe("Plumejs Service", () => {
	let servc: SampleService;
	let _fetch: any = fetch;
	beforeAll(() => {
		servc = new SampleService();
	});
	beforeEach(() => {
		_fetch.resetMocks();
	});
	it("should work",async () => {
    _fetch.mockResponseOnce(JSON.stringify({
      animals: ["cow", "goat", "lion"]
    }));
		await servc.callApi();
		expect(servc.data.animals.length).toBe(3);
	});
});
