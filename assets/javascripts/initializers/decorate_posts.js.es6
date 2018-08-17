import { withPluginApi } from 'discourse/lib/plugin-api'


function initializePlugin(api) {
	
	api.decorateWidget('post-contents:after-cooked', helper => {
		let username = 'You'; //getCurrentUser();
		let postId = helper.getModel().id;		
		let roll = ((postId * postId) % 10) + 1;
		let roll2 = (((postId + 3) * postId) % 10) + 1;
		let rolltwice = (postId % 3);
		
		let display = helper.h('p.roll', `On post #${postId}, ${username} rolled a ${roll} (1d10).`);
		if (rolltwice == 0){
			display = [display, helper.h('p.roll', `On post #${postId}, ${username} rolled a ${roll2} (1d10).`)];
		}
		
		return helper.h('div.dierolls', display);
	});
	
	  api.addToolbarPopupMenuOptionsCallback(() => {
		return {
		  action: 'insertDieRoll',
		  icon: 'black-tie',
		  label: 'rolldie.title'
		};
	  });

	  api.modifyClass("controller:composer", {
		actions: {
		  insertDieRoll() {
				//this.get("toolbarEvent").addText("[[Dice||<descriptive text>||<dice to roll>]]");		
				this.get("toolbarEvent").applySurround(
						  "[[Dice||",
						  "||<dice to roll>]]",
						  "rolltext");				
		  }
		}
	  });
}

export default {
  name: 'dice-section',
  initialize: function() {
    withPluginApi('0.8.6', api => initializePlugin(api))
  }
}