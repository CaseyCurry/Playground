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

Element.prototype.makeFullWidth = function() {
  console.log(this);
  Array
    .from(this.classList)
    .forEach(x => {
      if (x.indexOf(cssClasses.bootstrapPrefix) === 0) {
        this.classList.remove(x);
      }
    });
  this.classList.add(cssClasses.fullWidth);
}

Element.prototype.addSpacers = function() {
  const createSpacer = function() {
    const spacer = document.createElement("div");
    spacer.classList.add(cssClasses.spacer);
    spacer.classList.add(cssClasses.fullWidth);

    let timeout = false;
    let sizeOptions = false;

    spacer.addEventListener("mouseover", function(e) {
      if (!sizeOptions) {
        timeout = setTimeout(function() {
          sizeOptions = document.createElement("div");
          sizeOptions.classList.add(cssClasses.spacerSizeOptions);
          spacer.appendChild(sizeOptions);
        }, 250);
      }
    });

    spacer.addEventListener("mouseout", function(event) {
      // Skip if mouse is moved to a child of the spacer.
      const e = event.toElement || event.relatedTarget;
      if (e) {
        if (e.parentNode == this || e == this) {
          return;
        }
      }
      if (timeout) {
        window.clearTimeout(timeout);
      }
      if (sizeOptions) {
        sizeOptions.remove();
        sizeOptions = null;
      }
    });
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

  const maxRowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  let usedWidthOnRow = 0;

  widgets.forEach(function(x) {
    usedWidthOnRow += x.offsetWidth;

    if (usedWidthOnRow >= maxRowWidth) {
      spacer = createSpacer();
      this.insertBefore(spacer, x);

      if (usedWidthOnRow === maxRowWidth) {
        this.insertBefore(x, spacer);
        usedWidthOnRow = 0;
      } else {
        usedWidthOnRow = x.offsetWidth;
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
  const getWidgetList = function() {
    return document.getElementsByClassName(cssClasses.widgets)[0];
  }

  const getUserPosition = function(e) {
    return e.changedTouches ? {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY
    } : {
      x: e.clientX,
      y: e.clientY
    };
  };

  const getWidget = function(element) {
    if (!element) {
      return;
    }
    const widget = element.classList.contains(cssClasses.widget) ?
      element :
      element.closest("." + cssClasses.widget);
    return widget;
  };

  const getSpacer = function(element) {
    if (!element) {
      return;
    }
    const spacer = element.classList.contains(cssClasses.spacer) ?
      element :
      element.closest("." + cssClasses.spacer);
    return spacer;
  };

  const isWidgetMovedUp = function(widgetToMove) {
    if (!widgetToMove) {
      return null;
    }

    let thisOrder;
    let currentResidentOrder;

    if (!widgetToMove.style.order || !this.style.order) {
      const widgets = getWidgetList()
        .children;
      thisOrder = [].indexOf.call(widgets, this);
      currentResidentOrder = [].indexOf.call(widgets, widgetToMove);
    } else {
      thisOrder = this.style.order;
      currentResidentOrder = widgetToMove.style.order;
    }

    return currentResidentOrder < thisOrder;
  }.bind(this);

  const startMove = function(e) {
    this.initialPosition = {
      top: this.style.top,
      left: this.style.left
    };
    document.body.classList.add(cssClasses.noHighlighting);
    const placeholder = this.cloneNode(false);
    placeholder.classList.add(cssClasses.placeholder);
    placeholder.style.height = this.offsetHeight + "px";
    const widgetList = getWidgetList();
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
          return !x.classList.contains(cssClasses.placeholder);
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
        if (isWidgetMovedUp(widgetToMove)) {
          widgetList.insertBefore(this, widgetToMove);
        } else {
          widgetList.insertBefore(this, widgetToMove);
          widgetList.insertBefore(widgetToMove, this);
        }
      }
    }

    const placeholders = document.getElementsByClassName(cssClasses.placeholder);

    if (placeholders) {
      widgetList.removeChild(placeholders[0]);
    }

    widgetList.addSpacers();

    this.classList.remove(cssClasses.draggable);
    this.style.top = this.initialPosition.top;
    this.style.left = this.initialPosition.left;

    document.body.classList.remove(cssClasses.noHighlighting);

    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", endMove);
    document.removeEventListener("touchmove", move);
    document.removeEventListener("touchend", endMove);
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
};