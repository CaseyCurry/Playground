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
    widgetsList.addSpacers();
  }
});

const toggleContent = function() {
  if (this.classList.contains("minimized")) {
    this.classList.remove("minimized");
  } else {
    this.classList.add("minimized");
  }
};

const createWidget = function(className, height, innerHTML) {
  const widget = document.createElement("div");
  widget.className = "widget " + className;

  const container = document.createElement("div");
  widget.appendChild(container);

  const widgetControls = document.createElement("div");
  widgetControls.className = "controls";
  const minimizeToggle = document.createElement("span");
  minimizeToggle.innerHTML = "x";
  minimizeToggle.className = "minimize-toggle";
  widgetControls.appendChild(minimizeToggle);
  container.appendChild(widgetControls);

  const content = document.createElement("div");
  content.className = "content";
  content.innerHTML = innerHTML;
  content.style.height = height;
  container.appendChild(content);

  minimizeToggle.addEventListener("click", toggleContent.bind(content));

  return widget;
};

const firstContent = "<div style='width:50%;display:inline-block'>1A</div>" +
  "<div style='width:50%;display:inline-block'>1B</div>";
const first = createWidget("col-md-6 col-xs-12", "100px", firstContent);
const second = createWidget("col-md-6 col-xs-12", "200px", "2");
const third = createWidget("col-md-4 col-xs-12", "50px", "3");
const fourth = createWidget("col-md-8 col-xs-12", "50px", "4");

const widgets = [
  first,
  second,
  third,
  fourth
];

const widgetsList = document.getElementsByClassName("widgets")[0];
const conditionsToBeginMoveMet = function(e) {
  if (e.target.classList.contains("minimize-toggle")) {
    return false;
  }
  return true;
};

widgets.forEach(x => {
  x.makeDraggable(conditionsToBeginMoveMet);
  widgetsList.appendChild(x);
});

widgetsList.addSpacers();