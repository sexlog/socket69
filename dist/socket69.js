(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Adapter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _noop = require('../util/noop');

var _ucfirst = require('../util/ucfirst');

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

        /**
         *
         * @type {noop}
         */
        this.on = _noop.noop;

        /**
         *
         * @type {[*]}
         */
        this.events = ['error', 'connect', 'disconnect', 'subscribe'];
    }

    _createClass(Adapter, [{
        key: 'connect',
        value: function connect(options) {
            this.requiredOptions.forEach(function (option) {
                if (!options[option]) {
                    throw new Error('Required parameter "' + option + '" not found');
                }
            });
        }
    }, {
        key: 'disconnect',
        value: function disconnect() {}
    }, {
        key: 'subscribe',
        value: function subscribe() {}
    }, {
        key: 'addListeners',
        value: function addListeners() {
            var _this = this,
                _arguments = arguments;

            this.events.forEach(function (event) {
                _this.socket.on(event, function () {
                    event = (0, _ucfirst.ucfirst)(event, 'on');
                    _this[event].apply(_this, _arguments);
                });
            });
        }
    }, {
        key: 'onConnect',
        value: function onConnect(data) {
            this.on('connect', data);
        }
    }, {
        key: 'onError',
        value: function onError(data) {
            this.on('error', data);
        }
    }]);

    return Adapter;
}();

},{"../util/noop":5,"../util/ucfirst":6}],2:[function(require,module,exports){
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

            this.socket.on('connect', function (data) {
                _this2.onConnect(data);
            });
            this.socket.on('error', function (data) {
                _this2.onError(data);
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

var _ucfirst = require('./util/ucfirst');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Socket69 = exports.Socket69 = function () {
    function Socket69(provider, options) {
        var _this = this;

        _classCallCheck(this, Socket69);

        /**
         *
         * @type {Provider}
         * @private
         */
        this._provider = new _provider.Provider(provider, options);

        this._provider.on = function (eventName, data) {
            _this.on(eventName, data);
        };

        /**
         *
         * @type {null}
         */
        this.onConnect = _noop.noop;
    }

    _createClass(Socket69, [{
        key: 'connect',
        value: function connect() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return this._provider.connect(options);
        }
    }, {
        key: 'on',
        value: function on(eventName, data) {
            eventName = (0, _ucfirst.ucfirst)(eventName, 'on');
            this[eventName].apply(this, [data]);
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

},{"./provider":3,"./util/noop":5,"./util/ucfirst":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = noop;
function noop() {}

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ucfirst = ucfirst;
function ucfirst(string) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    return prefix + string.charAt(0).toUpperCase() + string.substr(1);
}

},{}]},{},[4])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWRhcHRlcnMvYWRhcHRlci5qcyIsInNyYy9hZGFwdGVycy9zb2NrZXQtY2x1c3Rlci5qcyIsInNyYy9wcm92aWRlci5qcyIsInNyYy9zb2NrZXQ2OS5qcyIsInNyYy91dGlsL25vb3AuanMiLCJzcmMvdXRpbC91Y2ZpcnN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FDQUE7O0FBQ0E7Ozs7SUFFYSxPLFdBQUEsTztBQUVULHFCQUFZLE1BQVosRUFBb0I7QUFBQTs7QUFFaEI7Ozs7QUFJQSxhQUFLLE1BQUwsR0FBYyxNQUFkOztBQUVBOzs7O0FBSUEsYUFBSyxNQUFMLEdBQWMsSUFBZDs7QUFFQTs7OztBQUlBLGFBQUssZUFBTCxHQUF1QixFQUF2Qjs7QUFFQTs7OztBQUlBLGFBQUssRUFBTDs7QUFFQTs7OztBQUlBLGFBQUssTUFBTCxHQUFjLENBQ1YsT0FEVSxFQUVWLFNBRlUsRUFHVixZQUhVLEVBSVYsV0FKVSxDQUFkO0FBTUg7Ozs7Z0NBRU8sTyxFQUFTO0FBQ2IsaUJBQUssZUFBTCxDQUFxQixPQUFyQixDQUE2QixrQkFBVTtBQUNuQyxvQkFBSSxDQUFDLFFBQVEsTUFBUixDQUFMLEVBQXNCO0FBQ2xCLDBCQUFNLElBQUksS0FBSiwwQkFBaUMsTUFBakMsaUJBQU47QUFDSDtBQUNKLGFBSkQ7QUFLSDs7O3FDQUVZLENBRVo7OztvQ0FFVyxDQUVYOzs7dUNBRWM7QUFBQTtBQUFBOztBQUNYLGlCQUFLLE1BQUwsQ0FBWSxPQUFaLENBQW9CLGlCQUFTO0FBQ3pCLHNCQUFLLE1BQUwsQ0FBWSxFQUFaLENBQWUsS0FBZixFQUFzQixZQUFNO0FBQ3hCLDRCQUFRLHNCQUFRLEtBQVIsRUFBZSxJQUFmLENBQVI7QUFDQSwwQkFBSyxLQUFMLEVBQVksS0FBWjtBQUNILGlCQUhEO0FBSUgsYUFMRDtBQU1IOzs7a0NBRVMsSSxFQUFNO0FBQ1osaUJB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IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHtub29wfSBmcm9tICcuLi91dGlsL25vb3AnO1xuaW1wb3J0IHt1Y2ZpcnN0fSBmcm9tICcuLi91dGlsL3VjZmlyc3QnO1xuXG5leHBvcnQgY2xhc3MgQWRhcHRlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29ubmVjdGlvbiBjb25maWd1cmF0aW9uXG4gICAgICAgICAqIEB0eXBlIHsqfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNvY2tldCdzIGNvbm5lY3Rpb24gaW5zdGFuY2VcbiAgICAgICAgICogQHR5cGUge251bGx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNvY2tldCA9IG51bGw7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlcXVpcmVkIHBhcmFtZXRlcnMgZm9yIGNvbm5lY3Rpb25cbiAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZXF1aXJlZE9wdGlvbnMgPSBbXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge25vb3B9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm9uID0gbm9vcDtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge1sqXX1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gW1xuICAgICAgICAgICAgJ2Vycm9yJyxcbiAgICAgICAgICAgICdjb25uZWN0JyxcbiAgICAgICAgICAgICdkaXNjb25uZWN0JyxcbiAgICAgICAgICAgICdzdWJzY3JpYmUnXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgY29ubmVjdChvcHRpb25zKSB7XG4gICAgICAgIHRoaXMucmVxdWlyZWRPcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmICghb3B0aW9uc1tvcHRpb25dKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBSZXF1aXJlZCBwYXJhbWV0ZXIgXCIke29wdGlvbn1cIiBub3QgZm91bmRgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGlzY29ubmVjdCgpIHtcblxuICAgIH1cblxuICAgIHN1YnNjcmliZSgpIHtcblxuICAgIH1cblxuICAgIGFkZExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5ldmVudHMuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNvY2tldC5vbihldmVudCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50ID0gdWNmaXJzdChldmVudCwgJ29uJyk7XG4gICAgICAgICAgICAgICAgdGhpc1tldmVudF0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIG9uQ29ubmVjdChkYXRhKSB7XG4gICAgICAgIHRoaXMub24oJ2Nvbm5lY3QnLCBkYXRhKTtcbiAgICB9XG5cbiAgICBvbkVycm9yKGRhdGEpIHtcbiAgICAgICAgdGhpcy5vbignZXJyb3InLCBkYXRhKTtcbiAgICB9XG59IiwiaW1wb3J0IHtBZGFwdGVyfSBmcm9tICcuL2FkYXB0ZXInO1xuLy8gaW1wb3J0IHtQcm9taXNlfSBmcm9tICdlczYtcHJvbWlzZSc7XG5cbmV4cG9ydCBjbGFzcyBTb2NrZXRDbHVzdGVyQWRhcHRlciBleHRlbmRzIEFkYXB0ZXIge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG5cbiAgICAgICAgLy8gU29ja2V0Q2x1c3RlciBpcyByZXF1aXJlZFxuICAgICAgICBpZiAoIXdpbmRvdy5zb2NrZXRDbHVzdGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ1NvY2tldENsdXN0ZXIgbm90IGZvdW5kJyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIHRoaXMucmVxdWlyZWRPcHRpb25zID0gWydob3N0bmFtZScsICdwb3J0J107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqL1xuICAgIGNvbm5lY3Qob3B0aW9ucykge1xuXG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbmZpZywgb3B0aW9ucyk7XG5cbiAgICAgICAgc3VwZXIuY29ubmVjdChvcHRpb25zKTtcblxuICAgICAgICB0aGlzLnNvY2tldCA9IHdpbmRvdy5zb2NrZXRDbHVzdGVyLmNvbm5lY3Qob3B0aW9ucyk7XG5cbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2Nvbm5lY3QnLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkNvbm5lY3QoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNvY2tldC5vbignZXJyb3InLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkVycm9yKGRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG59IiwiaW1wb3J0IHtTb2NrZXRDbHVzdGVyQWRhcHRlcn0gZnJvbSAnLi9hZGFwdGVycy9zb2NrZXQtY2x1c3Rlcic7XG5cbmV4cG9ydCBjbGFzcyBQcm92aWRlciB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBvcHRpb25zKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHt7c29ja2V0LWNsdXN0ZXI6IFNvY2tldENsdXN0ZXJBZGFwdGVyfX1cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IGxpc3QgPSB7XG4gICAgICAgICAgICAnc29ja2V0LWNsdXN0ZXInOiBTb2NrZXRDbHVzdGVyQWRhcHRlclxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXcgbGlzdFtuYW1lXShvcHRpb25zKTtcbiAgICB9XG59IiwiaW1wb3J0IHtQcm92aWRlcn0gZnJvbSAnLi9wcm92aWRlcic7XG5pbXBvcnQge25vb3B9IGZyb20gJy4vdXRpbC9ub29wJztcbmltcG9ydCB7dWNmaXJzdH0gZnJvbSAnLi91dGlsL3VjZmlyc3QnO1xuXG5leHBvcnQgY2xhc3MgU29ja2V0Njkge1xuXG4gICAgY29uc3RydWN0b3IocHJvdmlkZXIsIG9wdGlvbnMpIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge1Byb3ZpZGVyfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fcHJvdmlkZXIgPSBuZXcgUHJvdmlkZXIocHJvdmlkZXIsIG9wdGlvbnMpO1xuXG4gICAgICAgIHRoaXMuX3Byb3ZpZGVyLm9uID0gKGV2ZW50TmFtZSwgZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbihldmVudE5hbWUsIGRhdGEpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7bnVsbH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub25Db25uZWN0ID0gbm9vcDtcbiAgICB9XG5cbiAgICBjb25uZWN0KG9wdGlvbnMgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvdmlkZXIuY29ubmVjdChvcHRpb25zKTtcbiAgICB9XG5cbiAgICBvbihldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgICAgZXZlbnROYW1lID0gdWNmaXJzdChldmVudE5hbWUsICdvbicpO1xuICAgICAgICB0aGlzW2V2ZW50TmFtZV0uYXBwbHkodGhpcywgW2RhdGFdKTtcbiAgICB9XG59XG5cbndpbmRvdy5Tb2NrZXQ2OSA9IFNvY2tldDY5O1xuXG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFNvY2tldDY5O1xuICAgIH0pO1xufSIsImV4cG9ydCBmdW5jdGlvbiBub29wKCkge1xufSIsImV4cG9ydCBmdW5jdGlvbiB1Y2ZpcnN0KHN0cmluZywgcHJlZml4ID0gJycpIHtcbiAgICByZXR1cm4gcHJlZml4ICsgc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnN1YnN0cigxKTtcbn0iXX0=