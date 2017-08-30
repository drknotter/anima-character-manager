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
  var data = {'key': key, 'isPrimary': isPrimary, 'data': KiTechnique.Data.Effects[key]};
  infoContainer.html(Mustache.render(Template.effectInfo, data));
  infoContainer.find('input[name='+key+']').change(function(event) {
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
      addAdvantage(infoContainer.find('.advantagesContainer'))
    });
  }
}

function addAdvantage(parent) {
  var advantageContainer = $(Mustache.render(Template.advantage).replace(/\r?\n|\r/g,''));
  parent.append(advantageContainer);
  // addEffectOptions(effectContainer.find('.effectSelector'));
  // effectContainer.find('.removeEffect').click(function(event) {
  //   effectContainer.remove();
  // });
  // effectContainer.find('.effectSelector').change(function(event) {
  //   if ($(this).val() in KiTechnique.Data.Effects) {
  //     setEffectInfo($(this).val(), isPrimary, effectContainer.find('.effectInfo'));
  //   } else {
  //     effectContainer.find('.effectInfo').empty();
  //   }
  // });
}

function addAdvantageOptions(key, select) {

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