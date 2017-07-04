var Template = {};

Template.spendingOptionGroup = String.raw`
<div class="spendingOptionGroup">
<table class="header">
<tr><td>{{optionName}}</td><td id="{{totalId}}">{{total}}</td></tr>
</table>
<table>
</table>
</div>
`;

Template.dpInvestment = String.raw`
<tr class="dpInvestment">
<td>{{name}}</td>
<td class="dpInvested"><input type="number" min="0" value="{{dpInvested}}"></td>
`;