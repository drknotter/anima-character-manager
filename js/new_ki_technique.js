$( document ).ready(function() {
  addEffect($('#mainEffectGroup'), true, 'mainEffect');
  $('#addSecondaryEffect').click(function(event) {
    addEffect($('#secondaryEffectGroup'), false);
  });
  $('#addDisadvantage').click(function(event) {
    addDisadvantage($('#disadvantageGroup'))
  });
  $('#addKiTechnique').click(function(event) {
    addKiTechnique();
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
    let advantageOptionContainer = $(Mustache.render(Template.advantageOption, {
      'effectKey': effectKey,
      'advantageKey': advantageKey,
      'guid': guidKey,
      'data': KiTechnique.Data.Effects[effectKey].advantages[advantageKey].options[i]
    }).replace(/\r?\n|\r/g,''));
    advantageOptionContainer.data('advantageOptionKey', i);
    infoContainer.find('.advantageOptions').append(advantageOptionContainer);
  }
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
    let disadvantageContainer = $(Mustache.render(Template.disadvantageOption, {
      'disadvantageKey': disadvantageKey,
      'guid': guidKey,
      'data': KiTechnique.Data.Disadvantages[disadvantageKey].options[i]
    }).replace(/\r?\n|\r/g,''));
    disadvantageContainer.data('disadvantageOptionKey', i);
    infoContainer.find('.disadvantageOptions').append(disadvantageContainer);
  }
}

function addKiTechnique() {
  var character = new Character(JSON.parse(localStorage['character.'+getParameterByName('n')]));
  var data = {};

  data.name = $('#newKiTechniqueName').val();
  data.description = $('#newKiTechniqueDescription').val();
  data.level = Number($('#newKiTechniqueLevel').val());
  data.maintain = $('#maintainable').is(':checked');

  data.effects = [];
  var effectContainers = $('.effectContainer');
  for (let i=0; i<effectContainers.length; i++) {
    let effectContainer = $(effectContainers[i]);
    let effectData = {};
    
    effectData.key = effectContainer.find('.effectSelector').val();
    if (effectData.key.length == 0) {
      continue;
    }

    let index = effectContainer.find('.effectLevels').find('.effectLevel input:checked').closest('.effectLevel').index();
    if (index >= 1) {
      effectData.level = index - 1;
    }
    effectData.distribution = {};
    for (let j in Characteristic.Data) {
      let points = effectContainer.find('.pointsDistributionContainer .' + j + 'Input input').val();
      if (points.length > 0) {
        effectData.distribution[j] = Number(points);
      }
    }

    let advantageContainers = effectContainer.find('.advantageContainer');
    if (advantageContainers.length > 0) {
      effectData.advantages = [];
    }
    for (let j=0; j<advantageContainers.length; j++) {
      let advantageContainer = $(advantageContainers[j]);
      let advantageKey = advantageContainer.find('.advantageSelector').val();
      if (advantageKey.length == 0) {
        continue;
      }
      let advantageOptionContainer = advantageContainer.find('.advantageOptions .advantageOption input:checked').closest('.advantageOption');
      if (advantageOptionContainer.length != 1) {
        continue;
      }

      effectData.advantages.push({'key': advantageKey, 'option': advantageOptionContainer.data('advantageOptionKey')});
    }

    data.effects.push(effectData);
  }

  var disadvantageContainers = $('.disadvantageContainer');
  if (disadvantageContainers.length > 0) {
    data.disadvantages = [];
  }
  for (var i=0; i<disadvantageContainers.length; i++) {
    let disadvantageContainer = $(disadvantageContainers[i]);
    let disadvantageKey = disadvantageContainer.find('.disadvantageSelector').val();
    if (disadvantageKey.length == 0) {
      continue;
    }
    let disadvantageOptionContainer = disadvantageContainer.find('.disadvantageOptions .disadvantageOption input:checked').closest('.disadvantageOption');
    if (disadvantageOptionContainer.length != 1) {
      continue;
    }

    data.disadvantages.push({'key': disadvantageKey, 'option': disadvantageOptionContainer.data('disadvantageOptionKey')});
  }

  console.log(data);
  try {
    var kiTechnique = new KiTechnique(character, data);
    if (confirm("Everything looks good! Add to Ki Techniques?")) {
      character.kiTechniques[guid()] = kiTechnique;
      localStorage['character.'+character.name] = JSON.stringify(character);
      window.open("spend.html?n=" + character.name, "_self");
    }
  } catch(err) {
    console.log(err);
    alert(err.message);
  }
}