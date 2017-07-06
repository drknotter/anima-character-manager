$( document ).ready(function() {
  oras = new Character(
  {
    "name":"Oras",
    "exp":610,
    "classId":"mentalist",
    "appearance":5,
    "height":"5'2\"",
    "weight":"100lbs",
    "characteristics":{
      "str":{"base": 4},
      "agi":{"base": 7},
      "dex":{"base": 9},
      "con":{"base": 6},
      "int":{"base": 7, "levelsInvested": 1},
      "pow":{"base": 7},
      "wp":{"base": 10, "levelsInvested": 1},
      "per":{"base": 9},
    },
    "primaryAbilities":{
      "attack":{"dpInvested":0},
      "block":{"dpInvested":0},
      "dodge":{"dpInvested":0},
      "wearArmor":{"dpInvested":0},
      "ki":{"dpInvested":0},
      "kiAccumulationMultiple":{"dpInvested":0},
      "zeon":{"dpInvested":0},
      "magicAccumulationMultiple":{"dpInvested":0},
      "magicProjection":{"dpInvested":0},
      "summon":{"dpInvested":0},
      "control":{"dpInvested":0},
      "bind":{"dpInvested":0},
      "banish":{"dpInvested":0},
      "psychicPoints":{"dpInvested":380},
      "psychicProjection":{"dpInvested":220},
      "martialKnowledge":{"dpInvested":0},
    },
    "secondaryAbilities":{
      "acrobatics":{"dpInvested":0},
      "athleticism":{"dpInvested":0},
      "climb":{"dpInvested":0},
      "jump":{"dpInvested":0},
      "ride":{"dpInvested":0},
      "swim":{"dpInvested":0},
      "intimidate":{"dpInvested":0},
      "leadership":{"dpInvested":0},
      "persuasion":{"dpInvested":0},
      "style":{"dpInvested":0},
      "notice":{"dpInvested":0},
      "search":{"dpInvested":0},
      "track":{"dpInvested":0},
      "animals":{"dpInvested":0},
      "appraisal":{"dpInvested":0},
      "herbalLore":{"dpInvested":0},
      "history":{"dpInvested":0},
      "magicAppraisal":{"dpInvested":0},
      "medicine":{"dpInvested":0},
      "memorize":{"dpInvested":0},
      "navigation":{"dpInvested":0},
      "occult":{"dpInvested":0},
      "sciences":{"dpInvested":0},
      "composure":{"dpInvested":0},
      "withstandPain":{"dpInvested":0},
      "featsOfStrength":{"dpInvested":0},
      "theft":{"dpInvested":0},
      "disguise":{"dpInvested":0},
      "hide":{"dpInvested":0},
      "stealth":{"dpInvested":0},
      "trapLore":{"dpInvested":0},
      "lockPicking":{"dpInvested":0},
      "poisons":{"dpInvested":0},
      "art":{"dpInvested":0},
      "dance":{"dpInvested":0},
      "music":{"dpInvested":0},
      "sleightOfHand":{"dpInvested":0},
      "forging":{"dpInvested":0},
    },
    "otherAbilities": {
      "lifePointMultiple":{"dpInvested":0},
    },
    "advantages":{
      'amplifySustainedPower': {'cpInvested': 2}, 
      'freeAccessToAnyPsychicDiscipline': {'cpInvested': 2},
    },
    "disadvantages": {
      'onePowerAtATime': {'cpInvested': -1},
    },

    "mentalPowers": {
      'createFire': {'ppInvested':0},
      'controlFire': {'ppInvested':0},
      'freeze': {'ppInvested':0},
      'iceShield': {'ppInvested':3},
      'everlastingMoment': {'ppInvested':3},
      'defensiveTeleportation': {'ppInvested':2},
      'createChaos': {'ppInvested':0},
    },
    "innateSlots": {'ppInvested': 3},
    "psychicPotential": {'ppInvested': 15},

    "currentLifePoints":110,
    "currentFatigue":6,
  });

  renderCharacter(new Character(JSON.parse(localStorage['character.Oras'])));
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

  $('#mainInfo').html(Mustache.render(Template.mainInfo, character));

  $('#characteristics').append(Mustache.render(Template.characteristics));
  $('#characteristics>table').append(Mustache.render(Template.characteristic, {'rowType':'th','name':'Characteristics','score':'Score','modifier':'Modifier'}));
  for (let i in character.characteristics) {
    $('#characteristics>table').append(Mustache.render(Template.characteristic, character.characteristics[i]));
  }

  $('#combat').html(Mustache.render(Template.combat, character));

  $('#secondaryAbilities').html(Mustache.render(Template.secondaryAbilities));
  for (let i in SECONDARY_ABILITIES_BY_CATEGORY) {
    $('#secondaryAbilities>table').append(Mustache.render(Template.secondaryAbilitiesCategory, SECONDARY_ABILITIES_BY_CATEGORY[i]));
    var category = $('#secondaryAbilities .category').last();
    for (let j in SECONDARY_ABILITIES_BY_CATEGORY[i].abilities) {
      category.append(Mustache.render(Template.secondaryAbility, 
        character.secondaryAbilities[SECONDARY_ABILITIES_BY_CATEGORY[i].abilities[j]]));
    }
  }

  $('#resistances').html(Mustache.render(Template.resistances));
  $('#resistances>table').append(Mustache.render(Template.resistance, {'rowType':'th','name':'Resistances','score':'Score'}));
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

