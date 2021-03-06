const noop    = require('../util/noop'),
      ucfirst = require('../util/ucfirst');

class Adapter {

    constructor(config) {

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
        this.events = [
            'error',
            'connect',
            'disconnect',
            'subscribe'
        ];
    }

    connect(options) {
        this.requiredOptions.forEach(option => {
            if (!options[option]) {
                throw new Error(`Required parameter "${option}" not found`);
            }
        });
    }

    disconnect() {
    }

    subscribe() {
    }

    publish() {
    }

    addListeners() {
        this.events.forEach(event => {
            this.socket.on(event, (data) => {
                event = ucfirst(event, 'on');
                this[event].apply(this, [data]);
            });
        });
    }

    onError(data) {
        this.on('error', data);
    }

    onConnect(data) {
        this.on('connect', data);
    }

    onDisconnect(data) {
        this.on('disconnect', data);
    }

    onSubscribe(data) {
        this.on('subscribe', data);
    }
}

module.exports = Adapter;