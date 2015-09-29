// The code template begins here
"use strict";

(function () {

  var __amdDefs__ = {};

  // The class definition is here...
  var _eComponents_prototype = function _eComponents_prototype() {
    // Then create the traits and subclasses for this class here...

    (function (_myTrait_) {

      // Initialize static variables here...

      /**
       * @param Object body
       */
      _myTrait_.bsComps = function (body) {
        var bsSetItemContent = function bsSetItemContent(item, toElem) {
          if (item.get("icon")) {
            toElem.span(toElem.str(["glyphicon glyphicon-", item.get("icon")]));
            toElem.span().html("&nbsp;");
          }
          if (item.get("iconImg")) {
            aa.img("iconImg", {
              src: item.get("iconImg")
            });
          }
          if (item.get("leftBadge")) toElem.span("badge").text(item.get("leftBadge"));

          if (item.buttongroup) {}

          toElem.span().bind(item, "text");

          if (item.get("rightBadge")) {
            console.log("--> biding to rightBadge");
            toElem.span("badge").bind(item, "rightBadge");
          }
          if (item.get("active")) {
            toElem.addClass("active");
          }
          item.on("active", function () {
            if (item.get("active")) {
              toElem.addClass("active");
            } else {
              toElem.removeClass("active");
            }
          });
        };

        var create_bs_btn = function create_bs_btn(scope, type) {
          scope.customElement("btn-" + type, {
            data: {
              text: "Button text"
            },
            css: function css(myCss) {},
            init: function init(data, createOptions) {
              this.addClass("btn btn-" + type);
              bsSetItemContent(data, this);
            },
            tagName: "button"
          });
        };

        create_bs_btn(body, "primary");
        create_bs_btn(body, "danger");
        create_bs_btn(body, "warning");
        create_bs_btn(body, "default");

        body.customElement("tabs", {
          data: {
            text: "Button text",
            dataid: ""
          },
          css: function css(myCss) {
            myCss.bind(".nav", {
              cursor: "pointer"
            });
          },
          init: function init(data) {
            if (data && data.get("dataid")) {
              var items = _data(data.get("dataid"));
              var bc = this.ul("nav nav-tabs");
              bc.attr("role", "tablist");
              bc.mvc(items, function (item) {
                var myLi = _e("li");
                var aa = myLi.a();
                bsSetItemContent(item, aa);
                if (item.get("active")) {
                  myLi.addClass("active");
                }
                item.on("active", function () {
                  if (item.get("active")) {
                    myLi.addClass("active");
                  } else {
                    myLi.removeClass("active");
                  }
                });
                myLi.on("click", function () {
                  items.forEach(function (ii) {
                    ii.set("active", false);
                  });
                  item.set("active", true);
                });
                return myLi;
              });
            }
          }
        });
      };

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (options) {
        var body = _e(document.body);

        options = options || {};

        if (options.material) {
          this.materialComps(options.root || body);
        }
        if (options.bootstrap) {
          this.bsComps(options.root || body);
        }
      });

      /**
       * @param Object body  - _e() object to initialize to
       */
      _myTrait_.materialComps = function (body) {

        var validateEmail = function validateEmail(email) {
          var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
          return re.test(email);
        };
        var paper_input = function paper_input(scope, name, baseColor, elemName) {
          if (!elemName) elemName = "input";
          scope.customElement(name, {
            data: {
              title: "input title",
              value: "the value"
            },
            css: function css(myCss) {
              myCss.bind(".input-container", {
                "margin-top": "0.2em",
                "margin-bottom": "0.2em",
                "margin-right": "0.2em"
              });
              myCss.bind("input.invalid", {
                "border-color": "red"
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
                "iteration-count": 1 }, {
                width: "100%",
                background: "#fff",
                opacity: 1
              }, 0.3, {
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
                "iteration-count": 1 }, {
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
                "iteration-count": 1 }, {
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
            init: function init(data) {
              var box;
              var container = this.div("input-container");
              var title = container.div("paper-input-title").bind(data, "title");
              var input = container[elemName]("paper-input");

              if (data.get("type")) {
                input.attr("type", data.get("type"));
                if (data.get("type") == "email") {
                  input.attr("type", "text");
                  input.on("value", function () {
                    if (validateEmail(input.val())) {
                      input.removeClass("invalid");
                    } else {
                      input.addClass("invalid");
                    }
                  });
                }
              }
              if (data.get("required")) {
                input.attr("required", true);
              }
              if (data.get("placeholder")) {
                input.attr("placeholder", data.get("placeholder"));
              }
              input.bind(data, "value");
              input.on("focus", function () {
                box.removeClass("input-bar-close");
                box.addClass("input-bar-enter");
                box.addClass("entered");
                this.addClass("input-enter");
                title.addClass("titleFocused");
              }).on("blur", function () {
                box.removeClass("input-bar-enter");
                box.addClass("input-bar-close");
                box.removeClass("entered");
                this.removeClass("input-enter");
                title.removeClass("titleFocused");
              });
              var box = container.div("box");
            },
            tagName: "div"
          });
        };
        paper_input(body, "paper-input", "orange");
        paper_input(body, "paper-textarea", "red", "textarea");

        // material design circle effect component, which removes itself automatically
        var paper_circle = function paper_circle(scope, name, size, baseColor, duration) {
          scope.customElement(name, {
            css: function css(myCss) {
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
                duration: duration + "s",
                "iteration-count": 1 }, {
                opacity: 0,
                transform: "scale(0,0)"
              }, 0.1, {
                opacity: 1,
                transform: "scale(0.3,0.3)"
              }, 0.4, {
                transform: "scale(0.7,0.7)",
                opacity: 0.8
              }, {
                transform: "scale(1,1)",
                opacity: 0
              });
            },
            init: function init(options) {
              var container = _e("div");
              container.relative();
              this.prepend(container);
              var rel = container.div().absolute();
              var m = this.mousePos();

              rel.x(m.x).y(m.y);
              rel.div("circle");
              rel.addClass("animate");
              var me = this;
              setTimeout(function () {
                container.remove();
              }, duration * 1000);
            },
            tagName: "div"
          });
        };
        paper_circle(body, "paper-circle", "200px", "rgba(255, 255, 255, 0.25)");
        paper_circle(body, "paper-circle-red", "200px", "rgba(255, 0, 0, 0.25)");
        paper_circle(body, "paper-circle-green", "200px", "rgba(0, 255, 0, 0.25)");
        paper_circle(body, "paper-circle-dark", "200px", "rgba(0, 0, 0, 0.15)");
        paper_circle(body, "paper-circle-huge", "1200px", "rgba(255, 255, 255, 0.12)", 1.4);

        var create_btn = function create_btn(scope, name, color, borderRadius) {
          scope.customElement(name, {
            data: {
              text: "Button text"
            },
            css: function css(myCss) {
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
                "iteration-count": 1 }, {
                transform: "rotate(0deg)"
              }, {
                transform: "rotate(360deg)"
              });
            },
            init: function init(data, createOptions) {
              this.addClass("btn-content");
              this.span().bind(data, "text");
              this.on("click", function () {
                this.e("paper-circle");
              });
            },
            tagName: "div"
          });
        };
        create_btn(body, "paper-button", "gray", "0px");
        create_btn(body, "pri-button", "gray", "0px");
        create_btn(body, "danger-button", "red", "0px");
        create_btn(body, "warning-button", "yellow", "0px");

        var paper_heading = function paper_heading(scope, name, size, baseColor) {
          scope.customElement(name, {
            // The data-model for the component
            data: {
              text: "Default heading for the component"
            },
            css: function css(myCss) {
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
                "iteration-count": 1 }, {
                opacity: 0,
                transform: "scale(0, 1)"
              }, {
                opacity: 0.5,
                transform: "scale(1, 1)"
              }, {
                duration: 0.5
              });
            },
            init: function init(data) {
              this.div("h1-container").bind(data, "text");
              var box = this.div("box").addClass("box-enter");
              this.on("click", function () {
                box.removeClass("box-enter");
                var me = this;
                setTimeout(function () {
                  box.addClass("box-enter");
                }, 100);
              });
            },
            tagName: "div"
          });
        };
        // create component for paper -like h1
        paper_heading(body, "paper-h1", "2em", "#333");
        paper_heading(body, "paper-h2", "1.5em", "#666");
        paper_heading(body, "paper-h3", "1.5em", "#666");

        var send_email_comp = function send_email_comp(scope, name, size, baseColor) {
          scope.customElement(name, {
            // The data-model for the component
            data: {
              to_title: "Vastaanottaja(t)",
              to: "",
              head_title: "Sähköpostin otsikko",
              heading: "The e-mail heading",
              content_title: "Sisältö",
              content: "",
              text: "The contents of the email",
              send_title: "Lähetä"
            },
            css: function css(myCss) {},
            init: function init(data) {
              this.e("paper-input", {
                title: [data, "to_title"],
                value: [data, "to"]
              });
              this.e("paper-input", {
                title: [data, "head_title"],
                value: [data, "heading"]
              });
              this.e("paper-textarea", {
                title: [data, "content_title"],
                value: [data, "content"]
              });
              this.e("paper-button", {
                text: [data, "send_title"]
              }).on("click", function () {
                this.send("send-email", data.toPlainData(), function () {});
              });
            },
            tagName: "div"
          });
        };
        send_email_comp(body, "send-email");

        var support_question = function support_question(scope, name, size, baseColor) {
          scope.customElement(name, {
            // The data-model for the component
            data: {
              from_title: "Sähköpostiosoite vastausta varten",
              from: "",
              please_fill_email: "Ole hyvä ja anna sähköpostiosoite",
              content_title: "Palautteen aihe ja sisältö",
              content: "",
              text: "The contents of the email",
              send_title: "Lähetä"
            },
            css: function css(myCss) {
              myCss.bind(".alert-area", {
                "padding": "0.6em",
                "color": "white",
                "border-radius": "4px",
                "background-color": _e().mix("red", "gray")
              });
            },
            init: function init(data) {

              var alert = this.div("alert-area");
              alert.hide();
              this.e("paper-textarea", {
                title: [data, "content_title"],
                value: [data, "content"]
              });

              this.e("paper-input", {
                type: "email",
                required: true,
                title: [data, "from_title"],
                value: [data, "from"]
              });

              this.e("paper-button", {
                text: [data, "send_title"]
              }).on("click", function () {
                if (data.from().length == 0) {
                  alert.show();
                  alert.text(data.get("please_fill_email"));
                  return;
                }
                this.send("support-question", data.toPlainData(), function () {});
              });
            },
            tagName: "form"
          });
        };
        support_question(body, "support-question");
      };
    })(this);
  };

  var _eComponents = function _eComponents(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof _eComponents) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == "function") {
          if (res._classInfo.name != _eComponents._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == "function") m.init.apply(m, args);
      }
    } else return new _eComponents(a, b, c, d, e, f, g, h);
  };
  // inheritance is here

  _eComponents._classInfo = {
    name: "_eComponents"
  };
  _eComponents.prototype = new _eComponents_prototype();

  (function () {
    if (typeof define !== "undefined" && define !== null && define.amd != null) {
      __amdDefs__["_eComponents"] = _eComponents;
      this._eComponents = _eComponents;
    } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
      module.exports["_eComponents"] = _eComponents;
    } else {
      this._eComponents = _eComponents;
    }
  }).call(new Function("return this")());

  if (typeof define !== "undefined" && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
}).call(new Function("return this")());

//var o = this.buttonGroup(item.buttongroup);
//myLi.add(o);

// any controller preferences?

// any controller preferences?