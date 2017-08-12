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
  sections.push({'id': 'combat', 'closeable': true, 'header': 'Combat'});
  sections.push({'id': 'psychic', 'closeable': true, 'header': 'Psychic Powers'});
  sections.push({'id': 'resistances', 'closeable': true, 'header': 'Resistances'});
  sections.push({'id': 'advantages', 'closeable': true, 'header': 'Advantages and Disadvantages'});
  sections.push({'id': 'equipment', 'closeable': true, 'header': 'Equipment'});
  sections.push({'id': 'elan', 'closeable': true, 'header': 'Elan'});

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

  $('#equipment').append(Mustache.render(Template.equipmentList, character));
  for (let type in character.equipment) {
    for (let i in character.equipment[type]) {
      let item = character.equipment[type][i];
      $('#equipmentList>tbody').append(Mustache.render(Template.equipment, item));
      var equipmentDOM = $('#equipmentList .equipment').last();
      equipmentDOM.attr('id', i);
      equipmentDOM.click(function(event) {
        $('#popup').html(Mustache.render(Template.equipmentPopup, item));
        if (type === "armors") {
          $('#equipmentPopup').append(Mustache.render(Template.armorDetails, item));
        } else if (type === "weapons") {
          $('#equipmentPopup').append(Mustache.render(Template.weaponDetails, item));
        }
        $('#popupBackground').show();
      });

      var dom = $('#equipmentList .equip').last();
      dom.click(function(event) {
        event.stopPropagation();
        if (!item.equipped) {
          item.equip();
        } else {
          item.unequip();
        }
        updateCharacter(character);
      });

      dom = $('#equipmentList .sell').last();
      dom.click(function(event) {
        event.stopPropagation();
        if (confirm("Are you sure you want to sell " + item.name + " for " + item.costData.gp + "GP, " + item.costData.sp + "SP, " + item.costData.cp + "CP?")) {
          character.wealth += item.cost;
          delete character.equipment[type][i];
          updateCharacter(character);
        }
      });

      dom = $('#equipmentList .discard').last();
      dom.click(function(event) {
        event.stopPropagation();
        if (confirm("Are you sure you want to discard " + item.name + "?")) {
          delete character.equipment[type][i];
          updateCharacter(character);
        }
      });

      dom = $('#equipmentList .edit').last();
      dom.click(function(event) {
        event.stopPropagation();
        window.open("new_equipment.html?n=" + character.name + "&t=" + type + "&k=" + i, "_self");
      });
    }
  }

  $('#elan').append(Mustache.render(Template.elanList, character));
  for (let k in character.elan) {
    $('#elanList>tbody').append(Mustache.render(Template.elan, character.elan[k]));
    $('#elanList .name').last().click(function(event) {
      $('#popup').html(Mustache.render(Template.elanPopup, character.elan[k]));
      if (character.elan[k]['gifts'].length == 0) {
        $('#elanGifts').remove();
      }
      for (let i in character.elan[k]['gifts']) {
        let gift = character.elan[k]['gifts'][i];
        $('#elanGifts').append(Mustache.render(Template.elanGift, Elan.Data[k]['gifts'][gift]));
      }
      $('#popupBackground').show();
    });
    $('#elanList .score').last().click(function(event) {
      $('#popup').html(Mustache.render(Template.singleNumberPopup, {'name': 'Elan for ' + character.elan[k].name, 'currentValue': character.elan[k].elanBonus}))
      $('#popupBackground').show();
      $('#popup input').last().focus();
      $('#popup input').last().select();
      $('#popup input').last().keypress(function(event) {
        if (event.which == 13) {
          character.elan[k].elanBonus = Number($(this).val());
          updateCharacter(character);
          $('#popupBackground').hide();
        }
      });
      $('#popup .enterButton').click(function() {
          character.elan[k].elanBonus = Number($('#popup input').last().val());
          updateCharacter(character);
          $('#popupBackground').hide();
      });
    });
  }

  $('#lifePoints').click(function(event) {
    $('#popup').html(Mustache.render(Template.singleNumberPopup, {'name': 'Current Life Points', 'currentValue': character.currentLifePoints}));
    $('#popupBackground').show();
    $('#popup input').last().focus();
    $('#popup input').last().select();
    $('#popup input').last().keypress(function(event) {
      if (event.which == 13) {
        character['currentLifePoints'] = Number($(this).val());
        updateCharacter(character);
        $('#popupBackground').hide();
      }
    });
    $('#popup .enterButton').click(function() {
        character['currentLifePoints'] = Number($('#popup input').last().val());
        updateCharacter(character);
        $('#popupBackground').hide();
    });
  });
  $('#fatigue').click(function(event) {
    $('#popup').html(Mustache.render(Template.singleNumberPopup, {'name': 'Current Fatigue', 'currentValue': character.currentFatigue}));
    $('#popupBackground').show();
    $('#popup input').last().focus();
    $('#popup input').last().select();
    $('#popup input').last().keypress(function(event) {
      if (event.which == 13) {
        character['currentFatigue'] = Number($(this).val());
        updateCharacter(character);
        $('#popupBackground').hide();
      }
    });
    $('#popup .enterButton').click(function() {
        character['currentFatigue'] = Number($('#popup input').last().val());
        updateCharacter(character);
        $('#popupBackground').hide();
    });
  });
  $('#exp').click(function(event) {
    $('#popup').html(Mustache.render(Template.singleNumberPopup, {'name': 'Experience', 'currentValue': character.exp}));
    $('#popupBackground').show();
    $('#popup input').last().focus();
    $('#popup input').last().select();
    $('#popup input').last().keypress(function(event) {
      if (event.which == 13) {
        character['exp'] = Number($(this).val());
        updateCharacter(character);
        $('#popupBackground').hide();
      }
    });
    $('#popup .enterButton').click(function() {
        character['exp'] = Number($('#popup input').last().val());
        updateCharacter(character);
        $('#popupBackground').hide();
    });
  });
  $('#wealth').click(function(event) {
    $('#popup').html(Mustache.render(Template.tripleNumberPopup, 
      {'name': 'Wealth', 
      'currentValue1': character.wealthData.gp, 'label1': 'GP', 
      'currentValue2': character.wealthData.sp, 'label2': 'SP', 
      'currentValue3': character.wealthData.cp, 'label3': 'CP'}));
    $('#popupBackground').show();
    $('#popup input').first().focus();
    $('#popup input').first().select();
    $('#popup input').last().keypress(function(event) {
      if (event.which == 13) {
        var inputs = $('#popup input');
        var gp = Number(inputs[0].value);
        var sp = Number(inputs[1].value);
        var cp = Number(inputs[2].value);
        character['wealth'] = gp + 0.01 * sp + 0.001 * cp;
        updateCharacter(character);
        $('#popupBackground').hide();
      }
    });
    $('#popup .enterButton').last().click(function() {
      var inputs = $('#popup input');
      var gp = Number(inputs[0].value);
      var sp = Number(inputs[1].value);
      var cp = Number(inputs[2].value);
      character['wealth'] = gp + 0.01 * sp + 0.001 * cp;
      updateCharacter(character);
      $('#popupBackground').hide();
    });
  });

  var blob = new Blob([JSON.stringify(character, null, 2)], {type: 'application/json'});
  $('#exportButton').attr('href', URL.createObjectURL(blob));

  $('.openRollable').click(function(event) {
    var roll = Math.floor(100 * Math.random()) + 1;
    var rolls = [];

    if (roll <= 3) {
      rolls.push(roll);
      roll = Math.floor(100 * Math.random()) + 1;
      rolls.push(roll);
      var total = roll;
      if (roll == 1) {
        total += 15;
      } else if (roll == 3) {
        total -= 15;
      }

      $('#popup').html(Mustache.render(Template.rollPopup, {
        'resultText': $(this).attr('data-name') + ': Fumble!', 
        'rolls': rolls.join(', '),
        'result': total}));
      $('#popupBackground').show();

    } else {
      var total = Number($(this).attr('data-bonus'));
      console.log(total);
      var rollCount = 0;

      rolls.push(roll)
      total += roll;
      while (roll == 100 || roll >= 90 + rollCount++) {
        roll = Math.floor(100 * Math.random()) + 1;
        rolls.push(roll)
        total += roll;
      }

      $('#popup').html(Mustache.render(Template.rollPopup, {
        'resultText': $(this).attr('data-name') + ': Success!',
        'rolls': rolls.join(', '), 
        'result': total}));
      $('#popupBackground').show();
    }
  });
  $('.rollable').click(function(event) {
    var roll = Math.floor(100 * Math.random()) + 1;
    var total = roll + Number($(this).attr('data-bonus'));
    $('#popup').html(Mustache.render(Template.rollPopup, {
      'resultText': $(this).attr('data-name') + ':' + (roll == 100 ? ' Success!' : ''), 
      'rolls': roll,
      'result': total}));
    $('#popupBackground').show();
  });
  $('.percentileRollable').click(function(event) {
    var bonus = Number($(this).attr("data-bonus"));
    var roll = Math.floor(100 * Math.random()) + 1;
    var rolls = [roll];

    var resultText = $(this).attr('data-name') + ": " + (roll <= bonus ? "Success!" : "Miss!");
    var rollText = rolls.join(', ');
    var total = Math.abs(roll - bonus);
    $('#popup').html(Mustache.render(Template.rollPopup, {'resultText': resultText, 'rolls': rollText, 'result': total}));
    $('#popupBackground').show();
  });
  $('.d10Rollable').click(function(event) {
    var bonus = Number($(this).attr("data-bonus"));
    var roll = Math.floor(10 * Math.random()) + 1;
    var adjusted = roll;

    if (roll == 10) {
      adjusted = 13;
    } else if (roll == 1) {
      adjusted = -2;
    }

    var resultText = $(this).attr('data-name') + ": " + (roll <= bonus ? "Success!" : "Miss!");
    var total = Math.abs(adjusted - bonus);
    $('#popup').html(Mustache.render(Template.rollPopup, {'resultText': resultText, 'rolls': roll, 'result': total}));
    $('#popupBackground').show();
  })

  handleResize();
  $(window).resize(handleResize);
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
  for (let i in sections) {
    let box = $('#'+sections[i].id).closest('.box');

    let minIndex = 0;
    for (let j in heights) {
      if (heights[j] < heights[minIndex]) {
        minIndex = j;
      }
    }
    $('#column'+minIndex).append(box);
    heights[minIndex] += box.height();
  }

  lastContentWidth = contentWidth;
}