import { withPluginApi } from 'discourse/lib/plugin-api'

function initializePlugin(api) {
	/*getCurrentUser() - can display "You rolled a 6" instead of "Arkaal rolled a 6" for logged in user*/

    api.decorateWidget('post:after', helper => {
	   return helper.h('p.fancy', `I rolled a ${helper.attrs.id} (4D6 - 4).`);
	});
}

export default {
  name: 'retort-button',
  initialize: function() {
    withPluginApi('0.8.6', api => initializePlugin(api))
  }
}