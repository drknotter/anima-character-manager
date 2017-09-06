class MartialArt {
  constructor(character, key) {
    check(key in MartialArt.Data, key + " is not a valid key for a martial art!");

    this.dpInvested = MartialArt.CostFor(character);

    var attrs = ['name'];
    for (let i in attrs) {
      Object.defineProperty(this, attrs[i], {
        get: function() {
          return MartialArt.Data[key][attrs[i]];
        }
      });
    }

    Object.defineProperty(this, 'baseDamage', {
      get: function() {
        return MartialArt.Data[key].baseDamageFn(character);
      }
    });

    for (let i in MartialArt.Data[key].bonuses) {
      let bonus = new ScoreableBonus(MartialArt.Data[key].bonuses[i]);
      bonus.apply(character, key + 'MartialArtBonus');
    }

    this.removeBonusesFromCharacter = function() {
      for (let i in MartialArt.Data[key].bonuses) {
        let bonus = new ScoreableBonus(MartialArt.Data[key].bonuses[i]);
        bonus.unapply(character, key + 'MartialArtBonus');
      }
    }
  }
};

MartialArt.CostFor = function(character) {
  var prefersUnarmed = character.preferredWeapon === "unarmed";
  var isTao = character.classId === "tao";
  var isFirst = Object.keys(character.martialArts).length === 0;
  var cost = Math.floor((isTao ? 20 : 50) * (prefersUnarmed && isFirst ? 0.5 : 1));
  return cost;
}

MartialArt.RequirementFor = function(character, key) {
  return MartialArt.CostRequirement(character)
      || MartialArt.AttackAndDefenseRequirement(character)
      || MartialArt.Data[key].requirementFn(character);
}

MartialArt.CostRequirement = function(character) {
  return MartialArt.CostFor(character) <= character.DP ? null : "Not enough development points.";
}

MartialArt.AttackAndDefenseRequirement = function(character) {
  var n = Object.keys(character.martialArts).length;
  var attackAndDefense = character.primaryAbilities.attack.score + Math.max(character.primaryAbilities.block.score, character.primaryAbilities.dodge.score);
  return 40 * (n + 1) <= attackAndDefense ? null : "At least " + (40 * (n + 1)) + " combined Attack and Defense is required.";
}

MartialArt.RenderPopup = function(key, popup, background) {
  popup.html(Mustache.render(MartialArt.Template.popup, MartialArt.Data[key]));
  background.show();
}

MartialArt.Template = {};

MartialArt.Template.popup = String.raw`
<div class="martialArtPopup popup">
<div class="name">{{name}}</div>
<div class="description">{{description}}</div>
<div class="advantages">{{advantages}}</div>
<div class="requirements">Requirements: {{requirements}}</div>
</div>
`;

MartialArt.Data = {
  "kempo": {
    'name': "Kempo",
    'description': "This is a freewheeling style of combat that uses a combination of strikes. The style uses rapid multiple attacks to try and find gaps in an opponents defenses.", 
    'advantages': "The rapid flurry of blows allows a Kempo master to carry out additional attacks with a penalty of -10 to his ability instead of -25. It has a base damage of 20, plus the character\'s strength bonus. Kempo uses the Blunt table.", 
    'requirements': "None", 
    'requirementFn': function(character) {
      return null;
    }, 
    'martialKnowledge': 10, 
    'bonuses': [
      {
        'keyChain': ['martialKnowledge'],
        'bonus': 10
      }
    ], 
    'baseDamageFn': function(character) {
      return 20 + character.characteristics.str.score;
    }
  },
  'capoeira': {
    'name': 'Capoeira',
    'description': 'Capoeira is a system of combat that appears chaotic and employs broad acrobatic movements of the legs that resemble a dance.',
    'advantages': 'The movements of Capoeira are so sweeping that when the user makes an Area Attack, he is considered to be using a large weapon, and he can affect up to five opponents. Capoeira has a base damage of 20, plus the character\'s strength bonus. It uses the Blunt table.',
    'requirements': 'Dance 40',
    'requirementFn': function(character) {
      return character.secondaryAbilities.dance.score >= 40 ? null : "Requires at least 40 points in 'Dance'";
    },
    'martialKnowledge': 10,
    'bonuses': [
      {
        'keyChain': ['martialKnowledge'],
        'bonus': 10
      },
      {
        'keyChain': ['primaryAbilities', 'dodge'],
        'bonus': 10,
      }
    ],
    'baseDamageFn': function(character) {
      return 20 + character.characteristics.str.score;
    }
  }
};