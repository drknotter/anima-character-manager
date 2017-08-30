Template = {};

Template.effect = String.raw`
<tr><td><div class="effectContainer">
<div style="display:table; width:100%;">
<select {{#id}}id="{{id}}" {{/id}}class="effectSelector" style="display:table-cell; width:100%;"></select>
{{#removeable}}<div class="space" style="display:table-cell; width:0.5rem;"/><div class="removeEffect" style="display:table-cell; width:1px;">Remove</div>{{/removeable}}
</div>
<div class="effectInfo">
</div>
</div></td></tr>
`

Template.effectInfo = String.raw`
{{data.description}}
<table class="effectLevels">
<tr><th class="radio"></th><th>{{data.bonus.name}}</th><th>Primary</th><th>Secondary</th><th>MK</th><th>Maint.</th><th>Lvl.</th></tr>
{{#data.bonus.levels}}
<tr><td class="radio"><input type="radio" name="{{key}}"></td><td>{{amount}}</td><td>{{primary}}</td><td>{{secondary}}</td><td>{{martialKnowledge}}</td><td>{{maintainCost}}</td><td>{{minimumTechniqueLevel}}</td></tr>
{{/data.bonus.levels}}
</table>
`;

Template.selectOption = String.raw`
<option value="{{value}}">{{name}}</option>
`

Template.disadvantage = String.raw`
<tr><td><div class="disadvantageContainer">
<div style="display:table; width:100%;">
<select class="disadvantageSelector" style="display:table-cell; width:100%;"></select>
<div class="space" style="display:table-cell; width:0.5rem;"/><div class="removeDisadvantage" style="display:table-cell; width:1px;">Remove</div>
</div>
</div></td></tr>
`

