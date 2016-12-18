import {Adapter} from './adapter';
// import {Promise} from 'es6-promise';

export class SocketClusterAdapter extends Adapter {

    /**
     *
     * @param config
     */
    constructor(config) {

        // SocketCluster is required
        if (!window.socketCluster) {
            throw new ReferenceError('SocketCluster not found');
        }

        super(config);

        this.requiredOptions = ['hostname', 'port'];
    }

    /**
     *
     * @param options
     */
    connect(options) {

        options = Object.assign({}, this.config, options);

        super.connect(options);

        this.socket = window.socketCluster.connect(options);

        return new Promise(resolve => {
            this.socket.on('connect', (data) => {
                resolve(data);
            });
        });
    }
}