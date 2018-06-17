var DemoGrid = {
  currentSize: 3,
  buildElements: function($gridContainer, items) {
    var item, i;
    for (i = 0; i < items.length; i++) {
      item = items[i];
      addItem($gridContainer, item, i);
    }
  },
  resize: function(size) {
    if (size) {
      this.currentSize = size;
    }
    $("#grid")
      .gridList("resize", this.currentSize);
  },
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

const addItem = function($gridContainer, item, content) {
  $item = $(
    '<li>' +
    '<div class="inner">' +
    '<div class="controls">' +
    '<a href="#zoom1" class="resize" data-w="1" data-h="1">1x1</a>' +
    '<a href="#zoom2" class="resize" data-w="2" data-h="1">2x1</a>' +
    '<a href="#zoom3" class="resize" data-w="3" data-h="1">3x1</a>' +
    '<a href="#zoom1" class="resize" data-w="1" data-h="2">1x2</a>' +
    '<a href="#zoom2" class="resize" data-w="2" data-h="2">2x2</a>' +
    '<a href="#remove" class="remove">remove</a>' +
    '</div>' +
    content +
    '</div>' +
    '</li>'
  );
  $item.attr({
    "data-w": item.w,
    "data-h": item.h,
    "data-x": item.x,
    "data-y": item.y
  });
  $($item)
    .find(".resize")
    .click(function(e) {
      e.preventDefault();
      var itemElement = $(e.currentTarget)
        .closest("li"),
        itemWidth = $(e.currentTarget)
        .data("w"),
        itemHeight = $(e.currentTarget)
        .data("h");

      $gridContainer
        .gridList("resizeItem", itemElement, {
          w: itemWidth,
          h: itemHeight
        });
    });
  $($item)
    .find(".remove")
    .click(function(e) {
      e.preventDefault();
      const itemElement = $(e.currentTarget)
        .closest("li");
      itemElement.remove();
      $gridContainer
        .gridList("removeItem", itemElement);
    });
  $gridContainer.append($item);
  return $item;
};

const addNewItem = function($gridContainer, item, content) {
  const $item = addItem($gridContainer, item, content);
  $gridContainer.gridList("addItem", $item);
  $item.get(0)
    .scrollIntoView({ behavior: "smooth" });
};

$(window)
  .resize(function() {
    $("#grid")
      .gridList("reflow");
  });

$(function() {
  DemoGrid.buildElements($("#grid"), fixtures.verticalGridDemo);

  $("#grid")
    .gridList({
      lanes: DemoGrid.currentSize,
      direction: "vertical",
      widthHeightRatio: 1,
      heightToFontSizeRatio: 0.25,
      onChange: function(changedItems) {
        DemoGrid.flashItems(changedItems);
      }
    });
  $(".add-item")
    .click(function(e) {
      e.preventDefault();
      const $gridContainer = $("#grid");
      const item = { w: 1, h: 1 /*, x: 0, y: 5 */ };
      addNewItem($gridContainer, item, "Boom!");
    });
});