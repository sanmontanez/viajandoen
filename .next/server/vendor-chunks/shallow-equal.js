"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/shallow-equal";
exports.ids = ["vendor-chunks/shallow-equal"];
exports.modules = {

/***/ "(ssr)/./node_modules/shallow-equal/dist/index.esm.js":
/*!******************************************************!*\
  !*** ./node_modules/shallow-equal/dist/index.esm.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   shallowEqualArrays: () => (/* binding */ shallowEqualArrays),\n/* harmony export */   shallowEqualObjects: () => (/* binding */ shallowEqualObjects)\n/* harmony export */ });\nfunction shallowEqualObjects(objA, objB) {\n  if (objA === objB) {\n    return true;\n  }\n\n  if (!objA || !objB) {\n    return false;\n  }\n\n  var aKeys = Object.keys(objA);\n  var bKeys = Object.keys(objB);\n  var len = aKeys.length;\n\n  if (bKeys.length !== len) {\n    return false;\n  }\n\n  for (var i = 0; i < len; i++) {\n    var key = aKeys[i];\n\n    if (objA[key] !== objB[key] || !Object.prototype.hasOwnProperty.call(objB, key)) {\n      return false;\n    }\n  }\n\n  return true;\n}\n\nfunction shallowEqualArrays(arrA, arrB) {\n  if (arrA === arrB) {\n    return true;\n  }\n\n  if (!arrA || !arrB) {\n    return false;\n  }\n\n  var len = arrA.length;\n\n  if (arrB.length !== len) {\n    return false;\n  }\n\n  for (var i = 0; i < len; i++) {\n    if (arrA[i] !== arrB[i]) {\n      return false;\n    }\n  }\n\n  return true;\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc2hhbGxvdy1lcXVhbC9kaXN0L2luZGV4LmVzbS5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixTQUFTO0FBQzNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVtRCIsInNvdXJjZXMiOlsid2VicGFjazovL215LXRyYXZlbC1hZ2VuY3kvLi9ub2RlX21vZHVsZXMvc2hhbGxvdy1lcXVhbC9kaXN0L2luZGV4LmVzbS5qcz82NTMyIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNoYWxsb3dFcXVhbE9iamVjdHMob2JqQSwgb2JqQikge1xuICBpZiAob2JqQSA9PT0gb2JqQikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKCFvYmpBIHx8ICFvYmpCKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGFLZXlzID0gT2JqZWN0LmtleXMob2JqQSk7XG4gIHZhciBiS2V5cyA9IE9iamVjdC5rZXlzKG9iakIpO1xuICB2YXIgbGVuID0gYUtleXMubGVuZ3RoO1xuXG4gIGlmIChiS2V5cy5sZW5ndGggIT09IGxlbikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIga2V5ID0gYUtleXNbaV07XG5cbiAgICBpZiAob2JqQVtrZXldICE9PSBvYmpCW2tleV0gfHwgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmpCLCBrZXkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHNoYWxsb3dFcXVhbEFycmF5cyhhcnJBLCBhcnJCKSB7XG4gIGlmIChhcnJBID09PSBhcnJCKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAoIWFyckEgfHwgIWFyckIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgbGVuID0gYXJyQS5sZW5ndGg7XG5cbiAgaWYgKGFyckIubGVuZ3RoICE9PSBsZW4pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGFyckFbaV0gIT09IGFyckJbaV0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IHsgc2hhbGxvd0VxdWFsQXJyYXlzLCBzaGFsbG93RXF1YWxPYmplY3RzIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/shallow-equal/dist/index.esm.js\n");

/***/ })

};
;