import JSONAPIAdapter from 'ember-data/adapters/json-api';

export default JSONAPIAdapter.extend({
    host: 'http://localhost:8888',
    namespace: 'api/v1'
});
