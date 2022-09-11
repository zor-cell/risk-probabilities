#include <emscripten/bind.h>
#include "risk.hpp"

using namespace emscripten;

EMSCRIPTEN_BINDINGS(risk) {
   class_<Risk>("Risk")
   .constructor<int, int, int>()
   .function("simulate", &Risk::simulate)
   ;
}