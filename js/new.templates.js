var Template = {};

Template.classDescription = String.raw`
<div class="description">{{description}}</div>
<table>
<tr>
  <td class="column">
    <div class="box">
      <table>
        <tr><td>Life Points</td><td class="right">+{{lifePoints.bonus}} / {{lifePoints.cost}} level</td></tr>
        <tr><td>Life Point Multiples</td><td class="right">+{{otherAbilityCosts.lifePointMultiple.bonus}} / {{otherAbilityCosts.lifePointMultiple.cost}} DP</td></tr>
        <tr><td>Initiative</td><td class="right">+{{initiative.bonus}} / {{initiative.cost}} level</td></tr>
        <tr><td>Martial Knowledge</td><td class="right">+{{martialKnowledge.bonus}} / {{martialKnowledge.cost}} level</td></tr>
        <tr><td>Psychic Points</td><td class="right">+{{innateBonuses.primaryAbility.psychicPoints.bonus}} / {{innateBonuses.primaryAbility.psychicPoints.cost}} level</td></tr>
      </table>
    </div>
    <div class="box">
      <div class="boxTitle">Primary Abilities</div>
      {{#primaryAbilityCostArrays}}
      <table class="abilityGroup">
        <caption>{{name}} (Limit {{limit}})</caption>
        {{#array}}
        <tr><td>{{name}}</td><td class="right">+{{bonus}} / {{cost}} {{currency}}</td></tr>
        {{/array}}
      </table>
      {{/primaryAbilityCostArrays}}
    </div>
    <div class="box">
      <div class="boxTitle">Innate Bonuses</div>
      {{#innateBonusArrays}}
      <table class="abilityGroup">
        <caption>{{name}}</caption>
        {{#array}}
        <tr><td>{{name}}</td><td class="right">+{{bonus}} / {{cost}} {{currency}}</td></tr>
        {{/array}}
      </table>
      {{/innateBonusArrays}}
    </div>
  </td>
  <td class="space"></td>
  <td class="column">
    <div class="box">
      <div class="boxTitle">Secondary Abilities</div>
      {{#secondaryAbilityCostArrays}}
      <table class="abilityGroup">
        <caption>{{name}}</caption>
        {{#array}}
        <tr><td>{{name}}</td><td class="right">{{cost}} DP</td></tr>
        {{/array}}
      </table>
      {{/secondaryAbilityCostArrays}}
    </div>
  </td>
</tr>
</table>
`;