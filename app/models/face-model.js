import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
    type: attr('string'),
    maxComponents: attr('int'),
    nEigenvalues: attr('int'),
    faces: hasMany('face')
});
