var model = {
  currentCat: null,
  cats: [
    {
      clickCount : 0,
      name : 'Tabby',
      imgSrc : 'img/434164568_fea0ad4013_z.jpg',
      imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
    },
    {
      clickCount : 0,
      name : 'Tiger',
      imgSrc : 'img/22252709_010df3379e_z.jpg',
      imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
    },
    {
      clickCount : 0,
      name : 'Scaredy',
      imgSrc : 'img/1413379559_412a540d29_b.jpg',
      imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
    },
    {
      clickCount : 0,
      name : 'Shadow',
      imgSrc : 'img/4154543904_6e2428c421_b.jpg',
      imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
    },
    {
      clickCount : 0,
      name : 'Sleepy',
      imgSrc : 'img/9648464288_9360db4a66_h.jpg',
      imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
    }
  ]
};

//octopus

var octopus = {
  init: function () {
    model.currentCat = model.cats[0];

    catListView.init();
    catView.init();
    catUpdate.init();
  },

  getCats: function () {
    return model.cats; 
  }, 

  getCurrentCat: function () {
    return model.currentCat;
  },

  setCurrentCat: function (cat) {
    model.currentCat = cat;
  },

  incrementCounter: function(){
    model.currentCat.clickCount++;
    catUpdate.closeUpdateView();
    catView.render();
  },

  updateCat: function (update) {
    model.currentCat.name = update.name;
    model.currentCat.imgSrc = update.imgSrc;
    model.currentCat.clickCount = update.clickCount;
    catListView.render();
    catView.render();
  }

}

var catListView = {
  init: function () {

    this.catListElem = document.querySelector("#cat-list");

    this.render();
    
  }, 

  render: function () {
    let cat, 
        elem, 
        i,
        cats = octopus.getCats();

    this.catListElem.innerHTML = "";

    for (i = 0; i < cats.length; i++) {
      cat = cats[i];

      elem = document.createElement("li");
      elem.textContent = cat.name;

      this.catListElem.appendChild(elem);

      elem.addEventListener("click", (function (catCopy){
        return function () {
          catUpdate.closeUpdateView();
          octopus.setCurrentCat(catCopy);
          catView.render();
        }
      })(cat));
    }
  }
}

var catView = {
  init: function (){
    this.catElem = document.querySelector("#cat");
    this.catNameElem = document.querySelector("#cat-name");
    this.catImageElem = document.querySelector("#cat-img");
    this.countElem = document.querySelector("#cat-count");

    this.catImageElem.addEventListener("click", () => {
      octopus.incrementCounter();
      catUpdate.closeUpdateView();
    });

    this.render();

  }, 

  render: function () {
    let currentCat = octopus.getCurrentCat();

    this.catNameElem.textContent = currentCat.name;
    this.countElem.textContent = currentCat.clickCount;
    this.catImageElem.src = currentCat.imgSrc;

  }
}


var catUpdate = {

  init: function (){

    this.nameUpdate = document.querySelector(".js-nameUpdate");
    this.imgUpdate = document.querySelector(".js-imgUpdate");
    this.clicksUpdate = document.querySelector(".js-clicksUpdate");
    this.form = document.querySelector(".js-formUpdate");

    this.btnAdmin = document.querySelector(".js-admin");
    this.btnCancel = document.querySelector(".js-cancel");
    this.btnSave = document.querySelector(".js-save");

    this.btnAdmin.addEventListener("click", () => {
      this.form.removeAttribute("style");
      this.render();
    });

    this.btnCancel.addEventListener("click", () => {
      this.closeUpdateView();
    });

    this.btnSave.addEventListener("click", () => {
      let obj = {
        clickCount : this.clicksUpdate.value,
        name : this.nameUpdate.value,
        imgSrc :  this.imgUpdate.value,
      }
      catUpdate.closeUpdateView();
      octopus.updateCat(obj)
    })
  },

  closeUpdateView: function () {
    this.form.setAttribute("style", "display: none");
  },

  render: function () {
    let currentCat = octopus.getCurrentCat();
    this.nameUpdate.value = currentCat.name; 
    this.imgUpdate.value = currentCat.imgSrc; 
    this.clicksUpdate.value = currentCat.clickCount; 
  }
}

octopus.init();


