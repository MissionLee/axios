(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["promise-cache-controller"] = factory();
	else
		root["promise-cache-controller"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PromiseCacheController_1 = __importDefault(__webpack_require__(/*! ./lib/core/PromiseCacheController */ "./lib/core/PromiseCacheController.ts"));
exports.default = PromiseCacheController_1.default;


/***/ }),

/***/ "./lib/adapters/LocalStorageCacheAdapter.ts":
/*!**************************************************!*\
  !*** ./lib/adapters/LocalStorageCacheAdapter.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class LocalStorageCacheAdapter {
    clear() {
        localStorage.clear();
    }
    getCache(key) {
        return new Promise(function (resolve) {
            resolve(localStorage.getItem(key));
        });
    }
    getItem(key) {
        return localStorage.getItem(key);
    }
    key(index) {
        return localStorage.key(index);
    }
    removeItem(key) {
        localStorage.removeItem(key);
    }
    setCache(key, value) {
        localStorage.setItem(key, value);
    }
    setItem(key, value) {
        this.setCache(key, value);
    }
    support() {
        return window && window.localStorage && Storage && window.localStorage instanceof Storage;
    }
}
exports.default = LocalStorageCacheAdapter;


/***/ }),

/***/ "./lib/adapters/RAMCacheAdapter.ts":
/*!*****************************************!*\
  !*** ./lib/adapters/RAMCacheAdapter.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class RAMCacheAdapter {
    clear() {
        this.cache = {};
    }
    getCache(key) {
        let _this = this;
        // @ts-ignore
        return new Promise(function getTheCache(resolve) {
            resolve(_this.cache[key]);
        });
    }
    getItem(key) {
        return this.cache[key];
    }
    key(index) {
        throw new Error("function RAMCacheAdapter.ts.key(index: number) not supported");
    }
    removeItem(key) {
        delete this.cache[key];
    }
    setCache(key, value) {
        this.cache[key] = value;
    }
    setItem(key, value) {
        this.setCache(key, value);
    }
    support() {
        return true;
    }
}
exports.default = RAMCacheAdapter;


/***/ }),

/***/ "./lib/core/PromiseCacheController.ts":
/*!********************************************!*\
  !*** ./lib/core/PromiseCacheController.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LocalStorageCacheAdapter_1 = __importDefault(__webpack_require__(/*! ../adapters/LocalStorageCacheAdapter */ "./lib/adapters/LocalStorageCacheAdapter.ts"));
// ⭐ 很坑的一点，IDEA创建文件 xx.ts import没有问题，但是创建 TypeScript 类型的 xx文件 import的时候找不到
const RAMCacheAdapter_1 = __importDefault(__webpack_require__(/*! ../adapters/RAMCacheAdapter */ "./lib/adapters/RAMCacheAdapter.ts"));
let LocalStorageCacheController = new LocalStorageCacheAdapter_1.default();
let RAMCacheController = new RAMCacheAdapter_1.default();
let CacheController = LocalStorageCacheController;
if (!CacheController.support()) {
    CacheController = RAMCacheController;
}
// export 多个普通对象要写在一起
// export {LocalStorageCacheController,RAMCacheController};
// 可以独立export default
exports.default = CacheController;


/***/ })

/******/ });
});
//# sourceMappingURL=CacheController.map