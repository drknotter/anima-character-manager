class Advantage {
  constructor(data, character, key) {
    this.cpInvested = data.cpInvested ? data.cpInvested : 0;

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
  'minCost': 2,
  'maxCost': 2,
  'name': 'Amplify Sustained Power',
  'description':'A character with this Advantage can maintain his psychic powers with more force.',
  'effects':'Any powers maintained in this way are one difficulty level higher than what the psychic could normally attain.',
},
'freeAccessToAnyPsychicDiscipline': {
  'minCost': 2,
  'maxCost': 2,
  'name': 'Free Access to Any Psychic Discipline',
  'description': 'Characters with this Advantage may use any type of psychic discipline and its abilities.',
  'effects': 'This Advantage enables the character to use as many psychic disciplines as he wishes using his Psychic Points.',
},
'accessToOnePsychicDiscipline': {
  'minCost': 1,
  'maxCost': 1,
  'name': 'Access to One Psychic Discipline',
  'description': 'The character is gifted with the ability to use the powers of a single psychic discipline. Its abilities are limited to a single field, and no matter how much it increases his potential, he will not have access to powers that are greater than his natural capacities.',
  'effects': 'This Advantage allows the use of PP to acquire affinity to a single psychic discipline and the matrix powers.',
},
'artifact': {
  'minCost': 1,
  'maxCost': 3,
  'name': 'Artifact',
  'description': 'The character possesses a mystical device of enormous power.',
  'effects': 'The player and the Game Master must agree on the abilities of the device. Spending additional points increases the capabilities of the object.',
},
'onePowerAtATime': {
  'minCost': -1,
  'maxCost': -1,
  'name': 'One Power at a Time',
  'description': 'The psychic powers of the character do not allow him to use several abilities at once. If the character uses one power, his focus remains so intense that he cannot project others --- except those maintained unconciously.',
  'effects': 'The character can use only one psychic power per assault. The does not prevent him from continueing to use others which are maintained, as long as they began in previous assaults.'
},
'slowReactions': {
  'minCost': -2,
  'maxCost': -1,
  'name': 'Slow Reactions',
  'description': 'The character\'s reflexes leave him ill-prepared to respond quickly to events.',
  'effects': 'The character applies a special penalty of -30 to his Initiative. An additional point in this Disadvantage increases the penalty to -60.',
}
};

var ADVANTAGES = [
  'amplifySustainedPower',
  'freeAccessToAnyPsychicDiscipline',
  'accessToOnePsychicDiscipline',
  'artifact',
];
var DISADVANTAGES = [
  'onePowerAtATime',
  'slowReactions',
]