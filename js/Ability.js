class DPInvestment {
  constructor(data) {
    this.dpInvested = data.dpInvested;
  }
}

class Ability extends DPInvestment {
  constructor(data, character, key) {
    super(data);

    this.bonusPerDp = function() {
      var bonusInfo = character.class[ABILITY_INFO[key].type + 'AbilityCosts'][key];
      return bonusInfo ? bonusInfo.bonus / bonusInfo.cost : 0;
    };

    this.classLevelBonus = function() {
      var innateBonus = character.class.innateBonuses[ABILITY_INFO[key].type + 'Ability'][key];
      return innateBonus ? character.level * innateBonus.bonus : 0;
    }

    this.characteristicBonus = function() {
      var baseCharacteristic = ABILITY_INFO[key].baseCharacteristic;
      return baseCharacteristic ? character.characteristics[baseCharacteristic].modifier : 0;
    }

    var attrs = ['name', 'description'];
    for (let i in attrs) {
      Object.defineProperty(this, attrs[i], {
        get: function() {
          return ABILITY_INFO[key][attrs[i]];
        }
      });
    }
  }

  bonusPerDp() {
    return 0;
  }

  classLevelBonus() {
    return 0;
  }

  characteristicBonus() {
    return 0;
  }

  get name() {
    return null;
  }

  get description() {
    return null;
  }

  get score() {
    // TODO: add misc bonuses
    return Math.floor(this.dpInvested * this.bonusPerDp()) + this.classLevelBonus() + this.characteristicBonus();
  }
}

var ABILITY_INFO = {
  'attack':{'type':'primary','baseCharacteristic':'dex','name':'Attack','description':'No description yet!'},
  'block':{'type':'primary','baseCharacteristic':'dex','name':'Block','description':'No description yet!'},
  'dodge':{'type':'primary','baseCharacteristic':'agi','name':'Dodge','description':'No description yet!'},
  'wearArmor':{'type':'primary','baseCharacteristic':'str','name':'Wear Armor','description':'No description yet!'},
  'martialKnowledge':{'type':'primary','baseCharacteristic':null,'name':'Martial Knowledge','description':'No description yet!'},
  'ki':{'type':'primary','baseCharacteristic':null,'name':'Ki','description':'No description yet!'},
  'kiAccumulationMultiple':{'type':'primary','baseCharacteristic':null,'name':'Ki Accumulation Multiple','description':'No description yet!'},
  'zeon':{'type':'primary','baseCharacteristic':null,'name':'Zeon','description':'No description yet!'},
  'magicAccumulationMultiple':{'type':'primary','baseCharacteristic':null,'name':'Magic Accumulation Multiple','description':'No description yet!'},
  'magicProjection':{'type':'primary','baseCharacteristic':'dex','name':'Magic Projection','description':'No description yet!'},
  'summon':{'type':'primary','baseCharacteristic':'pow','name':'Summon','description':'No description yet!'},
  'control':{'type':'primary','baseCharacteristic':'wp','name':'Control','description':'No description yet!'},
  'bind':{'type':'primary','baseCharacteristic':'pow','name':'Bind','description':'No description yet!'},
  'banish':{'type':'primary','baseCharacteristic':'pow','name':'Banish','description':'No description yet!'},
  'psychicPoints':{'type':'primary','baseCharacteristic':null,'name':'Psychic Points','description':'No description yet!'},
  'psychicProjection':{'type':'primary','baseCharacteristic':'dex','name':'Psychic Projection','description':'No description yet!'},
  'acrobatics':{'type':'secondary','baseCharacteristic':'agi','name':'Acrobatics','description':'No description yet!'},
  'athleticism':{'type':'secondary','baseCharacteristic':'agi','name':'Athleticism','description':'No description yet!'},
  'climb':{'type':'secondary','baseCharacteristic':'agi','name':'Climb','description':'No description yet!'},
  'jump':{'type':'secondary','baseCharacteristic':'str','name':'Jump','description':'No description yet!'},
  'ride':{'type':'secondary','baseCharacteristic':'agi','name':'Ride','description':'No description yet!'},
  'swim':{'type':'secondary','baseCharacteristic':'agi','name':'Swim','description':'No description yet!'},
  'intimidate':{'type':'secondary','baseCharacteristic':'wp','name':'Intimidate','description':'No description yet!'},
  'leadership':{'type':'secondary','baseCharacteristic':'pow','name':'Leadership','description':'No description yet!'},
  'persuasion':{'type':'secondary','baseCharacteristic':'int','name':'Persuasion','description':'No description yet!'},
  'style':{'type':'secondary','baseCharacteristic':'pow','name':'Style','description':'No description yet!'},
  'notice':{'type':'secondary','baseCharacteristic':'per','name':'Notice','description':'No description yet!'},
  'search':{'type':'secondary','baseCharacteristic':'per','name':'Search','description':'No description yet!'},
  'track':{'type':'secondary','baseCharacteristic':'per','name':'Track','description':'No description yet!'},
  'animals':{'type':'secondary','baseCharacteristic':'int','name':'Animals','description':'No description yet!'},
  'appraisal':{'type':'secondary','baseCharacteristic':'int','name':'Appraisal','description':'No description yet!'},
  'herbalLore':{'type':'secondary','baseCharacteristic':'int','name':'Herballore','description':'No description yet!'},
  'history':{'type':'secondary','baseCharacteristic':'int','name':'History','description':'No description yet!'},
  'magicAppraisal':{'type':'secondary','baseCharacteristic':'int','name':'Magic Appraisal','description':'No description yet!'},
  'medicine':{'type':'secondary','baseCharacteristic':'int','name':'Medicine','description':'No description yet!'},
  'memorize':{'type':'secondary','baseCharacteristic':'int','name':'Memorize','description':'No description yet!'},
  'navigation':{'type':'secondary','baseCharacteristic':'int','name':'Navigation','description':'No description yet!'},
  'occult':{'type':'secondary','baseCharacteristic':'int','name':'Occult','description':'No description yet!'},
  'sciences':{'type':'secondary','baseCharacteristic':'int','name':'Sciences','description':'No description yet!'},
  'composure':{'type':'secondary','baseCharacteristic':'wp','name':'Composure','description':'No description yet!'},
  'withstandPain':{'type':'secondary','baseCharacteristic':'wp','name':'Withstand Pain','description':'No description yet!'},
  'featsOfStrength':{'type':'secondary','baseCharacteristic':'str','name':'Feats of Strength','description':'No description yet!'},
  'theft':{'type':'secondary','baseCharacteristic':'dex','name':'Theft','description':'No description yet!'},
  'disguise':{'type':'secondary','baseCharacteristic':'dex','name':'Disguise','description':'No description yet!'},
  'hide':{'type':'secondary','baseCharacteristic':'per','name':'Hide','description':'No description yet!'},
  'stealth':{'type':'secondary','baseCharacteristic':'agi','name':'Stealth','description':'No description yet!'},
  'trapLore':{'type':'secondary','baseCharacteristic':'dex','name':'Trap Lore','description':'No description yet!'},
  'lockPicking':{'type':'secondary','baseCharacteristic':'dex','name':'Lockpicking','description':'No description yet!'},
  'poisons':{'type':'secondary','baseCharacteristic':'int','name':'Poisons','description':'No description yet!'},
  'art':{'type':'secondary','baseCharacteristic':'pow','name':'Art','description':'No description yet!'},
  'dance':{'type':'secondary','baseCharacteristic':'agi','name':'Dance','description':'No description yet!'},
  'music':{'type':'secondary','baseCharacteristic':'pow','name':'Music','description':'No description yet!'},
  'sleightOfHand':{'type':'secondary','baseCharacteristic':'dex','name':'Sleight of Hand','description':'No description yet!'},
  'forging':{'type':'secondary','baseCharacteristic':'dex','name':'Forging','description':'No description yet!'},
};
