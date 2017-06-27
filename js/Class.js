class Bonus {
  constructor(data) {
    this.bonus = data.bonus;
    this.cost = data.cost;
    this.currency = data.currency;
  }
}

class Class {
  constructor(data) {
    this.name = data.name;
    this.description = data.description;

    this.archetype = data.archetype;
    this.lifePointMultiple = new Bonus(data.lifePointMultiple);
    this.lifePoints = new Bonus(data.lifePoints);
    this.initiative = new Bonus(data.initiative);

    this.primaryAbilityCosts = {};
    for (var key in data.primaryAbilityCosts) {
      this.primaryAbilityCosts[key] = data.primaryAbilityCosts[key];
    }

    this.secondaryAbilityCosts = {};
    for (var key in data.secondaryAbilityCosts) {
      this.secondaryAbilityCosts[key] = data.secondaryAbilityCosts[key];
    }

    this.innateBonuses = {'primaryAbility':{},'secondaryAbility':{}};
    for (var key in data.innateBonuses.primaryAbility) {
      this.innateBonuses.primaryAbility[key] = new Bonus(data.innateBonuses.primaryAbility[key]);
    }
    for (var key in data.innateBonuses.secondaryAbility) {
      this.innateBonuses.secondaryAbility[key] = new Bonus(data.innateBonuses.secondaryAbility[key]);
    }

  }
}

Class.warrior = new Class({
      'name':'Warrior',
      'description':'No description yet!',
      'archetype':['fighter'],
      'lifePointMultiple':
          {'cost':15,'bonus':1,'currency':'DP'},
      'lifePoints':
          {'cost':1,'bonus':15,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple':
              {'cost':20,'bonus':1,'currency':'DP'},
          'wearArmor':
              {'cost':2,'bonus':1,'currency':'DP'},
          'zeon':
              {'cost':3,'bonus':5,'currency':'DP'},
          'magicAccumulationMultiple':
              {'cost':70,'bonus':1,'currency':'DP'},
          'magicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
          'summon':
              {'cost':3,'bonus':1,'currency':'DP'},
          'control':
              {'cost':3,'bonus':1,'currency':'DP'},
          'bind':
              {'cost':3,'bonus':1,'currency':'DP'},
          'banish':
              {'cost':3,'bonus':1,'currency':'DP'},
          'psychicPoints':    {'cost':20,'bonus':1,'currency':'DP'},
          'psychicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
      },
      'secondaryAbilityCosts':{
          // athletics
          'acrobatics':{'cost':2,'bonus':1,'currency':'DP'},
          'athleticism':{'cost':2,'bonus':1,'currency':'DP'},
          'climb':{'cost':2,'bonus':1,'currency':'DP'},
          'jump':{'cost':2,'bonus':1,'currency':'DP'},
          'ride':{'cost':2,'bonus':1,'currency':'DP'},
          'swim':{'cost':2,'bonus':1,'currency':'DP'},

          // social
          'intimidate':{'cost':2,'bonus':1,'currency':'DP'},
          'leadership':{'cost':2,'bonus':1,'currency':'DP'},
          'persuasion':{'cost':2,'bonus':1,'currency':'DP'},
          'style':{'cost':2,'bonus':1,'currency':'DP'},

          // perceptive
          'notice':{'cost':2,'bonus':1,'currency':'DP'},
          'search':{'cost':2,'bonus':1,'currency':'DP'},
          'track':{'cost':2,'bonus':1,'currency':'DP'},

          // intellectual
          'animals':{'cost':3,'bonus':1,'currency':'DP'},
          'appraisal':{'cost':3,'bonus':1,'currency':'DP'},
          'herbalLore':{'cost':3,'bonus':1,'currency':'DP'},
          'history':{'cost':3,'bonus':1,'currency':'DP'},
          'magicAppraisal':{'cost':3,'bonus':1,'currency':'DP'},
          'medicine':{'cost':3,'bonus':1,'currency':'DP'},
          'memorize':{'cost':3,'bonus':1,'currency':'DP'},
          'navigation':{'cost':3,'bonus':1,'currency':'DP'},
          'occult':{'cost':3,'bonus':1,'currency':'DP'},
          'sciences':{'cost':3,'bonus':1,'currency':'DP'},

          // vigor
          'composure':{'cost':2,'bonus':1,'currency':'DP'},
          'withstandPain':{'cost':2,'bonus':1,'currency':'DP'},
          'featsOfStrength':{'cost':1,'bonus':1,'currency':'DP'},

          // subterfuge
          'theft':{'cost':2,'bonus':1,'currency':'DP'},
          'disguise':{'cost':2,'bonus':1,'currency':'DP'},
          'hide':{'cost':2,'bonus':1,'currency':'DP'},
          'stealth':{'cost':2,'bonus':1,'currency':'DP'},
          'trapLore':{'cost':2,'bonus':1,'currency':'DP'},
          'lockPicking':{'cost':2,'bonus':1,'currency':'DP'},
          'poisons':{'cost':2,'bonus':1,'currency':'DP'},

          // creative
          'art':{'cost':2,'bonus':1,'currency':'DP'},
          'dance':{'cost':2,'bonus':1,'currency':'DP'},
          'music':{'cost':2,'bonus':1,'currency':'DP'},
          'sleightOfHand':{'cost':2,'bonus':1,'currency':'DP'},
          'forging':{'cost':2,'bonus':1,'currency':'DP'},
      },
      'innateBonuses':{
          'primaryAbility': {
              'attack': {'cost':1,'bonus':5,'currency':'level'},
              'block': {'cost':1,'bonus':5,'currency':'level'},
              'wearArmor': {'cost':1,'bonus':5,'currency':'level'},
              'psychicPoints': {'cost':3,'bonus':1,'currency':'level'},
              'martialKnowledge':{'cost':1,'bonus':25,'currency':'level'},
          },
          'secondaryAbility': {
              'featsOfStrength':{'cost':1,'bonus':5,'currency':'level'},
          },
      },
  });

Class.acrobaticWarrior = new Class({
      'name':'Acrobatic Warrior',
      'description':'No description yet!',
      'archetype':['fighter'],
      'lifePointMultiple':
          {'cost':20,'bonus':1,'currency':'DP'},
      'lifePoints':
          {'cost':1,'bonus':10,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':10,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':3,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple':
              {'cost':20,'bonus':1,'currency':'DP'},
          'wearArmor':
              {'cost':2,'bonus':1,'currency':'DP'},
          'zeon':
              {'cost':3,'bonus':5,'currency':'DP'},
          'magicAccumulationMultiple':
              {'cost':70,'bonus':1,'currency':'DP'},
          'magicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
          'summon':
              {'cost':3,'bonus':1,'currency':'DP'},
          'control':
              {'cost':3,'bonus':1,'currency':'DP'},
          'bind':
              {'cost':3,'bonus':1,'currency':'DP'},
          'banish':
              {'cost':3,'bonus':1,'currency':'DP'},
          'psychicPoints':    {'cost':20,'bonus':1,'currency':'DP'},
          'psychicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
      },
      'secondaryAbilityCosts':{
          // athletics
          'acrobatics':{'cost':2,'bonus':1,'currency':'DP'},
          'athleticism':{'cost':2,'bonus':1,'currency':'DP'},
          'climb':{'cost':2,'bonus':1,'currency':'DP'},
          'jump':{'cost':2,'bonus':1,'currency':'DP'},
          'ride':{'cost':2,'bonus':1,'currency':'DP'},
          'swim':{'cost':2,'bonus':1,'currency':'DP'},

          // social
          'intimidate':{'cost':2,'bonus':1,'currency':'DP'},
          'leadership':{'cost':2,'bonus':1,'currency':'DP'},
          'persuasion':{'cost':2,'bonus':1,'currency':'DP'},
          'style':{'cost':2,'bonus':1,'currency':'DP'},

          // perceptive
          'notice':{'cost':2,'bonus':1,'currency':'DP'},
          'search':{'cost':2,'bonus':1,'currency':'DP'},
          'track':{'cost':2,'bonus':1,'currency':'DP'},

          // intellectual
          'animals':{'cost':3,'bonus':1,'currency':'DP'},
          'appraisal':{'cost':3,'bonus':1,'currency':'DP'},
          'herbalLore':{'cost':3,'bonus':1,'currency':'DP'},
          'history':{'cost':3,'bonus':1,'currency':'DP'},
          'magicAppraisal':{'cost':3,'bonus':1,'currency':'DP'},
          'medicine':{'cost':3,'bonus':1,'currency':'DP'},
          'memorize':{'cost':3,'bonus':1,'currency':'DP'},
          'navigation':{'cost':3,'bonus':1,'currency':'DP'},
          'occult':{'cost':3,'bonus':1,'currency':'DP'},
          'sciences':{'cost':3,'bonus':1,'currency':'DP'},

          // vigor
          'composure':{'cost':2,'bonus':1,'currency':'DP'},
          'withstandPain':{'cost':2,'bonus':1,'currency':'DP'},
          'featsOfStrength':{'cost':2,'bonus':1,'currency':'DP'},

          // subterfuge
          'theft':{'cost':2,'bonus':1,'currency':'DP'},
          'disguise':{'cost':2,'bonus':1,'currency':'DP'},
          'hide':{'cost':2,'bonus':1,'currency':'DP'},
          'stealth':{'cost':2,'bonus':1,'currency':'DP'},
          'trapLore':{'cost':2,'bonus':1,'currency':'DP'},
          'lockPicking':{'cost':2,'bonus':1,'currency':'DP'},
          'poisons':{'cost':2,'bonus':1,'currency':'DP'},

          // creative
          'art':{'cost':2,'bonus':1,'currency':'DP'},
          'dance':{'cost':2,'bonus':1,'currency':'DP'},
          'music':{'cost':2,'bonus':1,'currency':'DP'},
          'sleightOfHand':{'cost':2,'bonus':1,'currency':'DP'},
          'forging':{'cost':2,'bonus':1,'currency':'DP'},
      },
      'innateBonuses':{
          'primaryAbility': {
              'attack': {'cost':1,'bonus':5,'currency':'level'},
              'dodge': {'cost':1,'bonus':5,'currency':'level'},
              'martialKnowledge':{'cost':1,'bonus':25,'currency':'level'},
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'acrobatics': {'cost':1,'bonus':10,'currency':'level'},
              'jump': {'cost':1,'bonus':10,'currency':'level'},
              'athleticism': {'cost':1,'bonus':10,'currency':'level'},
              'sleightOfHand': {'cost':1,'bonus':10,'currency':'level'},
              'style': {'cost':1,'bonus':10,'currency':'level'},
          },
      },
  });

Class.paladin = new Class({
      'name':'Paladin',
      'description':'No description yet!',
      'archetype':['fighter'],
      'lifePointMultiple':
          {'cost':15,'bonus':1,'currency':'DP'},
      'lifePoints':
          {'cost':1,'bonus':15,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple':
              {'cost':20,'bonus':1,'currency':'DP'},
          'wearArmor':
              {'cost':2,'bonus':1,'currency':'DP'},
          'zeon':
              {'cost':2,'bonus':5,'currency':'DP'},
          'magicAccumulationMultiple':
              {'cost':60,'bonus':1,'currency':'DP'},
          'magicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
          'summon':
              {'cost':3,'bonus':1,'currency':'DP'},
          'control':
              {'cost':3,'bonus':1,'currency':'DP'},
          'bind':
              {'cost':3,'bonus':1,'currency':'DP'},
          'banish':
              {'cost':1,'bonus':1,'currency':'DP'},
          'psychicPoints':    {'cost':20,'bonus':1,'currency':'DP'},
          'psychicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
      },
      'secondaryAbilityCosts':{
          // athletics
          'acrobatics':{'cost':2,'bonus':1,'currency':'DP'},
          'athleticism':{'cost':2,'bonus':1,'currency':'DP'},
          'climb':{'cost':2,'bonus':1,'currency':'DP'},
          'jump':{'cost':2,'bonus':1,'currency':'DP'},
          'ride':{'cost':2,'bonus':1,'currency':'DP'},
          'swim':{'cost':2,'bonus':1,'currency':'DP'},

          // social
          'intimidate':{'cost':1,'bonus':1,'currency':'DP'},
          'leadership':{'cost':1,'bonus':1,'currency':'DP'},
          'persuasion':{'cost':1,'bonus':1,'currency':'DP'},
          'style':{'cost':1,'bonus':1,'currency':'DP'},

          // perceptive
          'notice':{'cost':2,'bonus':1,'currency':'DP'},
          'search':{'cost':2,'bonus':1,'currency':'DP'},
          'track':{'cost':2,'bonus':1,'currency':'DP'},

          // intellectual
          'animals':{'cost':2,'bonus':1,'currency':'DP'},
          'appraisal':{'cost':2,'bonus':1,'currency':'DP'},
          'herbalLore':{'cost':2,'bonus':1,'currency':'DP'},
          'history':{'cost':2,'bonus':1,'currency':'DP'},
          'magicAppraisal':{'cost':2,'bonus':1,'currency':'DP'},
          'medicine':{'cost':2,'bonus':1,'currency':'DP'},
          'memorize':{'cost':2,'bonus':1,'currency':'DP'},
          'navigation':{'cost':2,'bonus':1,'currency':'DP'},
          'occult':{'cost':2,'bonus':1,'currency':'DP'},
          'sciences':{'cost':2,'bonus':1,'currency':'DP'},

          // vigor
          'composure':{'cost':2,'bonus':1,'currency':'DP'},
          'withstandPain':{'cost':1,'bonus':1,'currency':'DP'},
          'featsOfStrength':{'cost':2,'bonus':1,'currency':'DP'},

          // subterfuge
          'theft':{'cost':3,'bonus':1,'currency':'DP'},
          'disguise':{'cost':3,'bonus':1,'currency':'DP'},
          'hide':{'cost':3,'bonus':1,'currency':'DP'},
          'stealth':{'cost':3,'bonus':1,'currency':'DP'},
          'trapLore':{'cost':3,'bonus':1,'currency':'DP'},
          'lockPicking':{'cost':3,'bonus':1,'currency':'DP'},
          'poisons':{'cost':3,'bonus':1,'currency':'DP'},

          // creative
          'art':{'cost':2,'bonus':1,'currency':'DP'},
          'dance':{'cost':2,'bonus':1,'currency':'DP'},
          'music':{'cost':2,'bonus':1,'currency':'DP'},
          'sleightOfHand':{'cost':2,'bonus':1,'currency':'DP'},
          'forging':{'cost':2,'bonus':1,'currency':'DP'},
      },
      'innateBonuses':{
          'primaryAbility': {
              'block': {'cost':1,'bonus':5,'currency':'level'},
              'wearArmor': {'cost':1,'bonus':10,'currency':'level'},
              'banish': {'cost':1,'bonus':10,'currency':'level'},
              'zeon': {'cost':1,'bonus':20,'currency':'level'},
              'martialKnowledge':{'cost':1,'bonus':20,'currency':'level'},
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'leadership': {'cost':1,'bonus':10,'currency':'level'},
              'withstandPain': {'cost':1,'bonus':10,'currency':'level'},
              'style': {'cost':1,'bonus':5,'currency':'level'},
          },
      },
  });

Class.darkPaladin = new Class({
      'name':'Dark Paladin',
      'description':'No description yet!',
      'archetype':['fighter'],
      'lifePointMultiple':
          {'cost':15,'bonus':1,'currency':'DP'},
      'lifePoints':
          {'cost':1,'bonus':15,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple':
              {'cost':20,'bonus':1,'currency':'DP'},
          'wearArmor':
              {'cost':2,'bonus':1,'currency':'DP'},
          'zeon':
              {'cost':2,'bonus':5,'currency':'DP'},
          'magicAccumulationMultiple':
              {'cost':60,'bonus':1,'currency':'DP'},
          'magicProjection':
              {'cost':1,'bonus':3,'currency':'DP'},
          'summon':
              {'cost':1,'bonus':3,'currency':'DP'},
          'control':
              {'cost':1,'bonus':1,'currency':'DP'},
          'bind':
              {'cost':1,'bonus':3,'currency':'DP'},
          'banish':
              {'cost':1,'bonus':3,'currency':'DP'},
          'psychicPoints':    {'cost':20,'bonus':1,'currency':'DP'},
          'psychicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
      },
      'secondaryAbilityCosts':{
          // athletics
          'acrobatics':{'cost':2,'bonus':1,'currency':'DP'},
          'athleticism':{'cost':2,'bonus':1,'currency':'DP'},
          'climb':{'cost':2,'bonus':1,'currency':'DP'},
          'jump':{'cost':2,'bonus':1,'currency':'DP'},
          'ride':{'cost':2,'bonus':1,'currency':'DP'},
          'swim':{'cost':2,'bonus':1,'currency':'DP'},

          // social
          'intimidate':{'cost':1,'bonus':1,'currency':'DP'},
          'leadership':{'cost':1,'bonus':1,'currency':'DP'},
          'persuasion':{'cost':1,'bonus':1,'currency':'DP'},
          'style':{'cost':1,'bonus':1,'currency':'DP'},

          // perceptive
          'notice':{'cost':2,'bonus':1,'currency':'DP'},
          'search':{'cost':2,'bonus':1,'currency':'DP'},
          'track':{'cost':2,'bonus':1,'currency':'DP'},

          // intellectual
          'animals':{'cost':2,'bonus':1,'currency':'DP'},
          'appraisal':{'cost':2,'bonus':1,'currency':'DP'},
          'herbalLore':{'cost':2,'bonus':1,'currency':'DP'},
          'history':{'cost':2,'bonus':1,'currency':'DP'},
          'magicAppraisal':{'cost':2,'bonus':1,'currency':'DP'},
          'medicine':{'cost':2,'bonus':1,'currency':'DP'},
          'memorize':{'cost':2,'bonus':1,'currency':'DP'},
          'navigation':{'cost':2,'bonus':1,'currency':'DP'},
          'occult':{'cost':2,'bonus':1,'currency':'DP'},
          'sciences':{'cost':2,'bonus':1,'currency':'DP'},

          // vigor
          'composure':{'cost':1,'bonus':1,'currency':'DP'},
          'withstandPain':{'cost':2,'bonus':1,'currency':'DP'},
          'featsOfStrength':{'cost':2,'bonus':1,'currency':'DP'},

          // subterfuge
          'theft':{'cost':2,'bonus':1,'currency':'DP'},
          'disguise':{'cost':2,'bonus':1,'currency':'DP'},
          'hide':{'cost':2,'bonus':1,'currency':'DP'},
          'stealth':{'cost':2,'bonus':1,'currency':'DP'},
          'trapLore':{'cost':2,'bonus':1,'currency':'DP'},
          'lockPicking':{'cost':2,'bonus':1,'currency':'DP'},
          'poisons':{'cost':2,'bonus':1,'currency':'DP'},

          // creative
          'art':{'cost':2,'bonus':1,'currency':'DP'},
          'dance':{'cost':2,'bonus':1,'currency':'DP'},
          'music':{'cost':2,'bonus':1,'currency':'DP'},
          'sleightOfHand':{'cost':2,'bonus':1,'currency':'DP'},
          'forging':{'cost':2,'bonus':1,'currency':'DP'},
      },
      'innateBonuses':{
          'primaryAbility': {
              'attack': {'cost':1,'bonus':5,'currency':'level'},
              'wearArmor': {'cost':1,'bonus':5,'currency':'level'},
              'control': {'cost':1,'bonus':10,'currency':'level'},
              'zeon': {'cost':1,'bonus':20,'currency':'level'},
              'martialKnowledge':{'cost':1,'bonus':20,'currency':'level'},
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'intimidate': {'cost':1,'bonus':10,'currency':'level'},
              'composure': {'cost':1,'bonus':10,'currency':'level'},
              'style': {'cost':1,'bonus':5,'currency':'level'},
              'persuasion': {'cost':1,'bonus':5,'currency':'level'},
          },
      },
  });

Class.weaponmaster = new Class({
      'name':'Weaponmaster',
      'description':'No description yet!',
      'archetype':['fighter'],
      'lifePointMultiple':
          {'cost':10,'bonus':1,'currency':'DP'},
      'lifePoints':
          {'cost':1,'bonus':20,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki':
              {'cost':3,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple':
              {'cost':30,'bonus':1,'currency':'DP'},
          'wearArmor':
              {'cost':1,'bonus':1,'currency':'DP'},
          'zeon':
              {'cost':3,'bonus':5,'currency':'DP'},
          'magicAccumulationMultiple':
              {'cost':70,'bonus':1,'currency':'DP'},
          'magicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
          'summon':
              {'cost':3,'bonus':1,'currency':'DP'},
          'control':
              {'cost':3,'bonus':1,'currency':'DP'},
          'bind':
              {'cost':3,'bonus':1,'currency':'DP'},
          'banish':
              {'cost':3,'bonus':1,'currency':'DP'},
          'psychicPoints':    {'cost':20,'bonus':1,'currency':'DP'},
          'psychicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
      },
      'secondaryAbilityCosts':{
          // athletics
          'acrobatics':{'cost':2,'bonus':1,'currency':'DP'},
          'athleticism':{'cost':2,'bonus':1,'currency':'DP'},
          'climb':{'cost':2,'bonus':1,'currency':'DP'},
          'jump':{'cost':2,'bonus':1,'currency':'DP'},
          'ride':{'cost':2,'bonus':1,'currency':'DP'},
          'swim':{'cost':2,'bonus':1,'currency':'DP'},

          // social
          'intimidate':{'cost':2,'bonus':1,'currency':'DP'},
          'leadership':{'cost':2,'bonus':1,'currency':'DP'},
          'persuasion':{'cost':2,'bonus':1,'currency':'DP'},
          'style':{'cost':2,'bonus':1,'currency':'DP'},

          // perceptive
          'notice':{'cost':2,'bonus':1,'currency':'DP'},
          'search':{'cost':2,'bonus':1,'currency':'DP'},
          'track':{'cost':2,'bonus':1,'currency':'DP'},

          // intellectual
          'animals':{'cost':3,'bonus':1,'currency':'DP'},
          'appraisal':{'cost':3,'bonus':1,'currency':'DP'},
          'herbalLore':{'cost':3,'bonus':1,'currency':'DP'},
          'history':{'cost':3,'bonus':1,'currency':'DP'},
          'magicAppraisal':{'cost':3,'bonus':1,'currency':'DP'},
          'medicine':{'cost':3,'bonus':1,'currency':'DP'},
          'memorize':{'cost':3,'bonus':1,'currency':'DP'},
          'navigation':{'cost':3,'bonus':1,'currency':'DP'},
          'occult':{'cost':3,'bonus':1,'currency':'DP'},
          'sciences':{'cost':3,'bonus':1,'currency':'DP'},

          // vigor
          'composure':{'cost':1,'bonus':1,'currency':'DP'},
          'withstandPain':{'cost':1,'bonus':1,'currency':'DP'},
          'featsOfStrength':{'cost':1,'bonus':1,'currency':'DP'},

          // subterfuge
          'theft':{'cost':3,'bonus':1,'currency':'DP'},
          'disguise':{'cost':3,'bonus':1,'currency':'DP'},
          'hide':{'cost':3,'bonus':1,'currency':'DP'},
          'stealth':{'cost':3,'bonus':1,'currency':'DP'},
          'trapLore':{'cost':3,'bonus':1,'currency':'DP'},
          'lockPicking':{'cost':3,'bonus':1,'currency':'DP'},
          'poisons':{'cost':3,'bonus':1,'currency':'DP'},

          // creative
          'art':{'cost':2,'bonus':1,'currency':'DP'},
          'dance':{'cost':2,'bonus':1,'currency':'DP'},
          'music':{'cost':2,'bonus':1,'currency':'DP'},
          'sleightOfHand':{'cost':2,'bonus':1,'currency':'DP'},
          'forging':{'cost':2,'bonus':1,'currency':'DP'},
      },
      'innateBonuses':{
          'primaryAbility': {
              'attack': {'cost':1,'bonus':5,'currency':'level'},
              'block': {'cost':1,'bonus':5,'currency':'level'},
              'wearArmor': {'cost':1,'bonus':10,'currency':'level'},
              'martialKnowledge':{'cost':1,'bonus':10,'currency':'level'},
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'featsOfStrength': {'cost':1,'bonus':5,'currency':'level'},
          },
      },
  });

Class.technician = new Class({
      'name':'Technician',
      'description':'No description yet!',
      'archetype':['domine'],
      'lifePointMultiple':
          {'cost':20,'bonus':1,'currency':'DP'},
      'lifePoints':
          {'cost':1,'bonus':5,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki':
              {'cost':1,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple':
              {'cost':10,'bonus':1,'currency':'DP'},
          'wearArmor':
              {'cost':2,'bonus':1,'currency':'DP'},
          'zeon':
              {'cost':3,'bonus':5,'currency':'DP'},
          'magicAccumulationMultiple':
              {'cost':70,'bonus':1,'currency':'DP'},
          'magicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
          'summon':
              {'cost':3,'bonus':1,'currency':'DP'},
          'control':
              {'cost':3,'bonus':1,'currency':'DP'},
          'bind':
              {'cost':3,'bonus':1,'currency':'DP'},
          'banish':
              {'cost':3,'bonus':1,'currency':'DP'},
          'psychicPoints':    {'cost':20,'bonus':1,'currency':'DP'},
          'psychicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
      },
      'secondaryAbilityCosts':{
          // athletics
          'acrobatics':{'cost':2,'bonus':1,'currency':'DP'},
          'athleticism':{'cost':2,'bonus':1,'currency':'DP'},
          'climb':{'cost':2,'bonus':1,'currency':'DP'},
          'jump':{'cost':2,'bonus':1,'currency':'DP'},
          'ride':{'cost':2,'bonus':1,'currency':'DP'},
          'swim':{'cost':2,'bonus':1,'currency':'DP'},

          // social
          'intimidate':{'cost':2,'bonus':1,'currency':'DP'},
          'leadership':{'cost':2,'bonus':1,'currency':'DP'},
          'persuasion':{'cost':2,'bonus':1,'currency':'DP'},
          'style':{'cost':2,'bonus':1,'currency':'DP'},

          // perceptive
          'notice':{'cost':2,'bonus':1,'currency':'DP'},
          'search':{'cost':2,'bonus':1,'currency':'DP'},
          'track':{'cost':2,'bonus':1,'currency':'DP'},

          // intellectual
          'animals':{'cost':3,'bonus':1,'currency':'DP'},
          'appraisal':{'cost':3,'bonus':1,'currency':'DP'},
          'herbalLore':{'cost':3,'bonus':1,'currency':'DP'},
          'history':{'cost':3,'bonus':1,'currency':'DP'},
          'magicAppraisal':{'cost':3,'bonus':1,'currency':'DP'},
          'medicine':{'cost':3,'bonus':1,'currency':'DP'},
          'memorize':{'cost':3,'bonus':1,'currency':'DP'},
          'navigation':{'cost':3,'bonus':1,'currency':'DP'},
          'occult':{'cost':3,'bonus':1,'currency':'DP'},
          'sciences':{'cost':3,'bonus':1,'currency':'DP'},

          // vigor
          'composure':{'cost':2,'bonus':1,'currency':'DP'},
          'withstandPain':{'cost':2,'bonus':1,'currency':'DP'},
          'featsOfStrength':{'cost':2,'bonus':1,'currency':'DP'},

          // subterfuge
          'theft':{'cost':2,'bonus':1,'currency':'DP'},
          'disguise':{'cost':2,'bonus':1,'currency':'DP'},
          'hide':{'cost':2,'bonus':1,'currency':'DP'},
          'stealth':{'cost':2,'bonus':1,'currency':'DP'},
          'trapLore':{'cost':2,'bonus':1,'currency':'DP'},
          'lockPicking':{'cost':2,'bonus':1,'currency':'DP'},
          'poisons':{'cost':2,'bonus':1,'currency':'DP'},

          // creative
          'art':{'cost':2,'bonus':1,'currency':'DP'},
          'dance':{'cost':2,'bonus':1,'currency':'DP'},
          'music':{'cost':2,'bonus':1,'currency':'DP'},
          'sleightOfHand':{'cost':2,'bonus':1,'currency':'DP'},
          'forging':{'cost':2,'bonus':1,'currency':'DP'},
      },
      'innateBonuses':{
          'primaryAbility': {
              'attack': {'cost':1,'bonus':5,'currency':'level'},
              'martialKnowledge':{'cost':1,'bonus':50,'currency':'level'},
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
          },
      },
  });

Class.tao = new Class({
      'name':'Tao',
      'description':'No description yet!',
      'archetype':['fighter','domine'],
      'lifePointMultiple':
          {'cost':20,'bonus':1,'currency':'DP'},
      'lifePoints':
          {'cost':1,'bonus':10,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple':
              {'cost':15,'bonus':1,'currency':'DP'},
          'wearArmor':
              {'cost':2,'bonus':1,'currency':'DP'},
          'zeon':
              {'cost':3,'bonus':5,'currency':'DP'},
          'magicAccumulationMultiple':
              {'cost':70,'bonus':1,'currency':'DP'},
          'magicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
          'summon':
              {'cost':3,'bonus':1,'currency':'DP'},
          'control':
              {'cost':3,'bonus':1,'currency':'DP'},
          'bind':
              {'cost':3,'bonus':1,'currency':'DP'},
          'banish':
              {'cost':3,'bonus':1,'currency':'DP'},
          'psychicPoints':    {'cost':20,'bonus':1,'currency':'DP'},
          'psychicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
      },
      'secondaryAbilityCosts':{
          // athletics
          'acrobatics':{'cost':2,'bonus':1,'currency':'DP'},
          'athleticism':{'cost':2,'bonus':1,'currency':'DP'},
          'climb':{'cost':2,'bonus':1,'currency':'DP'},
          'jump':{'cost':2,'bonus':1,'currency':'DP'},
          'ride':{'cost':2,'bonus':1,'currency':'DP'},
          'swim':{'cost':2,'bonus':1,'currency':'DP'},

          // social
          'intimidate':{'cost':2,'bonus':1,'currency':'DP'},
          'leadership':{'cost':2,'bonus':1,'currency':'DP'},
          'persuasion':{'cost':2,'bonus':1,'currency':'DP'},
          'style':{'cost':2,'bonus':1,'currency':'DP'},

          // perceptive
          'notice':{'cost':2,'bonus':1,'currency':'DP'},
          'search':{'cost':2,'bonus':1,'currency':'DP'},
          'track':{'cost':2,'bonus':1,'currency':'DP'},

          // intellectual
          'animals':{'cost':3,'bonus':1,'currency':'DP'},
          'appraisal':{'cost':3,'bonus':1,'currency':'DP'},
          'herbalLore':{'cost':3,'bonus':1,'currency':'DP'},
          'history':{'cost':3,'bonus':1,'currency':'DP'},
          'magicAppraisal':{'cost':3,'bonus':1,'currency':'DP'},
          'medicine':{'cost':3,'bonus':1,'currency':'DP'},
          'memorize':{'cost':3,'bonus':1,'currency':'DP'},
          'navigation':{'cost':3,'bonus':1,'currency':'DP'},
          'occult':{'cost':3,'bonus':1,'currency':'DP'},
          'sciences':{'cost':3,'bonus':1,'currency':'DP'},

          // vigor
          'composure':{'cost':2,'bonus':1,'currency':'DP'},
          'withstandPain':{'cost':2,'bonus':1,'currency':'DP'},
          'featsOfStrength':{'cost':2,'bonus':1,'currency':'DP'},

          // subterfuge
          'theft':{'cost':2,'bonus':1,'currency':'DP'},
          'disguise':{'cost':2,'bonus':1,'currency':'DP'},
          'hide':{'cost':2,'bonus':1,'currency':'DP'},
          'stealth':{'cost':2,'bonus':1,'currency':'DP'},
          'trapLore':{'cost':2,'bonus':1,'currency':'DP'},
          'lockPicking':{'cost':2,'bonus':1,'currency':'DP'},
          'poisons':{'cost':2,'bonus':1,'currency':'DP'},

          // creative
          'art':{'cost':2,'bonus':1,'currency':'DP'},
          'dance':{'cost':2,'bonus':1,'currency':'DP'},
          'music':{'cost':2,'bonus':1,'currency':'DP'},
          'sleightOfHand':{'cost':2,'bonus':1,'currency':'DP'},
          'forging':{'cost':2,'bonus':1,'currency':'DP'},
      },
      'innateBonuses':{
          'primaryAbility': {
              'martialKnowledge':{'cost':1,'bonus':30,'currency':'level'},
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'style': {'cost':1,'bonus':5,'currency':'level'},
          },
      },
  });

Class.ranger = new Class({
      'name':'Ranger',
      'description':'No description yet!',
      'archetype':['fighter','prowler'],
      'lifePointMultiple':
          {'cost':20,'bonus':1,'currency':'DP'},
      'lifePoints':
          {'cost':1,'bonus':10,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple':
              {'cost':25,'bonus':1,'currency':'DP'},
          'wearArmor':
              {'cost':2,'bonus':1,'currency':'DP'},
          'zeon':
              {'cost':3,'bonus':5,'currency':'DP'},
          'magicAccumulationMultiple':
              {'cost':70,'bonus':1,'currency':'DP'},
          'magicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
          'summon':
              {'cost':3,'bonus':1,'currency':'DP'},
          'control':
              {'cost':3,'bonus':1,'currency':'DP'},
          'bind':
              {'cost':3,'bonus':1,'currency':'DP'},
          'banish':
              {'cost':3,'bonus':1,'currency':'DP'},
          'psychicPoints':    {'cost':20,'bonus':1,'currency':'DP'},
          'psychicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
      },
      'secondaryAbilityCosts':{
          // athletics
          'acrobatics':{'cost':2,'bonus':1,'currency':'DP'},
          'athleticism':{'cost':2,'bonus':1,'currency':'DP'},
          'climb':{'cost':2,'bonus':1,'currency':'DP'},
          'jump':{'cost':2,'bonus':1,'currency':'DP'},
          'ride':{'cost':2,'bonus':1,'currency':'DP'},
          'swim':{'cost':2,'bonus':1,'currency':'DP'},

          // social
          'intimidate':{'cost':2,'bonus':1,'currency':'DP'},
          'leadership':{'cost':2,'bonus':1,'currency':'DP'},
          'persuasion':{'cost':2,'bonus':1,'currency':'DP'},
          'style':{'cost':2,'bonus':1,'currency':'DP'},

          // perceptive
          'notice':{'cost':1,'bonus':1,'currency':'DP'},
          'search':{'cost':1,'bonus':1,'currency':'DP'},
          'track':{'cost':1,'bonus':1,'currency':'DP'},

          // intellectual
          'animals':{'cost':1,'bonus':1,'currency':'DP'},
          'appraisal':{'cost':3,'bonus':1,'currency':'DP'},
          'herbalLore':{'cost':2,'bonus':1,'currency':'DP'},
          'history':{'cost':3,'bonus':1,'currency':'DP'},
          'magicAppraisal':{'cost':3,'bonus':1,'currency':'DP'},
          'medicine':{'cost':2,'bonus':1,'currency':'DP'},
          'memorize':{'cost':3,'bonus':1,'currency':'DP'},
          'navigation':{'cost':3,'bonus':1,'currency':'DP'},
          'occult':{'cost':3,'bonus':1,'currency':'DP'},
          'sciences':{'cost':3,'bonus':1,'currency':'DP'},

          // vigor
          'composure':{'cost':3,'bonus':1,'currency':'DP'},
          'withstandPain':{'cost':3,'bonus':1,'currency':'DP'},
          'featsOfStrength':{'cost':3,'bonus':1,'currency':'DP'},

          // subterfuge
          'theft':{'cost':2,'bonus':1,'currency':'DP'},
          'disguise':{'cost':2,'bonus':1,'currency':'DP'},
          'hide':{'cost':2,'bonus':1,'currency':'DP'},
          'stealth':{'cost':2,'bonus':1,'currency':'DP'},
          'trapLore':{'cost':1,'bonus':1,'currency':'DP'},
          'lockPicking':{'cost':2,'bonus':1,'currency':'DP'},
          'poisons':{'cost':2,'bonus':1,'currency':'DP'},

          // creative
          'art':{'cost':2,'bonus':1,'currency':'DP'},
          'dance':{'cost':2,'bonus':1,'currency':'DP'},
          'music':{'cost':2,'bonus':1,'currency':'DP'},
          'sleightOfHand':{'cost':2,'bonus':1,'currency':'DP'},
          'forging':{'cost':2,'bonus':1,'currency':'DP'},
      },
      'innateBonuses':{
          'primaryAbility': {
              'attack': {'cost':1,'bonus':5,'currency':'level'},
              'martialKnowledge':{'cost':1,'bonus':20,'currency':'level'},
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'notice': {'cost':1,'bonus':10,'currency':'level'},
              'search': {'cost':1,'bonus':10,'currency':'level'},
              'track': {'cost':1,'bonus':10,'currency':'level'},
              'trapLore': {'cost':1,'bonus':5,'currency':'level'},
              'animals': {'cost':1,'bonus':5,'currency':'level'},
              'herbalLore': {'cost':1,'bonus':5,'currency':'level'},
          },
      },
  });

Class.shadow = new Class({
      'name':'Shadow',
      'description':'No description yet!',
      'archetype':['fighter','prowler'],
      'lifePointMultiple':
          {'cost':20,'bonus':1,'currency':'DP'},
      'lifePoints':
          {'cost':1,'bonus':5,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':10,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':3,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple':
              {'cost':20,'bonus':1,'currency':'DP'},
          'wearArmor':
              {'cost':2,'bonus':1,'currency':'DP'},
          'zeon':
              {'cost':3,'bonus':5,'currency':'DP'},
          'magicAccumulationMultiple':
              {'cost':70,'bonus':1,'currency':'DP'},
          'magicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
          'summon':
              {'cost':3,'bonus':1,'currency':'DP'},
          'control':
              {'cost':3,'bonus':1,'currency':'DP'},
          'bind':
              {'cost':3,'bonus':1,'currency':'DP'},
          'banish':
              {'cost':3,'bonus':1,'currency':'DP'},
          'psychicPoints':    {'cost':20,'bonus':1,'currency':'DP'},
          'psychicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
      },
      'secondaryAbilityCosts':{
          // athletics
          'acrobatics':{'cost':2,'bonus':1,'currency':'DP'},
          'athleticism':{'cost':2,'bonus':1,'currency':'DP'},
          'climb':{'cost':2,'bonus':1,'currency':'DP'},
          'jump':{'cost':2,'bonus':1,'currency':'DP'},
          'ride':{'cost':2,'bonus':1,'currency':'DP'},
          'swim':{'cost':2,'bonus':1,'currency':'DP'},

          // social
          'intimidate':{'cost':2,'bonus':1,'currency':'DP'},
          'leadership':{'cost':2,'bonus':1,'currency':'DP'},
          'persuasion':{'cost':2,'bonus':1,'currency':'DP'},
          'style':{'cost':2,'bonus':1,'currency':'DP'},

          // perceptive
          'notice':{'cost':2,'bonus':1,'currency':'DP'},
          'search':{'cost':2,'bonus':1,'currency':'DP'},
          'track':{'cost':2,'bonus':1,'currency':'DP'},

          // intellectual
          'animals':{'cost':3,'bonus':1,'currency':'DP'},
          'appraisal':{'cost':3,'bonus':1,'currency':'DP'},
          'herbalLore':{'cost':3,'bonus':1,'currency':'DP'},
          'history':{'cost':3,'bonus':1,'currency':'DP'},
          'magicAppraisal':{'cost':3,'bonus':1,'currency':'DP'},
          'medicine':{'cost':3,'bonus':1,'currency':'DP'},
          'memorize':{'cost':3,'bonus':1,'currency':'DP'},
          'navigation':{'cost':3,'bonus':1,'currency':'DP'},
          'occult':{'cost':3,'bonus':1,'currency':'DP'},
          'sciences':{'cost':3,'bonus':1,'currency':'DP'},

          // vigor
          'composure':{'cost':2,'bonus':1,'currency':'DP'},
          'withstandPain':{'cost':2,'bonus':1,'currency':'DP'},
          'featsOfStrength':{'cost':2,'bonus':1,'currency':'DP'},

          // subterfuge
          'theft':{'cost':2,'bonus':1,'currency':'DP'},
          'disguise':{'cost':2,'bonus':1,'currency':'DP'},
          'hide':{'cost':2,'bonus':1,'currency':'DP'},
          'stealth':{'cost':2,'bonus':1,'currency':'DP'},
          'trapLore':{'cost':2,'bonus':1,'currency':'DP'},
          'lockPicking':{'cost':2,'bonus':1,'currency':'DP'},
          'poisons':{'cost':2,'bonus':1,'currency':'DP'},

          // creative
          'art':{'cost':2,'bonus':1,'currency':'DP'},
          'dance':{'cost':2,'bonus':1,'currency':'DP'},
          'music':{'cost':2,'bonus':1,'currency':'DP'},
          'sleightOfHand':{'cost':2,'bonus':1,'currency':'DP'},
          'forging':{'cost':2,'bonus':1,'currency':'DP'},
      },
      'innateBonuses':{
          'primaryAbility': {
              'attack': {'cost':1,'bonus':5,'currency':'level'},
              'dodge': {'cost':1,'bonus':5,'currency':'level'},
              'martialKnowledge':{'cost':1,'bonus':25,'currency':'level'},
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'notice': {'cost':1,'bonus':10,'currency':'level'},
              'search': {'cost':1,'bonus':10,'currency':'level'},
              'hide': {'cost':1,'bonus':10,'currency':'level'},
              'stealth': {'cost':1,'bonus':10,'currency':'level'},
          },
      },
  });

Class.thief = new Class({
      'name':'Thief',
      'description':'No description yet!',
      'archetype':['prowler'],
      'lifePointMultiple':
          {'cost':20,'bonus':1,'currency':'DP'},
      'lifePoints':
          {'cost':1,'bonus':5,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':10,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':3,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple':
              {'cost':25,'bonus':1,'currency':'DP'},
          'wearArmor':
              {'cost':3,'bonus':1,'currency':'DP'},
          'zeon':
              {'cost':3,'bonus':5,'currency':'DP'},
          'magicAccumulationMultiple':
              {'cost':70,'bonus':1,'currency':'DP'},
          'magicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
          'summon':
              {'cost':3,'bonus':1,'currency':'DP'},
          'control':
              {'cost':3,'bonus':1,'currency':'DP'},
          'bind':
              {'cost':3,'bonus':1,'currency':'DP'},
          'banish':
              {'cost':3,'bonus':1,'currency':'DP'},
          'psychicPoints':    {'cost':20,'bonus':1,'currency':'DP'},
          'psychicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
      },
      'secondaryAbilityCosts':{
          // athletics
          'acrobatics':{'cost':1,'bonus':1,'currency':'DP'},
          'athleticism':{'cost':1,'bonus':1,'currency':'DP'},
          'climb':{'cost':1,'bonus':1,'currency':'DP'},
          'jump':{'cost':1,'bonus':1,'currency':'DP'},
          'ride':{'cost':1,'bonus':1,'currency':'DP'},
          'swim':{'cost':1,'bonus':1,'currency':'DP'},

          // social
          'intimidate':{'cost':2,'bonus':1,'currency':'DP'},
          'leadership':{'cost':2,'bonus':1,'currency':'DP'},
          'persuasion':{'cost':2,'bonus':1,'currency':'DP'},
          'style':{'cost':2,'bonus':1,'currency':'DP'},

          // perceptive
          'notice':{'cost':2,'bonus':1,'currency':'DP'},
          'search':{'cost':2,'bonus':1,'currency':'DP'},
          'track':{'cost':2,'bonus':1,'currency':'DP'},

          // intellectual
          'animals':{'cost':3,'bonus':1,'currency':'DP'},
          'appraisal':{'cost':1,'bonus':1,'currency':'DP'},
          'herbalLore':{'cost':3,'bonus':1,'currency':'DP'},
          'history':{'cost':3,'bonus':1,'currency':'DP'},
          'magicAppraisal':{'cost':3,'bonus':1,'currency':'DP'},
          'medicine':{'cost':3,'bonus':1,'currency':'DP'},
          'memorize':{'cost':3,'bonus':1,'currency':'DP'},
          'navigation':{'cost':3,'bonus':1,'currency':'DP'},
          'occult':{'cost':3,'bonus':1,'currency':'DP'},
          'sciences':{'cost':3,'bonus':1,'currency':'DP'},

          // vigor
          'composure':{'cost':3,'bonus':1,'currency':'DP'},
          'withstandPain':{'cost':3,'bonus':1,'currency':'DP'},
          'featsOfStrength':{'cost':3,'bonus':1,'currency':'DP'},

          // subterfuge
          'theft':{'cost':1,'bonus':1,'currency':'DP'},
          'disguise':{'cost':1,'bonus':1,'currency':'DP'},
          'hide':{'cost':1,'bonus':1,'currency':'DP'},
          'stealth':{'cost':1,'bonus':1,'currency':'DP'},
          'trapLore':{'cost':1,'bonus':1,'currency':'DP'},
          'lockPicking':{'cost':1,'bonus':1,'currency':'DP'},
          'poisons':{'cost':1,'bonus':1,'currency':'DP'},

          // creative
          'art':{'cost':2,'bonus':1,'currency':'DP'},
          'dance':{'cost':2,'bonus':1,'currency':'DP'},
          'music':{'cost':2,'bonus':1,'currency':'DP'},
          'sleightOfHand':{'cost':2,'bonus':1,'currency':'DP'},
          'forging':{'cost':2,'bonus':1,'currency':'DP'},
      },
      'innateBonuses':{
          'primaryAbility': {
              'dodge': {'cost':1,'bonus':5,'currency':'level'},
              'martialKnowledge':{'cost':1,'bonus':20,'currency':'level'},
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'notice': {'cost':1,'bonus':5,'currency':'level'},
              'search': {'cost':1,'bonus':5,'currency':'level'},
              'hide': {'cost':1,'bonus':5,'currency':'level'},
              'stealth': {'cost':1,'bonus':5,'currency':'level'},
              'trapLore': {'cost':1,'bonus':5,'currency':'level'},
              'sleightOfHand': {'cost':1,'bonus':5,'currency':'level'},
              'theft': {'cost':1,'bonus':10,'currency':'level'},
          },
      },
  });

Class.assassin = new Class({
      'name':'Assassin',
      'description':'No description yet!',
      'archetype':['prowler'],
      'lifePointMultiple':
          {'cost':20,'bonus':1,'currency':'DP'},
      'lifePoints':
          {'cost':1,'bonus':5,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':10,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':3,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple':
              {'cost':25,'bonus':1,'currency':'DP'},
          'wearArmor':
              {'cost':3,'bonus':1,'currency':'DP'},
          'zeon':
              {'cost':3,'bonus':5,'currency':'DP'},
          'magicAccumulationMultiple':
              {'cost':70,'bonus':1,'currency':'DP'},
          'magicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
          'summon':
              {'cost':3,'bonus':1,'currency':'DP'},
          'control':
              {'cost':3,'bonus':1,'currency':'DP'},
          'bind':
              {'cost':3,'bonus':1,'currency':'DP'},
          'banish':
              {'cost':3,'bonus':1,'currency':'DP'},
          'psychicPoints':    {'cost':20,'bonus':1,'currency':'DP'},
          'psychicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
      },
      'secondaryAbilityCosts':{
          // athletics
          'acrobatics':{'cost':2,'bonus':1,'currency':'DP'},
          'athleticism':{'cost':2,'bonus':1,'currency':'DP'},
          'climb':{'cost':2,'bonus':1,'currency':'DP'},
          'jump':{'cost':2,'bonus':1,'currency':'DP'},
          'ride':{'cost':2,'bonus':1,'currency':'DP'},
          'swim':{'cost':2,'bonus':1,'currency':'DP'},

          // social
          'intimidate':{'cost':2,'bonus':1,'currency':'DP'},
          'leadership':{'cost':2,'bonus':1,'currency':'DP'},
          'persuasion':{'cost':2,'bonus':1,'currency':'DP'},
          'style':{'cost':2,'bonus':1,'currency':'DP'},

          // perceptive
          'notice':{'cost':1,'bonus':1,'currency':'DP'},
          'search':{'cost':1,'bonus':1,'currency':'DP'},
          'track':{'cost':1,'bonus':1,'currency':'DP'},

          // intellectual
          'animals':{'cost':3,'bonus':1,'currency':'DP'},
          'appraisal':{'cost':3,'bonus':1,'currency':'DP'},
          'herbalLore':{'cost':3,'bonus':1,'currency':'DP'},
          'history':{'cost':3,'bonus':1,'currency':'DP'},
          'magicAppraisal':{'cost':3,'bonus':1,'currency':'DP'},
          'medicine':{'cost':3,'bonus':1,'currency':'DP'},
          'memorize':{'cost':2,'bonus':1,'currency':'DP'},
          'navigation':{'cost':3,'bonus':1,'currency':'DP'},
          'occult':{'cost':3,'bonus':1,'currency':'DP'},
          'sciences':{'cost':3,'bonus':1,'currency':'DP'},

          // vigor
          'composure':{'cost':2,'bonus':1,'currency':'DP'},
          'withstandPain':{'cost':3,'bonus':1,'currency':'DP'},
          'featsOfStrength':{'cost':3,'bonus':1,'currency':'DP'},

          // subterfuge
          'theft':{'cost':2,'bonus':1,'currency':'DP'},
          'disguise':{'cost':2,'bonus':1,'currency':'DP'},
          'hide':{'cost':2,'bonus':1,'currency':'DP'},
          'stealth':{'cost':1,'bonus':1,'currency':'DP'},
          'trapLore':{'cost':2,'bonus':1,'currency':'DP'},
          'lockPicking':{'cost':2,'bonus':1,'currency':'DP'},
          'poisons':{'cost':2,'bonus':1,'currency':'DP'},

          // creative
          'art':{'cost':2,'bonus':1,'currency':'DP'},
          'dance':{'cost':2,'bonus':1,'currency':'DP'},
          'music':{'cost':2,'bonus':1,'currency':'DP'},
          'sleightOfHand':{'cost':2,'bonus':1,'currency':'DP'},
          'forging':{'cost':2,'bonus':1,'currency':'DP'},
      },
      'innateBonuses':{
          'primaryAbility': {
              'attack': {'cost':1,'bonus':5,'currency':'level'},
              'martialKnowledge':{'cost':1,'bonus':20,'currency':'level'},
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'notice': {'cost':1,'bonus':10,'currency':'level'},
              'search': {'cost':1,'bonus':10,'currency':'level'},
              'hide': {'cost':1,'bonus':10,'currency':'level'},
              'stealth': {'cost':1,'bonus':10,'currency':'level'},
              'poisons': {'cost':1,'bonus':10,'currency':'level'},
              'composure': {'cost':1,'bonus':10,'currency':'level'},
              'trapLore': {'cost':1,'bonus':10,'currency':'level'},
          },
      },
  });

Class.wizard = new Class({
      'name':'Wizard',
      'description':'No description yet!',
      'archetype':['mystic'],
      'lifePointMultiple':
          {'cost':20,'bonus':1,'currency':'DP'},
      'lifePoints':
          {'cost':1,'bonus':5,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':3,'bonus':1,'currency':'DP'},
          'block':
              {'cost':3,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki':
              {'cost':3,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple':
              {'cost':30,'bonus':1,'currency':'DP'},
          'wearArmor':
              {'cost':3,'bonus':1,'currency':'DP'},
          'zeon':
              {'cost':1,'bonus':5,'currency':'DP'},
          'magicAccumulationMultiple':
              {'cost':50,'bonus':1,'currency':'DP'},
          'magicProjection':
              {'cost':2,'bonus':1,'currency':'DP'},
          'summon':
              {'cost':2,'bonus':1,'currency':'DP'},
          'control':
              {'cost':2,'bonus':1,'currency':'DP'},
          'bind':
              {'cost':2,'bonus':1,'currency':'DP'},
          'banish':
              {'cost':2,'bonus':1,'currency':'DP'},
          'psychicPoints':    {'cost':20,'bonus':1,'currency':'DP'},
          'psychicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
      },
      'secondaryAbilityCosts':{
          // athletics
          'acrobatics':{'cost':2,'bonus':1,'currency':'DP'},
          'athleticism':{'cost':2,'bonus':1,'currency':'DP'},
          'climb':{'cost':2,'bonus':1,'currency':'DP'},
          'jump':{'cost':2,'bonus':1,'currency':'DP'},
          'ride':{'cost':2,'bonus':1,'currency':'DP'},
          'swim':{'cost':2,'bonus':1,'currency':'DP'},

          // social
          'intimidate':{'cost':2,'bonus':1,'currency':'DP'},
          'leadership':{'cost':2,'bonus':1,'currency':'DP'},
          'persuasion':{'cost':2,'bonus':1,'currency':'DP'},
          'style':{'cost':2,'bonus':1,'currency':'DP'},

          // perceptive
          'notice':{'cost':2,'bonus':1,'currency':'DP'},
          'search':{'cost':2,'bonus':1,'currency':'DP'},
          'track':{'cost':2,'bonus':1,'currency':'DP'},

          // intellectual
          'animals':{'cost':2,'bonus':1,'currency':'DP'},
          'appraisal':{'cost':2,'bonus':1,'currency':'DP'},
          'herbalLore':{'cost':2,'bonus':1,'currency':'DP'},
          'history':{'cost':2,'bonus':1,'currency':'DP'},
          'magicAppraisal':{'cost':1,'bonus':1,'currency':'DP'},
          'medicine':{'cost':2,'bonus':1,'currency':'DP'},
          'memorize':{'cost':2,'bonus':1,'currency':'DP'},
          'navigation':{'cost':2,'bonus':1,'currency':'DP'},
          'occult':{'cost':2,'bonus':1,'currency':'DP'},
          'sciences':{'cost':2,'bonus':1,'currency':'DP'},

          // vigor
          'composure':{'cost':3,'bonus':1,'currency':'DP'},
          'withstandPain':{'cost':3,'bonus':1,'currency':'DP'},
          'featsOfStrength':{'cost':3,'bonus':1,'currency':'DP'},

          // subterfuge
          'theft':{'cost':2,'bonus':1,'currency':'DP'},
          'disguise':{'cost':2,'bonus':1,'currency':'DP'},
          'hide':{'cost':2,'bonus':1,'currency':'DP'},
          'stealth':{'cost':2,'bonus':1,'currency':'DP'},
          'trapLore':{'cost':2,'bonus':1,'currency':'DP'},
          'lockPicking':{'cost':2,'bonus':1,'currency':'DP'},
          'poisons':{'cost':2,'bonus':1,'currency':'DP'},

          // creative
          'art':{'cost':2,'bonus':1,'currency':'DP'},
          'dance':{'cost':2,'bonus':1,'currency':'DP'},
          'music':{'cost':2,'bonus':1,'currency':'DP'},
          'sleightOfHand':{'cost':2,'bonus':1,'currency':'DP'},
          'forging':{'cost':2,'bonus':1,'currency':'DP'},
      },
      'innateBonuses':{
          'primaryAbility': {
              'zeon': {'cost':1,'bonus':100,'currency':'level'},
              'martialKnowledge':{'cost':1,'bonus':10,'currency':'level'},
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'magicAppraisal': {'cost':1,'bonus':10,'currency':'level'},
              'occult': {'cost':1,'bonus':5,'currency':'level'},
          },
      },
  });

Class.warlock = new Class({
      'name':'Warlock',
      'description':'No description yet!',
      'archetype':['fighter','mystic'],
      'lifePointMultiple':
          {'cost':20,'bonus':1,'currency':'DP'},
      'lifePoints':
          {'cost':1,'bonus':10,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple':
              {'cost':25,'bonus':1,'currency':'DP'},
          'wearArmor':
              {'cost':2,'bonus':1,'currency':'DP'},
          'zeon':
              {'cost':1,'bonus':5,'currency':'DP'},
          'magicAccumulationMultiple':
              {'cost':50,'bonus':1,'currency':'DP'},
          'magicProjection':
              {'cost':2,'bonus':1,'currency':'DP'},
          'summon':
              {'cost':2,'bonus':1,'currency':'DP'},
          'control':
              {'cost':2,'bonus':1,'currency':'DP'},
          'bind':
              {'cost':2,'bonus':1,'currency':'DP'},
          'banish':
              {'cost':2,'bonus':1,'currency':'DP'},
          'psychicPoints':    {'cost':20,'bonus':1,'currency':'DP'},
          'psychicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
      },
      'secondaryAbilityCosts':{
          // athletics
          'acrobatics':{'cost':2,'bonus':1,'currency':'DP'},
          'athleticism':{'cost':2,'bonus':1,'currency':'DP'},
          'climb':{'cost':2,'bonus':1,'currency':'DP'},
          'jump':{'cost':2,'bonus':1,'currency':'DP'},
          'ride':{'cost':2,'bonus':1,'currency':'DP'},
          'swim':{'cost':2,'bonus':1,'currency':'DP'},

          // social
          'intimidate':{'cost':2,'bonus':1,'currency':'DP'},
          'leadership':{'cost':2,'bonus':1,'currency':'DP'},
          'persuasion':{'cost':2,'bonus':1,'currency':'DP'},
          'style':{'cost':2,'bonus':1,'currency':'DP'},

          // perceptive
          'notice':{'cost':2,'bonus':1,'currency':'DP'},
          'search':{'cost':2,'bonus':1,'currency':'DP'},
          'track':{'cost':2,'bonus':1,'currency':'DP'},

          // intellectual
          'animals':{'cost':2,'bonus':1,'currency':'DP'},
          'appraisal':{'cost':2,'bonus':1,'currency':'DP'},
          'herbalLore':{'cost':2,'bonus':1,'currency':'DP'},
          'history':{'cost':2,'bonus':1,'currency':'DP'},
          'magicAppraisal':{'cost':2,'bonus':1,'currency':'DP'},
          'medicine':{'cost':2,'bonus':1,'currency':'DP'},
          'memorize':{'cost':2,'bonus':1,'currency':'DP'},
          'navigation':{'cost':2,'bonus':1,'currency':'DP'},
          'occult':{'cost':2,'bonus':1,'currency':'DP'},
          'sciences':{'cost':2,'bonus':1,'currency':'DP'},

          // vigor
          'composure':{'cost':2,'bonus':1,'currency':'DP'},
          'withstandPain':{'cost':2,'bonus':1,'currency':'DP'},
          'featsOfStrength':{'cost':2,'bonus':1,'currency':'DP'},

          // subterfuge
          'theft':{'cost':2,'bonus':1,'currency':'DP'},
          'disguise':{'cost':2,'bonus':1,'currency':'DP'},
          'hide':{'cost':2,'bonus':1,'currency':'DP'},
          'stealth':{'cost':2,'bonus':1,'currency':'DP'},
          'trapLore':{'cost':2,'bonus':1,'currency':'DP'},
          'lockPicking':{'cost':2,'bonus':1,'currency':'DP'},
          'poisons':{'cost':2,'bonus':1,'currency':'DP'},

          // creative
          'art':{'cost':2,'bonus':1,'currency':'DP'},
          'dance':{'cost':2,'bonus':1,'currency':'DP'},
          'music':{'cost':2,'bonus':1,'currency':'DP'},
          'sleightOfHand':{'cost':2,'bonus':1,'currency':'DP'},
          'forging':{'cost':2,'bonus':1,'currency':'DP'},
      },
      'innateBonuses':{
          'primaryAbility': {
              'attack': {'cost':1,'bonus':5,'currency':'level'},
              'block': {'cost':1,'bonus':5,'currency':'level'},
              'dodge': {'cost':1,'bonus':5,'currency':'level'},
              'zeon': {'cost':1,'bonus':20,'currency':'level'},
              'martialKnowledge':{'cost':1,'bonus':20,'currency':'level'},
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'magicAppraisal': {'cost':1,'bonus':5,'currency':'level'},
          },
      },
  });

Class.illusionist = new Class({
      'name':'Illusionist',
      'description':'No description yet!',
      'archetype':['mystic','prowler'],
      'lifePointMultiple':
          {'cost':20,'bonus':1,'currency':'DP'},
      'lifePoints':
          {'cost':1,'bonus':5,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':3,'bonus':1,'currency':'DP'},
          'block':
              {'cost':3,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple':
              {'cost':25,'bonus':1,'currency':'DP'},
          'wearArmor':
              {'cost':3,'bonus':1,'currency':'DP'},
          'zeon':
              {'cost':1,'bonus':5,'currency':'DP'},
          'magicAccumulationMultiple':
              {'cost':60,'bonus':1,'currency':'DP'},
          'magicProjection':
              {'cost':2,'bonus':1,'currency':'DP'},
          'summon':
              {'cost':3,'bonus':1,'currency':'DP'},
          'control':
              {'cost':3,'bonus':1,'currency':'DP'},
          'bind':
              {'cost':3,'bonus':1,'currency':'DP'},
          'banish':
              {'cost':3,'bonus':1,'currency':'DP'},
          'psychicPoints':    {'cost':20,'bonus':1,'currency':'DP'},
          'psychicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
      },
      'secondaryAbilityCosts':{
          // athletics
          'acrobatics':{'cost':2,'bonus':1,'currency':'DP'},
          'athleticism':{'cost':2,'bonus':1,'currency':'DP'},
          'climb':{'cost':2,'bonus':1,'currency':'DP'},
          'jump':{'cost':2,'bonus':1,'currency':'DP'},
          'ride':{'cost':2,'bonus':1,'currency':'DP'},
          'swim':{'cost':2,'bonus':1,'currency':'DP'},

          // social
          'intimidate':{'cost':2,'bonus':1,'currency':'DP'},
          'leadership':{'cost':2,'bonus':1,'currency':'DP'},
          'persuasion':{'cost':1,'bonus':1,'currency':'DP'},
          'style':{'cost':2,'bonus':1,'currency':'DP'},

          // perceptive
          'notice':{'cost':2,'bonus':1,'currency':'DP'},
          'search':{'cost':2,'bonus':1,'currency':'DP'},
          'track':{'cost':2,'bonus':1,'currency':'DP'},

          // intellectual
          'animals':{'cost':2,'bonus':1,'currency':'DP'},
          'appraisal':{'cost':2,'bonus':1,'currency':'DP'},
          'herbalLore':{'cost':2,'bonus':1,'currency':'DP'},
          'history':{'cost':2,'bonus':1,'currency':'DP'},
          'magicAppraisal':{'cost':2,'bonus':1,'currency':'DP'},
          'medicine':{'cost':2,'bonus':1,'currency':'DP'},
          'memorize':{'cost':2,'bonus':1,'currency':'DP'},
          'navigation':{'cost':2,'bonus':1,'currency':'DP'},
          'occult':{'cost':2,'bonus':1,'currency':'DP'},
          'sciences':{'cost':2,'bonus':1,'currency':'DP'},

          // vigor
          'composure':{'cost':3,'bonus':1,'currency':'DP'},
          'withstandPain':{'cost':3,'bonus':1,'currency':'DP'},
          'featsOfStrength':{'cost':3,'bonus':1,'currency':'DP'},

          // subterfuge
          'theft':{'cost':2,'bonus':1,'currency':'DP'},
          'disguise':{'cost':2,'bonus':1,'currency':'DP'},
          'hide':{'cost':2,'bonus':1,'currency':'DP'},
          'stealth':{'cost':2,'bonus':1,'currency':'DP'},
          'trapLore':{'cost':2,'bonus':1,'currency':'DP'},
          'lockPicking':{'cost':2,'bonus':1,'currency':'DP'},
          'poisons':{'cost':2,'bonus':1,'currency':'DP'},

          // creative
          'art':{'cost':2,'bonus':1,'currency':'DP'},
          'dance':{'cost':2,'bonus':1,'currency':'DP'},
          'music':{'cost':2,'bonus':1,'currency':'DP'},
          'sleightOfHand':{'cost':1,'bonus':1,'currency':'DP'},
          'forging':{'cost':2,'bonus':1,'currency':'DP'},
      },
      'innateBonuses':{
          'primaryAbility': {
              'zeon': {'cost':1,'bonus':75,'currency':'level'},
              'martialKnowledge':{'cost':1,'bonus':20,'currency':'level'},
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'magicAppraisal': {'cost':1,'bonus':5,'currency':'level'},
              'stealth': {'cost':1,'bonus':10,'currency':'level'},
              'hide': {'cost':1,'bonus':10,'currency':'level'},
              'sleightOfHand': {'cost':1,'bonus':10,'currency':'level'},
              'disguise': {'cost':1,'bonus':5,'currency':'level'},
              'theft': {'cost':1,'bonus':5,'currency':'level'},
              'persuasion': {'cost':1,'bonus':5,'currency':'level'},
          },
      },
  });

Class.wizardMentalist = new Class({
      'name':'Wizard Mentalist',
      'description':'No description yet!',
      'archetype':['mystic','psychic'],
      'lifePointMultiple':
          {'cost':20,'bonus':1,'currency':'DP'},
      'lifePoints':
          {'cost':1,'bonus':5,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':3,'bonus':1,'currency':'DP'},
          'block':
              {'cost':3,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki':
              {'cost':3,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple':
              {'cost':30,'bonus':1,'currency':'DP'},
          'wearArmor':
              {'cost':3,'bonus':1,'currency':'DP'},
          'zeon':
              {'cost':1,'bonus':5,'currency':'DP'},
          'magicAccumulationMultiple':
              {'cost':50,'bonus':1,'currency':'DP'},
          'magicProjection':
              {'cost':2,'bonus':1,'currency':'DP'},
          'summon':
              {'cost':2,'bonus':1,'currency':'DP'},
          'control':
              {'cost':2,'bonus':1,'currency':'DP'},
          'bind':
              {'cost':2,'bonus':1,'currency':'DP'},
          'banish':
              {'cost':2,'bonus':1,'currency':'DP'},
          'psychicPoints':    {'cost':10,'bonus':1,'currency':'DP'},
          'psychicProjection':
              {'cost':2,'bonus':1,'currency':'DP'},
      },
      'secondaryAbilityCosts':{
          // athletics
          'acrobatics':{'cost':2,'bonus':1,'currency':'DP'},
          'athleticism':{'cost':2,'bonus':1,'currency':'DP'},
          'climb':{'cost':2,'bonus':1,'currency':'DP'},
          'jump':{'cost':2,'bonus':1,'currency':'DP'},
          'ride':{'cost':2,'bonus':1,'currency':'DP'},
          'swim':{'cost':2,'bonus':1,'currency':'DP'},

          // social
          'intimidate':{'cost':2,'bonus':1,'currency':'DP'},
          'leadership':{'cost':2,'bonus':1,'currency':'DP'},
          'persuasion':{'cost':2,'bonus':1,'currency':'DP'},
          'style':{'cost':2,'bonus':1,'currency':'DP'},

          // perceptive
          'notice':{'cost':2,'bonus':1,'currency':'DP'},
          'search':{'cost':2,'bonus':1,'currency':'DP'},
          'track':{'cost':2,'bonus':1,'currency':'DP'},

          // intellectual
          'animals':{'cost':2,'bonus':1,'currency':'DP'},
          'appraisal':{'cost':2,'bonus':1,'currency':'DP'},
          'herbalLore':{'cost':2,'bonus':1,'currency':'DP'},
          'history':{'cost':2,'bonus':1,'currency':'DP'},
          'magicAppraisal':{'cost':2,'bonus':1,'currency':'DP'},
          'medicine':{'cost':2,'bonus':1,'currency':'DP'},
          'memorize':{'cost':2,'bonus':1,'currency':'DP'},
          'navigation':{'cost':2,'bonus':1,'currency':'DP'},
          'occult':{'cost':2,'bonus':1,'currency':'DP'},
          'sciences':{'cost':2,'bonus':1,'currency':'DP'},

          // vigor
          'composure':{'cost':3,'bonus':1,'currency':'DP'},
          'withstandPain':{'cost':3,'bonus':1,'currency':'DP'},
          'featsOfStrength':{'cost':3,'bonus':1,'currency':'DP'},

          // subterfuge
          'theft':{'cost':2,'bonus':1,'currency':'DP'},
          'disguise':{'cost':2,'bonus':1,'currency':'DP'},
          'hide':{'cost':2,'bonus':1,'currency':'DP'},
          'stealth':{'cost':2,'bonus':1,'currency':'DP'},
          'trapLore':{'cost':2,'bonus':1,'currency':'DP'},
          'lockPicking':{'cost':2,'bonus':1,'currency':'DP'},
          'poisons':{'cost':2,'bonus':1,'currency':'DP'},

          // creative
          'art':{'cost':2,'bonus':1,'currency':'DP'},
          'dance':{'cost':2,'bonus':1,'currency':'DP'},
          'music':{'cost':2,'bonus':1,'currency':'DP'},
          'sleightOfHand':{'cost':2,'bonus':1,'currency':'DP'},
          'forging':{'cost':2,'bonus':1,'currency':'DP'},
      },
      'innateBonuses':{
          'primaryAbility': {
              'zeon': {'cost':1,'bonus':100,'currency':'level'},
              'martialKnowledge':{'cost':1,'bonus':10,'currency':'level'},
              'psychicPoints':{'cost':1,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'magicAppraisal': {'cost':1,'bonus':10,'currency':'level'},
              'occult': {'cost':1,'bonus':5,'currency':'level'},
          },
      },
  });

Class.summoner = new Class({
      'name':'Summoner',
      'description':'No description yet!',
      'archetype':['mystic'],
      'lifePointMultiple':
          {'cost':20,'bonus':1,'currency':'DP'},
      'lifePoints':
          {'cost':1,'bonus':5,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':3,'bonus':1,'currency':'DP'},
          'block':
              {'cost':3,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki':
              {'cost':3,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple':
              {'cost':30,'bonus':1,'currency':'DP'},
          'wearArmor':
              {'cost':3,'bonus':1,'currency':'DP'},
          'zeon':
              {'cost':1,'bonus':5,'currency':'DP'},
          'magicAccumulationMultiple':
              {'cost':60,'bonus':1,'currency':'DP'},
          'magicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
          'summon':
              {'cost':1,'bonus':1,'currency':'DP'},
          'control':
              {'cost':1,'bonus':1,'currency':'DP'},
          'bind':
              {'cost':1,'bonus':1,'currency':'DP'},
          'banish':
              {'cost':1,'bonus':1,'currency':'DP'},
          'psychicPoints':    {'cost':20,'bonus':1,'currency':'DP'},
          'psychicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
      },
      'secondaryAbilityCosts':{
          // athletics
          'acrobatics':{'cost':2,'bonus':1,'currency':'DP'},
          'athleticism':{'cost':2,'bonus':1,'currency':'DP'},
          'climb':{'cost':2,'bonus':1,'currency':'DP'},
          'jump':{'cost':2,'bonus':1,'currency':'DP'},
          'ride':{'cost':2,'bonus':1,'currency':'DP'},
          'swim':{'cost':2,'bonus':1,'currency':'DP'},

          // social
          'intimidate':{'cost':2,'bonus':1,'currency':'DP'},
          'leadership':{'cost':2,'bonus':1,'currency':'DP'},
          'persuasion':{'cost':2,'bonus':1,'currency':'DP'},
          'style':{'cost':2,'bonus':1,'currency':'DP'},

          // perceptive
          'notice':{'cost':2,'bonus':1,'currency':'DP'},
          'search':{'cost':2,'bonus':1,'currency':'DP'},
          'track':{'cost':2,'bonus':1,'currency':'DP'},

          // intellectual
          'animals':{'cost':2,'bonus':1,'currency':'DP'},
          'appraisal':{'cost':2,'bonus':1,'currency':'DP'},
          'herbalLore':{'cost':2,'bonus':1,'currency':'DP'},
          'history':{'cost':2,'bonus':1,'currency':'DP'},
          'magicAppraisal':{'cost':2,'bonus':1,'currency':'DP'},
          'medicine':{'cost':2,'bonus':1,'currency':'DP'},
          'memorize':{'cost':2,'bonus':1,'currency':'DP'},
          'navigation':{'cost':2,'bonus':1,'currency':'DP'},
          'occult':{'cost':1,'bonus':1,'currency':'DP'},
          'sciences':{'cost':2,'bonus':1,'currency':'DP'},

          // vigor
          'composure':{'cost':3,'bonus':1,'currency':'DP'},
          'withstandPain':{'cost':3,'bonus':1,'currency':'DP'},
          'featsOfStrength':{'cost':3,'bonus':1,'currency':'DP'},

          // subterfuge
          'theft':{'cost':2,'bonus':1,'currency':'DP'},
          'disguise':{'cost':2,'bonus':1,'currency':'DP'},
          'hide':{'cost':2,'bonus':1,'currency':'DP'},
          'stealth':{'cost':2,'bonus':1,'currency':'DP'},
          'trapLore':{'cost':2,'bonus':1,'currency':'DP'},
          'lockPicking':{'cost':2,'bonus':1,'currency':'DP'},
          'poisons':{'cost':2,'bonus':1,'currency':'DP'},

          // creative
          'art':{'cost':2,'bonus':1,'currency':'DP'},
          'dance':{'cost':2,'bonus':1,'currency':'DP'},
          'music':{'cost':2,'bonus':1,'currency':'DP'},
          'sleightOfHand':{'cost':2,'bonus':1,'currency':'DP'},
          'forging':{'cost':2,'bonus':1,'currency':'DP'},
      },
      'innateBonuses':{
          'primaryAbility': {
              'zeon': {'cost':1,'bonus':50,'currency':'level'},
              'summon': {'cost':1,'bonus':10,'currency':'level'},
              'control': {'cost':1,'bonus':10,'currency':'level'},
              'bind': {'cost':1,'bonus':10,'currency':'level'},
              'banish': {'cost':1,'bonus':10,'currency':'level'},
              'martialKnowledge':{'cost':1,'bonus':10,'currency':'level'},
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'magicAppraisal': {'cost':1,'bonus':5,'currency':'level'},
              'occult': {'cost':1,'bonus':10,'currency':'level'},
          },
      },
  });

Class.warriorSummoner = new Class({
      'name':'Warrior Summoner',
      'description':'No description yet!',
      'archetype':['fighter','mystic'],
      'lifePointMultiple':
          {'cost':20,'bonus':1,'currency':'DP'},
      'lifePoints':
          {'cost':1,'bonus':10,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple':
              {'cost':20,'bonus':1,'currency':'DP'},
          'wearArmor':
              {'cost':2,'bonus':1,'currency':'DP'},
          'zeon':
              {'cost':1,'bonus':5,'currency':'DP'},
          'magicAccumulationMultiple':
              {'cost':60,'bonus':1,'currency':'DP'},
          'magicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
          'summon':
              {'cost':1,'bonus':1,'currency':'DP'},
          'control':
              {'cost':1,'bonus':1,'currency':'DP'},
          'bind':
              {'cost':1,'bonus':1,'currency':'DP'},
          'banish':
              {'cost':1,'bonus':1,'currency':'DP'},
          'psychicPoints':    {'cost':20,'bonus':1,'currency':'DP'},
          'psychicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
      },
      'secondaryAbilityCosts':{
          // athletics
          'acrobatics':{'cost':2,'bonus':1,'currency':'DP'},
          'athleticism':{'cost':2,'bonus':1,'currency':'DP'},
          'climb':{'cost':2,'bonus':1,'currency':'DP'},
          'jump':{'cost':2,'bonus':1,'currency':'DP'},
          'ride':{'cost':2,'bonus':1,'currency':'DP'},
          'swim':{'cost':2,'bonus':1,'currency':'DP'},

          // social
          'intimidate':{'cost':2,'bonus':1,'currency':'DP'},
          'leadership':{'cost':2,'bonus':1,'currency':'DP'},
          'persuasion':{'cost':2,'bonus':1,'currency':'DP'},
          'style':{'cost':2,'bonus':1,'currency':'DP'},

          // perceptive
          'notice':{'cost':2,'bonus':1,'currency':'DP'},
          'search':{'cost':2,'bonus':1,'currency':'DP'},
          'track':{'cost':2,'bonus':1,'currency':'DP'},

          // intellectual
          'animals':{'cost':2,'bonus':1,'currency':'DP'},
          'appraisal':{'cost':2,'bonus':1,'currency':'DP'},
          'herbalLore':{'cost':2,'bonus':1,'currency':'DP'},
          'history':{'cost':2,'bonus':1,'currency':'DP'},
          'magicAppraisal':{'cost':2,'bonus':1,'currency':'DP'},
          'medicine':{'cost':2,'bonus':1,'currency':'DP'},
          'memorize':{'cost':2,'bonus':1,'currency':'DP'},
          'navigation':{'cost':2,'bonus':1,'currency':'DP'},
          'occult':{'cost':2,'bonus':1,'currency':'DP'},
          'sciences':{'cost':2,'bonus':1,'currency':'DP'},

          // vigor
          'composure':{'cost':2,'bonus':1,'currency':'DP'},
          'withstandPain':{'cost':2,'bonus':1,'currency':'DP'},
          'featsOfStrength':{'cost':2,'bonus':1,'currency':'DP'},

          // subterfuge
          'theft':{'cost':2,'bonus':1,'currency':'DP'},
          'disguise':{'cost':2,'bonus':1,'currency':'DP'},
          'hide':{'cost':2,'bonus':1,'currency':'DP'},
          'stealth':{'cost':2,'bonus':1,'currency':'DP'},
          'trapLore':{'cost':2,'bonus':1,'currency':'DP'},
          'lockPicking':{'cost':2,'bonus':1,'currency':'DP'},
          'poisons':{'cost':2,'bonus':1,'currency':'DP'},

          // creative
          'art':{'cost':2,'bonus':1,'currency':'DP'},
          'dance':{'cost':2,'bonus':1,'currency':'DP'},
          'music':{'cost':2,'bonus':1,'currency':'DP'},
          'sleightOfHand':{'cost':2,'bonus':1,'currency':'DP'},
          'forging':{'cost':2,'bonus':1,'currency':'DP'},
      },
      'innateBonuses':{
          'primaryAbility': {
              'attack': {'cost':1,'bonus':5,'currency':'level'},
              'block': {'cost':1,'bonus':5,'currency':'level'},
              'dodge': {'cost':1,'bonus':5,'currency':'level'},
              'zeon': {'cost':1,'bonus':20,'currency':'level'},
              'summon': {'cost':1,'bonus':5,'currency':'level'},
              'control': {'cost':1,'bonus':5,'currency':'level'},
              'bind': {'cost':1,'bonus':5,'currency':'level'},
              'banish': {'cost':1,'bonus':5,'currency':'level'},
              'martialKnowledge':{'cost':1,'bonus':20,'currency':'level'},
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'occult': {'cost':1,'bonus':5,'currency':'level'},
          },
      },
  });

Class.mentalist = new Class({
      'name':'Mentalist',
      'description':'No description yet!',
      'archetype':['psychic'],
      'lifePointMultiple':
          {'cost':20,'bonus':1,'currency':'DP'},
      'lifePoints':
          {'cost':1,'bonus':5,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':3,'bonus':1,'currency':'DP'},
          'block':
              {'cost':3,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki':
              {'cost':3,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple':
              {'cost':30,'bonus':1,'currency':'DP'},
          'wearArmor':
              {'cost':3,'bonus':1,'currency':'DP'},
          'zeon':
              {'cost':3,'bonus':5,'currency':'DP'},
          'magicAccumulationMultiple':
              {'cost':70,'bonus':1,'currency':'DP'},
          'magicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
          'summon':
              {'cost':3,'bonus':1,'currency':'DP'},
          'control':
              {'cost':3,'bonus':1,'currency':'DP'},
          'bind':
              {'cost':3,'bonus':1,'currency':'DP'},
          'banish':
              {'cost':3,'bonus':1,'currency':'DP'},
          'psychicPoints':    {'cost':10,'bonus':1,'currency':'DP'},
          'psychicProjection':
              {'cost':2,'bonus':1,'currency':'DP'},
      },
      'secondaryAbilityCosts':{
          // athletics
          'acrobatics':{'cost':2,'bonus':1,'currency':'DP'},
          'athleticism':{'cost':2,'bonus':1,'currency':'DP'},
          'climb':{'cost':2,'bonus':1,'currency':'DP'},
          'jump':{'cost':2,'bonus':1,'currency':'DP'},
          'ride':{'cost':2,'bonus':1,'currency':'DP'},
          'swim':{'cost':2,'bonus':1,'currency':'DP'},

          // social
          'intimidate':{'cost':2,'bonus':1,'currency':'DP'},
          'leadership':{'cost':2,'bonus':1,'currency':'DP'},
          'persuasion':{'cost':2,'bonus':1,'currency':'DP'},
          'style':{'cost':2,'bonus':1,'currency':'DP'},

          // perceptive
          'notice':{'cost':2,'bonus':1,'currency':'DP'},
          'search':{'cost':2,'bonus':1,'currency':'DP'},
          'track':{'cost':2,'bonus':1,'currency':'DP'},

          // intellectual
          'animals':{'cost':2,'bonus':1,'currency':'DP'},
          'appraisal':{'cost':2,'bonus':1,'currency':'DP'},
          'herbalLore':{'cost':2,'bonus':1,'currency':'DP'},
          'history':{'cost':2,'bonus':1,'currency':'DP'},
          'magicAppraisal':{'cost':2,'bonus':1,'currency':'DP'},
          'medicine':{'cost':2,'bonus':1,'currency':'DP'},
          'memorize':{'cost':2,'bonus':1,'currency':'DP'},
          'navigation':{'cost':2,'bonus':1,'currency':'DP'},
          'occult':{'cost':2,'bonus':1,'currency':'DP'},
          'sciences':{'cost':2,'bonus':1,'currency':'DP'},

          // vigor
          'composure':{'cost':3,'bonus':1,'currency':'DP'},
          'withstandPain':{'cost':3,'bonus':1,'currency':'DP'},
          'featsOfStrength':{'cost':3,'bonus':1,'currency':'DP'},

          // subterfuge
          'theft':{'cost':2,'bonus':1,'currency':'DP'},
          'disguise':{'cost':2,'bonus':1,'currency':'DP'},
          'hide':{'cost':2,'bonus':1,'currency':'DP'},
          'stealth':{'cost':2,'bonus':1,'currency':'DP'},
          'trapLore':{'cost':2,'bonus':1,'currency':'DP'},
          'lockPicking':{'cost':2,'bonus':1,'currency':'DP'},
          'poisons':{'cost':2,'bonus':1,'currency':'DP'},

          // creative
          'art':{'cost':2,'bonus':1,'currency':'DP'},
          'dance':{'cost':2,'bonus':1,'currency':'DP'},
          'music':{'cost':2,'bonus':1,'currency':'DP'},
          'sleightOfHand':{'cost':2,'bonus':1,'currency':'DP'},
          'forging':{'cost':2,'bonus':1,'currency':'DP'},
      },
      'innateBonuses':{
          'primaryAbility': {
              'martialKnowledge':{'cost':1,'bonus':10,'currency':'level'},
              'psychicPoints':{'cost':1,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
          },
      },
  });

Class.warriorMentalist = new Class({
      'name':'Warrior Mentalist',
      'description':'No description yet!',
      'archetype':['fighter','psychic'],
      'lifePointMultiple':
          {'cost':0,'bonus':1,'currency':'DP'},
      'lifePoints':
          {'cost':1,'bonus':10,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple':
              {'cost':25,'bonus':1,'currency':'DP'},
          'wearArmor':
              {'cost':2,'bonus':1,'currency':'DP'},
          'zeon':
              {'cost':3,'bonus':5,'currency':'DP'},
          'magicAccumulationMultiple':
              {'cost':70,'bonus':1,'currency':'DP'},
          'magicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
          'summon':
              {'cost':3,'bonus':1,'currency':'DP'},
          'control':
              {'cost':3,'bonus':1,'currency':'DP'},
          'bind':
              {'cost':3,'bonus':1,'currency':'DP'},
          'banish':
              {'cost':3,'bonus':1,'currency':'DP'},
          'psychicPoints':    {'cost':15,'bonus':1,'currency':'DP'},
          'psychicProjection':
              {'cost':2,'bonus':1,'currency':'DP'},
      },
      'secondaryAbilityCosts':{
          // athletics
          'acrobatics':{'cost':2,'bonus':1,'currency':'DP'},
          'athleticism':{'cost':2,'bonus':1,'currency':'DP'},
          'climb':{'cost':2,'bonus':1,'currency':'DP'},
          'jump':{'cost':2,'bonus':1,'currency':'DP'},
          'ride':{'cost':2,'bonus':1,'currency':'DP'},
          'swim':{'cost':2,'bonus':1,'currency':'DP'},

          // social
          'intimidate':{'cost':2,'bonus':1,'currency':'DP'},
          'leadership':{'cost':2,'bonus':1,'currency':'DP'},
          'persuasion':{'cost':2,'bonus':1,'currency':'DP'},
          'style':{'cost':2,'bonus':1,'currency':'DP'},

          // perceptive
          'notice':{'cost':2,'bonus':1,'currency':'DP'},
          'search':{'cost':2,'bonus':1,'currency':'DP'},
          'track':{'cost':2,'bonus':1,'currency':'DP'},

          // intellectual
          'animals':{'cost':3,'bonus':1,'currency':'DP'},
          'appraisal':{'cost':3,'bonus':1,'currency':'DP'},
          'herbalLore':{'cost':3,'bonus':1,'currency':'DP'},
          'history':{'cost':3,'bonus':1,'currency':'DP'},
          'magicAppraisal':{'cost':3,'bonus':1,'currency':'DP'},
          'medicine':{'cost':3,'bonus':1,'currency':'DP'},
          'memorize':{'cost':3,'bonus':1,'currency':'DP'},
          'navigation':{'cost':3,'bonus':1,'currency':'DP'},
          'occult':{'cost':3,'bonus':1,'currency':'DP'},
          'sciences':{'cost':3,'bonus':1,'currency':'DP'},

          // vigor
          'composure':{'cost':2,'bonus':1,'currency':'DP'},
          'withstandPain':{'cost':2,'bonus':1,'currency':'DP'},
          'featsOfStrength':{'cost':2,'bonus':1,'currency':'DP'},

          // subterfuge
          'theft':{'cost':2,'bonus':1,'currency':'DP'},
          'disguise':{'cost':2,'bonus':1,'currency':'DP'},
          'hide':{'cost':2,'bonus':1,'currency':'DP'},
          'stealth':{'cost':2,'bonus':1,'currency':'DP'},
          'trapLore':{'cost':2,'bonus':1,'currency':'DP'},
          'lockPicking':{'cost':2,'bonus':1,'currency':'DP'},
          'poisons':{'cost':2,'bonus':1,'currency':'DP'},

          // creative
          'art':{'cost':2,'bonus':1,'currency':'DP'},
          'dance':{'cost':2,'bonus':1,'currency':'DP'},
          'music':{'cost':2,'bonus':1,'currency':'DP'},
          'sleightOfHand':{'cost':2,'bonus':1,'currency':'DP'},
          'forging':{'cost':2,'bonus':1,'currency':'DP'},
      },
      'innateBonuses':{
          'primaryAbility': {
              'attack': {'cost':1,'bonus':5,'currency':'level'},
              'block': {'cost':1,'bonus':5,'currency':'level'},
              'dodge': {'cost':1,'bonus':5,'currency':'level'},
              'martialKnowledge':{'cost':1,'bonus':20,'currency':'level'},
              'psychicPoints':{'cost':1,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
          },
      },
  });

Class.freelancer = new Class({
      'name':'Freelancer',
      'description':'No description yet!',
      'archetype':['novel'],
      'lifePointMultiple':
          {'cost':20,'bonus':1,'currency':'DP'},
      'lifePoints':
          {'cost':1,'bonus':5,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple':
              {'cost':20,'bonus':1,'currency':'DP'},
          'wearArmor':
              {'cost':2,'bonus':1,'currency':'DP'},
          'zeon':
              {'cost':2,'bonus':5,'currency':'DP'},
          'magicAccumulationMultiple':
              {'cost':60,'bonus':1,'currency':'DP'},
          'magicProjection':
              {'cost':2,'bonus':1,'currency':'DP'},
          'summon':
              {'cost':2,'bonus':1,'currency':'DP'},
          'control':
              {'cost':2,'bonus':1,'currency':'DP'},
          'bind':
              {'cost':2,'bonus':1,'currency':'DP'},
          'banish':
              {'cost':2,'bonus':1,'currency':'DP'},
          'psychicPoints':    {'cost':20,'bonus':1,'currency':'DP'},
          'psychicProjection':
              {'cost':2,'bonus':1,'currency':'DP'},
      },
      'secondaryAbilityCosts':{
          // athletics
          'acrobatics':{'cost':2,'bonus':1,'currency':'DP'},
          'athleticism':{'cost':2,'bonus':1,'currency':'DP'},
          'climb':{'cost':2,'bonus':1,'currency':'DP'},
          'jump':{'cost':2,'bonus':1,'currency':'DP'},
          'ride':{'cost':2,'bonus':1,'currency':'DP'},
          'swim':{'cost':2,'bonus':1,'currency':'DP'},

          // social
          'intimidate':{'cost':2,'bonus':1,'currency':'DP'},
          'leadership':{'cost':2,'bonus':1,'currency':'DP'},
          'persuasion':{'cost':2,'bonus':1,'currency':'DP'},
          'style':{'cost':2,'bonus':1,'currency':'DP'},

          // perceptive
          'notice':{'cost':2,'bonus':1,'currency':'DP'},
          'search':{'cost':2,'bonus':1,'currency':'DP'},
          'track':{'cost':2,'bonus':1,'currency':'DP'},

          // intellectual
          'animals':{'cost':2,'bonus':1,'currency':'DP'},
          'appraisal':{'cost':2,'bonus':1,'currency':'DP'},
          'herbalLore':{'cost':2,'bonus':1,'currency':'DP'},
          'history':{'cost':2,'bonus':1,'currency':'DP'},
          'magicAppraisal':{'cost':2,'bonus':1,'currency':'DP'},
          'medicine':{'cost':2,'bonus':1,'currency':'DP'},
          'memorize':{'cost':2,'bonus':1,'currency':'DP'},
          'navigation':{'cost':2,'bonus':1,'currency':'DP'},
          'occult':{'cost':2,'bonus':1,'currency':'DP'},
          'sciences':{'cost':2,'bonus':1,'currency':'DP'},

          // vigor
          'composure':{'cost':2,'bonus':1,'currency':'DP'},
          'withstandPain':{'cost':2,'bonus':1,'currency':'DP'},
          'featsOfStrength':{'cost':2,'bonus':1,'currency':'DP'},

          // subterfuge
          'theft':{'cost':2,'bonus':1,'currency':'DP'},
          'disguise':{'cost':2,'bonus':1,'currency':'DP'},
          'hide':{'cost':2,'bonus':1,'currency':'DP'},
          'stealth':{'cost':2,'bonus':1,'currency':'DP'},
          'trapLore':{'cost':2,'bonus':1,'currency':'DP'},
          'lockPicking':{'cost':2,'bonus':1,'currency':'DP'},
          'poisons':{'cost':2,'bonus':1,'currency':'DP'},

          // creative
          'art':{'cost':2,'bonus':1,'currency':'DP'},
          'dance':{'cost':2,'bonus':1,'currency':'DP'},
          'music':{'cost':2,'bonus':1,'currency':'DP'},
          'sleightOfHand':{'cost':2,'bonus':1,'currency':'DP'},
          'forging':{'cost':2,'bonus':1,'currency':'DP'},
      },
      'innateBonuses':{
          'primaryAbility': {
              'zeon': {'cost':1,'bonus':5,'currency':'level'},
              'martialKnowledge':{'cost':1,'bonus':20,'currency':'level'},
              'psychicPoints':{'cost':2,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              // TODO: what to do about these?
              // +10 to five different abilities per level
          },
      },
  });
