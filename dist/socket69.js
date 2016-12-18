(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var noop = require('../util/noop'),
    ucfirst = require('../util/ucfirst');

var Adapter = function () {
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
        this.on = noop;

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
                    event = ucfirst(event, 'on');
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

module.exports = Adapter;

},{"../util/noop":5,"../util/ucfirst":6}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Adapter = require('./adapter');

var SocketClusterAdapter = function (_Adapter) {
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
}(Adapter);

module.exports = SocketClusterAdapter;

},{"./adapter":1}],3:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SocketClusterAdapter = require('./adapters/socket-cluster');

var Provider =

/**
 *
 * @param name
 * @param options
 */
function Provider(name, options) {
    _classCallCheck(this, Provider);

    /**
     *
     * @type {{socket-cluster: SocketClusterAdapter}}
     */
    var list = {
        'socket-cluster': SocketClusterAdapter
    };

    return new list[name](options);
};

module.exports = Provider;

},{"./adapters/socket-cluster":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Provider = require('./provider'),
    noop = require('./util/noop'),
    ucfirst = require('./util/ucfirst');

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
    this._provider = new Provider(provider, options);

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
    this.onError = noop;

    /**
     *
     * @type {null}
     */
    this.onConnect = noop;

    /**
     *
     * @type {null}
     */
    this.onDisconnect = noop;

    /**
     *
     * @type {null}
     */
    this.onSubscribe = noop;
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
      eventName = ucfirst(eventName, 'on');
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

function noop() {}

module.exports = noop;

},{}],6:[function(require,module,exports){
'use strict';

module.exports = function ucfirst(string) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    return prefix + string.charAt(0).toUpperCase() + string.substr(1);
};

},{}]},{},[4])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWRhcHRlcnMvYWRhcHRlci5qcyIsInNyYy9hZGFwdGVycy9zb2NrZXQtY2x1c3Rlci5qcyIsInNyYy9wcm92aWRlci5qcyIsInNyYy9zb2NrZXQ2OS5qcyIsInNyYy91dGlsL25vb3AuanMiLCJzcmMvdXRpbC91Y2ZpcnN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsSUFBTSxPQUFVLFFBQVEsY0FBUixDQUFoQjtBQUFBLElBQ00sVUFBVSxRQUFRLGlCQUFSLENBRGhCOztJQUdNLE87QUFFRixxQkFBWSxNQUFaLEVBQW9CO0FBQUE7O0FBRWhCOzs7O0FBSUEsYUFBSyxNQUFMLEdBQWMsTUFBZDs7QUFFQTs7OztBQUlBLGFBQUssTUFBTCxHQUFjLElBQWQ7O0FBRUE7Ozs7QUFJQSxhQUFLLGVBQUwsR0FBdUIsRUFBdkI7O0FBRUE7Ozs7QUFJQSxhQUFLLEVBQUwsR0FBVSxJQUFWOztBQUVBOzs7O0FBSUEsYUFBSyxNQUFMLEdBQWMsQ0FDVixPQURVLEVBRVYsU0FGVSxFQUdWLFlBSFUsRUFJVixXQUpVLENBQWQ7QUFNSDs7OztnQ0FFTyxPLEVBQVM7QUFDYixpQkFBSyxlQUFMLENBQXFCLE9BQXJCLENBQTZCLGtCQUFVO0FBQ25DLG9CQUFJLENBQUMsUUFBUSxNQUFSLENBQUwsRUFBc0I7QUFDbEIsMEJBQU0sSUFBSSxLQUFKLDBCQUFpQyxNQUFqQyxpQkFBTjtBQUNIO0FBQ0osYUFKRDtBQUtIOzs7cUNBRVksQ0FDWjs7O29DQUVXLENBQ1g7OztrQ0FFUyxDQUNUOzs7dUNBRWM7QUFBQTs7QUFDWCxpQkFBSyxNQUFMLENBQVksT0FBWixDQUFvQixpQkFBUztBQUN6QixzQkFBSyxNQUFMLENBQVksRUFBWixDQUFlLEtBQWYsRUFBc0IsVUFBQyxJQUFELEVBQVU7QUFDNUIsNEJBQVEsUUFBUSxLQUFSLEVBQWUsSUFBZixDQUFSO0FBQ0EsMEJB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Q0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBub29wICAgID0gcmVxdWlyZSgnLi4vdXRpbC9ub29wJyksXG4gICAgICB1Y2ZpcnN0ID0gcmVxdWlyZSgnLi4vdXRpbC91Y2ZpcnN0Jyk7XG5cbmNsYXNzIEFkYXB0ZXIge1xuXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbm5lY3Rpb24gY29uZmlndXJhdGlvblxuICAgICAgICAgKiBAdHlwZSB7Kn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTb2NrZXQncyBjb25uZWN0aW9uIGluc3RhbmNlXG4gICAgICAgICAqIEB0eXBlIHtudWxsfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zb2NrZXQgPSBudWxsO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXF1aXJlZCBwYXJhbWV0ZXJzIGZvciBjb25uZWN0aW9uXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmVxdWlyZWRPcHRpb25zID0gW107XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtub29wfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vbiA9IG5vb3A7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtbKl19XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IFtcbiAgICAgICAgICAgICdlcnJvcicsXG4gICAgICAgICAgICAnY29ubmVjdCcsXG4gICAgICAgICAgICAnZGlzY29ubmVjdCcsXG4gICAgICAgICAgICAnc3Vic2NyaWJlJ1xuICAgICAgICBdO1xuICAgIH1cblxuICAgIGNvbm5lY3Qob3B0aW9ucykge1xuICAgICAgICB0aGlzLnJlcXVpcmVkT3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnNbb3B0aW9uXSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUmVxdWlyZWQgcGFyYW1ldGVyIFwiJHtvcHRpb259XCIgbm90IGZvdW5kYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlKCkge1xuICAgIH1cblxuICAgIHB1Ymxpc2goKSB7XG4gICAgfVxuXG4gICAgYWRkTGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0Lm9uKGV2ZW50LCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50ID0gdWNmaXJzdChldmVudCwgJ29uJyk7XG4gICAgICAgICAgICAgICAgdGhpc1tldmVudF0uYXBwbHkodGhpcywgW2RhdGFdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkVycm9yKGRhdGEpIHtcbiAgICAgICAgdGhpcy5vbignZXJyb3InLCBkYXRhKTtcbiAgICB9XG5cbiAgICBvbkNvbm5lY3QoZGF0YSkge1xuICAgICAgICB0aGlzLm9uKCdjb25uZWN0JywgZGF0YSk7XG4gICAgfVxuXG4gICAgb25EaXNjb25uZWN0KGRhdGEpIHtcbiAgICAgICAgdGhpcy5vbignZGlzY29ubmVjdCcsIGRhdGEpO1xuICAgIH1cblxuICAgIG9uU3Vic2NyaWJlKGRhdGEpIHtcbiAgICAgICAgdGhpcy5vbignc3Vic2NyaWJlJywgZGF0YSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFkYXB0ZXI7IiwiY29uc3QgQWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcicpO1xuXG5jbGFzcyBTb2NrZXRDbHVzdGVyQWRhcHRlciBleHRlbmRzIEFkYXB0ZXIge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG5cbiAgICAgICAgLy8gU29ja2V0Q2x1c3RlciBpcyByZXF1aXJlZFxuICAgICAgICBpZiAoIXdpbmRvdy5zb2NrZXRDbHVzdGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ1NvY2tldENsdXN0ZXIgbm90IGZvdW5kJyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIHRoaXMucmVxdWlyZWRPcHRpb25zID0gWydob3N0bmFtZScsICdwb3J0J107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqL1xuICAgIGNvbm5lY3Qob3B0aW9ucykge1xuXG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbmZpZywgb3B0aW9ucyk7XG5cbiAgICAgICAgc3VwZXIuY29ubmVjdChvcHRpb25zKTtcblxuICAgICAgICB0aGlzLnNvY2tldCA9IHdpbmRvdy5zb2NrZXRDbHVzdGVyLmNvbm5lY3Qob3B0aW9ucyk7XG5cbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGFubmVsXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICovXG4gICAgc3Vic2NyaWJlKGNoYW5uZWwsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuc29ja2V0LnN1YnNjcmliZShjaGFubmVsKTtcbiAgICAgICAgdGhpcy5zb2NrZXQud2F0Y2goY2hhbm5lbCwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGNoYW5uZWxcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqL1xuICAgIHB1Ymxpc2goY2hhbm5lbCwgZGF0YSkge1xuICAgICAgICB0aGlzLnNvY2tldC5wdWJsaXNoKGNoYW5uZWwsIGRhdGEpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTb2NrZXRDbHVzdGVyQWRhcHRlcjsiLCJjb25zdCBTb2NrZXRDbHVzdGVyQWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvc29ja2V0LWNsdXN0ZXInKTtcblxuY2xhc3MgUHJvdmlkZXIge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSBvcHRpb25zXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgb3B0aW9ucykge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7e3NvY2tldC1jbHVzdGVyOiBTb2NrZXRDbHVzdGVyQWRhcHRlcn19XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBsaXN0ID0ge1xuICAgICAgICAgICAgJ3NvY2tldC1jbHVzdGVyJzogU29ja2V0Q2x1c3RlckFkYXB0ZXJcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV3IGxpc3RbbmFtZV0ob3B0aW9ucyk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb3ZpZGVyOyIsImNvbnN0IFByb3ZpZGVyID0gcmVxdWlyZSgnLi9wcm92aWRlcicpLFxuICAgICAgbm9vcCAgICAgPSByZXF1aXJlKCcuL3V0aWwvbm9vcCcpLFxuICAgICAgdWNmaXJzdCAgPSByZXF1aXJlKCcuL3V0aWwvdWNmaXJzdCcpO1xuXG5leHBvcnQgY2xhc3MgU29ja2V0Njkge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvdmlkZXJcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3ZpZGVyLCBvcHRpb25zKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtQcm92aWRlcn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3Byb3ZpZGVyID0gbmV3IFByb3ZpZGVyKHByb3ZpZGVyLCBvcHRpb25zKTtcblxuICAgICAgICB0aGlzLl9wcm92aWRlci5vbiA9IChldmVudE5hbWUsIGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMub24oZXZlbnROYW1lLCBkYXRhKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fY2hhbm5lbHMgPSBbXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge251bGx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm9uRXJyb3IgPSBub29wO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7bnVsbH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub25Db25uZWN0ID0gbm9vcDtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge251bGx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm9uRGlzY29ubmVjdCA9IG5vb3A7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtudWxsfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vblN1YnNjcmliZSA9IG5vb3A7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGNvbm5lY3Qob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm92aWRlci5jb25uZWN0KG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGNoYW5uZWxcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBzdWJzY3JpYmUoY2hhbm5lbCwgY2FsbGJhY2spIHtcblxuICAgICAgICBpZiAoIWNoYW5uZWwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignQ2hhbm5lbCBuYW1lIHdhcyBub3QgcHJvdmlkZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NoYW5uZWxzLnB1c2goY2hhbm5lbCk7XG5cbiAgICAgICAgdGhpcy5fcHJvdmlkZXIuc3Vic2NyaWJlKGNoYW5uZWwsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGFubmVsXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKi9cbiAgICBwdWJsaXNoKGNoYW5uZWwsIGRhdGEpIHtcbiAgICAgICAgdGhpcy5fcHJvdmlkZXIucHVibGlzaChjaGFubmVsLCBkYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudE5hbWVcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqL1xuICAgIG9uKGV2ZW50TmFtZSwgZGF0YSkge1xuICAgICAgICBldmVudE5hbWUgPSB1Y2ZpcnN0KGV2ZW50TmFtZSwgJ29uJyk7XG4gICAgICAgIHRoaXNbZXZlbnROYW1lXS5hcHBseSh0aGlzLCBbZGF0YV0pO1xuICAgIH1cblxufVxuXG53aW5kb3cuU29ja2V0NjkgPSBTb2NrZXQ2OTtcblxuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbXSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICd1c2Ugc3RyaWN0JztcbiAgICAgICAgcmV0dXJuIFNvY2tldDY5O1xuICAgIH0pO1xufSIsImZ1bmN0aW9uIG5vb3AoKSB7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbm9vcDsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHVjZmlyc3Qoc3RyaW5nLCBwcmVmaXggPSAnJykge1xuICAgIHJldHVybiBwcmVmaXggKyBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc3Vic3RyKDEpO1xufTsiXX0=