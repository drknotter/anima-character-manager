$( document ).ready(function() {
  var orasData = {
    'name':'Oras',
    'exp':610,
    'class':'mentalist',
    'appearance':5,
    'height':"5'2'\"",
    'weight':"100lbs",
    'characteristics':{
      'str':{'base': 4},
      'agi':{'base': 7},
      'dex':{'base': 9},
      'con':{'base': 6},
      'int':{'base': 7, 'bonuses':[{'bonus':1}]},
      'pow':{'base': 7},
      'wp':{'base': 10, 'bonuses':[{'bonus':1}]},
      'per':{'base': 9},
    },
    'primaryAbilities':{
      'attack':{'dpInvested':0},
      'block':{'dpInvested':0},
      'dodge':{'dpInvested':0},
      'wearArmor':{'dpInvested':0},
      'ki':{'dpInvested':0},
      'kiAccumulationMultiple':{'dpInvested':0},
      'zeon':{'dpInvested':0},
      'magicAccumulationMultiple':{'dpInvested':0},
      'magicProjection':{'dpInvested':0},
      'summon':{'dpInvested':0},
      'control':{'dpInvested':0},
      'bind':{'dpInvested':0},
      'banish':{'dpInvested':0},
      'psychicPoints':{'dpInvested':0},
      'psychicProjection':{'dpInvested':0},
      'martialKnowledge':{'dpInvested':0},
    },
    'secondaryAbilities':{
      'acrobatics':{'dpInvested':0},
      'athleticism':{'dpInvested':0},
      'climb':{'dpInvested':0},
      'jump':{'dpInvested':0},
      'ride':{'dpInvested':0},
      'swim':{'dpInvested':0},
      'intimidate':{'dpInvested':0},
      'leadership':{'dpInvested':0},
      'persuasion':{'dpInvested':0},
      'style':{'dpInvested':0},
      'notice':{'dpInvested':0},
      'search':{'dpInvested':0},
      'track':{'dpInvested':0},
      'animals':{'dpInvested':0},
      'appraisal':{'dpInvested':0},
      'herbalLore':{'dpInvested':0},
      'history':{'dpInvested':0},
      'magicAppraisal':{'dpInvested':0},
      'medicine':{'dpInvested':0},
      'memorize':{'dpInvested':0},
      'navigation':{'dpInvested':0},
      'occult':{'dpInvested':0},
      'sciences':{'dpInvested':0},
      'composure':{'dpInvested':0},
      'withstandPain':{'dpInvested':0},
      'featsOfStrength':{'dpInvested':0},
      'theft':{'dpInvested':0},
      'disguise':{'dpInvested':0},
      'hide':{'dpInvested':0},
      'stealth':{'dpInvested':0},
      'trapLore':{'dpInvested':0},
      'lockPicking':{'dpInvested':0},
      'poisons':{'dpInvested':0},
      'art':{'dpInvested':0},
      'dance':{'dpInvested':0},
      'music':{'dpInvested':0},
      'sleightOfHand':{'dpInvested':0},
      'forging':{'dpInvested':0},
    },
    'lifePointMultiple':{'dpInvested':0},
    'currentLifePoints':100,
  }

  oras = new Character(orasData);

  renderCharacter(oras);
});

function renderCharacter(character) {
  $('body').html(Mustache.render(Template.character, character));
  $('#title').html(Mustache.render(Template.title, character));
  for (let i in character.characteristics) {
    $('#characteristics > table').append(Mustache.render(Template.characteristic, character.characteristics[i]));
  }
  for (let i in character.primaryAbilities) {
    $('#primaryAbilities > table').append(Mustache.render(Template.primaryAbilities, character.primaryAbilities[i]));
  }
}