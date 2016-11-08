import Ember from 'ember';
import ENV from 'viewer/config/environment';

const ImageLoaderComponent = Ember.Component.extend({
    store: Ember.inject.service(),
    current_face: null,

    imageIndexChanged: Ember.observer('image_index', function() { 
        this.send('updateCurrentFace');
    }),

    loadFaces: Ember.on('didInsertElement', function() {
        this.get('store').findAll('face').then((faces) => {
            this.set('faces', faces);
            this.send('updateCurrentFace');
        });
    }),

    faces: Ember.computed('params.[]', function(){
        return this.get('params')[1];
    }),

    convertFilenameToBase64: function(fileUrl, resolve) {
        var image = new Image();
        image.crossOrigin = 'Anonymous';

        image.onload = function() {
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL('image/jpeg');
            console.log(dataUrl);
            resolve(dataURL);
            canvas = null;
        };

        image.src = fileUrl;
    },

    actions: {
        /**
        * Update the current face given the current index
        */
        updateCurrentFace() {
            var face = this.get('faces').objectAt(this.get('image_index'));
            var filename = face.get('filename');
            //var that = this;

            //var requestConversion = new Ember.RSVP.Promise(function(resolve, reject) {
            //     that.convertFilenameToBase64(filename, resolve);
            //});

            //requestConversion.then((base64Image) => {
            this.set('current_face', face);
            //this.set('current_face_base64', base64Image);
            this.set('current_face_filename', ENV.APP.staticURL + filename);
        }
    }
});

ImageLoaderComponent.reopenClass({
    positionalParams: ['params']
});

export default ImageLoaderComponent;
