class Characteristic extends Scoreable {
  constructor(data, key) {
    super();
    if (data.characteristicLevelBonusesInvested) {
      this.characteristicLevelBonusesInvested = data.characteristicLevelBonusesInvested;
    } else {
      this.characteristicLevelBonusesInvested = 0;
    }

    check(isNumber(data.base), data.base + " is not a valid base score for characteristic " + key + "!");
    this.base = Number(data.base);

    var attrs = ['name', 'nickname', 'description'];
    for (let i in attrs) {
      Object.defineProperty(this, attrs[i], {
        get: function() {
          return CHARACTERISTIC_INFO[key][attrs[i]];
        }
      });
    }

    Object.defineProperty(this, 'baseBonus', {
      get: function() {
        return this.base;
      }
    });
    Object.defineProperty(this, 'characteristicLevelBonus', {
      get: function() {
        return this.characteristicLevelBonusesInvested;
      }
    });
  }

  get modifier() {
    var score = this.score;
    if (score <= 1) {
      return -30;
    } else if (score == 2) {
      return -20;
    } else if (score == 3) {
      return -10;
    } else if (score == 4) {
      return -5;
    } else if (score > 20) {
      return 45;
    }
    return Math.round(3/5 * (score - 5)) * 5;
  }

  get percentile() {
    return Math.floor(10 * this.score / 3);
  }
}

var CHARACTERISTIC_INFO = {
  'str':{'name':'Strength','nickname':'Str','description':'No description yet!'},
  'agi':{'name':'Agility','nickname':'Agi','description':'No description yet!'},
  'dex':{'name':'Dexterity','nickname':'Dex','description':'No description yet!'},
  'con':{'name':'Constitution','nickname':'Con','description':'No description yet!'},
  'int':{'name':'Intelligence','nickname':'Int','description':'No description yet!'},
  'pow':{'name':'Power','nickname':'Pow','description':'No description yet!'},
  'wp':{'name':'Willpower','nickname':'WP','description':'No description yet!'},
  'per':{'name':'Perception','nickname':'Per','description':'No description yet!'},
};
