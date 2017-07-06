class MentalPower {
  constructor(data, character, key) {
    this.ppInvested = data.ppInvested;

    var attrs = ['name', 'discipline', 'description', 'action', 'maintainable', 'effects'];
    for (let i in attrs) {
      Object.defineProperty(this, attrs[i], {
        get: function() {
          return MENTAL_POWER_DATA[key][attrs[i]];
        }
      });
    }
  }

  bonus() {
    return 10 * this.ppInvested;
  }
}

class PsychicPotential {
  constructor(data, character) {
    this.ppInvested = data.ppInvested;

    var thisClosure = this;
    this.score = function() {
      var base = 0;
      if (character.characteristics.wp.score > 14) {
        base = 20 * (character.characteristics.wp.score - 15) + 120;
      } else if (character.characteristics.wp.score > 4) {
        base = 10 * (character.characteristics.wp.score - 5) + 10;
      }

      var ppInvestedAddition = 0;
      var tally = 1;
      while (tally * (tally - 1) / 2 < thisClosure.ppInvested) {
        tally++;
        ppInvestedAddition += 10;
      }

      return base + ppInvestedAddition + thisClosure.otherBonuses();
    }
  }

  otherBonuses() {
    return 0;
  }

  score() {
    return 0;
  }
}

var MENTAL_POWER_DATA = {
  'createFire': {
    'name': 'Create Fire',
    'discipline':'Pyrokinesis',
    'description':'This power creates fire intensities or arouses an existing flame to equal proportions. If used upon a body capable of catching fire, Create Fire does not require maintenance. If not, maintenance allows the flame to burn without consuming anything - although nothing prevents it from being extinguished.',
    'action':'Active',
    'maintainable': 'Yes',
    'effects': [
      {'roll': 20, 'difficulty': 'Routine', 'outcome': 'Fatigue 1'},
      {'roll': 40, 'difficulty': 'Easy', 'outcome': '1 Intensity'},
      {'roll': 80, 'difficulty': 'Medium', 'outcome': '3 Intensities'},
      {'roll': 120, 'difficulty': 'Difficult', 'outcome': '5 Intensities'},
      {'roll': 140, 'difficulty': 'Very Difficult', 'outcome': '7 Intensities'},
      {'roll': 180, 'difficulty': 'Absurd', 'outcome': '10 Intensities'},
      {'roll': 240, 'difficulty': 'Almost Impossible', 'outcome': '13 Intensities'},
      {'roll': 280, 'difficulty': 'Impossible', 'outcome': '16 Intensities'},
      {'roll': 320, 'difficulty': 'Inhuman', 'outcome': '20 Intensities'},
      {'roll': 440, 'difficulty': 'Zen', 'outcome': '25 Intensities'},
    ],
  },
  'controlFire': {
    'name': 'Control Fire',
    'discipline':'Pyrokinesis',
    'description':'This power controls the spread and size of a fire within the intensity range specified by the psychic\'s success in activating this ability (as detailed in the effects table). For example, a character may direct the course of a fire to a settlement, ignoring the buildings he wishes to leave unharmed. Control Fire also allows the psychic to choose the shape and color of the flames. When used against fire with a Presence of its own, or an elemental creature, this effect can be avoided by passing a PhR check against the difficulty indicated in the effects table below.',
    'action':'Active',
    'maintainable': 'Yes',
    'effects': [
      {'roll': 20, 'difficulty': 'Routine', 'outcome': 'Fatigue 2'},
      {'roll': 40, 'difficulty': 'Easy', 'outcome': 'Fatigue 1'},
      {'roll': 80, 'difficulty': 'Medium', 'outcome': '4 Intensities / 80 PhR'},
      {'roll': 120, 'difficulty': 'Difficult', 'outcome': '6 Intensities / 100 PhR'},
      {'roll': 140, 'difficulty': 'Very Difficult', 'outcome': '8 Intensities / 120 PhR'},
      {'roll': 180, 'difficulty': 'Absurd', 'outcome': '12 Intensities / 140 PhR'},
      {'roll': 240, 'difficulty': 'Almost Impossible', 'outcome': '16 Intensities / 160 PhR'},
      {'roll': 280, 'difficulty': 'Impossible', 'outcome': '20 Intensities / 180 PhR'},
      {'roll': 320, 'difficulty': 'Inhuman', 'outcome': '25 Intensities / 200 PhR'},
      {'roll': 440, 'difficulty': 'Zen', 'outcome': '30 Intensities / 240 PhR'},
    ],
  },
  'freeze': {
    'name': 'Freeze',
    'discipline':'Cryokinesis',
    'description':'This power freezes anybody who fails the required check. The victim receives an all action penalty equivalent to the amount by which he failed the check. If the difference is higher than 40, the victim is frozen and subject to partial paralysis. The cold AT may be used defensively against this power. Affected individuals can make a new check every 5 turns.',
    'action':'Active',
    'maintainable': 'Yes',
    'effects': [
      {'roll': 20, 'difficulty': 'Routine', 'outcome': 'Fatigue 8'},
      {'roll': 40, 'difficulty': 'Easy', 'outcome': 'Fatigue 6'},
      {'roll': 80, 'difficulty': 'Medium', 'outcome': 'Fatigue 4'},
      {'roll': 120, 'difficulty': 'Difficult', 'outcome': '80 PhR'},
      {'roll': 140, 'difficulty': 'Very Difficult', 'outcome': '100 PhR'},
      {'roll': 180, 'difficulty': 'Absurd', 'outcome': '120 PhR'},
      {'roll': 240, 'difficulty': 'Almost Impossible', 'outcome': '140 PhR'},
      {'roll': 280, 'difficulty': 'Impossible', 'outcome': '160 PhR'},
      {'roll': 320, 'difficulty': 'Inhuman', 'outcome': '180 PhR'},
      {'roll': 440, 'difficulty': 'Zen', 'outcome': '220 PhR'},
    ],
  },
  'iceShield': {
    'name': 'Ice Shield',
    'discipline':'Cryokinesis',
    'description':'This power creates a shield of ice that protects the psychic from any non-energy based source of attach and beams from Light or Darkness. Unlike other powers, Ice Shield works on the same life points with which it has been created. Once created, the shield loses 5 life points per turn, until it reaches an amount that the psychic can maintain naturally.',
    'action':'Passive',
    'maintainable': 'Yes',
    'effects': [
      {'roll': 20, 'difficulty': 'Routine', 'outcome': 'Fatigue 6'},
      {'roll': 40, 'difficulty': 'Easy', 'outcome': 'Fatigue 4'},
      {'roll': 80, 'difficulty': 'Medium', 'outcome': 'Fatigue 2'},
      {'roll': 120, 'difficulty': 'Difficult', 'outcome': '600 LP'},
      {'roll': 140, 'difficulty': 'Very Difficult', 'outcome': '800 LP'},
      {'roll': 180, 'difficulty': 'Absurd', 'outcome': '1,200 LP'},
      {'roll': 240, 'difficulty': 'Almost Impossible', 'outcome': '1,800 LP'},
      {'roll': 280, 'difficulty': 'Impossible', 'outcome': '2,500 LP'},
      {'roll': 320, 'difficulty': 'Inhuman', 'outcome': '4,000 LP'},
      {'roll': 440, 'difficulty': 'Zen', 'outcome': '6,000 LP'},
    ],
  },
  'defensiveTeleportation': {
    'name': 'Defensive Teleportation',
    'discipline':'Teleportation',
    'description':'The psychic uses his mental abilities to teleport constantly, making small jumps from one place to another, to defend against attacks. This Power allows the character to use his Psychic Projection in place of his Dodge Ability. The maximum number of times the character can dodge per turn and the distance he can move to dodge an Area Attack (he always moves just outside the attack’s area, if he has sufficient range) are both determined by the level of difficulty achieved.',
    'action':'Passive',
    'maintainable': 'Yes',
    'effects': [
      {'roll': 20, 'difficulty': 'Routine', 'outcome': 'Fatigue 6'},
      {'roll': 40, 'difficulty': 'Easy', 'outcome': 'Fatigue 4'},
      {'roll': 80, 'difficulty': 'Medium', 'outcome': 'Fatigue 2'},
      {'roll': 120, 'difficulty': 'Difficult', 'outcome': '1 Dodge / 15 ft'},
      {'roll': 140, 'difficulty': 'Very Difficult', 'outcome': '2 Dodge / 30 ft'},
      {'roll': 180, 'difficulty': 'Absurd', 'outcome': '3 Dodge / 50 ft'},
      {'roll': 240, 'difficulty': 'Almost Impossible', 'outcome': '4 Dodge / 80 ft'},
      {'roll': 280, 'difficulty': 'Impossible', 'outcome': '6 Dodge / 150 ft'},
      {'roll': 320, 'difficulty': 'Inhuman', 'outcome': '8 Dodge / 300 ft'},
      {'roll': 440, 'difficulty': 'Zen', 'outcome': '&#8734; Dodge / &#8734; ft'},
    ],
  },
  'createChaos': {
    'name': 'Create Chaos',
    'discipline':'Causality',
    'description':'This Power grants the psychic the ability to speed up causality, exponentially accelerating any process taking its course in the affected area. The psychic cannot control the resulting events, but for example, if an area is a dormant volcano, there is a strong chance that it will erupt, or that something equally unlikely but natural will happen. This Power affects an area determined by the difficulty of the Power.',
    'action':'Active',
    'maintainable': 'Yes',
    'effects': [
      {'roll': 20, 'difficulty': 'Routine', 'outcome': 'Fatigue 12'},
      {'roll': 40, 'difficulty': 'Easy', 'outcome': 'Fatigue 8'},
      {'roll': 80, 'difficulty': 'Medium', 'outcome': 'Fatigue 6'},
      {'roll': 120, 'difficulty': 'Difficult', 'outcome': 'Fatigue 4'},
      {'roll': 140, 'difficulty': 'Very Difficult', 'outcome': 'Fatigue 2'},
      {'roll': 180, 'difficulty': 'Absurd', 'outcome': '150 ft'},
      {'roll': 240, 'difficulty': 'Almost Impossible', 'outcome': '1500 ft'},
      {'roll': 280, 'difficulty': 'Impossible', 'outcome': '1 mile'},
      {'roll': 320, 'difficulty': 'Inhuman', 'outcome': '2 miles'},
      {'roll': 440, 'difficulty': 'Zen', 'outcome': '3 miles'},
    ],
  },
  'everlastingMoment': {
    'name': 'Everlasting Moment',
    'discipline':'Cryokinesis',
    'description':'Through psychic manipulation, psychics can create a low temperature area within which any body in motion, except for his own, is immobilized - unless it passes the required PhR check. If a character fails a check by more than 40 points, he is completely frozen and subject to Full Paralysis. A failure of less than 40 points inflicts an all action penalty equal to the failure level. Penalties last for as long as the power is maintained. Characters are not entitled to new resistance rolls while they remain in the area of effect.',
    'action':'Active',
    'maintainable': 'Yes',
    'effects': [
      {'roll': 20, 'difficulty': 'Routine', 'outcome': 'Fatigue 16'},
      {'roll': 40, 'difficulty': 'Easy', 'outcome': 'Fatigue 12'},
      {'roll': 80, 'difficulty': 'Medium', 'outcome': 'Fatigue 8'},
      {'roll': 120, 'difficulty': 'Difficult', 'outcome': 'Fatigue 6'},
      {'roll': 140, 'difficulty': 'Very Difficult', 'outcome': 'Fatigue 4'},
      {'roll': 180, 'difficulty': 'Absurd', 'outcome': '120 PhR / 15 ft radius'},
      {'roll': 240, 'difficulty': 'Almost Impossible', 'outcome': '140 PhR / 30 ft radius'},
      {'roll': 280, 'difficulty': 'Impossible', 'outcome': '160 PhR / 60 ft radius'},
      {'roll': 320, 'difficulty': 'Inhuman', 'outcome': '180 PhR / 150 ft radius'},
      {'roll': 440, 'difficulty': 'Zen', 'outcome': '220 PhR / 300 ft radius'},
    ],
  },
};
