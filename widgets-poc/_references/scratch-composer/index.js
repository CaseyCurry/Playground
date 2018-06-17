"use strict";

const widgets = [{
    initialWidth: 6,
    minimumWidth: 6,
    innerHTML: "<div style='height:100px;'>temp</div>"
  }, {
    initialWidth: 12,
    minimumWidth: 8,
    innerHTML: "<div style='height:100px;'>1</div>"
  }, {
    initialWidth: 11,
    minimumWidth: 8,
    innerHTML: "<div style='height:100px;'>temp</div>"
  },
  {
    initialWidth: 1,
    minimumWidth: 1,
    innerHTML: "<div style='height:100px;' data-no-resize>2A</div>"
  },
  {
    initialWidth: 1,
    minimumWidth: 1,
    innerHTML: "<div style='height:100px;' data-no-resize>2B</div>"
  },
  {
    initialWidth: 1,
    minimumWidth: 1,
    innerHTML: "<div style='height:100px;' data-no-resize>2C</div>"
  },
  {
    initialWidth: 1,
    minimumWidth: 1,
    innerHTML: "<div style='height:100px;' data-no-resize>2D</div>"
  },
  {
    initialWidth: 1,
    minimumWidth: 1,
    innerHTML: "<div style='height:100px;' data-no-resize>2E</div>"
  },
  {
    initialWidth: 1,
    minimumWidth: 1,
    innerHTML: "<div style='height:100px;' data-no-resize>2F</div>"
  },
  {
    initialWidth: 1,
    minimumWidth: 1,
    innerHTML: "<div style='height:100px;' data-no-resize>2G</div>"
  },
  {
    initialWidth: 1,
    minimumWidth: 1,
    innerHTML: "<div style='height:100px;' data-no-resize>2H</div>"
  },
  {
    initialWidth: 1,
    minimumWidth: 1,
    innerHTML: "<div style='height:100px;' data-no-resize>2I</div>"
  },
  {
    initialWidth: 1,
    minimumWidth: 1,
    innerHTML: "<div style='height:100px;' data-no-resize>2J</div>"
  },
  {
    initialWidth: 1,
    minimumWidth: 1,
    innerHTML: "<div style='height:100px;' data-no-resize>2K</div>"
  },
  {
    initialWidth: 1,
    minimumWidth: 1,
    innerHTML: "<div style='height:100px;' data-no-resize>2L</div>"
  },
  {
    initialWidth: 6,
    minimumWidth: 6,
    innerHTML: "<div style='height:200px'><div style='width:50%;display:inline-block'>3A</div><div style='width:50%;display:inline-block'>3B</div></div>"
  },
  {
    initialWidth: 6,
    minimumWidth: 6,
    innerHTML: "<div style='height:200px;'>4</div>"
  },
  {
    initialWidth: 4,
    minimumWidth: 2,
    innerHTML: "<div style='height:200px;'></div>"
  },
  {
    initialWidth: 5,
    minimumWidth: 2,
    innerHTML: "<div style='height:200px;'></div>"
  }
  /*,
    {
      initialWidth: 4,
      minimumWidth: 4,
      innerHTML: "<div style='height:50px;'>5</div>"
    },
    {
      initialWidth: 8,
      minimumWidth: 8,
      innerHTML: "<div style='height:50px;'>6</div>"
    },
    {
      initialWidth: 3,
      minimumWidth: 3,
      innerHTML: "<div style='height:50px;'>7</div>"
    },
    {
      initialWidth: 3,
      minimumWidth: 3,
      innerHTML: "<div style='height:50px;'>8</div>"
    },
    {
      initialWidth: 3,
      minimumWidth: 3,
      innerHTML: "<div style='height:50px;'>9</div>"
    },
    {
      initialWidth: 3,
      minimumWidth: 3,
      innerHTML: "<div style='height:50px;'>10</div>"
    },
    {
      initialWidth: 1,
      minimumWidth: 1,
      innerHTML: "<div style='height:100px;'>11A</div>"
    },
    {
      initialWidth: 1,
      minimumWidth: 1,
      innerHTML: "<div style='height:100px;'>12B</div>"
    },
    {
      initialWidth: 1,
      minimumWidth: 1,
      innerHTML: "<div style='height:100px;'>13C</div>"
    },
    {
      initialWidth: 1,
      minimumWidth: 1,
      innerHTML: "<div style='height:100px;'>13D</div>"
    },
    {
      initialWidth: 1,
      minimumWidth: 1,
      innerHTML: "<div style='height:100px;'>13E</div>"
    },
    {
      initialWidth: 1,
      minimumWidth: 1,
      innerHTML: "<div style='height:100px;'>13F</div>"
    },
    {
      initialWidth: 1,
      minimumWidth: 1,
      innerHTML: "<div style='height:100px;'>13G</div>"
    },
    {
      initialWidth: 1,
      minimumWidth: 1,
      innerHTML: "<div style='height:100px;'>13H</div>"
    },
    {
      initialWidth: 1,
      minimumWidth: 1,
      innerHTML: "<div style='height:100px;'>13I</div>"
    },
    {
      initialWidth: 1,
      minimumWidth: 1,
      innerHTML: "<div style='height:100px;'>13J</div>"
    },
    {
      initialWidth: 1,
      minimumWidth: 1,
      innerHTML: "<div style='height:100px;'>13K</div>"
    },
    {
      initialWidth: 1,
      minimumWidth: 1,
      innerHTML: "<div style='height:100px;'>13L</div>"
    }*/
];

const widgetsContainer = document.getElementsByClassName("widgets")[0];

widgets.forEach(x => {
  const widget = widgetsContainer.addWidget(x.initialWidth, x.minimumWidth, x.innerHTML);
  widget.makeDraggable();
  if (x.innerHTML.indexOf("data-no-resize") < 0) {
    widget.addControlsPanel();
    widget.makeResizable();
  }
});

widgetsContainer.addHorizontalSpacers();
widgetsContainer.makeGrid();