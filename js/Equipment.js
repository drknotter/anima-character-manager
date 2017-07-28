class EquipmentBonus {
  constructor(data) {
    check(Array.isArray(data.keyChain), data.keyChain + " is not a valid key chain for an equipment bonus!");
    this.keyChain = data.keyChain;

    check(isNumber(data.bonus), data.bonus + " is not a valid bonus for an equipment bonus!");
    this.bonus = data.bonus;
  }
}

class Equipment {
  constructor(data, character, key) {
    check(data.name, "Missing name for equiment " + key + "!");
    this.name = data.name;
    this.description = data.description;
    
    this.cost = data.cost ? data.cost : 0;
    check(isNumber(this.cost), this.cost + " is not a valid cost for equipment!");
    this.weight = data.weight ? data.weight : 0;
    check(isNumber(this.weight), this.weight + " is not a valid weight for equipment!");
    this.availability = data.availability ? data.availability : "C";
    check(["R","U","C"].indexOf(this.availability) >= 0, this.availability + " is not a valid availability for equipment!");

    this.equipped = data.equipped ? data.equipped : false;
    check(typeof(this.equipped) === "boolean", this.equipped + " is not a valid value for equipped!");

    this.equippedBonuses = [];
    for (let i in data.equippedBonuses) {
      this.equippedBonuses.push(new EquipmentBonus(data.equippedBonuses[i]));
    }

    this.possesionBonuses = [];
    for (let i in data.possesionBonuses) {
      this.possesionBonuses.push(new EquipmentBonus(data.possesionBonuses[i]));
    }

    this.equip = function() {
      this.equipCharacter(character, key);
    };

    this.unequip = function() {
      this.unequipCharacter(character, key);
    };

    if (this.equipped) {
      this.equip();
    }
  }

  equipCharacter(character, key) {
    var me = this;
    this.equipped = true;
    for (let b in this.equippedBonuses) {
      let property = character;
      for (let k in this.equippedBonuses[b].keyChain) {
        property = property[this.equippedBonuses[b].keyChain[k]];
        if (!property) {
          return;
        }
      }

      Object.defineProperty(property, key + "Bonus", {
        get: function() {
          return me.equippedBonuses[b].bonus;
        },
        configurable: true
      });
    }
  }

  unequipCharacter(character, key) {
    this.equipped = false;
    for (let b in this.equippedBonuses) {
      let property = character;
      for (let k in this.equippedBonuses[b].keyChain) {
        property = property[this.equippedBonuses[b].keyChain[k]];
        if (!property) {
          return;
        }
      }

      delete property[key + "Bonus"];
    }
  }

  get costData() {
    var gp = Math.floor(this.cost);
    var sp = Math.floor((this.cost - gp) * 100);
    var cp = Math.round((this.cost - gp - sp / 100) * 1000);
    return {'gp':gp,'sp':sp,'cp':cp};
  }
}

class Armor extends Equipment {
  constructor(data, character, key) {
    super(data, character, key);

    check(isNumber(data.armorRequirement), data.armorRequirement + " is not a valid armor requirement for " + key + "!");
    this.armorRequirement = data.armorRequirement;

    check(isNumber(data.naturalPenalty), data.naturalPenalty + " is not a valid natural penalty for " + key + "!");
    this.naturalPenalty = data.naturalPenalty;
    check(isNumber(data.perceptionPenalty), data.perceptionPenalty + " is not a valid perceptionPenalty for " + key + "!");
    this.perceptionPenalty = data.perceptionPenalty;
    check(isNumber(data.movementRestriction), data.movementRestriction + " is not a valid movement restriction for " + key + "!");
    this.movementRestriction = data.movementRestriction;

    check(isNumber(data.fortitude), data.fortitude + " is not a valid fortitude for " + key + "!");
    this.fortitude = data.fortitude;
    check(isNumber(data.presence), data.presence + " is not a valid presence for " + key + "!");
    this.presence = data.presence;

    check(data.protections, "Armor is missing protections!");
    this.protections = {};

    var types = ['cut','impact','thrust','heat','electricity','cold','energy'];
    for (let t in types) {
      check(isNumber(data.protections[types[t]]), data.protections[types[t]] + " is not a valid armor protection type!");
      this.protections[types[t]] = data.protections[types[t]];
    }
  }

  equipCharacter(character, key) {
    super.equipCharacter(character, key);

    var me = this;
    Object.defineProperty(character.initiative, key + "Bonus", {
      get: function() {
        return Math.min(-(me.naturalPenalty - (character.primaryAbilities.wearArmor.score - me.armorRequirement)), 0);
      },
      configurable: true
    });
    Object.defineProperty(character.movement, key + "Bonus", {
      get: function() {
        return Math.min(-(me.movementRestriction - Math.floor((character.primaryAbilities.wearArmor.score - me.armorRequirement) / 50)), 0);
      },
      configurable: true
    });
  }

  unequipCharacter(character, key) {
    super.unequipCharacter(character, key);

    delete character.initiative[key + "Bonus"];
    delete character.movement[key + "Bonus"];
  }
}