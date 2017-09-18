!function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=function(){function e(t,n,o){i(this,e),this.side=t,this.position={x:n,y:o},this.step=0}return o(e,[{key:"toPosition",value:function(e,t){return"number"==typeof e&&"number"==typeof t&&(e>0&&e<=8&&t>0&&t<=8?(this.position.x=e,this.position.y=t,this.step+=1):0===e&&0===t&&(this.position.x=e,this.position.y=t)),[this.position.x,this.position.y]}}]),e}();t.default=r},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.chess=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(3),s=function(e){return e&&e.__esModule?e:{default:e}}(r),u=function(){function e(){i(this,e),this.player1=new s.default("white"),this.player2=new s.default("black")}return o(e,[{key:"reset",value:function(){this.player1=new s.default("white"),this.player2=new s.default("black")}}]),e}(),f=t.chess=new u;window.chess=f},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.checkPosition=void 0;var i=n(1);t.checkPosition=function(e,t,n){for(var o in i.chess)for(var r in i.chess[o].pieces)if(i.chess[o].pieces[r].position.x===e&&i.chess[o].pieces[r].position.y===t)return i.chess[o].side===n?"friendly":"enemy"}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),s=i(r),u=n(4),f=i(u),a=n(5),c=i(a),l=function e(t){o(this,e),this.side=t,this.isTurn=!1,this.pieces={king:new s.default(t,"white"===t?1:8,4),queen:new s.default(t,"white"===t?1:8,5),rook1:new f.default(t,"white"===t?1:8,1),rook2:new f.default(t,"white"===t?1:8,8),knight1:new c.default(t,"white"===t?1:8,2),knight2:new c.default(t,"white"===t?1:8,7),bishop1:new s.default(t,"white"===t?1:8,3),bishop2:new s.default(t,"white"===t?1:8,6),pawn1:new s.default(t,"white"===t?2:7,1),pawn2:new s.default(t,"white"===t?2:7,2),pawn3:new s.default(t,"white"===t?2:7,3),pawn4:new s.default(t,"white"===t?2:7,4),pawn5:new s.default(t,"white"===t?2:7,5),pawn6:new s.default(t,"white"===t?2:7,6),pawn7:new s.default(t,"white"===t?2:7,7),pawn8:new s.default(t,"white"===t?2:7,8)}};t.default=l},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=n(0),f=function(e){return e&&e.__esModule?e:{default:e}}(u),a=n(2),c=function(e){function t(e,n,r){return i(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n,r))}return r(t,e),s(t,[{key:"availableMoves",value:function(){for(var e=this,t=function(t){return(0,a.checkPosition)(t,e.position.y,e.side)},n=function(t){return(0,a.checkPosition)(e.position.x,t,e.side)},i=[],o=!0,r=!0,s=!0,u=!0,f=this.position.x+1;f<=8;f+=1)!0===o&&("friendly"!==t(f)&&"enemy"!==t(f)||(o=!1),"friendly"!==t(f)&&i.push([f,this.position.y]));for(var c=this.position.x-1;c>0;c-=1)!0===r&&("friendly"!==t(c)&&"enemy"!==t(c)||(r=!1),"friendly"!==t(c)&&i.push([c,this.position.y]));for(var l=this.position.y+1;l<=8;l+=1)!0===s&&("friendly"!==n(l)&&"enemy"!==n(l)||(s=!1),"friendly"!==n(l)&&i.push([this.position.x,l]));for(var p=this.position.y-1;p>0;p-=1)!0===u&&("friendly"!==n(p)&&"enemy"!==n(p)||(u=!1),"friendly"!==n(p)&&i.push([this.position.x,p]));return i}}]),t}(f.default);t.default=c},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=n(0),f=function(e){return e&&e.__esModule?e:{default:e}}(u),a=n(2),c=function(e){function t(e,n,r){return i(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n,r))}return r(t,e),s(t,[{key:"availableMoves",value:function(){for(var e=[],t=[[this.position.x+1,this.position.y+2],[this.position.x+2,this.position.y+1],[this.position.x+1,this.position.y-2],[this.position.x+2,this.position.y-1],[this.position.x-1,this.position.y+2],[this.position.x-2,this.position.y+1],[this.position.x-1,this.position.y-2],[this.position.x-2,this.position.y-1]],n=0;n<t.length;n+=1)t[n][0]>0&&t[n][0]<=8&&t[n][1]>0&&t[n][1]<=8&&"friendly"!==(0,a.checkPosition)(t[n][0],t[n][1],this.side)&&e.push([t[n][0],t[n][1]]);return e}}]),t}(f.default);t.default=c}]);