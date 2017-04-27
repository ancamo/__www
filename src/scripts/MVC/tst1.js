let header___data = [
  {
    "NavGlobal": [
      {
        NameLink: "item 1",
        Link: "#item___1"
      },
      {
        NameLink: "item 2",
        Link: "#item___2"
      },
      {
        NameLink: "item 3",
        Link: "/#item___3"
      }
    ]
  },
  {
    "NavSocial":[
      {
        NameLink: "facebook",
        Link: "https://www.facebook.com"
      }
    ]
  }
];

let main___data = "This is de Main data";

// model -- data
function Model (data) {
  this.data = data;
  return data;
}

// controller -- logic
// constructor
function Controller (data, ctxt){
  this.data = data;
  this.ctxt = ctxt;
}

// view -- render
function View(ctxt, data){

  document.querySelector(ctxt).innerHTML = data;
}

//
//header ------
let HeaderModel = new Model (header___data);
let HeaderCtrl = new Controller(HeaderModel, "header");

HeaderCtrl.render =  function (){
  
  let fillTemplate = (obj) => {
    let template = "";
    
    obj.forEach((item) => {
      template += `
        <li>
          <a href="${item.Link}" >${item.NameLink}</a>
        </li>`;
    });

    return template;
  };

  let data = () => {

    let dataNavGlobal = this.data[0].NavGlobal;
    let dataNavSocial = this.data[1].NavSocial;

    let data_tag = `
      <nav class="b__navGlobal">
        <ul>
          ${fillTemplate(dataNavGlobal)}
        </ul>
      </nav>
      <nav class="b__navSocial">
        <ul>
          ${fillTemplate(dataNavSocial)}
        </ul>
      </nav>`;

    let HeaderView = new View(this.ctxt, data_tag);

    return HeaderView;
  };

  return data();
}

HeaderCtrl.render();

//main
let MainModel = new Model (main___data);
let MainCtrl = new Controller (MainModel, "main");

MainCtrl.render = function () {

  let HeaderView = new View(this.ctxt, this.data.data);
  return HeaderView;
}

MainCtrl.render();




