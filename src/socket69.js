import {Provider} from './provider';
import {noop} from './util/noop';
import {ucfirst} from './util/ucfirst';

export class Socket69 {

    /**
     *
     * @param provider
     * @param options
     */
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
    connect(options = {}) {
        return this._provider.connect(options);
    }

    /**
     *
     * @param channel
     * @param callback
     */
    subscribe(channel, callback){

        if(!channel){
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
    publish(channel, data){
        this._provider.publish(channel, data);
    }

    /**
     *
     * @param eventName
     * @param data
     */
    on(eventName, data) {
        eventName = ucfirst(eventName, 'on');
        this[eventName].apply(this, [data]);
    }

}

window.Socket69 = Socket69;

if (typeof define === 'function' && define.amd) {
    define([], function() {
        'use strict';
        return Socket69;
    });
}