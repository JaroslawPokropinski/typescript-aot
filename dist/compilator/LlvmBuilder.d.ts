import CompilationBuilder from './CompilationBuilder';
import Method from './Method';
export default class LlvmBuilder implements CompilationBuilder {
    text: string;
    getText(): string;
    getBinary(): string;
    create(method: Method): void;
}
