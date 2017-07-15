var boxTemplate = String.raw`<div class="box{{#closeable}} closeable{{/closeable}}"><div class="closeButton" /><div id="{{id}}" /></div>`;

function check(arg, msg) {
  if (!arg) {
    throw {'message': msg};
  }
}

function isNumber(n) {
  return Number(n) === n;
}

function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function appendBox(parent, id, closeable, header) {
  var box = $(Mustache.render(boxTemplate, {'id': id, 'closeable': closeable}));
  var closeButton = box.find('.closeButton');
  parent.append(box);
  closeButton.append(header);
  if (closeable) {
    closeButton.click(function(event) {
      $('#'+id).toggle(200);
    });
  }
}