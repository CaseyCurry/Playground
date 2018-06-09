"use strict";

const widgets = [{
    initialWidth: 12,
    minimumWidth: 8,
    innerHTML: "<div style='height:100px;'>1</div>"
  },
  {
    initialWidth: 6,
    minimumWidth: 6,
    innerHTML: "<div style='height:200px'><div style='width:50%;display:inline-block'>1A</div><div style='width:50%;display:inline-block'>1B</div></div>"
  },
  {
    initialWidth: 6,
    minimumWidth: 6,
    innerHTML: "<div style='height:200px;'>2</div>"
  },
  {
    initialWidth: 4,
    minimumWidth: 4,
    innerHTML: "<div style='height:50px;'>3</div>"
  },
  {
    initialWidth: 8,
    minimumWidth: 8,
    innerHTML: "<div style='height:50px;'>4</div>"
  }
];

const widgetsContainer = document.getElementsByClassName("widgets")[0];

widgets.forEach(x => {
  const widget = widgetsContainer.addWidget(x.initialWidth, x.minimumWidth, x.innerHTML);
  widget.makeDraggable();
  widget.addControlsPanel();
});

widgetsContainer.addHorizontalSpacers();
widgetsContainer.makeGrid();