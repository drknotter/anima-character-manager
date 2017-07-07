var Template = {};

Template.spendingOptionGroup = String.raw`
<div class="spendingOptionGroup">
<div class="header">
<span>{{optionName}}</span><span style="float:right">Remaining: <span id="{{totalId}}">{{total}}</span></span>
</div>
</div>
`;

Template.spendingOptionSubgroup = String.raw`
<table class="spendingOptionSubgroup">
<tr class="dpInvestment"><th>{{name}}</th>
<th class="cost">Cost/Bonus</th>
<th class="dpInvested">DP Spent</th>
<th class="score">Score</th>
</tr>
</table>
`;

Template.dpInvestment = String.raw`
<tr class="dpInvestment">
<td>{{investment.name}}</td>
<td class="cost">{{investment.cost}}/{{investment.bonus}}</td>
<td class="dpInvested"><input type="number" min="0" max="{{maxForInvestment}}" value="{{investment.dpInvested}}"></td>
<td class="score">{{investment.score}}</td>
</tr>
`;