$( document ).ready(function() {
  addEffect($('#mainEffectGroup'), false, 'mainEffect');
  $('#addSecondaryEffect').click(function(event) {
    addEffect($('#secondaryEffectGroup'), true);
  });
  $('#addDisadvantage').click(function(event) {
    addDisadvantage($('#disadvantageGroup'))
  })
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
  effectContainer.find('.effectSelector').change(function(event) {
    if ($(this).val() in KiTechnique.Data.Effects) {
      var data = {'key': $(this).val(), 'data': KiTechnique.Data.Effects[$(this).val()]};
      effectContainer.find('.effectInfo').html(Mustache.render(Template.effectInfo, data));
    } else {
      effectContainer.find('.effectInfo').empty();
    }
  })
}

function addEffectOptions(select) {
  select.append(Mustache.render(Template.selectOption, {
    'value': "",
    'name': ""
  }));
  for (let i in KiTechnique.Data.Effects) {
    select.append(Mustache.render(Template.selectOption, {
      'value': i,
      'name': KiTechnique.Data.Effects[i].name
    }));
  }
}

function addDisadvantage(parent) {
  var disadvantageContainer = $(Mustache.render(Template.disadvantage).replace(/\r?\n|\r/g,''));
  parent.append(disadvantageContainer);
  addDisadvantageOptions(disadvantageContainer.find('.disadvantageSelector'));
  disadvantageContainer.find('.removeDisadvantage').click(function(event) {
    disadvantageContainer.remove();
  });
}

function addDisadvantageOptions(select) {
  select.append(Mustache.render(Template.selectOption, {
    'value': "",
    'name': ""
  }));
  for (let i in KiTechnique.Data.Disadvantages) {
    select.append(Mustache.render(Template.selectOption, {
      'value': i,
      'name': KiTechnique.Data.Disadvantages[i].name
    }));
  }
}