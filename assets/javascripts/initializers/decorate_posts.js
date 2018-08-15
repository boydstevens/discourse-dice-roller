api.decorateWidget('post:after', helper => {
   return helper.h('p.fancy', `I'm an HTML paragraph on post with id ${helper.attrs.id}`);
});