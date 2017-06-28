var Template = {};

Template.character = String.raw`
<div id="character">
<table>
<tr>
  <td id="column1">
    <div id="mainInfo"/>
    <div id="physicalAbilities"/>
  </td>
  <td id="column2">
    <table id="characteristics" />
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

Template.characteristic = String.raw`
<tr class="characteristic">
<{{rowType}}{{^rowType}}td{{/rowType}} class="name">{{name}}</{{rowType}}{{^rowType}}td{{/rowType}}>
<{{rowType}}{{^rowType}}td{{/rowType}} class="score">{{score}}</{{rowType}}{{^rowType}}td{{/rowType}}>
<{{rowType}}{{^rowType}}td{{/rowType}} class="modifier">{{modifier}}</{{rowType}}{{^rowType}}td{{/rowType}}>
</tr>
`;

Template.physicalAbilities = String.raw`
Physical Abilities
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