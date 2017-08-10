var Template = {};

Template.spendingOptionGroupHeader = String.raw`
<div class="header">
<span>{{optionName}}</span><span style="float:right">Remaining: <span id="{{totalId}}">{{total}}</span></span>
</div>
`;

Template.spendingOptionGroupHeaderNoTotal = String.raw`
<div class="header">
<span>{{optionName}}</span>
</div>
`;

Template.spendingOptionSubgroup = String.raw`
<table class="spendingOptionSubgroup">
</table>
`;

Template.dpInvestmentHeader = String.raw`
<tr class="dpInvestment">
<th>{{name}} {{#limit}}(Limit {{limit}}%){{/limit}}</th>
<th class="cost">Cost/Bonus</th>
<th class="dpInvested">DP Spent</th>
<th class="score">Score</th>
</tr>
`;
Template.dpInvestment = String.raw`
<tr class="dpInvestment">
<td>{{investment.name}}</td>
<td class="cost">{{investment.cost}}/{{investment.bonus}}</td>
<td class="dpInvested"><input type="number" min="0" max="{{maxForInvestment}}" value="{{investment.dpInvested}}" step="{{investment.cost}}"></td>
<td class="score">{{investment.score}}</td>
</tr>
`;

Template.characteristicLevelBonusInvestmentHeader = String.raw`<tr class="characteristicLevelBonusInvestment">
<th class="name">Characteristic</th>
<th class="characteristicLevelBonusesInvested">Level Bonuses Spent</th>
<th class="score">Score</th>
<th class="modifier">Modifier</th>
</tr>
`;
Template.characteristicLevelBonusInvestment = String.raw`
<tr class="characteristicLevelBonusInvestment">
<td class="name">{{characteristic.name}}</td>
<td class="characteristicLevelBonusesInvested"><input type="number" min="0" max="{{maxForInvestment}}" value="{{characteristic.characteristicLevelBonusesInvested}}"></td>
<td class="score">{{characteristic.score}}</td>
<td class="modifier">{{characteristic.modifier}}</td>
</tr>
`;

Template.secondaryAbilityLevelBonusInvestmentHeader = String.raw`
<tr class="secondaryAbilityLevelBonusInvestment">
<th class="name">Secondary Ability</th>
<th class="secondaryAbilityLevelBonusesInvested">Natural Bonuses Spent</th>
<th class="score">Score</th>
</tr>
`;
Template.secondaryAbilityLevelBonusInvestment = String.raw`
<tr class="secondaryAbilityLevelBonusInvestment">
<td class="name">{{ability.name}}</td>
<td class="secondaryAbilityLevelBonusesInvested"><input type="number" min="0" max="{{maxForInvestment}}" value="{{ability.secondaryAbilityLevelBonusesInvested}}"></td>
<td class="score">{{ability.score}}</td>
</tr>
`;

Template.cpInvestmentHeader = String.raw`
<tr class="cpInvestment">
<th class="name">{{name}}</th>
<td class="cost">{{cost}}</td>
<td class="obtained">Obtained?</tr>
`;
Template.cpInvestment = String.raw`
<tr class="cpInvestment">
<td class="name">{{name}}</td>
<td class="cost">{{cost}}</td>
<td class="obtained"><input type="checkbox"></td>
</tr>
`;
Template.cpInvestmentVariableChoice = String.raw`
<div id="variableCpChoiceDialog">
<div class="name">{{name}}</div>
Invest <input type="number" min="{{min}}" max="{{max}}" value="{{min}}"> creation points.
<div class="button">Invest</div>
</div>
`;

Template.elanDeityGroup = String.raw`
<div id="{{name}}Group" class="deityGroup">
<span class="deityName">{{name}} ({{type}})</span><span class="elanText">Elan: <span class="elanBonus">{{elanBonus}}</span></span>
<table class="gifts">
<tr class="gift">
<th class="name">Gift Name</th>
<th class="cost">Cost</th>
<th class="requiredElan">Required Elan</th>
<th class="obtained">Obtained?</th>
</tr>
</table>
</div>
`;

Template.deityGift = String.raw`
<tr class="gift">
<td class="name">{{name}}</td>
<td class="cost">{{cost}}</td>
<td class="requiredElan">{{requiredElan}}</td>
<td class="obtained"><input type="checkbox"></td>
</tr>
`;