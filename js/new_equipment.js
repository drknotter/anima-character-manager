$( document ).ready(function() {
  var character = new Character(JSON.parse(localStorage['character.'+getParameterByName('n')]));
  var oldType = getParameterByName('t');
  var oldKey = getParameterByName('k');

  if (oldType && oldKey) {
    prefill(character, oldType, oldKey);
  }

  $('#newEquipmentType').change(function(event) {
    changeType(this.options[this.options.selectedIndex].value);
  });
  $('#addEquippedBonus').click(function(event) {
    addBonus(character, 'equippedBonuses');
  });
  $('#addPossessionBonus').click(function(event) {
    addBonus(character, 'possessionBonuses');
  });

  $('#addEquipment').click(function(event) {
    var data = {};
    data.name = $('#newEquipmentName').val();
    data.description = $('#newEquipmentDescription').val();

    var gp = Number($('#newEquipmentGp').val());
    var sp = Number($('#newEquipmentSp').val());
    var cp = Number($('#newEquipmentCp').val());
    data.cost = gp + sp * 0.01 + cp * 0.001;

    data.weight = Number($('#newEquipmentWeight').val());
    data.availability = $('#newEquipmentAvailability').val();
    data.fortitude = Number($('#newEquipmentFortitude').val());
    data.presence = Number($('#newEquipmentPresence').val());
    data.qualityBonus = Number($('#newEquipmentQualityBonus').val());

    data.equippedBonuses = [];
    var bonuses = $('#equippedBonusGroup .bonus');
    for (let i=0; i<bonuses.length; i++) {
      let bonusData = {};
      bonusData.bonus = Number($(bonuses[i]).find('input').first().val());
      if (bonusData.bonus && bonusData.bonus != 0) {
        let s = $(bonuses[i]).find('select').first().val();
        bonusData.keyChain = s.split('|');
        data.equippedBonuses.push(bonusData);
      }
    }

    data.possessionBonuses = [];
    bonuses = $('#possessionBonusGroup .bonus');
    for (let i=0; i<bonuses.length; i++) {
      let bonusData = {};
      bonusData.bonus = Number($(bonuses[i]).find('input').first().val());
      if (bonusData.bonus && bonusData.bonus != 0) {
        let s = $(bonuses[i]).find('select').first().val();
        bonusData.keyChain = s.split('|');
        data.possessionBonuses.push(bonusData);
      }
    }

    var type = $('#newEquipmentType').val();
    if (type === "weapons") {
      data.damage = Number($('#damage').val());
      data.speed = Number($('#speed').val());
      data.requiredStrength = Number($('#requiredStrength').val());
      data.primaryAttackType = $('#primaryAttackType').val();
      data.secondaryAttackType = $('#secondaryAttackType').val();
      data.weaponType = $('#weaponType').val();
      data.special = $('#special').val();
      data.twoHanded = $('#twoHanded').val() == 'true';

    } else if (type === "armors") {
      data.armorRequirement = Number($('#armorRequirement').val());
      data.naturalPenalty = Number($('#naturalPenalty').val());
      data.perceptionPenalty = Number($('#perceptionPenalty').val());
      data.movementRestriction = Number($('#movementRestriction').val());

      data.protections = {};
      data.protections.cut = Number($('#cut').val());
      data.protections.impact = Number($('#impact').val());
      data.protections.thrust = Number($('#thrust').val());
      data.protections.heat = Number($('#heat').val());
      data.protections.electricity = Number($('#electricity').val());
      data.protections.cold = Number($('#cold').val());
      data.protections.energy = Number($('#energy').val());
    }

    var key = oldKey ? oldKey : guid();
    try {
      var equipment;
      if (type === "weapons") {
        equipment = new Weapon(data, character, key);
      } else if (type === "armors") {
        equipment = new Armor(data, character, key);
      } else {
        equipment = new Equipment(data, character, key);
      }

      character.equipment[type][key] = equipment;
      localStorage['character.'+character.name] = JSON.stringify(character);
      window.open("manage.html?n=" + character.name, "_self");
    } catch (error) {
      alert(error.message);
    }
  });
});

function prefill(character, type, key) {
  var data = character.equipment[type][key];

  $('#newEquipmentName').val(data.name);
  $('#newEquipmentDescription').val(data.description);

  $('#newEquipmentGp').val(data.costData.gp);
  $('#newEquipmentSp').val(data.costData.sp);
  $('#newEquipmentCp').val(data.costData.cp);

  $('#newEquipmentWeight').val(data.weight);
  $('#newEquipmentAvailability').val(data.availability);
  $('#newEquipmentFortitude').val(data.fortitude);
  $('#newEquipmentPresence').val(data.presence);
  $('#newEquipmentQualityBonus').val(data.qualityBonus);

  for (let i in data.equippedBonuses) {
    addBonus(character, 'equippedBonuses', data.equippedBonuses[i].keyChain, data.equippedBonuses[i].bonus);
  }
  for (let i in data.possessionBonuses) {
    addBonus(character, 'possessionBonuses', data.possessionBonuses[i].keyChain, data.possessionBonuses[i].bonus);
  }

  $('#newEquipmentType').val(type);
  changeType(type);

  if (type === "armors") {
    $('#armorRequirement').val(data.armorRequirement);
    $('#naturalPenalty').val(data.naturalPenalty);
    $('#perceptionPenalty').val(data.perceptionPenalty);
    $('#movementRestriction').val(data.movementRestriction);
    $('#cut').val(data.protections.cut);
    $('#impact').val(data.protections.impact);
    $('#thrust').val(data.protections.thrust);
    $('#heat').val(data.protections.heat);
    $('#electricity').val(data.protections.electricity);
    $('#cold').val(data.protections.cold);
    $('#energy').val(data.protections.energy);
  } else if (type === "weapons") {
    $('#damage').val(data.damage);
    $('#speed').val(data.speed);
    $('#requiredStrength').val(data.requiredStrength);
    $('#primaryAttackType').val(data.primaryAttackType);
    $('#secondaryAttackType').val(data.secondaryAttackType);
    $('#weaponType').val(data.weaponType);
    $('#special').val(data.special);
    $('#twoHanded').val(data.twoHanded ? 'true' : 'false');
  }
}

function addBonus(character, id, keyChain, bonus) {
  $('#' + id).append(Mustache.render(Template.bonus, gatherScoreables(character, []).sort(function(a,b) {return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);})));
  $('#' + id + ' .remove').last().click(function(event) {
    $(this).closest('tr').remove();
  });
  if (keyChain && bonus) {
    $('#' + id + ' select').last().val(keyChain);
    $('#' + id + ' input').last().val(bonus);
  }
}

function changeType(type) {
  $('#extraOptions').remove();
  if (type === "armors" || type === "weapons") {
    $('#extraOptionsContainer').html(Mustache.render(Template[type+'Options']));
  }
}