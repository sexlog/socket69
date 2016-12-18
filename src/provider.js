import {SocketClusterAdapter} from './adapters/socket-cluster';

export class Provider {

    /**
     *
     * @param name
     * @param options
     */
    constructor(name, options) {

        /**
         *
         * @type {{socket-cluster: SocketClusterAdapter}}
         */
        const list = {
            'socket-cluster': SocketClusterAdapter
        };

        return new list[name](options);
    }
}