class Ability extends Scoreable {
  constructor(data, character, key) {
    super(ABILITY_DATA[key]['name']);
    var attrs = ['description', 'baseCharacteristic'];
    for (let i in attrs) {
      Object.defineProperty(this, attrs[i], {
        get: function() {
          return ABILITY_DATA[key][attrs[i]];
        }
      });
    }

    check(isNumber(data.dpInvested), data.dpInvested + " is not a valid value for dpInvested for ability " + key + "!");
    this.dpInvested = data.dpInvested;

    if (ABILITY_DATA[key].type === "secondary") {
      if (data.secondaryAbilityLevelBonusesInvested) {
        this.secondaryAbilityLevelBonusesInvested = data.secondaryAbilityLevelBonusesInvested;
      } else {
        this.secondaryAbilityLevelBonusesInvested = 0;
      }
    }

    Object.defineProperty(this, 'cost', {
      get: function() {
        var bonusInfo = character.class[ABILITY_DATA[key].type + 'AbilityCosts'][key];
        return bonusInfo ? bonusInfo.cost : 0;
      }
    });
    Object.defineProperty(this, 'bonus', {
      get: function() {
        var bonusInfo = character.class[ABILITY_DATA[key].type + 'AbilityCosts'][key];
        return bonusInfo ? bonusInfo.bonus : 0;
      }
    });

    Object.defineProperty(this, 'dpBonus', {
      get: function() {
        var baseDpBonus = Math.floor(this.dpInvested / this.cost) * this.bonus;
        if (key == "magicAccumulation") {
          return baseDpBonus * this.baseBonus;
        }
        return baseDpBonus;
      }
    })
    Object.defineProperty(this, 'naturalBonus', {
      get: function() {
        var bonusesInvested = this.secondaryAbilityLevelBonusesInvested ? this.secondaryAbilityLevelBonusesInvested : 0;
        return bonusesInvested * this.characteristicBonus;
      }
    })
    Object.defineProperty(this, 'classLevelBonus', {
      get: function() {
        var innateBonus = character.class.innateBonuses[ABILITY_DATA[key].type + 'Ability'][key];
        return innateBonus ? character.level * innateBonus.bonus : 0;
      }
    });
    Object.defineProperty(this, 'characteristicBonus', {
      get: function() {
        if (/^kiAccumulation/.test(key) && this.baseCharacteristic) {
          var characteristicScore = character.characteristics[this.baseCharacteristic].score;
          if (characteristicScore < 10) {
            return 1;
          }
          if (characteristicScore < 13) {
            return 2;
          }
          if (characteristicScore < 16) {
            return 3;
          }
          return 4;
        }
        if (/^ki/.test(key) && this.baseCharacteristic) {
          var characteristicScore = character.characteristics[this.baseCharacteristic].score;
          var under10 = Math.min(characteristicScore, 10);
          var over10 = Math.max(characteristicScore - 10, 0);
          return under10 + 2 * over10;
        }
        return this.baseCharacteristic ? character.characteristics[this.baseCharacteristic].modifier : 0;
      }
    });

    Object.defineProperty(this, 'characteristicPercentile', {
      get: function() {
        return this.baseCharacteristic ? character.characteristics[this.baseCharacteristic].percentile : 0;
      }
    });
  }

  get percentile() {
    return Math.floor(this.score / 2 + this.characteristicPercentile);
  }
}

var ABILITY_DATA = {
  'attack':{'type':'primary','baseCharacteristic':'dex','name':'Attack','description':'No description yet!'},
  'block':{'type':'primary','baseCharacteristic':'dex','name':'Block','description':'No description yet!'},
  'dodge':{'type':'primary','baseCharacteristic':'agi','name':'Dodge','description':'No description yet!'},
  'wearArmor':{'type':'primary','baseCharacteristic':'str','name':'Wear Armor','description':'No description yet!'},
  'ki_str':{'type':'primary','baseCharacteristic':'str','name':'Ki (Str)','description':'No description yet!'},
  'ki_agi':{'type':'primary','baseCharacteristic':'agi','name':'Ki (Agi)','description':'No description yet!'},
  'ki_dex':{'type':'primary','baseCharacteristic':'dex','name':'Ki (Dex)','description':'No description yet!'},
  'ki_con':{'type':'primary','baseCharacteristic':'con','name':'Ki (Con)','description':'No description yet!'},
  'ki_pow':{'type':'primary','baseCharacteristic':'pow','name':'Ki (Pow)','description':'No description yet!'},
  'ki_wp':{'type':'primary','baseCharacteristic':'wp','name':'Ki (WP)','description':'No description yet!'},
  'kiAccumulation_str':{'type':'primary','baseCharacteristic':'str','name':'Ki Accumulation (Str)','description':'No description yet!'},
  'kiAccumulation_agi':{'type':'primary','baseCharacteristic':'agi','name':'Ki Accumulation (Agi)','description':'No description yet!'},
  'kiAccumulation_dex':{'type':'primary','baseCharacteristic':'dex','name':'Ki Accumulation (Dex)','description':'No description yet!'},
  'kiAccumulation_con':{'type':'primary','baseCharacteristic':'con','name':'Ki Accumulation (Con)','description':'No description yet!'},
  'kiAccumulation_pow':{'type':'primary','baseCharacteristic':'pow','name':'Ki Accumulation (Pow)','description':'No description yet!'},
  'kiAccumulation_wp':{'type':'primary','baseCharacteristic':'wp','name':'Ki Accumulation (WP)','description':'No description yet!'},
  'zeon':{'type':'primary','baseCharacteristic':null,'name':'Zeon','description':'No description yet!'},
  'magicAccumulation':{'type':'primary','baseCharacteristic':null,'name':'Magic Accumulation','description':'No description yet!'},
  'magicProjection':{'type':'primary','baseCharacteristic':'dex','name':'Magic Projection','description':'No description yet!'},
  'summon':{'type':'primary','baseCharacteristic':'pow','name':'Summon','description':'No description yet!'},
  'control':{'type':'primary','baseCharacteristic':'wp','name':'Control','description':'No description yet!'},
  'bind':{'type':'primary','baseCharacteristic':'pow','name':'Bind','description':'No description yet!'},
  'banish':{'type':'primary','baseCharacteristic':'pow','name':'Banish','description':'No description yet!'},
  'psychicPoints':{'type':'primary','baseCharacteristic':null,'name':'Psychic Points','description':'No description yet!'},
  'psychicProjection':{'type':'primary','baseCharacteristic':'dex','name':'Psychic Projection','description':'No description yet!'},
  'acrobatics':{'type':'secondary','baseCharacteristic':'agi','category':'Athletics','name':'Acrobatics','description':'No description yet!'},
  'athleticism':{'type':'secondary','baseCharacteristic':'agi','category':'Athletics','name':'Athleticism','description':'No description yet!'},
  'climb':{'type':'secondary','baseCharacteristic':'agi','category':'Athletics','name':'Climb','description':'No description yet!'},
  'jump':{'type':'secondary','baseCharacteristic':'str','category':'Athletics','name':'Jump','description':'No description yet!'},
  'ride':{'type':'secondary','baseCharacteristic':'agi','category':'Athletics','name':'Ride','description':'No description yet!'},
  'swim':{'type':'secondary','baseCharacteristic':'agi','category':'Athletics','name':'Swim','description':'No description yet!'},
  'intimidate':{'type':'secondary','baseCharacteristic':'wp','category':'Social','name':'Intimidate','description':'No description yet!'},
  'leadership':{'type':'secondary','baseCharacteristic':'pow','category':'Social','name':'Leadership','description':'No description yet!'},
  'persuasion':{'type':'secondary','baseCharacteristic':'int','category':'Social','name':'Persuasion','description':'No description yet!'},
  'style':{'type':'secondary','baseCharacteristic':'pow','category':'Social','name':'Style','description':'No description yet!'},
  'notice':{'type':'secondary','baseCharacteristic':'per','category':'Perception','name':'Notice','description':'No description yet!'},
  'search':{'type':'secondary','baseCharacteristic':'per','category':'Perception','name':'Search','description':'No description yet!'},
  'track':{'type':'secondary','baseCharacteristic':'per','category':'Perception','name':'Track','description':'No description yet!'},
  'animals':{'type':'secondary','baseCharacteristic':'int','category':'Intellectual','name':'Animals','description':'No description yet!'},
  'appraisal':{'type':'secondary','baseCharacteristic':'int','category':'Intellectual','name':'Appraisal','description':'No description yet!'},
  'herbalLore':{'type':'secondary','baseCharacteristic':'int','category':'Intellectual','name':'Herbal Lore','description':'No description yet!'},
  'history':{'type':'secondary','baseCharacteristic':'int','category':'Intellectual','name':'History','description':'No description yet!'},
  'magicAppraisal':{'type':'secondary','baseCharacteristic':'int','category':'Intellectual','name':'Magic Appraisal','description':'No description yet!'},
  'medicine':{'type':'secondary','baseCharacteristic':'int','category':'Intellectual','name':'Medicine','description':'No description yet!'},
  'memorize':{'type':'secondary','baseCharacteristic':'int','category':'Intellectual','name':'Memorize','description':'No description yet!'},
  'navigation':{'type':'secondary','baseCharacteristic':'int','category':'Intellectual','name':'Navigation','description':'No description yet!'},
  'occult':{'type':'secondary','baseCharacteristic':'int','category':'Intellectual','name':'Occult','description':'No description yet!'},
  'sciences':{'type':'secondary','baseCharacteristic':'int','category':'Intellectual','name':'Sciences','description':'No description yet!'},
  'composure':{'type':'secondary','baseCharacteristic':'wp','category':'Vigor','name':'Composure','description':'No description yet!'},
  'withstandPain':{'type':'secondary','baseCharacteristic':'wp','category':'Vigor','name':'Withstand Pain','description':'No description yet!'},
  'featsOfStrength':{'type':'secondary','baseCharacteristic':'str','category':'Vigor','name':'Feats of Strength','description':'No description yet!'},
  'theft':{'type':'secondary','baseCharacteristic':'dex','category':'Subterfuge','name':'Theft','description':'No description yet!'},
  'disguise':{'type':'secondary','baseCharacteristic':'dex','category':'Subterfuge','name':'Disguise','description':'No description yet!'},
  'hide':{'type':'secondary','baseCharacteristic':'per','category':'Subterfuge','name':'Hide','description':'No description yet!'},
  'stealth':{'type':'secondary','baseCharacteristic':'agi','category':'Subterfuge','name':'Stealth','description':'No description yet!'},
  'trapLore':{'type':'secondary','baseCharacteristic':'dex','category':'Subterfuge','name':'Trap Lore','description':'No description yet!'},
  'lockPicking':{'type':'secondary','baseCharacteristic':'dex','category':'Subterfuge','name':'Lockpicking','description':'No description yet!'},
  'poisons':{'type':'secondary','baseCharacteristic':'int','category':'Subterfuge','name':'Poisons','description':'No description yet!'},
  'art':{'type':'secondary','baseCharacteristic':'pow','category':'Creative','name':'Art','description':'No description yet!'},
  'dance':{'type':'secondary','baseCharacteristic':'agi','category':'Creative','name':'Dance','description':'No description yet!'},
  'music':{'type':'secondary','baseCharacteristic':'pow','category':'Creative','name':'Music','description':'No description yet!'},
  'sleightOfHand':{'type':'secondary','baseCharacteristic':'dex','category':'Creative','name':'Sleight of Hand','description':'No description yet!'},
  'forging':{'type':'secondary','baseCharacteristic':'dex','category':'Creative','name':'Forging','description':'No description yet!'},
  'lifePointMultiple':{'type':'other','name':'Life Point Multiples','description':'No description yet!'},
};

var SECONDARY_ABILITIES_BY_CATEGORY = [
  {
    'name':'Athletics',
    'abilities':[
      'acrobatics',
      'athleticism',
      'climb',
      'jump',
      'ride',
      'swim',
    ],
  },
  {
    'name':'Social',
    'abilities':[
      'intimidate',
      'leadership',
      'persuasion',
      'style',
    ],
  },
  {
    'name':'Perception',
    'abilities':[
      'notice',
      'search',
      'track',
    ],
  },
  {
    'name':'Intellectual',
    'abilities':[
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
    ],
  },
  {
    'name':'Vigor',
    'abilities':[
      'composure',
      'withstandPain',
      'featsOfStrength',
    ],
  },
  {
    'name':'Subterfuge',
    'abilities':[
      'theft',
      'disguise',
      'hide',
      'stealth',
      'trapLore',
      'lockPicking',
      'poisons',
    ],
  },
  {
    'name':'Creative',
    'abilities':[
      'art',
      'dance',
      'music',
      'sleightOfHand',
      'forging',
    ],
  },
];