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
    var me = this;
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
    };

    this.unequip = function() {
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
    };

    if (this.equipped) {
      this.equip();
    }
  }
}

