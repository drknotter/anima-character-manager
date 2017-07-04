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
}

function gatherInvestments(data, Type) {
  if (!data) {
    return [];
  }

  var gathered = [];
  for (let i in data) {
    if (data[i] instanceof Type) {
      gathered.push(data[i]);
    } else if (data[i] instanceof Object) {
      var gatheredFromChild = gatherInvestments(data[i], Type);
      for (let j in gatheredFromChild) {
        gathered.push(gatheredFromChild[j]);
      }
    }
  }
  return gathered;
}

$( document ).ready(function() {
  var character = new Character(JSON.parse(localStorage['character.'+characterName]));
  renderSpendingOptions(character);
});

function renderSpendingOptions(character) {
  var DP = character.DP;
  var investments = gatherInvestments(character, DPInvestment);


  $('#content').html(Mustache.render(Template.spendingOptionGroup, {
    'optionName': 'Spend DP', 
    'total': character.DP,
    'totalId': 'Total_DP',
  }));
  $('#content').children('.spendingOptionGroup .header .total').last();
  var spendingOptionTable = $('#content .spendingOptionGroup>table').last();
  for (let i in investments) {
    renderSpendingOption(character, investments[i], spendingOptionTable);
  }
}

function renderSpendingOption(character, investment, parent) {
  parent.append(Mustache.render(Template.dpInvestment, investment));
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
  var investments = gatherInvestments(character, DPInvestment);

  var foo = $('#Total_DP');
  foo.html(DP);
}

