class CombatModule {
  constuctor(data, character, key) {
    check(key in CombatModule.Data, key + " is not a valid key for a combat module!");

    var attrs = ['description', 'effects', 'cost', 'type'];
    for (let i in attrs) {
      Object.defineProperty(this, attrs[i], {
        get: function() {
          return CombatModule.Data[key][attrs[i]];
        }
      });
    }
  }  
}

CombatModule.Data = {
  'similarWeapon': {
    'name': 'Similar Weapon',
    'description': 'The character knows how to use two similar weapons.',
    'effects': 'Gives the character the ability to use an additional weapon of the same class as one the character already knows.',
    'cost': 10,
    'type': 'combat'
  },
  'magicProjectionAsAnAttack': {
    'name': 'Magic Projection as an Attack',
    'description': 'This represents a character\'s joining of his combat knowledge with the ability to direct spells at an opponent. For this character, spells act like real weapons that he can project like a true martial ability.',
    'effects': 'This allows the character to use his attack ability when undertaking an offensive Magic Projection. Only the base ability score is used, not the points for innate improvement that come from combat classes. This module cannot be used to launch passive or defensive spells.',
    'cost': 75,
    'type': 'supernatural'
  },
  'psychicProjectionModule': {
    'name': 'Psychic Projection Module',
    'description': 'The character uses his Combat Abilities to project his mental powers as if they were actual weapons.',
    'effects': 'This gives the character the ability to use Combat Abilities as a Psychic Projection. The offensive is used to attack, and the defensive to raise shields. Only the base ability is used, not the points for innate improvement that come from particular classes.',
    'cost': 100,
    'type': 'psychic'
  },
};