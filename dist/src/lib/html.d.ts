declare const html: (templates: TemplateStringsArray, ...values: Array<any>) => DocumentFragment;
declare const render: (where: HTMLElement, what: DocumentFragment) => void;
export { html, render };
