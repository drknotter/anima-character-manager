$( document ).ready(function() {
  addEffect($('#mainEffectGroup'), true, 'mainEffect');
  $('#addSecondaryEffect').click(function(event) {
    addEffect($('#secondaryEffectGroup'), false);
  });
  $('#addDisadvantage').click(function(event) {
    addDisadvantage($('#disadvantageGroup'))
  })
});

function addEffect(parent, isPrimary, id) {
  var effectContainer = $(Mustache.render(Template.effect, {
    'id': id, 
    'removeable': !isPrimary
  }).replace(/\r?\n|\r/g,''));
  parent.append(effectContainer);
  addEffectOptions(effectContainer.find('.effectSelector'));
  effectContainer.find('.removeEffect').click(function(event) {
    effectContainer.remove();
  });
  effectContainer.find('.effectSelector').change(function(event) {
    if ($(this).val() in KiTechnique.Data.Effects) {
      setEffectInfo($(this).val(), isPrimary, effectContainer.find('.effectInfo'));
    } else {
      effectContainer.find('.effectInfo').empty();
    }
  });
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

function setEffectInfo(key, isPrimary, infoContainer) {
  let guidKey = guid();
  var data = {'key': key, 'guid': guidKey, 'isPrimary': isPrimary, 'data': KiTechnique.Data.Effects[key]};
  infoContainer.html(Mustache.render(Template.effectInfo, data));
  infoContainer.find('input[name="'+key+'|'+guidKey+'"]').change(function(event) {
    console.log($(this).closest('.effectLevel').index());
  });
  for (let i in Characteristic.Data) {
    var headerText = Characteristic.Data[i].nickname;
    var enabled = false;
    if (KiTechnique.Data.Effects[key].primaryCharacteristic === i) {
      headerText += " (P)"
      enabled = true;
    }
    if (i in KiTechnique.Data.Effects[key].optionalCharacteristics) {
      headerText += " (+" + KiTechnique.Data.Effects[key].optionalCharacteristics[i] + ")";
      enabled = true;
    }
    infoContainer.find('.'+i+'Header').html(headerText);
    if (!enabled) {
      infoContainer.find('.'+i+'Input input').attr('disabled', true);
      infoContainer.find('.'+i+'Header').addClass('disabled');
    }
  }
  if (KiTechnique.Data.Effects[key].advantages) {
    infoContainer.find('.addAdvantage').click(function(event) {
      addAdvantage(key, infoContainer.find('.advantagesContainer'))
    });
  }
}

function addAdvantage(key, parent) {
  var advantageContainer = $(Mustache.render(Template.advantage).replace(/\r?\n|\r/g,''));
  parent.append(advantageContainer);
  addAdvantageOptions(key, advantageContainer.find('.advantageSelector'));
  advantageContainer.find('.removeAdvantage').click(function(event) {
    advantageContainer.remove();
  });
  advantageContainer.find('.advantageSelector').change(function(event) {
    if ($(this).val() in KiTechnique.Data.Effects[key].advantages) {
      setAdvantageInfo(key, $(this).val(), advantageContainer.find('.advantageInfo'));
    } else {
      advantageContainer.find('.advantageInfo').empty();
    }
  });
}

function addAdvantageOptions(key, select) {
  select.append(Mustache.render(Template.selectOption, {
    'value': "",
    'name': ""
  }));
  for (let i in KiTechnique.Data.Effects[key].advantages) {
    select.append(Mustache.render(Template.selectOption, {
      'value': i,
      'name': KiTechnique.Data.Effects[key].advantages[i].name
    }));
  }
}

function setAdvantageInfo(effectKey, advantageKey, infoContainer) {
  infoContainer.html(Mustache.render(Template.advantageInfo, KiTechnique.Data.Effects[effectKey].advantages[advantageKey]));
  let guidKey = guid();
  for (let i in KiTechnique.Data.Effects[effectKey].advantages[advantageKey].options) {
    infoContainer.find('.advantageOptions').append(Mustache.render(Template.advantageOption, {
      'effectKey': effectKey,
      'advantageKey': advantageKey,
      'guid': guidKey,
      'data': KiTechnique.Data.Effects[effectKey].advantages[advantageKey].options[i]
    }));
  }
  infoContainer.find('input[name="' + effectKey + '|' + advantageKey + '|' + guidKey + '"]').change(function(event) {
    console.log($(this).closest('.advantageOption').index());
  });
}


function addDisadvantage(parent) {
  var disadvantageContainer = $(Mustache.render(Template.disadvantage).replace(/\r?\n|\r/g,''));
  parent.append(disadvantageContainer);
  addDisadvantageOptions(disadvantageContainer.find('.disadvantageSelector'));
  disadvantageContainer.find('.removeDisadvantage').click(function(event) {
    disadvantageContainer.remove();
  });
  disadvantageContainer.find('.disadvantageSelector').change(function(event) {
    if ($(this).val() in KiTechnique.Data.Disadvantages) {
      setDisadvantageInfo($(this).val(), disadvantageContainer.find('.disadvantageInfo'));
    } else {
      disadvantageContainer.find('.disadvantageInfo').empty();
    }
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

function setDisadvantageInfo(disadvantageKey, infoContainer) {
  infoContainer.html(Mustache.render(Template.disadvantageInfo, KiTechnique.Data.Disadvantages[disadvantageKey]));
  let guidKey = guid();
  for (let i in KiTechnique.Data.Disadvantages[disadvantageKey].options) {
    infoContainer.find('.disadvantageOptions').append(Mustache.render(Template.disadvantageOption, {
      'disadvantageKey': disadvantageKey,
      'guid': guidKey,
      'data': KiTechnique.Data.Disadvantages[disadvantageKey].options[i]
    }));
  }
  infoContainer.find('input[name="' + disadvantageKey + '|' + guidKey + '"]').change(function(event) {
    console.log($(this).closest('.disadvantageOption').index());
  });
}
