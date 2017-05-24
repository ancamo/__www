function Event(sender) {
  this._sender = sender;
  this._listeners = [];
}

Event.prototype = {
  attach: function (listener) {
    this._listeners.push(listener);
  },
  notify: function (args) {
    var index;

    for (index = 0; index < this._listeners.length; index += 1) {
      this._listeners[index](this._sender, args);
    }
  }
};

/**
 * The Model. Model stores items and notifies
 * observers about changes.
 */
function ListModel(items) {
  this._items = items;
  this._selectedIndex = -1;

  this.itemAdded = new Event(this);
  this.itemRemoved = new Event(this);
  this.selectedIndexChanged = new Event(this);
}

ListModel.prototype = {
  getItems: function () {
    return [].concat(this._items);
  },

  addItem: function (item) {
    this._items.push(item);
    this.itemAdded.notify({
      item: item
    });
  },

  removeItemAt: function (index) {
    var item;

    item = this._items[index];
    this._items.splice(index, 1);
    this.itemRemoved.notify({
      item: item
    });
    if (index === this._selectedIndex) {
      this.setSelectedIndex(-1);
    }
  },

  getSelectedIndex: function () {
    return this._selectedIndex;
  },

  setSelectedIndex: function (index) {
    var previousIndex;

    previousIndex = this._selectedIndex;
    this._selectedIndex = index;
    this.selectedIndexChanged.notify({
      previous: previousIndex
    });
  }
};

/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interraction.
 */
function ListView(model, elements) {
  this._model = model;
  this._elements = elements;

  this.listModified = new Event(this);
  this.addButtonClicked = new Event(this);
  this.delButtonClicked = new Event(this);

  var _this = this;

  // attach model listeners
  this._model.itemAdded.attach(function () {
    _this.rebuildList();
  });
  this._model.itemRemoved.attach(function () {
    _this.rebuildList();
  });

  // attach listeners to HTML controls
  this._elements.list.onchange = function (e) {
    _this.listModified.notify({
      index: e.target.selectedIndex
    });
  };
  this._elements.addButton.onclick = function () {
    _this.addButtonClicked.notify();
  };
  this._elements.delButton.onclick = function () {
    _this.delButtonClicked.notify();
  };
}

ListView.prototype = {
  show: function () {
    this.rebuildList();
  },

  rebuildList: function () {
    var list, items, key;

    list = this._elements.list;
    list.innerHTML = '';

    items = this._model.getItems();
    for (key in items) {
      if (items.hasOwnProperty(key)) {
        let option = document.createElement("option"),
          txtOption = document.createTextNode(items[key]);

        option.append(txtOption);
        list.append(option);
      }
    }
    this._model.setSelectedIndex(-1);
  }
};

/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
function ListController(model, view) {
  this._model = model;
  this._view = view;

  var _this = this;

  this._view.listModified.attach(function (sender, args) {
    _this.updateSelected(args.index);
  });

  this._view.addButtonClicked.attach(function () {
    _this.addItem();
  });

  this._view.delButtonClicked.attach(function () {
    _this.delItem();
  });
}

ListController.prototype = {
  addItem: function () {
    var item = window.prompt('Add item:', '');
    if (item) {
      this._model.addItem(item);
    }
  },

  delItem: function () {
    var index;

    index = this._model.getSelectedIndex();
    if (index !== -1) {
      this._model.removeItemAt(this._model.getSelectedIndex());
    }
  },

  updateSelected: function (index) {
    this._model.setSelectedIndex(index);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  var model = new ListModel(['HTML', 'css', 'JavaScript']),
    view = new ListView(model, {
      'list': document.querySelector('#list'),
      'addButton': document.querySelector('#plusBtn'),
      'delButton': document.querySelector('#minusBtn')
    }),
    controller = new ListController(model, view);

  view.show();
});