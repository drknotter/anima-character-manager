function totalInvested(data, key) {
  if (!data) {
    return 0;
  }

  var sum = 0;
  for (var i in data) {
    if (i === key && data[i]) {
      sum += data[i];
    } else if (data[i] instanceof Object) {
      sum += totalInvested(data[i], key);
    }
  }
  return sum;
}

class Character {
  constructor(data) {
    if (!data) { data = {}; }
    var me = this;

    check(data.name, "Missing name!");
    this.name = data.name;
    check(data.exp, "Missing exp!");
    this.exp = data.exp;
    check(data.appearance, "Missing appearance!");
    this.appearance = data.appearance;
    check(data.height, "Missing height!");
    this.height = data.height;
    check(data.weight, "Missing weight!");
    this.weight = data.weight;

    check(data.characteristics, "Missing characteristics!");
    this.characteristics = {};
    for (let cKey in data.characteristics) {
      this.characteristics[cKey] = new Characteristic(data.characteristics[cKey], cKey);
    }

    check(data.classId, "Missing classId!");
    this.classId = data.classId;

    var abilityCategories = ['primaryAbilities', 'secondaryAbilities', 'otherAbilities'];
    for (let a in abilityCategories) {
      check(data[abilityCategories[a]], "Missing " + abilityCategories[a] + "!");
      this[abilityCategories[a]] = {};
      for (let key in data[abilityCategories[a]]) {
        this[abilityCategories[a]][key] = new Ability(data[abilityCategories[a]][key], this, key);
      }
    }

    this.advantages = {};
    for (let aKey in data.advantages) {
      this.advantages[aKey] = new Advantage(data.advantages[aKey], this, aKey);
    }
    this.disadvantages = {};
    for (let aKey in data.disadvantages) {
      this.disadvantages[aKey] = new Advantage(data.disadvantages[aKey], this, aKey);
    }

    this.mentalPowers = {};
    for (let i in data.mentalPowers) {
      this.mentalPowers[i] = new MentalPower(data.mentalPowers[i], this, i);
    }
    this.innateSlots = data.innateSlots;
    Object.defineProperty(this.innateSlots, 'name', {
      get: function() {
        return "Innate Slots";
      }
    });
    this.psychicPotential = new PsychicPotential(data.psychicPotential, this);
    Object.defineProperty(this.psychicPotential, 'name', {
      get: function() {
        return "Psychic Potential";
      }
    });

    // Adjust psychic points by pp invested + mental powers
    this.primaryAbilities.psychicPoints.otherBonuses = function() {
      var disciplines = [];
      var ppInvestedOnMentalPowers = 0;
      for (let i in me.mentalPowers) {
        if (!(me.mentalPowers[i].discipline in disciplines)) {
          ppInvestedOnMentalPowers++;
          disciplines.push(me.mentalPowers[i].discipline);
        }
        ppInvestedOnMentalPowers++;
      }

      return -(totalInvested(me, 'ppInvested') + ppInvestedOnMentalPowers);
    };

    check(data.currentLifePoints, "Missing currentLifePoints!");
    this.currentLifePoints = data.currentLifePoints;
    check(data.currentFatigue, "Missing currentFatigue!");
    this.currentFatigue = data.currentFatigue;
  }

  get level() {
    var level = 0;
    if (this.exp <= 4125) {
      level = -2.5 + 0.1 * Math.sqrt(8 * this.exp + 1225);
    } else {
      level = (this.exp - 4125) / 450 + 16;
    }
    return Math.floor(level);
  }

  get toNextLevel() {
    var level = this.level;
    if (level <= 15) {
      return 75 * level + 25 * level * (level + 1) / 2;
    } else {
      return 4125 + 450 * (level - 15);
    }
  }

  get DP() {
    return 100 * this.level + 500 - totalInvested(this, 'dpInvested');
  }

  get CP() {
    return 3 - totalInvested(this, 'cpInvested');
  }

  get characteristicLevelBonuses() {
    var totalLevelBonusesInvested = totalInvested(this, 'characteristicLevelBonusesInvested');
    return Math.floor(this.level / 2 - totalLevelBonusesInvested);
  }

  get secondaryAbilityLevelBonuses() {
    var totalLevelBonusesInvested = totalInvested(this, 'secondaryAbilityLevelBonusesInvested');
    return this.level - totalLevelBonusesInvested;
  }

  get lifePoints() {
    return this.baseLifePoints() + this.classLevelLifePoints() + this.multipleLifePoints();
  }

  baseLifePoints() {
    return 20 + this.characteristics.con.score * 10 + this.characteristics.con.modifier;
  }

  classLevelLifePoints() {
    return this.class.lifePoints.bonus * Math.floor(this.level / this.class.lifePoints.cost);
  }

  multipleLifePoints() {
    return this.class.otherAbilityCosts.lifePointMultiple.bonus 
        * Math.floor(this.otherAbilities.lifePointMultiple.dpInvested / this.class.otherAbilityCosts.lifePointMultiple.cost) 
        * this.characteristics.con.score;
  }

  get initiative() {
    var baseInitiative = 20 + this.characteristics.dex.modifier + this.characteristics.agi.modifier;
    var armorModifier = 0; // TODO: fill this in.
    var levelBonus = this.class.initiative.bonus * Math.floor(this.level / this.class.initiative.cost);
    return baseInitiative + armorModifier + levelBonus;
  }

  get martialKnowledge() {
    // TODO: add bonuses from martial arts
    return this.class.martialKnowledge.bonus * Math.floor(this.level / this.class.martialKnowledge.cost);
  }

  get movement() {
    var agi = this.characteristics.agi.score;
    if (agi <= 1) {
      return 3;
    } else if (agi == 2) {
      return 15;
    } else if (agi == 3) {
      return 25;
    } else if (agi == 4) {
      return 50;
    } else if (agi == 5) {
      return 65;
    } else if (agi == 6) {
      return 70;
    } else if (agi == 7) {
      return 80;
    } else if (agi == 8) {
      return 90;
    } else if (agi == 9) {
      return 105;
    } else if (agi == 10) {
      return 115;
    } else if (agi == 11) {
      return 130;
    } else if (agi == 12) {
      return 160;
    } else if (agi == 13) {
      return 250;
    } else if (agi == 14) {
      return 500;
    } else if (agi == 15) {
      return 800;
    } else if (agi == 16) {
      return 1500;
    } else if (agi == 17) {
      return 3000;
    } else if (agi == 18) {
      return 15840;
    } else if (agi == 19) {
      return 79200;
    } else {
      return Infinity;
    }
  }

  get fatigue() {
    return this.characteristics.con.score;
  }

  get basePresence() {
    return 25 + this.level * 5;
  }

  get resistances() {
    return {
      'disease': {
        'name':'Disease', 
        'score': this.basePresence + this.characteristics.con.modifier,
        'percentile': Math.floor(this.basePresence / 1.5 + this.characteristics.con.modifier),
      },
      'magic': {
        'name':'Magic', 
        'score': this.basePresence + this.characteristics.pow.modifier,
        'percentile': Math.floor(this.basePresence / 1.5 + this.characteristics.pow.modifier),
      },
      'physical': {
        'name':'Physical', 
        'score': this.basePresence + this.characteristics.con.modifier,
        'percentile': Math.floor(this.basePresence / 1.5 + this.characteristics.con.modifier),
      },
      'venom': {
        'name':'Venom', 
        'score': this.basePresence + this.characteristics.con.modifier,
        'percentile': Math.floor(this.basePresence / 1.5 + this.characteristics.con.modifier),
      },
      'psychic': {
        'name':'Psychic', 
        'score': this.basePresence + this.characteristics.wp.modifier,
        'percentile': Math.floor(this.basePresence / 1.5 + this.characteristics.wp.modifier),
      },
    };
  }

  get class() {
    return Class[this.classId];
  }
}

