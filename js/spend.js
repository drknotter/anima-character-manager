function gatherInvestments(data, Type) {
  if (!data) {
    return [];
  }

  var gathered = [];
  for (let i in data) {
    if (data[i] instanceof Type) {
      gathered.push(data[i]);
    } else if (data[i] instanceof Object) {
      var gatheredFromChild = gatherInvestments(data[i], Type);
      for (let j in gatheredFromChild) {
        gathered.push(gatheredFromChild[j]);
      }
    }
  }
  return gathered;
}

$( document ).ready(function() {
  var character = new Character(JSON.parse(localStorage['character.Oras']));
  renderSpendingOptions(character);
});

function renderSpendingOptions(character) {
  var DP = character.DP;
  var investments = gatherInvestments(character, DPInvestment);
  $('#content').html(Mustache.render(Template.spendingOptionGroup, {'optionName': 'Spend DP', 'total': character.DP}));
  for (let i in investments) {
    $('#content .spendingOptionGroup>table').last().append(Mustache.render(Template.dpInvestment, investments[i]));
    $('.dpInvestment .subtract').last().click({'investment': investments[i], 'character': character}, subtractDP);
    if (DP > 0) {
      $('.dpInvestment .add').last().click({'investment': investments[i], 'character': character}, addDP);
    }
  }
}

function subtractDP(event) {
  var investment = event.data.investment;
  var character = event.data.character;
  if (investment.dpInvested > 0) {
    investment.dpInvested--;
    renderSpendingOptions(character);
  }
}

function addDP(event) {
  var investment = event.data.investment;
  var character = event.data.character;
  investment.dpInvested++;
  renderSpendingOptions(character);
}