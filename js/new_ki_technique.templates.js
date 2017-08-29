Template = {};

Template.effect = String.raw`
<tr><td><div class="effectContainer" style="display:table; width:100%;">
<select {{#id}}id="{{id}}" {{/id}}class="effectSelector" style="display:table-cell; width:100%;"></select>
{{#removeable}}<div class="space" style="display:table-cell; width:0.5rem;"/><div class="removeEffect" style="display:table-cell; width:1px;">Remove</div>{{/removeable}}
</div></td></tr>
`

Template.effectOption = String.raw`
<option value="{{key}}">{{name}}</option>
`