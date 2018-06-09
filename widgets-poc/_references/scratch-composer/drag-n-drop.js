"use strict";

// <editor-fold> module variables

const cssClasses = {
  widgets: "widgets",
  widget: "widget",
  placeholder: "placeholder",
  draggable: "draggable",
  noHighlighting: "no-highlighting",
  spacer: "spacer",
  fullWidth: "col-12",
  bootstrapPrefix: "col-"
};

const maximumWidth = 12;

let draggingWidget;

// </editor-fold>

// <editor-fold> widget locators

const getWidgetsContainer = function() {
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
    grid[grid.length - 1].push({
      width: width,
      widget: widget
    });
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

  console.log("grid", grid);
};

// </editor-fold>

// <editor-fold> element width

Element.prototype.removeBootstrapClasses = function() {
  Array.from(this.classList)
    .filter(x => x.indexOf(cssClasses.bootstrapPrefix) === 0)
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
  widgetsContainer.insertBefore(this, null);
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

  const createSpacer = function() {
    const spacer = document.createElement("div");
    spacer.classList.add(cssClasses.spacer);
    spacer.classList.add(cssClasses.fullWidth);
    const isSpacer = true;
    spacer.configureDropPlaceholder(isSpacer);
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

const clearPlaceholders = function() {
  const placeholders = document.getElementsByClassName(cssClasses.placeholder);

  Array.from(placeholders)
    .forEach(x => {
      x.remove();
    });
};

const createPlaceholder = function(template) {
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

Element.prototype.configureDropPlaceholder = function(isSpacer) {
  let timeout = false;

  const startHover = () => {
    if (!draggingWidget) {
      return;
    }
    timeout = setTimeout(() => {
      if (!draggingWidget) {
        return;
      }

      // <editor-fold> resize logic

      const targetMinimumWidth = parseInt(this.dataset.minimumWidth);
      const targetCurrentWidth = parseInt(this.dataset.currentWidth);
      const draggingMinimumWidth = parseInt(draggingWidget.dataset.minimumWidth);
      const draggingCurrentWidth = parseInt(draggingWidget.dataset.currentWidth);
      const targetHasRoom = (targetCurrentWidth + draggingCurrentWidth) <= maximumWidth;
      const targetCouldMakeRoom = (targetMinimumWidth + draggingCurrentWidth) <= maximumWidth;
      const bestWidths = {
        target: targetHasRoom ? targetCurrentWidth : targetMinimumWidth,
        dragging: targetHasRoom ? (maximumWidth - targetCurrentWidth) : (maximumWidth - targetMinimumWidth)
      };

      // console.log("start dump");
      // console.log("targetMinimumWidth", targetMinimumWidth);
      // console.log("targetCurrentWidth", targetCurrentWidth);
      // console.log("draggingMinimumWidth", draggingMinimumWidth);
      // console.log("draggingCurrentWidth", draggingCurrentWidth);
      // console.log("targetHasRoom", targetHasRoom);
      // console.log("targetCouldMakeRoom", targetCouldMakeRoom);
      // console.log("bestWidths", bestWidths);

      // </editor-fold>

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
    }, isSpacer ? 300 : 300);
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

Element.prototype.makeDraggable = function() {

  // <editor-fold> helpers

  const getUserPosition = function(e) {
    return e.changedTouches ? {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY
    } : {
      x: e.pageX,
      y: e.pageY
    };
  };

  const conditionsToBeginMoveMet = function(e) {
    if (e.target.dataset.notDraggable) {
      return false;
    }
    return true;
  }

  // </editor-fold>

  // <editor-fold> move handlers

  const startMove = function(e) {
    draggingWidget = this;

    // We'll reset this.style when we call endMove.
    this.initialPosition = {
      top: this.style.top,
      left: this.style.left
    };

    // Prevent highlighting as the user is dragging.
    document.body.classList.add(cssClasses.noHighlighting);

    // Make widgets not being dragged less prominent.
    const widgetsContainer = getWidgetsContainer();
    Array.from(widgetsContainer.children)
      .filter(x => x != this)
      .forEach(x => x.classList.add("out-of-focus"));

    // Make the dragging widget follow the user's movement.
    const userPosition = getUserPosition(e);
    this.dragStart = {
      x: e.touches ? e.touches[0].pageX - this.offsetLeft : e.pageX - this.offsetLeft,
      y: e.touches ? e.touches[0].pageY - this.offsetTop : e.pageY - this.offsetTop
    };
    this.style.left = (userPosition.x - this.dragStart.x) + "px";
    this.style.top = (userPosition.y - this.dragStart.y) + "px";
    this.classList.add(cssClasses.draggable);

    // Add an initial placeholder in case the user immediately abandons the drag.
    const placeholder = createPlaceholder(this);
    widgetsContainer.insertBefore(placeholder, this);
  }.bind(this);

  const move = function(e) {
    // Make the dragging widget follow the user's movement.
    const userPosition = getUserPosition(e);
    this.style.left = (userPosition.x - this.dragStart.x) + "px";
    this.style.top = (userPosition.y - this.dragStart.y) + "px";
  }.bind(this);

  const endMove = function(e) {
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

    this.style.top = this.initialPosition.top;
    this.style.left = this.initialPosition.left;

    Array.from(getWidgetsContainer()
        .children)
      .forEach(x => {
        x.classList.remove("out-of-focus");
      });

    document.body.classList.remove(cssClasses.noHighlighting);

    draggingWidget = null;

    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", endMove);
    document.removeEventListener("touchmove", move);
    document.removeEventListener("touchend", endMove);

    // </editor-fold>

    widgetsContainer.addHorizontalSpacers();
    widgetsContainer.makeGrid();
  }.bind(this);

  // </editor-fold>

  // <editor-fold> listener registration

  this.addEventListener("mousedown", function(e) {
    if (!conditionsToBeginMoveMet(e)) {
      return;
    }
    startMove(e);
    // Make sure these listeners are removed in endMove.
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", endMove);
  }.bind(this));

  this.addEventListener("touchstart", function(e) {
    if (!conditionsToBeginMoveMet(e)) {
      return;
    }
    startMove(e);
    // Make sure these listeners are removed in endMove.
    document.addEventListener("touchmove", move);
    document.addEventListener("touchend", endMove);
  }.bind(this));

  // </editor-fold>

  this.configureDropPlaceholder();
};