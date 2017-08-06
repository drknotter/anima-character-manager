var Template = {};

Template.bonus = String.raw`
<tr class="bonus">
<td>
<select>{{#.}}
<option value="{{keychain}}">{{name}}</option>
{{/.}}</select>
</td>
<td><input type="number"></td>
<td><div class="remove">Remove</div></td>
</tr>
`;

Template.armorOptions = String.raw`
<table id="extraOptions">
  <tr><th>Armor Requirement</th><td><input id="armorRequiprement" type="number" min="0"></td></tr>
  <tr><th>Natural Penalty</th><td><input id="naturalPenalty" type="number" min="0"></td></tr>
  <tr><th>Perception Penalty</th><td><input id="perceptionPenalty" type="number" min="0"></td></tr>
  <tr><th>Movement Restriction</th><td><input id="movementRestriction" type="number" min="0"></td></tr>
  <tr><th>Cut</th><td><input id="cut" type="number" min="0"></td></tr>
  <tr><th>Impact</th><td><input id="impact" type="number" min="0"></td></tr>
  <tr><th>Thrust</th><td><input id="thrust" type="number" min="0"></td></tr>
  <tr><th>Heat</th><td><input id="heat" type="number" min="0"></td></tr>
  <tr><th>Electricity</th><td><input id="electricity" type="number" min="0"></td></tr>
  <tr><th>Cold</th><td><input id="cold" type="number" min="0"></td></tr>
  <tr><th>Energy</th><td><input id="energy" type="number" min="0"></td></tr>
</table>
`;

Template.weaponOptions = String.raw`
<table id="extraOptions">
  <tr><th>Damage</th><td><input id="damage" type="number" min="0"></td></tr>
  <tr><th>Speed</th><td><input id="speed" type="number" min="0"></td></tr>
  <tr><th>Required Strength</th><td><input id="requiredStrength" type="number" min="0"></td></tr>
  <tr><th>Primary Attack Type</th><td><input id="primaryAttackType" type="text" min="0"></td></tr>
  <tr><th>Secondary Attack Type</th><td><input id="secondaryAttackType" type="text" min="0"></td></tr>
  <tr><th>Weapon Type</th><td><input id="weaponType" type="text" min="0"></td></tr>
  <tr><th>Special</th><td><input id="special" type="text" min="0"></td></tr>
  <tr><th>Two Handed?</th>
    <td>
      <select id="twoHanded">
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
    </td>
  </tr>
</table>
`;