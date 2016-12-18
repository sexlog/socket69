import {Provider} from './provider';

export class Socket69 {

    constructor(provider, options) {

        /**
         *
         * @type {*}
         */
        this.provider = new Provider(provider, options);

    }

    connect() {

    }

    static providerList() {
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
    static getProvider(provider, options) {
        return new Socket69.providerList[provider](options);
    }
}

window.Socket69 = Socket69;

if (typeof define === 'function' && define.amd) {
    define([], function() {
        return Socket69;
    });
}