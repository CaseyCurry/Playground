"use strict";

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

// <editor-fold> Element Width
Element.prototype.removeBootstrapClasses = function() {
  Array
    .from(this.classList)
    .forEach(x => {
      if (x.indexOf(cssClasses.bootstrapPrefix) === 0) {
        this.classList.remove(x);
      }
    });
};

Element.prototype.resetWidth = function(width) {
  this.removeBootstrapClasses();
  this.classList.add("col-xs-12");
  this.classList.add("col-md-" + width);
  this.setAttribute("data-current-width", width);
};

Element.prototype.makeFullWidth = function() {
  this.removeBootstrapClasses();
  this.classList.add(cssClasses.fullWidth);
  this.setAttribute("data-current-width", 12);
};

// </editor-fold>

Element.prototype.displayDropOptions = function(mouseOverCallback) {
  let timeout = false;
  let placeholder = false;

  this.addEventListener("mouseover", function(e) {
    if (placeholder || !draggingWidget) {
      return;
    }
    timeout = setTimeout(function() {
      placeholder = document.createElement("div");
      if (mouseOverCallback) {
        mouseOverCallback(placeholder);
      }
      this.appendChild(placeholder);
    }.bind(this), 250);
  }.bind(this));

  this.addEventListener("mouseout", function(event) {
    // Skip if mouse is moved to a child of its parent.
    const e = event.toElement || event.relatedTarget;
    if (e) {
      if (e.parentNode == this || e == this) {
        return;
      }
    }
    if (timeout) {
      window.clearTimeout(timeout);
    }
    if (placeholder) {
      placeholder.remove();
      placeholder = null;
    }
  }.bind(this));
};

Element.prototype.addSpacers = function() {
  const createSpacer = function() {
    const spacer = document.createElement("div");
    spacer.classList.add(cssClasses.spacer);
    spacer.classList.add(cssClasses.fullWidth);
    spacer.setAttribute("data-minimum-width", maximumWidth);
    spacer.setAttribute("data-current-width", maximumWidth);

    const mouseOverCallback = function(sizeOptions) {
      sizeOptions.classList.add(cssClasses.spacerSizeOptions);
    };
    spacer.displayDropOptions(mouseOverCallback);

    return spacer;
  };

  const clearSpacers = function() {
    const existingSpacers = Array
      .from(this.children)
      .filter(x => x.classList.contains(cssClasses.spacer));
    existingSpacers.forEach(x => {
      x.remove();
    });
  }.bind(this);

  clearSpacers();
  const widgets = Array.from(this.children);

  let spacer = createSpacer();
  this.insertBefore(spacer, widgets[0]);

  const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  let usedWidthOnRow = 0;

  widgets.forEach(function(x) {
    // Use getBoundingClientRect instead of x.offsetWidth to handle floats properly.
    const widgetWidth = x
      .getBoundingClientRect()
      .width;
    usedWidthOnRow += widgetWidth;

    if (usedWidthOnRow >= windowWidth) {
      spacer = createSpacer();
      this.insertBefore(spacer, x);

      if (usedWidthOnRow === windowWidth) {
        this.insertBefore(x, spacer);
        usedWidthOnRow = 0;
      } else {
        usedWidthOnRow = widgetWidth;
      }
    }
  }.bind(this));

  const lastChild = this.children[this.children - 1];

  if (lastChild && !lastChild.classList.contains(cssClasses.spacer)) {
    spacer = createSpacer();
    this.insertBefore(spacer, null);
  }

  for (let i = 0; i < this.children.length; i++) {
    this.children[i].style.order = i;
  }
};

Element.prototype.makeDraggable = function() {
  const getUserPosition = function(e) {
    return e.changedTouches ? {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY
    } : {
      x: e.clientX,
      y: e.clientY
    };
  };

  // <editor-fold> Widget Selection
  const getWidgetList = function() {
    return document.getElementsByClassName(cssClasses.widgets)[0];
  }

  const getWidget = function(element) {
    if (!element) {
      return;
    }
    const widget = element.classList.contains(cssClasses.widget) ?
      element :
      element.closest("." + cssClasses.widget);
    return widget;
  };

  // </editor-fold>

  const getSpacer = function(element) {
    if (!element) {
      return;
    }
    const spacer = element.classList.contains(cssClasses.spacer) ?
      element :
      element.closest("." + cssClasses.spacer);
    return spacer;
  };

  const isWidgetMovedUp = function(widgetToMove, draggingWidget) {
    if (!widgetToMove) {
      return null;
    }

    let draggingWidgetOrder;
    let currentResidentOrder;

    if (!widgetToMove.style.order || !draggingWidget.style.order) {
      const widgets = getWidgetList()
        .children;
      draggingWidgetOrder = [].indexOf.call(widgets, draggingWidget);
      currentResidentOrder = [].indexOf.call(widgets, widgetToMove);
    } else {
      draggingWidgetOrder = draggingWidget.style.order;
      currentResidentOrder = widgetToMove.style.order;
    }

    return currentResidentOrder < draggingWidgetOrder;
  };

  const startMove = function(e) {
    draggingWidget = this;
    this.initialPosition = {
      top: this.style.top,
      left: this.style.left
    };
    document.body.classList.add(cssClasses.noHighlighting);
    const placeholder = this.cloneNode(false);
    placeholder.classList.add(cssClasses.placeholder);
    placeholder.style.height = this.offsetHeight + "px";
    const widgetList = getWidgetList();
    Array.from(getWidgetList()
        .children)
      .forEach(x => {
        if (x != this) {
          x.classList.add("out-of-focus");
        }
      });
    this.dragStart = {
      x: e.touches ? e.touches[0].pageX - this.offsetLeft : e.pageX - this.offsetLeft,
      y: e.touches ? e.touches[0].pageY - this.offsetTop : e.pageY - this.offsetTop
    };
    const position = getUserPosition(e);
    this.style.left = (position.x - this.dragStart.x) + "px";
    this.style.top = (position.y - this.dragStart.y) + "px";
    widgetList.insertBefore(placeholder, this);
    this.classList.add(cssClasses.draggable);
  }.bind(this);

  const move = function(e) {
    const position = getUserPosition(e);
    this.style.left = (position.x - this.dragStart.x) + "px";
    this.style.top = (position.y - this.dragStart.y) + "px";
  }.bind(this);

  const endMove = function(e) {
    const widgetList = getWidgetList();
    const position = getUserPosition(e);
    const currentResident = document.elementFromPoint(position.x, position.y);
    const spacer = getSpacer(currentResident);

    if (spacer) {
      widgetList.insertBefore(this, spacer);
      this.makeFullWidth();
    } else {
      let widgetToMove = getWidget(currentResident);

      if (!widgetToMove) {
        let widgets = Array.from(document.getElementsByClassName(cssClasses.widget));
        widgets = widgets.filter(function(x) {
          return !x.classList.contains(cssClasses.draggingWidgetPlaceholder);
        });
        for (let i = 0; i < widgets.length; i++) {
          const bounds = widgets[i].getBoundingClientRect();
          if (bounds.y > position.y) {
            widgetToMove = widgets[i];
            break;
          }
        }
        if (!widgetToMove) {
          widgetToMove = widgets[widgets.length - 1];
        }
      }

      if (widgetToMove) {
        if (isWidgetMovedUp(widgetToMove, this)) {
          widgetList.insertBefore(this, widgetToMove);
        } else {
          widgetList.insertBefore(this, widgetToMove);
          widgetList.insertBefore(widgetToMove, this);
        }
      }
    }

    const placeholders = document.getElementsByClassName(cssClasses.placeholder);

    if (placeholders && placeholders.length) {
      widgetList.removeChild(placeholders[0]);
    }

    widgetList.addSpacers();

    this.classList.remove(cssClasses.draggable);
    this.style.top = this.initialPosition.top;
    this.style.left = this.initialPosition.left;

    document.body.classList.remove(cssClasses.noHighlighting);

    Array.from(getWidgetList()
        .children)
      .forEach(x => {
        x.classList.remove("out-of-focus");
      });

    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouse ", endMove);
    document.removeEventListener("touchmove", move);
    document.removeEventListener("touchend", endMove);

    draggingWidget = null;
  }.bind(this);

  const conditionsToBeginMoveMet = function(e) {
    if (e.target.dataset.notDraggable) {
      return false;
    }
    return true;
  }

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

  const onMouseOver = function(placeholder) {
    if (!draggingWidget) {
      return;
    }

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

    console.log("targetMinimumWidth", targetMinimumWidth);
    console.log("targetCurrentWidth", targetCurrentWidth);
    console.log("draggingMinimumWidth", draggingMinimumWidth);
    console.log("draggingCurrentWidth", draggingCurrentWidth);
    console.log("targetHasRoom", targetHasRoom);
    console.log("targetCouldMakeRoom", targetCouldMakeRoom);
    console.log("bestWidths", bestWidths);

    // if the dragged widget could fit
    if (targetHasRoom || targetCouldMakeRoom) {
      this.setAttribute("data-restore-width", this.dataset.currentWidth);

      const widgetList = getWidgetList();

      placeholder = this.cloneNode(false);
      placeholder.classList.add(cssClasses.placeholder);
      placeholder.style.height = this.offsetHeight + "px";

      if (isWidgetMovedUp(this, draggingWidget)) {
        widgetList.insertBefore(placeholder, this);
      } else {
        widgetList.insertBefore(placeholder, this);
        widgetList.insertBefore(this, placeholder);
      }

      widgetList.addSpacers();

      //   set the target to it's minimum or the width needed to fit the dragged widget, whichever is greater
      // this.resetWidth(bestWidths.target);
      // this.setAttribute("data-current-width", bestWidths.target);

      //   add a placeholder the size of the dragged widget

      // if dropped or mouseout
      //   remove the target data-restore-width
      //     this.removeAttribute("data-restore-width");

      // if dropped
      //   set the target widget data-current-width and replace bootstrap
      //     this.resetWidth(bestWidths.target);
      //     this.setAttribute("data-current-width", bestWidths.target);
      //   set the dragged widget data-current-width and replace bootstrap
      //     draggingWidget.resetWidth(bestWidths.dragging);
      //     draggingWidget.setAttribute("data-current-width", bestWidths.dragging);
      //   remove the placeholder
    }
  }.bind(this);

  this.displayDropOptions(onMouseOver.bind(this));
};