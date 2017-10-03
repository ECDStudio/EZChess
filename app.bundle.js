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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _app = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Piece = function () {
	function Piece(side, pX, pY) {
		_classCallCheck(this, Piece);

		this.side = side;
		this.position = {
			x: pX,
			y: pY
		};
		this.step = 0;
	}

	_createClass(Piece, [{
		key: 'toPosition',
		value: function toPosition(pX, pY) {
			if (typeof pX === 'number' && typeof pY === 'number') {
				if (pX >= 0 && pX < 8 && pY >= 0 && pY < 8) {
					this.position.x = pX;
					this.position.y = pY;
					this.step += 1;

					// capture enemy piece in target Position
					for (var player in _app.chess) {
						if (_app.chess[player].side !== this.side) {
							for (var piece in _app.chess[player].pieces) {
								if (_app.chess[player].pieces[piece].position.x === pX && _app.chess[player].pieces[piece].position.y === pY) {
									_app.chess[player].pieces[piece].position = { x: -1, y: -1 };
								}
							}
						}
					}
				} else if (pX === -1 && pY === -1) {
					// [-1, -1] position is being captured
					this.position.x = pX;
					this.position.y = pY;
				}
			}
			return [this.position.x, this.position.y];
		}
	}]);

	return Piece;
}();

exports.default = Piece;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.chess = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Player = __webpack_require__(3);

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chess = function () {
	function Chess() {
		_classCallCheck(this, Chess);

		this.player1 = new _Player2.default('white'), this.player2 = new _Player2.default('black');
	}

	_createClass(Chess, [{
		key: 'reset',
		value: function reset() {
			this.player1 = new _Player2.default('white'), this.player2 = new _Player2.default('black');
		}
	}, {
		key: 'switchTurn',
		value: function switchTurn() {
			this.player1.isTurn = !this.player1.isTurn;
			this.player2.isTurn = !this.player2.isTurn;
		}
	}]);

	return Chess;
}();

;

var chess = exports.chess = new Chess();

window.chess = chess;
__webpack_require__(7);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.checkPosition = undefined;

var _app = __webpack_require__(1);

var checkPosition = exports.checkPosition = function checkPosition(x, y, side) {
	for (var player in _app.chess) {
		for (var piece in _app.chess[player].pieces) {
			if (_app.chess[player].pieces[piece].position.x === x && _app.chess[player].pieces[piece].position.y === y) {
				if (_app.chess[player].side === side) {
					// check if there is piece from the same side
					return 'friendly';
				} else {
					// check if there is piece from the other side (can capture)
					return 'enemy';
				}
			}
		}
	}
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _King = __webpack_require__(8);

var _King2 = _interopRequireDefault(_King);

var _Queen = __webpack_require__(9);

var _Queen2 = _interopRequireDefault(_Queen);

var _Rook = __webpack_require__(4);

var _Rook2 = _interopRequireDefault(_Rook);

var _Knight = __webpack_require__(5);

var _Knight2 = _interopRequireDefault(_Knight);

var _Bishop = __webpack_require__(6);

var _Bishop2 = _interopRequireDefault(_Bishop);

var _Pawn = __webpack_require__(10);

var _Pawn2 = _interopRequireDefault(_Pawn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function Player(side) {
	_classCallCheck(this, Player);

	this.side = side;
	this.isTurn = side === 'white' ? true : false;
	this.pieces = {
		king: new _King2.default(side, side === 'white' ? 0 : 7, 3),
		queen: new _Queen2.default(side, side === 'white' ? 0 : 7, 4),
		rook1: new _Rook2.default(side, side === 'white' ? 0 : 7, 0),
		rook2: new _Rook2.default(side, side === 'white' ? 0 : 7, 7),
		knight1: new _Knight2.default(side, side === 'white' ? 0 : 7, 1),
		knight2: new _Knight2.default(side, side === 'white' ? 0 : 7, 6),
		bishop1: new _Bishop2.default(side, side === 'white' ? 0 : 7, 2),
		bishop2: new _Bishop2.default(side, side === 'white' ? 0 : 7, 5),
		pawn1: new _Pawn2.default(side, side === 'white' ? 1 : 6, 0),
		pawn2: new _Pawn2.default(side, side === 'white' ? 1 : 6, 1),
		pawn3: new _Pawn2.default(side, side === 'white' ? 1 : 6, 2),
		pawn4: new _Pawn2.default(side, side === 'white' ? 1 : 6, 3),
		pawn5: new _Pawn2.default(side, side === 'white' ? 1 : 6, 4),
		pawn6: new _Pawn2.default(side, side === 'white' ? 1 : 6, 5),
		pawn7: new _Pawn2.default(side, side === 'white' ? 1 : 6, 6),
		pawn8: new _Pawn2.default(side, side === 'white' ? 1 : 6, 7)
	};
};

exports.default = Player;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Piece2 = __webpack_require__(0);

var _Piece3 = _interopRequireDefault(_Piece2);

var _checkPosition = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rook = function (_Piece) {
	_inherits(Rook, _Piece);

	function Rook(side, pX, pY) {
		_classCallCheck(this, Rook);

		var _this = _possibleConstructorReturn(this, (Rook.__proto__ || Object.getPrototypeOf(Rook)).call(this, side, pX, pY));

		_this.class = 'rook';
		return _this;
	}

	// returns an array of available positions to move to,
	// including possible captures;
	// empty if there is none


	_createClass(Rook, [{
		key: 'availableMoves',
		value: function availableMoves() {
			var _this2 = this;

			// dynamic-static x-y positions to call checkPosition(),
			// used to determine if there is a friendly or enemy piece at that position
			var checkX = function checkX(target) {
				return (0, _checkPosition.checkPosition)(target, _this2.position.y, _this2.side);
			},
			    checkY = function checkY(target) {
				return (0, _checkPosition.checkPosition)(_this2.position.x, target, _this2.side);
			};

			var positions = [],
			    xUp = true,
			    xDown = true,
			    yUp = true,
			    yDown = true;

			// loop through all possible positions in 4 directions;
			// stops AT position with a friendly piece,
			// or AFTER position with an enenmy piece(capture);
			// the for loop makes sure the position is in bound of the chessboard(1-8),
			// and is not the position the piece is currently standing
			for (var i = this.position.x + 1; i < 8; i += 1) {
				if (xUp === true) {
					if (checkX(i) === 'friendly' || checkX(i) === 'enemy') {
						xUp = false;
					}
					if (checkX(i) !== 'friendly') {
						positions.push([i, this.position.y]);
					}
				}
			}
			for (var _i = this.position.x - 1; _i >= 0; _i -= 1) {
				if (xDown === true) {
					if (checkX(_i) === 'friendly' || checkX(_i) === 'enemy') {
						xDown = false;
					}
					if (checkX(_i) !== 'friendly') {
						positions.push([_i, this.position.y]);
					}
				}
			}
			for (var _i2 = this.position.y + 1; _i2 < 8; _i2 += 1) {
				if (yUp === true) {
					if (checkY(_i2) === 'friendly' || checkY(_i2) === 'enemy') {
						yUp = false;
					}
					if (checkY(_i2) !== 'friendly') {
						positions.push([this.position.x, _i2]);
					}
				}
			}
			for (var _i3 = this.position.y - 1; _i3 >= 0; _i3 -= 1) {
				if (yDown === true) {
					if (checkY(_i3) === 'friendly' || checkY(_i3) === 'enemy') {
						yDown = false;
					}
					if (checkY(_i3) !== 'friendly') {
						positions.push([this.position.x, _i3]);
					}
				}
			}

			return positions;
		}
	}]);

	return Rook;
}(_Piece3.default);

exports.default = Rook;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Piece2 = __webpack_require__(0);

var _Piece3 = _interopRequireDefault(_Piece2);

var _checkPosition = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Knight = function (_Piece) {
	_inherits(Knight, _Piece);

	function Knight(side, pX, pY) {
		_classCallCheck(this, Knight);

		var _this = _possibleConstructorReturn(this, (Knight.__proto__ || Object.getPrototypeOf(Knight)).call(this, side, pX, pY));

		_this.class = 'knight';
		return _this;
	}

	// returns an array of available positions to move to,
	// including possible captures;
	// empty if there is none


	_createClass(Knight, [{
		key: 'availableMoves',
		value: function availableMoves() {
			var positions = [],
			    targets = [[this.position.x + 1, this.position.y + 2], [this.position.x + 2, this.position.y + 1], [this.position.x + 1, this.position.y - 2], [this.position.x + 2, this.position.y - 1], [this.position.x - 1, this.position.y + 2], [this.position.x - 2, this.position.y + 1], [this.position.x - 1, this.position.y - 2], [this.position.x - 2, this.position.y - 1]];

			for (var i = 0; i < targets.length; i += 1) {
				// first loop makes sure target position's in bound (0 - 7)
				if (targets[i][0] >= 0 && targets[i][0] < 8 && targets[i][1] >= 0 && targets[i][1] < 8) {
					// second loop makes sure no friendly piece in target position
					if ((0, _checkPosition.checkPosition)(targets[i][0], targets[i][1], this.side) !== 'friendly') {
						positions.push([targets[i][0], targets[i][1]]);
					}
				}
			}

			return positions;
		}
	}]);

	return Knight;
}(_Piece3.default);

exports.default = Knight;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Piece2 = __webpack_require__(0);

var _Piece3 = _interopRequireDefault(_Piece2);

var _checkPosition = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bishop = function (_Piece) {
	_inherits(Bishop, _Piece);

	function Bishop(side, pX, pY) {
		_classCallCheck(this, Bishop);

		var _this = _possibleConstructorReturn(this, (Bishop.__proto__ || Object.getPrototypeOf(Bishop)).call(this, side, pX, pY));

		_this.class = 'bishop';
		return _this;
	}

	// returns an array of available positions to move to,
	// including possible captures;
	// empty if there is none


	_createClass(Bishop, [{
		key: 'availableMoves',
		value: function availableMoves() {
			var _this2 = this;

			// call checkPosition() to determine if there is a friendly or enemy piece at that position
			var check = function check(x, y) {
				return (0, _checkPosition.checkPosition)(x, y, _this2.side);
			};

			var positions = [],
			    rightUp = true,
			    rightDown = true,
			    leftUp = true,
			    leftDown = true;

			// loop through all possible positions in 4 directions;
			// stops AT position with a friendly piece,
			// or AFTER position with an enenmy piece(capture);
			// the for loop makes sure the position is in bound of the chessboard(1-8),
			// and is not the position the piece is currently standing
			for (var i = this.position.x + 1; i < 8; i += 1) {
				var yTarget = this.position.y + i - this.position.x;
				if (rightUp === true && yTarget >= 0 && yTarget < 8) {
					if (check(i, yTarget) === 'friendly' || check(i, yTarget) === 'enemy' || yTarget === 7) {
						rightUp = false;
					}
					if (check(i, yTarget) !== 'friendly') {
						positions.push([i, yTarget]);
					}
				}
			}
			for (var _i = this.position.x + 1; _i < 8; _i += 1) {
				var _yTarget = this.position.y - _i + this.position.x;
				if (rightDown === true && _yTarget >= 0 && _yTarget < 8) {
					if (check(_i, _yTarget) === 'friendly' || check(_i, _yTarget) === 'enemy' || _yTarget === 0) {
						rightDown = false;
					}
					if (check(_i, _yTarget) !== 'friendly') {
						positions.push([_i, _yTarget]);
					}
				}
			}
			for (var _i2 = this.position.x - 1; _i2 >= 0; _i2 -= 1) {
				var _yTarget2 = this.position.y + _i2 - this.position.x;
				if (leftUp === true && _yTarget2 >= 0 && _yTarget2 < 8) {
					if (check(_i2, _yTarget2) === 'friendly' || check(_i2, _yTarget2) === 'enemy' || _yTarget2 === 7) {
						leftUp = false;
					}
					if (check(_i2, _yTarget2) !== 'friendly') {
						positions.push([_i2, _yTarget2]);
					}
				}
			}
			for (var _i3 = this.position.x - 1; _i3 >= 0; _i3 -= 1) {
				var _yTarget3 = this.position.y - _i3 + this.position.x;
				if (leftDown === true && _yTarget3 >= 0 && _yTarget3 < 8) {
					if (check(_i3, _yTarget3) === 'friendly' || check(_i3, _yTarget3) === 'enemy' || _yTarget3 === 0) {
						leftDown = false;
					}
					if (check(_i3, _yTarget3) !== 'friendly') {
						positions.push([_i3, _yTarget3]);
					}
				}
			}

			return positions;
		}
	}]);

	return Bishop;
}(_Piece3.default);

exports.default = Bishop;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(1);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var container = document.createElement('div'),
    chessboard = document.createElement('div'),
    player1 = document.createElement('ul'),
    player2 = document.createElement('ul'),
    turnCounter = document.createElement('div');

container.id = 'container';
chessboard.id = 'chessboard';
document.getElementsByTagName('body')[0].append(container);
container.append(chessboard, turnCounter);
chessboard.append(player1, player2);

var indicateTurn = function indicateTurn() {
	// indicate player of current turn
	for (var player in _app.chess) {
		if (_app.chess[player].isTurn === true) {
			turnCounter.innerHTML = 'Current Turn: ' + _app.chess[player].side;
		}
	}
};
indicateTurn();

var watchPiece = function watchPiece(obj) {
	// first clear all targets if there is any
	var clearTargets = function clearTargets() {
		var _loop = function _loop(i) {
			// remove all targets after selecting one
			setTimeout(function () {
				i.parentElement.removeChild(i);
			});
		};

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = document.getElementsByClassName('target-position')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var i = _step.value;

				_loop(i);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	};
	clearTargets();
	// create positions for a piece to move to on the UI

	var _loop2 = function _loop2(position) {
		var target = document.createElement('a');

		chessboard.append(target);
		target.classList.add('target-position');
		target.style.left = position[0] * 12.5 + '%';
		target.style.bottom = position[1] * 12.5 + '%';
		target.addEventListener('click', function () {
			obj._toPos.apply(obj, _toConsumableArray(position));
			clearTargets();
			for (var player in _app.chess) {
				for (var piece in _app.chess[player].pieces) {
					_app.chess[player].pieces[piece]._watchCapture();
				}
			}
			_app.chess.switchTurn();
			indicateTurn();
		});
	};

	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = obj.availableMoves()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var position = _step2.value;

			_loop2(position);
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}
};

var _loop3 = function _loop3(player) {
	var _loop4 = function _loop4(piece) {
		// bind the piece on the UI to the vitual object
		var _pieceObj = _app.chess[player].pieces[piece];
		var _pieceUI = document.createElement('li');

		_pieceObj._toPos = function (pX, pY, enPass) {
			_pieceObj.toPosition(pX, pY, enPass);
			_pieceUI.style.zIndex = '20';
			_pieceUI.style.left = _pieceObj.position.x * 12.5 + '%';
			_pieceUI.style.bottom = _pieceObj.position.y * 12.5 + '%';
			setTimeout(function () {
				_pieceUI.style.zIndex = '1';
			}, 1000);
		};

		_pieceObj._toPos.apply(_pieceObj, _toConsumableArray(_pieceObj.position));
		_pieceObj._watchCapture = function () {
			// detect if a piece is captured, hide it on the UI
			if (_pieceObj.position.x === -1 && _pieceObj.position.y === -1) {
				setTimeout(function () {
					_pieceUI.style.display = 'none';
				}, 500);
			}
		};

		_pieceUI.classList.add('chess-piece', _app.chess[player].side, _pieceObj.class);
		if (player === 'player1') {
			player1.append(_pieceUI);
		} else {
			player2.append(_pieceUI);
		}
		_pieceUI.addEventListener('click', function () {
			// select a piece and move if it's its player's turn
			if (_app.chess[player].isTurn === true) {
				watchPiece(_pieceObj);
			}
		});
	};

	for (var piece in _app.chess[player].pieces) {
		_loop4(piece);
	}
};

for (var player in _app.chess) {
	_loop3(player);
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Piece2 = __webpack_require__(0);

var _Piece3 = _interopRequireDefault(_Piece2);

var _checkPosition = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var King = function (_Piece) {
	_inherits(King, _Piece);

	function King(side, pX, pY) {
		_classCallCheck(this, King);

		var _this = _possibleConstructorReturn(this, (King.__proto__ || Object.getPrototypeOf(King)).call(this, side, pX, pY));

		_this.class = 'king';
		return _this;
	}

	// returns an array of available positions to move to,
	// including possible captures;
	// empty if there is none


	_createClass(King, [{
		key: 'availableMoves',
		value: function availableMoves() {}
	}]);

	return King;
}(_Piece3.default);

exports.default = King;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Piece2 = __webpack_require__(0);

var _Piece3 = _interopRequireDefault(_Piece2);

var _checkPosition = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Queen = function (_Piece) {
	_inherits(Queen, _Piece);

	function Queen(side, pX, pY) {
		_classCallCheck(this, Queen);

		var _this = _possibleConstructorReturn(this, (Queen.__proto__ || Object.getPrototypeOf(Queen)).call(this, side, pX, pY));

		_this.class = 'queen';
		return _this;
	}

	// returns an array of available positions to move to,
	// including possible captures;
	// empty if there is none


	_createClass(Queen, [{
		key: 'availableMoves',
		value: function availableMoves() {}
	}]);

	return Queen;
}(_Piece3.default);

exports.default = Queen;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Piece2 = __webpack_require__(0);

var _Piece3 = _interopRequireDefault(_Piece2);

var _app = __webpack_require__(1);

var _checkPosition = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pawn = function (_Piece) {
	_inherits(Pawn, _Piece);

	function Pawn(side, pX, pY) {
		_classCallCheck(this, Pawn);

		var _this = _possibleConstructorReturn(this, (Pawn.__proto__ || Object.getPrototypeOf(Pawn)).call(this, side, pX, pY));

		_this.class = 'pawn';
		_this.enPassant = false;
		return _this;
	}

	// returns an array of available positions to move to,
	// including possible captures;
	// empty if there is none


	_createClass(Pawn, [{
		key: 'availableMoves',
		value: function availableMoves() {
			var _this2 = this;

			// call checkPosition() to determine if there is a friendly or enemy piece at that position
			var check = function check(x, y) {
				return (0, _checkPosition.checkPosition)(x, y, _this2.side);
			};

			var positions = [];

			// dynamic x direction
			var xDir = function xDir(x) {
				return _this2.side === 'white' ? _this2.position.x + x : _this2.position.x - x;
			};

			// first step can take 2 steps, otherwise 1
			if (this.step === 0) {
				if (check(xDir(2), this.position.y) !== 'friendly' && check(xDir(2), this.position.y) !== 'enemy') {
					positions.push([xDir(2), this.position.y, false]);
				}
			}
			if (check(xDir(1), this.position.y) !== 'friendly' && check(xDir(1), this.position.y) !== 'enemy') {
				positions.push([xDir(1), this.position.y, false]);
			}
			// capture diagonally
			if (check(xDir(1), this.position.y + 1) === 'enemy') {
				positions.push([xDir(1), this.position.y + 1, false]);
			}
			if (check(xDir(1), this.position.y - 1) === 'enemy') {
				positions.push([xDir(1), this.position.y - 1, false]);
			}
			// if a pawn besides has a true 'enPassant' property, move diagonally
			for (var player in _app.chess) {
				for (var piece in _app.chess[player].pieces) {
					if (_app.chess[player].pieces[piece].enPassant === true && _app.chess[player].pieces[piece].position.x === this.position.x) {
						if (_app.chess[player].pieces[piece].position.y === this.position.y + 1) {
							positions.push([xDir(1), this.position.y + 1, true]);
						}
						if (_app.chess[player].pieces[piece].position.y === this.position.y - 1) {
							positions.push([xDir(1), this.position.y - 1, true]);
						}
					}
				}
			}

			return positions;
		}

		// 3rd boolean argument indicates if this is an en passant move

	}, {
		key: 'toPosition',
		value: function toPosition(pX, pY, enPass) {
			var _this3 = this;

			if (typeof pX === 'number' && typeof pY === 'number') {
				if (pX >= 0 && pX < 8 && pY >= 0 && pY < 8) {
					this.position.x = pX;
					this.position.y = pY;
					this.step += 1;

					// capture enemy piece in target Position
					for (var player in _app.chess) {
						if (_app.chess[player].side !== this.side) {
							for (var piece in _app.chess[player].pieces) {
								if (_app.chess[player].pieces[piece].position.x === pX && _app.chess[player].pieces[piece].position.y === pY) {
									_app.chess[player].pieces[piece].position = { x: -1, y: -1 };
								}
							}
						}
					}
				} else if (pX === -1 && pY === -1) {
					// [-1, -1] position is being captured
					this.position.x = pX;
					this.position.y = pY;
				}
			}
			setTimeout(function () {
				// indicate being able to be enPassant-ed if conditions are met
				if (_this3.step === 1 && pX > 2 && _this3.side === 'white' || _this3.step === 1 && pX < 5 && _this3.side === 'black') {
					for (var _player in _app.chess) {
						if (_app.chess[_player].side !== _this3.side) {
							for (var _piece in _app.chess[_player].pieces) {
								if (_app.chess[_player].pieces[_piece].class === 'pawn') {
									if (_app.chess[_player].pieces[_piece].position.x === pX && (_app.chess[_player].pieces[_piece].position.y === pY + 1 || _app.chess[_player].pieces[_piece].position.y === pY - 1)) {
										_this3.enPassant = true;
									}
								}
							}
						}
					}
				}
			}, 1);
			// enPassant in action
			if (enPass === true) {
				for (var _player2 in _app.chess) {
					if (_app.chess[_player2].side !== this.side) {
						for (var _piece2 in _app.chess[_player2].pieces) {
							if (_app.chess[_player2].pieces[_piece2].class === 'pawn') {
								if (_app.chess[_player2].pieces[_piece2].enPassant === true && _app.chess[_player2].pieces[_piece2].position.y === pY && (_app.chess[_player2].pieces[_piece2].position.x === pX + 1 || _app.chess[_player2].pieces[_piece2].position.x === pX - 1)) {
									_app.chess[_player2].pieces[_piece2].position = { x: -1, y: -1 };
								}
							}
						}
					}
				}
			}
			//
			// TO DO: Clear enPassant move availability if not done in the immediate turn
			//

			return [this.position.x, this.position.y];
		}
	}]);

	return Pawn;
}(_Piece3.default);

exports.default = Pawn;

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.map