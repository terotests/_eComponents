# Components for the _e() library

Includes tests about Material design components etc.

Usage examples : 
http://codepen.io/teroktolonen/full/pjNzMx

E-mailer example:
http://codepen.io/teroktolonen/full/VvPYPQ



```javascript
// install both material and bootstrap components
_eComponents({ 
    material: true,
    bootstrap : true });
```

The use with mosh or without..

```javascript

// simple usage example

var body = _e(document.body);
body.e("paper-h1", {
  text: "Try two-way binded things"
});

// or with two-way databinding 

var localModel = _data({
  name: "John Smith"
});

body.e("paper-input", {
  title: "Name",
  value: [localModel, "name"]
});

localModel.on("name", function() {
    console.log("New name "+localModel.name());
});
```

























   

 


   
#### Class _eComponents


- [bsComps](README.md#_eComponents_bsComps)
- [materialComps](README.md#_eComponents_materialComps)



   


   





   
# Class _eComponents


The class has following internal singleton variables:
        
        
### <a name="_eComponents_bsComps"></a>_eComponents::bsComps(body)


*The source code for the function*:
```javascript
var bsSetItemContent = function(item, toElem) {
  if (item.get("icon")) {
    toElem.span(toElem.str(["glyphicon glyphicon-", item.get("icon")]));
    toElem.span().html("&nbsp;");
  }
  if (item.get("iconImg")) {
    aa.img("iconImg", {
      src: item.get("iconImg")
    });
  }
  if (item.get("leftBadge")) toElem
         .span("badge").text(item.get("leftBadge"));

  if (item.buttongroup) {
    //var o = this.buttonGroup(item.buttongroup);
    //myLi.add(o);
  }

  toElem.span().bind(item, "text");

  if (item.get("rightBadge")) {
    console.log("--> biding to rightBadge");
    toElem.span("badge").bind(item, "rightBadge");
  }
  if (item.get("active")) {
    toElem.addClass("active");
  }
  item.on("active", function() {
    if (item.get("active")) {
      toElem.addClass("active");
    } else {
      toElem.removeClass("active");
    }
  });
}

var create_bs_btn = function(scope, type) {
  scope.customElement("btn-" + type, {
    data: {
      text: "Button text"
    },
    css: function(myCss) {},
    init: function(data, createOptions) {
      this.addClass("btn btn-" + type);
      bsSetItemContent(data, this);
    },
    tagName: "button"
  })
}

create_bs_btn(body, "primary");
create_bs_btn(body, "danger");
create_bs_btn(body, "warning");
create_bs_btn(body, "default");

body.customElement("tabs", {
    data: {
      text: "Button text",
      dataid : ""
    },   
    css: function(myCss) {
      myCss.bind(".nav", { cursor : "pointer"});
    },
    init : function(data) {
      if(data && data.get("dataid")) {
            var items = _data(data.get("dataid"));
            var bc = this.ul("nav nav-tabs");
            bc.attr("role", "tablist");
            bc.mvc( items, function(item) {                
              var myLi = _e("li") 
              var aa = myLi.a();
              bsSetItemContent( item, aa );
              if (item.get("active")) {
                myLi.addClass("active");
              }
              item.on("active", function() {
                if (item.get("active")) {
                  myLi.addClass("active");
                } else {
                  myLi.removeClass("active");
                }
              });    
              myLi.on("click", function() {
                items.forEach( function(ii) {
                  ii.set("active", false);
                })
                item.set("active", true);
              });
              return myLi;
            });
      }
    }
});


```

### _eComponents::constructor( options )

```javascript
var body = _e(document.body);

options = options || {};

if(options.material) {
    this.materialComps(options.root || body);
}
if(options.bootstrap) {
    this.bsComps(options.root || body);
}
```
        
### <a name="_eComponents_materialComps"></a>_eComponents::materialComps(body)
`body` _e() object to initialize to
 


*The source code for the function*:
```javascript


var paper_input = function(scope, name, baseColor, elemName) {
  if (!elemName) elemName = "input";
  scope.customElement(name, {
    data: {
      title: "input title",
      value: "the value"
    },
    css: function(myCss) {
      myCss.bind(".input-container", {
        "margin-top": "0.2em",
        "margin-bottom": "0.2em",
        "margin-right": "0.2em"
      });
      myCss.bind(".paper-input", {
        "border-radius": "0",
        "width": "100%",
        "font-size": "1em",
        "outline": "none",
        "border": "none",
        "border-bottom": "1px solid #757575",
        "padding": "10px 10px 10px 5px",
        "display": "block",
        "background-color": "#fafafa"
      });
      myCss.bind(".box", {
        width: "100%",
        height: "2px",
        "background-color": _e().mix("#4a89dc", baseColor),
        transform: "scale(0,1)",
        "opacity": 1
      });
      myCss.animation("input-enter", {
          duration: "0.5s",
          "iteration-count": 1,
        }, {
          width: "100%",
          background: "#fff",
          opacity: 1
        },
        0.3, {
          width: "100%",
          background: _e().mix(baseColor, "white", 0.7),
          opacity: 1
        }, {
          width: "100%",
          background: "#fff",
          opacity: 1
        });
      myCss.animation("input-bar-enter", {
        duration: "0.5s",
        "iteration-count": 1,
      }, {
        opacity: 0,
        transform: "scale(0, 1)"
      }, {
        opacity: 1,
        transform: "scale(1, 1)"
      }, {
        duration: 0.5
      });
      myCss.animation("input-bar-close", {
        duration: "0.5s",
        "iteration-count": 1,
      }, {
        opacity: 0,
        transform: "scale(1, 1)"
      }, {
        opacity: 1,
        transform: "scale(0, 1)"
      }, {
        duration: 0.5
      });
      myCss.bind(".entered", {
        transform: "scale(1,1)"
      });
      myCss.bind(".paper-input-title", {
        opacity: 0.6
      });
      myCss.bind(".titleFocused", {
        opacity: 0.8
      });
    },
    init: function(data) {
      var box;
      var container = this.div("input-container");
      var title = container.div("paper-input-title").bind(data, "title")
      var input = container[elemName]("paper-input");

      input.bind(data, "value");
      input.on("focus", function() {
        box.removeClass("input-bar-close");
        box.addClass("input-bar-enter");
        box.addClass("entered");
        this.addClass("input-enter");
        title.addClass("titleFocused");
      }).on("blur", function() {
        box.removeClass("input-bar-enter");
        box.addClass("input-bar-close");
        box.removeClass("entered");
        this.removeClass("input-enter");
        title.removeClass("titleFocused");
      })
      var box = container.div("box");
    },
    tagName: "div"
  });
}
paper_input(body, "paper-input", "orange");
paper_input(body, "paper-textarea", "red", "textarea");

// material design circle effect component, which removes itself automatically
var paper_circle = function(scope, name, size, baseColor, duration) {
  scope.customElement(name, {
    css: function(myCss) {
      duration = duration || 0.6;
      myCss.bind(".circle", {
        "border-radius": "50%",
        "width": size,
        "height": size,
        "transform": "translate(-50%, -50%)",
        "position": "absolute",
        "top": 0,
        "left": 0,
        "background-color": baseColor
      });
      myCss.animation("animate", {
          duration: (duration + "s"),
          "iteration-count": 1,
        }, {
          opacity: 0,
          transform: "scale(0,0)"
        },
        0.1, {
          opacity: 1,
          transform: "scale(0.3,0.3)"
        }, 0.4, {
          transform: "scale(0.7,0.7)",
          opacity: 0.8
        }, {
          transform: "scale(1,1)",
          opacity: 0
        }
      );
    },
    init: function(options) {
      var container = _e("div");
      container.relative();
      this.prepend(container);
      var rel = container.div().absolute();
      var m = this.mousePos();

      rel.x(m.x).y(m.y);
      rel.div("circle");
      rel.addClass("animate");
      var me = this;
      setTimeout(function() {
        container.remove();
      }, duration * 1000);
    },
    tagName: "div"
  });

}
paper_circle(body, "paper-circle", "200px", "rgba(255, 255, 255, 0.25)");
paper_circle(body, "paper-circle-red", "200px", "rgba(255, 0, 0, 0.25)");
paper_circle(body, "paper-circle-green", "200px", "rgba(0, 255, 0, 0.25)");
paper_circle(body, "paper-circle-dark", "200px", "rgba(0, 0, 0, 0.15)");
paper_circle(body, "paper-circle-huge", "1200px", "rgba(255, 255, 255, 0.12)", 1.4);

var create_btn = function(scope, name, color, borderRadius) {
  scope.customElement(name, {
    data: {
      text: "Button text"
    },
    css: function(myCss) {
      var btnShadow = "0 3px 10px rgba(0, 0, 0, 0.34)";
      var myColor = _e().mix("#4a89dc", color);
      myCss.bind(".btn-content", {
        "display": "inline-block",
        "padding": "0.4em 0.8em",
        "position": "relative",
        "margin": "0.3em",
        "overflow": "hidden",
        "cursor": "pointer",
        "color": "#fff",
        "border-radius": borderRadius || 0,
        "background-color": myColor,
        "box-shadow": btnShadow
      });
      myCss.bind(".btn-content:hover", {
        "background": _e().dim(_e().mix(color, "#4a89dc"), 0.1)
      });
      myCss.animation("tryMe", {
        duration: "4s",
        "iteration-count": 1,
      }, {
        transform: "rotate(0deg)"
      }, {
        transform: "rotate(360deg)"
      });
    },
    init: function(data, createOptions) {
      this.addClass("btn-content");
      this.span().bind(data, "text");
      this.on("click", function() {
        this.e("paper-circle");
      });
    },
    tagName: "div"
  })
}
create_btn(body, "paper-button", "gray", "0px");
create_btn(body, "pri-button", "gray", "0px");
create_btn(body, "danger-button", "red", "0px");
create_btn(body, "warning-button", "yellow", "0px");

var paper_heading = function(scope, name, size, baseColor) {
    scope.customElement(name, {
      // The data-model for the component
      data: {
        text: "Default heading for the component"
      },
      css: function(myCss) {
        myCss.bind(".h1-container", {
          "margin-top": "0.1em",
          "margin-bottom": "0.2em",
          "margin-right": "0.2em",
          "cursor": "pointer",
          "font-size": size,
          "opacity": 0.9,
          "color": _e().mix("#4a89dc", baseColor, 0.6)
        });
        myCss.bind(".box", {
          width: "100%",
          height: "2px",
          "transform-origin": "100% 0",
          "background-color": _e().mix("#4a89dc", baseColor),
          transform: "scale(1,1)",
          "margin-bottom": "0.4em",
          "opacity": 0.5
        });
        myCss.animation("box-enter", {
          duration: "1s",
          "iteration-count": 1,
        }, {
          opacity: 0,
          transform: "scale(0, 1)"
        }, {
          opacity: 0.5,
          transform: "scale(1, 1)"
        }, {
          duration: 0.5
        });
      },
      init: function(data) {
        this.div("h1-container").bind(data, "text");
        var box = this.div("box").addClass("box-enter");
        this.on("click", function() {
          box.removeClass("box-enter");
          var me = this;
          setTimeout(function() {
            box.addClass("box-enter");
          }, 100);
        });
      },
      tagName: "div"
    });
  }
  // create component for paper -like h1 
paper_heading(body, "paper-h1", "2em", "#333");
paper_heading(body, "paper-h2", "1.5em", "#666");
paper_heading(body, "paper-h3", "1.5em", "#666");

var send_email_comp = function(scope, name, size, baseColor) {
    scope.customElement(name, {
      // The data-model for the component
      data: {
        to_title : "Vastaanottaja(t)",
        to: "",          
        head_title : "Sähköpostin otsikko",
        heading: "The e-mail heading",
        content_title : "Sisältö",
        content: "",        
        text : "The contents of the email",
        send_title : "Lähetä"
      },
      css: function(myCss) {

      },
      init: function(data) {
        this.e("paper-input", {
            title : [data, "to_title"], 
            value : [data, "to"] });          
        this.e("paper-input", {
            title : [data, "head_title"], 
            value : [data, "heading"] });
        this.e("paper-textarea", {
            title : [data, "content_title"], 
            value : [data, "content"] });            
        this.e("paper-button", {
            text : [data, "send_title"] }).on("click", function() {
                this.send("send-email", data.toPlainData(), function() {
                    // any controller preferences? 
                });
            });           
      },
      tagName: "div"
    });
  }
send_email_comp( body, "send-email");
```



   


   




