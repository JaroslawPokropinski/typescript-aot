import CompilationBuilder from '../compilator/CompilationBuilder';
import Method from '../compilator/Method';
import template from './template';

export default class EmscriptenBuilder implements CompilationBuilder {
  methods = new Array<Method>();

  getText(): string {
    return template(this.methods);
  }

  getBinary(): string {
    throw new Error();
  }

  create(method: Method) {
    this.methods.push(method);
  }
}
