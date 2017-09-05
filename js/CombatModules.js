class CombatModule {
  constructor(data, character, key) {
    check(key in CombatModule.Data, key + " is not a valid key for a combat module!");

    var attrs = ['name', 'description', 'effects', 'cost', 'type'];
    for (let i in attrs) {
      Object.defineProperty(this, attrs[i], {
        get: function() {
          return CombatModule.Data[key][attrs[i]];
        }
      });
    }

    this.dpInvested = character.classId === 'weaponmaster' && data.type === 'combat' ? Math.floor(this.cost / 2) : this.cost;
  }  
}

CombatModule.RenderPopup = function(key, popup, background) {
  popup.html(Mustache.render(CombatModule.Template.popup, CombatModule.Data[key]));
  background.show();
}

CombatModule.Template = {};

CombatModule.Template.popup = String.raw`
<div class="combatModulePopup popup">
<div class="name">{{name}}</div>
<div class="description">{{description}}</div>
<div class="effects">{{effects}}</div>
</div>
`;

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
  'barbarianModule': {
    'name': 'Barbarian Module',
    'description': 'These big, powerful weapons are often used by individuals with fierce and barbaric fighting styles',
    'effects': 'Awards skill in the following weapons: War Axe, Battle Axe, Two-handed Sword, Bastard Sword, and Heavy Battle Mace',
    'cost': 50,
    'type': 'combat'
  },
  'projectileWeapons': {
    'name': 'Projectile Weapons',
    'description': 'The character is able to use his aim with all projectile weapons.',
    'effects': 'The character can use any projectile weapon using the same Attack ability.',
    'cost': 50,
    'type': 'combat'
  },
  'areaAttack': {
    'name': 'Area Attack',
    'description': 'The character specializes in broad maneuvers that can take out various enemies with greater ease.',
    'effects': 'This reduces the penalty for an Area Attack maneuver by half. Therefore a character applies -25 to his attack ability when using this attack.',
    'cost': 40,
    'type': 'combat'
  },
  'armorReduction': {
    'name': 'Armor Reduction',
    'description': 'This grants the ability to penetrate through protection and armor with great ease, be it through an increase in brute force or the ability to find vulnerable points.',
    'effects': 'This allows the fighter to subtract a point of Armor of any adversary. This effect of this ability is added to any other modifier that the character would have due to quality weapons or Ki Technique.',
    'cost': 40,
    'type': 'combat'
  }
};