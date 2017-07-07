var characterName = 'Oras';
var PRIMARY_DP_SPEND_GROUPS = {
  'combatAbilities': {
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
  'supernaturalAbilities': {
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
  'pyschicAbilities': {
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
    if (i == key) {
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
  renderSpendingOptionGroups(character);
});

function renderSpendingOptionGroups(character) {
  var DP = character.DP;

  $('#content').html(Mustache.render(Template.spendingOptionGroup, {
    'optionName': 'Development Points', 
    'total': character.DP,
    'totalId': 'Total_DP',
  }));
  $('#content').children('.spendingOptionGroup .header .total').last();
  
  var spendingOptionGroup = $('#content .spendingOptionGroup').last();
  for (let i in PRIMARY_DP_SPEND_GROUPS) {
    var investments = [];
    for (let j in PRIMARY_DP_SPEND_GROUPS[i].abilities) {
      investments.push(character.primaryAbilities[PRIMARY_DP_SPEND_GROUPS[i].abilities[j]]);
    }
    renderSpendingOptionSubgroup(character, investments, PRIMARY_DP_SPEND_GROUPS[i].name, spendingOptionGroup);
  }

  var investments = [];
  for (let i in SECONDARY_DP_SPEND_GROUP.abilities) {
    investments.push(character.secondaryAbilities[SECONDARY_DP_SPEND_GROUP.abilities[i]]);
  }
  renderSpendingOptionSubgroup(character, investments, SECONDARY_DP_SPEND_GROUP.name, spendingOptionGroup);

  var investments = [];
  for (let i in OTHER_DP_SPEND_GROUP.abilities) {
    investments.push(character.otherAbilities[OTHER_DP_SPEND_GROUP.abilities[i]]);
  }
  renderSpendingOptionSubgroup(character, investments, OTHER_DP_SPEND_GROUP.name, spendingOptionGroup);
}

function renderSpendingOptionSubgroup(character, investments, subgroupName, parent) {
  parent.append(Mustache.render(Template.spendingOptionSubgroup, {'name': subgroupName}));
  var subgroup = parent.children('.spendingOptionSubgroup').last();
  for (let i in investments) {
    renderSpendingOption(character, investments[i], subgroup);
  }
}

function renderSpendingOption(character, investment, parent) {
  var maxForInvestment = investment.dpInvested + character.DP;
  var data = {'investment': investment, 'maxForInvestment': maxForInvestment};
  parent.append(Mustache.render(Template.dpInvestment, data));
  parent.children('.dpInvestment').last().attr('id', investment.name.replace(/\s/g, "_"));
  $('.dpInvested>input').last().change({'investment': investment, 'character': character}, function(event) {
    changeDP(event, Number(this.value));
  });
}

function changeDP(event, newValue) {
  var investment = event.data.investment;
  var character = event.data.character;
  investment.dpInvested = newValue;
  updateSpendingOptions(character);
  localStorage['character.'+character.name] = JSON.stringify(character);
}

function updateSpendingOptions(character) {
  var DP = character.DP;
  var investments = gatherInvestments(character, 'dpInvested');

  $('#Total_DP').html(DP);

  for (let i in investments) {
    var maxForInvestment = investments[i].dpInvested + character.DP;
    var investmentDOM = $('#' + investments[i].name.replace(/\s/g, "_"));
    investmentDOM.find("input").attr({'max': maxForInvestment});
    investmentDOM.children(".score").html(investments[i].score);
  }
}
