function adjustedSize(roundingFunc, gridSize, minCoord, minSize, currentSize, maxCoord) {
  let lineWidth = minCoord + currentSize - maxCoord;
  let newSize = gridSize * roundingFunc((currentSize - lineWidth) / gridSize) + lineWidth;
  if (newSize < minSize) {
    newSize = gridSize * roundingFunc((minSize - lineWidth) / gridSize) + lineWidth;
  }
  newSize = Math.max(newSize, gridSize + lineWidth);
  return newSize;
}

function adjustNode(roundingFunc, gridSize, node) {
  let newSize = adjustedSize(roundingFunc, gridSize, node.left, node.minWidth, node.width, node.getRight());
  node.width = newSize;
  newSize = adjustedSize(roundingFunc, gridSize, node.top, node.minHeight, node.height, node.getBottom());
  node.height = newSize;
}

function adjustSelectedNodes(roundingFunc) {
  let gridSize = app.preferences.get('diagramEditor.gridSize');
  let nodeViewType = app.type.NodeView;
  let parasiticViewType = app.type.ParasiticView;
  let selectedViews = app.selections.getSelectedViews()
  selectedViews.forEach(element => {
    if (element instanceof nodeViewType && !(element instanceof parasiticViewType)) {
      adjustNode(roundingFunc, gridSize, element);
    }
  });
  app.diagrams.repaint();
}

function expandToGrid() {
  adjustSelectedNodes(Math.ceil);
}

function init() {
  app.commands.register('gridfit:expand', expandToGrid);
}

exports.init = init
