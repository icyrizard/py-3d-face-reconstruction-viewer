import Ember from 'ember';
import ENV from 'viewer/config/environment';

const { get, inject } = Ember;

export default Ember.Controller.extend({
    websockets: inject.service(),

    title: 'title',
    faces: null,
    image: null,

    image_index: 0,
    background_image: true,
    shape_components: 58,
    n_images: null,
    reconstructed: null,
    shape_eigenvalues: [],

    socketRef: null,

    init() {
        const socket = get(this, 'websockets').socketFor(ENV.APP.websocketsURL);

        socket.on('open', this.openHandler, this);
        socket.on('message', this.messageHandler, this);
        socket.on('close', this.closeHandler, this);

        this.set('socketRef', socket);
        this.initShapeEigenValues(15);
    },

    initShapeEigenValues(amountOfEigenValues) {
        var shapeEigenValues = this.get('shape_eigenvalues');

        shapeEigenValues.length = amountOfEigenValues;
        shapeEigenValues.fill(1.0);

        this.set('shape_eigenvalues', shapeEigenValues);
    },

    willDestroyElement() {
        const socket = this.get('socketRef');

        /*
        * Remove all of the listeners you have setup.
        */
        socket.off('open', this.openHandler);
        socket.off('message', this.messageHandler);
        socket.off('close', this.closeHandler);

        console.log('Websockets: Removed all handlers');
    },

    openHandler(event) {
        console.log(`On open event has been called: ${event}`);

        // get the reconstruction right after the socket opened
        this.send('getReconstruction');
    },

    messageHandler(event) {
        var message = JSON.parse(event.data);

        if (message.n_images) {
            this.set('n_images', message.n_images);
        }

        if (message.reconstructed) {
            this.set('reconstructed', message.reconstructed);
        }

        if (message.error) {
            console.log(message.error);
        }

        this.set('loading', false);
    },

    getReconstruction: Ember.observer(
            'image_index', 'background_image',
            'shape_components', 'shape_eigenvalues', function() {
        this.send('getReconstruction');
    }),

    closeHandler(event) {
        console.log(`On close event has been called: ${event}`);
    },

    actions: {
        getImage(faceModel) {
            this.set('loading', true);
            var filename = faceModel.get('filename');

            const socket = this.get('socketRef');

            socket.send(
                JSON.stringify({filename: filename})
            );
        },

        getReconstruction() {
            this.set('loading', true);
            const socket = this.get('socketRef');
            console.log(this.get('current_face_base64'));

            socket.send(
                JSON.stringify({
                    reconstruction: {
                        reconstruction_index: this.get('image_index'),
                        background_image: this.get('background_image'),
                        shape_components: this.get('shape_components'),
                        shape_eigenvalues: this.get('shape_eigenvalues')
                    }
                })
            );
        },

        // connects components together
        // handles the upate action passed to a component
        updateIndexComponentConnector(index) {
            this.set('image_index', index);
        },

        updateBackgroundComponentConnector(showBackground) {
            this.set('background_image', showBackground);
        },

        updateShapeComponents(components) {
            console.log('shape_components', components);
            this.set('shape_components', components);
        },

        updateShapeEigenValues(eigenValueIndex, value) {
            console.log('shape_eigenvalues', value);
            var eigenValues = this.get('shape_eigenvalues');
            eigenValues[eigenValueIndex] = value;

            this.set('shape_eigenvalues', eigenValues);
            this.send('getReconstruction');
        },

        resetShapeEigenValues(/*gui*/) {
            this.initShapeEigenValues(15);
        }
    }
});
