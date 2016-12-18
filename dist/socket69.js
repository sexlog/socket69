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
         * @type {*}
         */
        this.provider = new _provider.Provider(provider, options);
    }

    _createClass(Socket69, [{
        key: 'connect',
        value: function connect() {}
    }], [{
        key: 'providerList',
        value: function providerList() {
            return {
                'socket-cluster': SocketClusterAdapter
            };
        }

        /**
         *
         * @param provider
         * @param options
         * @returns {*}
         */

    }, {
        key: 'getProvider',
        value: function getProvider(provider, options) {
            return new Socket69.providerList[provider](options);
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

},{"./provider":2}]},{},[3])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWRhcHRlcnMvc29ja2V0LWNsdXN0ZXIuanMiLCJzcmMvcHJvdmlkZXIuanMiLCJzcmMvc29ja2V0NjkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztJQ0FhLG9CLFdBQUEsb0IsR0FFVCxnQ0FBYztBQUFBOztBQUNWLFNBQUssTUFBTCxHQUFjO0FBQ1Ysa0JBQVUsTUFEQTtBQUVWLGNBQU0sSUFGSTtBQUdWLGNBQU07QUFISSxLQUFkO0FBS0gsQzs7Ozs7Ozs7OztBQ1JMOzs7O0lBRWEsUTs7QUFFVDs7Ozs7UUFGUyxRLEdBT1Qsa0JBQVksSUFBWixFQUFrQixPQUFsQixFQUEyQjtBQUFBOztBQUV2Qjs7OztBQUlBLFFBQU0sT0FBTztBQUNUO0FBRFMsS0FBYjs7QUFJQSxXQUFPLElBQUksS0FBSyxJQUFMLENBQUosQ0FBZSxPQUFmLENBQVA7QUFDSCxDOzs7Ozs7Ozs7Ozs7QUNwQkw7Ozs7SUFFYSxRLFdBQUEsUTtBQUVULHNCQUFZLFFBQVosRUFBc0IsT0FBdEIsRUFBK0I7QUFBQTs7QUFFM0I7Ozs7QUFJQSxhQUFLLFFBQUwsR0FBZ0IsdUJBQWEsUUFBYixFQUF1QixPQUF2QixDQUFoQjtBQUVIOzs7O2tDQUVTLENBRVQ7Ozt1Q0FFcUI7QUFDbEIsbUJBQU87QUFDSCxrQ0FBa0I7QUFEZixhQUFQO0FBR0g7O0FBRUQ7Ozs7Ozs7OztvQ0FNbUIsUSxFQUFVLE8sRUFBUztBQUNsQyxtQkFBTyxJQUFJLFNBQVMsWUFBVCxDQUFzQixRQUF0QixDQUFKLENBQW9DLE9BQXBDLENBQVA7QUFDSDs7Ozs7O0FBR0wsT0FBTyxRQUFQLEdBQWtCLFFBQWxCOztBQUVBLElBQUksT0FBTyxNQUFQLEtBQWtCLFVBQWxCLElBQWdDLE9BQU8sR0FBM0MsRUFBZ0Q7QUFDNUMsV0FBTyxFQUFQLEVBQVcsWUFBVztBQUNsQixlQUFPLFFBQVA7QUFDSCxLQUZEO0FBR0giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGNsYXNzIFNvY2tldENsdXN0ZXJBZGFwdGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgICAgICAgIHByb3RvY29sOiAnaHR0cCcsXG4gICAgICAgICAgICBwb3J0OiAnODAnLFxuICAgICAgICAgICAgaG9zdDogJ2xvY2FsaG9zdCdcbiAgICAgICAgfTtcbiAgICB9XG5cbn0iLCJpbXBvcnQge1NvY2tldENsdXN0ZXJBZGFwdGVyfSBmcm9tICcuL2FkYXB0ZXJzL3NvY2tldC1jbHVzdGVyJztcblxuZXhwb3J0IGNsYXNzIFByb3ZpZGVyIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG9wdGlvbnMpIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge3tzb2NrZXQtY2x1c3RlcjogU29ja2V0Q2x1c3RlckFkYXB0ZXJ9fVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgbGlzdCA9IHtcbiAgICAgICAgICAgICdzb2NrZXQtY2x1c3Rlcic6IFNvY2tldENsdXN0ZXJBZGFwdGVyXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5ldyBsaXN0W25hbWVdKG9wdGlvbnMpO1xuICAgIH1cbn0iLCJpbXBvcnQge1Byb3ZpZGVyfSBmcm9tICcuL3Byb3ZpZGVyJztcblxuZXhwb3J0IGNsYXNzIFNvY2tldDY5IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3ZpZGVyLCBvcHRpb25zKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHsqfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wcm92aWRlciA9IG5ldyBQcm92aWRlcihwcm92aWRlciwgb3B0aW9ucyk7XG5cbiAgICB9XG5cbiAgICBjb25uZWN0KCkge1xuXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3ZpZGVyTGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdzb2NrZXQtY2x1c3Rlcic6IFNvY2tldENsdXN0ZXJBZGFwdGVyXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvdmlkZXJcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRQcm92aWRlcihwcm92aWRlciwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IFNvY2tldDY5LnByb3ZpZGVyTGlzdFtwcm92aWRlcl0ob3B0aW9ucyk7XG4gICAgfVxufVxuXG53aW5kb3cuU29ja2V0NjkgPSBTb2NrZXQ2OTtcblxuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbXSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBTb2NrZXQ2OTtcbiAgICB9KTtcbn0iXX0=