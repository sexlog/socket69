import {Provider} from './provider';
import {noop} from './util/noop';
import {ucfirst} from './util/ucfirst';

export class Socket69 {

    constructor(provider, options) {

        /**
         *
         * @type {Provider}
         * @private
         */
        this._provider = new Provider(provider, options);

        this._provider.on = (eventName, data) => {
            this.on(eventName, data);
        };

        /**
         *
         * @type {null}
         */
        this.onConnect = noop;
    }

    connect(options = {}) {
        return this._provider.connect(options);
    }

    on(eventName, data) {
        eventName = ucfirst(eventName, 'on');
        this[eventName].apply(this, [data]);
    }
}

window.Socket69 = Socket69;

if (typeof define === 'function' && define.amd) {
    define([], function() {
        return Socket69;
    });
}