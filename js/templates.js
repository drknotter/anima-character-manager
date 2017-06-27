var Template = {};

Template.character = String.raw`
<div id="character">
<table>
<tr>
  <td id="column1">
    <div id="mainInfo"/>
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
<td id="classAndAppearance">
Level {{level}} {{class.name}}<br/>
XP: {{exp}}<br/>
Next level: {{toNextLevel}}
</td>
`;

Template.characteristic = String.raw`
<tr class="characteristic">
<{{rowType}}{{^rowType}}td{{/rowType}} class="name">{{name}}</{{rowType}}{{^rowType}}td{{/rowType}}>
<{{rowType}}{{^rowType}}td{{/rowType}} class="score">{{score}}</{{rowType}}{{^rowType}}td{{/rowType}}>
<{{rowType}}{{^rowType}}td{{/rowType}} class="modifier">{{modifier}}</{{rowType}}{{^rowType}}td{{/rowType}}>
</tr>
`;


Template.primaryAbilities = String.raw`
<tr class="primaryAbility">
<td class="name">{{name}}</td>
<td class="score">{{score}}</td>
</tr>
`;
