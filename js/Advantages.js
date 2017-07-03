class CreationPointInvestment {
  constructor(data) {
    this.cpInvested = data.cpInvested;
  }
}

class Advantage extends CreationPointInvestment {
  constructor(data, character, key) {
    super(data);

    var attrs = ['cost', 'name', 'description', 'effects'];
    for (let i in attrs) {
      Object.defineProperty(this, attrs[i], {
        get: function() {
          return ADVANTAGE_DATA[key][attrs[i]];
        }
      });
    }

  }
}

var ADVANTAGE_DATA = {
'amplifySustainedPower': {
  'cost': 2,
  'name': 'Amplify Sustained Power',
  'description':'A character with this Advantage can maintain his psychic powers with more force.',
  'effects':'Any powers maintained in this way are one difficulty level higher than what the psychic could normally attain.',
},
'freeAccessToAnyPsychicDiscipline': {
  'cost': 2,
  'name': 'Free Access to Any Psychic Discipline',
  'description': 'Characters with this Advantage may use any type of psychic discipline and its abilities.',
  'effects': 'This Advantage enables the character to use as many psychic disciplines as he wishes using his Psychic Points.',
},
'onePowerAtATime': {
  'cost': 1,
  'name': 'One Power at a Time',
  'description': 'The psychic powers of the character do not allow him to use several abilities at once. If the character uses one power, his focus remains so intense that he cannot project others --- except those maintained unconciously.',
  'effects': 'The character can use only one psychic power per assault. The does not prevent him from continueing to use others which are maintained, as long as they began in previous assaults.'
},
};