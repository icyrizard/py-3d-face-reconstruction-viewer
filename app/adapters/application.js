import JSONAPIAdapter from 'ember-data/adapters/json-api';
import ENV from 'viewer/config/environment';

export default JSONAPIAdapter.extend({
    host: ENV.APP.APIURL,
    namespace: 'api/v1'
});
