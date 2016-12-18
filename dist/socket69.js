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
        key: 'publish',
        value: function publish() {}
    }, {
        key: 'addListeners',
        value: function addListeners() {
            var _this = this;

            this.events.forEach(function (event) {
                _this.socket.on(event, function (data) {
                    event = (0, _ucfirst.ucfirst)(event, 'on');
                    _this[event].apply(_this, [data]);
                });
            });
        }
    }, {
        key: 'onError',
        value: function onError(data) {
            this.on('error', data);
        }
    }, {
        key: 'onConnect',
        value: function onConnect(data) {
            this.on('connect', data);
        }
    }, {
        key: 'onDisconnect',
        value: function onDisconnect(data) {
            this.on('disconnect', data);
        }
    }, {
        key: 'onSubscribe',
        value: function onSubscribe(data) {
            this.on('subscribe', data);
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

            options = Object.assign({}, this.config, options);

            _get(SocketClusterAdapter.prototype.__proto__ || Object.getPrototypeOf(SocketClusterAdapter.prototype), 'connect', this).call(this, options);

            this.socket = window.socketCluster.connect(options);

            this.addListeners();
        }

        /**
         *
         * @param channel
         * @param callback
         */

    }, {
        key: 'subscribe',
        value: function subscribe(channel, callback) {
            this.socket.subscribe(channel, callback);
        }

        /**
         *
         * @param channel
         * @param data
         */

    }, {
        key: 'publish',
        value: function publish(channel, data) {
            this.socket.publish(channel, data);
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

  /**
   *
   * @param provider
   * @param options
   */
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
     * @type {Array}
     * @private
     */
    this._channels = [];

    /**
     *
     * @type {null}
     */
    this.onError = _noop.noop;

    /**
     *
     * @type {null}
     */
    this.onConnect = _noop.noop;

    /**
     *
     * @type {null}
     */
    this.onDisconnect = _noop.noop;

    /**
     *
     * @type {null}
     */
    this.onSubscribe = _noop.noop;
  }

  /**
   *
   * @param options
   * @returns {*}
   */


  _createClass(Socket69, [{
    key: 'connect',
    value: function connect() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this._provider.connect(options);
    }

    /**
     *
     * @param channel
     * @param callback
     */

  }, {
    key: 'subscribe',
    value: function subscribe(channel, callback) {

      if (!channel) {
        throw new ReferenceError('Channel name was not provided');
      }

      this._channels.push(channel);

      this._provider.subscribe(channel, callback);
    }

    /**
     *
     * @param channel
     * @param data
     */

  }, {
    key: 'publish',
    value: function publish(channel, data) {
      this._provider.publish(channel, data);
    }

    /**
     *
     * @param eventName
     * @param data
     */

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
    'use strict';

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWRhcHRlcnMvYWRhcHRlci5qcyIsInNyYy9hZGFwdGVycy9zb2NrZXQtY2x1c3Rlci5qcyIsInNyYy9wcm92aWRlci5qcyIsInNyYy9zb2NrZXQ2OS5qcyIsInNyYy91dGlsL25vb3AuanMiLCJzcmMvdXRpbC91Y2ZpcnN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FDQUE7O0FBQ0E7Ozs7SUFFYSxPLFdBQUEsTztBQUVULHFCQUFZLE1BQVosRUFBb0I7QUFBQTs7QUFFaEI7Ozs7QUFJQSxhQUFLLE1BQUwsR0FBYyxNQUFkOztBQUVBOzs7O0FBSUEsYUFBSyxNQUFMLEdBQWMsSUFBZDs7QUFFQTs7OztBQUlBLGFBQUssZUFBTCxHQUF1QixFQUF2Qjs7QUFFQTs7OztBQUlBLGFBQUssRUFBTDs7QUFFQTs7OztBQUlBLGFBQUssTUFBTCxHQUFjLENBQ1YsT0FEVSxFQUVWLFNBRlUsRUFHVixZQUhVLEVBSVYsV0FKVSxDQUFkO0FBTUg7Ozs7Z0NBRU8sTyxFQUFTO0FBQ2IsaUJBQUssZUFBTCxDQUFxQixPQUFyQixDQUE2QixrQkFBVTtBQUNuQyxvQkFBSSxDQUFDLFFBQVEsTUFBUixDQUFMLEVBQXNCO0FBQ2xCLDBCQUFNLElBQUksS0FBSiwwQkFBaUMsTUFBakMsaUJBQU47QUFDSDtBQUNKLGFBSkQ7QUFLSDs7O3FDQUVZLENBRVo7OztvQ0FFVyxDQUVYOzs7a0NBRVEsQ0FBRTs7O3VDQUVJO0FBQUE7O0FBQ1gsaUJBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsaUJBQVM7QUFDekIsc0JBQUssTUFBTCxDQUFZLEVBQVosQ0FBZSxLQUFmLEVBQXNCLFVBQUMsSUFBRCxFQUFVO0FBQzVCLDRCQUFRLHNCQUFRLEtBQVIsRUFBZSxJQUFmLENBQVI7QUFDQSwwQkFBSyxLQUFMLEVBQVksS0FBWixRQUF3QixDQUFDLElBQUQsQ0FBeEI7QUFDSCxpQkFI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QUFlLE9BQWYsQ0FBdUIsT0FBdkIsRUFBZ0MsSUFBaEM7QUFDSDs7QUFFRDs7Ozs7Ozs7dUJBS0csUyxFQUFXLEksRUFBTTtBQUNoQixrQkFBWSxzQkFBUSxTQUFSLEVBQW1CLElBQW5CLENBQVo7QUFDQSxXQUFLLFNBQUwsRUFBZ0IsS0FBaEIsQ0FBc0IsSUFBdEIsRUFBNEIsQ0FBQyxJQUFELENBQTVCO0FBQ0g7Ozs7OztBQUlMLE9BQU8sUUFBUCxHQUFrQixRQUFsQjs7QUFFQSxJQUFJLE9BQU8sTUFBUCxLQUFrQixVQUFsQixJQUFnQyxPQUFPLEdBQTNDLEVBQWdEO0FBQzVDLFNBQU8sRUFBUCxFQUFXLFlBQVc7QUFDbEI7O0FBQ0EsV0FBTyxRQUFQO0FBQ0gsR0FIRDtBQUlIOzs7Ozs7OztRQzdHZSxJLEdBQUEsSTtBQUFULFNBQVMsSUFBVCxHQUFnQixDQUN0Qjs7Ozs7Ozs7UUNEZSxPLEdBQUEsTztBQUFULFNBQVMsT0FBVCxDQUFpQixNQUFqQixFQUFzQztBQUFBLFFBQWIsTUFBYSx1RUFBSixFQUFJOztBQUN6QyxXQUFPLFNBQVMsT0FBTyxNQUFQLENBQWMsQ0FBZCxFQUFpQixXQUFqQixFQUFULEdBQTBDLE9BQU8sTUFBUCxDQUFjLENBQWQsQ0FBakQ7QUFDSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge25vb3B9IGZyb20gJy4uL3V0aWwvbm9vcCc7XG5pbXBvcnQge3VjZmlyc3R9IGZyb20gJy4uL3V0aWwvdWNmaXJzdCc7XG5cbmV4cG9ydCBjbGFzcyBBZGFwdGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb25uZWN0aW9uIGNvbmZpZ3VyYXRpb25cbiAgICAgICAgICogQHR5cGUgeyp9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAgICAgICAvKipcbiAgICAgICAgICogU29ja2V0J3MgY29ubmVjdGlvbiBpbnN0YW5jZVxuICAgICAgICAgKiBAdHlwZSB7bnVsbH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc29ja2V0ID0gbnVsbDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVxdWlyZWQgcGFyYW1ldGVycyBmb3IgY29ubmVjdGlvblxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJlcXVpcmVkT3B0aW9ucyA9IFtdO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7bm9vcH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub24gPSBub29wO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7WypdfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5ldmVudHMgPSBbXG4gICAgICAgICAgICAnZXJyb3InLFxuICAgICAgICAgICAgJ2Nvbm5lY3QnLFxuICAgICAgICAgICAgJ2Rpc2Nvbm5lY3QnLFxuICAgICAgICAgICAgJ3N1YnNjcmliZSdcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBjb25uZWN0KG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5yZXF1aXJlZE9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zW29wdGlvbl0pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlcXVpcmVkIHBhcmFtZXRlciBcIiR7b3B0aW9ufVwiIG5vdCBmb3VuZGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkaXNjb25uZWN0KCkge1xuXG4gICAgfVxuXG4gICAgc3Vic2NyaWJlKCkge1xuXG4gICAgfVxuXG4gICAgcHVibGlzaCgpe31cblxuICAgIGFkZExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5ldmVudHMuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNvY2tldC5vbihldmVudCwgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBldmVudCA9IHVjZmlyc3QoZXZlbnQsICdvbicpO1xuICAgICAgICAgICAgICAgIHRoaXNbZXZlbnRdLmFwcGx5KHRoaXMsIFtkYXRhXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25FcnJvcihkYXRhKSB7XG4gICAgICAgIHRoaXMub24oJ2Vycm9yJywgZGF0YSk7XG4gICAgfVxuXG4gICAgb25Db25uZWN0KGRhdGEpIHtcbiAgICAgICAgdGhpcy5vbignY29ubmVjdCcsIGRhdGEpO1xuICAgIH1cblxuICAgIG9uRGlzY29ubmVjdChkYXRhKSB7XG4gICAgICAgIHRoaXMub24oJ2Rpc2Nvbm5lY3QnLCBkYXRhKTtcbiAgICB9XG5cbiAgICBvblN1YnNjcmliZShkYXRhKSB7XG4gICAgICAgIHRoaXMub24oJ3N1YnNjcmliZScsIGRhdGEpO1xuICAgIH1cbn0iLCJpbXBvcnQge0FkYXB0ZXJ9IGZyb20gJy4vYWRhcHRlcic7XG4vLyBpbXBvcnQge1Byb21pc2V9IGZyb20gJ2VzNi1wcm9taXNlJztcblxuZXhwb3J0IGNsYXNzIFNvY2tldENsdXN0ZXJBZGFwdGVyIGV4dGVuZHMgQWRhcHRlciB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcblxuICAgICAgICAvLyBTb2NrZXRDbHVzdGVyIGlzIHJlcXVpcmVkXG4gICAgICAgIGlmICghd2luZG93LnNvY2tldENsdXN0ZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignU29ja2V0Q2x1c3RlciBub3QgZm91bmQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgdGhpcy5yZXF1aXJlZE9wdGlvbnMgPSBbJ2hvc3RuYW1lJywgJ3BvcnQnXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zXG4gICAgICovXG4gICAgY29ubmVjdChvcHRpb25zKSB7XG5cbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY29uZmlnLCBvcHRpb25zKTtcblxuICAgICAgICBzdXBlci5jb25uZWN0KG9wdGlvbnMpO1xuXG4gICAgICAgIHRoaXMuc29ja2V0ID0gd2luZG93LnNvY2tldENsdXN0ZXIuY29ubmVjdChvcHRpb25zKTtcblxuICAgICAgICB0aGlzLmFkZExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGNoYW5uZWxcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBzdWJzY3JpYmUoY2hhbm5lbCwgY2FsbGJhY2spe1xuICAgICAgICB0aGlzLnNvY2tldC5zdWJzY3JpYmUoY2hhbm5lbCwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGNoYW5uZWxcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqL1xuICAgIHB1Ymxpc2goY2hhbm5lbCwgZGF0YSl7XG4gICAgICAgIHRoaXMuc29ja2V0LnB1Ymxpc2goY2hhbm5lbCwgZGF0YSk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHtTb2NrZXRDbHVzdGVyQWRhcHRlcn0gZnJvbSAnLi9hZGFwdGVycy9zb2NrZXQtY2x1c3Rlcic7XG5cbmV4cG9ydCBjbGFzcyBQcm92aWRlciB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBvcHRpb25zKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHt7c29ja2V0LWNsdXN0ZXI6IFNvY2tldENsdXN0ZXJBZGFwdGVyfX1cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IGxpc3QgPSB7XG4gICAgICAgICAgICAnc29ja2V0LWNsdXN0ZXInOiBTb2NrZXRDbHVzdGVyQWRhcHRlclxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXcgbGlzdFtuYW1lXShvcHRpb25zKTtcbiAgICB9XG59IiwiaW1wb3J0IHtQcm92aWRlcn0gZnJvbSAnLi9wcm92aWRlcic7XG5pbXBvcnQge25vb3B9IGZyb20gJy4vdXRpbC9ub29wJztcbmltcG9ydCB7dWNmaXJzdH0gZnJvbSAnLi91dGlsL3VjZmlyc3QnO1xuXG5leHBvcnQgY2xhc3MgU29ja2V0Njkge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvdmlkZXJcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3ZpZGVyLCBvcHRpb25zKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtQcm92aWRlcn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3Byb3ZpZGVyID0gbmV3IFByb3ZpZGVyKHByb3ZpZGVyLCBvcHRpb25zKTtcblxuICAgICAgICB0aGlzLl9wcm92aWRlci5vbiA9IChldmVudE5hbWUsIGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMub24oZXZlbnROYW1lLCBkYXRhKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fY2hhbm5lbHMgPSBbXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge251bGx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm9uRXJyb3IgPSBub29wO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7bnVsbH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub25Db25uZWN0ID0gbm9vcDtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge251bGx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm9uRGlzY29ubmVjdCA9IG5vb3A7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtudWxsfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vblN1YnNjcmliZSA9IG5vb3A7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGNvbm5lY3Qob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm92aWRlci5jb25uZWN0KG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGNoYW5uZWxcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBzdWJzY3JpYmUoY2hhbm5lbCwgY2FsbGJhY2spe1xuXG4gICAgICAgIGlmKCFjaGFubmVsKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignQ2hhbm5lbCBuYW1lIHdhcyBub3QgcHJvdmlkZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NoYW5uZWxzLnB1c2goY2hhbm5lbCk7XG5cbiAgICAgICAgdGhpcy5fcHJvdmlkZXIuc3Vic2NyaWJlKGNoYW5uZWwsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGFubmVsXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKi9cbiAgICBwdWJsaXNoKGNoYW5uZWwsIGRhdGEpe1xuICAgICAgICB0aGlzLl9wcm92aWRlci5wdWJsaXNoKGNoYW5uZWwsIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZVxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICovXG4gICAgb24oZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICAgIGV2ZW50TmFtZSA9IHVjZmlyc3QoZXZlbnROYW1lLCAnb24nKTtcbiAgICAgICAgdGhpc1tldmVudE5hbWVdLmFwcGx5KHRoaXMsIFtkYXRhXSk7XG4gICAgfVxuXG59XG5cbndpbmRvdy5Tb2NrZXQ2OSA9IFNvY2tldDY5O1xuXG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgICByZXR1cm4gU29ja2V0Njk7XG4gICAgfSk7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIG5vb3AoKSB7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIHVjZmlyc3Qoc3RyaW5nLCBwcmVmaXggPSAnJykge1xuICAgIHJldHVybiBwcmVmaXggKyBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc3Vic3RyKDEpO1xufSJdfQ==