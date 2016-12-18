(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Adapter = exports.Adapter = function () {
    function Adapter(config) {
        _classCallCheck(this, Adapter);

        /**
         * Connection configuration
         * @type {*}
         */
        this.config = config;

        /**
         * Socket's connection instance
         * @type {null}
         */
        this.socket = null;

        /**
         * Required parameters for connection
         * @type {Array}
         */
        this.requiredOptions = [];
    }

    _createClass(Adapter, [{
        key: "connect",
        value: function connect(options) {
            this.requiredOptions.forEach(function (option) {
                if (!options[option]) {
                    throw new Error("Required parameter \"" + option + "\" not found");
                }
            });
        }
    }, {
        key: "disconnect",
        value: function disconnect() {}
    }, {
        key: "subscribe",
        value: function subscribe() {}
    }]);

    return Adapter;
}();

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SocketClusterAdapter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _adapter = require('./adapter');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import {Promise} from 'es6-promise';

var SocketClusterAdapter = exports.SocketClusterAdapter = function (_Adapter) {
    _inherits(SocketClusterAdapter, _Adapter);

    /**
     *
     * @param config
     */
    function SocketClusterAdapter(config) {
        _classCallCheck(this, SocketClusterAdapter);

        // SocketCluster is required
        if (!window.socketCluster) {
            throw new ReferenceError('SocketCluster not found');
        }

        var _this = _possibleConstructorReturn(this, (SocketClusterAdapter.__proto__ || Object.getPrototypeOf(SocketClusterAdapter)).call(this, config));

        _this.requiredOptions = ['hostname', 'port'];
        return _this;
    }

    /**
     *
     * @param options
     */


    _createClass(SocketClusterAdapter, [{
        key: 'connect',
        value: function connect(options) {
            var _this2 = this;

            options = Object.assign({}, this.config, options);

            _get(SocketClusterAdapter.prototype.__proto__ || Object.getPrototypeOf(SocketClusterAdapter.prototype), 'connect', this).call(this, options);

            this.socket = window.socketCluster.connect(options);

            return new Promise(function (resolve) {
                _this2.socket.on('connect', function (data) {
                    resolve(data);
                });
            });
        }
    }]);

    return SocketClusterAdapter;
}(_adapter.Adapter);

},{"./adapter":1}],3:[function(require,module,exports){
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

},{"./adapters/socket-cluster":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Socket69 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _provider = require('./provider');

var _noop = require('./util/noop');

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

        /**
         *
         * @type {null}
         */
        this.onConnect = _noop.noop;
    }

    _createClass(Socket69, [{
        key: 'connect',
        value: function connect() {
            var _this = this;

            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return this._provider.connect(options).then(function (data) {
                _this.onConnect(data);
            });
        }
    }]);

    return Socket69;
}();

window.Socket69 = Socket69;

if (typeof define === 'function' && define.amd) {
    define([], function () {
        return Socket69;
    });
}

},{"./provider":3,"./util/noop":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = noop;
function noop() {}

},{}]},{},[4])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWRhcHRlcnMvYWRhcHRlci5qcyIsInNyYy9hZGFwdGVycy9zb2NrZXQtY2x1c3Rlci5qcyIsInNyYy9wcm92aWRlci5qcyIsInNyYy9zb2NrZXQ2OS5qcyIsInNyYy91dGlsL25vb3AuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0lDQWEsTyxXQUFBLE87QUFFVCxxQkFBWSxNQUFaLEVBQW9CO0FBQUE7O0FBRWhCOzs7O0FBSUEsYUFBSyxNQUFMLEdBQWMsTUFBZDs7QUFFQTs7OztBQUlBLGFBQUssTUFBTCxHQUFjLElBQWQ7O0FBRUE7Ozs7QUFJQSxhQUFLLGVBQUwsR0FBdUIsRUFBdkI7QUFDSDs7OztnQ0FFTyxPLEVBQVM7QUFDYixpQkFBSyxlQUFMLENBQXFCLE9BQXJCLENBQTZCLGtCQUFVO0FBQ25DLG9CQUFJLENBQUMsUUFBUSxNQUFSLENBQUwsRUFBc0I7QUFDbEIsMEJBQU0sSUFBSSxLQUFKLDJCQUFpQyxNQUFqQyxrQkFBTjtBQUNIO0FBQ0osYUFKRDtBQUtIOzs7cUNBRVksQ0FFWjs7O29DQUVXLENBRVg7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JDTDs7Ozs7Ozs7QUFDQTs7SUFFYSxvQixXQUFBLG9COzs7QUFFVDs7OztBQUlBLGtDQUFZLE1BQVosRUFBb0I7QUFBQTs7QUFFaEI7QUFDQSxZQUFJLENBQUMsT0FBTyxhQUFaLEVBQTJCO0FBQ3ZCLGtCQUFNLElBQUksY0FBSixDQUFtQix5QkFBbkIsQ0FBTjtBQUNIOztBQUxlLGdKQU9WLE1BUFU7O0FBU2hCLGNBQUssZUFBTCxHQUF1QixDQUFDLFVBQUQsRUFBYSxNQUFiLENBQXZCO0FBVGdCO0FBVW5COztBQUVEOzs7Ozs7OztnQ0FJUSxPLEVBQVM7QUFBQTs7QUFFYixzQkFBVSxPQUFPLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUssTUFBdkIsRUFBK0IsT0FBL0IsQ0FBVjs7QUFFQSxnSkFBYyxPQUFkOztBQUVBLGlCQUFLLE1BQUwsR0FBYyxPQUFPLGFBQVAsQ0FBcUIsT0FBckIsQ0FBNkIsT0FBN0IsQ0FBZDs7QUFFQSxtQkFBTyxJQUFJLE9BQUosQ0FBWSxtQkFBVztBQUMxQix1QkFBSyxNQUFMLENBQVksRUFBWixDQUFlLFNBQWYsRUFBMEIsVUFBQyxJQUFELEVBQVU7QUFDaEMsNEJBQVEsSUFBUjtBQUNILGlCQUZEO0FBR0gsYUFKTSxDQUFQO0FBS0g7Ozs7Ozs7Ozs7Ozs7O0FDdENMOzs7O0lBRWEsUTs7QUFFVDs7Ozs7UUFGUyxRLEdBT1Qsa0JBQVksSUFBWixFQUFrQixPQUFsQixFQUEyQjtBQUFBOztBQUV2Qjs7OztBQUlBLFFBQU0sT0FBTztBQUNUO0FBRFMsS0FBYjs7QUFJQSxXQUFPLElBQUksS0FBSyxJQUFMLENBQUosQ0FBZSxPQUFmLENBQVA7QUFDSCxDOzs7Ozs7Ozs7Ozs7QUNwQkw7O0FBQ0E7Ozs7SUFFYSxRLFdBQUEsUTtBQUVULHNCQUFZLFFBQVosRUFBc0IsT0FBdEIsRUFBK0I7QUFBQTs7QUFFM0I7Ozs7O0FBS0EsYUFBSyxTQUFMLEdBQWlCLHVCQUFhLFFBQWIsRUFBdUIsT0FBdkIsQ0FBakI7O0FBRUE7Ozs7QUFJQSxhQUFLLFNBQUw7QUFDSDs7OztrQ0FFcUI7QUFBQTs7QUFBQSxnQkFBZCxPQUFjLHVFQUFKLEVBQUk7O0FBQ2xCLG1CQUFPLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBdUIsT0FBdkIsRUFBZ0MsSUFBaEMsQ0FBcUMsZ0JBQVE7QUFDaEQsc0JBQUssU0FBTCxDQUFlLElBQWY7QUFDSCxhQUZNLENBQVA7QUFHSDs7Ozs7O0FBR0wsT0FBTyxRQUFQLEdBQWtCLFFBQWxCOztBQUVBLElBQUksT0FBTyxNQUFQLEtBQWtCLFVBQWxCLElBQWdDLE9BQU8sR0FBM0MsRUFBZ0Q7QUFDNUMsV0FBTyxFQUFQLEVBQVcsWUFBVztBQUNsQixlQUFPLFFBQVA7QUFDSCxLQUZEO0FBR0g7Ozs7Ozs7O1FDbENlLEksR0FBQSxJO0FBQVQsU0FBUyxJQUFULEdBQWdCLENBQ3RCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBjbGFzcyBBZGFwdGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb25uZWN0aW9uIGNvbmZpZ3VyYXRpb25cbiAgICAgICAgICogQHR5cGUgeyp9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAgICAgICAvKipcbiAgICAgICAgICogU29ja2V0J3MgY29ubmVjdGlvbiBpbnN0YW5jZVxuICAgICAgICAgKiBAdHlwZSB7bnVsbH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc29ja2V0ID0gbnVsbDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVxdWlyZWQgcGFyYW1ldGVycyBmb3IgY29ubmVjdGlvblxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJlcXVpcmVkT3B0aW9ucyA9IFtdO1xuICAgIH1cblxuICAgIGNvbm5lY3Qob3B0aW9ucykge1xuICAgICAgICB0aGlzLnJlcXVpcmVkT3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnNbb3B0aW9uXSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUmVxdWlyZWQgcGFyYW1ldGVyIFwiJHtvcHRpb259XCIgbm90IGZvdW5kYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRpc2Nvbm5lY3QoKSB7XG5cbiAgICB9XG5cbiAgICBzdWJzY3JpYmUoKSB7XG5cbiAgICB9XG59IiwiaW1wb3J0IHtBZGFwdGVyfSBmcm9tICcuL2FkYXB0ZXInO1xuLy8gaW1wb3J0IHtQcm9taXNlfSBmcm9tICdlczYtcHJvbWlzZSc7XG5cbmV4cG9ydCBjbGFzcyBTb2NrZXRDbHVzdGVyQWRhcHRlciBleHRlbmRzIEFkYXB0ZXIge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG5cbiAgICAgICAgLy8gU29ja2V0Q2x1c3RlciBpcyByZXF1aXJlZFxuICAgICAgICBpZiAoIXdpbmRvdy5zb2NrZXRDbHVzdGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ1NvY2tldENsdXN0ZXIgbm90IGZvdW5kJyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIHRoaXMucmVxdWlyZWRPcHRpb25zID0gWydob3N0bmFtZScsICdwb3J0J107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqL1xuICAgIGNvbm5lY3Qob3B0aW9ucykge1xuXG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbmZpZywgb3B0aW9ucyk7XG5cbiAgICAgICAgc3VwZXIuY29ubmVjdChvcHRpb25zKTtcblxuICAgICAgICB0aGlzLnNvY2tldCA9IHdpbmRvdy5zb2NrZXRDbHVzdGVyLmNvbm5lY3Qob3B0aW9ucyk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5zb2NrZXQub24oJ2Nvbm5lY3QnLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufSIsImltcG9ydCB7U29ja2V0Q2x1c3RlckFkYXB0ZXJ9IGZyb20gJy4vYWRhcHRlcnMvc29ja2V0LWNsdXN0ZXInO1xuXG5leHBvcnQgY2xhc3MgUHJvdmlkZXIge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSBvcHRpb25zXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgb3B0aW9ucykge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7e3NvY2tldC1jbHVzdGVyOiBTb2NrZXRDbHVzdGVyQWRhcHRlcn19XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBsaXN0ID0ge1xuICAgICAgICAgICAgJ3NvY2tldC1jbHVzdGVyJzogU29ja2V0Q2x1c3RlckFkYXB0ZXJcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV3IGxpc3RbbmFtZV0ob3B0aW9ucyk7XG4gICAgfVxufSIsImltcG9ydCB7UHJvdmlkZXJ9IGZyb20gJy4vcHJvdmlkZXInO1xuaW1wb3J0IHtub29wfSBmcm9tICcuL3V0aWwvbm9vcCc7XG5cbmV4cG9ydCBjbGFzcyBTb2NrZXQ2OSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm92aWRlciwgb3B0aW9ucykge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7UHJvdmlkZXJ9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9wcm92aWRlciA9IG5ldyBQcm92aWRlcihwcm92aWRlciwgb3B0aW9ucyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtudWxsfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vbkNvbm5lY3QgPSBub29wO1xuICAgIH1cblxuICAgIGNvbm5lY3Qob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm92aWRlci5jb25uZWN0KG9wdGlvbnMpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uQ29ubmVjdChkYXRhKTtcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbndpbmRvdy5Tb2NrZXQ2OSA9IFNvY2tldDY5O1xuXG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFNvY2tldDY5O1xuICAgIH0pO1xufSIsImV4cG9ydCBmdW5jdGlvbiBub29wKCkge1xufSJdfQ==