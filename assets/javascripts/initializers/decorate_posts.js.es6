import { withPluginApi } from 'discourse/lib/plugin-api'

function initializePlugin(api) {
	/*can display "You rolled a 6" instead of "Arkaal rolled a 6" for logged in user*/
	var username = 'You'; //getCurrentUser();

    api.decorateWidget('post-menu-area:before', helper => {
		var roll = ((helper.attrs.i * helper.attrs.i) % 10) + 1;
		return helper.h('p.fancy', `${username} rolled a ${roll} (1d10).`);
    });
}

export default {
  name: 'dice-section',
  initialize: function() {
    withPluginApi('0.8.6', api => initializePlugin(api))
  }
}