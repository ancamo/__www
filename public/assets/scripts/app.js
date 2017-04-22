"use strict";

//
// Data to create the items for the App  
var groceryItems = [{
  id: "001",
  name: "Milk",
  price: 1500
}, {
  id: "002",
  name: "Juice",
  price: 3550
}, {
  id: "003",
  name: "Tomatoes",
  price: 400
}, {
  id: "004",
  name: "Egg",
  price: 150
}, {
  id: "005",
  name: "Bread",
  price: 4500
}, {
  id: "006",
  name: "Cheese",
  price: 6130
}, {
  id: "007",
  name: "Onion",
  price: 300
}, {
  id: "008",
  name: "Potatos",
  price: 450
}, {
  id: "009",
  name: "Butter",
  price: 3000
}, {
  id: "010",
  name: "Pepper",
  price: 300
}];
//
// create to template of the list for the App 
var LIST = {
  selectorList: document.querySelector(".js-list"),
  //
  _init: function _init() {

    if (this.selectorList) {
      //
      //Create item for each of the items in the data
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = groceryItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          //
          // return of the template
          this.selectorList.innerHTML += createTemp(item);
        }
        //
        // add event click that add element into the cart
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.selectorList.addEventListener("click", function (e) {
        //
        if (e.target.classList.contain = "js-button") {
          //
          controlCart._addElement(e.target.getAttribute("id"));
        }
      }, false);
    }
  }
};
//
// template
var createTemp = function createTemp(e) {
  //
  var obj = e;
  //
  var template = "<div class=\"b__list__content-item\">\n    <span class=\"list__post js-count\">" + (obj.number || "") + "</span>\n    <span class=\"list__name\">" + obj.name + "</span>\n    <span class=\"list__price js-price\">" + obj.price + "</span>\n    <button id=\"" + obj.id + "\" class=\"js-button " + (e.type ? "icono-cross" : "icono-plus") + "\">" + (e.type ? "remove" : "add to cart") + "</button>\n  </div>";
  //
  return template;
};
//
//
var controlCart = {
  //
  // method add elements on the cart
  _addElement: function _addElement(id) {
    var _this = this;

    //
    var selector = document.querySelector("#item__" + id);
    //
    // create element when not exist on the cart
    if (!selector) {
      //
      groceryItems.forEach(function (ele) {

        if (ele.id === id) {
          ele.type = true;
          ele.number = 1;
          ele.id = "item__" + ele.id;
          document.querySelector(".js-items").innerHTML += createTemp(ele);
          ele.id = id;
        }
        //
        // remove global event click to the cart that remove the element
        document.querySelector(".js-items").removeEventListener("click", _this.__removeElement, false);
        //
        // Add global event that removes or subtracts items on the cart
        document.querySelector(".js-items").addEventListener("click", _this.__removeElement, false);
      });
      //
      // sum items when the user make to click button add
    } else {
      var target = selector.parentNode.querySelector(".js-count");
      var count = parseInt(target.textContent);
      var resultCount = ++count;
      //
      target.innerHTML = resultCount;
    }
    //
    // make the total sum of the cart
    document.querySelector(".js-result").innerHTML = this.__resultSum();
  },
  //
  // method sum 
  __resultSum: function __resultSum() {
    var resultSum = document.querySelector(".js-result").textContent,
        count = 0,
        js_items = document.querySelector(".js-items").querySelectorAll(".b__list__content-item");
    //
    // validate when the result is 0
    if (js_items.length === 0) {
      //
      return "empty";
      //
      // make the sum for number the items
    } else {
      //
      resultSum = 0;
      //
      for (var item = 0; item < js_items.length; item++) {
        //
        // multiplies the value of the items by the number of items
        count = parseInt(js_items[item].querySelector(".js-price").textContent) * parseInt(js_items[item].querySelector(".js-count").textContent);
        //
        // Sum to the final result
        resultSum = resultSum + count;
      }
      //
      // return the result of the cart
      return parseInt(resultSum);
    }
  },
  //
  // method remove element and subtract value or only subtract value
  __removeElement: function __removeElement(e) {
    //
    if (e.target.classList.contain = "js-button") {
      //
      var value = e.target.parentNode.querySelector(".js-count");
      //
      // if there is only one element
      if (parseInt(value.textContent) === 1) {
        //
        e.target.parentNode.remove();
        //
        // subtract one item
      } else {
        //
        value.innerHTML = parseInt(value.textContent) - 1;
      }
      //
      // call method __resultSum
      document.querySelector(".js-result").innerHTML = controlCart.__resultSum();
    }
  }
};
//
// wait that document loaded
document.addEventListener("DOMContentLoaded", function (e) {
  // init App
  LIST._init();
});