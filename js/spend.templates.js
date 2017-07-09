var Template = {};

Template.dpSpendingOptionGroupHeader = String.raw`
<div class="header">
<span>{{optionName}}</span><span style="float:right">Remaining: <span id="{{totalId}}">{{total}}</span></span>
</div>
`;

Template.spendingOptionGroup = String.raw`
<div class="spendingOptionGroup">
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
<td class="dpInvested"><input type="number" min="0" max="{{maxForInvestment}}" value="{{investment.dpInvested}}"></td>
<td class="score">{{investment.score}}</td>
</tr>
`;