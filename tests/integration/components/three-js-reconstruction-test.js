import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('three-js-reconstruction', 'Integration | Component | three js reconstruction', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{three-js-reconstruction}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#three-js-reconstruction}}
      template block text
    {{/three-js-reconstruction}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
