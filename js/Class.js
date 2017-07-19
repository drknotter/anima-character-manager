class Bonus {
  constructor(data, key) {
    this.bonus = data.bonus;
    this.cost = data.cost;
    this.currency = data.currency;
    this.name = BONUS_NAMES[key];
  }
}

class Class {
  constructor(data) {
    this.name = data.name;
    this.description = data.description;

    this.archetype = data.archetype;
    this.lifePoints = new Bonus(data.lifePoints, 'lifePoints');
    this.initiative = new Bonus(data.initiative, 'initiative');
    this.martialKnowledge = new Bonus(data.martialKnowledge, 'martialKnowledge');

    this.primaryAbilityCosts = {};
    for (var key in data.primaryAbilityCosts) {
      this.primaryAbilityCosts[key] = new Bonus(data.primaryAbilityCosts[key], key);
    }

    this.limits = data.limits;

    this.secondaryAbilityCosts = {};
    for (var key in data.secondaryAbilityCosts) {
      this.secondaryAbilityCosts[key] = new Bonus(data.secondaryAbilityCosts[key], key);
    }

    this.otherAbilityCosts = {};
    for (var key in data.otherAbilityCosts) {
      this.otherAbilityCosts[key] = new Bonus(data.otherAbilityCosts[key], key);
    }

    this.innateBonuses = {'primaryAbility':{},'secondaryAbility':{},'otherAbility':{}};
    for (let a in this.innateBonuses) {
      for (let key in data.innateBonuses[a]) {
        this.innateBonuses[a][key] = new Bonus(data.innateBonuses[a][key], key);
      }
    }

  }

  get athleticsCostArray() {
    return {
      'name': 'Athletics',
      'array': [
        this.secondaryAbilityCosts['acrobatics'],
        this.secondaryAbilityCosts['athleticism'],
        this.secondaryAbilityCosts['climb'],
        this.secondaryAbilityCosts['jump'],
        this.secondaryAbilityCosts['ride'],
        this.secondaryAbilityCosts['swim'],
      ]
    };
  }

  get socialCostArray() {
    return {
      'name': 'Social',
      'array': [
        this.secondaryAbilityCosts['intimidate'],
        this.secondaryAbilityCosts['leadership'],
        this.secondaryAbilityCosts['persuasion'],
        this.secondaryAbilityCosts['style'],
      ]
    };
  }

  get perceptiveCostArray() {
    return {
      'name': 'Perceptive',
      'array': [
        this.secondaryAbilityCosts['notice'],
        this.secondaryAbilityCosts['search'],
        this.secondaryAbilityCosts['track'],
      ]
    };
  }

  get intellectualCostArray() {
    return {
      'name': 'Intellectual',
      'array': [
        this.secondaryAbilityCosts['animals'],
        this.secondaryAbilityCosts['appraisal'],
        this.secondaryAbilityCosts['herbalLore'],
        this.secondaryAbilityCosts['history'],
        this.secondaryAbilityCosts['magicAppraisal'],
        this.secondaryAbilityCosts['medicine'],
        this.secondaryAbilityCosts['memorize'],
        this.secondaryAbilityCosts['navigation'],
        this.secondaryAbilityCosts['occult'],
        this.secondaryAbilityCosts['sciences'],
      ]
    };
  }

  get vigorCostArray() {
    return {
      'name': 'Vigor',
      'array': [
        this.secondaryAbilityCosts['composure'],
        this.secondaryAbilityCosts['withstandPain'],
        this.secondaryAbilityCosts['featsOfStrength'],
      ]
    };
  }

  get subterfugeCostArray() {
    return {
      'name': 'Subterfuge',
      'array': [
        this.secondaryAbilityCosts['theft'],
        this.secondaryAbilityCosts['disguise'],
        this.secondaryAbilityCosts['hide'],
        this.secondaryAbilityCosts['stealth'],
        this.secondaryAbilityCosts['trapLore'],
        this.secondaryAbilityCosts['lockPicking'],
        this.secondaryAbilityCosts['poisons'],
      ]
    };
  }

  get creativeCostArray() {
    return {
      'name': 'Creative',
      'array': [
        this.secondaryAbilityCosts['art'],
        this.secondaryAbilityCosts['dance'],
        this.secondaryAbilityCosts['music'],
        this.secondaryAbilityCosts['sleightOfHand'],
        this.secondaryAbilityCosts['forging'],
      ]
    };
  }

  get secondaryAbilityCostArrays() {
    return [
      this.athleticsCostArray,
      this.socialCostArray,
      this.perceptiveCostArray,
      this.intellectualCostArray,
      this.vigorCostArray,
      this.subterfugeCostArray,
      this.creativeCostArray,
    ];
  }

  get combatArray() {
    return {
      'name': 'Combat',
      'limit': Math.floor(this.limits['combat'] * 100) + '%',
      'array': [
        this.primaryAbilityCosts['attack'],
        this.primaryAbilityCosts['block'],
        this.primaryAbilityCosts['dodge'],
        this.primaryAbilityCosts['wearArmor'],
        this.primaryAbilityCosts['ki_str'],
        this.primaryAbilityCosts['kiAccumulationMultiple_str'],
      ]
    };
  }

  get supernaturalArray() {
    return {
      'name': 'Supernatural',
      'limit': Math.floor(this.limits['supernatural'] * 100) + '%',
      'array': [
        this.primaryAbilityCosts['zeon'],
        this.primaryAbilityCosts['magicAccumulationMultiple'],
        this.primaryAbilityCosts['magicProjection'],
        this.primaryAbilityCosts['summon'],
        this.primaryAbilityCosts['control'],
        this.primaryAbilityCosts['bind'],
        this.primaryAbilityCosts['banish'],
      ]
    };
  }

  get psychicArray() {
    return {
      'name': 'Psychic',
      'limit': Math.floor(this.limits['psychic'] * 100) + '%',
      'array': [
        this.primaryAbilityCosts['psychicPoints'],
        this.primaryAbilityCosts['psychicProjection'],
      ]
    };
  }

  get primaryAbilityCostArrays() {
    return [
      this.combatArray,
      this.supernaturalArray,
      this.psychicArray,
    ];
  }

  get primaryBonusArray() {
    var array = [];
    for (let i in this.innateBonuses.primaryAbility) {
      if (i != "psychicPoints") {
        array.push(this.innateBonuses.primaryAbility[i]);
      }
    }
    if (array.length > 0) {
      return {
        'name':'Primary',
        'array': array
      };
    }
    return null;
  }

  get secondaryBonusArray() {
    var array = [];
    for (let i in this.innateBonuses.secondaryAbility) {
      array.push(this.innateBonuses.secondaryAbility[i]);
    }
    if (array.length > 0) {
      return {
        'name':'Secondary',
        'array': array
      };
    }
    return null;
  }

  get otherBonusArray() {
    var array = [];
    for (let i in this.innateBonuses.otherAbility) {
      array.push(this.innateBonuses.otherAbility[i]);
    }
    if (array.length > 0) {
      return {
        'name':'Other',
        'array': array
      };
    }
    return null;
  }

  get innateBonusArrays() {
    var array = [];
    if (this.primaryBonusArray) {
      array.push(this.primaryBonusArray);
    }
    if (this.secondaryBonusArray) {
      array.push(this.secondaryBonusArray);
    }
    if (this.otherBonusArray) {
      array.push(this.otherBonusArray);
    }
    return array;
  }
}

var BONUS_NAMES = {
  'lifePointMultiple':'Life Point Multiple',
  'lifePoints':'Life Points',
  'initiative':'Initiative',
  'attack':'Attack',
  'block':'Block',
  'dodge':'Dodge',
  'ki_str':'Ki (Str)',
  'ki_agi':'Ki (Agi)',
  'ki_dex':'Ki (Dex)',
  'ki_con':'Ki (Con)',
  'ki_int':'Ki (Int)',
  'ki_pow':'Ki (Pow)',
  'ki_wp':'Ki (WP)',
  'ki_per':'Ki (Per)',
  'kiAccumulationMultiple_str':'Ki Accumulation Multiple (Str)',
  'kiAccumulationMultiple_agi':'Ki Accumulation Multiple (Agi)',
  'kiAccumulationMultiple_dex':'Ki Accumulation Multiple (Dex)',
  'kiAccumulationMultiple_con':'Ki Accumulation Multiple (Con)',
  'kiAccumulationMultiple_int':'Ki Accumulation Multiple (Int)',
  'kiAccumulationMultiple_pow':'Ki Accumulation Multiple (Pow)',
  'kiAccumulationMultiple_wp':'Ki Accumulation Multiple (WP)',
  'kiAccumulationMultiple_per':'Ki Accumulation Multiple (Per)',
  'wearArmor':'Wear Armor',
  'zeon':'Zeon',
  'magicAccumulationMultiple':'Magic Accumulation Multiple',
  'magicProjection':'Magic Projection',
  'summon':'Summon',
  'control':'Control',
  'bind':'Bind',
  'banish':'Banish',
  'psychicPoints':'Psychic Points',
  'psychicProjection':'Psychic Projection',
  'acrobatics':'Acrobatics',
  'athleticism':'Athleticism',
  'climb':'Climb',
  'jump':'Jump',
  'ride':'Ride',
  'swim':'Swim',
  'intimidate':'Intimidate',
  'leadership':'Leadership',
  'persuasion':'Persuasion',
  'style':'Style',
  'notice':'Notice',
  'search':'Search',
  'track':'Track',
  'animals':'Animals',
  'appraisal':'Appraisal',
  'herbalLore':'Herbal Lore',
  'history':'History',
  'magicAppraisal':'Magic Appraisal',
  'medicine':'Medicine',
  'memorize':'Memorize',
  'navigation':'Navigation',
  'occult':'Occult',
  'sciences':'Sciences',
  'composure':'Composure',
  'withstandPain':'Withstand Pain',
  'featsOfStrength':'Feats Of Strength',
  'theft':'Theft',
  'disguise':'Disguise',
  'hide':'Hide',
  'stealth':'Stealth',
  'trapLore':'Trap Lore',
  'lockPicking':'Lock Picking',
  'poisons':'Poisons',
  'art':'Art',
  'dance':'Dance',
  'music':'Music',
  'sleightOfHand':'Sleight Of Hand',
  'forging':'Forging',
}

Class.warrior = new Class({
      'name':'Warrior',
      'description':'No description yet!',
      'archetype':['fighter'],
      'otherAbilityCosts': {
        'lifePointMultiple':
            {'cost':15,'bonus':1,'currency':'DP'},
      },
      'lifePoints':
          {'cost':1,'bonus':15,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'martialKnowledge':
          {'cost':1,'bonus':25,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_str':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_agi':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_dex':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_con':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_int':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_pow':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_wp':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_per':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_str':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_agi':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_dex':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_con':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_int':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_pow':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_wp':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_per':
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
          'psychicPoints':
              {'cost':20,'bonus':1,'currency':'DP'},
          'psychicProjection':
              {'cost':3,'bonus':1,'currency':'DP'},
      },
      'limits': {
        'combat': 0.6,
        'supernatural': 0.5,
        'psychic': 0.5,
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
          },
          'secondaryAbility': {
              'featsOfStrength':{'cost':1,'bonus':5,'currency':'level'},
          },
          'otherAbility': {
          },
      },
  });

Class.acrobaticWarrior = new Class({
      'name':'Acrobatic Warrior',
      'description':'No description yet!',
      'archetype':['fighter'],
      'otherAbilityCosts': {
        'lifePointMultiple':
            {'cost':20,'bonus':1,'currency':'DP'},
      },
      'lifePoints':
          {'cost':1,'bonus':10,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':10,'currency':'level'},
      'martialKnowledge':
          {'cost':1,'bonus':25,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':3,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_str':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_agi':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_dex':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_con':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_int':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_pow':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_wp':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_per':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_str':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_agi':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_dex':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_con':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_int':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_pow':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_wp':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_per':
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
      'limits': {
        'combat': 0.6,
        'supernatural': 0.5,
        'psychic': 0.5,
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
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'acrobatics': {'cost':1,'bonus':10,'currency':'level'},
              'jump': {'cost':1,'bonus':10,'currency':'level'},
              'athleticism': {'cost':1,'bonus':10,'currency':'level'},
              'sleightOfHand': {'cost':1,'bonus':10,'currency':'level'},
              'style': {'cost':1,'bonus':10,'currency':'level'},
          },
          'otherAbility': {
          },
      },
  });

Class.paladin = new Class({
      'name':'Paladin',
      'description':'No description yet!',
      'archetype':['fighter'],
      'otherAbilityCosts': {
        'lifePointMultiple':
            {'cost':15,'bonus':1,'currency':'DP'},
      },
      'lifePoints':
          {'cost':1,'bonus':15,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'martialKnowledge':
          {'cost':1,'bonus':20,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_str':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_agi':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_dex':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_con':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_int':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_pow':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_wp':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_per':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_str':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_agi':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_dex':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_con':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_int':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_pow':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_wp':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_per':
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
      'limits': {
        'combat': 0.6,
        'supernatural': 0.5,
        'psychic': 0.5,
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
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'leadership': {'cost':1,'bonus':10,'currency':'level'},
              'withstandPain': {'cost':1,'bonus':10,'currency':'level'},
              'style': {'cost':1,'bonus':5,'currency':'level'},
          },
          'otherAbility': {
          },
      },
  });

Class.darkPaladin = new Class({
      'name':'Dark Paladin',
      'description':'No description yet!',
      'archetype':['fighter'],
      'otherAbilityCosts': {
        'lifePointMultiple':
            {'cost':15,'bonus':1,'currency':'DP'},
      },
      'lifePoints':
          {'cost':1,'bonus':15,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'martialKnowledge':
          {'cost':1,'bonus':20,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_str':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_agi':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_dex':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_con':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_int':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_pow':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_wp':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_per':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_str':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_agi':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_dex':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_con':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_int':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_pow':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_wp':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_per':
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
      'limits': {
        'combat': 0.6,
        'supernatural': 0.5,
        'psychic': 0.5,
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
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'intimidate': {'cost':1,'bonus':10,'currency':'level'},
              'composure': {'cost':1,'bonus':10,'currency':'level'},
              'style': {'cost':1,'bonus':5,'currency':'level'},
              'persuasion': {'cost':1,'bonus':5,'currency':'level'},
          },
          'otherAbility': {
          },
      },
  });

Class.weaponmaster = new Class({
      'name':'Weaponmaster',
      'description':'No description yet!',
      'archetype':['fighter'],
      'otherAbilityCosts': {
        'lifePointMultiple':
            {'cost':10,'bonus':1,'currency':'DP'},
      },
      'lifePoints':
          {'cost':1,'bonus':20,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'martialKnowledge':
          {'cost':1,'bonus':10,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_str':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_agi':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_dex':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_con':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_int':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_pow':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_wp':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_per':
              {'cost':3,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_str':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_agi':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_dex':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_con':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_int':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_pow':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_wp':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_per':
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
      'limits': {
        'combat': 0.6,
        'supernatural': 0.5,
        'psychic': 0.5,
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
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'featsOfStrength': {'cost':1,'bonus':5,'currency':'level'},
          },
          'otherAbility': {
          },
      },
  });

Class.technician = new Class({
      'name':'Technician',
      'description':'No description yet!',
      'archetype':['domine'],
      'otherAbilityCosts': {
        'lifePointMultiple':
            {'cost':20,'bonus':1,'currency':'DP'},
      },
      'lifePoints':
          {'cost':1,'bonus':5,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'martialKnowledge':
          {'cost':1,'bonus':50,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_str':
              {'cost':1,'bonus':1,'currency':'DP'},
          'ki_agi':
              {'cost':1,'bonus':1,'currency':'DP'},
          'ki_dex':
              {'cost':1,'bonus':1,'currency':'DP'},
          'ki_con':
              {'cost':1,'bonus':1,'currency':'DP'},
          'ki_int':
              {'cost':1,'bonus':1,'currency':'DP'},
          'ki_pow':
              {'cost':1,'bonus':1,'currency':'DP'},
          'ki_wp':
              {'cost':1,'bonus':1,'currency':'DP'},
          'ki_per':
              {'cost':1,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_str':
              {'cost':10,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_agi':
              {'cost':10,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_dex':
              {'cost':10,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_con':
              {'cost':10,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_int':
              {'cost':10,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_pow':
              {'cost':10,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_wp':
              {'cost':10,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_per':
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
      'limits': {
        'combat': 0.6,
        'supernatural': 0.5,
        'psychic': 0.5,
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
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
          },
          'otherAbility': {
          },
      },
  });

Class.tao = new Class({
      'name':'Tao',
      'description':'No description yet!',
      'archetype':['fighter','domine'],
      'otherAbilityCosts': {
        'lifePointMultiple':
            {'cost':20,'bonus':1,'currency':'DP'},
      },
      'lifePoints':
          {'cost':1,'bonus':10,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'martialKnowledge':
          {'cost':1,'bonus':30,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_str':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_agi':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_dex':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_con':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_int':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_pow':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_wp':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_per':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_str':
              {'cost':15,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_agi':
              {'cost':15,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_dex':
              {'cost':15,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_con':
              {'cost':15,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_int':
              {'cost':15,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_pow':
              {'cost':15,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_wp':
              {'cost':15,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_per':
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
      'limits': {
        'combat': 0.6,
        'supernatural': 0.5,
        'psychic': 0.5,
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
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'style': {'cost':1,'bonus':5,'currency':'level'},
          },
          'otherAbility': {
          },
      },
  });

Class.ranger = new Class({
      'name':'Ranger',
      'description':'No description yet!',
      'archetype':['fighter','prowler'],
      'otherAbilityCosts': {
        'lifePointMultiple':
            {'cost':20,'bonus':1,'currency':'DP'},
      },
      'lifePoints':
          {'cost':1,'bonus':10,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'martialKnowledge':
          {'cost':1,'bonus':20,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_str':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_agi':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_dex':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_con':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_int':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_pow':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_wp':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_per':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_str':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_agi':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_dex':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_con':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_int':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_pow':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_wp':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_per':
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
      'limits': {
        'combat': 0.6,
        'supernatural': 0.5,
        'psychic': 0.5,
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
          'otherAbility': {
          },
      },
  });

Class.shadow = new Class({
      'name':'Shadow',
      'description':'No description yet!',
      'archetype':['fighter','prowler'],
      'otherAbilityCosts': {
        'lifePointMultiple':
            {'cost':20,'bonus':1,'currency':'DP'},
      },
      'lifePoints':
          {'cost':1,'bonus':5,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':10,'currency':'level'},
      'martialKnowledge':
          {'cost':1,'bonus':25,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':3,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_str':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_agi':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_dex':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_con':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_int':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_pow':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_wp':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_per':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_str':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_agi':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_dex':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_con':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_int':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_pow':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_wp':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_per':
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
      'limits': {
        'combat': 0.6,
        'supernatural': 0.5,
        'psychic': 0.5,
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
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'notice': {'cost':1,'bonus':10,'currency':'level'},
              'search': {'cost':1,'bonus':10,'currency':'level'},
              'hide': {'cost':1,'bonus':10,'currency':'level'},
              'stealth': {'cost':1,'bonus':10,'currency':'level'},
          },
          'otherAbility': {
          },
      },
  });

Class.thief = new Class({
      'name':'Thief',
      'description':'No description yet!',
      'archetype':['prowler'],
      'otherAbilityCosts': {
        'lifePointMultiple':
            {'cost':20,'bonus':1,'currency':'DP'},
      },
      'lifePoints':
          {'cost':1,'bonus':5,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':10,'currency':'level'},
      'martialKnowledge':
          {'cost':1,'bonus':20,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':3,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_str':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_agi':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_dex':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_con':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_int':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_pow':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_wp':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_per':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_str':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_agi':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_dex':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_con':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_int':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_pow':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_wp':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_per':
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
      'limits': {
        'combat': 0.5,
        'supernatural': 0.5,
        'psychic': 0.5,
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
          'otherAbility': {
          },
      },
  });

Class.assassin = new Class({
      'name':'Assassin',
      'description':'No description yet!',
      'archetype':['prowler'],
      'otherAbilityCosts': {
        'lifePointMultiple':
            {'cost':20,'bonus':1,'currency':'DP'},
      },
      'lifePoints':
          {'cost':1,'bonus':5,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':10,'currency':'level'},
      'martialKnowledge':
          {'cost':1,'bonus':20,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':3,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_str':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_agi':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_dex':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_con':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_int':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_pow':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_wp':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_per':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_str':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_agi':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_dex':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_con':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_int':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_pow':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_wp':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_per':
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
      'limits': {
        'combat': 0.5,
        'supernatural': 0.5,
        'psychic': 0.5,
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
          'otherAbility': {
          },
      },
  });

Class.wizard = new Class({
      'name':'Wizard',
      'description':'No description yet!',
      'archetype':['mystic'],
      'otherAbilityCosts': {
        'lifePointMultiple':
            {'cost':20,'bonus':1,'currency':'DP'},
      },
      'lifePoints':
          {'cost':1,'bonus':5,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'martialKnowledge':
          {'cost':1,'bonus':10,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':3,'bonus':1,'currency':'DP'},
          'block':
              {'cost':3,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_str':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_agi':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_dex':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_con':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_int':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_pow':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_wp':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_per':
              {'cost':3,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_str':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_agi':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_dex':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_con':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_int':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_pow':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_wp':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_per':
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
      'limits': {
        'combat': 0.5,
        'supernatural': 0.6,
        'psychic': 0.5,
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
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'magicAppraisal': {'cost':1,'bonus':10,'currency':'level'},
              'occult': {'cost':1,'bonus':5,'currency':'level'},
          },
          'otherAbility': {
          },
      },
  });

Class.warlock = new Class({
      'name':'Warlock',
      'description':'No description yet!',
      'archetype':['fighter','mystic'],
      'otherAbilityCosts': {
        'lifePointMultiple':
            {'cost':20,'bonus':1,'currency':'DP'},
      },
      'lifePoints':
          {'cost':1,'bonus':10,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'martialKnowledge':
          {'cost':1,'bonus':20,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_str':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_agi':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_dex':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_con':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_int':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_pow':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_wp':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_per':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_str':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_agi':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_dex':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_con':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_int':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_pow':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_wp':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_per':
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
      'limits': {
        'combat': 0.5,
        'supernatural': 0.5,
        'psychic': 0.5,
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
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'magicAppraisal': {'cost':1,'bonus':5,'currency':'level'},
          },
          'otherAbility': {
          },
      },
  });

Class.illusionist = new Class({
      'name':'Illusionist',
      'description':'No description yet!',
      'archetype':['mystic','prowler'],
      'otherAbilityCosts': {
        'lifePointMultiple':
            {'cost':20,'bonus':1,'currency':'DP'},
      },
      'lifePoints':
          {'cost':1,'bonus':5,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'martialKnowledge':
          {'cost':1,'bonus':20,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':3,'bonus':1,'currency':'DP'},
          'block':
              {'cost':3,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_str':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_agi':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_dex':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_con':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_int':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_pow':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_wp':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_per':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_str':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_agi':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_dex':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_con':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_int':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_pow':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_wp':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_per':
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
      'limits': {
        'combat': 0.5,
        'supernatural': 0.6,
        'psychic': 0.5,
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
          'otherAbility': {
          },
      },
  });

Class.wizardMentalist = new Class({
      'name':'Wizard Mentalist',
      'description':'No description yet!',
      'archetype':['mystic','psychic'],
      'otherAbilityCosts': {
        'lifePointMultiple':
            {'cost':20,'bonus':1,'currency':'DP'},
      },
      'lifePoints':
          {'cost':1,'bonus':5,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'martialKnowledge':
          {'cost':1,'bonus':10,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':3,'bonus':1,'currency':'DP'},
          'block':
              {'cost':3,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_str':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_agi':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_dex':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_con':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_int':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_pow':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_wp':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_per':
              {'cost':3,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_str':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_agi':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_dex':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_con':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_int':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_pow':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_wp':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_per':
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
      'limits': {
        'combat': 0.5,
        'supernatural': 0.5,
        'psychic': 0.5,
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
              'psychicPoints':{'cost':1,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'magicAppraisal': {'cost':1,'bonus':10,'currency':'level'},
              'occult': {'cost':1,'bonus':5,'currency':'level'},
          },
          'otherAbility': {
          },
      },
  });

Class.summoner = new Class({
      'name':'Summoner',
      'description':'No description yet!',
      'archetype':['mystic'],
      'otherAbilityCosts': {
        'lifePointMultiple':
            {'cost':20,'bonus':1,'currency':'DP'},
      },
      'lifePoints':
          {'cost':1,'bonus':5,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'martialKnowledge':
          {'cost':1,'bonus':10,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':3,'bonus':1,'currency':'DP'},
          'block':
              {'cost':3,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_str':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_agi':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_dex':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_con':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_int':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_pow':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_wp':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_per':
              {'cost':3,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_str':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_agi':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_dex':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_con':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_int':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_pow':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_wp':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_per':
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
      'limits': {
        'combat': 0.5,
        'supernatural': 0.6,
        'psychic': 0.5,
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
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'magicAppraisal': {'cost':1,'bonus':5,'currency':'level'},
              'occult': {'cost':1,'bonus':10,'currency':'level'},
          },
          'otherAbility': {
          },
      },
  });

Class.warriorSummoner = new Class({
      'name':'Warrior Summoner',
      'description':'No description yet!',
      'archetype':['fighter','mystic'],
      'otherAbilityCosts': {
        'lifePointMultiple':
            {'cost':20,'bonus':1,'currency':'DP'},
      },
      'lifePoints':
          {'cost':1,'bonus':10,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'martialKnowledge':
          {'cost':1,'bonus':20,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_str':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_agi':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_dex':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_con':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_int':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_pow':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_wp':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_per':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_str':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_agi':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_dex':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_con':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_int':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_pow':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_wp':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_per':
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
      'limits': {
        'combat': 0.5,
        'supernatural': 0.5,
        'psychic': 0.5,
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
              'psychicPoints':{'cost':3,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              'occult': {'cost':1,'bonus':5,'currency':'level'},
          },
          'otherAbility': {
          },
      },
  });

Class.mentalist = new Class({
      'name':'Mentalist',
      'description':'No description yet!',
      'archetype':['psychic'],
      'otherAbilityCosts': {
        'lifePointMultiple':
            {'cost':20,'bonus':1,'currency':'DP'},
      },
      'lifePoints':
          {'cost':1,'bonus':5,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'martialKnowledge':
          {'cost':1,'bonus':10,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':3,'bonus':1,'currency':'DP'},
          'block':
              {'cost':3,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_str':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_agi':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_dex':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_con':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_int':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_pow':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_wp':
              {'cost':3,'bonus':1,'currency':'DP'},
          'ki_per':
              {'cost':3,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_str':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_agi':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_dex':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_con':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_int':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_pow':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_wp':
              {'cost':30,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_per':
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
      'limits': {
        'combat': 0.5,
        'supernatural': 0.5,
        'psychic': 0.6,
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
              'psychicPoints':{'cost':1,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
          },
          'otherAbility': {
          },
      },
  });

Class.warriorMentalist = new Class({
      'name':'Warrior Mentalist',
      'description':'No description yet!',
      'archetype':['fighter','psychic'],
      'otherAbilityCosts': {
        'lifePointMultiple':
            {'cost':0,'bonus':1,'currency':'DP'},
      },
      'lifePoints':
          {'cost':1,'bonus':10,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'martialKnowledge':
          {'cost':1,'bonus':20,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_str':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_agi':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_dex':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_con':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_int':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_pow':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_wp':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_per':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_str':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_agi':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_dex':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_con':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_int':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_pow':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_wp':
              {'cost':25,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_per':
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
      'limits': {
        'combat': 0.5,
        'supernatural': 0.5,
        'psychic': 0.5,
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
              'psychicPoints':{'cost':1,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
          },
          'otherAbility': {
          },
      },
  });

Class.freelancer = new Class({
      'name':'Freelancer',
      'description':'No description yet!',
      'archetype':['novel'],
      'otherAbilityCosts': {
        'lifePointMultiple':
            {'cost':20,'bonus':1,'currency':'DP'},
      },
      'lifePoints':
          {'cost':1,'bonus':5,'currency':'level'},
      'initiative':
          {'cost':1,'bonus':5,'currency':'level'},
      'martialKnowledge':
          {'cost':1,'bonus':20,'currency':'level'},
      'primaryAbilityCosts': {
          'attack':
              {'cost':2,'bonus':1,'currency':'DP'},
          'block':
              {'cost':2,'bonus':1,'currency':'DP'},
          'dodge':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_str':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_agi':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_dex':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_con':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_int':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_pow':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_wp':
              {'cost':2,'bonus':1,'currency':'DP'},
          'ki_per':
              {'cost':2,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_str':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_agi':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_dex':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_con':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_int':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_pow':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_wp':
              {'cost':20,'bonus':1,'currency':'DP'},
          'kiAccumulationMultiple_per':
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
      'limits': {
        'combat': 0.6,
        'supernatural': 0.6,
        'psychic': 0.6,
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
              'psychicPoints':{'cost':2,'bonus':1,'currency':'level'},
          },
          'secondaryAbility': {
              // TODO: what to do about these?
              // +10 to five different abilities per level
          },
          'otherAbility': {
          },
      },
  });

