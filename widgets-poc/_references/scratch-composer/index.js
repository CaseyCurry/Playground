"use strict";

const getResponsiveBreakpoint = function() {
  const breakpoints = {
    xl: "d-xl-none",
    lg: "d-lg-none",
    md: "d-md-none",
    sm: "d-sm-none",
    xs: "d-none"
  };
  let breakpoint = "";

  const marker = document.createElement("div");
  document.getElementsByTagName("body")[0].appendChild(marker);
  const sizes = Object.keys(breakpoints);

  for (let i = 0; i < sizes.length; i++) {
    breakpoint = sizes[i];
    marker.classList.add(breakpoints[breakpoint]);
    const style = window.getComputedStyle(marker);
    if (style.display === "none") {
      break;
    }
  }

  marker.remove();
  return breakpoint;
};

let breakpoint;

window.addEventListener("resize", () => {
  const currentBreakpoint = getResponsiveBreakpoint();
  if (currentBreakpoint != breakpoint) {
    breakpoint = currentBreakpoint;
    widgetsContainer.addHorizontalSpacers();
  }
});

const toggleContent = function() {
  if (this.classList.contains("minimized")) {
    this.classList.remove("minimized");
  } else {
    this.classList.add("minimized");
  }
};

const createWidget = function(className, height, innerHTML, minWidth) {
  const widget = document.createElement("div");
  widget.className = "widget " + className;
  widget.setAttribute("data-minimum-width", minWidth);
  widget.setAttribute("data-current-width", minWidth);

  const container = document.createElement("div");
  widget.appendChild(container);

  const widgetControls = document.createElement("div");
  container.appendChild(widgetControls);
  widgetControls.className = "controls";

  const minimizeToggle = document.createElement("span");
  widgetControls.appendChild(minimizeToggle);
  minimizeToggle.innerHTML = "min/max &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  minimizeToggle.className = "minimize-toggle";
  minimizeToggle.setAttribute("data-not-draggable", true);

  const fullWidthOption = document.createElement("span");
  widgetControls.appendChild(fullWidthOption);
  fullWidthOption.innerHTML = "full width &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  fullWidthOption.setAttribute("data-not-draggable", true);
  fullWidthOption.addEventListener("click", function() {
    widget.makeFullWidth();
    widgetsContainer.addHorizontalSpacers();
  });

  const moveToBottom = document.createElement("span");
  widgetControls.appendChild(moveToBottom);
  moveToBottom.innerHTML = "move to bottom &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  moveToBottom.setAttribute("data-not-draggable", true);
  moveToBottom.addEventListener("click", function() {
    widget.moveToBottom();
    widgetsContainer.addHorizontalSpacers();
  });

  const moveToTop = document.createElement("span");
  widgetControls.appendChild(moveToTop);
  moveToTop.innerHTML = "move to top &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  moveToTop.setAttribute("data-not-draggable", true);
  moveToTop.addEventListener("click", function() {
    widget.moveToTop();
    widgetsContainer.addHorizontalSpacers();
  });

  const content = document.createElement("div");
  container.appendChild(content);
  content.className = "content";
  content.innerHTML = innerHTML;
  content.style.height = height;

  minimizeToggle.addEventListener("click", toggleContent.bind(content));

  return widget;
};

const firstContent = "<div style='width:50%;display:inline-block'>1A</div>" +
  "<div style='width:50%;display:inline-block'>1B</div>";

const widgets = [
  createWidget("col-12", "100px", "1", 12),
  createWidget("col-md-6 col-xs-12", "200px", firstContent, 6),
  createWidget("col-md-6 col-xs-12", "200px", "2", 6),
  createWidget("col-md-4 col-xs-12", "50px", "3", 4),
  createWidget("col-md-8 col-xs-12", "50px", "4", 8)
];

const widgetsContainer = document.getElementsByClassName("widgets")[0];

widgets.forEach(x => {
  x.makeDraggable();
  widgetsContainer.appendChild(x);
});

widgetsContainer.addHorizontalSpacers();
widgetsContainer.makeGrid();