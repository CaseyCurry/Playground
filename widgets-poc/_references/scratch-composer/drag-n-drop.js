"use strict";

// <editor-fold> module variables

const cssClasses = {
  widgets: "widgets",
  widget: "widget",
  placeholder: "placeholder",
  draggable: "draggable",
  noHighlighting: "no-highlighting",
  spacer: "spacer",
  spacerSizeOptions: "size-options",
  fullWidth: "col-12",
  bootstrapPrefix: "col-"
};

const maximumWidth = 12;

let draggingWidget;

let alreadyHoveringOverPlaceholder = false;

// </editor-fold>

// <editor-fold> widget locators

const getWidgetsContainer = function() {
  return document.getElementsByClassName(cssClasses.widgets)[0];
}

Element.prototype.getClosestWidgetUsingBounds = function(userPosition, draggingWidget) {
  let widgetToMove;
  const widgets = Array
    .from(this.children)
    .filter(function(x) {
      return x.classList.contains(cssClasses.widget) &&
        !x.classList.contains(cssClasses.placeholder) &&
        x !== draggingWidget;
    });
  for (let i = 0; i < widgets.length; i++) {
    const bounds = widgets[i].getBoundingClientRect();

    // Is the widgets[i] immediately after the user's position? If so, this is
    // the one we're looking for.
    if (userPosition.x < bounds.left &&
      bounds.top <= userPosition.y &&
      bounds.bottom >= userPosition.y ||
      userPosition.y < bounds.top &&
      bounds.left <= userPosition.x &&
      bounds.right >= userPosition.x) {
      widgetToMove = widgets[i];
      break;
    }
  }
  return widgetToMove;
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

  const leaveHover = (event) => {
    const e = event.toElement || event.relatedTarget;
    if (e) {
      if (e.parentNode == this || e == this) {
        return;
      }
    }
    placeholder.remove();
    const widgetsContainer = getWidgetsContainer();
    widgetsContainer.addHorizontalSpacers();
    alreadyHoveringOverPlaceholder = false;
  };
  const endHover = () => {
    alreadyHoveringOverPlaceholder = false;
  };
  placeholder.addEventListener("mouseleave", leaveHover);
  placeholder.addEventListener("touchleave", leaveHover);
  placeholder.addEventListener("mouseup", endHover);
  placeholder.addEventListener("touchend", endHover);

  return placeholder;
};

Element.prototype.configureDropPlaceholder = function() {
  let timeout = false;

  const startHover = () => {
    if (alreadyHoveringOverPlaceholder || !draggingWidget) {
      return;
    }
    timeout = setTimeout(() => {
      if (!draggingWidget) {
        console.log("draggingWidget is falsey");
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

      const targetIsSpacer = this.classList.contains(cssClasses.spacer);

      if (targetIsSpacer) {
        alreadyHoveringOverPlaceholder = true;

        clearPlaceholders();
        const placeholder = document.createElement("div");
        placeholder.classList.add(cssClasses.spacerSizeOptions);

        const leaveHover = () => {
          placeholder.remove();
          alreadyHoveringOverPlaceholder = false;
        };
        const endHover = () => {
          alreadyHoveringOverPlaceholder = false;
        };
        placeholder.addEventListener("mouseleave", leaveHover);
        placeholder.addEventListener("touchleave", leaveHover);
        placeholder.addEventListener("mouseup", endHover);
        placeholder.addEventListener("touchend", endHover);

        this.appendChild(placeholder);
      } else if (targetHasRoom || targetCouldMakeRoom) {
        alreadyHoveringOverPlaceholder = true;

        this.setAttribute("data-restore-width", this.dataset.currentWidth);

        clearPlaceholders();
        const placeholder = createPlaceholder(draggingWidget);
        const widgetsContainer = getWidgetsContainer();
        widgetsContainer.insertBefore(placeholder, this);

        widgetsContainer.addHorizontalSpacers();
      }
    }, 200);
  };

  const endMove = () => {
    if (timeout) {
      window.clearTimeout(timeout);
    }
  };

  this.addEventListener("mouseenter", startHover);
  this.addEventListener("touchenter", startHover);

  this.addEventListener("mouseup", endMove);
  this.addEventListener("touchend", endMove);
};

// </editor-fold>

// <editor-fold> not used for now

// Array.prototype.makeGrid = function() {
//   const grid = [];
//   grid.push([]);
//   let currentRowWidth = 0;
//
//   this.forEach(x => {
//     const width = parseInt(x.dataset.currentWidth);
//     grid[grid.length - 1].push({
//       width: width,
//       widget: x
//     });
//     currentRowWidth += width;
//     if (currentRowWidth === maximumWidth) {
//       grid.push([]);
//     }
//   });
// };

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

// <editor-fold> spacers

Element.prototype.addHorizontalSpacers = function() {

  // <editor-fold> helpers

  const createSpacer = function() {
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
      // if (!this.children[i].classList.contains(cssClasses.draggable)) {
      this.children[i].style.order = i;
      // }
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

  const getSpacer = function(droppedOnElement) {
    if (!droppedOnElement) {
      return;
    }
    const spacer = droppedOnElement.classList.contains(cssClasses.spacer) ?
      droppedOnElement :
      droppedOnElement.closest("." + cssClasses.spacer);
    return spacer;
  };

  const getWidgetToMove = function(droppedOnElement) {
    if (!droppedOnElement) {
      return;
    }
    const widget = droppedOnElement.classList.contains(cssClasses.widget) ?
      droppedOnElement :
      droppedOnElement.closest("." + cssClasses.widget);
    return widget;
  };

  // </editor-fold>

  // <editor-fold> move handlers

  const startMove = function(e) {
    draggingWidget = this;

    this.initialPosition = {
      top: this.style.top,
      left: this.style.left
    };

    document.body.classList.add(cssClasses.noHighlighting);

    const placeholder = createPlaceholder(this);

    const widgetsContainer = getWidgetsContainer();
    Array.from(widgetsContainer.children)
      .filter(x => x != this)
      .forEach(x => x.classList.add("out-of-focus"));

    const userPosition = getUserPosition(e);
    this.dragStart = {
      x: e.touches ? e.touches[0].pageX - this.offsetLeft : e.pageX - this.offsetLeft,
      y: e.touches ? e.touches[0].pageY - this.offsetTop : e.pageY - this.offsetTop
    };
    this.style.left = (userPosition.x - this.dragStart.x) + "px";
    this.style.top = (userPosition.y - this.dragStart.y) + "px";

    this.classList.add(cssClasses.draggable);

    widgetsContainer.insertBefore(placeholder, this);
  }.bind(this);

  const move = function(e) {
    const userPosition = getUserPosition(e);
    this.style.left = (userPosition.x - this.dragStart.x) + "px";
    this.style.top = (userPosition.y - this.dragStart.y) + "px";
  }.bind(this);

  const endMove = function(e) {
    const userPosition = getUserPosition(e);
    const droppedOnElement = document.elementFromPoint(userPosition.x, userPosition.y);
    const droppedOnSpacer = getSpacer(droppedOnElement);
    const widgetsContainer = getWidgetsContainer();

    if (droppedOnSpacer) {
      widgetsContainer.insertBefore(this, droppedOnSpacer);
      this.makeFullWidth();
    } else {
      let widgetToMove = getWidgetToMove(droppedOnElement);

      if (!widgetToMove) {
        widgetToMove = widgetsContainer.getClosestWidgetUsingBounds(userPosition, this);
      }

      // If we found a widgetToMove, insert the dragging widget before it.
      if (widgetToMove) {
        widgetsContainer.insertBefore(this, widgetToMove);
      } else {
        // Otherwise, just move the dragging widget to the end of the container.
        const lastWidget = widgetsContainer.children[widgetsContainer.children.length - 1];
        widgetsContainer.insertBefore(this, lastWidget);
        widgetsContainer.insertBefore(lastWidget, this);
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
  }.bind(this);

  // </editor-fold>

  // <editor-fold> listener registration

  this.addEventListener("mousedown", function(e) {
    if (!conditionsToBeginMoveMet(e)) {
      return;
    }
    startMove(e);
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", endMove);
  }.bind(this));

  this.addEventListener("touchstart", function(e) {
    if (!conditionsToBeginMoveMet(e)) {
      return;
    }
    startMove(e);
    document.addEventListener("touchmove", move);
    document.addEventListener("touchend", endMove);
  }.bind(this));

  // </editor-fold>

  this.configureDropPlaceholder();
};