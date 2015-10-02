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

        body.customElement("popup-menu", {
          init: function init() {
            var rel = this.relative();
            var abs = rel.div().absolute();
            var popDJ = abs.div("");
            var is_open = false;
            var content = popDJ.ul("dropdown-menu", function () {});
            abs.x(0).y(0);
            this.toggle = function () {
              if (!is_open) {
                rel.z(100000);
                popDJ.addClass("open");
              } else {
                popDJ.removeClass("open");
              }
              is_open = !is_open;
            };
            return content;
          }
        });

        var ddMenuModel = _data({
          text: "Valitse",
          items: [{
            text: "Valikko item 1",
            action: "select-saved-selection",
            data: "1"
          }, {
            text: "Valikko item 2",
            action: "select-saved-selection",
            data: "2"
          }]
        });

        body.customElement("dropdown-button", {
          data: {
            dataid: ddMenuModel.getID()
          },
          init: function init(data) {
            var model = _data(data.get("dataid"));
            var popper;
            var is_open = false;
            var btn = this.e("btn-default", {
              text: model.get("text") || "Dropdown",
              icon: model.get("icon") || "circle-arrow-down"
            }).on("click", function () {
              popper.toggle();
            });
            popper = this.div().e("popup-menu");
            popper.mvc(model.items, function (item) {
              return _e("li", function () {
                this.a({
                  href: "#"
                }).text(item.text()).on("click", function () {
                  this.send(item.get("action"), item.get("data"));
                });
              });
            });
            this.toggle = function () {
              popper.toggle();
            };
            this._dom.style.display = "inline-block";
          },
          tagName: "span"
        });

        var id_cnt = 1;
        var treeDemoData = _data({
          id: id_cnt++,
          items: [{
            id: id_cnt++,
            name: "topitem 1",
            icon: "user",
            selected: false,
            items: [{
              id: id_cnt++,
              name: "Item1",
              selected: false
            }, {
              id: id_cnt++,
              name: "item 2",
              selected: true
            }, {
              id: id_cnt++,
              name: "item 3",
              selected: false
            }, {
              id: id_cnt++,
              name: "item 4",
              selected: false
            }]
          }, {
            name: "topitem 2",
            icon: "user",
            id: id_cnt++,
            selected: false,
            items: [{
              id: id_cnt++,
              name: "item 5",
              selected: false
            }, {
              id: id_cnt++,
              name: "item 6",
              selected: false
            }, {
              id: id_cnt++,
              name: "item 7",
              selected: false
            }, {
              id: id_cnt++,
              name: "item 8",
              selected: false
            }]
          }, {
            id: id_cnt++,
            name: "topitem 3",
            icon: "user",
            selected: false,
            items: [{
              id: id_cnt++,
              name: "item 9",
              selected: false
            }, {
              id: id_cnt++,
              name: "item 10",
              selected: false
            }, {
              id: id_cnt++,
              name: "item 11",
              selected: true
            }, {
              id: id_cnt++,
              name: "item 12",
              selected: false
            }]
          }]
        });

        body.customElement("tree-select", {
          css: function css(myCss) {
            myCss.bind(".treeItem", {
              cursor: "pointer"
            });
            myCss.bind(".list-icon", {
              width: "1.3em",
              "line-height": "1.7em",
              "display": "inline-block"
            });
            myCss.bind(".level-1", {
              padding: "5px",
              "color": "#eee",
              "background-color": "#4a89dc"
            });
            myCss.bind(".level-2", {
              padding: "0px"
            });
            myCss.bind(".list-select", {
              padding: "5px",
              "display": "inline-block"
            });
            myCss.bind(".list-select-sub", {
              padding: "5px",
              "display": "inline-block"
            });
            myCss.bind(".list-1", {
              padding: "5px",
              "display": "inline-block"
            });
            myCss.bind(".list-select-item .selected", {
              color: "black",
              "background-color": "#fff"
            });
            myCss.bind(".list-select-item", {
              color: "#777",
              "background-color": "#eee"
            });
          },
          data: {
            dataid: treeDemoData.getID(),
            firstLevel: "items",
            secondLevel: "items"
          },
          init: function init(data) {

            var model = _data(data.get("dataid"));
            var level_1 = data.get("firstLevel");
            var level_2 = data.get("secondLevel");
            var default_icon = data.get("defaultIcon");

            var didAll = false;

            var tools = this.div("tools", function () {
              this.e("btn-default").text("Valitse kaikki").on("click", function () {

                var cnt = 0,
                    total = 0;
                model[level_1].forEach(function (g) {
                  g[level_2].forEach(function (g) {
                    if (g.get("selected")) cnt++;
                    total++;
                  });
                });
                if (cnt == 0) didAll = false;
                if (didAll) {
                  model[level_1].forEach(function (g) {
                    g.set("selected", false);
                    g[level_2].forEach(function (g) {
                      g.set("selected", false);
                    });
                  });
                  didAll = false;
                } else {
                  model[level_1].forEach(function (g) {
                    g.set("selected", true);
                    g[level_2].forEach(function (g) {
                      g.set("selected", true);
                    });
                  });
                  didAll = true;
                }
              });
              this.e("btn-default", {
                icon: "fast-backward",
                text: "Peruuta"
              }).on("click", function () {
                model.undoStep();
              });
              this.e("btn-default", {
                icon: "fast-forward",
                text: "Uudelleen"
              }).on("click", function () {
                model.redoStep();
              });
            });

            this.div("list-select").tree(model[level_1], function (item, level) {
              var o = _e("div");
              o.addClass("list-" + level);
              if (level == 1) {
                var heading = o.div("level-" + level);
              } else {
                var heading = o.span("level-" + level);
              }
              // <span class="input-group-addon" id="basic-addon1">@</span>
              var icon = heading.div("list-icon");
              if (default_icon || item.get("icon")) {

                icon.span("glyphicon glyphicon-" + (item.get("icon") || default_icon));
              }
              heading.addClass("clickable");
              o.addClass("treeItem");
              o.addClass("list-select-item");
              if (!item.get("selected")) {
                item.set("selected", false);
              }
              if (level > 1) {
                heading.e("bs-checkbox", {
                  dataid: item.getID(),
                  varName: "selected"
                });
              }
              heading.span().text(" ");
              var name = heading.span("dragLabel").bind(item, "name");

              if (item.get("selected")) o.addClass("selected");
              item.on("selected", function () {
                if (item.get("selected")) o.addClass("selected");
                if (!item.get("selected")) o.removeClass("selected");
              });

              var bAll = true;
              o.on("click", function () {
                if (level > 1) {
                  item.set("selected", !item.get("selected"));
                } else {
                  item[level_2].forEach(function (g) {
                    g.set("selected", bAll);
                  });
                  bAll = !bAll;
                }
              });
              o.touchclick();
              this.subTree(item[level_2], o.div("list-select-sub"));
              return o;
            });
            return tools;
          }
        });
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

        body.customElement("bs-checkbox", {
          data: {
            icon: "glyphicon glyphicon-check"
          },
          css: function css(myCss) {},
          init: function init(data) {

            if (data.get("dataid")) {
              var model = _data(data.get("dataid")),
                  variableName = data.get("varName");
              var ch = _e("span");
              ch.touchclick();
              ch._type = "checkbox";
              ch.addClass("glyphicon glyphicon-check");
              ch.bind(model, variableName, function (v) {
                var on = "glyphicon glyphicon-check";
                var off = "glyphicon glyphicon-unchecked";
                if (v) {
                  ch.removeClass(off);
                  ch.addClass(on);
                } else {
                  ch.removeClass(on);
                  ch.addClass(off);
                }
              });
              this.add(ch);
              return ch;
            }
          },
          tagName: "span"
        });

        body.customElement("bs-panel", {
          css: function css(myCss) {},
          init: function init(data) {

            this.addClass("panel panel-default");
            this.panelHead = this.div("panel-heading");
            this.panelHead.span().bind(this.props(), "title");

            this.panelBody = this.div("panel-body");
            this.panelFooter = this.div("panel-footer");

            return this.panelBody;
          }
        });

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

        var demoData = _data({
          items: [{
            name: "topitem 1",
            selected: false,
            items: [{
              name: "item 1",
              selected: false
            }, {
              name: "item 2",
              selected: true
            }, {
              name: "item 3",
              selected: false
            }, {
              name: "item 4",
              selected: false
            }]
          }, {
            name: "topitem 2",
            selected: false,
            items: [{
              name: "item 5",
              selected: false
            }, {
              name: "item 6",
              selected: false
            }, {
              name: "item 7",
              selected: false
            }, {
              name: "item 8",
              selected: false
            }]
          }, {
            name: "topitem 3",
            selected: false,
            items: [{
              name: "item 9",
              selected: false
            }, {
              name: "item 10",
              selected: false
            }, {
              name: "item 11",
              selected: false
            }, {
              name: "item 12",
              selected: false
            }]
          }]
        });

        body.customElement("select-tree", {
          css: function css(myCss) {},
          data: {
            dataid: demoData.getID(),
            firstLevel: "items",
            secondLevel: "items"
          },
          init: function init(data) {

            var model = _data(data.get("dataid"));
            var level_1 = data.get("firstLevel");
            var level_2 = data.get("secondLevel");

            var didAll = false;
            this.e("btn-default").text("Valitse kaikki").on("click", function () {

              var cnt = 0,
                  total = 0;
              model[level_1].forEach(function (g) {
                g[level_2].forEach(function (g) {
                  if (g.get("selected")) cnt++;
                  total++;
                });
              });
              if (cnt == 0) didAll = false;
              if (didAll) {
                model[level_1].forEach(function (g) {
                  g.set("selected", false);
                  g[level_2].forEach(function (g) {
                    g.set("selected", false);
                  });
                });
                didAll = false;
              } else {
                model[level_1].forEach(function (g) {
                  g.set("selected", true);
                  g[level_2].forEach(function (g) {
                    g.set("selected", true);
                  });
                });
                didAll = true;
              }
            });

            this.ul("nav nav-pills").tree(model[level_1], function (item, level) {
              var o = _e("li");
              o.addClass("clickable");
              o.addClass("list-group-item");
              if (!item.get("selected")) {
                item.set("selected", false);
              }
              if (level > 1) {
                o.e("bs-checkbox", {
                  dataid: item.getID(),
                  varName: "selected"
                });
              }
              o.span().text(" ");
              var name = o.span("dragLabel").bind(item, "name");

              var bAll = true;
              o.on("click", function () {
                if (level > 1) {
                  item.set("selected", !item.get("selected"));
                } else {
                  item.groups.forEach(function (g) {
                    g.set("selected", bAll);
                  });
                  bAll = !bAll;
                }
              });
              o.touchclick();
              this.subTree(item[level_2], o.ul());
              return o;
            });
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
                "color": _e().mix("red", baseColor)
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
              if (data.get("height")) {
                input.height(data.get("height"));
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

              return input;
            },
            tagName: "div"
          });
        };
        paper_input(body, "paper-input", "#4a89dc");
        paper_input(body, "paper-textarea", "#4a89dc", "textarea");

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
              var theText = this.span().bind(data, "text");
              this.on("click", function () {
                this.e("paper-circle");
              });
              return theText;
            },
            tagName: "div"
          });
        };
        create_btn(body, "paper-button", "gray", "0px");
        create_btn(body, "pri-button", "gray", "0px");
        create_btn(body, "danger-button", "red", "0px");
        create_btn(body, "warning-button", "yellow", "0px");

        var alert_info = function alert_info(scope, name, color, borderRadius) {
          scope.customElement(name, {
            data: {
              text: "Alert text"
            },
            css: function css(myCss) {
              var btnShadow = "0 3px 10px rgba(0, 0, 0, 0.34)";
              var myColor = _e().dim(color, 0.1);
              myCss.bind(".btn-content", {
                "display": "block",
                "padding": "0.4em 0.8em",
                "position": "relative",
                "margin-top": "0.3em",
                "margin-bottom": "0.3em",
                "overflow": "hidden",
                "cursor": "pointer",
                "color": "#fff",
                "border-radius": "4px",
                "background-color": myColor,
                "box-shadow": btnShadow
              });
              myCss.bind(".btn-content:hover", {
                "background": _e().dim(_e().mix(color, "#4a89dc"), 0.1)
              });
              myCss.animation("enter", {
                duration: "0.3s",
                "iteration-count": 1 }, {
                transform: "scale(0)"
              }, {
                transform: "scale(1)"
              });
              myCss.animation("fadeOut", {
                duration: "0.5s",
                "iteration-count": 1 }, {
                transform: "scale(1)"
              }, {
                transform: "scale(0)"
              });
              myCss.bind(".out", {
                "display": "none"
              });
            },
            init: function init(data, createOptions) {
              this.addClass("enter");
              this.addClass("btn-content");
              this.span().bind(data, "text");
              var me = this;
              setTimeout(function () {
                me.addClass("fadeOut");
                setTimeout(function () {
                  me.remove();
                }, 400);
              }, 5000);
            },
            tagName: "div"
          });
        };

        alert_info(body, "alert-info", "#4a89dc");

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

        var faq_list = function faq_list(scope, name, size, baseColor) {
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
                "height": "40px"
              });
            },
            init: function init(data) {

              var results = this.div("faq-area");

              var data_id = data.get("dataid");
              if (data_id) {
                var qList = _data(data_id);

                this.div("faq-items").mvc(qList.items, function (item) {
                  var li = _e("div").addClass("faq-item");
                  var info = _e();
                  info.p().text(item.text());
                  var b_visible = false;
                  li.e("paper-h2", {
                    text: item.heading()
                  }).on("click", function () {
                    if (!b_visible) {
                      info.show();
                    } else {
                      info.hide();
                    }
                    b_visible = !b_visible;
                  });
                  info.hide();
                  li.add(info);
                  return li;
                });
              }
            },
            tagName: "div"
          });
        };
        faq_list(body, "faq-list");

        var support_question = function support_question(scope, name, size, baseColor) {
          scope.customElement(name, {
            // The data-model for the component
            data: {
              from_title: "Sähköpostiosoite vastausta varten",
              from: "",
              please_fill_email: "Ole hyvä ja anna sähköpostiosoite",
              please_check_email: "Ole hyvä ja tarkasta, että sähköpostiosoite on oikein",
              content_title: "Palautteen aihe ja sisältö",
              content: "",
              text: "The contents of the email",
              send_title: "Lähetä"
            },
            css: function css(myCss) {
              myCss.bind(".alert-area", {
                "height": "40px"
              });
            },
            init: function init(data) {

              var alert = this.div("alert-area");

              this.e("paper-textarea", {
                title: [data, "content_title"],
                height: "5em",
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
                if (!data.get("from")) {
                  alert.clear();
                  alert.e("alert-info", {
                    text: data.get("please_fill_email")
                  });
                  return;
                }
                if (!validateEmail(data.get("from"))) {
                  alert.clear();
                  alert.e("alert-info", {
                    text: data.get("please_check_email")
                  });
                  return;
                }
                this.send("support-question", data.toPlainData(), function () {});
              });

              if (data.get("faqid")) {
                this.e("paper-h1", {
                  text: "Usein kysyttyjä kysymyksiä"
                });
                this.e("faq-list", {
                  dataid: data.get("faqid")
                });
              }
            },
            tagName: "form"
          });
        };
        support_question(body, "support-question");

        var create_frame = function create_frame(scope, name, size, baseColor) {
          scope.customElement(name, {
            // The data-model for the component
            data: {
              title: "Content frame",
              sub_title: "The subtitle",
              send_title: "Tallenna tiedot"
            },
            css: function css(myCss) {
              myCss.bind(".frameContent", {
                padding: "1em"
              });
              myCss.bind(".contentHead", {
                "border-radius": "4px 4px 0px 0px",
                "width": "100%",
                "background-color": "#3f50b5",
                "color": "white",
                "line-height": "2",
                "font-size": "2em",
                "padding": "0.3em"
              });
              myCss.bind(".contentFrame", {
                "border": "0px",
                "border-radius": "5px",
                "padding": "0em",
                "background-color": "#f7f7f7"
              });
            },
            init: function init(data) {
              this.addClass("contentFrame");

              this.div("contentHead").bind(data, "title");

              var frameDiv = this.div("frameContent");
              return frameDiv; // --- just return the content - the next place to start
            },
            tagName: "div"
          });
        };
        create_frame(body, "panel");
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

//this.li().a({href: "#"}).text("Action");
//this.li().a({href: "#"}).text("Action");
//this.li().a({href: "#"}).text("Action");

//var o = this.buttonGroup(item.buttongroup);
//myLi.add(o);

// any controller preferences?

// any controller preferences?