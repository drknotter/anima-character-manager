var Template = {};

Template.character = String.raw`
<table id="character">
<tr>
  <td id="column1">
  </td>
  <td id="column2">
  </td>
</tr>
<tr>
  <td colspan="2">
  <a id="exportButton" download="{{name}}.json">Export</div>
  </td>
</tr>
</table>
`;

Template.mainInfoHeader = String.raw`
<table>
<tr>
<td id="name">{{name}}</td>
<td id="levelAndClass">Level {{level}} {{class.name}}</td>
</tr>
</table>
`;

Template.mainInfo = String.raw`
<table class="stats">
<tr>
<td class="stat"><span id="lifePoints" contenteditable="true">{{currentLifePoints}}</span>/{{lifePoints}}<br/>Life Points</td>
<td class="space"/>
<td class="stat"><span id="fatigue" contenteditable="true">{{currentFatigue}}</span>/{{fatigue}}<br/>Fatigue</td>
<td class="space"/>
<td class="stat"><span id="exp" contenteditable="true">{{exp}}</span>/{{toNextLevel}}<br/>Experience</td>
</tr>
</table>
`;

Template.characteristics = String.raw`
<table></table>
`;

Template.characteristic = String.raw`
<tr class="characteristic">
<{{rowType}}{{^rowType}}td{{/rowType}} class="name">{{name}}</{{rowType}}{{^rowType}}td{{/rowType}}>
<{{rowType}}{{^rowType}}td{{/rowType}} class="score">{{score}}</{{rowType}}{{^rowType}}td{{/rowType}}>
<{{rowType}}{{^rowType}}td{{/rowType}} class="modifier">{{modifier}}</{{rowType}}{{^rowType}}td{{/rowType}}>
<{{rowType}}{{^rowType}}td{{/rowType}} class="score">{{percentile}}%</{{rowType}}{{^rowType}}td{{/rowType}}>
</tr>
`;

Template.combatHeader = String.raw`
Combat
`;

Template.combat = String.raw`
<table class="stats">
<tr>
<td class="stat"><span>{{primaryAbilities.attack.score}}<span class="percentile"> ({{primaryAbilities.attack.percentile}}%)</span></span><br/>Attack</td>
<td class="space"/>
<td class="stat"><span>{{primaryAbilities.block.score}}<span class="percentile"> ({{primaryAbilities.block.percentile}}%)</span></span><br/>Block</td>
<td class="space"/>
<td class="stat"><span>{{primaryAbilities.dodge.score}}<span class="percentile"> ({{primaryAbilities.dodge.percentile}}%)</span></span><br/>Dodge</td>
<td class="space"/>
<td class="stat"><span>{{initiative}}</span><br/>Initiative</td>
</tr>
</table>
`;

Template.secondaryAbilities = String.raw`
<table></table>
`;

Template.secondaryAbilitiesCategory = String.raw`
<tr><td><table class="category">
  <tr>
  <th class="name">{{name}}</th>
  <th class="score">Score</th>
  <th class="score">%</th>
  </tr>
</table></td></tr>
`;

Template.secondaryAbility = String.raw`
<tr>
<td class="name">{{name}}</td>
<td class="score">{{score}}</td>
<td class="score">{{percentile}}%</td>
</tr>
`;

Template.resistances = String.raw`
<table></table>
`;

Template.resistance = String.raw`
<tr class="resistance">
<{{rowType}}{{^rowType}}td{{/rowType}} class="name">{{name}}</{{rowType}}{{^rowType}}td{{/rowType}}>
<{{rowType}}{{^rowType}}td{{/rowType}} class="score">{{score}}</{{rowType}}{{^rowType}}td{{/rowType}}>
<{{rowType}}{{^rowType}}td{{/rowType}} class="score">{{percentile}}%</{{rowType}}{{^rowType}}td{{/rowType}}>
</tr>
`;

Template.advantages = String.raw`
Advantages and Disadvantages
<table class="advantageList"/>
`;

Template.disadvantages = String.raw`
<table class="advantageList"/>
`;

Template.advantage = String.raw`
<tr class="advantage">
<{{rowType}}{{^rowType}}td{{/rowType}} class="name">{{name}}</{{rowType}}{{^rowType}}td{{/rowType}}>
<{{rowType}}{{^rowType}}td{{/rowType}} class="cost">{{cost}}</{{rowType}}{{^rowType}}td{{/rowType}}>
</tr>
`;

Template.psychicHeader = String.raw`
Psychic Powers
`;
Template.psychic = String.raw`
<table id="mainPsychicInfo" />
<div id="mentalPowers" />
`;

Template.mainPsychicInfo = String.raw`
<tr><td class="name">{{name}}</td><td class="score">{{score}}</td></tr>
`;

Template.mentalPowerDiscipline = String.raw`
<table class="discipline" />
`;

Template.mentalPower = String.raw`
<tr class="mentalPower">
<{{rowType}}{{^rowType}}td{{/rowType}} class="name">{{name}}</{{rowType}}{{^rowType}}td{{/rowType}}>
<{{rowType}}{{^rowType}}td{{/rowType}} class="action">{{action}}</{{rowType}}{{^rowType}}td{{/rowType}}>
<{{rowType}}{{^rowType}}td{{/rowType}} class="maintainable">{{maintainable}}</{{rowType}}{{^rowType}}td{{/rowType}}>
<{{rowType}}{{^rowType}}td{{/rowType}} class="bonus">{{bonus}}</{{rowType}}{{^rowType}}td{{/rowType}}>
</tr>
`;

Template.mentalPowerPopup = String.raw`
<div id="mentalPowerPopup">
<div class="name">{{name}}</div>
<div class="description">{{description}}</div>
<table class="effects">
</table>
</div>
`;

Template.mentalPowerEffect = String.raw`
<tr class="effect">
<{{rowType}}{{^rowType}}td{{/rowType}} class="roll">{{roll}}</{{rowType}}{{^rowType}}td{{/rowType}}>
<{{rowType}}{{^rowType}}td{{/rowType}} class="difficulty">{{difficulty}}</{{rowType}}{{^rowType}}td{{/rowType}}>
<{{rowType}}{{^rowType}}td{{/rowType}} class="outcome">{{{outcome}}}</{{rowType}}{{^rowType}}td{{/rowType}}>
</tr>
`;