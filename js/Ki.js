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