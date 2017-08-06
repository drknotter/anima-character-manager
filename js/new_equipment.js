function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

$( document ).ready(function() {
  var character = new Character(JSON.parse(localStorage['character.'+getParameterByName('n')]));

  $('#newEquipmentType').change(function(event) {
    $('#extraOptions').remove();
    var template = this.options[this.options.selectedIndex].value;
    if (template === "armors" || template === "weapons") {
      $('#content').append(Mustache.render(Template[template+'Options']));
    }
  });
  $('#addEquippedBonus').click(function(event) {
    $('#equippedBonuses').append(Mustache.render(Template.bonus, gatherScoreables(character, []).sort(function(a,b) {return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);})));
    $('#equippedBonuses .remove').last().click(function(event) {
      $(this).closest('tr').remove();
    });
  });
  $('#addPossessionBonus').click(function(event) {
    $('#possessionBonuses').append(Mustache.render(Template.bonus, gatherScoreables(character, []).sort(function(a,b) {return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);})));
    $('#possessionBonuses .remove').last().click(function(event) {
      $(this).closest('tr').remove();
    });
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
      data.twoHanded = $('#special').val() == 'true';

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

    var key = guid();
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