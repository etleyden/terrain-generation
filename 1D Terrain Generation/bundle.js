/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/diamond_square.js":
/*!*******************************!*\
  !*** ./src/diamond_square.js ***!
  \*******************************/
/***/ ((module) => {

eval("function _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n//adjusted mod function for negative numbers\nfunction mod(x, divisor) {\n  var m = x % divisor;\n  return m + (m < 0 ? divisor : 0);\n}\nfunction average(list) {\n  var sum = 0;\n  for (var i = 0; i < list.length; i++) {\n    sum += list[i];\n  }\n  return sum / list.length;\n}\nfunction random(offset) {\n  return Math.random() * offset;\n}\n//implementation will start with 0 for corner values\n//this will probably make stitching more convenient\nvar ds = {\n  map: [],\n  size: 0,\n  // 0--> not initialized, odd --> diamond step is next, even --> square step is next\n  num_iterations: 0,\n  isDiamondStep: false,\n  Point: /*#__PURE__*/_createClass(function Point(x, y) {\n    _classCallCheck(this, Point);\n    this.x = x;\n    this.y = y;\n  }),\n  init: function init(size, offset) {\n    //validate size is 2^n + 1\n    if (Math.log2(size - 1) % 1 != 0) size = Math.pow(2, Math.floor(Math.log2(size - 1))) + 1;\n    this.size = size;\n    this.chunk_size = size - 1;\n    this.offset = offset;\n    var zero_pt = new ds.Point(0, 0);\n    this.map = _toConsumableArray(Array(size)).map(function (e) {\n      return Array(size).fill(null);\n    });\n    this.map[0][0] = 0;\n    this.map[0][size - 1] = 0;\n    this.map[size - 1][0] = 0;\n    this.map[size - 1][size - 1] = 0;\n    this.num_iterations = 1;\n    this.isDiamondStep = true;\n  },\n  iterate: function iterate() {\n    if (this.num_iterations == 0) return;\n    //the size of the square or diamond\n    var dist = this.chunk_size / 2;\n    if (dist < 1) return;\n    var end_idx = this.size - 1;\n    // the diamond step\n    if (this.isDiamondStep) {\n      //diamond size: size / (i * 2)\n      //diamond step starts at diamond size idx of x and y and increment by size * 2\n      //ref points are (x - ds, y - ds), (x + ds, y - ds), (x - ds, y + ds), (x + ds, y + ds) \n      for (var i = dist; i < this.size; i += 2 * dist) {\n        for (var j = dist; j < this.size; j += 2 * dist) {\n          var y0 = mod(i - dist, end_idx);\n          var y1 = mod(i + dist, end_idx);\n          var x0 = mod(j - dist, end_idx);\n          var x1 = mod(j + dist, end_idx);\n          this.map[i][j] = average([this.map[y0][x0], this.map[y0][x1], this.map[y1][x0], this.map[y1][x1]]) + random(this.offset);\n        }\n      }\n      this.isDiamondStep = false;\n    } else {\n      //square step\n      //square size: size / (i * 2)\n      //square step starts at (ss, 0) and increments by ss starting with 2nd row (0, ss)\n      //ref points are (x + ss, y), (x - ss, y), (x, y + ss), (x, y - ss)\n      //the square step will make two passes since the array is staggered\n      for (var _i = dist; _i < this.size; _i += 2 * dist) {\n        for (var _j = 0; _j < this.size; _j += 2 * dist) {\n          var _y = mod(_i + dist, end_idx);\n          var _y2 = mod(_i - dist, end_idx);\n          var _x = mod(_j + dist, end_idx);\n          var _x2 = mod(_j - dist, end_idx);\n          this.map[_i][_j] = average([this.map[_y][_j], this.map[_y2][_j], this.map[_i][_x], this.map[_i][_x2]]) + random(this.offset);\n        }\n      }\n      for (var _i2 = 0; _i2 < this.size; _i2 += 2 * dist) {\n        for (var _j2 = dist; _j2 < this.size; _j2 += 2 * dist) {\n          var _y3 = mod(_i2 + dist, end_idx);\n          var _y4 = mod(_i2 - dist, end_idx);\n          var _x3 = mod(_j2 + dist, end_idx);\n          var _x4 = mod(_j2 - dist, end_idx);\n          this.map[_i2][_j2] = average([this.map[_y3][_j2], this.map[_y4][_j2], this.map[_i2][_x3], this.map[_i2][_x4]]) + random(this.offset);\n        }\n      }\n      offset = 1 / (2 * this.num_iterations);\n      this.isDiamondStep = true;\n      this.num_iterations++;\n      this.chunk_size = Math.floor(this.chunk_size / 2);\n    }\n  }\n};\nmodule.exports = ds;\n\n//# sourceURL=webpack://1d-terrain-generation/./src/diamond_square.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var _class;\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\nvar p5 = __webpack_require__(/*! p5 */ \"./node_modules/p5/lib/p5.min.js\");\nvar gui = new dat.GUI({\n  name: \"GUI\"\n});\nvar md = __webpack_require__(/*! ./midpoint_displacement.js */ \"./src/midpoint_displacement.js\");\nvar ds = __webpack_require__(/*! ./diamond_square.js */ \"./src/diamond_square.js\");\nvar Point = md.Point;\nvar random = md.random;\nvar heightMap = {\n  red: 0.1,\n  yellow: 0.5,\n  green: 0.7,\n  blue: 1\n};\ngui.add(heightMap, 'red').min(0).max(1).step(0.01);\ngui.add(heightMap, 'yellow').min(0).max(1).step(0.01);\ngui.add(heightMap, 'green').min(0).max(1).step(0.01);\ngui.add(heightMap, 'blue').min(0).max(1).step(0.01);\nvar GenerationMethod = /*#__PURE__*/_createClass(function GenerationMethod(name) {\n  _classCallCheck(this, GenerationMethod);\n  this.name = name;\n}); // NOTE: to change generation method, please do so at this line\n_class = GenerationMethod;\n_defineProperty(GenerationMethod, \"MidpointDisplacement\", new _class(\"Midpoint Displacement\"));\n_defineProperty(GenerationMethod, \"DiamondSquare\", new _class(\"Diamond-square\"));\nvar generation_method = GenerationMethod.DiamondSquare;\n\n//midpoint displacement starting config\nvar MAX_X = window.innerWidth;\nvar MAX_Y = window.innerHeight;\nvar LINE_RESOLUTION = 500; //deprecated\nvar START_Y = Math.floor(window.innerHeight / 2);\nvar INIT_DISPLACEMENT = Math.floor(window.innerHeight / 3);\n\n//diamond square starting config\n\n//start generation\nif (generation_method == GenerationMethod.MidpointDisplacement) {\n  var left_pt = new Point(0, START_Y + random(INIT_DISPLACEMENT));\n  var right_pt = new Point(MAX_X, START_Y + random(INIT_DISPLACEMENT));\n  md.setDisplacement(INIT_DISPLACEMENT);\n  md.setStartPoints(left_pt, right_pt);\n} else if (generation_method == GenerationMethod.DiamondSquare) {\n  ds.init(500, 0.1);\n}\n// draw on the canvas\nvar s = function s(sk) {\n  sk.setup = function () {\n    sk.createCanvas(window.innerHeight, window.innerHeight);\n    sk.background(40);\n    sk.frameRate(5);\n  };\n  sk.draw = function () {\n    if (generation_method == GenerationMethod.MidpointDisplacement) {\n      sk.background(40);\n\n      //draw the line\n      md.line.forEach(function (elem, idx, arr) {\n        sk.strokeWeight(1);\n        sk.stroke(255);\n        if (idx > 0) {\n          sk.line(arr[idx - 1].x, arr[idx - 1].y, elem.x, elem.y);\n        }\n      });\n      //generate a new set of points between the current ones\n      if (md.num_iterations < 9) {\n        md.generateMidpointDisplacement(1);\n      }\n    } else if (generation_method == GenerationMethod.DiamondSquare) {\n      sk.background(0, 0, 255);\n      sk.strokeWeight(0);\n      //compute the dimensions of each square\n      var unit_size = Math.floor(window.innerHeight / ds.size);\n      ds.map.forEach(function (row, y_idx) {\n        row.forEach(function (value, x_idx) {\n          if (value || value == 0) {\n            switch (true) {\n              case value < heightMap.red:\n                sk.fill(\"red\");\n                break;\n              case value < heightMap.yellow:\n                sk.fill(\"yellow\");\n                break;\n              case value < heightMap.green:\n                sk.fill(\"green\");\n                break;\n              case value < heightMap.blue:\n                sk.fill(\"blue\");\n                break;\n            }\n          } else {\n            sk.fill(\"red\");\n          }\n          sk.square(x_idx * unit_size, y_idx * unit_size, unit_size);\n        });\n      });\n      ds.iterate();\n    }\n  };\n};\nvar p = new p5(s);\nfunction stringify(array) {\n  return JSON.parse(JSON.stringify(array));\n}\n\n//# sourceURL=webpack://1d-terrain-generation/./src/index.js?");

/***/ }),

/***/ "./src/midpoint_displacement.js":
/*!**************************************!*\
  !*** ./src/midpoint_displacement.js ***!
  \**************************************/
/***/ ((module) => {

eval("function _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction random(max) {\n  return Math.floor(Math.random() * max);\n}\nvar md = {\n  line: [],\n  num_iterations: 0,\n  setStartPoints: function setStartPoints(p1, p2) {\n    this.line.push(p1);\n    this.line.push(p2);\n  },\n  setDisplacement: function setDisplacement(displacement) {\n    this.displacement = displacement;\n  },\n  generateMidpointDisplacement: function generateMidpointDisplacement(iter) {\n    var _this = this;\n    var new_pts = [];\n    this.line.forEach(function (elem, idx, arr) {\n      if (idx > 0) {\n        var new_x = Math.floor((arr[idx - 1].x + elem.x) / 2);\n        var new_displacement = random(_this.displacement) * -1 * random(2);\n        var new_y = Math.floor((arr[idx - 1].y + elem.y) / 2) + new_displacement;\n        var new_pt = new md.Point(new_x, new_y);\n        new_pts.push(new_pt);\n      }\n    });\n    //reduce displacement\n    this.displacement *= 1 / (this.line.length / 2);\n    for (var i = 0; i < new_pts.length; i++) {\n      this.line.splice(2 * i + 1, 0, new_pts[i]);\n    }\n    this.num_iterations++;\n  },\n  Point: /*#__PURE__*/_createClass(function Point(x, y) {\n    _classCallCheck(this, Point);\n    this.x = x;\n    this.y = y;\n  }),\n  random: random\n};\nmodule.exports = md;\n\n//# sourceURL=webpack://1d-terrain-generation/./src/midpoint_displacement.js?");

/***/ }),

/***/ "./node_modules/p5/lib/p5.min.js":
/*!***************************************!*\
  !*** ./node_modules/p5/lib/p5.min.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;