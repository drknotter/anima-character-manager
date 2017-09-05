class Advantage {
  constructor(data, character, key) {
    this.cpInvested = data.cpInvested ? data.cpInvested : 0;

    var attrs = ['minCost', 'maxCost', 'name', 'description', 'effects'];
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
},
'startingWealth': {
  'minCost': 1,
  'maxCost': 3,
  'name': 'Starting Wealth',
  'description': 'The character has a great fortune in materials and equipment',
  'effects': 'This Advantage provides starting money or equipment valued at 2,000 gold. Futher points spend increase this amount to 5,000 and 10,000, respectively.',
},
'charm': {
  'minCost': 1,
  'maxCost': 1,
  'name': 'Charm',
  'description': 'The character has a certain personal magnetism that makes others react positively toward him. He always receives a positive reaction from people who do not know him, and some individuals may even be slightly more permissive with him.',
  'effects': 'The limits of this Advantage must be decided by the Game Master.',
},
'goodLuck': {
  'minCost': 1,
  'maxCost': 1,
  'name': 'Good Luck',
  'description': 'Characters with this Advantage are exceptionally lucky in everything they do and very rarely commit a serious mistake.',
  'effects': 'The required number to fumble is reduced by 1 point. In normal circumstances, therefore, the character will only fumble on a roll of 2. If a character with this Advantage attains mastery in any ability, he will fumble only on a 1 when using it.',
},
'nightVision': {
  'minCost': 1,
  'maxCost': 1,
  'name': 'Night Vision',
  'description': 'This Advantage allows a character to see in the dark and to adapt quickly to any change in light intensity.',
  'effects': 'The character may ignore any penaly caused by the dark --- except for magically induced dark or absolute lack of light, in which case the penalty is reduced by half.',
},
'deepSleeper': {
  'minCost': -1,
  'maxCost': -1,
  'name': 'Deep Sleeper',
  'description': 'A character with this Disadvantage sleeps very deeply and has diffuculty awakening. He will remain asleep even with light physical contact, and when he finally does awaken, he will be stunned for several minutes.',
  'effects': 'The character applies a penalty of -200 to any Perceptive roll while sleeping. For the first ten turns after waking, he has a penalty of -40 to all actions.',
},
'powerfulEnemy': {
  'minCost': -2,
  'maxCost': -1,
  'name': 'Powerful Enemy',
  'description': 'The character has made a dangerous enemy in the past that relentlessly pursues hime to kill him one day. It could be an important crime lord, or the Inquisition that considers him a witch and hunts him down in order to eliminate him.',
  'effects': 'The effects of this disadvantage only apply to role-playing. Naturaly, the greater the benefit gained, the more powerful the enemy or organization pursuing the character is.',
}
};

var ADVANTAGES = [
  'amplifySustainedPower',
  'freeAccessToAnyPsychicDiscipline',
  'accessToOnePsychicDiscipline',
  'artifact',
  'startingWealth',
  'charm',
  'goodLuck',
  'nightVision',
];
var DISADVANTAGES = [
  'onePowerAtATime',
  'slowReactions',
  'deepSleeper',
  'powerfulEnemy',
]