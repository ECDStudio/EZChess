!function(e){function t(n){if(i[n])return i[n].exports;var o=i[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var i={};t.m=e,t.c=i,t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),r=function(){function e(t,i,o){n(this,e),this.side=t,this.position={x:i,y:o},this.step=0}return o(e,[{key:"toPosition",value:function(e,t,i){if("number"==typeof t&&"number"==typeof i)if(t>=0&&t<8&&i>=0&&i<8){this.position.x=t,this.position.y=i,this.step+=1;for(var n in e.players)if(e.players[n].side!==this.side)for(var o in e.players[n].pieces){var r=e.players[n].pieces[o];r.position.x===t&&r.position.y===i&&(r.position.x=-1,r.position.y=-1)}}else-1===t&&-1===i&&(this.position.x=t,this.position.y=i);return[this.position.x,this.position.y]}}]),e}();t.default=r},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.checkPosition=function(e,t,i,n){for(var o in n.players)for(var r in n.players[o].pieces){var s=n.players[o].pieces[r];if(s.position.x===e&&s.position.y===t)return n.players[o].side===i?"friendly":"enemy"}}},function(e,t,i){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)}var o=i(3),r=function(e){return e&&e.__esModule?e:{default:e}}(o);r.default.prototype.initChess=function(e){var t=this,i=document.createElement("div"),o=document.createElement("ul"),r=document.createElement("ul"),s=document.createElement("div");e.append(i,s),i.append(o,r),i.classList.add("chessboard"),this.indicateTurn=function(){for(var e in t.players)!0===t.players[e].isTurn&&(s.innerHTML="Current Turn: "+t.players[e].side)},this.indicateTurn();for(var a in this.players)!function(e){for(var i in t.players[e].pieces)!function(i){var s=t.players[e].pieces[i];s.ui=document.createElement("li"),s.moveTo=function(e,t,i,n){s.toPosition(e,t,i,n),s.ui.style.zIndex="20",s.ui.style.left=12.5*s.position.x+"%",s.ui.style.bottom=12.5*s.position.y+"%",setTimeout(function(){s.ui.style.zIndex="1"},1e3)},s.moveTo.apply(s,n(s.position)),s.watchCapture=function(){-1===s.position.x&&-1===s.position.y&&setTimeout(function(){s.ui.style.display="none"},500)},s.ui.classList.add("chess-piece",t.players[e].side,s.class),s.ui.addEventListener("click",function(){!0===t.players[e].isTurn&&u(s)}),"player1"===e?o.append(s.ui):r.append(s.ui)}(i)}(a);var u=function(e){f();var n=!0,o=!1,r=void 0;try{for(var s,a=e.availableMoves(t)[Symbol.iterator]();!(n=(s=a.next()).done);n=!0){var u=s.value;!function(t){var n=document.createElement("a");i.append(n),n.classList.add("target-position"),n.style.left=12.5*t[0]+"%",n.style.bottom=12.5*t[1]+"%",n.addEventListener("click",function(){return p(e,t)})}(u)}}catch(e){o=!0,r=e}finally{try{!n&&a.return&&a.return()}finally{if(o)throw r}}},p=function(e,i){e.moveTo.apply(e,[t].concat(n(i))),f();for(var o in t.players){for(var r in t.players[o].pieces)!function(e){var n=t.players[o].pieces[e];n.watchCapture(),setTimeout(function(){n.moveTo(this,n.position.x,n,i.y)},500)}(r)}t.switchTurn(),t.indicateTurn()},f=function(){var t=!0,i=!1,n=void 0;try{for(var o,r=e.getElementsByClassName("target-position")[Symbol.iterator]();!(t=(o=r.next()).done);t=!0){var s=o.value;!function(e){setTimeout(function(){e.parentElement.removeChild(e)})}(s)}}catch(e){i=!0,n=e}finally{try{!t&&r.return&&r.return()}finally{if(i)throw n}}}};var s=new r.default,a=!0,u=!1,p=void 0;try{for(var f,l=document.getElementsByClassName("chess-container")[Symbol.iterator]();!(a=(f=l.next()).done);a=!0){var c=f.value;c&&s.initChess(c)}}catch(e){u=!0,p=e}finally{try{!a&&l.return&&l.return()}finally{if(u)throw p}}},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),r=i(4),s=function(e){return e&&e.__esModule?e:{default:e}}(r),a=function(){function e(){n(this,e),this.turn=0,this.players={player1:new s.default("white"),player2:new s.default("black")}}return o(e,[{key:"reset",value:function(){this.turn=0,this.players={player1:new s.default("white"),player2:new s.default("black")}}},{key:"switchTurn",value:function(){this.turn+=1,this.players.player1.isTurn=!this.players.player1.isTurn,this.players.player2.isTurn=!this.players.player2.isTurn}}]),e}();t.default=a},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=i(5),s=n(r),a=i(6),u=n(a),p=i(7),f=n(p),l=i(8),c=n(l),y=i(9),h=n(y),d=i(10),v=n(d),b=function e(t){o(this,e),this.side=t,this.isTurn="white"===t,this.pieces={king:new s.default(t,"white"===t?0:7,3),queen:new u.default(t,"white"===t?0:7,4),rook1:new f.default(t,"white"===t?0:7,0),rook2:new f.default(t,"white"===t?0:7,7),knight1:new c.default(t,"white"===t?0:7,1),knight2:new c.default(t,"white"===t?0:7,6),bishop1:new h.default(t,"white"===t?0:7,2),bishop2:new h.default(t,"white"===t?0:7,5),pawn1:new v.default(t,"white"===t?1:6,0),pawn2:new v.default(t,"white"===t?1:6,1),pawn3:new v.default(t,"white"===t?1:6,2),pawn4:new v.default(t,"white"===t?1:6,3),pawn5:new v.default(t,"white"===t?1:6,4),pawn6:new v.default(t,"white"===t?1:6,5),pawn7:new v.default(t,"white"===t?1:6,6),pawn8:new v.default(t,"white"===t?1:6,7)}};t.default=b},function(e,t,i){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),u=i(0),p=function(e){return e&&e.__esModule?e:{default:e}}(u),f=i(1),l=function(e){function t(e,i,n){o(this,t);var s=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i,n));return s.class="king",s}return s(t,e),a(t,[{key:"availableMoves",value:function(e){var t=this,i=function(i,n){return(0,f.checkPosition)(i,n,t.side,e)},o=function(){for(var i in e.players)if(e.players[i].side!==t.side){var n=[];for(var o in e.players[i].pieces){var r=e.players[i].pieces[o];if("king"===o){var s=r.position;n.push([s.x+1,s.y]),n.push([s.x-1,s.y]),n.push([s.x+1,s.y+1]),n.push([s.x+1,s.y-1]),n.push([s.x-1,s.y+1]),n.push([s.x-1,s.y-1]),n.push([s.x,s.y+1]),n.push([s.x,s.y-1])}else if("pawn"===r.class){var a=r.position;"white"===e.players[i].side?(n.push([a.x+1,a.y+1]),n.push([a.x+1,a.y-1])):(n.push([a.x-1,a.y+1]),n.push([a.x-1,a.y-1]))}else{var u=t.position.x,p=t.position.y;t.position.x=-1,t.position.y=-1;var f=r.availableMoves(e);if(0!==f.length){var l=!0,c=!1,y=void 0;try{for(var h,d=f[Symbol.iterator]();!(l=(h=d.next()).done);l=!0){var v=h.value;n.push(v)}}catch(e){c=!0,y=e}finally{try{!l&&d.return&&d.return()}finally{if(c)throw y}}}t.position.x=u,t.position.y=p}}return n}},r=[[this.position.x+1,this.position.y],[this.position.x-1,this.position.y],[this.position.x+1,this.position.y+1],[this.position.x+1,this.position.y-1],[this.position.x-1,this.position.y+1],[this.position.x-1,this.position.y-1],[this.position.x,this.position.y+1],[this.position.x,this.position.y-1]],s=[];for(var a in r)if(r[a][0]>=0&&r[a][0]<8&&r[a][1]>=0&&r[a][1]<8&&"friendly"!==i.apply(void 0,n(r[a]))){var u=!1;for(var p in o())o()[p][0]===r[a][0]&&o()[p][1]===r[a][1]&&(u=!0);!1===u&&(r[a].push(null),s.push(r[a]))}for(var l in e.players)if(e.players[l].side===this.side){var c=!0;for(var y in o())o()[y][0]!==this.position.x||1!==o()[y][1]&&2!==o()[y][1]&&3!==o()[y][1]||(c=!1);for(var h in e.players[l].pieces){var d=e.players[l].pieces[h];d.position.x!==this.position.x||1!==d.position.y&&2!==d.position.y||(c=!1)}!0===c&&0===e.players[l].pieces.rook1.step&&0===this.step&&s.push([this.position.x,1,"king-castle"])}for(var v in e.players)if(e.players[v].side===this.side){var b=!0;for(var w in o())o()[w][0]!==this.position.x||3!==o()[w][1]&&4!==o()[w][1]&&5!==o()[w][1]||(b=!1);for(var x in e.players[v].pieces){var m=e.players[v].pieces[x];m.position.x!==this.position.x||4!==m.position.y&&5!==m.position.y&&6!==m.position.y||(b=!1)}!0===b&&0===e.players[v].pieces.rook2.step&&0===this.step&&s.push([this.position.x,5,"queen-castle"])}return s}},{key:"toPosition",value:function(e,t,i,n){if("number"==typeof t&&"number"==typeof i)if(t>=0&&t<8&&i>=0&&i<8){this.position.x=t,this.position.y=i,this.step+=1;for(var o in e.players)if(e.players[o].side!==this.side)for(var r in e.players[o].pieces){var s=e.players[o].pieces[r];s.position.x===t&&s.position.y===i&&(s.position={x:-1,y:-1})}}else-1===t&&-1===i&&(this.position.x=t,this.position.y=i);if("king-castle"===n)for(var a in e.players)e.players[a].side===this.side&&e.players[a].pieces.rook1.toPosition(e,this.position.x,2);if("queen-castle"===n)for(var u in e.players)e.players[u].side===this.side&&e.players[u].pieces.rook2.toPosition(e,this.position.x,4);return[this.position.x,this.position.y]}}]),t}(p.default);t.default=l},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=i(0),u=function(e){return e&&e.__esModule?e:{default:e}}(a),p=i(1),f=function(e){function t(e,i,r){n(this,t);var s=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i,r));return s.class="queen",s}return r(t,e),s(t,[{key:"availableMoves",value:function(e){for(var t=this,i=function(i){return(0,p.checkPosition)(i,t.position.y,t.side,e)},n=function(i){return(0,p.checkPosition)(t.position.x,i,t.side,e)},o=function(i,n){return(0,p.checkPosition)(i,n,t.side,e)},r=[],s=!0,a=!0,u=!0,f=!0,l=!0,c=!0,y=!0,h=!0,d=this.position.x+1;d<8;d+=1)!0===s&&("friendly"!==i(d)&&"enemy"!==i(d)||(s=!1),"friendly"!==i(d)&&r.push([d,this.position.y]));for(var v=this.position.x-1;v>=0;v-=1)!0===a&&("friendly"!==i(v)&&"enemy"!==i(v)||(a=!1),"friendly"!==i(v)&&r.push([v,this.position.y]));for(var b=this.position.y+1;b<8;b+=1)!0===u&&("friendly"!==n(b)&&"enemy"!==n(b)||(u=!1),"friendly"!==n(b)&&r.push([this.position.x,b]));for(var w=this.position.y-1;w>=0;w-=1)!0===f&&("friendly"!==n(w)&&"enemy"!==n(w)||(f=!1),"friendly"!==n(w)&&r.push([this.position.x,w]));for(var x=this.position.x+1;x<8;x+=1){var m=this.position.y+x-this.position.x;!0===l&&m>=0&&m<8&&("friendly"!==o(x,m)&&"enemy"!==o(x,m)&&7!==m||(l=!1),"friendly"!==o(x,m)&&r.push([x,m]))}for(var _=this.position.x+1;_<8;_+=1){var O=this.position.y-_+this.position.x;!0===c&&O>=0&&O<8&&("friendly"!==o(_,O)&&"enemy"!==o(_,O)&&0!==O||(c=!1),"friendly"!==o(_,O)&&r.push([_,O]))}for(var P=this.position.x-1;P>=0;P-=1){var j=this.position.y+P-this.position.x;!0===y&&j>=0&&j<8&&("friendly"!==o(P,j)&&"enemy"!==o(P,j)&&7!==j||(y=!1),"friendly"!==o(P,j)&&r.push([P,j]))}for(var k=this.position.x-1;k>=0;k-=1){var g=this.position.y-k+this.position.x;!0===h&&g>=0&&g<8&&("friendly"!==o(k,g)&&"enemy"!==o(k,g)&&0!==g||(h=!1),"friendly"!==o(k,g)&&r.push([k,g]))}return r}}]),t}(u.default);t.default=f},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=i(0),u=function(e){return e&&e.__esModule?e:{default:e}}(a),p=i(1),f=function(e){function t(e,i,r){n(this,t);var s=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i,r));return s.class="rook",s}return r(t,e),s(t,[{key:"availableMoves",value:function(e){for(var t=this,i=function(i){return(0,p.checkPosition)(i,t.position.y,t.side,e)},n=function(i){return(0,p.checkPosition)(t.position.x,i,t.side,e)},o=[],r=!0,s=!0,a=!0,u=!0,f=this.position.x+1;f<8;f+=1)!0===r&&("friendly"!==i(f)&&"enemy"!==i(f)||(r=!1),"friendly"!==i(f)&&o.push([f,this.position.y]));for(var l=this.position.x-1;l>=0;l-=1)!0===s&&("friendly"!==i(l)&&"enemy"!==i(l)||(s=!1),"friendly"!==i(l)&&o.push([l,this.position.y]));for(var c=this.position.y+1;c<8;c+=1)!0===a&&("friendly"!==n(c)&&"enemy"!==n(c)||(a=!1),"friendly"!==n(c)&&o.push([this.position.x,c]));for(var y=this.position.y-1;y>=0;y-=1)!0===u&&("friendly"!==n(y)&&"enemy"!==n(y)||(u=!1),"friendly"!==n(y)&&o.push([this.position.x,y]));return o}}]),t}(u.default);t.default=f},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=i(0),u=function(e){return e&&e.__esModule?e:{default:e}}(a),p=i(1),f=function(e){function t(e,i,r){n(this,t);var s=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i,r));return s.class="knight",s}return r(t,e),s(t,[{key:"availableMoves",value:function(e){for(var t=[],i=[[this.position.x+1,this.position.y+2],[this.position.x+2,this.position.y+1],[this.position.x+1,this.position.y-2],[this.position.x+2,this.position.y-1],[this.position.x-1,this.position.y+2],[this.position.x-2,this.position.y+1],[this.position.x-1,this.position.y-2],[this.position.x-2,this.position.y-1]],n=0;n<i.length;n+=1)i[n][0]>=0&&i[n][0]<8&&i[n][1]>=0&&i[n][1]<8&&"friendly"!==(0,p.checkPosition)(i[n][0],i[n][1],this.side,e)&&t.push([i[n][0],i[n][1]]);return t}}]),t}(u.default);t.default=f},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=i(0),u=function(e){return e&&e.__esModule?e:{default:e}}(a),p=i(1),f=function(e){function t(e,i,r){n(this,t);var s=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i,r));return s.class="bishop",s}return r(t,e),s(t,[{key:"availableMoves",value:function(e){for(var t=this,i=function(i,n){return(0,p.checkPosition)(i,n,t.side,e)},n=[],o=!0,r=!0,s=!0,a=!0,u=this.position.x+1;u<8;u+=1){var f=this.position.y+u-this.position.x;!0===o&&f>=0&&f<8&&("friendly"!==i(u,f)&&"enemy"!==i(u,f)&&7!==f||(o=!1),"friendly"!==i(u,f)&&n.push([u,f]))}for(var l=this.position.x+1;l<8;l+=1){var c=this.position.y-l+this.position.x;!0===r&&c>=0&&c<8&&("friendly"!==i(l,c)&&"enemy"!==i(l,c)&&0!==c||(r=!1),"friendly"!==i(l,c)&&n.push([l,c]))}for(var y=this.position.x-1;y>=0;y-=1){var h=this.position.y+y-this.position.x;!0===s&&h>=0&&h<8&&("friendly"!==i(y,h)&&"enemy"!==i(y,h)&&7!==h||(s=!1),"friendly"!==i(y,h)&&n.push([y,h]))}for(var d=this.position.x-1;d>=0;d-=1){var v=this.position.y-d+this.position.x;!0===a&&v>=0&&v<8&&("friendly"!==i(d,v)&&"enemy"!==i(d,v)&&0!==v||(a=!1),"friendly"!==i(d,v)&&n.push([d,v]))}return n}}]),t}(u.default);t.default=f},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=i(0),u=function(e){return e&&e.__esModule?e:{default:e}}(a),p=i(1),f=function(e){function t(e,i,r){n(this,t);var s=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i,r));return s.class="pawn",s.enPassant=!1,s.enPassTurn=0,s}return r(t,e),s(t,[{key:"availableMoves",value:function(e){var t=this,i=function(i,n){return(0,p.checkPosition)(i,n,t.side,e)},n=function(e){return"white"===t.side?t.position.x+e:t.position.x-e},o=[];0===this.step&&"friendly"!==i(n(1),this.position.y)&&"enemy"!==i(n(1),this.position.y)&&"friendly"!==i(n(2),this.position.y)&&"enemy"!==i(n(2),this.position.y)&&o.push([n(2),this.position.y,!1]),"friendly"!==i(n(1),this.position.y)&&"enemy"!==i(n(1),this.position.y)&&o.push([n(1),this.position.y,!1]),"enemy"===i(n(1),this.position.y+1)&&o.push([n(1),this.position.y+1,!1]),"enemy"===i(n(1),this.position.y-1)&&o.push([n(1),this.position.y-1,!1]);for(var r in e.players)for(var s in e.players[r].pieces){var a=e.players[r].pieces[s];!0===a.enPassant&&a.enPassTurn===e.turn&&a.position.x===this.position.x&&(a.position.y===this.position.y+1&&o.push([n(1),this.position.y+1,!0]),a.position.y===this.position.y-1&&o.push([n(1),this.position.y-1,!0]))}return o}},{key:"toPosition",value:function(e,t,i,n){var o=this;if("number"==typeof t&&"number"==typeof i)if(t>=0&&t<8&&i>=0&&i<8){this.position.x=t,this.position.y=i,this.step+=1;for(var r in e.players)if(e.players[r].side!==this.side)for(var s in e.players[r].pieces){var a=e.players[r].pieces[s];a.position.x===t&&a.position.y===i&&(a.position.x=-1,a.position.y=-1)}}else-1===t&&-1===i&&(this.position.x=t,this.position.y=i);if(setTimeout(function(){if(1===o.step&&3===t&&"white"===o.side||1===o.step&&4===t&&"black"===o.side)for(var n in e.players)if(e.players[n].side!==o.side)for(var r in e.players[n].pieces){var s=e.players[n].pieces[r];"pawn"===s.class&&(s.position.x!==t||s.position.y!==i+1&&s.position.y!==i-1||(o.enPassant=!0,o.enPassTurn=e.turn))}},1),!0===n)for(var u in e.players)if(e.players[u].side!==this.side)for(var p in e.players[u].pieces){var f=e.players[u].pieces[p];!0!==f.enPassant||f.enPassTurn!==e.turn||f.position.y!==i||f.position.x!==t+1&&f.position.x!==t-1||(f.position.x=-1,f.position.y=-1)}var l=!1;return(7===t&&"white"===this.side||0===t&&"black"===this.side)&&(l=!0),[this.position.x,this.position.y,l]}}]),t}(u.default);t.default=f}]);