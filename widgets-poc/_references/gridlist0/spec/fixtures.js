var fixtures = {};

fixtures.verticalGridDemo = [
  { w: 1, h: 1, x: 0, y: 0 },
  { w: 1, h: 1, x: 1, y: 0 },
  { w: 1, h: 1, x: 2, y: 0 },
  { w: 2, h: 1, x: 0, y: 1 },
  { w: 1, h: 1, x: 2, y: 1 },
  { w: 3, h: 1, x: 0, y: 2 },
  { w: 1, h: 2, x: 0, y: 3 },
  { w: 1, h: 1, x: 1, y: 3 },
  { w: 1, h: 1, x: 2, y: 3 },
  { w: 1, h: 1, x: 1, y: 4 },
  { w: 1, h: 1, x: 2, y: 4 },
  // { w: 1, h: 1, x: 0, y: 5 }
];

// Enable Node module
if (typeof(require) == 'function') {
  for (var k in fixtures) {
    exports[k] = fixtures[k];
  }
}