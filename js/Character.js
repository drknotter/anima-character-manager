function totalDPInvested(data) {
  if (!data) {
    return 0;
  }

  var sum = 0;
  for (key in data) {
    if (data[key] instanceof DPInvestment) {
      sum += data[key].dpInvested;
    } else if (data[key] instanceof Object) {
      sum += totalDPInvested(data[key]);
    }
  }
  return sum;
}

class Character {
  constructor(data) {
    if (!data) { data = {}; }

    this.name = data.name;
    this.exp = data.exp;
    this.appearance = data.appearance;
    this.height = data.height;
    this.weight = data.weight;

    this.characteristics = {};
    for (var cKey in data.characteristics) {
      this.characteristics[cKey] = new Characteristic(data.characteristics[cKey], cKey);
    }

    this.classId = data.classId;

    this.primaryAbilities = {};
    for (var pKey in data.primaryAbilities) {
      this.primaryAbilities[pKey] = new Ability(data.primaryAbilities[pKey], this, pKey);
    }

    this.secondaryAbilities = {};
    for (var sKey in data.secondaryAbilities) {
      this.secondaryAbilities[sKey] = new Ability(data.secondaryAbilities[sKey], this, sKey);
    }

    this.lifePointMultiple = new DPInvestment(data.lifePointMultiple);

    this.currentLifePoints = data.currentLifePoints;
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
    return 100 * this.level + 500 - totalDPInvested(this);
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
    return this.class.lifePointMultiple.bonus * Math.floor(this.lifePointMultiple.dpInvested / this.class.lifePointMultiple.cost) * this.characteristics.con.score;
  }

  get initiative() {
    var baseInitiative = 20 + this.characteristics.dex.modifier + this.characteristics.agi.modifier;
    var armorModifier = 0; // TODO: fill this in.
    var levelBonus = this.class.initiative.bonus * Math.floor(this.level / this.class.initiative.cost);
    return baseInitiative + armorModifier + levelBonus;
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
      'disease': {'name':'Disease', 'score': this.basePresence + this.characteristics.con.modifier},
      'magic': {'name':'Magic', 'score': this.basePresence + this.characteristics.pow.modifier},
      'physical': {'name':'Physical', 'score': this.basePresence + this.characteristics.con.modifier},
      'venom': {'name':'Venom', 'score': this.basePresence + this.characteristics.con.modifier},
      'psychic': {'name':'Psychic', 'score': this.basePresence + this.characteristics.wp.modifier},
    };
  }

  get class() {
    return Class[this.classId];
  }
}

