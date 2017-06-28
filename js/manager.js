$( document ).ready(function() {
  oras = new Character(JSON.parse(window.localStorage['character.Oras']));

  renderCharacter(oras);
});

function updateCharacter(character) {
  window.localStorage['character.'+character.name] = JSON.stringify(character);
  renderCharacter(character);
}

function renderCharacter(character) {
  $('body').html(Mustache.render(Template.character, character));

  $('#mainInfo').html(Mustache.render(Template.mainInfo, character));

  $('#characteristics').append(Mustache.render(Template.characteristic, {'rowType':'th','name':'Characteristics','score':'Score','modifier':'Modifier'}));
  for (let i in character.characteristics) {
    $('#characteristics').append(Mustache.render(Template.characteristic, character.characteristics[i]));
  }

  $('#physicalAbilities').html(Mustache.render(Template.physicalAbilities, character));

  $('#lifePoints').keypress({'key':'currentLifePoints', 'character': character}, updateCharacterFrom);
  $('#fatigue').keypress({'key':'currentFatigue', 'character': character}, updateCharacterFrom);
  $('#exp').keypress({'key':'exp', 'character': character}, updateCharacterFrom);
}

function updateCharacterFrom(event) {
  var character = event.data['character'];
  var key = event.data['key'];
  if (event.which == 13) {
    var textInt = Number(this.textContent);
    if (this.textContent != "" && !isNaN(textInt)) {
      character[key] = textInt;
      updateCharacter(character);
    } else {
      $(this).html(character[key]);
    }
  }
  return event.which != 13;
}