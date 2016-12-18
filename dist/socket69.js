!function t(e,n,r){function o(u,c){if(!n[u]){if(!e[u]){var s="function"==typeof require&&require;if(!c&&s)return s(u,!0);if(i)return i(u,!0);var a=new Error("Cannot find module '"+u+"'");throw a.code="MODULE_NOT_FOUND",a}var f=n[u]={exports:{}};e[u][0].call(f.exports,function(t){var n=e[u][1][t];return o(n?n:t)},f,f.exports,t,e,n,r)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=t("../util/noop"),u=t("../util/ucfirst"),c=function(){function t(e){r(this,t),this.config=e,this.socket=null,this.requiredOptions=[],this.on=i,this.events=["error","connect","disconnect","subscribe"]}return o(t,[{key:"connect",value:function(t){this.requiredOptions.forEach(function(e){if(!t[e])throw new Error('Required parameter "'+e+'" not found')})}},{key:"disconnect",value:function(){}},{key:"subscribe",value:function(){}},{key:"publish",value:function(){}},{key:"addListeners",value:function(){var t=this;this.events.forEach(function(e){t.socket.on(e,function(n){e=u(e,"on"),t[e].apply(t,[n])})})}},{key:"onError",value:function(t){this.on("error",t)}},{key:"onConnect",value:function(t){this.on("connect",t)}},{key:"onDisconnect",value:function(t){this.on("disconnect",t)}},{key:"onSubscribe",value:function(t){this.on("subscribe",t)}}]),t}();e.exports=c},{"../util/noop":5,"../util/ucfirst":6}],2:[function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var u=o.get;if(void 0!==u)return u.call(r)},s=t("./adapter"),a=function(t){function e(t){if(r(this,e),!window.socketCluster)throw new ReferenceError("SocketCluster not found");var n=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.requiredOptions=["hostname","port"],n}return i(e,t),u(e,[{key:"connect",value:function(t){t=Object.assign({},this.config,t),c(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"connect",this).call(this,t),this.socket=window.socketCluster.connect(t),this.addListeners()}},{key:"subscribe",value:function(t,e){this.socket.subscribe(t),this.socket.watch(t,e)}},{key:"publish",value:function(t,e){this.socket.publish(t,e)}}]),e}(s);e.exports=a},{"./adapter":1}],3:[function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=t("./adapters/socket-cluster"),i=function t(e,n){r(this,t);var i={"socket-cluster":o};return new i[e](n)};e.exports=i},{"./adapters/socket-cluster":2}],4:[function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=t("./provider"),u=t("./util/noop"),c=t("./util/ucfirst"),s=n.Socket69=function(){function t(e,n){var o=this;r(this,t),this._provider=new i(e,n),this._provider.on=function(t,e){o.on(t,e)},this._channels=[],this.onError=u,this.onConnect=u,this.onDisconnect=u,this.onSubscribe=u}return o(t,[{key:"connect",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this._provider.connect(t)}},{key:"subscribe",value:function(t,e){if(!t)throw new ReferenceError("Channel name was not provided");this._channels.push(t),this._provider.subscribe(t,e)}},{key:"publish",value:function(t,e){this._provider.publish(t,e)}},{key:"on",value:function(t,e){t=c(t,"on"),this[t].apply(this,[e])}}]),t}();window.Socket69=s,"function"==typeof define&&define.amd&&define([],function(){return s})},{"./provider":3,"./util/noop":5,"./util/ucfirst":6}],5:[function(t,e,n){"use strict";function r(){}e.exports=r},{}],6:[function(t,e,n){"use strict";e.exports=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return e+t.charAt(0).toUpperCase()+t.substr(1)}},{}]},{},[4]);
//# sourceMappingURL=socket69.js.map
