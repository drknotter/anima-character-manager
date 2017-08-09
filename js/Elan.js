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
  }
}

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
    'description': 'No description yet!'
  },
  'gabriel': {
    'name': 'Gabriel',
    'type': 'Beryl',
    'description': 'No description yet!'
  },
  'rafael': {
    'name': 'Rafael',
    'type': 'Beryl',
    'description': 'No description yet!'
  },
  'azrael': {
    'name': 'Azrael',
    'type': 'Beryl',
    'description': 'No description yet!'
  },
  'barakiel': {
    'name': 'Barakiel',
    'type': 'Beryl',
    'description': 'No description yet!'
  },
  'edamiel': {
    'name': 'Edamiel',
    'type': 'Beryl',
    'description': 'No description yet!'
  },
  'zemial': {
    'name': 'Zemial',
    'type': 'Shajad',
    'description': 'No description yet!'
  },
  'jedah': {
    'name': 'Jedah',
    'type': 'Shajad',
    'description': 'No description yet!'
  },
  'noah': {
    'name': 'Noah',
    'type': 'Shajad',
    'description': 'No description yet!'
  },
  'erebus': {
    'name': 'Erebus',
    'type': 'Shajad',
    'description': 'No description yet!'
  },
  'abbadon': {
    'name': 'Abbadon',
    'type': 'Shajad',
    'description': 'No description yet!'
  },
  'eriol': {
    'name': 'Eriol',
    'type': 'Shajad',
    'description': 'No description yet!'
  },
  'meseguis': {
    'name': 'Meseguis',
    'type': 'Shajad',
    'description': 'No description yet!'
  },
};
