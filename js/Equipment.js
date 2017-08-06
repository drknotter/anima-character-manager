function gatherScoreables(data, keychain) {
  if (!data) {
    return [];
  }

  var out = []
  if (data instanceof Scoreable) {
    out = out.concat([{'keychain': keychain.join('|'), 'name': data.name}]);
  } else if (typeof data !== "string") {
    var names = Object.getOwnPropertyNames(data);
    for (let i in names) {
      if (names[i] === "constructor" || names[i] === "length" || names === "prototype") {
        continue;
      }
      console.log(names[i]);
      out = out.concat(gatherScoreables(data[names[i]], keychain.concat(names[i])));
    }
  }
  return out;
}

class EquipmentBonus {
  constructor(data) {
    check(Array.isArray(data.keyChain), data.keyChain + " is not a valid key chain for an equipment bonus!");
    this.keyChain = data.keyChain;

    check(isNumber(data.bonus), data.bonus + " is not a valid bonus for an equipment bonus!");
    this.bonus = data.bonus;
  }

  apply(character, key) {
    var me = this;
    let property = character;
    for (let k in this.keyChain) {
      property = property[this.keyChain[k]];
      if (!property) {
        return;
      }
    }

    Object.defineProperty(property, key + "Bonus", {
      get: function() {
        return me.bonus;
      },
      configurable: true
    });
  }

  unapply(character, key) {
    let property = character;
    for (let k in this.keyChain) {
      property = property[this.keyChain[k]];
      if (!property) {
        return;
      }
    }

    delete property[key + "Bonus"];
  }
}

class Equipment {
  constructor(data, character, key) {
    check(data.name, "Missing name for equiment with key " + key + "!");
    this.name = data.name;
    this.description = data.description;
    
    this.cost = data.cost ? data.cost : 0;
    check(isNumber(this.cost), this.cost + " is not a valid cost for equipment!");
    this.weight = data.weight ? data.weight : 0;
    check(isNumber(this.weight), this.weight + " is not a valid weight for equipment!");
    this.availability = data.availability ? data.availability : "C";
    check(["R","U","C"].indexOf(this.availability) >= 0, this.availability + " is not a valid availability for equipment!");

    check(isNumber(data.fortitude), data.fortitude + " is not a valid fortitude for " + this.name + "!");
    this.fortitude = data.fortitude;
    check(isNumber(data.presence), data.presence + " is not a valid presence for " + this.name + "!");
    this.presence = data.presence;

    this.qualityBonus = data.qualityBonus ? data.qualityBonus : 0;
    check(isNumber(this.qualityBonus), this.qualityBonus + " is not a valid quality bonus for " + this.name + "!");

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
    this.equipped = true;
    for (let b in this.equippedBonuses) {
      this.equippedBonuses[b].apply(character, key);
    }
  }

  unequipCharacter(character, key) {
    this.equipped = false;
    for (let b in this.equippedBonuses) {
      this.equippedBonuses[b].unapply(character, key);
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

    check(isNumber(data.armorRequirement), data.armorRequirement + " is not a valid armor requirement for " + this.name + "!");
    this.armorRequirement = data.armorRequirement;

    check(isNumber(data.naturalPenalty), data.naturalPenalty + " is not a valid natural penalty for " + this.name + "!");
    this.naturalPenalty = data.naturalPenalty;
    check(isNumber(data.perceptionPenalty), data.perceptionPenalty + " is not a valid perceptionPenalty for " + this.name + "!");
    this.perceptionPenalty = data.perceptionPenalty;
    check(isNumber(data.movementRestriction), data.movementRestriction + " is not a valid movement restriction for " + this.name + "!");
    this.movementRestriction = data.movementRestriction;

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

class Weapon extends Equipment {
  constructor(data, character, key) {
    super(data, character, key);

    check(isNumber(data.damage), data.damage + " is not a valid value for damage for " + this.name + "!");
    this.damage = data.damage;
    check(isNumber(data.speed), data.speed + " is not a valid value for speed for " + this.name + "!");
    this.speed = data.speed;
    check(isNumber(data.requiredStrength), data.requiredStrength + " is not a valid value for required strength for " + this.name + "!");
    this.requiredStrength = data.requiredStrength;

    check(!data.primaryAttackType || typeof data.primaryAttackType === 'string', data.primaryAttackType + " is not a valid value for primary attack type for " + this.name + "!");
    this.primaryAttackType = data.primaryAttackType;
    check(!data.secondaryAttackType || typeof data.secondaryAttackType === 'string', data.secondaryAttackType + " is not a valid value for secondary attack type for " + this.name + "!");
    this.secondaryAttackType = data.secondaryAttackType;
    check(!data.weaponType || typeof data.weaponType === 'string', data.weaponType + " is not a valid value for weapon type for " + this.name + "!");
    this.weaponType = data.weaponType;
    check(!data.special || typeof data.special === 'string', data.special + " is not a valid value for special for " + this.name + "!");
    this.special = data.special;
    check(!data.twoHanded || typeof data.twoHanded === 'boolean', data.twoHanded + " is not a valid value for two-handedness for " + this.name + "!");
    this.twoHanded = data.twoHanded ? data.twoHanded : false;

    Object.defineProperty(this, 'finalDamage', {
      get: function() {
        return this.damage + (this.twoHanded ? 2 : 1) * character.characteristics.str.modifier;
      }
    });
  }
}