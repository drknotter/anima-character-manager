class Elan extends Scoreable {
  constructor(data, character, key) {
    check(Elan.Data[key], key + " is not a valid key for elan!");
    super(Elan.Data[key].name);

    var attrs = ['type', 'description'];
    for (let i in attrs) {
      Object.defineProperty(this, attrs[i], {
        get: function() {
          return Elan.Data[key][attrs[i]];
        }
      });
    }

    this.elanBonus = data.elanBonus ? data.elanBonus : 0;
    check(isNumber(this.elanBonus), this.elanBonus + " is not a valid value for elan bonus!");

    this.gifts = [];
    for (let i in data.gifts) {
      check(data.gifts[i] in Elan.Data[key]['gifts'], data.gifts[i] + " is not a valid gift for " + key + "!");
      this.gifts.push(data.gifts[i]);
    }

    for (let i in this.gifts) {
      if (Elan.Data[key].gifts[this.gifts[i]].elanLevelGiftBonuses) {
        for (let b in  Elan.Data[key].gifts[this.gifts[i]].elanLevelGiftBonuses) {
          let elanLevelGiftBonus = Elan.Data[key].gifts[this.gifts[i]].elanLevelGiftBonuses[b];
          console.log(elanLevelGiftBonus);
          let keyChain = elanLevelGiftBonus.split('|');
          let property = character;
          for (let p in keyChain) {
            property = property[keyChain[p]];
          }
          if (property instanceof Scoreable) {
            Object.defineProperty(property, key + this.gifts[i] + "Bonus", {
              get: function() {
                return character.elan[key].elanBonus;
              }
            })
          }
        }
      }
    }
  }
}

Elan.RenderCharacterPopup = function(character, key, popup, background) {
  popup.html(Mustache.render(Elan.Template.popup, character.elan[key]));
  if (character.elan[key]['gifts'].length == 0) {
    $('#elanGifts').remove();
  }
  for (let i in character.elan[key]['gifts']) {
    let gift = character.elan[key]['gifts'][i];
    $('#elanGifts').append(Mustache.render(Elan.Template.gift, Elan.Data[key]['gifts'][gift]));
  }
  background.show();
}

Elan.RenderGiftPopup = function(deityKey, giftKey, popup, background) {
  popup.html(Mustache.render(Elan.Template.gift, Elan.Data[deityKey]['gifts'][giftKey]));
  background.show();
}

Elan.Template = {};

Elan.Template.popup = String.raw`
<div id="elanPopup" class="popup">
<div class="name">{{name}}</div>
<div class="description">{{description}}</div>
<table id="elanGifts">
<tr><th>Gifts</th></tr>
</table>
</div>
`;

Elan.Template.gift = String.raw`
<tr class="gift"><td>
<div class="giftName">{{name}}</div>
<div class="giftDescription">{{description}}</div>
</td></tr>
`;


Elan.Data = {
  'mikael': {
    'name': 'Mikael',
    'type': 'Beryl',
    'description': 'No description yet!',
    'gifts': {
      'lightOfHope': {
        'name': 'Light of Hope',
        'description': 'Characters become a source of hope for others wherever they go. Their mere presence stirs the joie de vivre in people little by little, and they give bliss back to the world. Those in daily contact with them are never discouraged nor lose their faith.',
        'cost': 5,
        'requiredElan': 10
      },
      'eliminateDisease': {
        'name': 'Eliminate Disease',
        'description': 'It enables characters to heal any disease of the same or lower Elan value they possess. As an example, a character with 30 points of Elan would cure diseases up to that level.',
        'cost': 10,
        'requiredElan': 20
      }
    }
  },
  'uriel': {
    'name': 'Uriel',
    'type': 'Beryl',
    'description': 'No description yet!',
    'gifts': {}
  },
  'gabriel': {
    'name': 'Gabriel',
    'type': 'Beryl',
    'description': 'No description yet!',
    'gifts': {}
  },
  'rafael': {
    'name': 'Rafael',
    'type': 'Beryl',
    'description': 'No description yet!',
    'gifts': {}
  },
  'azrael': {
    'name': 'Azrael',
    'type': 'Beryl',
    'description': 'No description yet!',
    'gifts': {
      'leader': {
        'name': 'Leader',
        'description': 'This gift will increase the bearer\'s natural charisma with a special bonus to Leadership equivalent to his or her Elan level. For instance, anyone with 50 Elan points would gain a +50 bonus.',
        'cost': 5,
        'requiredElan': 10,
        'elanLevelGiftBonuses': ['secondaryAbilities|leadership']
      },
      'theValueOfHeroes': {
        'name': 'The Value of Heroes',
        'description': 'The character is armed with unusual courage and is thus able to remain undaunted where others would run. This grants him a special bonus to the Composure secondary ability equivalent to his Elan level.',
        'cost': 5,
        'requiredElan': 20,
        'elanLevelGiftBonuses': ['secondaryAbilities|composure']
      }
    }
  },
  'barakiel': {
    'name': 'Barakiel',
    'type': 'Beryl',
    'description': 'No description yet!',
    'gifts': {}
  },
  'edamiel': {
    'name': 'Edamiel',
    'type': 'Beryl',
    'description': 'No description yet!',
    'gifts': {}
  },
  'zemial': {
    'name': 'Zemial',
    'type': 'Shajad',
    'description': 'No description yet!',
    'gifts': {}
  },
  'jedah': {
    'name': 'Jedah',
    'type': 'Shajad',
    'description': 'No description yet!',
    'gifts': {
      'theGiftOfPolitics': {
        'name': 'The Gift of Politics',
        'description': 'It confers a disproportionate capability for influencing and persuading. It gives a special bonus (equal to the character\'s Elan level) to the Persuasion and Leadership secondary abilities.',
        'cost': 5,
        'requiredElan': 10,
        'elanLevelGiftBonuses': ['secondaryAbilities|leadership', 'secondaryAbilities|persuasion']
      },
    }
  },
  'noah': {
    'name': 'Noah',
    'type': 'Shajad',
    'description': 'No description yet!',
    'gifts': {
      'inTheRightHands': {
        'name': 'In the Right Hands',
        'description': 'This gift provides the exceptional ability to find the necessary equipment for every circumstance. In this way, a swordsman who has lost his weapon fleeing from a group of enemies will be likely to stumble upon a sword on the way, while a thief without a picklock will come across a device that will serve his purpose very close to the door he is attempting to open.',
        'cost': 5,
        'requiredElan': 10,
      },
    }
  },
  'erebus': {
    'name': 'Erebus',
    'type': 'Shajad',
    'description': 'No description yet!',
    'gifts': {}
  },
  'abbadon': {
    'name': 'Abbadon',
    'type': 'Shajad',
    'description': 'No description yet!',
    'gifts': {}
  },
  'eriol': {
    'name': 'Eriol',
    'type': 'Shajad',
    'description': 'No description yet!',
    'gifts': {
      'grantingMisfortuneAndDisgrace': {
        'name': 'Granting Misfortune and Disgrace',
        'description': 'Whoever has this gift is armed with the ability to influence other people\' luck (positively or negatively) in the short term. Intensity and duration can be molded according to Elan level.',
        'cost': 10,
        'requiredElan': 10,
      },
    }
  },
  'meseguis': {
    'name': 'Meseguis',
    'type': 'Shajad',
    'description': 'No description yet!',
    'gifts': {}
  },
};
