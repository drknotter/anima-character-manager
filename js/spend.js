var PRIMARY_DP_SPEND_GROUPS = {
  'combat': {
    'name': 'Combat Abilities',
    'abilities': [
      'attack',
      'block',
      'dodge',
      'wearArmor',
      'ki_str',
      'ki_agi',
      'ki_dex',
      'ki_con',
      'ki_int',
      'ki_pow',
      'ki_wp',
      'ki_per',
      'kiAccumulationMultiple_str',
      'kiAccumulationMultiple_agi',
      'kiAccumulationMultiple_dex',
      'kiAccumulationMultiple_con',
      'kiAccumulationMultiple_int',
      'kiAccumulationMultiple_pow',
      'kiAccumulationMultiple_wp',
      'kiAccumulationMultiple_per',
    ],
  },
  'supernatural': {
    'name': 'Supernatural Abilities',
    'abilities': [
      'zeon',
      'magicAccumulationMultiple',
      'magicProjection',
      'summon',
      'control',
      'bind',
      'banish',
    ],
  },
  'psychic': {
    'name': 'Psychic Abilities',
    'abilities': [
      'psychicPoints',
      'psychicProjection',
    ],
  },
};

var SECONDARY_DP_SPEND_GROUP = {
  'name': 'Secondary Abilities',
  'abilities': [
    'acrobatics',
    'athleticism',
    'climb',
    'jump',
    'ride',
    'swim',
    'intimidate',
    'leadership',
    'persuasion',
    'style',
    'notice',
    'search',
    'track',
    'animals',
    'appraisal',
    'herbalLore',
    'history',
    'magicAppraisal',
    'medicine',
    'memorize',
    'navigation',
    'occult',
    'sciences',
    'composure',
    'withstandPain',
    'featsOfStrength',
    'theft',
    'disguise',
    'hide',
    'stealth',
    'trapLore',
    'lockPicking',
    'poisons',
    'art',
    'dance',
    'music',
    'sleightOfHand',
    'forging',
  ],
};

var OTHER_DP_SPEND_GROUP = {
  'name': 'Other Abilities',
  'abilities': [
    'lifePointMultiple',
  ],
};

function gatherInvestments(data, key) {
  if (!data) {
    return [];
  }

  var gathered = [];
  for (let i in data) {
    if (i === key) {
      gathered.push(data);
    } else if (data[i] instanceof Object) {
      var gatheredFromChild = gatherInvestments(data[i], key);
      for (let j in gatheredFromChild) {
        gathered.push(gatheredFromChild[j]);
      }
    }
  }
  return gathered;
}

function advantageCost(character, advantageKey) {
  var advantageData = ADVANTAGE_DATA[advantageKey];
  var hasAdvantage = advantageKey in character.advantages;
  var hasDisadvantage = advantageKey in character.disadvantages;
  var cpInvested = null;
  
  if (hasAdvantage) {
    cpInvested = character.advantages[advantageKey].cpInvested;
  }
  if (hasDisadvantage) {
    cpInvested = character.disadvantages[advantageKey].cpInvested;
  }

  var cost = null;
  if (cpInvested != null) {
    cost = hasAdvantage ? cpInvested : -cpInvested;
  } else if (advantageData.minCost == advantageData.maxCost) {
    cost = ADVANTAGES.includes(advantageKey) ? advantageData.minCost : -advantageData.minCost;
  } else {
    cost = (ADVANTAGES.includes(advantageKey) ? advantageData.minCost : -advantageData.maxCost) 
        + " - " 
        + (ADVANTAGES.includes(advantageKey) ? advantageData.maxCost : -advantageData.minCost);
  }

  return cost;
}

function hasAdvantage(character, advantageKey) {
  return advantageKey in character.advantages || advantageKey in character.disadvantages;
}

function canAffordAdvantage(character, advantageKey) {
  return hasAdvantage(character, advantageKey) || ADVANTAGE_DATA[advantageKey].minCost <= character.CP;
}

$( document ).ready(function() {
  var characterName = getParameterByName("n");
  var character = new Character(JSON.parse(localStorage['character.'+characterName]));
  renderSpendingOptionGroups(character);
  $('#popup').click(function(event) {
    event.stopPropagation();
  });
});

function renderSpendingOptionGroups(character) {
  renderDpOptionSpendingGroup(character);
  renderCharacteristicLevelBonusSpendingGroup(character);
  renderSecondaryAbilityLevelBonusSpendingGroup(character);
  renderPpSpendingGroup(character);
  renderCpSpendingGroup(character);
  renderElanSpendingGroup(character);
}

/////////////////////////
// DP spending options //
/////////////////////////

function renderDpOptionSpendingGroup(character) {
  var DP = character.DP;

  appendBox($('#content'), 'dpSpendingOptionGroup', true, Mustache.render(Template.spendingOptionGroupHeader, {
    'optionName': 'Development Points', 
    'total': character.DP,
    'totalId': 'Total_DP',
  }));

  var spendingOptionGroup = $('#dpSpendingOptionGroup');
  spendingOptionGroup.attr('class', 'spendingOptionGroup');
  for (let i in PRIMARY_DP_SPEND_GROUPS) {
    var investments = [];
    var limit = Math.floor(character.class.limits[i] * 100);
    for (let j in PRIMARY_DP_SPEND_GROUPS[i].abilities) {
      investments.push(character.primaryAbilities[PRIMARY_DP_SPEND_GROUPS[i].abilities[j]]);
    }
    renderDpSpendingOptionSubgroup(character, investments, PRIMARY_DP_SPEND_GROUPS[i].name, limit, spendingOptionGroup);
  }

  var investments = [];
  for (let i in SECONDARY_DP_SPEND_GROUP.abilities) {
    investments.push(character.secondaryAbilities[SECONDARY_DP_SPEND_GROUP.abilities[i]]);
  }
  renderDpSpendingOptionSubgroup(character, investments, SECONDARY_DP_SPEND_GROUP.name, null, spendingOptionGroup);

  var investments = [];
  for (let i in OTHER_DP_SPEND_GROUP.abilities) {
    investments.push(character.otherAbilities[OTHER_DP_SPEND_GROUP.abilities[i]]);
  }
  renderDpSpendingOptionSubgroup(character, investments, OTHER_DP_SPEND_GROUP.name, null, spendingOptionGroup);
  spendingOptionGroup.toggle();
}

function renderDpSpendingOptionSubgroup(character, investments, subgroupName, limit, parent) {
  parent.append(Mustache.render(Template.spendingOptionSubgroup));
  var subgroup = parent.children('.spendingOptionSubgroup').last();
  subgroup.append(Mustache.render(Template.dpInvestmentHeader, {'name': subgroupName, 'limit': limit}))
  for (let i in investments) {
    renderDpSpendingOption(character, investments[i], subgroup);
  }
}

function renderDpSpendingOption(character, investment, parent) {
  var maxForInvestment = investment.dpInvested + character.DP;
  var data = {'investment': investment, 'maxForInvestment': maxForInvestment};
  parent.append(Mustache.render(Template.dpInvestment, data));
  parent.children('.dpInvestment').last().attr('id', investment.name.replace(/\s/g, "_") + ":DP");
  $('.dpInvested>input').last().change({'investment': investment, 'character': character}, function(event) {
    changeDP(event, Number(this.value));
  });
}

/////////////////////////////////////////////////
// Characteristic level bonus spending options //
/////////////////////////////////////////////////
function renderCharacteristicLevelBonusSpendingGroup(character) {
  var levelBonuses = character.characteristicLevelBonuses;

  appendBox($('#content'), 'characteristicLevelBonusSpendingOptionGroup', true, Mustache.render(Template.spendingOptionGroupHeader, {
    'optionName': 'Characteristic Level Bonuses', 
    'total': levelBonuses,
    'totalId': 'Total_Level_Bonuses',
  }));

  var spendingOptionGroup = $('#characteristicLevelBonusSpendingOptionGroup');
  spendingOptionGroup.attr('class', 'spendingOptionGroup');

  spendingOptionGroup.append(Mustache.render(Template.spendingOptionSubgroup));
  var subgroup = spendingOptionGroup.children('.spendingOptionSubgroup').last();
  subgroup.append(Mustache.render(Template.characteristicLevelBonusInvestmentHeader));
  for (let i in character.characteristics) {
    var maxForInvestment = levelBonuses + character.characteristics[i].characteristicLevelBonusesInvested;
    subgroup.append(Mustache.render(Template.characteristicLevelBonusInvestment, {'characteristic': character.characteristics[i], 'maxForInvestment': maxForInvestment}));
    subgroup.children('.characteristicLevelBonusInvestment').last().attr('id', character.characteristics[i].name.replace(/\s/g, "_") + ":CB");
    $('.characteristicLevelBonusesInvested>input').last().change({'characteristic': character.characteristics[i], 'character': character}, function(event) {
      changeCharacteristicLevelBonuses(event, Number(this.value));
    });
  }

  spendingOptionGroup.toggle();
}

////////////////////////////////////////////////////
// Secondary ability level bonus spending options //
////////////////////////////////////////////////////
function renderSecondaryAbilityLevelBonusSpendingGroup(character) {
  var levelBonuses = character.secondaryAbilityLevelBonuses;

  appendBox($('#content'), 'secondaryAbilityLevelBonusSpendingOptionGroup', true, Mustache.render(Template.spendingOptionGroupHeader, {
    'optionName': 'Natural Level Bonuses', 
    'total': levelBonuses,
    'totalId': 'Total_Natural_Bonuses',
  }));

  var spendingOptionGroup = $('#secondaryAbilityLevelBonusSpendingOptionGroup');
  spendingOptionGroup.attr('class', 'spendingOptionGroup');

  spendingOptionGroup.append(Mustache.render(Template.spendingOptionSubgroup));
  var subgroup = spendingOptionGroup.children('.spendingOptionSubgroup').last();
  subgroup.append(Mustache.render(Template.secondaryAbilityLevelBonusInvestmentHeader));
  for (let i in character.secondaryAbilities) {
    var maxForInvestment = levelBonuses + character.secondaryAbilities[i].secondaryAbilityLevelBonusesInvested;
    subgroup.append(Mustache.render(Template.secondaryAbilityLevelBonusInvestment, {'ability': character.secondaryAbilities[i], 'maxForInvestment': maxForInvestment}));
    subgroup.children('.secondaryAbilityLevelBonusInvestment').last().attr('id', character.secondaryAbilities[i].name.replace(/\s/g, "_") + ":NB");
    $('.secondaryAbilityLevelBonusesInvested>input').last().change({'ability': character.secondaryAbilities[i], 'character': character}, function(event) {
      changeSecondaryAbilityLevelBonuses(event, Number(this.value));
    });
  }

  spendingOptionGroup.toggle();
}

/////////////////////////////////////
// Creation point spending options //
/////////////////////////////////////

function renderCpSpendingGroup(character) {
  var CP = character.CP;

  appendBox($('#content'), 'cpSpendingOptionGroup', true, Mustache.render(Template.spendingOptionGroupHeader, {
    'optionName': 'Creation Points', 
    'total': CP,
    'totalId': 'Total_CP',
  }));

  var spendingOptionGroup = $('#cpSpendingOptionGroup');
  spendingOptionGroup.attr('class', 'spendingOptionGroup');

  spendingOptionGroup.append(Mustache.render(Template.spendingOptionSubgroup));
  var subgroup = spendingOptionGroup.children('.spendingOptionSubgroup').last();
  subgroup.append(Mustache.render(Template.cpInvestmentHeader, {'name': 'Advantages', 'cost': 'Cost'}));
  for (let i in ADVANTAGES) {
    renderCpSpendingOption(character, ADVANTAGES[i], subgroup);
  }

  spendingOptionGroup.append(Mustache.render(Template.spendingOptionSubgroup));
  var subgroup = spendingOptionGroup.children('.spendingOptionSubgroup').last();
  subgroup.append(Mustache.render(Template.cpInvestmentHeader, {'name': 'Disadvantages', 'cost': 'Benefit'}));
  for (let i in DISADVANTAGES) {
    renderCpSpendingOption(character, DISADVANTAGES[i], subgroup);
  }
  spendingOptionGroup.toggle();
}

function renderCpSpendingOption(character, advantageKey, parent) {
  var advantage = ADVANTAGE_DATA[advantageKey];

  var data = {'name': advantage.name, 'cost': advantageCost(character, advantageKey)};
  parent.append(Mustache.render(Template.cpInvestment, data));
  parent.children('.cpInvestment').last().attr('id', advantage.name.replace(/\s/g, "_") + ":CP");
  $('.obtained>input').last().attr("checked", hasAdvantage(character, advantageKey));
  $('.obtained>input').last().attr("disabled", !canAffordAdvantage(character, advantageKey));
  $('.obtained>input').last().change({'advantageKey': advantageKey, 'character': character}, function(event) {
    changeCP(event, this.checked);
  });
}

/////////////////////////
// PP spending options //
/////////////////////////

function renderPpSpendingGroup(character) {
  var PP = character.primaryAbilities.psychicPoints.score;

  appendBox($('#content'), 'ppSpendingOptionGroup', true, Mustache.render(Template.spendingOptionGroupHeader, {
    'optionName': 'Psychic Points', 
    'total': PP,
    'totalId': 'Total_PP',
  }));

  var spendingOptionGroup = $('#ppSpendingOptionGroup');
  spendingOptionGroup.attr('class', 'spendingOptionGroup');
}

///////////////////////////
// Elan spending options //
///////////////////////////

function renderElanSpendingGroup(character) {
  appendBox($('#content'), 'elanSpendingOptionGroup', true, Mustache.render(Template.spendingOptionGroupHeaderNoTotal, {
    'optionName': 'Elan'
  }));

  for (let i in Elan.Data) {
    $('#elanSpendingOptionGroup').append(Mustache.render(Template.elanDeityGroup, character.elan[i]));
    renderDeitySpendingOptions(character, i);
  }

  $('#elanSpendingOptionGroup').toggle();
}

function renderDeitySpendingOptions(character, deityKey) {
  var deityName = Elan.Data[deityKey].name;
  var table = $('#' + deityName + 'Group .gifts').first();
  var totalElanSpent = 0;
  for (let i in character.elan[deityKey].gifts) {
    var giftKey = character.elan[deityKey].gifts[i];
    totalElanSpent += Elan.Data[deityKey].gifts[giftKey].cost;
  }

  for (let i in Elan.Data[deityKey].gifts) {
    table.append(Mustache.render(Template.deityGift, Elan.Data[deityKey].gifts[i]));
    let input = table.find('.gift input').last();
    input.attr('checked', character.elan[deityKey].gifts.includes(i));
    input.attr('disabled', !character.elan[deityKey].gifts.includes(i) 
      && (Elan.Data[deityKey].gifts[i].cost > (character.elan[deityKey].elanBonus - totalElanSpent)
        || Elan.Data[deityKey].gifts[i].requiredElan > character.elan[deityKey].elanBonus));
    input.change({'character': character, 'deityKey': deityKey, 'giftKey': i}, function(event) {
      changeElan(event, $(this).is(":checked"));
    })
  }
}


//////////////////////
// Update functions //
//////////////////////

function changeDP(event, newValue) {
  var investment = event.data.investment;
  var character = event.data.character;
  investment.dpInvested = newValue;
  updateSpendingOptions(character);
  localStorage['character.'+character.name] = JSON.stringify(character);
}

function changeCharacteristicLevelBonuses(event, newValue) {
  var characteristic = event.data.characteristic;
  var character = event.data.character;
  characteristic.characteristicLevelBonusesInvested = newValue;
  updateSpendingOptions(character);
  localStorage['character.'+character.name] = JSON.stringify(character);
}

function changeSecondaryAbilityLevelBonuses(event, newValue) {
  var ability = event.data.ability;
  var character = event.data.character;
  ability.secondaryAbilityLevelBonusesInvested = newValue;
  updateSpendingOptions(character);
  localStorage['character.'+character.name] = JSON.stringify(character);
}

function changeCP(event, newValue) {
  var advantageKey = event.data.advantageKey;
  var advantageData = ADVANTAGE_DATA[advantageKey];
  var character = event.data.character;

  var isAdvantage = ADVANTAGES.includes(advantageKey);
  var hasAdvantage = advantageKey in character.advantages;
  var hasDisadvantage = advantageKey in character.disadvantages;

  if (hasAdvantage) {
    delete character.advantages[advantageKey];
    updateSpendingOptions(character);
    localStorage['character.'+character.name] = JSON.stringify(character);

  } else if (hasDisadvantage) {
    delete character.disadvantages[advantageKey];
    updateSpendingOptions(character);
    localStorage['character.'+character.name] = JSON.stringify(character);

  } else {
    var advantage = new Advantage(advantageData, character, advantageKey);
    if (advantageData.minCost == advantageData.maxCost) {
      advantage.cpInvested = advantageData.minCost;
      if (isAdvantage) {
        character.advantages[advantageKey] = advantage;
      } else {
        character.disadvantages[advantageKey] = advantage;
      }
    
      updateSpendingOptions(character);
      localStorage['character.'+character.name] = JSON.stringify(character);
    
    } else {
      $('#popup').html(Mustache.render(Template.cpInvestmentVariableChoice, {
        'min': isAdvantage ? advantageData.minCost : -advantageData.maxCost,
        'max': isAdvantage ? advantageData.maxCost : -advantageData.minCost,
        'name': advantageData.name,
      }));
      $('#variableCpChoiceDialog>.button').click(function() {
        var advantage = new Advantage(advantageData, character, )
        if (isAdvantage) {
          advantage.cpInvested = Number($('#variableCpChoiceDialog input').last().val());
          character.advantages[advantageKey] = advantage;
        } else {
          advantage.cpInvested = -Number($('#variableCpChoiceDialog input').last().val());
          character.disadvantages[advantageKey] = advantage;
        }

        updateSpendingOptions(character);
        localStorage['character.'+character.name] = JSON.stringify(character);
        $('#popupBackground').hide();
      });
      $('#popupBackground').show();
      $('#variableCpChoiceDialog input').last().focus();
      $('#popupBackground').on('click', function() {
        updateSpendingOptions(character);
        localStorage['character.'+character.name] = JSON.stringify(character);
        $('#popupBackground').hide();
      });
    }
  }
}

function changeElan(event, obtainedGift) {
  var c = event.data.character;
  var d = event.data.deityKey;
  var g = event.data.giftKey;

  var seen = {};
  c.elan[d].gifts = c.elan[d].gifts.filter(function(item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
  var index = c.elan[d].gifts.indexOf(g);

  if (obtainedGift && index == -1) {
    c.elan[d].gifts.push(g);
  } else if (index > -1) {
    c.elan[d].gifts.splice(index, 1);
  }
  updateSpendingOptions(c);
  localStorage['character.'+c.name] = JSON.stringify(c);
}

function updateSpendingOptions(character) {
  updateDpSpendingOptions(character);
  updateCharacteristicLevelBonusSpendingOptions(character);
  updateSecondaryAbilityLevelBonusSpendingOptions(character);
  updateCpSpendingOptions(character);
  updateElanSpendingOptions(character);
}

function updateDpSpendingOptions(character) {
  var DP = character.DP;
  var investments = gatherInvestments(character, 'dpInvested');

  $('#Total_DP').html(DP);

  for (let i in investments) {
    var maxForInvestment = investments[i].dpInvested + character.DP;
    var investmentDOM = $(document.getElementById(investments[i].name.replace(/\s/g, "_") + ":DP"));
    investmentDOM.find("input").attr({'max': maxForInvestment});
    investmentDOM.children(".score").html(investments[i].score);
  }
}

function updateCharacteristicLevelBonusSpendingOptions(character) {
  var characteristicLevelBonuses = character.characteristicLevelBonuses;
  var investments = gatherInvestments(character, 'characteristicLevelBonusesInvested');

  $('#Total_Level_Bonuses').html(characteristicLevelBonuses);

  for (let i in investments) {
    var maxForInvestment = investments[i].characteristicLevelBonusesInvested + characteristicLevelBonuses;
    var investmentDOM = $(document.getElementById(investments[i].name.replace(/\s/g, "_") + ":CB"));
    investmentDOM.find("input").attr({'max': maxForInvestment});
    investmentDOM.children(".score").html(investments[i].score);
    investmentDOM.children(".modifier").html(investments[i].modifier);
  }
}

function updateSecondaryAbilityLevelBonusSpendingOptions(character) {
  var secondaryAbilityLevelBonuses = character.secondaryAbilityLevelBonuses;
  var investments = gatherInvestments(character, 'secondaryAbilityLevelBonusesInvested');

  $('#Total_Natural_Bonuses').html(secondaryAbilityLevelBonuses);

  for (let i in investments) {
    var maxForInvestment = investments[i].secondaryAbilityLevelBonusesInvested + secondaryAbilityLevelBonuses;
    var investmentDOM = $(document.getElementById(investments[i].name.replace(/\s/g, "_") + ":NB"));
    investmentDOM.find("input").attr({'max': maxForInvestment});
    investmentDOM.children(".score").html(investments[i].score);
  }
}

function updateCpSpendingOptions(character) {
  $('#Total_CP').html(character.CP);

  for (let i in ADVANTAGE_DATA) {
    var advantageData = ADVANTAGE_DATA[i];
    var advantageDOM = $(document.getElementById(advantageData.name.replace(/\s/g, "_") + ":CP"));
    advantageDOM.find(".cost").html(advantageCost(character, i));
    advantageDOM.find("input").attr({
      "checked": hasAdvantage(character, i),
      "disabled": !canAffordAdvantage(character, i)});
  }
}

function updateElanSpendingOptions(character) {
  for (let d in Elan.Data) {
    let table = $('#' + Elan.Data[d].name + 'Group .gifts').first();
    let totalElanSpent = 0;
    for (let i in character.elan[d].gifts) {
      var giftKey = character.elan[d].gifts[i];
      totalElanSpent += Elan.Data[d].gifts[giftKey].cost;
    }

    let i=0;
    for (let g in Elan.Data[d].gifts) {
      let gift = Elan.Data[d].gifts[g];
      let input = table.find('.gift input')[i];
      $(input).attr('checked', character.elan[d].gifts.includes(g));
      $(input).attr('disabled', !character.elan[d].gifts.includes(g) 
        && (gift.cost > (character.elan[d].elanBonus - totalElanSpent)
          || gift.requiredElan > character.elan[d].elanBonus));
      i++;
    }
  }
}
