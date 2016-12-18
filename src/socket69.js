import {Provider} from './provider';
import {noop} from './util/noop';

export class Socket69 {

    constructor(provider, options) {

        /**
         *
         * @type {Provider}
         * @private
         */
        this._provider = new Provider(provider, options);

        /**
         *
         * @type {null}
         */
        this.onConnect = noop;
    }

    connect(options = {}) {
        return this._provider.connect(options).then(data => {
            this.onConnect(data);
        })
    }
}

window.Socket69 = Socket69;

if (typeof define === 'function' && define.amd) {
    define([], function() {
        return Socket69;
    });
}