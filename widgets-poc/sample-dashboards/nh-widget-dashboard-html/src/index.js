const lanes = 5;

const loadInitialItems = function($grid, items) {
  var item, i;
  for (i = 0; i < items.length; i++) {
    item = items[i];
    const content = document.createElement("span");
    content.innerHTML = i;
    addItem($grid, item, content);
  }
};

var DemoGrid = {
  flashItems: function(items) {
    // Hack to flash changed items visually
    for (var i = 0; i < items.length; i++) {
      (function($element) {
        $element.addClass("changed")
        setTimeout(function() {
          $element.removeClass("changed");
        }, 0);
      })(items[i].$element);
    }
  }
};

const addResizeLink = function($grid, listItem, controls, width, height) {
  const link = document.createElement("a");
  link.href = "/";
  link.className = "resize";
  link.setAttribute("data-w", width);
  link.setAttribute("data-h", height);
  link.innerHTML = width + "x" + height;
  link.addEventListener("click", function(e) {
    e.preventDefault();
    // TODO
    $grid.gridList("resizeItem", $(listItem), {
      w: width,
      h: height
    });
  });
  controls.appendChild(link);
};

const addItem = function($grid, item, content) {
  const listItem = document.createElement("li");
  const inner = document.createElement("div");
  inner.className = "inner";
  const controls = document.createElement("div");
  controls.className = "controls";
  addResizeLink($grid, listItem, controls, 1, 1);
  addResizeLink($grid, listItem, controls, 2, 1);
  addResizeLink($grid, listItem, controls, 3, 1);
  addResizeLink($grid, listItem, controls, 4, 1);
  addResizeLink($grid, listItem, controls, 5, 1);
  addResizeLink($grid, listItem, controls, 1, 2);
  addResizeLink($grid, listItem, controls, 2, 2);
  addResizeLink($grid, listItem, controls, 3, 2);
  addResizeLink($grid, listItem, controls, 4, 2);
  addResizeLink($grid, listItem, controls, 5, 2);
  addResizeLink($grid, listItem, controls, 1, 3);
  addResizeLink($grid, listItem, controls, 2, 3);
  addResizeLink($grid, listItem, controls, 3, 3);
  addResizeLink($grid, listItem, controls, 4, 3);
  addResizeLink($grid, listItem, controls, 5, 3);
  addResizeLink($grid, listItem, controls, 1, 4);
  addResizeLink($grid, listItem, controls, 2, 4);
  addResizeLink($grid, listItem, controls, 3, 4);
  addResizeLink($grid, listItem, controls, 4, 4);
  addResizeLink($grid, listItem, controls, 5, 4);
  addResizeLink($grid, listItem, controls, 1, 5);
  addResizeLink($grid, listItem, controls, 2, 5);
  addResizeLink($grid, listItem, controls, 3, 5);
  addResizeLink($grid, listItem, controls, 4, 5);
  addResizeLink($grid, listItem, controls, 5, 5);
  const removeLink = document.createElement("a");
  removeLink.href = "/";
  removeLink.className = "remove";
  removeLink.innerHTML = "remove";
  removeLink.addEventListener("click", function(e) {
    e.preventDefault();
    listItem.remove();
    // TODO
    $grid.gridList("removeItem", $(listItem));
  });
  controls.appendChild(removeLink);
  inner.appendChild(controls);
  inner.appendChild(content);
  listItem.appendChild(inner);
  listItem.setAttribute("data-w", item.w);
  listItem.setAttribute("data-h", item.h);
  listItem.setAttribute("data-x", item.x);
  listItem.setAttribute("data-y", item.y);
  // TODO
  $grid.get(0)
    .appendChild(listItem);
  return listItem;
};

const addNewItem = function(item, content) {
  const $grid = $("#grid");
  const listItem = addItem($grid, item, content);
  // TODO
  $grid.gridList("addItem", $(listItem));
  listItem.scrollIntoView({ behavior: "smooth" });
};

$(window)
  .resize(function() {
    $("#grid")
      .gridList("reflow");
  });

$(function() {
  const $grid = $("#grid");
  loadInitialItems($grid, fixtures.verticalGridDemo);

  const widgets = Object.keys(window)
    .filter(x => x.indexOf("nhWidget") >= 0)
    .map(x => Object.assign({}, { key: x }, window[x]));

  $grid.gridList({
    lanes: lanes,
    direction: "vertical",
    widthHeightRatio: window.innerWidth / (window.innerHeight - document.getElementById("grid-container")
      .style
      .top),
    onChange: function(changedItems) {
      DemoGrid.flashItems(changedItems);
    }
  });
  document.getElementById("add-widget")
    .addEventListener("click", function(e) {
      const header = $(".header");
      const panel = document.createElement("div");
      panel.id = "widgets";
      panel.className = "widgets";
      panel.style.top = e.clientY + "px";
      panel.style.left = e.clientX + "px";
      widgets.forEach(x => {
        const widget = document.createElement("div");
        widget.id = x.key;
        widget.className = "widgetItem";
        widget.innerHTML = x.metadata.title;
        widget.addEventListener("click", function(e) {
          addWidget(x.render, x.metadata.defaultSize);
          removeWidgetPanel(panel);
        });
        panel.appendChild(widget);
      });
      header.append(panel);
      document.addEventListener("mouseup", onMouseupOutsideWidgetPanel);
    });

  const onMouseupOutsideWidgetPanel = function(e) {
    const panel = document.getElementById("widgets");
    if (panel != e.target && [].filter.call(panel.children, function(x) { return x === e.target; })
      .length == 0) {
      removeWidgetPanel(panel);
    }
  };

  const removeWidgetPanel = function(panel) {
    panel.remove();
    document.removeEventListener("mouseup", onMouseupOutsideWidgetPanel);
  };

  const addWidget = function(render, size) {
    const content = document.createElement("div");
    render(content);
    const item = { w: size.width, h: size.height };
    addNewItem(item, content);
  };
});