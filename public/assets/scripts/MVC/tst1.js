"use strict";

var header___data = [{
  "NavGlobal": [{
    NameLink: "item 1",
    Link: "#item___1"
  }, {
    NameLink: "item 2",
    Link: "#item___2"
  }, {
    NameLink: "item 3",
    Link: "/#item___3"
  }]
}, {
  "NavSocial": [{
    NameLink: "facebook",
    Link: "https://www.facebook.com"
  }]
}];

var main___data = "This is de Main data";

// model -- data
function Model(data) {
  this.data = data;
  return data;
}

// controller -- logic
// constructor
function Controller(data, ctxt) {
  this.data = data;
  this.ctxt = ctxt;
}

// view -- render
function View(ctxt, data) {

  document.querySelector(ctxt).innerHTML = data;
}

//
//header ------
var HeaderModel = new Model(header___data);
var HeaderCtrl = new Controller(HeaderModel, "header");

HeaderCtrl.render = function () {
  var _this = this;

  var fillTemplate = function fillTemplate(obj) {
    var template = "";

    obj.forEach(function (item) {
      template += "\n        <li>\n          <a href=\"" + item.Link + "\" >" + item.NameLink + "</a>\n        </li>";
    });

    return template;
  };

  var data = function data() {

    var dataNavGlobal = _this.data[0].NavGlobal;
    var dataNavSocial = _this.data[1].NavSocial;

    var data_tag = "\n      <nav class=\"b__navGlobal\">\n        <ul>\n          " + fillTemplate(dataNavGlobal) + "\n        </ul>\n      </nav>\n      <nav class=\"b__navSocial\">\n        <ul>\n          " + fillTemplate(dataNavSocial) + "\n        </ul>\n      </nav>";

    var HeaderView = new View(_this.ctxt, data_tag);

    return HeaderView;
  };

  return data();
};

HeaderCtrl.render();

//main
var MainModel = new Model(main___data);
var MainCtrl = new Controller(MainModel, "main");

MainCtrl.render = function () {

  var HeaderView = new View(this.ctxt, this.data.data);
  return HeaderView;
};

MainCtrl.render();