var Template = {};

Template.character = [
'<div id="character">',
'<div id="title" />',
'<table><tr>',
'<td id="characteristics"><table /></td>',
'<td id="primaryAbilities"><table /></td>',
'</tr></table>',
'</div>',].join('\n');

Template.title = [
'<div id="name">',
'{{name}}',
'</div>',
'<div id="class">',
'{{classObject.name}}',
'</div>',].join('\n');

Template.characteristic = [
'<tr class="characteristic">',
'<td class="name">{{name}}</td>',
'<td class="nickname">({{nickname}})</td>',
'<td class="score">{{score}}</td>',
'<td class="modifier">{{modifier}}</td>',
'</tr>',
].join('\n')

Template.primaryAbilities = [
'<tr class="primaryAbility">',
'<td class="name">{{name}}</td>',
'<td class="score">{{score}}</td>',
'</tr>',
].join('\n')