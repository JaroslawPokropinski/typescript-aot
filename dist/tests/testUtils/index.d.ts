declare function executeTests(tests: Array<{
    name: string;
    code: string;
    cb: (data: WebAssembly.Instance) => boolean;
}>): void;
export default executeTests;
