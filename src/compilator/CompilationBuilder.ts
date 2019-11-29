import Method from './Method';

export default interface CompilationBuilder {
  getText(): string;
  getBinary(): string;

  create(node: Method): void;
}
