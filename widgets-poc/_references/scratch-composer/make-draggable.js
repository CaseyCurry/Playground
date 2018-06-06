"use strict";

Element.prototype.makeDraggable = function(conditionsToBeginMoveMet, afterMoveCallback) {
  const getWidgetList = function() {
    return document.getElementsByClassName("widgets")[0];
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
    const widget = element.classList.contains("widget") ?
      element :
      element.closest(".widget");
    return widget;
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
    document.body.classList.add("no-highlighting");
    const placeholder = this.cloneNode(false);
    placeholder.id = "placeholder";
    placeholder.classList.add("placeholder");
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
    this.classList.add("draggable");
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
    let widgetToMove = getWidget(currentResident);

    if (!widgetToMove) {
      let widgets = Array.from(document.getElementsByClassName("widget"));
      widgets = widgets.filter(function(x) {
        return !x.classList.contains("placeholder");
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

    const placeholder = document.getElementById("placeholder");

    if (placeholder) {
      widgetList.removeChild(placeholder);
    }

    afterMoveCallback();

    this.classList.remove("draggable");
    this.style.top = this.initialPosition.top;
    this.style.left = this.initialPosition.left;

    document.body.classList.remove("no-highlighting");

    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", endMove);
    document.removeEventListener("touchmove", move);
    document.removeEventListener("touchend", endMove);
  }.bind(this);

  this.addEventListener("mousedown", function(e) {
    if (conditionsToBeginMoveMet && !conditionsToBeginMoveMet(e)) {
      return;
    }
    startMove(e);
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", endMove);
  }.bind(this));

  this.addEventListener("touchstart", function(e) {
    if (conditionsToBeginMoveMet && !conditionsToBeginMoveMet(e)) {
      return;
    }
    startMove(e);
    document.addEventListener("touchmove", move);
    document.addEventListener("touchend", endMove);
  }.bind(this));
};