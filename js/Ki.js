class KiAbility {
  constructor(character, key) {
    this.martialKnowledgeInvested = KiAbility.Data[key].martialKnowledge;
  }
}

KiAbility.RequirementFor = function(character, key) {
  return KiAbility.CostRequirement(character, key)
      || KiAbility.Data[key].requirementFn(character);
}

KiAbility.CostRequirement = function(character, key) {
  return KiAbility.Data[key].martialKnowledge < character.martialKnowledge.score ? null : "Not enough martial knowledge.";
}

KiAbility.Data = {
  'useOfKi': {
    'name': 'Use of Ki',
    'description': 'This is the foundational Ki Ability upon which all others are based. It allows a character to awaken his inner energy and use it subconciously.',
    'requirements': 'None',
    'martialKnowledge': 40,
    'requirementFn': function(character) {
      return null;
    }
  },
  'kiControl': {
    'name': 'Ki Control',
    'description': 'This ability allows total control of inner energy. A character with this ability is fully aware of his supernatural power and can Accumulate Ki. Once acquired, Ki Control allows characters to learn Dominion Techniques.',
    'requirements': 'Use of Ki',
    'martialKnowledge': 30,
    'requirementFn': function(character) {
      return 'useOfKi' in character.kiAbilities ? null : "Requires 'Use of Ki'";
    }
  }
};

class KiTechnique {
  constructor(character, data) {
    check(typeof data.name === "string", data.name + " is not a valid name for a ki technique!");
    this.name = data.name;

    check(typeof data.description === "string", data.description + " is not a valid description for a ki technique!");
    this.description = data.description;

    check(isNumber(data.level) && data.level > 0 && data.level <= 3, data.level + " is not a valid level for a ki technique!");
    this.level = data.level;

    check(data.effects && Object.keys(data.effects).length > 0, "Ki techniques need at least one effect!");
    this.effects = [];
    for (let i=0; i<data.effects.length; i++) {
      check(data.effects[i].key in KiTechnique.Data, i + " is not a valid effect for a ki technique!");
      check(isNumber(data.effects[i].level), data.effects[i] + " is not a valid effect level for a ki technique!");
      this.effects.push({});
      this.effects[i].level = data.effects[i].level;
      if (data.effects[i].optionalCharacteristics) {
        this.effects[i].optionalCharacteristics = data.effects[i].optionalCharacteristics;
      }

      for (let j in data.effects[i].advantages) {
        check(j in KiTechnique.Data[data.effects[i].key].advantages, j + " is not a valid optional advantage for effect " + KiTechnique.Data[data.effects[i].key].name + "!");
        check(data.effects[i].advantages[j].option in KiTechnique.Data[data.effects[i].key].advantages[j].options, data.effects[i].advantages[j].option + " is not a valid option for advantage " + KiTechnique.Data[data.effects[i].key].advantages[j].name + "!");
      }
    }
  }
}

KiTechnique.Data = {
  "attackAbility": {
    "name": "Attack Ability",
    "description": "This effect adds a bonus to the Attack Ability. Upon rolling the dice, a character adds the number under \"Attack Bonus\" to his roll.",
    "primaryCharacteristic": "dex",
    "relatedElements": "Air, Fire, Darkness",
    "optionalCharacteristics": {
      "agi": 2,
      "pow": 2,
      "wp": 3,
      "str": 2
    },
    "bonus": {
      "name": "Attack Bonus",
      "levels": [
        {
          "amount": 10,
          "primary": 2,
          "secondary": 4,
          "martialKnowledge": 5,
          "maintainCost": 1,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 25,
          "primary": 3,
          "secondary": 5,
          "martialKnowledge": 5,
          "maintainCost": 2,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 40,
          "primary": 4,
          "secondary": 6,
          "martialKnowledge": 10,
          "maintainCost": 3,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 50,
          "primary": 5,
          "secondary": 8,
          "martialKnowledge": 15,
          "maintainCost": 4,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 75,
          "primary": 8,
          "secondary": 11,
          "martialKnowledge": 20,
          "maintainCost": 6,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 90,
          "primary": 12,
          "secondary": 15,
          "martialKnowledge": 25,
          "maintainCost": 8,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 100,
          "primary": 14,
          "secondary": 18,
          "martialKnowledge": 30,
          "maintainCost": 10,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 125,
          "primary": 18,
          "secondary": 22,
          "martialKnowledge": 35,
          "maintainCost": 12,
          "minimumTechniqueLevel": 2
        },
        {
          "amount": 150,
          "primary": 22,
          "secondary": 26,
          "martialKnowledge": 40,
          "maintainCost": 14,
          "minimumTechniqueLevel": 2
        },
        {
          "amount": 175,
          "primary": 26,
          "secondary": 32,
          "martialKnowledge": 45,
          "maintainCost": 16,
          "minimumTechniqueLevel": 3
        },
        {
          "amount": 200,
          "primary": 30,
          "secondary": 36,
          "martialKnowledge": 50,
          "maintainCost": 18,
          "minimumTechniqueLevel": 3
        },
      ]
    }
  },
  "damageAugmentation": {
    "name": "Damage Augmentation",
    "description": "This effect increases the damage caused by an attack. This bonus is not added to the result shown in the Combat Table, but rather to the attack's Base Damage. For example, a character who wields a weapon that deals 60 damage using a Technique supplying a +50 bonus would have a 110 Base Damage.",
    "primaryCharacteristic": "str",
    "relatedElements": "Fire, Earth",
    "optionalCharacteristics": {
      "dex": 3,
      "pow": 2,
      "wp": 1,
      "con": 1
    },
    "bonus": {
      "name": "Damage Bonus",
      "levels": [
        {
          "amount": 10,
          "primary": 1,
          "secondary": 2,
          "martialKnowledge": 5,
          "maintainCost": 1,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 25,
          "primary": 2,
          "secondary": 4,
          "martialKnowledge": 5,
          "maintainCost": 1,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 40,
          "primary": 3,
          "secondary": 5,
          "martialKnowledge": 10,
          "maintainCost": 1,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 50,
          "primary": 4,
          "secondary": 6,
          "martialKnowledge": 15,
          "maintainCost": 2,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 75,
          "primary": 6,
          "secondary": 9,
          "martialKnowledge": 20,
          "maintainCost": 3,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 90,
          "primary": 8,
          "secondary": 11,
          "martialKnowledge": 25,
          "maintainCost": 4,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 100,
          "primary": 10,
          "secondary": 13,
          "martialKnowledge": 30,
          "maintainCost": 5,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 125,
          "primary": 14,
          "secondary": 18,
          "martialKnowledge": 35,
          "maintainCost": 6,
          "minimumTechniqueLevel": 2
        },
        {
          "amount": 150,
          "primary": 16,
          "secondary": 20,
          "martialKnowledge": 40,
          "maintainCost": 8,
          "minimumTechniqueLevel": 2
        },
        {
          "amount": 175,
          "primary": 18,
          "secondary": 22,
          "martialKnowledge": 45,
          "maintainCost": 10,
          "minimumTechniqueLevel": 3
        },
        {
          "amount": 200,
          "primary": 20,
          "secondary": 24,
          "martialKnowledge": 50,
          "maintainCost": 12,
          "minimumTechniqueLevel": 3
        },
      ]
    },
    "advantages": {
      "sacrifice": {
        "name": "Sacrifice",
        "description": "This advantage allows a character to increase his attack's Base Damage even more by means of sacrifice added to the Technique -- such as losing Life Points or Characteristics.",
        "options": {
          "vitalSacrifice": {
            "name": "Vital Sacrifice",
            "description": "A character can increase his Base Damage up to an amount equal to the number of Life Points he sacrifices when using a Technique with this effect. If a character spends 50 LP, for example, he adds a +50 bonus to the Technique's Base Damage. If a creature using this Advantage has Damage Resistance, the amount should be increased by means of the Life Multiplier. This LP loss is equivalent to the spell Vital Sacrifice.",
            "cost": 4,
            "martialKnowledge": 15,
            "maintainCost": 3
          },
          "doubleVitalSacrifice": {
            "name": "Double Vital Sacrifice",
            "description": "The same as Vital Sacrifice, except damage is increase by twice the amount of sacrificed Life Points.",
            "cost": 10,
            "martialKnowledge": 50,
            "maintainCost": 4
          },
          "healthSacrifice": {
            "name": "Health Sacrifice",
            "description": "Allows for an increase in an attack's Base Damage equivalent to twice the maximum LP sacrificed. Unlike Vital Sacrifice, Life Points sacrificed this way can never be recovered.",
            "cost": 2,
            "martialKnowledge": 10,
            "maintainCost": 2
          },
          "characteristicSacrifice": {
            "name": "Characteristic Sacrifice",
            "description": "This Advantage increases an attack's Base Damage by 50 points for every primary Characteristic point sacrificed. For example, a character who sacrificed 2 Constitution points would add a +100 bonus to the Technique's Base Damage. This can only be done with those Characteristics employed in Ki Accumulation. Therefore, Intelligence and Perception are excluded. Sacrificed Characteristics cannot be recovered by any means.",
            "cost": 2,
            "martialKnowledge": 10,
            "maintainCost": 2
          },
        }
      }
    }
  }
};