import { withPluginApi } from 'discourse/lib/plugin-api'

function initializePlugin(api) {
	/*can display "You rolled a 6" instead of "Arkaal rolled a 6" for logged in user*/
	var username = getCurrentUser();

    api.decorateWidget('post:after', helper => {
		return helper.h('p.fancy', `I'm an HTML paragraph on post with id ${helper.attrs.id}, ${username}`);
    });
}

export default {
  name: 'retort-button',
  initialize: function() {
    withPluginApi('0.8.6', api => initializePlugin(api))
  }
}