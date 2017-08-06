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
    if (template === "armor" || template === "weapon") {
      $('#content').append(Mustache.render(Template[template+'Options']));
    }
  });
  $('#addEquippedBonus').click(function(event) {
    $('#equippedBonuses').append(Mustache.render(Template.bonus, gatherScoreables(character, [])));
    $('#equippedBonuses .remove').last().click(function(event) {
      $(this).closest('tr').remove();
    });
  });
  $('#addPossessionBonus').click(function(event) {
    $('#possessionBonuses').append(Mustache.render(Template.bonus, gatherScoreables(character, [])));
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
    data.availability = Number($('#newEquipmentAvailability').val());
    data.fortitude = Number($('#newEquipmentFortitude').val());
    data.presence = Number($('#newEquipmentPresence').val());

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

    var key = guid();
    try {
      var equipment = new Equipment(data, character, key);
      character.equipment[type][key] = equipment;
      localStorage['character.'+character.name] = JSON.stringify(character);
      window.open("manage.html?n=" + character.name, "_self");
    } catch (error) {
      alert(error.message);
    }
  });
});