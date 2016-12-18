export class Adapter {

    constructor(config, options) {

        /**
         * Configurações de conexão
         * @type {*}
         */
        this.config = Object.assign({}, config, options);

        /**
         * Instância do socket da library do adapter
         * @type {null}
         */
        this.socket = null;
    }

    connect() {

    }

    disconnect() {

    }

    subscribe() {

    }

}