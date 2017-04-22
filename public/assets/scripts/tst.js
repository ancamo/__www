"use strict";

//
document.addEventListener('DOMContentLoaded', function () {

  //document.body.innerHTML= `<h1 style="color:black;">try something</h1>`;

}, false);

// module pattern


var basketModule = function () {

  var basket = [];

  function dosomethingPrivate(n) {
    document.querySelector(".js-reault").innerHTML = "Result " + n;
  }

  return {

    addItem: function addItem(values) {
      basket.push(values);
    },

    removeItem: function removeItem(value) {

      var toDelete = new Set([value]);89;

      var newArray = basket.filter(function (obj) {

        return !toDelete.has(obj.id);
      });

      basket = newArray;
    },

    getItemCount: function getItemCount() {
      return basket.length;
    },

    doSomething: function doSomething() {
      dosomethingPrivate(this.getTotal());
    },

    getTotal: function getTotal() {

      var q = this.getItemCount(),
          p = 0;

      while (q--) {
        p += basket[q].price;
      }

      return p;
    }
  };
}();

//...
basketModule.addItem({
  id: "0001",
  item: "bread",
  price: 0.5
});
//
basketModule.addItem({
  id: "0002",
  item: "butter",
  price: 0.7
});
//
console.log("No Items", basketModule.getItemCount());
console.log("Total", basketModule.getTotal());
console.log("remove", basketModule.removeItem("0002"));

console.log("No Items", basketModule.getItemCount());
console.log("Total", basketModule.getTotal());

basketModule.doSomething();