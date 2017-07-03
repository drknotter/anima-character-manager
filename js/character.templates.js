var Template = {};

Template.character = String.raw`
<div id="character">
<table>
<tr>
  <td id="column1">
    <div id="mainInfo" class="box"/>
    <div id="combat" class="box"/>
    <div id="psychic" class="box" />
    <div id="resistances" class="box" />
    <div id="advantages" class="box" />
  </td>
  <td id="column2">
    <div id="characteristics" class="box" />
    <div id="secondaryAbilities" class="box" />
  </td>
</tr>
</div>
`;

Template.mainInfo = String.raw`
<table>
<tr>
<td id="name">{{name}}</td>
<td id="levelAndClass">Level {{level}} {{class.name}}</td>
</tr>
</table>
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
<table/>
`;

Template.characteristic = String.raw`
<tr class="characteristic">
<{{rowType}}{{^rowType}}td{{/rowType}} class="name">{{name}}</{{rowType}}{{^rowType}}td{{/rowType}}>
<{{rowType}}{{^rowType}}td{{/rowType}} class="score">{{score}}</{{rowType}}{{^rowType}}td{{/rowType}}>
<{{rowType}}{{^rowType}}td{{/rowType}} class="modifier">{{modifier}}</{{rowType}}{{^rowType}}td{{/rowType}}>
</tr>
`;

Template.combat = String.raw`
Combat
<table class="stats">
<tr>
<td class="stat"><span>{{primaryAbilities.attack.score}}</span><br/>Attack</td>
<td class="space"/>
<td class="stat"><span>{{primaryAbilities.block.score}}</span><br/>Block</td>
<td class="space"/>
<td class="stat"><span>{{primaryAbilities.dodge.score}}</span><br/>Dodge</td>
<td class="space"/>
<td class="stat"><span>{{movement}}ft.</span><br/>Movement</td>
</tr>
</table>
`;

Template.secondaryAbilities = String.raw`
<table><caption>Secondary Abilities</caption></table>
`;

Template.secondaryAbilitiesCategory = String.raw`
<tr><td><table class="category">
  <tr><th class="name">{{name}}</th><th class="score">Score</th></tr>
</table></td></tr>
`;

Template.secondaryAbility = String.raw`
<tr><td class="name">{{name}}</td><td class="score">{{score}}</td></tr>
`;

Template.resistances = String.raw`
<table />
`;

Template.resistance = String.raw`
<tr class="resistance">
<{{rowType}}{{^rowType}}td{{/rowType}} class="name">{{name}}</{{rowType}}{{^rowType}}td{{/rowType}}>
<{{rowType}}{{^rowType}}td{{/rowType}} class="score">{{score}}</{{rowType}}{{^rowType}}td{{/rowType}}>
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

Template.psychic = String.raw`
Psychic Powers
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
<{{rowType}}{{^rowType}}td{{/rowType}} class="outcome">{{outcome}}</{{rowType}}{{^rowType}}td{{/rowType}}>
</tr>
`;