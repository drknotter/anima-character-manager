var Template = {};

Template.spendingOptionGroup = String.raw`
<div class="spendingOptionGroup">
<table class="header">
<tr><td>{{optionName}}</td><td>{{total}}</td></tr>
</table>
<table>
</table>
</div>
`;

Template.dpInvestment = String.raw`
<tr class="dpInvestment">
<td>{{name}}</td>
<td class="subtract"><div>-</div></td>
<td class="dpInvested">{{dpInvested}}</td>
<td class="add"><div>+</div></td>
`;