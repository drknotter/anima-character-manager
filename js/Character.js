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

    check(data.name, "Missing character name!");
    this.name = data.name;
    check(isNumber(data.exp), data.exp + " is not a valid value for exp!");
    this.exp = data.exp;
    check(data.appearance, "Missing character appearance!");
    this.appearance = data.appearance;
    check(data.height, "Missing character height!");
    this.height = data.height;
    check(data.weight, "Missing character weight!");
    this.weight = data.weight;

    check(data.characteristics, "Missing characteristics!");
    this.characteristics = {};
    for (let cKey in data.characteristics) {
      this.characteristics[cKey] = new Characteristic(data.characteristics[cKey], cKey);
    }

    Object.defineProperty(this, 'lifePoints', {
      value: new LifePoints(this),
      enumerable: false
    })

    Object.defineProperty(this, 'initiative', {
      value: new Initiative(this),
      enumerable: false
    })

    Object.defineProperty(this, 'movement', {
      value: new Movement(this),
      enumerable: false
    })

    Object.defineProperty(this, 'resistances', {
      value: {
        'disease': new Resistance(this, 'Disease', 'con'),
        'magic': new Resistance(this, 'Magic', 'pow'),
        'physical': new Resistance(this, 'Physical', 'con'),
        'venom': new Resistance(this, 'Venom', 'con'),
        'psychic': new Resistance(this, 'Psychic', 'wp'),
      },
      enumerable: false
    })

    Object.defineProperty(this, 'armorType', {
      value: {
        'cut': new ArmorType(this, 'Cut', 'cut'),
        'impact': new ArmorType(this, 'Impact', 'impact'),
        'thrust': new ArmorType(this, 'Thrust', 'thrust'),
        'heat': new ArmorType(this, 'Heat', 'heat'),
        'electricity': new ArmorType(this, 'Electricity', 'electricity'),
        'cold': new ArmorType(this, 'Cold', 'cold'),
        'energy': new ArmorType(this, 'Energy', 'energy')
      },
      enumerable: false
    })

    check(Class[data.classId], data.classId + " is not a valid class key!");
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

    this.innateSlots = new InnateSlots(data.innateSlots ? data.innateSlots : {'ppInvested': 0});
    this.psychicPotential = new PsychicPotential(data.psychicPotential ? data.psychicPotential : {'ppInvested': 0}, this);

    this.combatModules = {};
    for (let i in data.combatModules) {
      this.combatModules[i] = new CombatModule(data.combatModules[i], this, i);
    }

    // Adjust psychic points by pp invested + mental powers
    Object.defineProperty(this.primaryAbilities.psychicPoints, 'spentBonus', {
      get: function() {
        var disciplines = [];
        var ppInvestedOnMentalPowers = 0;
        for (let i in me.mentalPowers) {
          if (disciplines.indexOf(me.mentalPowers[i].discipline) < 0) {
            ppInvestedOnMentalPowers++;
            disciplines.push(me.mentalPowers[i].discipline);
          }
          ppInvestedOnMentalPowers++;
        }

        return -(totalInvested(me, 'ppInvested') + ppInvestedOnMentalPowers);
      }
    });

    this.currentLifePoints = this.lifePoints.score;
    if (data.currentLifePoints) {
      this.currentLifePoints = data.currentLifePoints;
    }
    this.currentFatigue = this.fatigue;
    if (data.currentFatigue) {
      this.currentFatigue = data.currentFatigue;
    }

    this.wealth = data.wealth ? data.wealth : 0;
    check(isNumber(this.wealth), this.wealth + " is not a valid value for wealth!");

    this.equipment = {
      'items':{},
      'armors':{},
      'weapons':{}
    };
    if (data.equipment) {
      for (let i in data.equipment.items) {
        this.equipment.items[i] = new Equipment(data.equipment.items[i], this, i);
      }
      for (let i in data.equipment.armors) {
        this.equipment.armors[i] = new Armor(data.equipment.armors[i], this, i);
      }
      for (let i in data.equipment.weapons) {
        this.equipment.weapons[i] = new Weapon(data.equipment.weapons[i], this, i);
      }
    }

    this.elan = {};
    for (let i in Elan.Data) {
      let elanData = data.elan ? data.elan[i] : {};
      this.elan[i] = new Elan(elanData, this, i);
    }
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

  get totalDP() {
    return 100 * this.level + 500;
  }

  get DP() {
    return this.totalDP - totalInvested(this, 'dpInvested');
  }

  get CP() {
    return 3 - totalInvested(this, 'cpInvested');
  }

  get wealthData() {
    var gp = Math.floor(this.wealth);
    var sp = Math.floor((this.wealth - gp) * 100);
    var cp = Math.round((this.wealth - gp - sp / 100) * 1000);
    return {'gp':gp,'sp':sp,'cp':cp};
  }

  get characteristicLevelBonuses() {
    var totalLevelBonusesInvested = totalInvested(this, 'characteristicLevelBonusesInvested');
    return Math.floor(this.level / 2 - totalLevelBonusesInvested);
  }

  get secondaryAbilityLevelBonuses() {
    var totalLevelBonusesInvested = totalInvested(this, 'secondaryAbilityLevelBonusesInvested');
    return this.level - totalLevelBonusesInvested;
  }

  get martialKnowledge() {
    // TODO: add bonuses from martial arts
    return this.class.martialKnowledge.bonus * Math.floor(this.level / this.class.martialKnowledge.cost);
  }

  get fatigue() {
    return this.characteristics.con.score;
  }

  get actions() {
    var x = this.characteristics.agi.score + this.characteristics.dex.score;
    if (x < 11) {
      return 1;
    } else if (x < 15) {
      return 2;
    } else if (x < 20) {
      return 3;
    } else if (x < 23) {
      return 4;
    } else if (x < 26) {
      return 5;
    } else if (x < 29) {
      return 6;
    } else if (x < 32) {
      return 8;
    }
    return 10;
  }

  get basePresence() {
    return 25 + this.level * 5;
  }

  get class() {
    return Class[this.classId];
  }
}

class LifePoints extends Scoreable {
  constructor(character) {
    super('Life Points');
    Object.defineProperty(this, 'baseBonus', {
      get: function() {
        return 20 + character.characteristics.con.score * 10 + character.characteristics.con.modifier;
      }
    })

    Object.defineProperty(this, 'classLevelBonus', {
      get: function() {
        return character.class.lifePoints.bonus * Math.floor(character.level / character.class.lifePoints.cost);
      }
    });

    Object.defineProperty(this, 'multipleBonus', {
      get: function() {
        return character.class.otherAbilityCosts.lifePointMultiple.bonus 
          * Math.floor(character.otherAbilities.lifePointMultiple.dpInvested / character.class.otherAbilityCosts.lifePointMultiple.cost) 
          * character.characteristics.con.score;
      }
    });
  }
}

class Initiative extends Scoreable {
  constructor(character) {
    super('Initiative');
    Object.defineProperty(this, 'baseBonus', {
      get: function() {
        return 20 + character.characteristics.dex.modifier + character.characteristics.agi.modifier;
      }
    });
    Object.defineProperty(this, 'levelBonus', {
      get: function() {
        return character.class.initiative.bonus * Math.floor(character.level / character.class.initiative.cost);
      }
    });
    Object.defineProperty(this, 'weaponBonus', {
      get: function() {
        var minSpeed = Infinity;
        for (let i in character.equipment.weapons) {
          if (character.equipment.weapons[i].equipped) {
            minSpeed = Math.min(minSpeed, character.equipment.weapons[i].speed);
          }
        }
        return minSpeed < Infinity ? minSpeed : 0;
      }
    });
  }
}

class Movement extends Scoreable {
  constructor(character) {
    super('Movement');

    Object.defineProperty(this, 'agiBonus', {
      get: function() {
        return character.characteristics.agi.score;
      }
    });
  }

  get score() {
    var value = super.score;
    if (value <= 1) {
      return 3;
    } else if (value == 2) {
      return 15;
    } else if (value == 3) {
      return 25;
    } else if (value == 4) {
      return 50;
    } else if (value == 5) {
      return 65;
    } else if (value == 6) {
      return 70;
    } else if (value == 7) {
      return 80;
    } else if (value == 8) {
      return 90;
    } else if (value == 9) {
      return 105;
    } else if (value == 10) {
      return 115;
    } else if (value == 11) {
      return 130;
    } else if (value == 12) {
      return 160;
    } else if (value == 13) {
      return 250;
    } else if (value == 14) {
      return 500;
    } else if (value == 15) {
      return 800;
    } else if (value == 16) {
      return 1500;
    } else if (value == 17) {
      return 3000;
    } else if (value == 18) {
      return 15840;
    } else if (value == 19) {
      return 79200;
    } else {
      return Infinity;
    }
  }
}

class Resistance extends Scoreable {
  constructor(character, name, characteristic) {
    super(name);

    Object.defineProperty(this, 'basePresenceBonus', {
      get: function() {
        return character.basePresence;
      }
    });
    Object.defineProperty(this, 'characteristicModifierBonus', {
      get: function() {
        return character.characteristics[characteristic].modifier;
      }
    });
  }

  get percentile() {
    return Math.floor(this.score - this.basePresenceBonus / 3);
  }
}

class ArmorType extends Scoreable {
  constructor(character, name, key) {
    super(name);

    Object.defineProperty(this, 'armorBonus', {
      get: function() {

        var bonuses = []
        for (let i in character.equipment.armors) {
          if (character.equipment.armors[i].equipped) {
            bonuses.push(character.equipment.armors[i].protections[key]);
          }
        }
        bonuses.sort(function(a,b){return a-b;});

        var total = 0;
        for (let i=0; i<bonuses.length; i++) {
          if (i == 0) {
            total += bonuses[i];
          } else {
            total += Math.floor(bonuses[i] / 2);
          }
        }
        return total;
      }
    })
  }
}