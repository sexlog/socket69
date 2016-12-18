export class Adapter {

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
}