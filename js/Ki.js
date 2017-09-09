class KiAbility {
  constructor(character, key) {
    this.martialKnowledgeInvested = KiAbility.Data[key].martialKnowledge;
  }
}

KiAbility.RenderPopup = function(key, popup, background) {
  popup.html(Mustache.render(KiAbility.Template.popup, KiAbility.Data[key]));
  background.show();
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
  },
  'presenceExtrusion': {
    'name': 'Presence Extrusion',
    'description': 'This ability allows a character to create an invisible aura of Ki around himself. In this way, he can physically touch pure energy and intangible elements --- such as fire, spectral beings, or even magic. In physical combat, a character using Presence Extrusion may injure beings normally only vulnerable to supernatural attacks, up to a value of twice his Presence. In other words, someone with a Presence of 50 could potentially damage a creature as if he used a mystical weapon of Presence value 100. This ability also allows character to repel supernatural effects with the Block Ability or even slash a fireball in half.',
    'requirements': 'Use of Ki',
    'martialKnowledge': 10,
    'requirementFn': function(character) {
      return 'useOfKi' in character.kiAbilities ? null : "Requires 'Use of Ki'";
    }
  },
  'auraExtension': {
    'name': 'Aura Extension',
    'description': "This ability allows a character to extend his aura and convey energy to any hand-held device as if it were a natural extension of the individual. Aura Extension channels a character's essence through a weapon, for example, making it more powerful and difficult to break. This ability also allows a character to extend the powers bestowed by Presence Extrusion to his weapon, granting it the possibility of damaging Energy as if it were a mystical device. These aura-powered weapons or objects can also stop supernatural attacks and similar effects. Consequently, Aura Extension increases a weapon's Base Damage by 10 points and adds 10 points to its Fortitude and 5 points to its Breakage. The latter ability may also be applied to armor. If two individuals engage in combat using weapons powered by this ability, the clash of their sharp edges will send out sparks visible to everyone.",
    'requirements': 'Presence Extrusion',
    'martialKnowledge': 10,
    'requirementFn': function(character) {
      return 'presenceExtrusion' in character.kiAbilities ? null : "Requires 'Presence Extrusion'";
    }
  },
  'increasedDamage': {

  },
  'physicalShield': {

  },
  'kiTransmission': {
    'name': 'Ki Transmission',
    'description': "This ability allows a character to transmit or absorb Ki from another subject. When two individuals with this ability meet, they can exchange their points freely. Naturally, the Ki exchange occurs between the same Characteristics from which they stem. The transmission index per round is equal to a character's Accumulation.",
    'requirements': 'Use of Ki',
    'requirementFn': function(character) {
      return 'useOfKi' in character.kiAbilities ? null : "Requires 'Use of Ki'";
    }
  },
  'kiHealing': {
    'name': 'Ki Healing',
    'description': "This ability allows a character to restore 2 Life Points to a wounded creature for every 1 generic Ki Point spent. A character with this ability can heal himself or any other individual with which he comes into contact. This ability cannot restor health completely; it can only repair up to half the damage.",
    'requirements': 'Ki Transmission',
    'requirementFn': function(character) {
      return 'kiTransmission' in character.kiAbilities ? null : "Requires 'Ki Transmission'";
    }
  },
  'superiorHealing': {

  },
  'energyArmor': {
    'name': 'Energy Armor',
    'description': "This abiliity allows a character to use his aura as a spiritual shield against esoteric effects and pure energy based attacks. Energy Armor grants a natural AT of 2 against Energy. Even though this ability counts as an armor, a character does not suffer any penalties for using additional layers of protection.",
    'requirements': 'Presence Extrusion',
    'requirementFn': function(character) {
      return 'presenceExtrusion' in character.kiAbilities ? null : "Requires 'Presence Extrusion'";
    }
  },
  'inhumanity': {
    'name': 'Inhumanity',
    'description': "This ability allows a character to perform physical tasks otherwise impossible to human beings. Inhumanity allows its user to count any Inhuman-level results they achieve on the Difficulty Table and get the most out of the capabilities their Characteristics allow."
    'requirements': 'Use of Ki',
    'requirementFn': function(character) {
      return 'useOfKi' in character.kiAbilities ? null : "Requires 'Use of Ki'";
    }
  }
};

KiAbility.Template = {};
KiAbility.Template.popup = String.raw`
<div class="kiAbilityPopup popup">
<div class="name">{{name}}</div>
<div class="description">{{description}}</div>
<div class="requirements">Requirements: {{requirements}}</div>
</div>
`;

class KiTechnique {
  constructor(character, data, key) {
    this.name = data.name;
    this.description = data.description;
    this.level = data.level;
    this.maintain = data.maintain;

    this.effects = [];
    for (let i=0; i<data.effects.length; i++) {
      this.effects.push({});
      this.effects[i].key = data.effects[i].key;
      this.effects[i].level = data.effects[i].level;
      this.effects[i].distribution = data.effects[i].distribution;
      this.effects[i].advantages = data.effects[i].advantages;
    }

    if (data.disadvantages) {
      this.disadvantages = data.disadvantages;
    }

    let thisClosure = this;
    Object.defineProperty(character.martialKnowledge, key+'KiTechniqueBonus', {
      get: function() {
        return -KiTechnique.Cost(thisClosure);
      },
      configurable: true
    });

    this.remove = function() {
      delete character.martialKnowledge[key+'KiTechniqueBonus'];
    }
  }

  get cost() {
    return KiTechnique.Cost(this);
  }

}

KiTechnique.Validate = function(data) {
  // validate structure
  check(typeof data.name === "string" && data.name.length > 0, '"' + data.name + '" is not a valid name for a ki technique!');
  check(typeof data.description === "string" && data.description.length > 0, '"' + data.description + '" is not a valid description for a ki technique!');
  check(isNumber(data.level) && data.level > 0 && data.level <= 3, data.level + " is not a valid level for a ki technique!");
  check(typeof data.maintain === "boolean", data.maintain + " is neither true nor false!");

  check(data.effects && Object.keys(data.effects).length > 0, "Ki techniques need at least one effect!");
  for (let i=0; i<data.effects.length; i++) {
    check(data.effects[i].key in KiTechnique.Data.Effects, i + " is not a valid effect for a ki technique!");
    var effectData = KiTechnique.Data.Effects[data.effects[i].key];
    check(isNumber(data.effects[i].level), data.effects[i].level + " is not a valid effect level for a ki technique!");
    check(data.effects[i].distribution, 'Effect "' + KiTechnique.Data.Effects[data.effects[i].key].name + '" is missing ki point distribution!');
    for (let j in data.effects[i].distribution) {
      check(j in Characteristic.Data && (j === effectData.primaryCharacteristic || j in effectData.optionalCharacteristics), j + " is not a valid characteristic for a ki point distribution for effect " + effectData.name + "!");
      check(isNumber(data.effects[i].distribution[j]), data.effects[i].distribution[j] + " is not a valid value for a ki point distribution for effect " + effectData.name + "!");
    }

    for (let j in data.effects[i].advantages) {
      check(data.effects[i].advantages[j].key in effectData.advantages, data.effects[i].advantages[j].key + " is not a valid optional advantage for effect " + effectData.name + "!");
      check(data.effects[i].advantages[j].option in effectData.advantages[data.effects[i].advantages[j].key].options, data.effects[i].advantages[j].option + " is not a valid option for advantage " + effectData.advantages[data.effects[i].advantages[j].key].name + "!");
    }
  }

  for (let i in data.disadvantages) {
    check(data.disadvantages[i].key in KiTechnique.Data.Disadvantages, data.disadvantages[i].key + " is not a valid disadvantage for a ki technique!");
    check(data.disadvantages[i].option in KiTechnique.Data.Disadvantages[data.disadvantages[i].key].options, data.disadvantages[i] + " is not a valid option for ki technique disadvantage " + KiTechnique.Data.Disadvantages[data.disadvantages[i].key].name + "!");
  }

  // validate logic
  var totalMartialKnowledgeCost = 0;
  for (let i=0; i<data.effects.length; i++) {
    check(KiTechnique.Data.Effects[data.effects[i].key].bonus.levels[data.effects[i].level].minimumTechniqueLevel <= data.level,
      'The level of effect "' + KiTechnique.Data.Effects[data.effects[i].key].name + '" is too high!');
    totalMartialKnowledgeCost += KiTechnique.Data.Effects[data.effects[i].key].bonus.levels[data.effects[i].level].martialKnowledge;
    for (let j in data.effects[i].advantages) {
      totalMartialKnowledgeCost += KiTechnique.Data.Effects[data.effects[i].key]
          .advantages[data.effects[i].advantages[j].key]
          .options[data.effects[i].advantages[j].option].martialKnowledge;
    }
  }
  if (data.maintain) {
    totalMartialKnowledgeCost += 10;
  }

  // Ensure disadvantages aren't _too_ advantageous.
  check(!data.disadvantages || data.disadvantages.length <= data.level, "Too many disadvantages for ki technique '" + data.name + "'!");
  var totalDisadvantageSavings = 0;
  for (let i in data.disadvantages) {
    totalDisadvantageSavings += KiTechnique.Data.Disadvantages[data.disadvantages[i].key]
        .options[data.disadvantages[i].option].martialKnowledgeReduction;
  }
  check(totalDisadvantageSavings < 0.5 * totalMartialKnowledgeCost, "Disadvantages are not allowed to lower ki technique costs by more than half!");
  totalMartialKnowledgeCost -= totalDisadvantageSavings;

  // Verify the MK cost.
  check(totalMartialKnowledgeCost <= (50 * Math.pow(2, data.level - 1)), 
    "Total martial knowledge cost (" + totalMartialKnowledgeCost 
      + ") for ki technique '" + data.name + "' exceeds maximum (" 
      + (50 * Math.pow(2, data.level - 1)) + ")!");
  check(totalMartialKnowledgeCost >= 20 * data.level, 
    "Total martial knowledge cost (" + totalMartialKnowledgeCost 
      + ") for ki technique '" + data.name + "' is too low (needs to be at least " 
      + (20 * data.level) + "!");

  // Validate distributions.
  for (let i=0; i<data.effects.length; i++) {
    var effectData = KiTechnique.Data.Effects[data.effects[i].key];
    var totalKiPoints = effectData.bonus.levels[data.effects[i].level][i == 0 ? 'primary' : 'secondary']
        + ( data.maintain ? effectData.bonus.levels[data.effects[i].level].maintainCost : 0);
    for (let j in data.effects[i].advantages) {
      totalKiPoints += effectData.advantages[data.effects[i].advantages[j].key]
          .options[data.effects[i].advantages[j].option].cost;
      if (data.maintain) {
        totalKiPoints += effectData.advantages[data.effects[i].advantages[j].key]
          .options[data.effects[i].advantages[j].option].maintainCost;
      }
    }
    var distributionTotal = 0;
    for (let j in data.effects[i].distribution) {
      distributionTotal += data.effects[i].distribution[j];
      if (j in effectData.optionalCharacteristics) {
        totalKiPoints += effectData.optionalCharacteristics[j];
      }
    }
    check(totalKiPoints <= distributionTotal, "Not enough Ki points (" 
      + distributionTotal + ") distributed for effect " + effectData.name + " (needs " + totalKiPoints + ")!");
    check(totalKiPoints >= distributionTotal, "Too many Ki points (" 
      + distributionTotal + ") distributed for effect " + effectData.name + " (needs " + totalKiPoints + ")!");
  }
};

KiTechnique.Cost = function(data) {
  var totalMartialKnowledgeCost = 0;
  for (let i=0; i<data.effects.length; i++) {
    totalMartialKnowledgeCost += KiTechnique.Data.Effects[data.effects[i].key].bonus.levels[data.effects[i].level].martialKnowledge;
    for (let j in data.effects[i].advantages) {
      totalMartialKnowledgeCost += KiTechnique.Data.Effects[data.effects[i].key]
          .advantages[data.effects[i].advantages[j].key]
          .options[data.effects[i].advantages[j].option].martialKnowledge;
    }
  }
  if (data.maintain) {
    totalMartialKnowledgeCost += 10;
  }

  var totalDisadvantageSavings = 0;
  for (let i in data.disadvantages) {
    totalDisadvantageSavings += KiTechnique.Data.Disadvantages[data.disadvantages[i].key]
        .options[data.disadvantages[i].option].martialKnowledgeReduction;
  }
  totalMartialKnowledgeCost -= totalDisadvantageSavings;
  return totalMartialKnowledgeCost;
}

KiTechnique.RenderPopup = function(character, key, popup, background) {
  var technique = character.kiTechniques[key];
  popup.html(Mustache.render(KiTechnique.Template.popup, technique));

  var advantages = [];
  var totalDistribution = {'str': 0, 'agi': 0, 'dex': 0, 'con': 0, 'pow': 0, 'wp': 0};
  for (let i in technique.effects) {
    popup.find('.effects').append(Mustache.render(
      KiTechnique.Template.popupEffect, {
        'name': KiTechnique.Data.Effects[technique.effects[i].key].name,
        'bonusName': KiTechnique.Data.Effects[technique.effects[i].key].bonus.name,
        'bonusAmount': KiTechnique.Data.Effects[technique.effects[i].key].bonus.levels[technique.effects[i].level].amount
      }));
    for (let j in technique.effects[i].advantages) {
      advantages.push(KiTechnique.Data.Effects[technique.effects[i].key]
        .advantages[technique.effects[i].advantages[j].key]
        .options[technique.effects[i].advantages[j].option]);
    }
    for (let j in totalDistribution) {
      totalDistribution[j] += j in technique.effects[i].distribution ? technique.effects[i].distribution[j] : 0;
    }
  }
  for (let i in totalDistribution) {
    popup.find('.kiRequirements').append(Mustache.render(
      KiTechnique.Template.popupDistribution, {
        "name": Characteristic.Data[i].nickname,
        "value": totalDistribution[i]
      }));
  }
  if (advantages.length > 0) {
    for (let i in advantages) {
      popup.find('.advantages').append(Mustache.render(
        KiTechnique.Template.popupAdvantage, advantages[i]));
    }
  } else {
    popup.find('.advantages').remove();
  }
  if (technique.disadvantages) {
    for (let i in technique.disadvantages) {
      popup.find('.disadvantages').append(Mustache.render(
        KiTechnique.Template.popupDisadvantage, 
        KiTechnique.Data.Disadvantages[technique.disadvantages[i].key]
          .options[technique.disadvantages[i].option]));
    }
  } else {
    popup.find('.disadvantages').remove();
  }
  background.show();
}

KiTechnique.Template = {};
KiTechnique.Template.popup = String.raw`
<div class="kiTechniquePopup popup">
<div class="name">{{name}}</div>
<div class="description">{{description}}</div>
<table class="kiRequirementsContainer">
<tr><th colspan="6">Ki Requirements</th></tr>
<tr class="kiRequirements"></tr>
</table>
<table class="effects kiTechniquePopupTable">
<tr class="effect"><th class="name">Effects</th><th class="bonus"></th></tr>
</table>
<table class="advantages kiTechniquePopupTable">
<tr><th class="name">Advantages</th></tr>
</table>
<table class="disadvantages kiTechniquePopupTable">
<tr><th class="name">Disadvantages</th></tr>
</table>
</div>
`;

KiTechnique.Template.popupDistribution = String.raw`
<td class="kiRequirement">{{name}}<br/>{{value}}</td>
`;
KiTechnique.Template.popupEffect = String.raw`
<tr class="effect"><td class="name">{{name}}</td><td class="bonus">{{bonusName}} +{{bonusAmount}}</td></tr>
`;
KiTechnique.Template.popupAdvantage = String.raw`
<tr class="advantage">
<td>
{{name}}
<div class="description">{{description}}</div>
</td></tr>
`;
KiTechnique.Template.popupDisadvantage = String.raw`
<tr class="disadvantage">
<td>
{{name}}
<div class="description">{{description}}</div>
</td></tr>
`;


KiTechnique.Data = {};

KiTechnique.Data.Effects = {
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
  },
  "counterattackAbility": {
    "name": "Counterattack Ability",
    "description": "This effect adds a bonus to a character's Attack Ability when counterattacking. These bonuses only apply after a successful defense that grants the possibility of a Counter-attack.",
    "primaryCharacteristic": "dex",
    "relatedElements": "Air, Water, Earth",
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
          "primary": 1,
          "secondary": 2,
          "martialKnowledge": 5,
          "maintainCost": 1,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 25,
          "primary": 4,
          "secondary": 2,
          "martialKnowledge": 5,
          "maintainCost": 2,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 40,
          "primary": 3,
          "secondary": 5,
          "martialKnowledge": 10,
          "maintainCost": 3,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 50,
          "primary": 4,
          "secondary": 6,
          "martialKnowledge": 10,
          "maintainCost": 4,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 75,
          "primary": 6,
          "secondary": 9,
          "martialKnowledge": 15,
          "maintainCost": 6,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 90,
          "primary": 9,
          "secondary": 12,
          "martialKnowledge": 20,
          "maintainCost": 8,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 100,
          "primary": 12,
          "secondary": 15,
          "martialKnowledge": 25,
          "maintainCost": 10,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 125,
          "primary": 14,
          "secondary": 18,
          "martialKnowledge": 30,
          "maintainCost": 12,
          "minimumTechniqueLevel": 2
        },
        {
          "amount": 150,
          "primary": 18,
          "secondary": 22,
          "martialKnowledge": 35,
          "maintainCost": 14,
          "minimumTechniqueLevel": 2
        },
        {
          "amount": 175,
          "primary": 22,
          "secondary": 26,
          "martialKnowledge": 40,
          "maintainCost": 16,
          "minimumTechniqueLevel": 3
        },
        {
          "amount": 200,
          "primary": 26,
          "secondary": 32,
          "martialKnowledge": 45,
          "maintainCost": 18,
          "minimumTechniqueLevel": 3
        },
      ]
    }
  },
  "blockAbility": {
    "name": "Block Ability",
    "description": "This effect adds a bonus to a character's Block Ability when using the Technique. The player rolls the dice and adds the number under \"Block Bonus\" to his dice roll.",
    "primaryCharacteristic": "dex",
    "relatedElements": "Light, Water, Earth",
    "optionalCharacteristics": {
      "agi": 2,
      "pow": 2,
      "wp": 3,
      "str": 2
    },
    "bonus": {
      "name": "Block Bonus",
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
          "maintainCost": 1,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 40,
          "primary": 4,
          "secondary": 6,
          "martialKnowledge": 10,
          "maintainCost": 2,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 50,
          "primary": 5,
          "secondary": 8,
          "martialKnowledge": 15,
          "maintainCost": 3,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 75,
          "primary": 8,
          "secondary": 11,
          "martialKnowledge": 20,
          "maintainCost": 4,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 90,
          "primary": 12,
          "secondary": 15,
          "martialKnowledge": 25,
          "maintainCost": 5,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 100,
          "primary": 14,
          "secondary": 18,
          "martialKnowledge": 30,
          "maintainCost": 8,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 125,
          "primary": 18,
          "secondary": 22,
          "martialKnowledge": 35,
          "maintainCost": 10,
          "minimumTechniqueLevel": 2
        },
        {
          "amount": 150,
          "primary": 22,
          "secondary": 26,
          "martialKnowledge": 40,
          "maintainCost": 12,
          "minimumTechniqueLevel": 2
        },
        {
          "amount": 175,
          "primary": 26,
          "secondary": 32,
          "martialKnowledge": 45,
          "maintainCost": 14,
          "minimumTechniqueLevel": 3
        },
        {
          "amount": 200,
          "primary": 30,
          "secondary": 36,
          "martialKnowledge": 50,
          "maintainCost": 16,
          "minimumTechniqueLevel": 3
        },
      ]
    }
  },
  "limitedAdditionalAttack": {
    "name": "Limited Additional Attack",
    "description": "Characters may use this ability to perform penalty-free additional attacks. However, additional effects from this Technique only apply to one attack and not the additional ones. For example, a Technique that grants two additional attacks, as well as a +50 bonus to Attack Ability and another +50 to damage would allow a character to perform three attacks with a +50 bonus to his Attack Ability and damage only on one of them.",
    "primaryCharacteristic": "dex",
    "relatedElements": "Air, Water, Darkness",
    "optionalCharacteristics": {
      "agi": 2,
      "pow": 3,
      "wp": 3,
      "con": 1
    },
    "bonus": {
      "name": "Attacks",
      "levels": [
        {
          "amount": 1,
          "primary": 3,
          "secondary": 5,
          "martialKnowledge": 5,
          "maintainCost": 1,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 2,
          "primary": 6,
          "secondary": 9,
          "martialKnowledge": 10,
          "maintainCost": 2,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 3,
          "primary": 9,
          "secondary": 12,
          "martialKnowledge": 15,
          "maintainCost": 3,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 4,
          "primary": 12,
          "secondary": 15,
          "martialKnowledge": 20,
          "maintainCost": 4,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 5,
          "primary": 15,
          "secondary": 19,
          "martialKnowledge": 30,
          "maintainCost": 6,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 6,
          "primary": 18,
          "secondary": 22,
          "martialKnowledge": 40,
          "maintainCost": 8,
          "minimumTechniqueLevel": 2
        },
        {
          "amount": 8,
          "primary": 22,
          "secondary": 26,
          "martialKnowledge": 50,
          "maintainCost": 10,
          "minimumTechniqueLevel": 2
        },
        {
          "amount": 10,
          "primary": 26,
          "secondary": 32,
          "martialKnowledge": 60,
          "maintainCost": 12,
          "minimumTechniqueLevel": 3
        },
      ]
    },
    "advantages": {
      "continuousAttack": {
        "name": "Continuous Attack",
        "description": "This Advantage allows a character to deliver all of his attacks uninterrupted. His opponent cannot counterattack until all attacks are resolved. However, this Advantage does not prevent the opponent's counterattack indefinitely. If the Combat Result allows, he may take his counterattack right after his attacker finishes his last blow. In any event, the fact that an opponent cannot counterattack does not prevent him from withdrawing from physical combat.",
        "options": {
          "vitalSacrifice": {
            "name": "Continuous Attack",
            "description": "",
            "cost": 10,
            "martialKnowledge": 30,
            "maintainCost": 5
          },
        }
      }
    }
  },
  "initiativeAugmentation": {
    "name": "Initiative Augmentation",
    "description": "This effect increases a character's initiative for the turn. Simply add the amount under 'Bonus to Initiative' to his Initiative rolls. This must be declared before calculating Initiative for that turn.",
    "primaryCharacteristic": "agi",
    "relatedElements": "Air",
    "optionalCharacteristics": {
      "dex": 1,
      "pow": 3,
      "wp": 3,
      "con": 2
    },
    "bonus": {
      "name": "Bonus to Initiative",
      "levels": [
        {
          "amount": 25,
          "primary": 1,
          "secondary": 2,
          "martialKnowledge": 5,
          "maintainCost": 1,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 50,
          "primary": 2,
          "secondary": 4,
          "martialKnowledge": 10,
          "maintainCost": 1,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 75,
          "primary": 4,
          "secondary": 6,
          "martialKnowledge": 15,
          "maintainCost": 2,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 100,
          "primary": 6,
          "secondary": 9,
          "martialKnowledge": 20,
          "maintainCost": 3,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 125,
          "primary": 8,
          "secondary": 11,
          "martialKnowledge": 25,
          "maintainCost": 4,
          "minimumTechniqueLevel": 2
        },
        {
          "amount": 150,
          "primary": 10,
          "secondary": 13,
          "martialKnowledge": 30,
          "maintainCost": 5,
          "minimumTechniqueLevel": 2
        },
        {
          "amount": 175,
          "primary": 12,
          "secondary": 15,
          "martialKnowledge": 35,
          "maintainCost": 6,
          "minimumTechniqueLevel": 3
        },
        {
          "amount": 200,
          "primary": 14,
          "secondary": 18,
          "martialKnowledge": 40,
          "maintainCost": 7,
          "minimumTechniqueLevel": 3
        },
      ]
    }
  },
  "automaticTransportation": {
    "name": "Automatic Transportation",
    "description": "The character automatically covers the distance shown in the effect's first column. Even though movement is automatic, the Technique does not confer the ability to pass through solid bodies --- except when the character using the Technique is also an Immaterial entity. If a character combines this ability with an attack effect, he can attack the moment he appears. Automatic Transportation cannot be used to gain automatically the bonus for a Back or Flank attack because an enemy can turn to face the attack. If combined with a successful defense, a character can automatically withdraw from combat.",
    "primaryCharacteristic": "agi",
    "relatedElements": "Air, Light, Darkness",
    "optionalCharacteristics": {
      "str": 2,
      "pow": 3,
      "dex": 2,
      "con": 2
    },
    "bonus": {
      "name": "Distance",
      "levels": [
        {
          "amount": "30 feet",
          "primary": 2,
          "secondary": 4,
          "martialKnowledge": 5,
          "maintainCost": 1,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": "60 feet",
          "primary": 3,
          "secondary": 5,
          "martialKnowledge": 10,
          "maintainCost": 2,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": "150 feet",
          "primary": 4,
          "secondary": 6,
          "martialKnowledge": 10,
          "maintainCost": 3,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": "300 feet",
          "primary": 5,
          "secondary": 8,
          "martialKnowledge": 15,
          "maintainCost": 4,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": "800 feet",
          "primary": 6,
          "secondary": 9,
          "martialKnowledge": 20,
          "maintainCost": 5,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": "1,500 feet",
          "primary": 8,
          "secondary": 11,
          "martialKnowledge": 25,
          "maintainCost": 6,
          "minimumTechniqueLevel": 2
        },
        {
          "amount": "3,000 feet",
          "primary": 10,
          "secondary": 13,
          "martialKnowledge": 30,
          "maintainCost": 7,
          "minimumTechniqueLevel": 2
        },
        {
          "amount": "3 miles",
          "primary": 14,
          "secondary": 18,
          "martialKnowledge": 35,
          "maintainCost": 8,
          "minimumTechniqueLevel": 2
        },
        {
          "amount": "6 miles",
          "primary": 18,
          "secondary": 22,
          "martialKnowledge": 40,
          "maintainCost": 10,
          "minimumTechniqueLevel": 3
        },
        {
          "amount": "60 miles",
          "primary": 22,
          "secondary": 26,
          "martialKnowledge": 50,
          "maintainCost": 12,
          "minimumTechniqueLevel": 3
        },
      ]
    }
  },
  "armorIncrease": {
    "name": "Armor Increase",
    "description": "This effect allows a character to increase his Armor Type for a complete turn. It may be combined with any other armor as an additional layer, but it does not bring additional penalties to Initiative. This effect works against all kinds of attack.",
    "primaryCharacteristic": "con",
    "relatedElements": "Earth, Water, Light",
    "optionalCharacteristics": {
      "pow": 1,
      "wp": 2,
      "str": 2,
      "agi": 3
    },
    "bonus": {
      "name": "Armor Type",
      "levels": [
        {
          "amount": 1,
          "primary": 1,
          "secondary": 2,
          "martialKnowledge": 5,
          "maintainCost": 1,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 2,
          "primary": 2,
          "secondary": 4,
          "martialKnowledge": 5,
          "maintainCost": 1,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 3,
          "primary": 4,
          "secondary": 6,
          "martialKnowledge": 5,
          "maintainCost": 2,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 4,
          "primary": 6,
          "secondary": 9,
          "martialKnowledge": 5,
          "maintainCost": 2,
          "minimumTechniqueLevel": 1
        },
        {
          "amount": 5,
          "primary": 8,
          "secondary": 11,
          "martialKnowledge": 5,
          "maintainCost": 3,
          "minimumTechniqueLevel": 2
        },
        {
          "amount": 6,
          "primary": 10,
          "secondary": 13,
          "martialKnowledge": 5,
          "maintainCost": 3,
          "minimumTechniqueLevel": 2
        },
        {
          "amount": 7,
          "primary": 12,
          "secondary": 15,
          "martialKnowledge": 5,
          "maintainCost": 4,
          "minimumTechniqueLevel": 2
        },
        {
          "amount": 8,
          "primary": 14,
          "secondary": 18,
          "martialKnowledge": 5,
          "maintainCost": 5,
          "minimumTechniqueLevel": 3
        },
      ]
    }
  }
};

KiTechnique.Data.Disadvantages = {
  "elementalBinding": {
    "name": "Elemental Binding",
    "description": "This Disadvantage forces the player to choose effects only related to a particular element. Additionally, this Disadvantage will also force the character using it to choose that element again if developing a higher-level Technique based upon it. In other words, once a player chooses this Disadvantage, all higher-level techniques must also carry this Disadvantage.",
    "options": {
      "singleElement": {
        "name": "Single Element",
        "description": "Effects must be bound to a single element.",
        "martialKnowledgeReduction": 15,
      },
      "twoElements": {
        "name": "Two Elements",
        "description": "As with Single Element, except players must limit the effect to two elements.",
        "martialKnowledgeReduction": 10,
      }
    }
  }
};