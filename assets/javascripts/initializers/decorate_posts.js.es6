import { withPluginApi } from 'discourse/lib/plugin-api'


function decoratePost(elem){
	elem.css({ backgroundColor: 'yellow' });
}

function initializePlugin(api) {
	/*can display "You rolled a 6" instead of "Arkaal rolled a 6" for logged in user*/
	var username = 'You'; //getCurrentUser();

    api.decorateCooked(decoratePost, {onlyStream:true});
	
	api.decorateWidget('post-contents:after-cooked', helper => {
		let username = 'You'; //getCurrentUser();
		let postId = helper.getModel().id;		
		let roll = ((postId * postId) % 10) + 1;
		
		return helper.h('p.fancy', `${username} rolled a ${roll} (1d10).`);
	});
}

export default {
  name: 'dice-section',
  initialize: function() {
    withPluginApi('0.8.6', api => initializePlugin(api))
  }
}