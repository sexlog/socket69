import {Adapter} from './adapter';
import {Promise} from 'es6-promise';

export class SocketClusterAdapter extends Adapter {

    constructor(options) {

        if(!window.socketCluster) {
            throw new ReferenceError('SocketCluster not found');
        }

        let config = {
            protocol: 'http',
            port: '80',
            host: 'localhost'
        };

        super(config, options);
    }

    connect(options) {

        // TODO: Validar se parâmetros obrigatórios foram recebidos
        console.log(this.config);
    }

}