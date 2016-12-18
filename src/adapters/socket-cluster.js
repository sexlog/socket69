const Adapter = require('./adapter');

class SocketClusterAdapter extends Adapter {

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

        this.addListeners();
    }

    /**
     *
     * @param channel
     * @param callback
     */
    subscribe(channel, callback) {
        this.socket.subscribe(channel);
        this.socket.watch(channel, callback);
    }

    /**
     *
     * @param channel
     * @param data
     */
    publish(channel, data) {
        this.socket.publish(channel, data);
    }
}

module.exports = SocketClusterAdapter;