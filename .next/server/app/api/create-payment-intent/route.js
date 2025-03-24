"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/create-payment-intent/route";
exports.ids = ["app/api/create-payment-intent/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcreate-payment-intent%2Froute&page=%2Fapi%2Fcreate-payment-intent%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcreate-payment-intent%2Froute.js&appDir=%2FUsers%2Fmarlonmontanez%2Fmy-travel-agency%2Fviajandoen%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmarlonmontanez%2Fmy-travel-agency%2Fviajandoen&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcreate-payment-intent%2Froute&page=%2Fapi%2Fcreate-payment-intent%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcreate-payment-intent%2Froute.js&appDir=%2FUsers%2Fmarlonmontanez%2Fmy-travel-agency%2Fviajandoen%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmarlonmontanez%2Fmy-travel-agency%2Fviajandoen&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_marlonmontanez_my_travel_agency_viajandoen_src_app_api_create_payment_intent_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/create-payment-intent/route.js */ \"(rsc)/./src/app/api/create-payment-intent/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/create-payment-intent/route\",\n        pathname: \"/api/create-payment-intent\",\n        filename: \"route\",\n        bundlePath: \"app/api/create-payment-intent/route\"\n    },\n    resolvedPagePath: \"/Users/marlonmontanez/my-travel-agency/viajandoen/src/app/api/create-payment-intent/route.js\",\n    nextConfigOutput,\n    userland: _Users_marlonmontanez_my_travel_agency_viajandoen_src_app_api_create_payment_intent_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/create-payment-intent/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZjcmVhdGUtcGF5bWVudC1pbnRlbnQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmNyZWF0ZS1wYXltZW50LWludGVudCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmNyZWF0ZS1wYXltZW50LWludGVudCUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRm1hcmxvbm1vbnRhbmV6JTJGbXktdHJhdmVsLWFnZW5jeSUyRnZpYWphbmRvZW4lMkZzcmMlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGbWFybG9ubW9udGFuZXolMkZteS10cmF2ZWwtYWdlbmN5JTJGdmlhamFuZG9lbiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDNEM7QUFDekg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS10cmF2ZWwtYWdlbmN5Lz84ZmE1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9tYXJsb25tb250YW5lei9teS10cmF2ZWwtYWdlbmN5L3ZpYWphbmRvZW4vc3JjL2FwcC9hcGkvY3JlYXRlLXBheW1lbnQtaW50ZW50L3JvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9jcmVhdGUtcGF5bWVudC1pbnRlbnQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9jcmVhdGUtcGF5bWVudC1pbnRlbnRcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2NyZWF0ZS1wYXltZW50LWludGVudC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9tYXJsb25tb250YW5lei9teS10cmF2ZWwtYWdlbmN5L3ZpYWphbmRvZW4vc3JjL2FwcC9hcGkvY3JlYXRlLXBheW1lbnQtaW50ZW50L3JvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9jcmVhdGUtcGF5bWVudC1pbnRlbnQvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcreate-payment-intent%2Froute&page=%2Fapi%2Fcreate-payment-intent%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcreate-payment-intent%2Froute.js&appDir=%2FUsers%2Fmarlonmontanez%2Fmy-travel-agency%2Fviajandoen%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmarlonmontanez%2Fmy-travel-agency%2Fviajandoen&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/create-payment-intent/route.js":
/*!****************************************************!*\
  !*** ./src/app/api/create-payment-intent/route.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! stripe */ \"(rsc)/./node_modules/stripe/esm/stripe.esm.node.js\");\n\nconst stripe = new stripe__WEBPACK_IMPORTED_MODULE_0__[\"default\"](process.env.STRIPE_SECRET_KEY, {\n    apiVersion: \"2022-11-15\"\n});\nconst POST = async (req, res)=>{\n    const { amount } = await req.json();\n    try {\n        const paymentIntent = await stripe.paymentIntents.create({\n            amount: Math.round(amount * 100),\n            currency: \"usd\"\n        });\n        return new Response(JSON.stringify({\n            clientSecret: paymentIntent.client_secret\n        }), {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"Error creating payment intent:\", error);\n        return new Response(JSON.stringify({\n            error: error.message\n        }), {\n            status: 500\n        });\n    }\n};\nconst GET = async (req, res)=>{\n    return new Response(\"Method not allowed\", {\n        status: 405\n    });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9jcmVhdGUtcGF5bWVudC1pbnRlbnQvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTRCO0FBRTVCLE1BQU1DLFNBQVMsSUFBSUQsOENBQU1BLENBQUNFLFFBQVFDLEdBQUcsQ0FBQ0MsaUJBQWlCLEVBQUU7SUFBRUMsWUFBWTtBQUFhO0FBRTdFLE1BQU1DLE9BQU8sT0FBT0MsS0FBS0M7SUFDOUIsTUFBTSxFQUFFQyxNQUFNLEVBQUUsR0FBRyxNQUFNRixJQUFJRyxJQUFJO0lBRWpDLElBQUk7UUFDRixNQUFNQyxnQkFBZ0IsTUFBTVYsT0FBT1csY0FBYyxDQUFDQyxNQUFNLENBQUM7WUFDdkRKLFFBQVFLLEtBQUtDLEtBQUssQ0FBQ04sU0FBUztZQUM1Qk8sVUFBVTtRQUNaO1FBRUEsT0FBTyxJQUFJQyxTQUFTQyxLQUFLQyxTQUFTLENBQUM7WUFBRUMsY0FBY1QsY0FBY1UsYUFBYTtRQUFDLElBQUk7WUFBRUMsUUFBUTtRQUFJO0lBQ25HLEVBQUUsT0FBT0MsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsa0NBQWtDQTtRQUNoRCxPQUFPLElBQUlOLFNBQVNDLEtBQUtDLFNBQVMsQ0FBQztZQUFFSSxPQUFPQSxNQUFNRSxPQUFPO1FBQUMsSUFBSTtZQUFFSCxRQUFRO1FBQUk7SUFDOUU7QUFDRixFQUFFO0FBRUssTUFBTUksTUFBTSxPQUFPbkIsS0FBS0M7SUFDN0IsT0FBTyxJQUFJUyxTQUFTLHNCQUFzQjtRQUFFSyxRQUFRO0lBQUk7QUFDMUQsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL215LXRyYXZlbC1hZ2VuY3kvLi9zcmMvYXBwL2FwaS9jcmVhdGUtcGF5bWVudC1pbnRlbnQvcm91dGUuanM/YjBlMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3RyaXBlIGZyb20gJ3N0cmlwZSc7XG5cbmNvbnN0IHN0cmlwZSA9IG5ldyBTdHJpcGUocHJvY2Vzcy5lbnYuU1RSSVBFX1NFQ1JFVF9LRVksIHsgYXBpVmVyc2lvbjogJzIwMjItMTEtMTUnIH0pO1xuXG5leHBvcnQgY29uc3QgUE9TVCA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IGFtb3VudCB9ID0gYXdhaXQgcmVxLmpzb24oKTtcblxuICB0cnkge1xuICAgIGNvbnN0IHBheW1lbnRJbnRlbnQgPSBhd2FpdCBzdHJpcGUucGF5bWVudEludGVudHMuY3JlYXRlKHtcbiAgICAgIGFtb3VudDogTWF0aC5yb3VuZChhbW91bnQgKiAxMDApLCAvLyBTdHJpcGUgdXNhIGNlbnRhdm9zLCBhc8OtIHF1ZSBtdWx0aXBsaWNhbW9zIHBvciAxMDBcbiAgICAgIGN1cnJlbmN5OiAndXNkJyxcbiAgICB9KTtcblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBjbGllbnRTZWNyZXQ6IHBheW1lbnRJbnRlbnQuY2xpZW50X3NlY3JldCB9KSwgeyBzdGF0dXM6IDIwMCB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjcmVhdGluZyBwYXltZW50IGludGVudDonLCBlcnJvcik7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBlcnJvci5tZXNzYWdlIH0pLCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgR0VUID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHJldHVybiBuZXcgUmVzcG9uc2UoJ01ldGhvZCBub3QgYWxsb3dlZCcsIHsgc3RhdHVzOiA0MDUgfSk7XG59O1xuIl0sIm5hbWVzIjpbIlN0cmlwZSIsInN0cmlwZSIsInByb2Nlc3MiLCJlbnYiLCJTVFJJUEVfU0VDUkVUX0tFWSIsImFwaVZlcnNpb24iLCJQT1NUIiwicmVxIiwicmVzIiwiYW1vdW50IiwianNvbiIsInBheW1lbnRJbnRlbnQiLCJwYXltZW50SW50ZW50cyIsImNyZWF0ZSIsIk1hdGgiLCJyb3VuZCIsImN1cnJlbmN5IiwiUmVzcG9uc2UiLCJKU09OIiwic3RyaW5naWZ5IiwiY2xpZW50U2VjcmV0IiwiY2xpZW50X3NlY3JldCIsInN0YXR1cyIsImVycm9yIiwiY29uc29sZSIsIm1lc3NhZ2UiLCJHRVQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/create-payment-intent/route.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/qs","vendor-chunks/object-inspect","vendor-chunks/get-intrinsic","vendor-chunks/side-channel","vendor-chunks/define-data-property","vendor-chunks/has-symbols","vendor-chunks/function-bind","vendor-chunks/call-bind","vendor-chunks/set-function-length","vendor-chunks/has-property-descriptors","vendor-chunks/es-errors","vendor-chunks/es-define-property","vendor-chunks/has-proto","vendor-chunks/gopd","vendor-chunks/hasown","vendor-chunks/stripe"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcreate-payment-intent%2Froute&page=%2Fapi%2Fcreate-payment-intent%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcreate-payment-intent%2Froute.js&appDir=%2FUsers%2Fmarlonmontanez%2Fmy-travel-agency%2Fviajandoen%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmarlonmontanez%2Fmy-travel-agency%2Fviajandoen&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();