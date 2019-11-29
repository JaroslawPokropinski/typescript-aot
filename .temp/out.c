#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int handleTask(int a, int b) {
int r = 0;
while (a >= b) {
a = a - b;
r = r + 1;
}

return r;
}