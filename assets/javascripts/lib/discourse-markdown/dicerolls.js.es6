import { registerOption } from 'pretty-text/pretty-text';

function DetectDiceRolls (text) {
	/*text.match(/\[\[Dice\|\|([^\|]*)\|\|([^\|]*)\]\]/ig, function (match, g1, g2) {
			alert('You are rolling ' + g2 + ' for ' + g1');
		});*/
  return text;
}

export function setup(helper) {

  helper.addPreProcessor(DetectDiceRolls);

}