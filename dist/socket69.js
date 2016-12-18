(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SocketClusterAdapter = exports.SocketClusterAdapter = function SocketClusterAdapter() {
    _classCallCheck(this, SocketClusterAdapter);

    this.config = {
        protocol: 'http',
        port: '80',
        host: 'localhost'
    };
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Provider = undefined;

var _socketCluster = require('./adapters/socket-cluster');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Provider =

/**
 *
 * @param name
 * @param options
 */
exports.Provider = function Provider(name, options) {
    _classCallCheck(this, Provider);

    /**
     *
     * @type {{socket-cluster: SocketClusterAdapter}}
     */
    var list = {
        'socket-cluster': _socketCluster.SocketClusterAdapter
    };

    return new list[name](options);
};

},{"./adapters/socket-cluster":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Socket69 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _provider = require('./provider');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Socket69 = exports.Socket69 = function () {
    function Socket69(provider, options) {
        _classCallCheck(this, Socket69);

        /**
         *
         * @type {Provider}
         * @private
         */
        this._provider = new _provider.Provider(provider, options);
    }

    _createClass(Socket69, [{
        key: 'connect',
        value: function connect() {}
    }]);

    return Socket69;
}();

window.Socket69 = Socket69;

if (typeof define === 'function' && define.amd) {
    define([], function () {
        return Socket69;
    });
}

},{"./provider":2}]},{},[3])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWRhcHRlcnMvc29ja2V0LWNsdXN0ZXIuanMiLCJzcmMvcHJvdmlkZXIuanMiLCJzcmMvc29ja2V0NjkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztJQ0FhLG9CLFdBQUEsb0IsR0FFVCxnQ0FBYztBQUFBOztBQUNWLFNBQUssTUFBTCxHQUFjO0FBQ1Ysa0JBQVUsTUFEQTtBQUVWLGNBQU0sSUFGSTtBQUdWLGNBQU07QUFISSxLQUFkO0FBS0gsQzs7Ozs7Ozs7OztBQ1JMOzs7O0lBRWEsUTs7QUFFVDs7Ozs7UUFGUyxRLEdBT1Qsa0JBQVksSUFBWixFQUFrQixPQUFsQixFQUEyQjtBQUFBOztBQUV2Qjs7OztBQUlBLFFBQU0sT0FBTztBQUNUO0FBRFMsS0FBYjs7QUFJQSxXQUFPLElBQUksS0FBSyxJQUFMLENBQUosQ0FBZSxPQUFmLENBQVA7QUFDSCxDOzs7Ozs7Ozs7Ozs7QUNwQkw7Ozs7SUFFYSxRLFdBQUEsUTtBQUVULHNCQUFZLFFBQVosRUFBc0IsT0FBdEIsRUFBK0I7QUFBQTs7QUFFM0I7Ozs7O0FBS0EsYUFBSyxTQUFMLEdBQWlCLHVCQUFhLFFBQWIsRUFBdUIsT0FBdkIsQ0FBakI7QUFDSDs7OztrQ0FFUyxDQUVUOzs7Ozs7QUFHTCxPQUFPLFFBQVAsR0FBa0IsUUFBbEI7O0FBRUEsSUFBSSxPQUFPLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0MsT0FBTyxHQUEzQyxFQUFnRDtBQUM1QyxXQUFPLEVBQVAsRUFBVyxZQUFXO0FBQ2xCLGVBQU8sUUFBUDtBQUNILEtBRkQ7QUFHSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY2xhc3MgU29ja2V0Q2x1c3RlckFkYXB0ZXIge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgICAgICAgcHJvdG9jb2w6ICdodHRwJyxcbiAgICAgICAgICAgIHBvcnQ6ICc4MCcsXG4gICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0J1xuICAgICAgICB9O1xuICAgIH1cblxufSIsImltcG9ydCB7U29ja2V0Q2x1c3RlckFkYXB0ZXJ9IGZyb20gJy4vYWRhcHRlcnMvc29ja2V0LWNsdXN0ZXInO1xuXG5leHBvcnQgY2xhc3MgUHJvdmlkZXIge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSBvcHRpb25zXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgb3B0aW9ucykge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7e3NvY2tldC1jbHVzdGVyOiBTb2NrZXRDbHVzdGVyQWRhcHRlcn19XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBsaXN0ID0ge1xuICAgICAgICAgICAgJ3NvY2tldC1jbHVzdGVyJzogU29ja2V0Q2x1c3RlckFkYXB0ZXJcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV3IGxpc3RbbmFtZV0ob3B0aW9ucyk7XG4gICAgfVxufSIsImltcG9ydCB7UHJvdmlkZXJ9IGZyb20gJy4vcHJvdmlkZXInO1xuXG5leHBvcnQgY2xhc3MgU29ja2V0Njkge1xuXG4gICAgY29uc3RydWN0b3IocHJvdmlkZXIsIG9wdGlvbnMpIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge1Byb3ZpZGVyfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fcHJvdmlkZXIgPSBuZXcgUHJvdmlkZXIocHJvdmlkZXIsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbm5lY3QoKSB7XG5cbiAgICB9XG59XG5cbndpbmRvdy5Tb2NrZXQ2OSA9IFNvY2tldDY5O1xuXG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFNvY2tldDY5O1xuICAgIH0pO1xufSJdfQ==