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
        let elanLevelGiftMultiplier = Elan.Data[key].gifts[this.gifts[i]].elanLevelGiftMultiplier;
        if (typeof elanLevelGiftMultiplier === 'undefined') {
          elanLevelGiftMultiplier = 1.0;
        }
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
                return character.elan[key].elanBonus * elanLevelGiftMultiplier;
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
      },
      'keepingInTheWorld': {
        'name': 'Keeping in the World',
        'description': 'Characters may immediately bring back to life individuals in a Between Life and Death state, simply by imposing their hands on the subject without the need of a PhR check.',
        'cost': 5,
        'requiredElan': 30,
      }
    }
  },
  'uriel': {
    'name': 'Uriel',
    'type': 'Beryl',
    'description': 'No description yet!',
    'gifts': {
      'instinctOfLiberty': {
        'name': 'Instinct of Liberty',
        'description': 'Characters have a great ability for finding the way out of wherever they may be. Their natural instinct allows them to escape from places they do not want to stay, and to sense what the most trouble-free, available route will be.',
        'cost': 5,
        'requiredElan': 10
      },
    }
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
      },
      'exaltationOfTheSpirit': {
        'name': 'Exaltation of the Spirit',
        'description': 'THe character heightens the sense of justice of those usually in contact with him and leads them to an awareness of the importance of good conduct.',
        'cost': 10,
        'requiredElan': 30
      }
    }
  },
  'barakiel': {
    'name': 'Barakiel',
    'type': 'Beryl',
    'description': 'No description yet!',
    'gifts': {
      'aesthetics': {
        'name': 'Aesthetics',
        'description': 'Whatever the character does is beautiful. This gift translates into a special bonus to the secondary ability Style, equivalent to the character\'s Elan level.',
        'cost': 5,
        'requiredElan': 10,
        'elanLevelGiftBonuses': ['secondaryAbilities|style']
      },
    }
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
      'increasedDomination': {
        'name': 'Increased Domination',
        'description': 'Union with Jedah allows the character to use the forces of the Flow of Souls to subdue supernatural beings. Because of this, a user of this gift will apply a special bonus to his or her Control Summoning ability equal to half the character\'s Elan. This gift will not work against Light-based beings.',
        'cost': 10,
        'requiredElan': 20,
        'elanLevelGiftBonuses': ['primaryAbilities|control'],
        'elanLevelGiftMultiplier': 0.5
      },
      'shadow': {
        'name': 'Shadow',
        'description': 'Through supernatural means, characters are able to alter their shadow\'s appearance or shape in any way they like.',
        'cost': 5,
        'requiredElan': 30,
      },
      'darkAffinity': {
        'name': 'Dark Affinity',
        'description': 'The receiver of this gift will obtain affinity with all dark supernatural beings who will recognize them as one of their own.',
        'cost': 5,
        'requiredElan': 40,
      }
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
      'theWillToImprove': {
        'name': 'The Will to Improve',
        'description': 'The competitive spirit of the character is easily transmitted to others, and he becomes a strong influence to the people he is in regular contact with. Everyone around him wants to improve and better themselves.',
        'cost': 10,
        'requiredElan': 20,
      },
      'resistant': {
        'name': 'Resistant',
        'description': 'The gift allows extraordinary resistance to physical damage and its consequences. Character get a PhR bonus equivalent to half their Elan.',
        'cost': 5,
        'requiredElan': 20,
        'elanLevelGiftBonuses': ['resistances|physical'],
        'elanLevelGiftMultiplier': 0.5
      },
      'inhuman': {
        'name': 'Inhuman',
        'description': 'It allows the bearer to reach Inhuman difficulty levels in whatever fields the character excels or specializes.',
        'cost': 5,
        'requiredElan': 30,
      }
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
      'alteringTheLawOfChance': {
        'name': 'Altering the Laws of Chance',
        'description': 'This ability exceptionally alters a character\'s luck, increasing his chances of performing great feats or failing tasks tragically. Necessary results for obtaining an open roll will drop two degrees for every 20 elan points and will extend in one for a fumble. It is up to the character to decide whether to use this ability before rolling the dice.',
        'cost': 5,
        'requiredElan': 20,
      }
    }
  },
  'meseguis': {
    'name': 'Meseguis',
    'type': 'Shajad',
    'description': 'No description yet!',
    'gifts': {
      'serentityOfMelancholy': {
        'name': 'Serenity of Melancholy',
        'description': 'Through this gift, pain and sorrow inundate characters, allowing them to suffer stoically through situations that would make anyone else lose their composure. This gift will endow characters with a special bonus to the Composure and Withstand Pain secondary abilities equivalent to their elan level.',
        'cost': 5,
        'requiredElan': 10,
        'elanLevelGiftBonuses': ['secondaryAbilities|composure', 'secondaryAbilities|withstandPain']
      },
      'thePathOfVengeance': {
        'name': 'The Path of Vengeance',
        'description': 'Guided by Meseguis\' hand, the gift will endow characters with a natural instince to sense the best direction to take on their revenge. This is not to say they will know exactly what to do, but they will always have at least a clue on where to start looking.',
        'cost': 5,
        'requiredElan': 20,
      }
    }
  },
};
