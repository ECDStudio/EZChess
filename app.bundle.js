!function(e){function t(n){if(i[n])return i[n].exports;var s=i[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var i={};t.m=e,t.c=i,t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.chess=void 0;var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),o=i(3),r=function(e){return e&&e.__esModule?e:{default:e}}(o),a=function(){function e(){n(this,e),this.turn=0,this.players={player1:new r.default("white"),player2:new r.default("black")}}return s(e,[{key:"reset",value:function(){this.turn=0,this.players={player1:new r.default("white"),player2:new r.default("black")}}},{key:"switchTurn",value:function(){this.turn+=1,this.players.player1.isTurn=!this.players.player1.isTurn,this.players.player2.isTurn=!this.players.player2.isTurn}}]),e}();t.chess=new a;i(10)},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),o=i(0),r=function(){function e(t,i,s){n(this,e),this.side=t,this.position={x:i,y:s},this.step=0}return s(e,[{key:"toPosition",value:function(e,t){if("number"==typeof e&&"number"==typeof t)if(e>=0&&e<8&&t>=0&&t<8){this.position.x=e,this.position.y=t,this.step+=1;for(var i in o.chess.players)if(o.chess.players[i].side!==this.side)for(var n in o.chess.players[i].pieces)o.chess.players[i].pieces[n].position.x===e&&o.chess.players[i].pieces[n].position.y===t&&(o.chess.players[i].pieces[n].position={x:-1,y:-1})}else-1===e&&-1===t&&(this.position.x=e,this.position.y=t);return[this.position.x,this.position.y]}}]),e}();t.default=r},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.checkPosition=void 0;var n=i(0);t.checkPosition=function(e,t,i){for(var s in n.chess.players)for(var o in n.chess.players[s].pieces)if(n.chess.players[s].pieces[o].position.x===e&&n.chess.players[s].pieces[o].position.y===t)return n.chess.players[s].side===i?"friendly":"enemy"}},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=i(4),r=n(o),a=i(5),p=n(a),u=i(6),c=n(u),l=i(7),f=n(l),h=i(8),y=n(h),d=i(9),v=n(d),b=function e(t){s(this,e),this.side=t,this.isTurn="white"===t,this.pieces={king:new r.default(t,"white"===t?0:7,3),queen:new p.default(t,"white"===t?0:7,4),rook1:new c.default(t,"white"===t?0:7,0),rook2:new c.default(t,"white"===t?0:7,7),knight1:new f.default(t,"white"===t?0:7,1),knight2:new f.default(t,"white"===t?0:7,6),bishop1:new y.default(t,"white"===t?0:7,2),bishop2:new y.default(t,"white"===t?0:7,5),pawn1:new v.default(t,"white"===t?1:6,0),pawn2:new v.default(t,"white"===t?1:6,1),pawn3:new v.default(t,"white"===t?1:6,2),pawn4:new v.default(t,"white"===t?1:6,3),pawn5:new v.default(t,"white"===t?1:6,4),pawn6:new v.default(t,"white"===t?1:6,5),pawn7:new v.default(t,"white"===t?1:6,6),pawn8:new v.default(t,"white"===t?1:6,7)}};t.default=b},function(e,t,i){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),p=i(1),u=function(e){return e&&e.__esModule?e:{default:e}}(p),c=i(0),l=i(2),f=function(e){function t(e,i,n){s(this,t);var r=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i,n));return r.class="king",r}return r(t,e),a(t,[{key:"availableMoves",value:function(){var e=this,t=function(t,i){return(0,l.checkPosition)(t,i,e.side)},i=[[this.position.x+1,this.position.y],[this.position.x-1,this.position.y],[this.position.x+1,this.position.y+1],[this.position.x+1,this.position.y-1],[this.position.x-1,this.position.y+1],[this.position.x-1,this.position.y-1],[this.position.x,this.position.y+1],[this.position.x,this.position.y-1]],s=[],o=function(){for(var t in c.chess.players)if(c.chess.players[t].side!==e.side){var i=[];for(var n in c.chess.players[t].pieces)if("king"===n){var s=c.chess.players[t].pieces[n].position;i.push([s.x+1,s.y]),i.push([s.x-1,s.y]),i.push([s.x+1,s.y+1]),i.push([s.x+1,s.y-1]),i.push([s.x-1,s.y+1]),i.push([s.x-1,s.y-1]),i.push([s.x,s.y+1]),i.push([s.x,s.y-1])}else if("pawn"===c.chess.players[t].pieces[n].class){var o=c.chess.players[t].pieces[n].position;"white"===c.chess.players[t].side?(i.push([o.x+1,o.y+1]),i.push([o.x+1,o.y-1])):(i.push([o.x-1,o.y+1]),i.push([o.x-1,o.y-1]))}else{var r=c.chess.players[t].pieces[n].availableMoves();if(0!==r.length){var a=!0,p=!1,u=void 0;try{for(var l,f=r[Symbol.iterator]();!(a=(l=f.next()).done);a=!0){var h=l.value;i.push(h)}}catch(e){p=!0,u=e}finally{try{!a&&f.return&&f.return()}finally{if(p)throw u}}}}return i}};for(var r in i)if(i[r][0]>=0&&i[r][0]<8&&i[r][1]>=0&&i[r][1]<8&&"friendly"!==t.apply(void 0,n(i[r]))){var a=!1;for(var p in o())o()[p][0]===i[r][0]&&o()[p][1]===i[r][1]&&(a=!0);!1===a&&s.push(i[r])}for(var u in c.chess.players)if(c.chess.players[u].side===this.side){var f=!0;for(var h in o())o()[h][0]!==this.position.x||1!==o()[h][1]&&2!==o()[h][1]&&3!==o()[h][1]||(f=!1);for(var y in c.chess.players[u].pieces){var d=c.chess.players[u].pieces[y];d.position.x!==this.position.x||1!==d.position.y&&2!==d.position.y||(f=!1)}!0===f&&0===c.chess.players[u].pieces.rook1.step&&0===this.step&&s.push([this.position.x,1,"king-castle"])}for(var v in c.chess.players)if(c.chess.players[v].side===this.side){var b=!0;for(var w in o())o()[w][0]!==this.position.x||3!==o()[w][1]&&4!==o()[w][1]&&5!==o()[w][1]||(b=!1);for(var x in c.chess.players[v].pieces){var _=c.chess.players[v].pieces[x];_.position.x!==this.position.x||4!==_.position.y&&5!==_.position.y&&6!==_.position.y||(b=!1)}!0===b&&0===c.chess.players[v].pieces.rook2.step&&0===this.step&&s.push([this.position.x,5,"queen-castle"])}return s}},{key:"toPosition",value:function(e,t,i){if("number"==typeof e&&"number"==typeof t)if(e>=0&&e<8&&t>=0&&t<8){this.position.x=e,this.position.y=t,this.step+=1;for(var n in c.chess.players)if(c.chess.players[n].side!==this.side)for(var s in c.chess.players[n].pieces)c.chess.players[n].pieces[s].position.x===e&&c.chess.players[n].pieces[s].position.y===t&&(c.chess.players[n].pieces[s].position={x:-1,y:-1})}else-1===e&&-1===t&&(this.position.x=e,this.position.y=t);if("king-castle"===i)for(var o in c.chess.players)c.chess.players[o].side===this.side&&c.chess.players[o].pieces.rook1.toPosition(this.position.x,2);if("queen-castle"===i)for(var r in c.chess.players)c.chess.players[r].side===this.side&&c.chess.players[r].pieces.rook2.toPosition(this.position.x,4);return[this.position.x,this.position.y]}}]),t}(u.default);t.default=f},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=i(1),p=function(e){return e&&e.__esModule?e:{default:e}}(a),u=i(2),c=function(e){function t(e,i,o){n(this,t);var r=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i,o));return r.class="queen",r}return o(t,e),r(t,[{key:"availableMoves",value:function(){for(var e=this,t=function(t){return(0,u.checkPosition)(t,e.position.y,e.side)},i=function(t){return(0,u.checkPosition)(e.position.x,t,e.side)},n=function(t,i){return(0,u.checkPosition)(t,i,e.side)},s=[],o=!0,r=!0,a=!0,p=!0,c=!0,l=!0,f=!0,h=!0,y=this.position.x+1;y<8;y+=1)!0===o&&("friendly"!==t(y)&&"enemy"!==t(y)||(o=!1),"friendly"!==t(y)&&s.push([y,this.position.y]));for(var d=this.position.x-1;d>=0;d-=1)!0===r&&("friendly"!==t(d)&&"enemy"!==t(d)||(r=!1),"friendly"!==t(d)&&s.push([d,this.position.y]));for(var v=this.position.y+1;v<8;v+=1)!0===a&&("friendly"!==i(v)&&"enemy"!==i(v)||(a=!1),"friendly"!==i(v)&&s.push([this.position.x,v]));for(var b=this.position.y-1;b>=0;b-=1)!0===p&&("friendly"!==i(b)&&"enemy"!==i(b)||(p=!1),"friendly"!==i(b)&&s.push([this.position.x,b]));for(var w=this.position.x+1;w<8;w+=1){var x=this.position.y+w-this.position.x;!0===c&&x>=0&&x<8&&("friendly"!==n(w,x)&&"enemy"!==n(w,x)&&7!==x||(c=!1),"friendly"!==n(w,x)&&s.push([w,x]))}for(var _=this.position.x+1;_<8;_+=1){var m=this.position.y-_+this.position.x;!0===l&&m>=0&&m<8&&("friendly"!==n(_,m)&&"enemy"!==n(_,m)&&0!==m||(l=!1),"friendly"!==n(_,m)&&s.push([_,m]))}for(var P=this.position.x-1;P>=0;P-=1){var O=this.position.y+P-this.position.x;!0===f&&O>=0&&O<8&&("friendly"!==n(P,O)&&"enemy"!==n(P,O)&&7!==O||(f=!1),"friendly"!==n(P,O)&&s.push([P,O]))}for(var j=this.position.x-1;j>=0;j-=1){var k=this.position.y-j+this.position.x;!0===h&&k>=0&&k<8&&("friendly"!==n(j,k)&&"enemy"!==n(j,k)&&0!==k||(h=!1),"friendly"!==n(j,k)&&s.push([j,k]))}return s}}]),t}(p.default);t.default=c},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=i(1),p=function(e){return e&&e.__esModule?e:{default:e}}(a),u=i(2),c=function(e){function t(e,i,o){n(this,t);var r=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i,o));return r.class="rook",r}return o(t,e),r(t,[{key:"availableMoves",value:function(){for(var e=this,t=function(t){return(0,u.checkPosition)(t,e.position.y,e.side)},i=function(t){return(0,u.checkPosition)(e.position.x,t,e.side)},n=[],s=!0,o=!0,r=!0,a=!0,p=this.position.x+1;p<8;p+=1)!0===s&&("friendly"!==t(p)&&"enemy"!==t(p)||(s=!1),"friendly"!==t(p)&&n.push([p,this.position.y]));for(var c=this.position.x-1;c>=0;c-=1)!0===o&&("friendly"!==t(c)&&"enemy"!==t(c)||(o=!1),"friendly"!==t(c)&&n.push([c,this.position.y]));for(var l=this.position.y+1;l<8;l+=1)!0===r&&("friendly"!==i(l)&&"enemy"!==i(l)||(r=!1),"friendly"!==i(l)&&n.push([this.position.x,l]));for(var f=this.position.y-1;f>=0;f-=1)!0===a&&("friendly"!==i(f)&&"enemy"!==i(f)||(a=!1),"friendly"!==i(f)&&n.push([this.position.x,f]));return n}}]),t}(p.default);t.default=c},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=i(1),p=function(e){return e&&e.__esModule?e:{default:e}}(a),u=i(2),c=function(e){function t(e,i,o){n(this,t);var r=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i,o));return r.class="knight",r}return o(t,e),r(t,[{key:"availableMoves",value:function(){for(var e=[],t=[[this.position.x+1,this.position.y+2],[this.position.x+2,this.position.y+1],[this.position.x+1,this.position.y-2],[this.position.x+2,this.position.y-1],[this.position.x-1,this.position.y+2],[this.position.x-2,this.position.y+1],[this.position.x-1,this.position.y-2],[this.position.x-2,this.position.y-1]],i=0;i<t.length;i+=1)t[i][0]>=0&&t[i][0]<8&&t[i][1]>=0&&t[i][1]<8&&"friendly"!==(0,u.checkPosition)(t[i][0],t[i][1],this.side)&&e.push([t[i][0],t[i][1]]);return e}}]),t}(p.default);t.default=c},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=i(1),p=function(e){return e&&e.__esModule?e:{default:e}}(a),u=i(2),c=function(e){function t(e,i,o){n(this,t);var r=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i,o));return r.class="bishop",r}return o(t,e),r(t,[{key:"availableMoves",value:function(){for(var e=this,t=function(t,i){return(0,u.checkPosition)(t,i,e.side)},i=[],n=!0,s=!0,o=!0,r=!0,a=this.position.x+1;a<8;a+=1){var p=this.position.y+a-this.position.x;!0===n&&p>=0&&p<8&&("friendly"!==t(a,p)&&"enemy"!==t(a,p)&&7!==p||(n=!1),"friendly"!==t(a,p)&&i.push([a,p]))}for(var c=this.position.x+1;c<8;c+=1){var l=this.position.y-c+this.position.x;!0===s&&l>=0&&l<8&&("friendly"!==t(c,l)&&"enemy"!==t(c,l)&&0!==l||(s=!1),"friendly"!==t(c,l)&&i.push([c,l]))}for(var f=this.position.x-1;f>=0;f-=1){var h=this.position.y+f-this.position.x;!0===o&&h>=0&&h<8&&("friendly"!==t(f,h)&&"enemy"!==t(f,h)&&7!==h||(o=!1),"friendly"!==t(f,h)&&i.push([f,h]))}for(var y=this.position.x-1;y>=0;y-=1){var d=this.position.y-y+this.position.x;!0===r&&d>=0&&d<8&&("friendly"!==t(y,d)&&"enemy"!==t(y,d)&&0!==d||(r=!1),"friendly"!==t(y,d)&&i.push([y,d]))}return i}}]),t}(p.default);t.default=c},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=i(1),p=function(e){return e&&e.__esModule?e:{default:e}}(a),u=i(0),c=i(2),l=function(e){function t(e,i,o){n(this,t);var r=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i,o));return r.class="pawn",r.enPassant=!1,r.enPassTurn=0,r}return o(t,e),r(t,[{key:"availableMoves",value:function(){var e=this,t=function(t,i){return(0,c.checkPosition)(t,i,e.side)},i=function(t){return"white"===e.side?e.position.x+t:e.position.x-t},n=[];0===this.step&&"friendly"!==t(i(2),this.position.y)&&"enemy"!==t(i(2),this.position.y)&&n.push([i(2),this.position.y,!1]),"friendly"!==t(i(1),this.position.y)&&"enemy"!==t(i(1),this.position.y)&&n.push([i(1),this.position.y,!1]),"enemy"===t(i(1),this.position.y+1)&&n.push([i(1),this.position.y+1,!1]),"enemy"===t(i(1),this.position.y-1)&&n.push([i(1),this.position.y-1,!1]);for(var s in u.chess.players)for(var o in u.chess.players[s].pieces){var r=u.chess.players[s].pieces[o];!0===r.enPassant&&r.enPassTurn===u.chess.turn&&r.position.x===this.position.x&&(r.position.y===this.position.y+1&&n.push([i(1),this.position.y+1,!0]),r.position.y===this.position.y-1&&n.push([i(1),this.position.y-1,!0]))}return n}},{key:"toPosition",value:function(e,t,i){var n=this;if("number"==typeof e&&"number"==typeof t)if(e>=0&&e<8&&t>=0&&t<8){this.position.x=e,this.position.y=t,this.step+=1;for(var s in u.chess.players)if(u.chess.players[s].side!==this.side)for(var o in u.chess.players[s].pieces)u.chess.players[s].pieces[o].position.x===e&&u.chess.players[s].pieces[o].position.y===t&&(u.chess.players[s].pieces[o].position={x:-1,y:-1})}else-1===e&&-1===t&&(this.position.x=e,this.position.y=t);if(setTimeout(function(){if(1===n.step&&3===e&&"white"===n.side||1===n.step&&4===e&&"black"===n.side)for(var i in u.chess.players)if(u.chess.players[i].side!==n.side)for(var s in u.chess.players[i].pieces)if("pawn"===u.chess.players[i].pieces[s].class){var o=u.chess.players[i].pieces[s];o.position.x!==e||o.position.y!==t+1&&o.position.y!==t-1||(n.enPassant=!0,n.enPassTurn=u.chess.turn)}},1),!0===i)for(var r in u.chess.players)if(u.chess.players[r].side!==this.side)for(var a in u.chess.players[r].pieces){var p=u.chess.players[r].pieces[a];!0!==p.enPassant||p.enPassTurn!==u.chess.turn||p.position.y!==t||p.position.x!==e+1&&p.position.x!==e-1||(p.position={x:-1,y:-1})}return[this.position.x,this.position.y]}}]),t}(p.default);t.default=l},function(e,t,i){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)}var s=i(0),o=document.createElement("div"),r=document.createElement("div"),a=document.createElement("ul"),p=document.createElement("ul"),u=document.createElement("div");o.id="container",r.id="chessboard",document.getElementsByTagName("body")[0].append(o),o.append(r,u),r.append(a,p);var c=function(){for(var e in s.chess.players)!0===s.chess.players[e].isTurn&&(u.innerHTML="Current Turn: "+s.chess.players[e].side)};c();var l=function(e){var t=function(){var e=!0,t=!1,i=void 0;try{for(var n,s=document.getElementsByClassName("target-position")[Symbol.iterator]();!(e=(n=s.next()).done);e=!0){var o=n.value;!function(e){setTimeout(function(){e.parentElement.removeChild(e)})}(o)}}catch(e){t=!0,i=e}finally{try{!e&&s.return&&s.return()}finally{if(t)throw i}}};t();var i=!0,o=!1,a=void 0;try{for(var p,u=e.availableMoves()[Symbol.iterator]();!(i=(p=u.next()).done);i=!0){var l=p.value;!function(i){var o=document.createElement("a");r.append(o),o.classList.add("target-position"),o.style.left=12.5*i[0]+"%",o.style.bottom=12.5*i[1]+"%",o.addEventListener("click",function(){e._toPos.apply(e,n(i)),t();for(var o in s.chess.players){for(var r in s.chess.players[o].pieces)!function(e){var t=s.chess.players[o].pieces[e];t._watchCapture(),setTimeout(function(){t._toPos(t.position.x,t,i.y)},500)}(r)}s.chess.switchTurn(),c()})}(l)}}catch(e){o=!0,a=e}finally{try{!i&&u.return&&u.return()}finally{if(o)throw a}}};for(var f in s.chess.players)!function(e){for(var t in s.chess.players[e].pieces)!function(t){var i=s.chess.players[e].pieces[t],o=document.createElement("li");i._toPos=function(e,t,n){i.toPosition(e,t,n),o.style.zIndex="20",o.style.left=12.5*i.position.x+"%",o.style.bottom=12.5*i.position.y+"%",setTimeout(function(){o.style.zIndex="1"},1e3)},i._toPos.apply(i,n(i.position)),i._watchCapture=function(){-1===i.position.x&&-1===i.position.y&&setTimeout(function(){o.style.display="none"},500)},o.classList.add("chess-piece",s.chess.players[e].side,i.class),"player1"===e?a.append(o):p.append(o),o.addEventListener("click",function(){!0===s.chess.players[e].isTurn&&l(i)})}(t)}(f)}]);