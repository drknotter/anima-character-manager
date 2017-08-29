$( document ).ready(function() {
  addEffect($('#mainEffectGroup'), false, 'mainEffect');
  $('#addSecondaryEffect').click(function(event) {
    addEffect($('#secondaryEffectGroup'), true);
  });
});

function addEffect(parent, removeable, id) {
  var effectContainer = $(Mustache.render(Template.effect, {
    'id': id, 
    'removeable': removeable
  }).replace(/\r?\n|\r/g,''));
  parent.append(effectContainer);
  addEffectOptions(effectContainer.find('.effectSelector'));
  effectContainer.find('.removeEffect').click(function(event) {
    effectContainer.remove();
  });
}

function addEffectOptions(select) {
  select.append(Mustache.render(Template.effectOption, {
    'key': "",
    'name': ""
  }));
  for (let i in KiTechnique.Data.Effects) {
    select.append(Mustache.render(Template.effectOption, {
      'key': i,
      'name': KiTechnique.Data.Effects[i].name
    }));
  }
}