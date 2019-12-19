import Method from "../compilator/Method";
import mapType from './mapType';
import EmscriptenStatementVisitor from "./EmscriptenStatementVisitor";

// const getGenerics = (targs?: Array<string>) => {
//   if (!targs) {
//     return '';
//   }
//   return '<' + targs.map((targ) => mapType(targ)).join(', ') + '>';
// }

const getParameters = (method: Method) => method.parameters
  .map((p) => `${mapType(p.typeName, p.typeArguments)} ${p.name.name}`)
  .join(', ');

const visitor = new EmscriptenStatementVisitor();

const template = (methods: Array<Method>) => 
`
#include <stdio.h>
#include <emscripten.h>
// #include <emscripten/bind.h>
#include <vector>

// using namespace emscripten;

extern "C" {
  EMSCRIPTEN_KEEPALIVE
  void sayHi() {
    printf("Hi!\\n");
  }

  EMSCRIPTEN_KEEPALIVE
  std::vector<double>* createFloatArray() {
    return new std::vector<double>();
  }

  EMSCRIPTEN_KEEPALIVE
  void floatPushBack(std::vector<double>* array, double number) {
    array->push_back(number);
  }

  EMSCRIPTEN_KEEPALIVE
  double floatAt(std::vector<double>* array, int number) {
    return array->at(number);
  }

  EMSCRIPTEN_KEEPALIVE
  size_t floatArraySize(std::vector<double>* array) {
    return array->size();
  }


  EMSCRIPTEN_KEEPALIVE
  void printFloatArray(std::vector<double>* array) {
    for (size_t i = 0; i < array->size(); i++) {
      printf("%f\\n", array->at(i));
    }
  }



  ${methods.map((m) => `
  ${mapType(m.returnTypeName)} EMSCRIPTEN_KEEPALIVE ${m.name}(${getParameters(m)}) {
    ${m.statements.map((s) => `
    ${visitor.visit(s).replace(/\n/g, '\n    ')}`
    ).join('')}
  }
  `).join('')}

  // EMSCRIPTEN_BINDINGS(module) {
  //   register_vector<int>("vector<int>");
  //   register_vector<double>("vector<double>");
  // }
}
`
;

export default template;