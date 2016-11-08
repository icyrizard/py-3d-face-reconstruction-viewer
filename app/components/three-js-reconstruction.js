import Ember from 'ember';
import THREE from 'npm:three';
import dat from 'npm:dat-gui';


const ThreeComponent = Ember.Component.extend({
    store: Ember.inject.service(),
    scene: null,

    willRender() {
        if (this.scene) {
            return;
        }

        var scene = new THREE.Scene();
        var gui = new dat.GUI();
        var camera = new THREE.PerspectiveCamera(
            75, window.innerWidth / window.innerHeight, 0.1, 1000
        );

        scene.add(camera);

        var renderer = new THREE.WebGLRenderer();

        this.set('scene', scene);
        this.set('camera', camera);
        this.set('renderer', renderer);
        this.set('gui', gui);

        this.get('store').findAll('face').then((faces) => {
            this.set('faces', faces);
            this.addSliders();
        });
    },

    /**
     * Wait for elements to be inserted, else we can not find
     * the threejs container.
     * TODO: try to not use appendChild
     */
    loadGui: Ember.computed('faces', function() {
        //var container = document.getElementById('threejs-container');
        //container.appendChild(this.get('renderer').domElement);

    }),

    /**
     * Adds the 'dat-gui' sliders
     *
     * See:
     * http://learningthreejs.com/blog/2011/08/14/dat-gui-simple-ui-for-demos/
     */
    addSliders() {
        var self = this;
        var gui = this.get('gui');

        // the sidebar 'dat-gui' controls
        var reconstructionControls = {
            index: 0,
            shape_components: 58,
            background_image: true
        };

        var length = this.get('faces').get('length');

        var index = gui.add(reconstructionControls, 'index', 0, length - 1);
        var shapeComponents = gui.add(reconstructionControls, 'shape_components', 0, 58);
        var background = gui.add(reconstructionControls, 'background_image');

        // on index change
        index.onChange(function(newValue) {
            // update the image_index, which is on the controller
            self.set('image_index', parseInt(newValue));
            self.sendAction('updateIndex', parseInt(newValue));
        });

        background.onChange(function(newValue) {
            self.sendAction('updateBackground', newValue);
        });

        shapeComponents.onChange(function(newValue) {
            self.sendAction('updateShapeComponents', newValue);
        });

        var shapeEigenValueControls = gui.addFolder('shape_eigen_values');

        /**
        * ShapeSlider callback function
        */
        var handleShapeSlidersCb = function(value) {
            var sliderObject = this;

            // slider index is the last character of the slider property string.
            var sliderCharacterIndex = sliderObject.property.length - 1;
            var sliderIndex = parseInt(sliderObject.property[sliderCharacterIndex]);

            self.sendAction('updateShapeEigenValues', sliderIndex, value);
        };

        var shapeEigenValues = this.get('shape_eigenvalues');

        shapeEigenValues.forEach(function(value, index) {
            reconstructionControls['shape_eigen_value_' + index] = value;
            var slider = shapeEigenValueControls.add(reconstructionControls, 'shape_eigen_value_' + index, 0.0, 10.0);

            slider.onChange(handleShapeSlidersCb);
        });

        console.log(gui.__controllers);
    }
});

export default ThreeComponent;
