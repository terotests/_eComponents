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
        /*
        <nav>
        <ul class="pagination">
        <li>
        <a href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        </a>
        </li>
        <li><a href="#">1</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li><a href="#">5</a></li>
        <li>
        <a href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        </a>
        </li>
        </ul>
        </nav>
        */
        /*
        <div class="progress">
        <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" 
        aria-valuemax="100" style="width: 60%;">
        60%
        </div>
        </div>
        */

        body.customElement("bs-alert", {
          meta: {
            category: "Alerts" },
          data: {
            text: "The alert text",
            type: "warning",
            timeout: 5000 },
          init: function init() {
            this.addClass("alert alert-" + (this.props().get("type") || "info"));
            this.bind(this.props(), "text");
            var me = this;
            if (this.props().get("timeout")) {
              setTimeout(function () {
                me.addClass("fadeOut");
                setTimeout(function () {
                  me.remove();
                }, 400);
              }, this.props().get("timeout"));
            }
          }
        });

        body.customElement("bs-progressbar", {
          meta: {
            category: "Indicators"
          },
          data: {
            min: 0,
            max: 100,
            value: 30
          },
          init: function init() {
            this.addClass("progress");
            var props = this.props();
            var bb = this.div("progress-bar", {
              role: "progressbar",
              "aria-valuenow": [props, "value"],
              "aria-valuemin": [props, "min"],
              "aria-valuemax": [props, "max"] });
            var total = props.get("max") - props.get("min");
            if (total > 0) {
              var update_p = function update_p() {
                var val = props.get("value") - props.get("min");
                if (isNaN(val)) val = 0;
                if (val < 0) val = 0;
                if (val > total) val = total;
                bb.width(parseInt(100 * (props.get("value") - props.get("min")) / total) + "%");
              };
              props.on("value", function () {
                update_p();
              });
              update_p();
            }
          }
        });

        // Try rendering for React target for this UI element...
        body.customElement("bs-pagination", {
          meta: {
            category: "Navigation"
          },
          data: {
            min: 1,
            viewsize: 5,
            max: 10,
            active: 1,
            start: 0
          },
          nextClick: function nextClick() {
            var max = this.props().get("max");
            if (this.activeIndex + 1 >= max) {
              return;
            }
            this.activeIndex++;
            if (this.startIndex + this.props().get("viewsize") < this.activeIndex) {
              this.startIndex++;
            }
            this.refresh_numbers();
            this.send("pagination", this.activeIndex);
          },
          prevClick: function prevClick() {
            var max = this.props().get("max");
            if (this.activeIndex - 1 < 0) {
              return;
            }
            this.activeIndex--;
            if (this.startIndex > this.activeIndex) {
              this.startIndex--;
            }
            this.refresh_numbers();
            this.send("pagination", this.activeIndex);
          },
          doSelect: function doSelect(index) {
            this.activeIndex = index;
            this.refresh_numbers();
            this.send("pagination", index);
          },
          init: function init() {
            var ul = this.ul("pagination");
            var prev = ul.li().clickTo("prevClick").a({
              href: "#",
              "aria-label": "Previous"
            }).span({
              "aria-hidden": "true"
            }).html("&laquo;");

            var me = this;
            this.refresh_numbers = function () {
              var len = me.liArray.length;
              var start = me.startIndex;
              var end = start + me.props().get("viewsize");
              var active = me.activeIndex;
              for (var i = 0; i < len; i++) {
                var li = me.liArray[i];
                var a = me.itemArray[i];

                if (i == active) {
                  li.addClass("active");
                } else {
                  li.removeClass("active");
                }
                if (i < start) {
                  li.hide();
                } else {
                  if (i > end) {
                    li.hide();
                  } else {
                    li.show();
                  }
                }
                a.text(i + 1);
              }
            };
            // --
            this.liArray = [];
            this.itemArray = [];
            this.startIndex = this.props().get("start");
            this.activeIndex = this.props().get("active");

            for (var i = 0; i < this.props().get("max"); i++) {
              var li = ul.li();
              var a = li.a({
                href: "#"
              });
              this.liArray.push(li);
              this.itemArray.push(a);
              li.clickTo("doSelect", i);
            }
            this.refresh_numbers();

            this.props().on("active", function () {
              me.refresh_numbers();
            });
            this.props().on("start", function () {
              me.refresh_numbers();
            });

            var next = ul.li().clickTo("nextClick").a({
              href: "#",
              "aria-label": "Previous"
            }).span({
              "aria-hidden": "true"
            }).html("&raquo;");
          },
          tagName: "nav"
        });

        var testData = _data([{
          label: "Row1",
          items: [{
            value: "value1",
            type: "String"
          }, {
            value: "value2",
            type: "String"
          }, {
            value: "value3",
            type: "String"
          }]
        }, {
          label: "Row2",
          items: [{
            value: "value4",
            type: "String"
          }, {
            value: "value5",
            type: "String"
          }, {
            value: "value6",
            type: "String"
          }]
        }, {
          label: "Row3",
          items: [{
            value: "value7",
            type: "String"
          }, {
            value: "value8",
            type: "String"
          }, {
            value: "value9",
            type: "String"
          }]
        }]);

        body.customElement("bs-table", {
          meta: {
            category: "Tables"
          },
          data: {
            titles: "a,b,c,d",
            dataid: testData.getID()
          },
          init: function init() {

            var tbl = _e("table"),
                body = _e("tbody");

            tbl.addClass("table table-striped");
            this.add(tbl);
            tbl.add(body);

            var titles = this.props().get("titles");

            if (titles) {
              var parts = titles.split(",");
              var head = _e("tr");
              parts.forEach(function (n) {
                head.add(_e("th").text(n));
              });
              body.add(head);
            }

            var dataid = this.props().get("dataid");
            if (dataid) {
              var myData = _data(dataid);
              body.mvc(myData, function (row) {
                var head = _e("tr");
                if (row.get("label")) {
                  var th = _e("th");
                  th.bind(row, "label");
                  head.add(th);
                }
                row.items.forEach(function (cell) {
                  var td = _e("td");
                  td.bind(cell, "value");
                  head.add(td);
                });
                return head;
              });
            }
          }
        });

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
          meta: {
            category: "Buttons"
          },
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
          meta: {
            category: "Multiselect"
          },
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

            var myself = this;

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

                if (item.get("selected")) {
                  o.addClass("selected");
                  tools.send("selected", item.getID());
                }
                if (!item.get("selected")) {
                  o.removeClass("selected");
                  tools.send("unselected", item.getID());
                }
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
              if (level == 1) this.subTree(item[level_2], o.div("list-select-sub"));
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

        var cbTestData = _data({
          selected: "true"
        });

        body.customElement("bs-checkbox", {
          meta: {
            category: "Checkbox",
            unlisted: true
          },
          data: {
            icon: "glyphicon glyphicon-check",
            dataid: cbTestData.getID(),
            varName: "selected"
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
          data: {
            title: "Default title"
          },
          meta: {
            category: "Panels"
          },
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
            meta: {
              category: "Buttons"
            },
            data: {
              text: "Button text",
              action: "default-action",
              data: "default-data"
            },
            css: function css(myCss) {},
            init: function init(data, createOptions) {
              this.addClass("btn btn-" + type);
              bsSetItemContent(data, this);
              this.on("click", function () {
                var act = this.props().get("action");
                if (act) this.send(act, this.props().get("data"));
              });
            },
            tagName: "button"
          });
        };

        create_bs_btn(body, "primary");
        create_bs_btn(body, "danger");
        create_bs_btn(body, "warning");
        create_bs_btn(body, "default");

        var tabsDemoData = _data([{
          text: "tab1",
          action: "tab-selected",
          data: "tab1"
        }, {
          text: "tab2",
          action: "tab-selected",
          data: "tab2"
        }, {
          text: "tab3",
          active: true,
          action: "tab-selected",
          data: "tab3"
        }, {
          text: "tab4",
          action: "tab-selected",
          data: "tab4"
        }]);

        body.customElement("tabs", {
          meta: {
            category: "Tabs"
          },
          data: {
            text: "Button text",
            dataid: tabsDemoData.getID()
          },
          css: function css(myCss) {
            myCss.bind(".nav", {
              cursor: "pointer"
            });
          },
          init: function init(data) {
            var dataid = this.props().get("dataid");
            if (dataid) {
              var items = _data(dataid);
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
                  var action = item.get("action");
                  var data = item.get("data");
                  if (action) {
                    this.send(action, data || item.getID());
                  }
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
          meta: {
            category: "Multiselect"
          },
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

      /**
       * @param float t
       */
      _myTrait_.extras = function (t) {

        _e().createClass("componentPreviewFull", {
          meta: {
            category: "Metadata",
            description: "Displays full preview of a given component"
          },
          data: {
            name: "alert-info"
          },
          css: function css(myCss) {
            myCss.bind(".comp-preview", {
              "width": "100%",
              "display": "inline-block",
              "padding": "0em",
              "margin": "1em",
              "overflow": "hidden",
              "box-shadow": "0px 4px 16px #444"
            });
            myCss.bind(".comp-preview-content", {
              "padding": "2em" });
            myCss.bind(".preview-head", {
              "width": "100%",
              "padding": "0.5em",
              "color": "white",
              "background-color": "#666"
            });
            myCss.bind(".close-preview", {
              "width": "100%",
              "padding": "1em",
              "font-size": "0.7em",
              "color": "#777"
            });
            myCss.bind(".close-preview:hover", {
              "text-decoration": "underline",
              "color": "orange",
              "cursor": "pointer"
            });
            myCss.bind(".show-toggler", {
              "width": "100%",
              "padding-top": "0.6em",
              "font-size": "0.7em",
              "color": "#777"
            });
            myCss.bind(".show-toggler:hover", {
              "text-decoration": "underline",
              "color": "orange",
              "cursor": "pointer"
            });
          },
          "return": function _return() {
            this.popView();
          },
          "show-css": function showCss() {
            var o = this.ref("cssCode");
            o.clear();
            if (this._hasCssVisible) {
              this._hasCssVisible = false;
              return;
            }
            var classList = this.getRegisteredClasses();
            var comp = classList[this.props().get("name")];
            var fn = comp.css;
            if (fn) {
              o.pre().text(fn.toString());
            }
            this._hasCssVisible = true;
          },
          "show-render": function showRender() {
            var o = this.ref("renderCode");
            o.clear();
            if (this._hasRenderVisible) {
              this._hasRenderVisible = false;
              return;
            }
            var classList = this.getRegisteredClasses();
            var comp = classList[this.props().get("name")];
            var fn = comp.render || comp.init;
            if (fn) {
              o.pre().text(fn.toString());
            }
            this._hasRenderVisible = true;
          },
          init: function init() {

            var componentName = this.props().get("name");
            var me = this;
            var classList = this.getRegisteredClasses();
            if (componentName) {

              this.sendHandler("*", function (msg, res, err, url) {
                var out = me.ref("handlerOutput");
                out.clear();
                out.div().text("message  '" + url + "'");
                out.pre().text(JSON.stringify(msg));
              });

              this.addClass("comp-preview");
              this.div("preview-head").text(componentName).clickTo("return");
              this.div("close-preview").text("close").clickTo("return");

              this.div(function () {

                this.addClass("comp-preview-content");
                this.div("handlerOutput", {
                  ref: "handlerOutput"
                });
                this.e(componentName);

                this.div().text("To create the element use");
                var initDefs = {};
                var def = classList[componentName];
                if (def.data) initDefs = def.data;
                this.pre().text("_e('" + componentName + "', " + JSON.stringify(initDefs, null, 2) + ")");

                this.div("show-toggler").text("show render code").clickTo("show-render");
                this.div("sourceArea", {
                  ref: "renderCode"
                });

                this.div("show-toggler").text("show css code").clickTo("show-css");
                this.div("sourceArea", {
                  ref: "cssCode"
                });
                /*
                this.h3().text("render function");
                var comp = classList[componentName];
                var fn = comp.render || comp.init;
                if(fn) {
                this.pre().text(fn.toString());
                }
                */
              });
            } else {
              this.div().text("Nothing to display");
            }
          }
        });

        _e().createClass("componentPreview", {
          meta: {
            category: "Metadata"
          },
          data: {
            name: "alert-info"
          },
          css: function css(myCss) {
            myCss.bind(".comp-preview", {
              "width": "20%",
              "display": "inline-block",
              "padding": "0em",
              "height": "300px",
              "margin": "1em",
              "overflow": "hidden",
              "box-shadow": "0px 4px 16px #444"
            });
            myCss.bind(".comp-preview-content", {
              "width": "200%",
              "display": "inline-block",
              "padding": "3em",
              "transform-origin": "0 0",
              transform: "scale(0.5, 0.5)"
            });
            myCss.bind(".preview-head", {
              "width": "100%",
              "padding": "0.5em",
              "font-size": "0.8em",
              "color": "white",
              "background-color": "#666"
            });
          },
          init: function init() {
            this.sendHandler("*", function (msg, res, err, url) {});
            var componentName = this.props().get("name");
            if (componentName) {
              this.addClass("comp-preview");
              this.div("preview-head").text(componentName);
              this.e("div", function () {
                this.addClass("comp-preview-content");
                this.e(componentName);
              });
            } else {
              this.div().text("Nothing to display");
            }
          }
        });

        _e().createClass("registeredComponents", {
          meta: {
            category: "Metadata",
            description: "Displays all registered components in the system"
          },
          init: function init() {
            var classList = this.getRegisteredClasses();
            var me = this;
            this.e("paper-h1", {
              text: "Currently registered components"
            });
            Object.keys(classList).forEach(function (n) {
              if (n == "registeredComponents") return; // avoid recursion :)
              me.e("componentPreview", {
                name: n
              }).on("click", function () {
                me.pushView(_e("componentPreviewFull", {
                  name: n
                }));
              });
            });
          }
        });

        _e().createClass("registeredComponentsMenu", {
          meta: {
            category: "Metadata",
            description: "Displays all registered components in the system"
          },
          init: function init() {
            var classList = this.getRegisteredClasses();
            var me = this;
            var menu = this.e("v-menu", {
              dataid: _data({
                items: []
              }).getID()
            });
            Object.keys(classList).forEach(function (n) {
              if (n == "registeredComponents") return; // avoid recursion :)
              if (n == "registeredComponentsMenu") return;
              if (n == "registeredComponentBrowser") return;

              var data = classList[n];

              var heading;
              try {
                if (data.meta.unlisted) return;
                var heading = data.meta.category;
              } catch (e) {
                heading = "Misc";
                return;
              }

              menu.pushToPath(heading, {
                name: n,
                action: "show-component",
                data: n
              });
            });
          }
        });

        _e().createClass("registeredComponentBrowser", {
          meta: {
            category: "Metadata",
            description: "Displays full preview of a given component"
          },
          css: function css(myCss) {
            var smallMedia = myCss.forMedia("@media screen and (max-width: 480px)");
            smallMedia.bind(".menuLeft", {
              display: "none"
            });
            myCss.bind(".menuLeft", {
              "width": "20%",
              "display": "inline-block",
              "vertical-align": "top"
            });
            myCss.bind(".areaRight", {
              "width": "70%",
              "display": "inline-block",
              "vertical-align": "top"
            });
          },
          "show-component": function showComponent(name) {
            if (name) this.displayArea.pushView(_e("componentPreviewFull", {
              name: name
            }));
          },
          init: function init() {
            this.div("menuLeft").e("registeredComponentsMenu");
            this.displayArea = this.div("areaRight");
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

        this.ownComps();
        this.extras();
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
            meta: {
              category: "Inputs"
            },
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
            meta: {
              category: "Effects"
            },
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
            meta: {
              category: "Buttons"
            },
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
                var act = this.props().get("action"),
                    data = this.props().get("data");
                if (act) this.send(act, data);
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
            meta: {
              category: "Alerts"
            },
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
            meta: {
              category: "Headings"
            },
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
        paper_heading(body, "paper-h3", "1.3em", "#666");

        var send_email_comp = function send_email_comp(scope, name, size, baseColor) {
          scope.customElement(name, {
            meta: {
              category: "Application"
            },
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
            meta: {
              category: "Application"
            },
            // The data-model for the component
            data: {},
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
            meta: {
              category: "Application"
            },
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
            meta: {
              category: "Panels"
            },
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

      /**
       * @param float t
       */
      _myTrait_.ownComps = function (t) {

        // Try loading extension
        // https://rawgit.com/terotests/displayList/master/release/displayList-0.04.js?v=2

        //
        _e().createClass("d3-charts", {
          meta: {
            category: "Application"
          },
          requires: {
            js: [{
              url: "https://cdnjs.cloudflare.com/ajax/libs/d3/3.2.2/d3.v3.min.js"
            }, {
              url: "https://cdn.rawgit.com/novus/nvd3/v1.8.1/build/nv.d3.js"
            }],
            css: [{
              url: "https://cdn.rawgit.com/novus/nvd3/v1.8.1/build/nv.d3.css"
            }]
          },
          data: {},
          css: function css(base) {},
          init: function init() {

            // For latest working examples see:       
            // SEE: http://nvd3-community.github.io/nvd3/examples/site.html

            var targetDiv = this,
                mySvg = this.svg({
              width: 600,
              height: 400
            });
            var historicalBarChart = [{
              key: "Cumulative Return",
              values: [{
                "label": "A",
                "value": 29.765957771107
              }, {
                "label": "B",
                "value": 0
              }, {
                "label": "C",
                "value": 32.807804682612
              }, {
                "label": "D",
                "value": 196.45946739256
              }, {
                "label": "E",
                "value": 0.19434030906893
              }, {
                "label": "F",
                "value": 98.079782601442
              }, {
                "label": "G",
                "value": 13.925743130903
              }, {
                "label": "H",
                "value": 5.1387322875705
              }]
            }];
            nv.addGraph(function () {
              var chart = nv.models.discreteBarChart().x(function (d) {
                return d.label;
              }).y(function (d) {
                return d.value;
              }).staggerLabels(true)
              //.staggerLabels(historicalBarChart[0].values.length > 8)
              .showValues(true).duration(250);
              d3.select(mySvg._dom).datum(historicalBarChart).call(chart);
              nv.utils.windowResize(chart.update);
              return chart;
            });
          }
        });

        _e().createClass("view-demo", {
          meta: {
            category: "Application"
          },
          requires: {
            js: [{
              url: "https://rawgit.com/terotests/displayList/master/release/displayList-0.05.js?v=2"
            }]
          },
          data: {},
          css: function css(base) {},
          init: function init() {

            var chartDiv = this.div();
            var debugArea = this.div();
            chartDiv.width(300).height(300);
            displayView().ePlugin();

            var disp = chartDiv.displayView(300, 300, {});
            disp.on("load", function () {
              var theBox = disp.createObject("box", {
                x: 10,
                y: 10,
                bgcolor: "red",
                w: 40,
                h: 40
              });

              var theBox = disp.createObject("path", {
                x: 70,
                y: 40,
                bgcolor: "blue",
                w: 140,
                h: 140,
                svgPath: "M16,1.466C7.973,1.466,1.466,7.973,1.466,16c0,8.027,6.507,14.534,14.534,14.534c8.027,0,14.534-6.507,14.534-14.534C30.534,7.973,24.027,1.466,16,1.466zM20.729,7.375c0.934,0,1.688,1.483,1.688,3.312S21.661,14,20.729,14c-0.932,0-1.688-1.483-1.688-3.312S19.798,7.375,20.729,7.375zM11.104,7.375c0.932,0,1.688,1.483,1.688,3.312S12.037,14,11.104,14s-1.688-1.483-1.688-3.312S10.172,7.375,11.104,7.375zM16.021,26c-2.873,0-5.563-1.757-7.879-4.811c2.397,1.564,5.021,2.436,7.774,2.436c2.923,0,5.701-0.98,8.215-2.734C21.766,24.132,18.99,26,16.021,26z"
              });
            });
            // captuer events going to the
            disp._dom.addEventListener("click", function (e) {
              var el = e.srcElement;
              var dataid = el.getAttribute("data-id");
              if (dataid) {
                debugArea.pre().text("Clicked item " + dataid);
              }
            }, true);
          }
        });

        /*
        _e().createClass("user-rating", {
        meta : {
        category : "Application"
        },     
        data : {
        max : 5,
        rating : 3
        },    
        css : function(base) {
        base.bind(".rating", {
            "font-size" : "2em"
        });       
        },
        init : function() {
        // just render it once doesn't change really :/
        var cnt = this.props().get("max") || 5;
        var rating = this.props().get("rating");
        this.addClass("rating");
        for(var i=0; i<cnt; i++) {
            if(i< rating) {
                this.span("starFull").text("★");
            } else {
                this.span("star").text("☆");
            }
        }
        }
        });
        */

        _e().createClass("fluid-svg-icon", {
          data: {
            path: "M16,5.333c-7.732,0-14,4.701-14,10.5c0,1.982,0.741,3.833,2.016,5.414L2,25.667l5.613-1.441c2.339,1.317,5.237,2.107,8.387,2.107c7.732,0,14-4.701,14-10.5C30,10.034,23.732,5.333,16,5.333z",
            icon_w: 30,
            icon_h: 30,
            fill: "black",
            width: "50%"
          },
          meta: {
            category: "Images",
            unlisted: true
          },
          css: function css(myCss) {
            myCss.bind(".container", {
              cursor: "pointer",
              height: "0",
              "padding-top": "48%",
              "position": "relative"
            });
            myCss.bind("svg", {
              "position": "absolute",
              "top": "0px",
              "left": "0px" });
            /*
            .container {
            width: 50%;
            height: 0;
            padding-top: 48%;
            position: relative;
            }
            svg {
            position: absolute;
            top: 0;
            left: 0;
            }    
            */
          },
          init: function init() {
            var path = this.props().get("path");
            var cont = this.div("container");
            cont.width(this.props().get("width") || "50%");
            var svg = cont.svg({
              viewBox: "0 0 " + this.props().get("icon_w") + " " + this.props().get("icon_h")
            });
            svg.g().path({
              fill: this.props().get("fill") || "black",
              d: path
            });
            return cont;
          }

        });

        _e().createClass("v-menu", {
          meta: {
            category: "Menus"
          },
          css: function css(myCss) {
            myCss.bind(".menuStyle", {
              cursor: "pointer",
              "font-size": "0.9em"
            });
            var topHeadColor = _e().mix("#555", "#333", 0.4);
            myCss.bind(".menu-top-head", {
              cursor: "pointer",
              "background-color": topHeadColor,
              "background": "linear-gradient(" + topHeadColor + ", " + _e().dim(topHeadColor, 0.1) + ")",
              "color": "#aaa",
              "padding": "0.8em",
              "padding-left": "0.8em",
              "border-bottom": "1px solid" + _e().dim(topHeadColor, 0.2),
              "border-top": "1px solid" + _e().dim(topHeadColor, -0.2)
            });
            myCss.bind(".menu-top-head:hover", {
              "color": "white",
              "text-shadow": "1px 6px 10px #333",
              "background-color": _e().dim(topHeadColor, -0.1),
              "background": "linear-gradient(" + topHeadColor + ", " + _e().dim(topHeadColor, -0.1) + ")",
              "border-bottom": "1px solid" + _e().dim(topHeadColor, 0.2),
              "border-top": "1px solid" + _e().dim(topHeadColor, -0.2)
            });
            var subColor = _e().mix("#476392", "#aaa");
            myCss.bind(".sub-top-head", {
              cursor: "pointer",
              "padding-left": "1.2em",
              "background-color": "#eee",
              "padding": "0.8em",
              "color": "#555",
              "border-top": "1px solid" + _e().dim(subColor, 0.1)
            });
            myCss.bind(".sub-top-head:hover", {
              "color": "#222",
              "background-color": "#fff"
            });
          },
          getInitialState: function getInitialState() {
            return {
              items: [{
                name: "Effects",
                items: [{
                  name: "Cartoon",
                  action: "menuClick",
                  data: "menu-data1"
                }, {
                  name: "Movies",
                  action: "menuClick",
                  data: "menu-data2"
                }]
              }, {
                name: "Colors",
                items: [{
                  name: "Ocean",
                  action: "menuClick",
                  data: "menu-data3"
                },, {
                  name: "Sunrise",
                  action: "menuClick",
                  data: "menu-data4"
                },,]
              }]
            };
          },
          init: function init() {
            var dataid = this.props().get("dataid");
            var model;
            if (dataid) {
              model = _data(dataid);
            } else {
              model = this.state();
            }
            var me;
            // menu has this helper function
            this.pushToPath = function (path, itemData) {
              var parts = path.split("/");
              var find_or_insert_item = function find_or_insert_item(_x, _x2) {
                var _again = true;

                _function: while (_again) {
                  var index = _x,
                      from = _x2;
                  name = did_find = undefined;
                  _again = false;

                  var name = parts[index];
                  if (!name) return from;
                  if (!from.hasOwn("items")) {
                    from.set("items", []);
                  }
                  var did_find;
                  from.items.forEach(function (i) {
                    if (i.get("name") == name) did_find = i;
                  });
                  if (!did_find) {
                    from.items.push({
                      name: name,
                      items: []
                    });
                    did_find = from.items.at(from.items.length() - 1);
                  }
                  if (did_find && parts.length <= index + 1) {

                    return did_find;
                  } else {
                    _x = index + 1;
                    _x2 = did_find;
                    _again = true;
                    continue _function;
                  }
                }
              };

              var parentNode = find_or_insert_item(0, model);
              if (parentNode) {
                //me.pre().text(JSON.stringify(itemData));
                parentNode.items.push(itemData);
                //me.pre().text(JSON.stringify(parentNode.toPlainData(), null, 2));
                //me.pre().text(JSON.stringify(model.toPlainData(), null, 2));
              }
            };
            this.addClass("menuStyle");
            var me = this;
            this.div().mvc(model.items, function (item) {
              var o = _e();
              var head = o.div("menu-top-head").text(item.name());
              if (item.hasOwn("items")) {
                var subtree = o.e("contentToggle").mvc(item.items, function (subItem) {
                  var o = _e();
                  o.addClass("sub-top-head");
                  o.text(subItem.name());
                  var action = subItem.get("action");
                  if (action) {
                    o.clickTo(action, subItem.get("data"));
                  }
                  return o;
                });
                head.on("click", function () {
                  subtree.toggle();
                  var action = item.get("action");
                  if (item.get("action")) {
                    o.send(action, item.get("data"));
                  }
                });
              }
              return o;
            });
          }
        });

        _e().createClass("contentToggle", {

          init: function init() {
            var is_visible = !!this.props().get("visible");
            var content = this.div();
            if (is_visible) {
              content.show();
            } else {
              content.hide();
            }
            content.toggle = function () {
              is_visible = !is_visible;
              if (is_visible) {
                content.show();
              } else {
                content.hide();
              }
            };
            return content;
          }
        });
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

// just do nothing

// any controller preferences?

// any controller preferences?