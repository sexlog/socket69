import {Provider} from './provider';

export class Socket69 {

    constructor(provider, options) {

        /**
         *
         * @type {Provider}
         * @private
         */
        this._provider = new Provider(provider, options);
    }

    connect() {

    }
}

window.Socket69 = Socket69;

if (typeof define === 'function' && define.amd) {
    define([], function() {
        return Socket69;
    });
}