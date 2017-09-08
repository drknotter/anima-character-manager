var PRIMARY_DP_SPEND_GROUPS = {
  'combat': {
    'name': 'Combat',
    'abilities': [
      'attack',
      'block',
      'dodge',
      'wearArmor',
      'ki_str',
      'ki_agi',
      'ki_dex',
      'ki_con',
      'ki_pow',
      'ki_wp',
      'kiAccumulation_str',
      'kiAccumulation_agi',
      'kiAccumulation_dex',
      'kiAccumulation_con',
      'kiAccumulation_pow',
      'kiAccumulation_wp',
    ],
  },
  'supernatural': {
    'name': 'Supernatural',
    'abilities': [
      'zeon',
      'magicAccumulation',
      'magicProjection',
      'summon',
      'control',
      'bind',
      'banish',
    ],
  },
  'psychic': {
    'name': 'Psychic',
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

var OPTION_GROUP_IDS = [
'dpSpendingOptionGroup',
'combatDpSpendingOptionGroup',
'supernaturalDpSpendingOptionGroup',
'psychicDpSpendingOptionGroup',
'otherDpSpendingOptionGroup',
'characteristicLevelBonusSpendingOptionGroup',
'secondaryAbilityLevelBonusSpendingOptionGroup',
'ppSpendingOptionGroup',
'cpSpendingOptionGroup',
'elanSpendingOptionGroup',
'martialKnowledgeSpendingOptionGroup'
];

function totalDpInvestedInTypes(character) {
  var totalDpInvestedInTypes = {'combat': 0, 'supernatural': 0, 'psychic': 0};
  for (let type in totalDpInvestedInTypes) {
    for (let i in PRIMARY_DP_SPEND_GROUPS[type].abilities) {
      totalDpInvestedInTypes[type] += character.primaryAbilities[PRIMARY_DP_SPEND_GROUPS[type].abilities[i]].dpInvested;
    }
    for (let i in character.combatModules) {
      if (character.combatModules[i].type === type) {
        totalDpInvestedInTypes[type] += character.combatModules[i].dpInvested;
      }
    }
  }
  return totalDpInvestedInTypes;
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

function hasAffinityWithDiscipline(character, disciplineName) {
  for (let m in character.mentalPowers) {
    if (character.mentalPowers[m].discipline == disciplineName) {
      return true;
    }
  }
  return false;
}

function allMentalPowersByDiscipline() {
    var allMentalPowersByDiscipline = {};
  for (let m in MentalPower.Data) {
    if (!(MentalPower.Data[m].discipline in allMentalPowersByDiscipline)) {
      allMentalPowersByDiscipline[MentalPower.Data[m].discipline] = [];
    }
    allMentalPowersByDiscipline[MentalPower.Data[m].discipline].push({
      'key': m,
      'level': MentalPower.Data[m].level,
      'name': MentalPower.Data[m].name
    });
  }

  for (let d in allMentalPowersByDiscipline) {
    allMentalPowersByDiscipline[d].sort(function(a, b) {
      if (a.level != b.level) {
        return a.level - b.level;
      }
      return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
    });
  }

  return allMentalPowersByDiscipline;
}

function modulesByType() {
  var modulesByType = {};
  for (let i in CombatModule.Data) {
    if (!(CombatModule.Data[i].type in modulesByType)) {
      modulesByType[CombatModule.Data[i].type] = [];
    }
    modulesByType[CombatModule.Data[i].type].push(i);
  }
  for (let i in modulesByType) {
    modulesByType[i].sort(function(a, b) {
      return CombatModule.Data[a].name < CombatModule.Data[b].name ? -1
          : (CombatModule.Data[a].name > CombatModule.Data[b].name ? 1 : 0);
    });
  }
  return modulesByType;
}
function moduleNameForType(type) {
  if (type === 'combat') {
    return 'Combat Modules';
  }
  if (type === 'supernatural') {
    return 'Supernatural Modules';
  }
  if (type === 'psychic') {
    return 'Psychic Modules';
  }
}

jQuery.fn.getPath = function () {
    if (this.length != 1) throw 'Requires one element.';

    var path, node = this;
    while (node.length) {
        var realNode = node[0], name = realNode.localName;
        if (!name) break;
        name = name.toLowerCase();

        var parent = node.parent();

        var siblings = parent.children(name);
        if (siblings.length > 1) { 
            name += ':eq(' + siblings.index(realNode) + ')';
        }

        path = name + (path ? '>' + path : '');
        node = parent;
    }

    return path;
};

$( document ).ready(function() {
  var characterName = getParameterByName("n");
  var character = new Character(JSON.parse(localStorage['character.'+characterName]));
  renderSpendingOptionGroups(character);
  $('#popupBackground').click(function() {
    $('#popupBackground').hide();
  });
  $('#popup').click(function(event) {
    event.stopPropagation();
  });
});

function renderSpendingOptionGroups(character, toggle) {
  renderDpOptionSpendingGroup(character);
  renderCharacteristicLevelBonusSpendingGroup(character);
  renderSecondaryAbilityLevelBonusSpendingGroup(character);
  renderMartialKnowledgeSpendingGroup(character);
  renderPpSpendingGroup(character);
  renderCpSpendingGroup(character);
  renderElanSpendingGroup(character);

  for (let i in OPTION_GROUP_IDS) {
    if (!toggle || !(OPTION_GROUP_IDS[i] in toggle) || toggle[OPTION_GROUP_IDS[i]]) {
      $('#'+OPTION_GROUP_IDS[i]).toggle();
    }
  }
}

/////////////////////////
// DP spending options //
/////////////////////////

function renderDpOptionSpendingGroup(character) {
  var DP = character.DP;
  var totals = totalDpInvestedInTypes(character);

  appendBox($('#content'), 'dpSpendingOptionGroup', true, Mustache.render(Template.spendingOptionGroupHeader, {
    'optionName': 'Development Points', 
    'total': character.DP,
    'totalId': 'Total_DP',
  }));

  var spendingOptionGroup = $('#dpSpendingOptionGroup');
  spendingOptionGroup.attr('class', 'spendingOptionGroup');

  var index = 0;
  for (let i in PRIMARY_DP_SPEND_GROUPS) {
    var limit = Math.floor(character.class.limits[i] * 100);
    appendBox(spendingOptionGroup, i+'DpSpendingOptionGroup', true, Mustache.render(Template.spendingOptionGroupHeader, {
      'optionName': PRIMARY_DP_SPEND_GROUPS[i].name + " (Limit " + limit + "%)",
      'total': Math.min(DP, character.totalDP * limit / 100 - totals[i]),
    }));
    var investments = [];
    for (let j in PRIMARY_DP_SPEND_GROUPS[i].abilities) {
      investments.push(character.primaryAbilities[PRIMARY_DP_SPEND_GROUPS[i].abilities[j]]);
    }
    renderDpSpendingOptionSubgroup(character, investments, 'Abilities', $('#'+i+'DpSpendingOptionGroup'), limit, totals[i]);
    renderModuleSubgroup(character, modulesByType()[i], 'Modules', $('#'+i+'DpSpendingOptionGroup'), limit, totals[i]);
  }

  appendBox(spendingOptionGroup, 'otherDpSpendingOptionGroup', true, Mustache.render(Template.spendingOptionGroupHeader, {
    'optionName': 'Other (No Limit)',
    'total': DP,
  }));
  var investments = [];
  for (let i in SECONDARY_DP_SPEND_GROUP.abilities) {
    investments.push(character.secondaryAbilities[SECONDARY_DP_SPEND_GROUP.abilities[i]]);
  }
  renderDpSpendingOptionSubgroup(character, investments, SECONDARY_DP_SPEND_GROUP.name, $('#otherDpSpendingOptionGroup'));

  var investments = [];
  for (let i in OTHER_DP_SPEND_GROUP.abilities) {
    investments.push(character.otherAbilities[OTHER_DP_SPEND_GROUP.abilities[i]]);
  }
  renderDpSpendingOptionSubgroup(character, investments, OTHER_DP_SPEND_GROUP.name, $('#otherDpSpendingOptionGroup'));

  renderMartialArtsOptionSubgroup(character, $('#otherDpSpendingOptionGroup'));
}

function renderDpSpendingOptionSubgroup(character, investments, subgroupName, parent, limit, total) {
  parent.append(Mustache.render(Template.spendingOptionSubgroup));
  var subgroup = parent.children('.spendingOptionSubgroup').last();
  subgroup.append(Mustache.render(Template.dpInvestmentHeader, {'name': subgroupName}))
  for (let i in investments) {
    renderDpSpendingOption(character, investments[i], subgroup, limit, total);
  }
}

function renderDpSpendingOption(character, investment, parent, limit, total) {
  var maxForInvestment = investment.dpInvested + character.DP;
  if (limit) {
    maxForInvestment = Math.min(maxForInvestment, investment.dpInvested + (character.totalDP * limit / 100 - total));
  }
  var data = {
    'investment': investment, 
    'maxForInvestment': maxForInvestment,
    'bonusForInvestment': investment.name == "Magic Accumulation" ? investment.baseBonus : investment.bonus
  };
  parent.append(Mustache.render(Template.dpInvestment, data));
  $('.dpInvested>input').last().change({'investment': investment, 'character': character}, function(event) {
    changeDP(event, Number(this.value));
  });
}

function renderModuleSubgroup(character, modules, subgroupName, parent, limit, total) {
  parent.append(Mustache.render(Template.spendingOptionSubgroup));
  var subgroup = parent.children('.spendingOptionSubgroup').last();
  subgroup.append(Mustache.render(Template.moduleInvestmentHeader, {'name': subgroupName}));
  for (let i in modules) {
    renderModule(character, modules[i], subgroup, limit, total);
  }
}

function renderModule(character, moduleKey, parent, limit, total) {
  var module = CombatModule.Data[moduleKey];
  var hasModule = moduleKey in character.combatModules;
  var cost = character.classId === "weaponmaster" && module.type === "combat" ? Math.floor(module.cost / 2) : module.cost;
  var canAfford = character.DP >= cost && total + cost <= character.totalDP * limit / 100;

  parent.append(Mustache.render(Template.moduleInvestment, {
    'name': module.name,
    'cost': cost
  }));
  var dpInvestment = parent.children('.dpInvestment').last();
  var obtainedInput = dpInvestment.find('.obtained input').last();
  obtainedInput.attr({
    'checked': hasModule,
    'disabled': !hasModule && !canAfford
  });
  obtainedInput.change({'key': moduleKey, 'character': character}, function(event) {
    changeModule(event, $(this).is(":checked"));
  });

  dpInvestment.find('.name').last().click(function(event) {
    CombatModule.RenderPopup(moduleKey, $('#popup'), $('#popupBackground'));
  })
}

function renderMartialArtsOptionSubgroup(character, parent) {
  parent.append(Mustache.render(Template.spendingOptionSubgroup));
  var subgroup = parent.children('.spendingOptionSubgroup').last();
  subgroup.append(Mustache.render(Template.martialArtInvestmentHeader, {'name': 'Martial Arts'}))
  for (let i in MartialArt.Data) {
    renderMartialArt(character, i, subgroup);
  }
}

function renderMartialArt(character, key, parent) {
  var data = MartialArt.Data[key];
  var cost = MartialArt.CostFor(character);
  var hasMartialArt = key in character.martialArts;
  parent.append(Mustache.render(Template.martialArtInvestment, {
    'name': data.name,
    'cost': cost,
    'damage': data.baseDamageFn(character)
  }));
  var dpInvestment = parent.children('.dpInvestment').last();
  var obtainedInput = dpInvestment.find('.obtained input').last();
  var requirements = MartialArt.RequirementFor(character, key);
  obtainedInput.attr({
    'checked': hasMartialArt,
    'disabled': !hasMartialArt && requirements != null
  });
  if (obtainedInput.is(':disabled')) {
    dpInvestment.find('.obtained .disabledInterceptor').last().click(function(event) {
      alert(requirements);
    });
  } else {
    dpInvestment.find('.obtained .disabledInterceptor').last().remove();
  }

  obtainedInput.change({'key': key, 'character': character}, function(event) {
    changeMartialArt(event, $(this).is(":checked"));
  });

  dpInvestment.find('.name').last().click(function(event) {
    MartialArt.RenderPopup(key, $('#popup'), $('#popupBackground'));
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
    subgroup.children('.characteristicLevelBonusInvestment').last().attr('id', character.characteristics[i].name.replace(/\s/g, "_") + "_CB");
    $('.characteristicLevelBonusesInvested>input').last().change({'characteristic': character.characteristics[i], 'character': character}, function(event) {
      changeCharacteristicLevelBonuses(event, Number(this.value));
    });
  }
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
    subgroup.children('.secondaryAbilityLevelBonusInvestment').last().attr('id', character.secondaryAbilities[i].name.replace(/\s/g, "_") + "_NB");
    $('.secondaryAbilityLevelBonusesInvested>input').last().change({'ability': character.secondaryAbilities[i], 'character': character}, function(event) {
      changeSecondaryAbilityLevelBonuses(event, Number(this.value));
    });
  }
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
}

function renderCpSpendingOption(character, advantageKey, parent) {
  var advantage = ADVANTAGE_DATA[advantageKey];

  var data = {'name': advantage.name, 'cost': advantageCost(character, advantageKey)};
  parent.append(Mustache.render(Template.cpInvestment, data));
  parent.children('.cpInvestment').last().attr('id', advantage.name.replace(/\s/g, "_") + "_CP");
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

  spendingOptionGroup.append(Mustache.render(Template.spendingOptionSubgroup));
  var subgroup = spendingOptionGroup.children('.spendingOptionSubgroup').last();
  subgroup.append(Mustache.render(Template.nonMentalPowerPPInvestments, character));
  $('#psychicPotentialInvestment input').first().change({'key': 'psychicPotential', 'character': character}, function(event) {
    changePP(event, Number($(this).val()));
  })
  $('#psychicPotentialInvestment input').first().attr('max', character.psychicPotential.ppInvested + PP);
  $('#innateSlotsInvestment input').first().change({'key': 'innateSlots', 'character': character}, function(event) {
    changePP(event, Number($(this).val()));
  })
  $('#innateSlotsInvestment input').first().attr('max', character.innateSlots.ppInvested + PP);

  var disciplines = allMentalPowersByDiscipline();
  for (let d in disciplines) {
    renderMentalPowerDisciplineSpendingGroup(spendingOptionGroup, character, d, disciplines[d]);
  }
}

function renderMentalPowerDisciplineSpendingGroup(parent, character, disciplineName, discipline) {
  parent.append(Mustache.render(Template.spendingOptionSubgroup));
  var subgroup = parent.children('.spendingOptionSubgroup').last();
  subgroup.attr('id', disciplineName.replace(/\s/g, "_") + "_MentalDiscipline")

  subgroup.append(Mustache.render(Template.mentalDisciplineHeader, {'name': disciplineName}));
  subgroup.find('input.affinity').last().attr({
    'checked': hasAffinityWithDiscipline(character, disciplineName),
    'disabled': true
  });

  for (let m in discipline) {
    renderMentalPower(subgroup, character, discipline[m].key);
  }
}

function renderMentalPower(parent, character, mentalPowerKey) {
  if (mentalPowerKey in character.mentalPowers) {
    parent.append(Mustache.render(Template.mentalPower, character.mentalPowers[mentalPowerKey]));
  } else {
    parent.append(Mustache.render(Template.mentalPower, MentalPower.Data[mentalPowerKey]));
  }
  parent.find('.mentalPower').last().attr('id', mentalPowerKey + "_MentalPower");
  $('#' + mentalPowerKey + "_MentalPower").find('.name').click(function(event) {
    MentalPower.RenderPopup(mentalPowerKey, $('#popup'), $('#popupBackground'));
  });
  var obtainedMentalPower = $('#' + mentalPowerKey + "_MentalPower").find('.obtainedMentalPower')
  var mentalPowerInvestment = $('#' + mentalPowerKey + "_MentalPower").find('.mentalPowerInvestment');
  var disabledInterceptor = $('#' + mentalPowerKey + "_MentalPower").find('.disabledInterceptor');
  var PP = character.primaryAbilities.psychicPoints.score;
  var hasMentalPower = mentalPowerKey in character.mentalPowers;
  obtainedMentalPower.attr('checked', hasMentalPower);

  var requirements = MentalPower.RequirementFor(character, mentalPowerKey);
  obtainedMentalPower.attr('disabled', !hasMentalPower && requirements != null);
  if (requirements != null) {
    disabledInterceptor.click(function(event) {
      alert(requirements);
    });
  } else {
    disabledInterceptor.remove();
  }
  obtainedMentalPower.change(function(event) {
    changeMentalPower(character, mentalPowerKey, $(this).is(":checked"), Number(mentalPowerInvestment.val()));
  });
  mentalPowerInvestment.attr('disabled', !hasMentalPower);
  mentalPowerInvestment.change(function(event) {
    changeMentalPower(character, mentalPowerKey, obtainedMentalPower.is(":checked"), Number($(this).val()));
  });
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
    table.find('.name').last().click(function(event) {
      Elan.RenderGiftPopup(deityKey, i, $('#popup'), $('#popupBackground'));
    })
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

////////////////////////////////////////
// Martial Knowledge spending options //
////////////////////////////////////////

function renderMartialKnowledgeSpendingGroup(character) {
  var MK = character.martialKnowledge.score;
  appendBox($('#content'), 'martialKnowledgeSpendingOptionGroup', true, Mustache.render(Template.spendingOptionGroupHeader, {
    'optionName': 'Martial Knowledge',
    'total': MK,
    'totalId': 'Total_MK',
  }));

  renderKiAbilitiesSpendingSubgroup(character, $('#martialKnowledgeSpendingOptionGroup'));
  renderKiTechniquesSpendingSubgroup(character, $('#martialKnowledgeSpendingOptionGroup'));
}

function renderKiAbilitiesSpendingSubgroup(character, parent) {
  parent.append(Mustache.render(Template.spendingOptionSubgroup));
  var subgroup = parent.children('.spendingOptionSubgroup').last();
  subgroup.append(Mustache.render(Template.kiInvestmentHeader, {'name': 'Ki Abilities'}));
  for (let i in KiAbility.Data) {
    renderKiAbility(character, i, subgroup);
  }
}

function renderKiAbility(character, key, parent) {
  var abilityData = KiAbility.Data[key];
  var hasKiAbility = key in character.kiAbilities;

  parent.append(Mustache.render(Template.kiAbility, {
    'name': abilityData.name,
    'cost': abilityData.martialKnowledge,
  }));

  var kiInvestment = parent.children('.kiInvestment').last();
  var obtainedInput = kiInvestment.find('.obtained input').last();
  var requirements = KiAbility.RequirementFor(character, key);
  obtainedInput.attr({
    'checked': hasKiAbility,
    'disabled': !hasKiAbility && requirements != null
  });
  if (obtainedInput.is(':disabled')) {
    kiInvestment.find('.obtained .disabledInterceptor').last().click(function(event) {
      alert(requirements);
    });
  } else {
    kiInvestment.find('.obtained .disabledInterceptor').last().remove();
  }

  obtainedInput.change({'key': key, 'character': character}, function(event) {
    changeKiAbility(event, $(this).is(':checked'));
  })
}

function renderKiTechniquesSpendingSubgroup(character, parent) {
  parent.append(Mustache.render(Template.spendingOptionSubgroup));
  var subgroup = parent.children('.spendingOptionSubgroup').last();
  subgroup.append(Mustache.render(Template.kiTechniqueList, {'name': character.name}));

  for (let i in character.kiTechniques) {
    let kiTechniqueContainer = $(Mustache.render(Template.kiTechnique, character.kiTechniques[i]).replace(/\r?\n|\r/g,''));
    kiTechniqueContainer.find('.delete').click(function(event) {
      if(confirm('Delete "' + character.kiTechniques[i].name + '"? This cannot be undone!')) {
        character.kiTechniques[i].remove();
        delete character.kiTechniques[i];
        localStorage['character.'+character.name] = JSON.stringify(character);
        window.open("spend.html?n=" + character.name, "_self");
      }
    });
    kiTechniqueContainer.find('.edit').click(function(event) {
      window.open("new_ki_technique.html?n=" + character.name + "&k=" + i, "_self");
    });
    subgroup.find('#kiTechniqueList').append(kiTechniqueContainer);
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

function changeModule(event, obtained) {
  var moduleKey = event.data.key;
  var character = event.data.character;
  if (obtained && !(moduleKey in character.combatModules)) {
    character.combatModules[moduleKey] = new CombatModule(CombatModule.Data[moduleKey], character, moduleKey);
  } else if (!obtained) {
    delete character.combatModules[moduleKey];
  }
  updateSpendingOptions(character);
  localStorage['character.'+character.name] = JSON.stringify(character);
}

function changeMartialArt(event, obtained) {
  var martialArtKey = event.data.key;
  var character = event.data.character;
  if (obtained && !(martialArtKey in character.martialArts)) {
    character.martialArts[martialArtKey] = new MartialArt(character, martialArtKey);
  } else if (!obtained) {
    if (martialArtKey in character.martialArts) {
      character.martialArts[martialArtKey].removeBonusesFromCharacter();
    }
    delete character.martialArts[martialArtKey];
  }
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

function changePP(event, newValue) {
  var key = event.data.key;
  var character = event.data.character;
  character[key].ppInvested = newValue;
  updateSpendingOptions(character);
  localStorage['character.'+character.name] = JSON.stringify(character);
}

function changeMentalPower(character, mentalPowerKey, obtained, ppInvested) {
  if (obtained) {
    if (!(mentalPowerKey in character.mentalPowers)) {
      var mentalPowerData = jQuery.extend({}, MentalPower.Data[mentalPowerKey], {'ppInvested': 0});
      character.mentalPowers[mentalPowerKey] = new MentalPower(mentalPowerData, character, mentalPowerKey);
    }
    character.mentalPowers[mentalPowerKey].ppInvested = ppInvested;
  } else if (!obtained) {
    delete character.mentalPowers[mentalPowerKey];
  }
  updateSpendingOptions(character);
  localStorage['character.'+character.name] = JSON.stringify(character);
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

function changeKiAbility(event, obtained) {
  var c = event.data.character;
  var k = event.data.key;

  if (obtained && !(k in c.kiAbilities)) {
    c.kiAbilities[k] = new KiAbility(c, k);
  } else if (!obtained) {
    delete c.kiAbilities[k];
  }  

  updateSpendingOptions(c);
  localStorage['character.' + c.name] = JSON.stringify(c);
}

function updateSpendingOptions(character) {
  var toggle = {};
  for (let i in OPTION_GROUP_IDS) {
    toggle[OPTION_GROUP_IDS[i]] = $('#' + OPTION_GROUP_IDS[i]).is(':hidden');
  }
  var focusPath = $(document.activeElement).getPath();
  $('#content').empty();
  renderSpendingOptionGroups(character, toggle);
  $(focusPath).focus();
}
