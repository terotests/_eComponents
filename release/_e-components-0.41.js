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
          getInitialState: function getInitialState() {
            return [{
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
            }];
          },
          meta: {
            category: "Tables"
          },
          data: {
            titles: "a,b,c,d"
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

            var myData = this.state();
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

            var model = this.state();

            // var model = _data(data.get("dataid"));
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
          getInitialState: function getInitialState() {
            return [{
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
            }];
          },
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
        _e().createClass("FileIcon", {
          meta: {
            category: "Icons"
          },
          requires: {
            css: [{
              url: "https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
            }]
          },
          data: {
            file: "Example.pdf"
          },
          css: function css(myCss) {
            myCss.bind(".fileTn", {
              "font-size": "2em",
              "display": "inline-block"
            });
          },
          init: function init() {
            var default_icon = "fa-file-o";
            var exts = {
              "fa-file-excel-o": ["xls", "xlsx", ""],
              "fa-file-word-o": ["doc", "docx", "docm", "dotx", "dott"],
              "fa-file-pdf-o": ["pdf"],
              "fa-file-audio-o": ["wav", "mp3"],
              "fa-file-movie-o": ["mp4", "mov"],
              "fa-file-powerpoint-o": ["ppt", "pptx", "pps", "pptm", "ppsx", "ppsm", "sldx", "sldm"]
            };
            this.addClass("fileTn");
            var fileName = this.props().get("file"),
                icon = default_icon;

            var fileExt = fileName.split(".").pop();
            for (var n in exts) {
              if (exts.hasOwnProperty(n)) {
                var list = exts[n];
                for (var i = 0; i < list.length; i++) {
                  if (list[i].toLowerCase() == fileExt.toLowerCase()) {
                    icon = n;
                    break;
                  }
                }
              }
            }
            this.span("fa " + icon);
          }
        });

        _e().createClass("contentToggle", {

          toggle: function toggle() {
            this.__content.toggle();
          },
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
            this.__content = content;
            return content;
          }
        });

        _e().createClass("HiddenContent", {
          meta: {
            category: "Panels",
            description: "Toggles content visible / hidden"
          },
          data: {
            title: "Show content"
          },
          css: function css(myCss) {
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
          "show-content": function showContent() {
            this._theContent.send("toggle");
            if (this.props().get("title")) ;
            if (this._header.text() == this._tClosed) {
              this._header.text(this._tOpen);
            } else {
              this._header.text(this._tClosed);
            }
          },
          init: function init() {

            this._tClosed = this.props().get("title");
            this._tOpen = this.props().get("title_open");
            this._header = this.div("show-toggler").text(this._tClosed).clickTo("show-content");

            this._theContent = this.e("contentToggle");

            return this._theContent;
          }
        });

        _e().createClass("card-big", {
          meta: {
            category: "Panels",
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
              "padding": "2em",
              "background": "#fff"
            });
            myCss.bind(".preview-head", {
              "width": "100%",
              "padding": "0.5em",
              "padding-left": "2em",
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

          init: function init() {

            var me = this;

            this.addClass("comp-preview");
            this.div("preview-head").bind(this.props(), "title").clickTo("return");

            var content = this.div("comp-preview-content");

            return content;
          }
        });

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
              "background-color": _e().mix("#666", "skyblue")
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

                this.e("HiddenContent", {
                  title: "Show Renderer",
                  title_open: "Hide"
                }, function () {
                  var fn = def.render || def.init;
                  if (fn) {
                    this.pre().text(fn.toString());
                  }
                });
                this.e("HiddenContent", {
                  title: "Show CSS",
                  title_open: "Hide"
                }, function () {
                  var fn = def.css;
                  if (fn) {
                    this.pre().text(fn.toString());
                  }
                });
                if (def.getInitialState) {
                  this.e("HiddenContent", {
                    title: "Show getInitialState",
                    title_open: "Hide"
                  }, function () {
                    var fn = def.getInitialState;
                    if (fn) {
                      this.pre().text(fn.toString());
                    }
                  });
                }

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
              this.div().text("Nothing to display!!!");
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
        this.materialize();
      });

      /**
       * @param Object body  - _e() object to initialize to
       */
      _myTrait_.materialComps = function (body) {

        _e().createClass("markDownPreview", {
          meta: {
            category: "Web Workers"
          },
          webWorkers: {
            importLibs: function importLibs() {
              if (typeof marked == "undefined") {
                importScripts("https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min.js");
              }
            },
            myWorkerFn: function myWorkerFn(viesti, callback) {
              this.importLibs();
              try {
                callback(marked(viesti));
              } catch (e) {
                callback(e.message);
              }
            }
          },
          init: function init() {
            var me = this;
            var markDown = this.e("paper-textarea", {
              title: "Write markdown here",
              value: "# Marked in browser\n\nRendered by **marked**."
            }).height(300);
            markDown.on("value", function () {
              this.send("myWorkerFn", markDown.val(), function (resp) {
                me.ref("myMessages").html(resp);
              });
            });
            markDown.trigger("value");
            this.div({
              ref: "myMessages"
            });
          }
        });

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
      _myTrait_.materialize = function (t) {
        // "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.1/css/materialize.min.css"

        _e().createClass("side-overlay", {
          meta: {
            category: "Alerts"
          },
          data: {
            title: "Hello",
            text: "This is the side overlay",
            close_text: "Close"
          },
          css: function css(myCss) {
            myCss.bind(".my-overlay", {
              "position": "fixed",
              "z-index": 2000,
              "top": "0",
              "left": 0,
              "bottom": 0,
              "width": "30%",
              "background": "#000",
              "opacity": 0.5
            });
            myCss.bind(".my-overlay-content", {
              "position": "fixed",
              "z-index": 2001,
              "top": "0",
              "left": 0,
              "bottom": 0,
              "color": "white",
              "width": "30%",
              "padding": "1em",
              "background": "none"
            });
            myCss.animation("sopenter", {
              duration: "0.9s",
              "iteration-count": 1 }, {
              "transform": "translate(-1000px,0px)"
            }, {
              "transform": "translate(0px,0px)"
            });
            myCss.animation("sopleave", {
              duration: "1s",
              "iteration-count": 1
            }, {
              "transform": "translate(0px,0px)"
            }, {
              "transform": "translate(-1000px,0px)"
            });
            myCss.bind(".out", {
              "transform": "translate(-1000px,0)"
            });
          },
          hide: function hide() {
            this.__over.addClass("sopleave");
            this.__over.addClass("out");
            this.__content.addClass("sopleave");
            var me = this;
            setTimeout(function () {
              me.remove();
              me.__over.remove();
            }, 700);
          },
          init: function init() {

            this.__over = this.div().addClass("my-overlay");
            this.__over.addClass("sopenter");
            var cont = this.div().addClass("my-overlay-content");
            cont.addClass("sopenter");
            this.__content = cont;
            if (this.props().get("width")) {
              cont.width(this.props().get("width"));
              this.__over.width(this.props().get("width"));
            }
            this.__content.on("outclick", function () {
              this.send("hide");
            });
            cont.h1().bind(this.props(), "title");
            cont.p().bind(this.props(), "text");
            cont.e("btn-primary").text(this.props().get("close_text")).on("click", function () {
              this.send("hide");
            });

            return this.__content;
          }
        });

        _e().createClass("overlay", {
          css: function css(myCss) {
            myCss.bind(".my-overlay", {
              "position": "fixed",
              "z-index": 2000,
              "top": "0",
              "left": 0,
              "bottom": 0,
              "right": 0,
              "width": "100%",
              "background": "#000",
              "opacity": 0.5
            });
            myCss.bind(".my-overlay-content", {
              "position": "fixed",
              "z-index": 2001,
              "top": "0",
              "left": 0,
              "bottom": 0,
              "right": 0,
              "width": "100%",
              "background": "none"
            });
            myCss.animation("openter", {
              duration: "0.6s",
              "iteration-count": 1 }, {
              "opacity": 0
            }, {
              "opacity": 0.5
            });
            myCss.animation("opleave", {
              duration: "0.6s",
              "iteration-count": 1 }, {
              "opacity": 0.5
            }, {
              "opacity": 0
            });
            myCss.bind("out", {
              display: "none",
              opacity: 0
            });
          },
          hide: function hide() {
            this.__over.addClass("opleave");
            this.__over.addClass("out");
          },
          init: function init() {
            this.__over = this.div().addClass("my-overlay");
            this.__over.addClass("openter");
            return this.div().addClass("my-overlay-content");
          }
        });
        /*
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        */
        _e().createClass("popWindow", {
          meta: {
            category: "Windows"
          },
          data: {
            title: "Default popup title"
          },
          css: (function (_css) {
            function css(_x) {
              return _css.apply(this, arguments);
            }

            css.toString = function () {
              return _css.toString();
            };

            return css;
          })(function (myCss) {
            /*
            css().bind("._mm_popupwindow", {
            "margin-left" : "auto",
            "margin-right" : "auto",
            "width" : "50%",
            "z-index" : 2002
            })
            */
            css().bind("._mm_popupwindow", {
              "position": "fixed",
              "z-index": 2003,
              "top": "25%",
              "left": "25%",
              "right": "25%",
              "bottom": "25%",
              "width": "50%"
            });
            myCss.bind(".popup-content", {
              "width": "50%",
              "z-index": 2001
            });
            myCss.animation("enter", {
              duration: "0.6s",
              "iteration-count": 1 }, {
              "opacity": 0,
              "transform": "scale(0,0)"
            }, {
              "opacity": 1,
              "transform": "scale(1,1)"
            });
            myCss.animation("leave", {
              duration: "0.6s",
              "iteration-count": 1 }, {
              "opacity": 1,
              "transform": "scale(1,1) rotate(0deg)"
            }, {
              "opacity": 0,
              "transform": "scale(0,0) rotate(360deg)"
            });
            myCss.bind("overandout", {
              display: "none"
            });
          }),
          closeWindow: function closeWindow() {
            var me = this,
                cont = me.__content;
            cont.addClass("leave");
            cont.addClass("overandout");
            this.__over.send("hide");
            setTimeout(function () {
              me.remove();
              over.remove();
            }, 400);
          },
          init: function init() {
            var me = this;
            var theContent;
            var over = this.e("overlay", function () {
              var cont = this.div("popup-content");
              me.__content = cont;
              cont.addClass("enter");
              cont.addClass("_mm_popupwindow");
              cont.on("outclick", function () {
                over.remove();
                me.send("closeWindow");
              });
              theContent = cont.e("card-big", {
                title: me.props().get("title")
              });
            });
            this.__over = over;
            return theContent;
          }
        });

        _e().createClass("paper-tabs", {
          meta: {
            category: "Tabs"
          },
          requires: {
            css: [{
              url: "https://fonts.googleapis.com/icon?family=Material+Icons"
            }]
          },
          css: function css(c) {
            c.bind(".p-tab", {
              display: "inline-block",
              "margin-left": "2em",
              "cursor": "pointer",
              "color": "#888",
              "border-bottom": "2px solid rgba(0,0,0,0)",
              "padding": "1em",
              "vertical-align": "top"
            });
            c.bind(".p-tab i", {
              "vertical-align": "top",
              "margin-right": "0.3em"
            });
            c.bind(".p-tab span", {
              "vertical-align": "top"
            });
            c.bind(".p-active", {
              "border-bottom": "2px solid blue",
              "color": "#333",
              "transition": "all 1s"
            });
            c.bind(".p-tabs", {
              display: "inline-block",
              "vertical-align": "top"
            });
            c.bind(".p-row", {
              "text-align": "center"
            });
          },
          getInitialState: function getInitialState() {
            return {
              items: [{
                name: "Metrics",
                icon: "language",
                action: "selectLang"
              }, {
                name: "Activity",
                icon: "trending_up",
                active: true
              }, {
                name: "Access",
                icon: "lock_open"
              }, {
                name: "Control",
                icon: "settings"
              }]
            };
          },
          init: function init() {
            this.addClass("p-row");
            var activeItem;
            this.div("p-tabs").mvc(this.model().items, function (item) {
              return _e("div", function () {
                this.addClass("p-tab");
                // <i class="material-icons dp48">dialpad</i>

                if (item.get("icon")) {
                  this.add(_e("i").addClass("material-icons").text(item.get("icon")));
                }

                var link = this.span().bind(item, "name");
                if (item.get("active")) {
                  this.addClass("p-active");
                  activeItem = this;
                }
                this.on("click", function () {
                  if (activeItem != this) {
                    if (activeItem) activeItem.removeClass("p-active");
                    this.addClass("p-active");
                    activeItem = this;
                    if (item.get("action")) this.send("tab-select", item.get("action"));
                  }
                });
              });
            });
          }
        });
      };

      /**
       * @param float t
       */
      _myTrait_.ownComps = function (t) {

        // Try loading extension
        // https://rawgit.com/terotests/displayList/master/release/displayList-0.04.js?v=2

        _e().createClass("aceEditor", {
          meta: {
            category: "Application"
          },
          getInitialState: function getInitialState() {
            return {
              code: "var msg = 'Hello World';"
            };
          },
          requires: {
            js: [{
              url: "https://cdnjs.cloudflare.com/ajax/libs/ace/1.1.1/ace.js"
            }, {
              url: "https://cdnjs.cloudflare.com/ajax/libs/ace/1.1.1/mode-html.js"
            }, {
              url: "https://cdnjs.cloudflare.com/ajax/libs/ace/1.1.1/mode-javascript.js"
            }, {
              url: "https://cdnjs.cloudflare.com/ajax/libs/ace/1.1.1/theme-monokai.js"
            }, {
              url: "https://cdnjs.cloudflare.com/ajax/libs/ace/1.1.1/theme-github.js"
            }]
          },
          init: function init() {

            var editorArea = this.div().width("100%").height(400);
            var me = this;

            var editor = ace.edit(editorArea._dom);
            editor.setValue(this.model().get("code"));;
            editor.setTheme("ace/theme/github");
            editor.getSession().setMode("ace/mode/javascript");
            editorArea._editor = editor;

            var varName = "code";
            var dObj = this.model();

            editor.getSession().on("change", function (e) {

              if (editor._noUpdates) return;
              // debugger;
              editor._noUpdates = true;
              var conv = aceCmdConvert();
              var listS = aceCmdConvert().fromAce([e]);
              var simpleList = listS;
              var item,
                  list = [];
              while (item = simpleList.pop()) {
                console.log("ACE", item);
                list.push(item);
              }
              dObj._client.addCommand([13, varName, list, null, dObj._docData.__id]);
              editor._noUpdates = false;
            });

            try {

              dObj.createWorker("ace_c", [13, varName, null, null, dObj._docData.__id], {
                editor: editor,
                data: dObj
              }, function (cmd, options) {

                var editor = options.editor,
                    dataItem = options.data;
                if (editor._noUpdates) return;
                var aceList = aceCmdConvert().runToAce(cmd[2]);
                editor._noUpdates = true;
                var s = editor.getSession();
                var doc = s.getDocument();
                doc.applyDeltas(aceList);
                editor._noUpdates = false;
              });
            } catch (e) {
              console.error(e.message);
            }

            editor.resize();

            this._editor = editor;
            this._container = editorArea;

            this.div().pre().bind(this.model(), "code");
          }
        });

        _e().createClass("d3-charts", {
          meta: {
            category: "Application"
          },
          getInitialState: function getInitialState() {
            return [{
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
            // var historicalBarChart =
            nv.addGraph(function () {
              var chart = nv.models.discreteBarChart().x(function (d) {
                return d.label;
              }).y(function (d) {
                return d.value;
              }).staggerLabels(true)
              //.staggerLabels(historicalBarChart[0].values.length > 8)
              .showValues(true).duration(250);
              d3.select(mySvg._dom).datum(targetDiv.state().toPlainData()).call(chart);
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

              var theSmile = disp.createObject("path", {
                x: 70,
                y: 40,
                bgcolor: "blue",
                w: 40,
                h: 40,
                scaleFactor: 3,
                svgPath: "M16,1.466C7.973,1.466,1.466,7.973,1.466,16c0,8.027,6.507,14.534,14.534,14.534c8.027,0,14.534-6.507,14.534-14.534C30.534,7.973,24.027,1.466,16,1.466zM20.729,7.375c0.934,0,1.688,1.483,1.688,3.312S21.661,14,20.729,14c-0.932,0-1.688-1.483-1.688-3.312S19.798,7.375,20.729,7.375zM11.104,7.375c0.932,0,1.688,1.483,1.688,3.312S12.037,14,11.104,14s-1.688-1.483-1.688-3.312S10.172,7.375,11.104,7.375zM16.021,26c-2.873,0-5.563-1.757-7.879-4.811c2.397,1.564,5.021,2.436,7.774,2.436c2.923,0,5.701-0.98,8.215-2.734C21.766,24.132,18.99,26,16.021,26z"
              });

              var theLinux = disp.createObject("path", {
                x: 60,
                y: 120,
                bgcolor: "orange",
                w: 40,
                h: 40,
                scaleFactor: 3,
                svgPath: "M11.791,25.229c1.027-0.104,1.162-1.191,0.68-1.666c-0.398-0.392-2.598-2.022-3.171-2.664C9.033,20.6,8.673,20.454,8.52,20.12c-0.352-0.771-0.598-1.869-0.151-2.658c0.081-0.144,0.133-0.078,0.071,0.22c-0.351,1.684,0.746,3.059,0.986,2.354c0.167-0.487,0.013-1.358,0.102-2.051c0.158-1.226,1.273-3.577,1.763-3.712c-0.755-1.398,0.886-2.494,0.866-3.723c-0.014-0.798,0.701,0.982,1.419,1.359c0.802,0.422,1.684-0.794,2.936-1.41c0.354-0.176,0.809-0.376,0.776-0.524c-0.146-0.718-1.644,0.886-2.979,0.939c-0.61,0.024-0.837-0.12-1.072-0.347c-0.712-0.689,0.073-0.115,1.132-0.307c0.471-0.085,0.629-0.163,1.128-0.365c0.5-0.201,1.069-0.5,1.636-0.654c0.395-0.106,0.361-0.402,0.208-0.491c-0.088-0.051-0.219-0.046-0.321,0.133c-0.244,0.419-1.383,0.661-1.74,0.771c-0.457,0.14-0.962,0.271-1.634,0.243c-1.021-0.042-0.782-0.509-1.513-0.928c-0.213-0.122-0.156-0.444,0.129-0.729c0.148-0.148,0.557-0.232,0.76-0.572c0.028-0.047,0.289-0.32,0.494-0.461c0.07-0.049,0.076-1.295-0.562-1.32c-0.543-0.021-0.697,0.398-0.675,0.818c0.022,0.419,0.245,0.765,0.393,0.764c0.285-0.004,0.019,0.311-0.138,0.361c-0.237,0.078-0.562-0.934-0.525-1.418c0.039-0.506,0.303-1.4,0.942-1.383c0.576,0.016,0.993,0.737,0.973,1.983c-0.003,0.211,0.935-0.101,1.247,0.229c0.224,0.236-0.767-2.207,1.438-2.375c0.582,0.111,1.14,0.305,1.371,1.641c-0.086,0.139,0.146,1.07-0.215,1.182c-0.438,0.135-0.707-0.02-0.453-0.438c0.172-0.418,0.004-1.483-0.882-1.42c-0.887,0.064-0.769,1.637-0.526,1.668c0.243,0.031,0.854,0.465,1.282,0.549c1.401,0.271,0.371,1.075,0.555,2.048c0.205,1.099,0.929,0.809,1.578,3.717c0.137,0.177,0.676,0.345,1.199,2.579c0.473,2.011-0.195,3.473,0.938,3.353c0.256-0.026,0.629-0.1,0.792-0.668c0.425-1.489-0.213-3.263-0.855-4.46c-0.375-0.698-0.729-1.174-0.916-1.337c0.738,0.436,1.683,1.829,1.898,2.862c0.286,1.358,0.49,1.934,0.059,3.37c0.25,0.125,0.871,0.39,0.871,0.685c-0.647-0.53-2.629-0.625-2.68,0.646c-0.338,0.008-0.594,0.034-0.811,0.293c-0.797,0.944-0.059,2.842-0.139,3.859c-0.07,0.896-0.318,1.783-0.46,2.683c-0.474-0.019-0.428-0.364-0.274-0.852c0.135-0.431,0.351-0.968,0.365-1.484c0.012-0.467-0.039-0.759-0.156-0.831c-0.118-0.072-0.303,0.074-0.559,0.485c-0.543,0.875-1.722,1.261-2.821,1.397c-1.099,0.138-2.123,0.028-2.664-0.578c-0.186-0.207-0.492,0.058-0.529,0.111c-0.049,0.074,0.18,0.219,0.352,0.533c0.251,0.461,0.49,1.159-0.105,1.479C12.83,26.314,12.316,26.221,11.791,25.229L11.791,25.229zM11.398,25.188c0.395,0.621,1.783,3.232-0.652,3.571c-0.814,0.114-2.125-0.474-3.396-0.784c-1.142-0.279-2.301-0.444-2.949-0.627c-0.391-0.108-0.554-0.25-0.588-0.414c-0.091-0.434,0.474-1.041,0.503-1.555c0.028-0.514-0.188-0.779-0.364-1.199c-0.177-0.42-0.224-0.734-0.081-0.914c0.109-0.141,0.334-0.199,0.698-0.164c0.462,0.047,1.02-0.049,1.319-0.23c0.505-0.309,0.742-0.939,0.516-1.699c0,0.744-0.244,1.025-0.855,1.366c-0.577,0.319-1.467,0.062-1.875,0.416c-0.492,0.427,0.175,1.528,0.12,2.338c-0.042,0.622-0.69,1.322-0.401,1.946c0.291,0.627,1.648,0.695,3.064,0.99c2.012,0.422,3.184,1.153,4.113,1.188c1.356,0.05,1.564-1.342,3.693-1.36c0.621-0.033,1.229-0.052,1.835-0.06c0.688-0.009,1.375-0.003,2.079,0.014c1.417,0.034,0.931,0.773,1.851,1.246c0.774,0.397,2.17,0.241,2.504-0.077c0.451-0.431,1.662-1.467,2.592-1.935c1.156-0.583,3.876-1.588,1.902-2.812c-0.461-0.285-1.547-0.588-1.639-2.676c-0.412,0.366-0.365,2.312,0.784,2.697c1.283,0.431,2.085,1.152-0.301,1.969c-1.58,0.54-1.849,0.706-3.099,1.747c-1.267,1.054-3.145,0.636-2.815-1.582c0.171-1.155,0.269-2.11-0.019-3.114c-0.142-0.49-0.211-1.119-0.114-1.562c0.187-0.858,0.651-1.117,1.106-0.293c0.285,0.519,0.385,1.122,1.408,1.171c1.607,0.077,1.926-1.553,2.439-1.627c0.343-0.05,0.686-1.02,0.425-2.589c-0.28-1.681-1.269-4.332-2.536-5.677c-1.053-1.118-1.717-2.098-2.135-3.497c-0.352-1.175-0.547-2.318-0.475-3.412c0.094-1.417-0.691-3.389-1.943-4.316c-0.782-0.581-2.011-0.893-3.122-0.88c-0.623,0.007-1.21,0.099-1.661,0.343c-1.855,1.008-2.113,2.445-2.086,4.088c0.025,1.543,0.078,3.303,0.254,4.977c-0.208,0.77-1.288,2.227-1.979,3.114C8.59,14.233,8.121,16.01,7.52,17.561c-0.321,0.828-0.862,1.2-0.908,2.265C6.6,20.122,6.61,20.891,6.894,20.672C7.98,19.829,9.343,21.95,11.398,25.188L11.398,25.188zM17.044,2.953c-0.06,0.176-0.3,0.321-0.146,0.443c0.152,0.123,0.24-0.171,0.549-0.281c0.08-0.028,0.449,0.012,0.519-0.164c0.03-0.077-0.19-0.164-0.321-0.291c-0.133-0.125-0.262-0.236-0.386-0.229C16.938,2.451,17.096,2.798,17.044,2.953L17.044,2.953zM18.934,9.35c0.115-0.121,0.174,0.207,0.483,0.402c0.244,0.154,0.481,0.04,0.545,0.354c0.044,0.225-0.097,0.467-0.284,0.436C19.35,10.486,18.596,9.705,18.934,9.35L18.934,9.35zM13.832,7.375c-0.508-0.037-0.543,0.33-0.375,0.324C13.629,7.693,13.523,7.408,13.832,7.375L13.832,7.375zM12.96,6.436c0.06-0.013,0.146,0.09,0.119,0.233c-0.037,0.199-0.021,0.324,0.117,0.325c0.022,0,0.048-0.005,0.056-0.057c0.066-0.396-0.14-0.688-0.225-0.711C12.834,6.178,12.857,6.458,12.96,6.436L12.96,6.436zM16.663,6.268c0.129,0.039,0.253,0.262,0.28,0.504c0.002,0.021,0.168-0.035,0.17-0.088c0.011-0.389-0.321-0.571-0.408-0.562C16.506,6.139,16.562,6.238,16.663,6.268L16.663,6.268zM14.765,7.423c0.463-0.214,0.625,0.118,0.465,0.171C15.066,7.648,15.065,7.345,14.765,7.423L14.765,7.423zM9.178,15.304c-0.219-0.026,0.063-0.19,0.184-0.397c0.131-0.227,0.105-0.511,0.244-0.469s0.061,0.2-0.033,0.461C9.491,15.121,9.258,15.313,9.178,15.304L9.178,15.304z"
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
              var find_or_insert_item = function find_or_insert_item(_x2, _x3) {
                var _again = true;

                _function: while (_again) {
                  var index = _x2,
                      from = _x3;
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
                    _x2 = index + 1;
                    _x3 = did_find;
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