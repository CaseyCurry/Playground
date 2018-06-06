"use strict";

const createSpacer = function() {
  const spacer = document.createElement("div");
  spacer.classList.add("spacer");
  spacer.classList.add("col-12");
  return spacer;
};

const clearSpacers = function() {
  const existingSpacers = Array.from(document.getElementsByClassName("spacer"));
  existingSpacers.forEach(x => {
    x.remove();
  });
};

const addSpacers = function() {
  clearSpacers();
  const widgetList = document.getElementsByClassName("widgets")[0];
  const widgets = Array.from(widgetList.children);

  let spacer = createSpacer();
  widgetList.insertBefore(spacer, widgets[0]);

  const maxRowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  let usedWidthOnRow = 0;

  widgets.forEach(function(x) {
    usedWidthOnRow += x.offsetWidth;

    if (usedWidthOnRow >= maxRowWidth) {
      spacer = createSpacer();
      widgetList.insertBefore(spacer, x);

      if (usedWidthOnRow === maxRowWidth) {
        widgetList.insertBefore(x, spacer);
        usedWidthOnRow = 0;
      } else {
        usedWidthOnRow = x.offsetWidth;
      }
    }
  });

  spacer = createSpacer();
  widgetList.insertBefore(spacer, null);

  for (let i = 0; i < widgetList.children.length; i++) {
    widgetList.children[i].style.order = i;
  }
};

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

// const getResponsiveBreakpoint = function() {
//   const breakpoints = {
//     xs: "d-none",
//     sm: "d-sm-none",
//     md: "d-md-none",
//     lg: "d-lg-none",
//     xl: "d-xl-none"
//   };
//   let breakpoint = "";
//
//   const marker = document.createElement("div");
//   document.getElementsByTagName("body")[0].appendChild(marker);
//
//   for (var i = Object.keys(breakpoints)
//       .length - 1; i >= 0; i--) {
//     breakpoint = Object.keys(breakpoints)[i];
//     marker.classList.add(breakpoints[breakpoint]);
//     const style = window.getComputedStyle(marker);
//     if (style.display === "none") {
//       break;
//     }
//   }
//
//   marker.remove();
//   return breakpoint;
// };

let breakpoint;

window.addEventListener("resize", () => {
  const currentBreakpoint = getResponsiveBreakpoint();
  if (currentBreakpoint != breakpoint) {
    breakpoint = currentBreakpoint;
    addSpacers();
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
  x.makeDraggable(conditionsToBeginMoveMet, addSpacers);
  widgetsList.appendChild(x);
});

addSpacers();