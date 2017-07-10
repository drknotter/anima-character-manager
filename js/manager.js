function getName() {
  var match = location.search.match(new RegExp("[?&]n=([^&]+)(&|$)"));
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

$( document ).ready(function() {
  renderCharacter(new Character(JSON.parse(localStorage['character.'+getName()])));
  $('#popupBackground').click(function() {
    $('#popupBackground').hide();
  });
  $('#popup').click(function(event) {
    event.stopPropagation();
  });
});

function updateCharacter(character) {
  window.localStorage['character.'+character.name] = JSON.stringify(character);
  renderCharacter(character);
}

function renderCharacter(character) {
  $('#content').html(Mustache.render(Template.character, character));
  var column1Boxes = ['mainInfo','combat','psychic','resistances','advantages',];
  var column2Boxes = ['characteristics','secondaryAbilities',];

  appendBox($('#column1'), 'mainInfo', true, Mustache.render(Template.mainInfoHeader, character));
  appendBox($('#column1'), 'combat', true, Mustache.render(Template.combatHeader));
  appendBox($('#column1'), 'psychic', true, Mustache.render(Template.psychicHeader));
  appendBox($('#column1'), 'resistances', true, 'Resistances');
  appendBox($('#column2'), 'characteristics', true, 'Characteristics');
  appendBox($('#column2'), 'secondaryAbilities', true, 'Secondary Abilities');

  $('#mainInfo').append(Mustache.render(Template.mainInfo, character));

  $('#characteristics').append(Mustache.render(Template.characteristics));
  $('#characteristics>table').append(Mustache.render(Template.characteristic, {'rowType':'th','name':'','score':'Score','modifier':'Modifier'}));
  for (let i in character.characteristics) {
    $('#characteristics>table').append(Mustache.render(Template.characteristic, character.characteristics[i]));
  }

  $('#combat').append(Mustache.render(Template.combat, character));

  $('#secondaryAbilities').append(Mustache.render(Template.secondaryAbilities));
  for (let i in SECONDARY_ABILITIES_BY_CATEGORY) {
    $('#secondaryAbilities>table').append(Mustache.render(Template.secondaryAbilitiesCategory, SECONDARY_ABILITIES_BY_CATEGORY[i]));
    var category = $('#secondaryAbilities .category').last();
    for (let j in SECONDARY_ABILITIES_BY_CATEGORY[i].abilities) {
      category.append(Mustache.render(Template.secondaryAbility, 
        character.secondaryAbilities[SECONDARY_ABILITIES_BY_CATEGORY[i].abilities[j]]));
    }
  }

  $('#resistances').append(Mustache.render(Template.resistances));
  for (let i in character.resistances) {
    $('#resistances>table').append(Mustache.render(Template.resistance, character.resistances[i]));
  }

  $('#advantages').append(Mustache.render(Template.advantages));
  $('#advantages>table').append(Mustache.render(Template.advantage, {'rowType':'th', 'name':'Advantages', 'cost':'Cost'}));
  for (let i in character.advantages) {
    $('#advantages>table').last().append(Mustache.render(Template.advantage, character.advantages[i]));
  }
  $('#advantages').append(Mustache.render(Template.disadvantages));
  $('#advantages>table').last().append(Mustache.render(Template.advantage, {'rowType':'th', 'name':'Disadvantages', 'cost':'Benefit'}));
  for (let i in character.disadvantages) {
    $('#advantages>table').last().append(Mustache.render(Template.advantage, character.disadvantages[i]));
  }

  $('#psychic').append(Mustache.render(Template.psychic));
  $('#mainPsychicInfo').append(Mustache.render(Template.mainPsychicInfo, {'name': 'Psychic Points', 'score': character.primaryAbilities.psychicPoints.score}));
  $('#mainPsychicInfo').append(Mustache.render(Template.mainPsychicInfo, {'name': 'Psychic Potential', 'score': character.psychicPotential.score}));
  $('#mainPsychicInfo').append(Mustache.render(Template.mainPsychicInfo, {'name': 'Psychic Projection', 'score': character.primaryAbilities.psychicProjection.score}));
  $('#mainPsychicInfo').append(Mustache.render(Template.mainPsychicInfo, {'name': 'Innate Slots', 'score': character.innateSlots.ppInvested}));

  var disciplinesMentalPowerMap = {};
  for (let i in character.mentalPowers) {
    if (!(character.mentalPowers[i].discipline in disciplinesMentalPowerMap)) {
      disciplinesMentalPowerMap[character.mentalPowers[i].discipline] = [];
    }
    disciplinesMentalPowerMap[character.mentalPowers[i].discipline].push(character.mentalPowers[i]);
  }

  for (let i in disciplinesMentalPowerMap) {
    $('#mentalPowers').append(Mustache.render(Template.mentalPowerDiscipline));
    $('#mentalPowers .discipline').last().append(Mustache.render(Template.mentalPower, {'rowType': 'th', 'name': i, 'action': 'Action', 'maintainable': 'Maintain?', 'bonus': 'Bonus'}));
    for (let j in disciplinesMentalPowerMap[i]) {
      $('#mentalPowers table').last().append(Mustache.render(Template.mentalPower, disciplinesMentalPowerMap[i][j]));
      $('#mentalPowers table .mentalPower').last().click(function(event) {
        $('#popup').html(Mustache.render(Template.mentalPowerPopup, disciplinesMentalPowerMap[i][j]));
        $('#popup .effects').append(Mustache.render(Template.mentalPowerEffect, {'roll': 'Roll', 'difficulty': 'Difficulty', 'outcome': 'Outcome', 'rowType': 'th'}));
        for (let k in disciplinesMentalPowerMap[i][j].effects) {
          $('#popup .effects').append(Mustache.render(Template.mentalPowerEffect,disciplinesMentalPowerMap[i][j].effects[k]));
        }
        $('#popupBackground').show();
      })
    }
  }

  $('#lifePoints').keypress({'key':'currentLifePoints', 'character': character}, updateCharacterFrom);
  $('#fatigue').keypress({'key':'currentFatigue', 'character': character}, updateCharacterFrom);
  $('#exp').keypress({'key':'exp', 'character': character}, updateCharacterFrom);

  var blob = new Blob([JSON.stringify(character, null, 2)], {type: 'application/json'});
  $('#exportButton').attr('href', URL.createObjectURL(blob));
}

function updateCharacterFrom(event) {
  var character = event.data['character'];
  var key = event.data['key'];
  if (event.which == 13) {
    var textInt = Number(this.textContent);
    if (this.textContent != "" && !isNaN(textInt)) {
      character[key] = textInt;
      updateCharacter(character);
    } else {
      $(this).html(character[key]);
    }
  }
  return event.which != 13;
}

