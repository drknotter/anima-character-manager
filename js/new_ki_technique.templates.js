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
<tr><th class="radio"></th><th>{{data.bonus.name}}</th><th>Ki Points</th><th>MK</th><th>Maint.</th><th>Lvl.</th></tr>
{{#data.bonus.levels}}
<tr class="effectLevel"><td class="radio"><input type="radio" name="{{key}}|{{guid}}"></td><td>{{amount}}</td><td>{{#isPrimary}}{{primary}}{{/isPrimary}}{{^isPrimary}}{{secondary}}{{/isPrimary}}</td><td>{{martialKnowledge}}</td><td>{{maintainCost}}</td><td>{{minimumTechniqueLevel}}</td></tr>
{{/data.bonus.levels}}
</table>
<table class="pointsDistributionContainer">
<tr><th colspan="8">Ki Point Distribution</th></tr>
<tr>
<th class="strHeader distributionHeader"></th>
<th class="agiHeader distributionHeader"></th>
<th class="dexHeader distributionHeader"></th>
<th class="conHeader distributionHeader"></th>
<th class="intHeader distributionHeader"></th>
<th class="powHeader distributionHeader"></th>
<th class="wpHeader distributionHeader"></th>
<th class="perHeader distributionHeader"></th>
</tr>
<tr>
<td class="strInput distributionInput"><input type="number" min="0" value=""></td>
<td class="agiInput distributionInput"><input type="number" min="0" value=""></td>
<td class="dexInput distributionInput"><input type="number" min="0" value=""></td>
<td class="conInput distributionInput"><input type="number" min="0" value=""></td>
<td class="intInput distributionInput"><input type="number" min="0" value=""></td>
<td class="powInput distributionInput"><input type="number" min="0" value=""></td>
<td class="wpInput distributionInput"><input type="number" min="0" value=""></td>
<td class="perInput distributionInput"><input type="number" min="0" value=""></td>
</tr>
</table>
{{#data.advantages}}
<table class="advantagesContainer"></table>
<div class="addAdvantage">Add Optional Advantage</div>
{{/data.advantages}}
`;

Template.selectOption = String.raw`
<option value="{{value}}">{{name}}</option>
`

Template.advantage = String.raw`
<tr><td><div class="advantageContainer">
<div style="display:table; width:100%;">
<select class="advantageSelector" style="display:table-cell; width:100%;"></select>
<div class="space" style="display:table-cell; width:0.5rem;"/><div class="removeAdvantage" style="display:table-cell; width:1px;">Remove</div>
</div>
<div class="advantageInfo">
</div>
</div></td></tr>
`;

Template.advantageInfo = String.raw`
{{description}}
<table class="advantageOptions">
<tr><th class="radio"></th><th class="optionName">Option Name</th><th>Ki Points</th><th>MK</th><th>Maint.</th></tr>
</table>
`;

Template.advantageOption = String.raw`
<tr class="advantageOption"><td class="radio"><input type="radio" name="{{effectKey}}|{{advantageKey}}|{{guid}}"></td><td class="optionName">{{data.name}}</td><td>{{data.cost}}</td><td>{{data.martialKnowledge}}</td><td>{{data.maintainCost}}</td></tr>
`;

Template.disadvantage = String.raw`
<tr><td><div class="disadvantageContainer">
<div style="display:table; width:100%;">
<select class="disadvantageSelector" style="display:table-cell; width:100%;"></select>
<div class="space" style="display:table-cell; width:0.5rem;"/><div class="removeDisadvantage" style="display:table-cell; width:1px;">Remove</div>
</div>
<div class="disadvantageInfo"></div>
</div></td></tr>
`

Template.disadvantageInfo = String.raw`
{{description}}
<table class="disadvantageOptions">
<tr><th class="radio"></th><th class="optionName">Option Name</th><th>MK Reduction</th></tr>
</table>
`;

Template.disadvantageOption = String.raw`
<tr class="disadvantageOption"><td class="radio"><input type="radio" name="{{disadvantageKey}}|{{guid}}"></td><td class="optionName">{{data.name}}</td><td>{{data.martialKnowledgeReduction}}</td></tr>
`;
