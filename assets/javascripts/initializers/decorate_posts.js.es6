import { withPluginApi } from 'discourse/lib/plugin-api'


function initializePlugin(api) {
	
	api.decorateWidget('post-contents:after-cooked', helper => {
		let username = 'You'; //getCurrentUser();
		let postId = helper.getModel().id;		
		let roll = ((postId * postId) % 10) + 1;
		
		return helper.h('p.fancy', `On post #${postId}, ${username} rolled a ${roll} (1d10).`);
	});
}

export default {
  name: 'dice-section',
  initialize: function() {
    withPluginApi('0.8.6', api => initializePlugin(api))
  }
}