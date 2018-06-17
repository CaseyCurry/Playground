"use strict";

// <editor-fold> module variables

const cssClasses = {
  widgets: "widgets",
  widget: "widget",
  outOfFocusClass: "out-of-focus",
  placeholder: "placeholder",
  draggable: "draggable",
  resizable: "resizable",
  resizer: "resizer",
  resizeGuideline: "resize-guideline",
  noHighlighting: "no-highlighting",
  spacer: "spacer",
  fullWidth: "col-12",
  xsClass: "col-xs-12",
  mdClassPrefix: "col-md-",
  bootstrapClassPrefix: "col-",
  hideOnMobileClass: ["d-none", "d-md-block"],
  columnMarker: ["col-1", "column-marker"]
};

const maximumWidth = 12;

let draggingWidget;

let resizingWidget;

// This is used to re-draw the horizontal spacers when bootstrap media query breakpoints are reached.
let currentMediaQuerySize;

// </editor-fold>

// <editor-fold> user position

const getUserPosition = (e) => {
  return e.changedTouches ? {
    x: e.changedTouches[0].pageX,
    y: e.changedTouches[0].pageY
  } : {
    x: e.pageX,
    y: e.pageY
  };
};

// </editor-fold>

// <editor-fold> widget locators

const getWidgetsContainer = () => {
  return document.getElementsByClassName(cssClasses.widgets)[0];
}

// </editor-fold>

// <editor-fold> grid

Element.prototype.makeGrid = function() {
  const grid = [];
  grid.push([]);
  let currentRowWidth = 0;
  const widgets = Array.from(this.children)
    .filter(x => x.classList.contains(cssClasses.widget) && !x.classList.contains(cssClasses.draggable));

  for (let i = 0; i < widgets.length; i++) {
    const widget = widgets[i];
    const width = parseInt(widget.dataset.currentWidth);
    grid[grid.length - 1].push(widget);
    currentRowWidth += width;
    const isLastWidget = i === widgets.length - 1;
    if (isLastWidget) {
      break;
    }
    if (currentRowWidth === maximumWidth) {
      grid.push([]);
      currentRowWidth = 0;
    } else {
      // Preview the next widget and see if a new row is needed due to lack of space.
      const nextWidget = widgets[i + 1];
      const spaceLeftOnCurrentRow = maximumWidth - currentRowWidth;
      if (nextWidget.dataset.currentWidth > spaceLeftOnCurrentRow) {
        grid.push([]);
        currentRowWidth = 0;
      }
    }
  }

  return grid;
};

// </editor-fold>

// <editor-fold> responsive calculations

const getResponsiveInformation = () => {
  const breakpoints = {
    xl: "d-xl-none",
    lg: "d-lg-none",
    md: "d-md-none",
    sm: "d-sm-none",
    xs: "d-none"
  };
  let breakpointKey = "";

  const marker = document.createElement("div");
  marker.classList.add(...cssClasses.columnMarker);
  document.getElementsByTagName("body")[0].appendChild(marker);
  const singleColumnWidth = marker.getBoundingClientRect()
    .width;
  const breakpointKeys = Object.keys(breakpoints);

  for (let i = 0; i < breakpointKeys.length; i++) {
    breakpointKey = breakpointKeys[i];
    marker.classList.add(breakpoints[breakpointKey]);
    const style = window.getComputedStyle(marker);
    if (style.display === "none") {
      break;
    }
  }

  marker.remove();
  return {
    currentSize: breakpointKey,
    singleColumnWidth: singleColumnWidth
  };
};

window.addEventListener("resize", () => {
  const responsiveInformation = getResponsiveInformation();
  if (currentMediaQuerySize != responsiveInformation.currentSize) {
    currentMediaQuerySize = responsiveInformation.currentSize;
    widgetsContainer.addHorizontalSpacers();
  }
});

// </editor-fold>

// <editor-fold> element width

Element.prototype.removeBootstrapClasses = function() {
  Array.from(this.classList)
    .filter(x => x.indexOf(cssClasses.bootstrapClassPrefix) === 0)
    .forEach(x => this.classList.remove(x));
};

Element.prototype.resetWidth = function(newWidth) {
  this.removeBootstrapClasses();
  this.classList.add("col-xs-12");
  this.classList.add("col-md-" + newWidth);
  this.setAttribute("data-current-width", newWidth);
};

Element.prototype.makeFullWidth = function() {
  this.removeBootstrapClasses();
  this.classList.add(cssClasses.fullWidth);
  this.setAttribute("data-current-width", maximumWidth);
};

// </editor-fold>

// <editor-fold> location modifiers

Element.prototype.moveToBottom = function() {
  const widgetsContainer = getWidgetsContainer();

  if (widgetsContainer.children.length > 1) {
    widgetsContainer.insertBefore(this, null);
  }
};

Element.prototype.moveToTop = function() {
  const widgetsContainer = getWidgetsContainer();

  if (widgetsContainer.children.length > 1) {
    widgetsContainer.insertBefore(this, widgetsContainer.children[0]);
  }
};

// </editor-fold>

// <editor-fold> spacers

Element.prototype.addHorizontalSpacers = function() {

  // <editor-fold> helpers

  const createSpacer = () => {
    const spacer = document.createElement("div");
    spacer.classList.add(cssClasses.spacer);
    spacer.classList.add(cssClasses.fullWidth);
    spacer.configureDropPlaceholder();
    return spacer;
  };

  const clearSpacers = () => {
    Array.from(this.children)
      .filter(x => x.classList.contains(cssClasses.spacer))
      .forEach(x => x.remove());
  };

  const resetOrderOfChildren = () => {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].style.order = i;
    }
  };

  const insertSpacerAtTop = () => {
    const spacer = createSpacer();
    this.insertBefore(spacer, this.children[0]);
  };

  const insertSpacersWhenWidgetsMeetOrExceedMaxWidth = (widgets) => {
    const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let usedWidthOnRow = 0;

    widgets.forEach((widget) => {
      // getBoundingClientRect returns floats while widget.offsetWidth does not.
      // Floats are necessary for the math to work.
      const widgetWidth = widget.getBoundingClientRect()
        .width;
      usedWidthOnRow += widgetWidth;

      if (usedWidthOnRow >= windowWidth) {
        const spacer = createSpacer();
        this.insertBefore(spacer, widget);

        if (usedWidthOnRow === windowWidth) {
          this.insertBefore(widget, spacer);
          usedWidthOnRow = 0;
        } else {
          usedWidthOnRow = widgetWidth;
        }
      }
    });
  }

  const insertSpacerAtBottom = () => {
    const lastChild = this.children[this.children.length - 1];
    if (!lastChild.classList.contains(cssClasses.spacer)) {
      const spacer = createSpacer();
      this.insertBefore(spacer, null);
    }
  };

  // </editor-fold>

  clearSpacers();

  const widgets = Array.from(this.children)
    .filter(x => !x.classList.contains(cssClasses.draggable));

  if (widgets) {
    insertSpacerAtTop();
    insertSpacersWhenWidgetsMeetOrExceedMaxWidth(widgets);
    insertSpacerAtBottom();
    resetOrderOfChildren();
  }
};

// </editor-fold>

// <editor-fold> placeholders

const clearPlaceholders = () => {
  const placeholders = document.getElementsByClassName(cssClasses.placeholder);

  Array.from(placeholders)
    .forEach(x => {
      x.remove();
    });
};

const createPlaceholder = (template) => {
  const placeholder = template.cloneNode(false);
  placeholder.removeAttribute("style");
  placeholder.style.order = template.style.order;
  placeholder.classList.add(cssClasses.placeholder);
  placeholder.classList.remove(cssClasses.draggable);
  placeholder.style.height = template.offsetHeight + "px";
  const content = document.createElement("div");
  placeholder.appendChild(content);
  return placeholder;
};

Element.prototype.configureDropPlaceholder = function() {
  let timeout = false;

  const startHover = () => {
    if (!draggingWidget) {
      return;
    }
    timeout = setTimeout(() => {
      if (!draggingWidget) {
        return;
      }

      clearPlaceholders();
      const placeholder = createPlaceholder(draggingWidget);

      const targetIsSpacer = this.classList.contains(cssClasses.spacer);
      if (targetIsSpacer) {
        placeholder.makeFullWidth();
      }

      const widgetsContainer = getWidgetsContainer();
      widgetsContainer.insertBefore(placeholder, this);

      if (parseInt(draggingWidget.style.order) < parseInt(this.style.order)) {
        widgetsContainer.insertBefore(this, placeholder);
      }

      widgetsContainer.addHorizontalSpacers();
    }, 300);
  };

  const leaveHover = () => {
    if (timeout) {
      window.clearTimeout(timeout);
    }
  };

  this.addEventListener("mouseenter", startHover);
  this.addEventListener("touchenter", startHover);

  this.addEventListener("mouseleave", leaveHover);
  this.addEventListener("touchleave", leaveHover);
};

// </editor-fold>

// <editor-fold> widget creation and modification

// <editor-fold> helpers

const preventHighlightingWhileDragging = () => {
  document.body.classList.add(cssClasses.noHighlighting);
};

const allowHighlighting = () => {
  document.body.classList.remove(cssClasses.noHighlighting);
};

const makeOtherWidgetsLessProminent = (ignore) => {
  const widgetsContainer = getWidgetsContainer();
  Array.from(widgetsContainer.children)
    .filter(x => x != ignore)
    .forEach(x => x.classList.add(cssClasses.outOfFocusClass));
};

const makeWidgetsProminent = () => {
  const widgetsContainer = getWidgetsContainer();
  Array.from(widgetsContainer.children)
    .forEach(x => {
      x.classList.remove(cssClasses.outOfFocusClass);
    });
}

// </editor-fold>

Element.prototype.addWidget = function(initialWidth, minimumWidth, contentInnerHTML) {
  const widget = document.createElement("div");
  this.appendChild(widget);
  widget.className = "widget " + cssClasses.mdClassPrefix + initialWidth + " " + cssClasses.xsClass;
  widget.setAttribute("data-minimum-width", minimumWidth);
  widget.setAttribute("data-current-width", initialWidth);

  const container = document.createElement("div");
  widget.appendChild(container);

  const content = document.createElement("div");
  container.appendChild(content);
  content.className = "content";
  content.innerHTML = contentInnerHTML;

  return widget;
};

Element.prototype.addControlsPanel = function() {
  const widgetControls = document.createElement("div");
  const container = this.children[0].children[0];
  this.children[0].insertBefore(widgetControls, container);
  widgetControls.className = "controls";

  const minimizeToggle = document.createElement("span");
  widgetControls.appendChild(minimizeToggle);
  minimizeToggle.innerHTML = "min/max &nbsp;&nbsp;";
  minimizeToggle.className = "minimize-toggle";
  minimizeToggle.setAttribute("data-not-draggable", true);
  minimizeToggle.addEventListener("click", () => {
    if (container.classList.contains("minimized")) {
      container.classList.remove("minimized");
    } else {
      container.classList.add("minimized");
    }
  });

  const fullWidthOption = document.createElement("span");
  widgetControls.appendChild(fullWidthOption);
  fullWidthOption.innerHTML = "full width &nbsp;&nbsp;";
  fullWidthOption.setAttribute("data-not-draggable", true);
  fullWidthOption.addEventListener("click", () => {
    this.makeFullWidth();
    const widgetsContainer = getWidgetsContainer();
    widgetsContainer.addHorizontalSpacers();
  });

  const moveToBottom = document.createElement("span");
  widgetControls.appendChild(moveToBottom);
  moveToBottom.innerHTML = "move to bottom &nbsp;&nbsp;";
  moveToBottom.setAttribute("data-not-draggable", true);
  moveToBottom.addEventListener("click", () => {
    this.moveToBottom();
    const widgetsContainer = getWidgetsContainer();
    widgetsContainer.addHorizontalSpacers();
  });

  const moveToTop = document.createElement("span");
  widgetControls.appendChild(moveToTop);
  moveToTop.innerHTML = "move to top &nbsp;&nbsp;";
  moveToTop.setAttribute("data-not-draggable", true);
  moveToTop.addEventListener("click", () => {
    this.moveToTop();
    const widgetsContainer = getWidgetsContainer();
    widgetsContainer.addHorizontalSpacers();
  });
};

Element.prototype.makeDraggable = function() {

  // <editor-fold> move handlers

  const startMove = (e) => {
    draggingWidget = this;

    // We'll reset this.style when we call endMove.
    this.initialWidgetStylePosition = {
      top: this.style.top,
      left: this.style.left
    };

    preventHighlightingWhileDragging();
    makeOtherWidgetsLessProminent(this);

    // Make the dragging widget follow the user's movement.
    const userPosition = getUserPosition(e);
    this.dragStartPosition = {
      x: e.touches ? e.touches[0].pageX - this.offsetLeft : e.pageX - this.offsetLeft,
      y: e.touches ? e.touches[0].pageY - this.offsetTop : e.pageY - this.offsetTop
    };
    this.style.left = (userPosition.x - this.dragStartPosition.x) + "px";
    this.style.top = (userPosition.y - this.dragStartPosition.y) + "px";
    this.classList.add(cssClasses.draggable);

    // Add an initial placeholder in case the user immediately abandons the drag.
    const placeholder = createPlaceholder(this);
    widgetsContainer.insertBefore(placeholder, this);
  };

  const move = (e) => {
    // Make the widget follow the user's movement.
    const userPosition = getUserPosition(e);
    this.style.left = (userPosition.x - this.dragStartPosition.x) + "px";
    this.style.top = (userPosition.y - this.dragStartPosition.y) + "px";
  };

  const endMove = (e) => {
    const widgetsContainer = getWidgetsContainer();

    // Find and replace the placeholder with the widget.
    const placeholders = document.getElementsByClassName(cssClasses.placeholder);
    if (placeholders.length) {
      const placeholder = placeholders[0];
      widgetsContainer.insertBefore(this, placeholder);
      if (placeholder.dataset.currentWidth !== this.dataset.currentWidth) {
        this.resetWidth(placeholder.dataset.currentWidth);
      }
    }

    // <editor-fold> cleanup

    clearPlaceholders();

    this.classList.remove(cssClasses.draggable);

    this.style.top = this.initialWidgetStylePosition.top;
    this.style.left = this.initialWidgetStylePosition.left;

    makeWidgetsProminent();
    allowHighlighting();

    draggingWidget = null;

    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", endMove);
    document.removeEventListener("touchmove", move);
    document.removeEventListener("touchend", endMove);

    // </editor-fold>

    widgetsContainer.addHorizontalSpacers();
  };

  // </editor-fold>

  // <editor-fold> listener registration

  const conditionsToBeginMoveMet = (e) => {
    if (e.target.dataset.notDraggable) {
      return false;
    }
    return true;
  }

  // Add the listener to the container div in the widget. This gives the dragger bar
  // room to handle events without competing with the widget.
  this.children[0].addEventListener("mousedown", (e) => {
    if (!conditionsToBeginMoveMet(e)) {
      return;
    }
    startMove(e);
    // Make sure these listeners are removed in endMove.
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", endMove);
  });

  this.children[0].addEventListener("touchstart", (e) => {
    if (!conditionsToBeginMoveMet(e)) {
      return;
    }
    startMove(e);
    // Make sure these listeners are removed in endMove.
    document.addEventListener("touchmove", move);
    document.addEventListener("touchend", endMove);
  });

  // </editor-fold>

  this.configureDropPlaceholder();
};

Element.prototype.makeResizable = function() {

  // <editor-fold> helpers

  const findGridRow = () => {
    const grid = widgetsContainer.makeGrid();
    for (let i = 0; i < grid.length; i++) {
      const widgetIndex = grid[i].indexOf(this);
      if (widgetIndex >= 0) {
        return grid[i];
      }
    }
  };

  const calculateBoundaries = () => {
    // don't go left far enough to exceed the minimum of the widget
    // don't go right far enough to exceed the width of the row
    const row = findGridRow();
    const totalRowWidth = row
      .map(x => parseInt(x.dataset.currentWidth))
      .reduce((x, y) => x + y);
    const currentPosition = row
      .slice(0, row.indexOf(this) + 1)
      .map(x => parseInt(x.dataset.currentWidth))
      .reduce((x, y) => x + y);
    const minimumWidth = parseInt(this.dataset.minimumWidth);
    const spaceToMinimize = parseInt(this.dataset.currentWidth) - minimumWidth;
    const left = currentPosition - spaceToMinimize;
    // const right = maximumWidth - totalRowWidth + currentPosition;
    const right = maximumWidth;
    const offset = minimumWidth - left;
    return { left, right, offset };
  };

  const calculateResizeGuidelines = () => {
    const widgetsContainer = getWidgetsContainer();
    const boundaries = calculateBoundaries();
    const guidelines = [];

    for (let i = boundaries.left; i <= boundaries.right; i++) {
      const placeholder = this.cloneNode(false);
      placeholder.resetWidth(i);
      placeholder.style.visibility = "hidden";
      placeholder.style.order = widgetsContainer.children.length;
      const content = document.createElement("div");
      placeholder.appendChild(content);
      widgetsContainer.appendChild(placeholder);
      const right = content.getBoundingClientRect()
        .right;
      guidelines.push({
        position: right,
        targetWidth: i + boundaries.offset
      });
      placeholder.remove();
    }

    return guidelines;
  };

  const createGuideline = (top, height, guidelineInformation) => {
    const startHover = () => {
      if (!resizingWidget) {
        return;
      }
      if (guidelineInformation.targetWidth != this.dataset.currentWidth) {
        this.resetWidth(guidelineInformation.targetWidth);
      }
      const widgetsContainer = getWidgetsContainer();
      widgetsContainer.addHorizontalSpacers();
    };

    const guideline = document.createElement("div");
    guideline.classList.add(cssClasses.resizeGuideline);
    guideline.style.top = (top + window.scrollY) + "px";
    guideline.style.height = height + "px";
    guideline.style.left = (guidelineInformation.position + window.scrollX) + "px";

    guideline.addEventListener("mouseenter", startHover);
    guideline.addEventListener("touchenter", startHover);

    return guideline;
  };

  // </editor-fold>

  // <editor-fold> add dragger

  const dragger = document.createElement("div");
  dragger.classList.add(cssClasses.resizer);
  dragger.classList.add(...cssClasses.hideOnMobileClass);
  this.appendChild(dragger);
  this.classList.add(cssClasses.resizable);

  // </editor-fold>

  // <editor-fold> move handlers

  const startMove = () => {
    resizingWidget = this;

    preventHighlightingWhileDragging();
    makeOtherWidgetsLessProminent(this);

    const addGuidelines = () => {
      const widgetsContainer = getWidgetsContainer();
      const widgetRect = this.getBoundingClientRect();
      const guidelines = calculateResizeGuidelines();
      guidelines.forEach(guidelineInformation => {
        const guideline = createGuideline(widgetRect.top, widgetRect.height, guidelineInformation);
        widgetsContainer.appendChild(guideline);
      });
    };

    addGuidelines();
  };

  const endMove = (e) => {

    // <editor-fold> cleanup

    Array.from(document.getElementsByClassName(cssClasses.resizeGuideline))
      .forEach(x => x.remove());
    makeWidgetsProminent();
    allowHighlighting();

    resizingWidget = null;

    document.removeEventListener("mouseup", endMove);
    document.removeEventListener("touchend", endMove);

    // </editor-fold>

    const widgetsContainer = getWidgetsContainer();
    widgetsContainer.addHorizontalSpacers();
  };

  // </editor-fold>;

  // <editor-fold> listener registration

  dragger.addEventListener("mousedown", (e) => {
    startMove();
    // Make sure these listeners are removed in endMove.
    document.addEventListener("mouseup", endMove);
  });

  dragger.addEventListener("touchstart", (e) => {
    startMove();
    // Make sure these listeners are removed in endMove.
    document.addEventListener("touchend", endMove);
  });

  // </editor-fold>
};

// </editor-fold>