api.decorateWidget('post:after', helper => {
   return helper.h('p.fancy', `I rolled a ${helper.attrs.id} (4D6 - 4).`);
});