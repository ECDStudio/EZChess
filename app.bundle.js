/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_Player__ = __webpack_require__(1);


let chess = {
	player1: new __WEBPACK_IMPORTED_MODULE_0__models_Player__["a" /* default */]('white'),
	player2: new __WEBPACK_IMPORTED_MODULE_0__models_Player__["a" /* default */]('black')
};

window.chess = chess;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Piece__ = __webpack_require__(2);


class Player {
	constructor(side) {
		this.isTurn = false;
		this.pieces = {
			king: new __WEBPACK_IMPORTED_MODULE_0__Piece__["a" /* default */](side === 'white' ? 1 : 8, 4),
			queen: new __WEBPACK_IMPORTED_MODULE_0__Piece__["a" /* default */](side === 'white' ? 1 : 8, 5),
			rook1: new __WEBPACK_IMPORTED_MODULE_0__Piece__["a" /* default */](side === 'white' ? 1 : 8, 1),
			rook2: new __WEBPACK_IMPORTED_MODULE_0__Piece__["a" /* default */](side === 'white' ? 1 : 8, 8),
			knight1: new __WEBPACK_IMPORTED_MODULE_0__Piece__["a" /* default */](side === 'white' ? 1 : 8, 2),
			knight2: new __WEBPACK_IMPORTED_MODULE_0__Piece__["a" /* default */](side === 'white' ? 1 : 8, 7),
			bishop1: new __WEBPACK_IMPORTED_MODULE_0__Piece__["a" /* default */](side === 'white' ? 1 : 8, 3),
			bishop2: new __WEBPACK_IMPORTED_MODULE_0__Piece__["a" /* default */](side === 'white' ? 1 : 8, 6),
			pawn1: new __WEBPACK_IMPORTED_MODULE_0__Piece__["a" /* default */](side === 'white' ? 2 : 7, 1),
			pawn2: new __WEBPACK_IMPORTED_MODULE_0__Piece__["a" /* default */](side === 'white' ? 2 : 7, 2),
			pawn3: new __WEBPACK_IMPORTED_MODULE_0__Piece__["a" /* default */](side === 'white' ? 2 : 7, 3),
			pawn4: new __WEBPACK_IMPORTED_MODULE_0__Piece__["a" /* default */](side === 'white' ? 2 : 7, 4),
			pawn5: new __WEBPACK_IMPORTED_MODULE_0__Piece__["a" /* default */](side === 'white' ? 2 : 7, 5),
			pawn6: new __WEBPACK_IMPORTED_MODULE_0__Piece__["a" /* default */](side === 'white' ? 2 : 7, 6),
			pawn7: new __WEBPACK_IMPORTED_MODULE_0__Piece__["a" /* default */](side === 'white' ? 2 : 7, 7),
			pawn8: new __WEBPACK_IMPORTED_MODULE_0__Piece__["a" /* default */](side === 'white' ? 2 : 7, 8),
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Piece {
	constructor(pX, pY) {
		this.position = {
			x: pX,
			y: pY
		};
		this.step = 0;
		this.self = this;
	}
	
	toPosition(pX, pY) {
		if (typeof pX === 'number' && typeof pY === 'number') {
			if (pX > 0 && pX <= 8 && pY > 0 && pY <= 8) {
				this.position.x = pX;
				this.position.y = pY;
				this.step += 1;
			} else if (pX === 0 && pY === 0) {
				// [0, 0] position is being captured
				this.position.x = pX;
				this.position.y = pY;
			}
		}
		return [this.position.x, this.position.y];
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Piece;


/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.map