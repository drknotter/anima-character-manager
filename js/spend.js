var characterName = 'Oras';
var PRIMARY_DP_SPEND_GROUPS = {
  'combat': {
    'name': 'Combat Abilities',
    'abilities': [
      'attack',
      'block',
      'dodge',
      'wearArmor',
      'ki',
      'kiAccumulationMultiple',
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

$( document ).ready(function() {
  var character = new Character(JSON.parse(localStorage['character.'+characterName]));
  renderDpSpendingOptionGroups(character);
});

function renderDpSpendingOptionGroups(character) {
  renderDpOptionSpendingGroup(character);
  renderCharacteristicLevelBonusSpendingGroup(character);
  renderSecondaryAbilityLevelBonusSpendingGroup(character);
  renderPpSpendingGroup(character);
  renderCpSpendingGroup(character);
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
  subgroup.append(Mustache.render(Template.cpInvestmentHeader, {'name': 'Advantages'}));
  for (let i in ADVANTAGES) {
    renderCpSpendingOption(character, ADVANTAGES[i], subgroup);
  }

  spendingOptionGroup.append(Mustache.render(Template.spendingOptionSubgroup));
  var subgroup = spendingOptionGroup.children('.spendingOptionSubgroup').last();
  subgroup.append(Mustache.render(Template.cpInvestmentHeader, {'name': 'Disadvantages'}));
  for (let i in DISADVANTAGES) {
    renderCpSpendingOption(character, DISADVANTAGES[i], subgroup);
  }
  spendingOptionGroup.toggle();
}

function renderCpSpendingOption(character, advantageKey, parent) {
  var advantage = ADVANTAGE_DATA[advantageKey];
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
    cost = cpInvested;
  } else if (advantage.minCost == advantage.maxCost) {
    cost = advantage.minCost;
  } else {
    cost = advantage.minCost + " - " + advantage.maxCost;
  }

  var data = {'name': advantage.name, 'cost': cost};
  parent.append(Mustache.render(Template.cpInvestment, data));
  parent.children('.cpInvestment').last().attr('id', advantage.name.replace(/\s/g, "_") + ":CP");
  $('.obtained>input').last().attr("checked", cpInvested != null);
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
  var advantage = ADVANTAGE_DATA[advantageKey];
  var character = event.data.character;

  var isAdvantage = advantageKey in ADVANTAGES;
  var hasAdvantage = advantageKey in character.advantages;
  var hasDisadvantage = advantageKey in character.disadvantages;

  if (hasAdvantage) {
    delete character.advantages[advantageKey];
  } else if (hasDisadvantage) {
    delete character.disadvantages[advantageKey];
  } else {
    character.advantages[advantageKey] = new Advantage(advantage);
  }

  updateSpendingOptions(character);
  localStorage['character.'+character.name] = JSON.stringify(character);
}

function updateSpendingOptions(character) {
  updateDpSpendingOptions(character);
  updateCharacteristicLevelBonusSpendingOptions(character);
  updateSecondaryAbilityLevelBonusSpendingOptions(character);
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
