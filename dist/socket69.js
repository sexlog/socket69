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
            this.socket.subscribe(channel);
            this.socket.watch(channel, callback);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWRhcHRlcnMvYWRhcHRlci5qcyIsInNyYy9hZGFwdGVycy9zb2NrZXQtY2x1c3Rlci5qcyIsInNyYy9wcm92aWRlci5qcyIsInNyYy9zb2NrZXQ2OS5qcyIsInNyYy91dGlsL25vb3AuanMiLCJzcmMvdXRpbC91Y2ZpcnN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FDQUE7O0FBQ0E7Ozs7SUFFYSxPLFdBQUEsTztBQUVULHFCQUFZLE1BQVosRUFBb0I7QUFBQTs7QUFFaEI7Ozs7QUFJQSxhQUFLLE1BQUwsR0FBYyxNQUFkOztBQUVBOzs7O0FBSUEsYUFBSyxNQUFMLEdBQWMsSUFBZDs7QUFFQTs7OztBQUlBLGFBQUssZUFBTCxHQUF1QixFQUF2Qjs7QUFFQTs7OztBQUlBLGFBQUssRUFBTDs7QUFFQTs7OztBQUlBLGFBQUssTUFBTCxHQUFjLENBQ1YsT0FEVSxFQUVWLFNBRlUsRUFHVixZQUhVLEVBSVYsV0FKVSxDQUFkO0FBTUg7Ozs7Z0NBRU8sTyxFQUFTO0FBQ2IsaUJBQUssZUFBTCxDQUFxQixPQUFyQixDQUE2QixrQkFBVTtBQUNuQyxvQkFBSSxDQUFDLFFBQVEsTUFBUixDQUFMLEVBQXNCO0FBQ2xCLDBCQUFNLElBQUksS0FBSiwwQkFBaUMsTUFBakMsaUJBQU47QUFDSDtBQUNKLGFBSkQ7QUFLSDs7O3FDQUVZLENBRVo7OztvQ0FFVyxDQUVYOzs7a0NBRVEsQ0FBRTs7O3VDQUVJO0FBQUE7O0FBQ1gsaUJBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsaUJBQVM7QUFDekIsc0JBQUssTUFBTCxDQUFZLEVBQVosQ0FBZSxLQUFmLEVBQXNCLFVBQUMsSUFBRCxFQUFVO0FBQzVCLDRCQUFRLHNCQUFRLEtBQVIsRUFBZSxJQUFmLENBQVI7QUFDQSwwQkFBSyxLQUFMLEVBQVksS0FBWixRQUF3QixDQUFDLElBQUQsQ0FBeEI7QUFDSCxpQkFI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LE8sRUFBUyxJLEVBQUs7QUFDbEIsV0FBSyxTQUFMLENBQWUsT0FBZixDQUF1QixPQUF2QixFQUFnQyxJQUFoQztBQUNIOztBQUVEOzs7Ozs7Ozt1QkFLRyxTLEVBQVcsSSxFQUFNO0FBQ2hCLGtCQUFZLHNCQUFRLFNBQVIsRUFBbUIsSUFBbkIsQ0FBWjtBQUNBLFdBQUssU0FBTCxFQUFnQixLQUFoQixDQUFzQixJQUF0QixFQUE0QixDQUFDLElBQUQsQ0FBNUI7QUFDSDs7Ozs7O0FBSUwsT0FBTyxRQUFQLEdBQWtCLFFBQWxCOztBQUVBLElBQUksT0FBTyxNQUFQLEtBQWtCLFVBQWxCLElBQWdDLE9BQU8sR0FBM0MsRUFBZ0Q7QUFDNUMsU0FBTyxFQUFQLEVBQVcsWUFBVztBQUNsQjs7QUFDQSxXQUFPLFFBQVA7QUFDSCxHQUhEO0FBSUg7Ozs7Ozs7O1FDN0dlLEksR0FBQSxJO0FBQVQsU0FBUyxJQUFULEdBQWdCLENBQ3RCOzs7Ozs7OztRQ0RlLE8sR0FBQSxPO0FBQVQsU0FBUyxPQUFULENBQWlCLE1BQWpCLEVBQXNDO0FBQUEsUUFBYixNQUFhLHVFQUFKLEVBQUk7O0FBQ3pDLFdBQU8sU0FBUyxPQUFPLE1BQVAsQ0FBYyxDQUFkLEVBQWlCLFdBQWpCLEVBQVQsR0FBMEMsT0FBTyxNQUFQLENBQWMsQ0FBZCxDQUFqRDtBQUNIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7bm9vcH0gZnJvbSAnLi4vdXRpbC9ub29wJztcbmltcG9ydCB7dWNmaXJzdH0gZnJvbSAnLi4vdXRpbC91Y2ZpcnN0JztcblxuZXhwb3J0IGNsYXNzIEFkYXB0ZXIge1xuXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbm5lY3Rpb24gY29uZmlndXJhdGlvblxuICAgICAgICAgKiBAdHlwZSB7Kn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTb2NrZXQncyBjb25uZWN0aW9uIGluc3RhbmNlXG4gICAgICAgICAqIEB0eXBlIHtudWxsfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zb2NrZXQgPSBudWxsO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXF1aXJlZCBwYXJhbWV0ZXJzIGZvciBjb25uZWN0aW9uXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmVxdWlyZWRPcHRpb25zID0gW107XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtub29wfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vbiA9IG5vb3A7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtbKl19XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IFtcbiAgICAgICAgICAgICdlcnJvcicsXG4gICAgICAgICAgICAnY29ubmVjdCcsXG4gICAgICAgICAgICAnZGlzY29ubmVjdCcsXG4gICAgICAgICAgICAnc3Vic2NyaWJlJ1xuICAgICAgICBdO1xuICAgIH1cblxuICAgIGNvbm5lY3Qob3B0aW9ucykge1xuICAgICAgICB0aGlzLnJlcXVpcmVkT3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnNbb3B0aW9uXSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUmVxdWlyZWQgcGFyYW1ldGVyIFwiJHtvcHRpb259XCIgbm90IGZvdW5kYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRpc2Nvbm5lY3QoKSB7XG5cbiAgICB9XG5cbiAgICBzdWJzY3JpYmUoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaXNoKCl7fVxuXG4gICAgYWRkTGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0Lm9uKGV2ZW50LCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50ID0gdWNmaXJzdChldmVudCwgJ29uJyk7XG4gICAgICAgICAgICAgICAgdGhpc1tldmVudF0uYXBwbHkodGhpcywgW2RhdGFdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkVycm9yKGRhdGEpIHtcbiAgICAgICAgdGhpcy5vbignZXJyb3InLCBkYXRhKTtcbiAgICB9XG5cbiAgICBvbkNvbm5lY3QoZGF0YSkge1xuICAgICAgICB0aGlzLm9uKCdjb25uZWN0JywgZGF0YSk7XG4gICAgfVxuXG4gICAgb25EaXNjb25uZWN0KGRhdGEpIHtcbiAgICAgICAgdGhpcy5vbignZGlzY29ubmVjdCcsIGRhdGEpO1xuICAgIH1cblxuICAgIG9uU3Vic2NyaWJlKGRhdGEpIHtcbiAgICAgICAgdGhpcy5vbignc3Vic2NyaWJlJywgZGF0YSk7XG4gICAgfVxufSIsImltcG9ydCB7QWRhcHRlcn0gZnJvbSAnLi9hZGFwdGVyJztcblxuZXhwb3J0IGNsYXNzIFNvY2tldENsdXN0ZXJBZGFwdGVyIGV4dGVuZHMgQWRhcHRlciB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcblxuICAgICAgICAvLyBTb2NrZXRDbHVzdGVyIGlzIHJlcXVpcmVkXG4gICAgICAgIGlmICghd2luZG93LnNvY2tldENsdXN0ZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignU29ja2V0Q2x1c3RlciBub3QgZm91bmQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgdGhpcy5yZXF1aXJlZE9wdGlvbnMgPSBbJ2hvc3RuYW1lJywgJ3BvcnQnXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zXG4gICAgICovXG4gICAgY29ubmVjdChvcHRpb25zKSB7XG5cbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY29uZmlnLCBvcHRpb25zKTtcblxuICAgICAgICBzdXBlci5jb25uZWN0KG9wdGlvbnMpO1xuXG4gICAgICAgIHRoaXMuc29ja2V0ID0gd2luZG93LnNvY2tldENsdXN0ZXIuY29ubmVjdChvcHRpb25zKTtcblxuICAgICAgICB0aGlzLmFkZExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGNoYW5uZWxcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBzdWJzY3JpYmUoY2hhbm5lbCwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5zb2NrZXQuc3Vic2NyaWJlKGNoYW5uZWwpO1xuICAgICAgICB0aGlzLnNvY2tldC53YXRjaChjaGFubmVsLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hhbm5lbFxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICovXG4gICAgcHVibGlzaChjaGFubmVsLCBkYXRhKSB7XG4gICAgICAgIHRoaXMuc29ja2V0LnB1Ymxpc2goY2hhbm5lbCwgZGF0YSk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHtTb2NrZXRDbHVzdGVyQWRhcHRlcn0gZnJvbSAnLi9hZGFwdGVycy9zb2NrZXQtY2x1c3Rlcic7XG5cbmV4cG9ydCBjbGFzcyBQcm92aWRlciB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBvcHRpb25zKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHt7c29ja2V0LWNsdXN0ZXI6IFNvY2tldENsdXN0ZXJBZGFwdGVyfX1cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IGxpc3QgPSB7XG4gICAgICAgICAgICAnc29ja2V0LWNsdXN0ZXInOiBTb2NrZXRDbHVzdGVyQWRhcHRlclxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXcgbGlzdFtuYW1lXShvcHRpb25zKTtcbiAgICB9XG59IiwiaW1wb3J0IHtQcm92aWRlcn0gZnJvbSAnLi9wcm92aWRlcic7XG5pbXBvcnQge25vb3B9IGZyb20gJy4vdXRpbC9ub29wJztcbmltcG9ydCB7dWNmaXJzdH0gZnJvbSAnLi91dGlsL3VjZmlyc3QnO1xuXG5leHBvcnQgY2xhc3MgU29ja2V0Njkge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvdmlkZXJcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3ZpZGVyLCBvcHRpb25zKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtQcm92aWRlcn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3Byb3ZpZGVyID0gbmV3IFByb3ZpZGVyKHByb3ZpZGVyLCBvcHRpb25zKTtcblxuICAgICAgICB0aGlzLl9wcm92aWRlci5vbiA9IChldmVudE5hbWUsIGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMub24oZXZlbnROYW1lLCBkYXRhKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fY2hhbm5lbHMgPSBbXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge251bGx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm9uRXJyb3IgPSBub29wO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7bnVsbH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub25Db25uZWN0ID0gbm9vcDtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge251bGx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm9uRGlzY29ubmVjdCA9IG5vb3A7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtudWxsfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vblN1YnNjcmliZSA9IG5vb3A7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGNvbm5lY3Qob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm92aWRlci5jb25uZWN0KG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGNoYW5uZWxcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBzdWJzY3JpYmUoY2hhbm5lbCwgY2FsbGJhY2spe1xuXG4gICAgICAgIGlmKCFjaGFubmVsKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignQ2hhbm5lbCBuYW1lIHdhcyBub3QgcHJvdmlkZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NoYW5uZWxzLnB1c2goY2hhbm5lbCk7XG5cbiAgICAgICAgdGhpcy5fcHJvdmlkZXIuc3Vic2NyaWJlKGNoYW5uZWwsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGFubmVsXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKi9cbiAgICBwdWJsaXNoKGNoYW5uZWwsIGRhdGEpe1xuICAgICAgICB0aGlzLl9wcm92aWRlci5wdWJsaXNoKGNoYW5uZWwsIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZVxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICovXG4gICAgb24oZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICAgIGV2ZW50TmFtZSA9IHVjZmlyc3QoZXZlbnROYW1lLCAnb24nKTtcbiAgICAgICAgdGhpc1tldmVudE5hbWVdLmFwcGx5KHRoaXMsIFtkYXRhXSk7XG4gICAgfVxuXG59XG5cbndpbmRvdy5Tb2NrZXQ2OSA9IFNvY2tldDY5O1xuXG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgICByZXR1cm4gU29ja2V0Njk7XG4gICAgfSk7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIG5vb3AoKSB7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIHVjZmlyc3Qoc3RyaW5nLCBwcmVmaXggPSAnJykge1xuICAgIHJldHVybiBwcmVmaXggKyBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc3Vic3RyKDEpO1xufSJdfQ==