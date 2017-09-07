var Template = {};

Template.character = String.raw`
<table>
<tr id="character">
  <td id="column0" class="column"></td>
</tr>
<tr>
  <td id="controlButtons">
  <a id="spendButton" class="bottomButton" href="spend.html?n={{name}}">Spend</a>
  <a id="exportButton" class="bottomButton" download="{{name}}.json">Export</a>
  </td>
</tr>
</table>
`;

Template.mainInfoHeader = String.raw`
<table>
<tr>
<td id="name">{{name}}</td>
<td id="levelAndClass">Level {{level}} {{class.name}}</td>
</tr>
</table>
`;

Template.mainInfo = String.raw`
<table class="stats">
<tr>
<td id="lifePoints" class="stat setMainInfo"><span>{{currentLifePoints}}</span>/{{lifePoints.score}}<br/>Life Points</td>
<td class="space"/>
<td id="fatigue" class="stat setMainInfo"><span>{{currentFatigue}}</span>/{{fatigue}}<br/>Fatigue</td>
<td class="space"/>
<td id="exp" class="stat setMainInfo"><span>{{exp}}</span>/{{toNextLevel}}<br/>Experience</td>
<td class="space"/>
<td id="wealth" class="stat setMainInfo">{{wealthData.gp}}GP, {{wealthData.sp}}SP, {{wealthData.cp}}CP<br/>Wealth</td>
</tr>
</table>
`;

Template.characteristics = String.raw`
<table>
<tr class="characteristic">
<th class="name"></th>
<th class="score">Score</th>
<th class="modifier">Modifier</th>
<th class="score">%</th>
</tr>
</table>
`;

Template.characteristic = String.raw`
<tr class="characteristic">
<td class="name">{{name}}</td>
<td class="score d10Rollable" data-name="{{name}}" data-bonus="{{score}}">{{score}}</td>
<td class="modifier">{{modifier}}</td>
<td class="score percentileRollable" data-name="{{name}}" data-bonus="{{percentile}}">{{percentile}}%</td>
</tr>
`;

Template.combat = String.raw`
<table class="combatTable">
<tr><td>Initiative</td><td class="score"></td><td class="score openRollable" data-name="Initiative" data-bonus="{{initiative.score}}">{{initiative.score}}</td></tr>
<tr><td>Actions</td><td class="score"></td><td class="score">{{actions}}</td></tr>
<tr><td>Attack</td><td class="score openRollable" data-name="Attack" data-bonus="{{primaryAbilities.attack.score}}">{{primaryAbilities.attack.score}}</td><td class="score percentileRollable" data-name="Attack" data-bonus="{{primaryAbilities.attack.percentile}}">{{primaryAbilities.attack.percentile}}%</td></tr>
<tr><td>Block</td><td class="score openRollable" data-name="Block" data-bonus="{{primaryAbilities.block.score}}">{{primaryAbilities.block.score}}</td><td class="score percentileRollable" data-name="Block" data-bonus="{{primaryAbilities.block.percentile}}">{{primaryAbilities.block.percentile}}%</td></tr>
<tr><td>Dodge</td><td class="score openRollable" data-name="Dodge" data-bonus="{{primaryAbilities.dodge.score}}">{{primaryAbilities.dodge.score}}</td><td class="score percentileRollable" data-name="Dodge" data-bonus="{{primaryAbilities.dodge.percentile}}">{{primaryAbilities.dodge.percentile}}%</td></tr>
</table>
<table class="combatTable">
<tr><th>Armor Type</th><th>Score</th></tr>
<tr><td>{{armorType.cut.name}}</td><td class="score">{{armorType.cut.score}}</td></tr>
<tr><td>{{armorType.impact.name}}</td><td class="score">{{armorType.impact.score}}</td></tr>
<tr><td>{{armorType.thrust.name}}</td><td class="score">{{armorType.thrust.score}}</td></tr>
<tr><td>{{armorType.heat.name}}</td><td class="score">{{armorType.heat.score}}</td></tr>
<tr><td>{{armorType.electricity.name}}</td><td class="score">{{armorType.electricity.score}}</td></tr>
<tr><td>{{armorType.cold.name}}</td><td class="score">{{armorType.cold.score}}</td></tr>
<tr><td>{{armorType.energy.name}}</td><td class="score">{{armorType.energy.score}}</td></tr>
<table class="combatTable" id="combatModules">
<tr><th>Combat Modules</th></tr>
</table>
<table class="combatTable" id="martialArts">
<tr><th>Martial Arts</th><th class="damage">Damage</th></tr>
</table>
</table>
`;

Template.combatModule = String.raw`
<tr class="combatModule"><td>{{name}}</td></tr>
`;

Template.martialArt = String.raw`
<tr class="martialArt"><td>{{name}}</td><td class="damage">{{baseDamage}}</td></tr>
`;

Template.secondaryAbilities = String.raw`
<table></table>
`;

Template.secondaryAbilitiesCategory = String.raw`
<tr><td><table class="category">
  <tr>
  <th class="name">{{name}}</th>
  <th class="score">Score</th>
  <th class="score">%</th>
  </tr>
</table></td></tr>
`;

Template.secondaryAbility = String.raw`
<tr>
<td class="name">{{name}}</td>
<td class="score openRollable" data-name="{{name}}" data-bonus="{{score}}">{{score}}</td>
<td class="score percentileRollable" data-name="{{name}}" data-bonus="{{percentile}}">{{percentile}}%</td>
</tr>
`;

Template.resistances = String.raw`
<table>
<tr class="resistance">
<th class="name"></th>
<th class="score">Score</th>
<th class="score">%</th>
</tr>
</table>
`;

Template.resistance = String.raw`
<tr class="resistance">
<td class="name">{{name}}</td>
<td class="score rollable" data-name="{{name}}" data-bonus="{{score}}">{{score}}</td>
<td class="score percentileRollable" data-name="{{name}}" data-bonus="{{percentile}}">{{percentile}}%</td>
</tr>
`;

Template.advantages = String.raw`
<table class="advantageList"></table>
`;

Template.disadvantages = String.raw`
<table class="advantageList"/>
`;

Template.advantage = String.raw`
<tr class="advantage">
<{{rowType}}{{^rowType}}td{{/rowType}} class="name">{{name}}</{{rowType}}{{^rowType}}td{{/rowType}}>
<{{rowType}}{{^rowType}}td{{/rowType}} class="cost">{{cpInvested}}</{{rowType}}{{^rowType}}td{{/rowType}}>
</tr>
`;

Template.psychic = String.raw`
<table id="mainPsychicInfo" />
<div id="mentalPowers" />
`;

Template.mainPsychicInfo = String.raw`
<tr class="mainPsychicInfo"><td class="name">{{name}}</td><td class="score">{{score}}</td></tr>
`;

Template.mentalPowerDiscipline = String.raw`
<table class="discipline">
<tr class="mentalPower">
<th class="name">{{name}}</th>
<th class="action">Action</th>
<th class="maintainable">Maintain?</th>
<th class="bonus">Score</th>
</tr>
</table>
`;

Template.mentalPower = String.raw`
<tr class="mentalPower">
<td class="name">{{name}}</td>
<td class="action">{{action}}</td>
<td class="maintainable">{{maintainable}}</td>
<td class="bonus openRollable" data-name="{{name}}" data-bonus="{{score}}">{{score}}</td>
</tr>
`;

Template.mentalPowerPopup = String.raw`
<div id="mentalPowerPopup" class="popup">
<div class="name">{{name}}</div>
<div class="description">{{description}}</div>
<table class="effects"></table>
</div>
`;

Template.mentalPowerEffect = String.raw`
<tr class="effect">
<{{rowType}}{{^rowType}}td{{/rowType}} class="roll">{{roll}}</{{rowType}}{{^rowType}}td{{/rowType}}>
<{{rowType}}{{^rowType}}td{{/rowType}} class="difficulty">{{difficulty}}</{{rowType}}{{^rowType}}td{{/rowType}}>
<{{rowType}}{{^rowType}}td{{/rowType}} class="outcome">{{{outcome}}}</{{rowType}}{{^rowType}}td{{/rowType}}>
</tr>
`;

Template.equipmentList = String.raw`
<table id="equipmentList">
<tr class="equipment">
<th class="name">Name</th>
<th class="action"></th>
<th class="action"></th>
<th class="action"></th>
<th class="action"></th>
</tr>
</table>
<a id="newEquipment" href="new_equipment.html?n={{name}}">Add New Item</a>
`;

Template.equipment = String.raw`
<tr class="equipment">
<td class="name">{{name}}</td>
<td class="action"><div class="action equip"><span>{{#equipped}}U{{/equipped}}{{^equipped}}E{{/equipped}}</span></div></td>
<td class="action"><div class="action sell"><span>$</span></div></td>
<td class="action"><div class="action discard"><span>&#x232b;</span></div></td>
<td class="action"><div class="action edit"><span>&#x270E;</span></div></td>
</tr>
`;

Template.equipmentPopup = String.raw`
<div id="equipmentPopup" class="popup">
<div class="name">{{name}}</div>
<div class="description">{{description}}</div>
<table class="mainStats">
<tr><th>Cost</th><th>Weight</th><th>Availability</th><th>Fortitude</th><th>Presence</th></tr>
<tr>
<td>{{costData.gp}}GP, {{costData.sp}}SP, {{costData.cp}}CP</td>
<td>{{weight}} lbs</td>
<td>{{availability}}</td>
<td>{{fortitude}}</td>
<td>{{presence}}</td>
</tr>
</table>
</div>
`;

Template.armorDetails = String.raw`
<table class="details">
<tr><th>Armor Requirement</th><td>{{armorRequirement}}</td></tr>
<tr><th>Natural Penalty</th><td>{{naturalPenalty}}</td></tr>
<tr><th>Perception Penalty</th><td>{{perceptionPenalty}}</td></tr>
<tr><th>Movement Restriction</th><td>{{movementRestriction}}</td></tr>
</table>
<table class="details">
<tr><th>Armor Type</th><th>Bonus</th><tr>
<tr><td>Cut</td><td>{{protections.cut}}</td></tr>
<tr><td>Impact</td><td>{{protections.impact}}</td></tr>
<tr><td>Thrust</td><td>{{protections.thrust}}</td></tr>
<tr><td>Heat</td><td>{{protections.heat}}</td></tr>
<tr><td>Electricity</td><td>{{protections.electricity}}</td></tr>
<tr><td>Cold</td><td>{{protections.cold}}</td></tr>
<tr><td>Energy</td><td>{{protections.energy}}</td></tr>
</table>
`;

Template.weaponDetails = String.raw`
<table class="mainStats">
<tr><th>Damage</th><th>Speed</th><th>Required Strength</th></tr>
<tr>
<td>{{finalDamage}}</td>
<td>{{speed}}</td>
<td>{{requiredStrength}}</td>
</table>
<table class="details">
<tr><th>Primary Attack Type</th><td>{{primaryAttackType}}</td></tr>
<tr><th>Secondary Attack Type</th><td>{{secondaryAttackType}}</td></tr>
<tr><th>Weapon Type</th><td>{{weaponType}}</td></tr>
<tr><th>Special</th><td>{{special}}</td></tr>
<tr><th>Two Handed?</th><td>{{#twoHanded}}Yes{{/twoHanded}}{{^twoHanded}}No{{/twoHanded}}</td></tr>
</table>
`;

Template.singleNumberPopup = String.raw`
<div class="popup">
<table class="numberPopup">
<tr><th colspan="2">{{name}}</th></tr>
<tr><td><input value="{{currentValue}}" type="number"></td><td><div class="enterButton">Enter</div></td></tr>
</table>
</div>
`;

Template.tripleNumberPopup = String.raw`
<div class="popup">
<table class="numberPopup">
<tr><th colspan="2">{{name}}</th></tr>
<tr><td><input value="{{currentValue1}}" type="number"></td><td class="label">{{label1}}</td></tr>
<tr><td><input value="{{currentValue2}}" type="number"></td><td class="label">{{label2}}</td></tr>
<tr><td><input value="{{currentValue3}}" type="number"></td><td class="label">{{label3}}</td></tr>
<tr><td colspan="2"><div class="enterButton">Enter</div></td></tr>
</table>
</div>
`;

Template.elanList = String.raw`
<table id="elanList">
<tr><th class="name">Deity</th><th class="score">Elan</th></tr>
</table>
`;

Template.elan = String.raw`
<tr><td class="name">{{name}} ({{type}})</td><td class="score">{{score}}</td></tr>
`; 

Template.elanPopup = String.raw`
<div id="elanPopup" class="popup">
<div class="name">{{name}}</div>
<div class="description">{{description}}</div>
<table id="elanGifts">
<tr><th>Gifts</th></tr>
</table>
</div>
`;

Template.elanGift = String.raw`
<tr class="gift"><td>
<div class="giftName">{{name}}</div>
<div class="giftDescription">{{description}}</div>
</td></tr>
`;

Template.rollPopup = String.raw`
<div class="popup">
<div id="rollResultText">{{resultText}}</div>
<div id="rolls">Rolls: {{rolls}}</div>
<div id="rollResult">{{result}}</div>
</div>
`;

Template.ki = String.raw`
<div class="title">Ki Points/Ki Accumulation</div>
<table id="kiAccumulation" class="stats">
<tr>
<td class="stat">{{primaryAbilities.ki_str.score}}/{{primaryAbilities.kiAccumulationMultiple_str.score}}<br/>Str</td>
<td class="space"/>
<td class="stat">{{primaryAbilities.ki_agi.score}}/{{primaryAbilities.kiAccumulationMultiple_agi.score}}<br/>Agi</td>
<td class="space"/>
<td class="stat">{{primaryAbilities.ki_dex.score}}/{{primaryAbilities.kiAccumulationMultiple_dex.score}}<br/>Dex</td>
<td class="space"/>
<td class="stat">{{primaryAbilities.ki_con.score}}/{{primaryAbilities.kiAccumulationMultiple_con.score}}<br/>Con</td>
<td class="space"/>
<td class="stat">{{primaryAbilities.ki_pow.score}}/{{primaryAbilities.kiAccumulationMultiple_pow.score}}<br/>Pow</td>
<td class="space"/>
<td class="stat">{{primaryAbilities.ki_wp.score}}/{{primaryAbilities.kiAccumulationMultiple_wp.score}}<br/>WP</td>
</tr>
</table>
<table id="kiAbilities" class="kiTable">
<tr><th>Ki Abilities</th></tr>
</table>
<table id="kiTechniques" class="kiTable">
<tr><th>Ki Techniques</th><th></th></tr>
</table>
`;

Template.kiAbility = String.raw`
<tr class="kiAbility"><td>{{name}}</td></tr>
`;

Template.kiTechnique = String.raw`
<tr class="kiTechnique">
<td>{{name}}</td>
<td class="action"><div class="action edit"><span>&#x270E;</span></div></td>
</tr>
`;