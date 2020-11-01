function expandToGrid () {
  let gridSize = app.preferences.get('diagramEditor.gridSize');
  window.alert('grid size: ' + gridSize);
}

function init () {
  app.commands.register('gridfit:expand', expandToGrid);
}

exports.init = init
