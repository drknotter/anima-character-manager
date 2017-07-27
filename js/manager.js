var sections = [];
var lastContentWidth = 0;

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
  lastContentWidth = 0;
  renderCharacter(character);
}

function renderCharacter(character) {
  $('#content').html(Mustache.render(Template.character, character));

  sections = [];
  sections.push({'id': 'mainInfo', 'closeable': true, 'header': Mustache.render(Template.mainInfoHeader, character)});
  sections.push({'id': 'characteristics', 'closeable': true, 'header': 'Characteristics'});
  sections.push({'id': 'secondaryAbilities', 'closeable': true, 'header': 'Secondary Abilities'});
  sections.push({'id': 'combat', 'closeable': true, 'header': Mustache.render(Template.combatHeader)});
  sections.push({'id': 'psychic', 'closeable': true, 'header': Mustache.render(Template.psychicHeader)});
  sections.push({'id': 'resistances', 'closeable': true, 'header': 'Resistances'});
  sections.push({'id': 'advantages', 'closeable': true, 'header': 'Advantages and Disadvantages'});
  sections.push({'id': 'equipment', 'closeable': true, 'header': 'Equipment'});

  for (let i in sections) {
    appendBox($('#column0'), sections[i].id, sections[i].closeable, sections[i].header);
  }

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
  $('#resistances>table').append(Mustache.render(Template.resistance, {'rowType':'th','name':'','score':'Score','percentile':''}));
  for (let i in character.resistances) {
    $('#resistances>table').append(Mustache.render(Template.resistance, character.resistances[i]));
  }

  $('#advantages').append(Mustache.render(Template.advantages));
  $('#advantages>table').append(Mustache.render(Template.advantage, {'rowType':'th', 'name':'Advantages', 'cpInvested':'Cost'}));
  for (let i in character.advantages) {
    $('#advantages>table').last().append(Mustache.render(Template.advantage, character.advantages[i]));
  }
  $('#advantages').append(Mustache.render(Template.disadvantages));
  $('#advantages>table').last().append(Mustache.render(Template.advantage, {'rowType':'th', 'name':'Disadvantages', 'cpInvested':'Benefit'}));
  for (let i in character.disadvantages) {
    $('#advantages>table').last().append(Mustache.render(Template.advantage, character.disadvantages[i]));
  }

  $('#psychic').append(Mustache.render(Template.psychic));
  $('#mainPsychicInfo').append(Mustache.render(Template.mainPsychicInfo, {'name': 'Psychic Points', 'score': character.primaryAbilities.psychicPoints.score}));
  $('#mainPsychicInfo').append(Mustache.render(Template.mainPsychicInfo, {'name': 'Psychic Potential', 'score': character.psychicPotential.score}));
  $('#mainPsychicInfo').append(Mustache.render(Template.mainPsychicInfo, {'name': 'Psychic Projection', 'score': character.primaryAbilities.psychicProjection.score}));
  $('#mainPsychicInfo').append(Mustache.render(Template.mainPsychicInfo, {'name': 'Innate Slots', 'score': character.innateSlots.ppInvested / 2}));

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

  $('#equipment').append(Mustache.render(Template.equipmentList));
  for (let type in character.equipment) {
    for (let i in character.equipment[type]) {
      $('#equipmentList>tbody').append(Mustache.render(Template.equipment, character.equipment[type][i]));
      $('#equipmentList .equipped>input').last().attr('checked', character.equipment[type][i].equipped);
      $('#equipmentList .equipped>input').last().change(function() {
        if ($(this).is(':checked')) {
          character.equipment[type][i].equip();
        } else {
          character.equipment[type][i].unequip();
        }
        updateCharacter(character);
      });
    }
  }

  $('#lifePoints').keypress({'key':'currentLifePoints', 'character': character}, updateCharacterFrom);
  $('#fatigue').keypress({'key':'currentFatigue', 'character': character}, updateCharacterFrom);
  $('#exp').keypress({'key':'exp', 'character': character}, updateCharacterFrom);

  var blob = new Blob([JSON.stringify(character, null, 2)], {type: 'application/json'});
  $('#exportButton').attr('href', URL.createObjectURL(blob));

  handleResize();
  $(window).resize(handleResize);
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

function handleResize() {
  var contentWidth = $('#content').width();
  if (contentWidth == lastContentWidth) {
    return;
  }

  for (let i in sections) {
    let box = $('#'+sections[i].id).closest('.box');
    $('#column0').append(box);
    $('#'+sections[i].id).show();
  }

  var columnCount = Math.floor(contentWidth / remToPx(20));
  var currentColumnCount = $('#character>td.column').length;

  for (let i=currentColumnCount; i<columnCount; i++) {
    let column = $('<td></td>');
    column.attr({'id': 'column' + i, 'class': 'column'});
    $('#character').append(column);
  }
  for (let i=columnCount; i<currentColumnCount; i++) {
    $('#column'+i).remove();
  }

  $('#controlButtons').attr('colspan', columnCount);

  var heights = Array.apply(null, Array(columnCount)).map(Number.prototype.valueOf,0);
  var currentColumn = 0;
  var nextColumn = (currentColumn + 1) % columnCount;
  for (let i in sections) {
    let box = $('#'+sections[i].id).closest('.box');
    $('#column'+currentColumn).append(box);
    heights[currentColumn] += box.height();
    if (heights[currentColumn] > heights[nextColumn]) {
      currentColumn = nextColumn;
      nextColumn = (currentColumn + 1) % columnCount;
    }
  }

  lastContentWidth = contentWidth;
}