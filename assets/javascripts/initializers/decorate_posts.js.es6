import { withPluginApi } from 'discourse/lib/plugin-api'

function initializePlugin(api) {
	/*can display "You rolled a 6" instead of "Arkaal rolled a 6" for logged in user*/
	var username = 'You'; //getCurrentUser();

    api.decorateCooked($elem => $elem.css({ backgroundColor: 'yellow' }));
}

export default {
  name: 'dice-section',
  initialize: function() {
    withPluginApi('0.8.6', api => initializePlugin(api))
  }
}