(function(){var e={},t=function(){!function(e){e.bsComps=function(e){e.customElement("bs-alert",{meta:{category:"Alerts"},data:{text:"The alert text",type:"warning",timeout:5e3},init:function(){this.addClass("alert alert-"+(this.props().get("type")||"info")),this.bind(this.props(),"text");var e=this;this.props().get("timeout")&&setTimeout(function(){e.addClass("fadeOut"),setTimeout(function(){e.remove()},400)},this.props().get("timeout"))}}),e.customElement("bs-progressbar",{meta:{category:"Indicators"},data:{min:0,max:100,value:30},init:function(){this.addClass("progress");var e=this.props(),t=this.div("progress-bar",{role:"progressbar","aria-valuenow":[e,"value"],"aria-valuemin":[e,"min"],"aria-valuemax":[e,"max"]}),i=e.get("max")-e.get("min");if(i>0){var a=function(){var a=e.get("value")-e.get("min");isNaN(a)&&(a=0),0>a&&(a=0),a>i&&(a=i),t.width(parseInt(100*(e.get("value")-e.get("min"))/i)+"%")};e.on("value",function(){a()}),a()}}}),e.customElement("bs-pagination",{meta:{category:"Navigation"},data:{min:1,viewsize:5,max:10,active:1,start:0},nextClick:function(){var e=this.props().get("max");this.activeIndex+1>=e||(this.activeIndex++,this.startIndex+this.props().get("viewsize")<this.activeIndex&&this.startIndex++,this.refresh_numbers(),this.send("pagination",this.activeIndex))},prevClick:function(){this.props().get("max");this.activeIndex-1<0||(this.activeIndex--,this.startIndex>this.activeIndex&&this.startIndex--,this.refresh_numbers(),this.send("pagination",this.activeIndex))},doSelect:function(e){this.activeIndex=e,this.refresh_numbers(),this.send("pagination",e)},init:function(){var e=this.ul("pagination"),t=(e.li().clickTo("prevClick").a({href:"#","aria-label":"Previous"}).span({"aria-hidden":"true"}).html("&laquo;"),this);this.refresh_numbers=function(){for(var e=t.liArray.length,i=t.startIndex,a=i+t.props().get("viewsize"),n=t.activeIndex,o=0;e>o;o++){var s=t.liArray[o],r=t.itemArray[o];o==n?s.addClass("active"):s.removeClass("active"),i>o?s.hide():o>a?s.hide():s.show(),r.text(o+1)}},this.liArray=[],this.itemArray=[],this.startIndex=this.props().get("start"),this.activeIndex=this.props().get("active");for(var i=0;i<this.props().get("max");i++){var a=e.li(),n=a.a({href:"#"});this.liArray.push(a),this.itemArray.push(n),a.clickTo("doSelect",i)}this.refresh_numbers(),this.props().on("active",function(){t.refresh_numbers()}),this.props().on("start",function(){t.refresh_numbers()});e.li().clickTo("nextClick").a({href:"#","aria-label":"Previous"}).span({"aria-hidden":"true"}).html("&raquo;")},tagName:"nav"});var t=_data([{label:"Row1",items:[{value:"value1",type:"String"},{value:"value2",type:"String"},{value:"value3",type:"String"}]},{label:"Row2",items:[{value:"value4",type:"String"},{value:"value5",type:"String"},{value:"value6",type:"String"}]},{label:"Row3",items:[{value:"value7",type:"String"},{value:"value8",type:"String"},{value:"value9",type:"String"}]}]);e.customElement("bs-table",{meta:{category:"Tables"},data:{titles:"a,b,c,d",dataid:t.getID()},init:function(){var e=_e("table"),t=_e("tbody");e.addClass("table table-striped"),this.add(e),e.add(t);var i=this.props().get("titles");if(i){var a=i.split(","),n=_e("tr");a.forEach(function(e){n.add(_e("th").text(e))}),t.add(n)}var o=this.props().get("dataid");if(o){var s=_data(o);t.mvc(s,function(e){var t=_e("tr");if(e.get("label")){var i=_e("th");i.bind(e,"label"),t.add(i)}return e.items.forEach(function(e){var i=_e("td");i.bind(e,"value"),t.add(i)}),t})}}}),e.customElement("popup-menu",{init:function(){var e=this.relative(),t=e.div().absolute(),i=t.div(""),a=!1,n=i.ul("dropdown-menu",function(){});return t.x(0).y(0),this.toggle=function(){a?i.removeClass("open"):(e.z(1e5),i.addClass("open")),a=!a},n}});var i=_data({text:"Valitse",items:[{text:"Valikko item 1",action:"select-saved-selection",data:"1"},{text:"Valikko item 2",action:"select-saved-selection",data:"2"}]});e.customElement("dropdown-button",{meta:{category:"Buttons"},data:{dataid:i.getID()},init:function(e){{var t,i=_data(e.get("dataid"));this.e("btn-default",{text:i.get("text")||"Dropdown",icon:i.get("icon")||"circle-arrow-down"}).on("click",function(){t.toggle()})}t=this.div().e("popup-menu"),t.mvc(i.items,function(e){return _e("li",function(){this.a({href:"#"}).text(e.text()).on("click",function(){this.send(e.get("action"),e.get("data"))})})}),this.toggle=function(){t.toggle()},this._dom.style.display="inline-block"},tagName:"span"});var a=1,n=_data({id:a++,items:[{id:a++,name:"topitem 1",icon:"user",selected:!1,items:[{id:a++,name:"Item1",selected:!1},{id:a++,name:"item 2",selected:!0},{id:a++,name:"item 3",selected:!1},{id:a++,name:"item 4",selected:!1}]},{name:"topitem 2",icon:"user",id:a++,selected:!1,items:[{id:a++,name:"item 5",selected:!1},{id:a++,name:"item 6",selected:!1},{id:a++,name:"item 7",selected:!1},{id:a++,name:"item 8",selected:!1}]},{id:a++,name:"topitem 3",icon:"user",selected:!1,items:[{id:a++,name:"item 9",selected:!1},{id:a++,name:"item 10",selected:!1},{id:a++,name:"item 11",selected:!0},{id:a++,name:"item 12",selected:!1}]}]});e.customElement("tree-select",{meta:{category:"Multiselect"},css:function(e){e.bind(".treeItem",{cursor:"pointer"}),e.bind(".list-icon",{width:"1.3em","line-height":"1.7em",display:"inline-block"}),e.bind(".level-1",{padding:"5px",color:"#eee","background-color":"#4a89dc"}),e.bind(".level-2",{padding:"0px"}),e.bind(".list-select",{padding:"5px",display:"inline-block"}),e.bind(".list-select-sub",{padding:"5px",display:"inline-block"}),e.bind(".list-1",{padding:"5px",display:"inline-block"}),e.bind(".list-select-item .selected",{color:"black","background-color":"#fff"}),e.bind(".list-select-item",{color:"#777","background-color":"#eee"})},data:{dataid:n.getID(),firstLevel:"items",secondLevel:"items"},init:function(e){var t=_data(e.get("dataid")),i=e.get("firstLevel"),a=e.get("secondLevel"),n=e.get("defaultIcon"),o=!1,s=this.div("tools",function(){this.e("btn-default").text("Valitse kaikki").on("click",function(){var e=0,n=0;t[i].forEach(function(t){t[a].forEach(function(t){t.get("selected")&&e++,n++})}),0==e&&(o=!1),o?(t[i].forEach(function(e){e.set("selected",!1),e[a].forEach(function(e){e.set("selected",!1)})}),o=!1):(t[i].forEach(function(e){e.set("selected",!0),e[a].forEach(function(e){e.set("selected",!0)})}),o=!0)}),this.e("btn-default",{icon:"fast-backward",text:"Peruuta"}).on("click",function(){t.undoStep()}),this.e("btn-default",{icon:"fast-forward",text:"Uudelleen"}).on("click",function(){t.redoStep()})});return this.div("list-select").tree(t[i],function(e,t){var i=_e("div");if(i.addClass("list-"+t),1==t)var o=i.div("level-"+t);else var o=i.span("level-"+t);var r=o.div("list-icon");(n||e.get("icon"))&&r.span("glyphicon glyphicon-"+(e.get("icon")||n)),o.addClass("clickable"),i.addClass("treeItem"),i.addClass("list-select-item"),e.get("selected")||e.set("selected",!1),t>1&&o.e("bs-checkbox",{dataid:e.getID(),varName:"selected"}),o.span().text(" ");o.span("dragLabel").bind(e,"name");e.get("selected")&&i.addClass("selected"),e.on("selected",function(){e.get("selected")&&(i.addClass("selected"),s.send("selected",e.getID())),e.get("selected")||(i.removeClass("selected"),s.send("unselected",e.getID()))});var c=!0;return i.on("click",function(){t>1?e.set("selected",!e.get("selected")):(e[a].forEach(function(e){e.set("selected",c)}),c=!c)}),i.touchclick(),1==t&&this.subTree(e[a],i.div("list-select-sub")),i}),s}});var o=function(e,t){e.get("icon")&&(t.span(t.str(["glyphicon glyphicon-",e.get("icon")])),t.span().html("&nbsp;")),e.get("iconImg")&&aa.img("iconImg",{src:e.get("iconImg")}),e.get("leftBadge")&&t.span("badge").text(e.get("leftBadge")),e.buttongroup,t.span().bind(e,"text"),e.get("rightBadge")&&t.span("badge").bind(e,"rightBadge"),e.get("active")&&t.addClass("active"),e.on("active",function(){e.get("active")?t.addClass("active"):t.removeClass("active")})},s=_data({selected:"true"});e.customElement("bs-checkbox",{meta:{category:"Checkbox",unlisted:!0},data:{icon:"glyphicon glyphicon-check",dataid:s.getID(),varName:"selected"},css:function(){},init:function(e){if(e.get("dataid")){var t=_data(e.get("dataid")),i=e.get("varName"),a=_e("span");return a.touchclick(),a._type="checkbox",a.addClass("glyphicon glyphicon-check"),a.bind(t,i,function(e){var t="glyphicon glyphicon-check",i="glyphicon glyphicon-unchecked";e?(a.removeClass(i),a.addClass(t)):(a.removeClass(t),a.addClass(i))}),this.add(a),a}},tagName:"span"}),e.customElement("bs-panel",{data:{title:"Default title"},meta:{category:"Panels"},css:function(){},init:function(){return this.addClass("panel panel-default"),this.panelHead=this.div("panel-heading"),this.panelHead.span().bind(this.props(),"title"),this.panelBody=this.div("panel-body"),this.panelFooter=this.div("panel-footer"),this.panelBody}});var r=function(e,t){e.customElement("btn-"+t,{meta:{category:"Buttons"},data:{text:"Button text",action:"default-action",data:"default-data"},css:function(){},init:function(e){this.addClass("btn btn-"+t),o(e,this),this.on("click",function(){var e=this.props().get("action");e&&this.send(e,this.props().get("data"))})},tagName:"button"})};r(e,"primary"),r(e,"danger"),r(e,"warning"),r(e,"default");var c=_data([{text:"tab1",action:"tab-selected",data:"tab1"},{text:"tab2",action:"tab-selected",data:"tab2"},{text:"tab3",active:!0,action:"tab-selected",data:"tab3"},{text:"tab4",action:"tab-selected",data:"tab4"}]);e.customElement("tabs",{meta:{category:"Tabs"},data:{text:"Button text",dataid:c.getID()},css:function(e){e.bind(".nav",{cursor:"pointer"})},init:function(){var e=this.props().get("dataid");if(e){var t=_data(e),i=this.ul("nav nav-tabs");i.attr("role","tablist"),i.mvc(t,function(e){var i=_e("li"),a=i.a();return o(e,a),e.get("active")&&i.addClass("active"),e.on("active",function(){e.get("active")?i.addClass("active"):i.removeClass("active")}),i.on("click",function(){t.forEach(function(e){e.set("active",!1)}),e.set("active",!0);var i=e.get("action"),a=e.get("data");i&&this.send(i,a||e.getID())}),i})}}});var d=_data({items:[{name:"topitem 1",selected:!1,items:[{name:"item 1",selected:!1},{name:"item 2",selected:!0},{name:"item 3",selected:!1},{name:"item 4",selected:!1}]},{name:"topitem 2",selected:!1,items:[{name:"item 5",selected:!1},{name:"item 6",selected:!1},{name:"item 7",selected:!1},{name:"item 8",selected:!1}]},{name:"topitem 3",selected:!1,items:[{name:"item 9",selected:!1},{name:"item 10",selected:!1},{name:"item 11",selected:!1},{name:"item 12",selected:!1}]}]});e.customElement("select-tree",{meta:{category:"Multiselect"},css:function(){},data:{dataid:d.getID(),firstLevel:"items",secondLevel:"items"},init:function(e){var t=_data(e.get("dataid")),i=e.get("firstLevel"),a=e.get("secondLevel"),n=!1;this.e("btn-default").text("Valitse kaikki").on("click",function(){var e=0,o=0;t[i].forEach(function(t){t[a].forEach(function(t){t.get("selected")&&e++,o++})}),0==e&&(n=!1),n?(t[i].forEach(function(e){e.set("selected",!1),e[a].forEach(function(e){e.set("selected",!1)})}),n=!1):(t[i].forEach(function(e){e.set("selected",!0),e[a].forEach(function(e){e.set("selected",!0)})}),n=!0)}),this.ul("nav nav-pills").tree(t[i],function(e,t){var i=_e("li");i.addClass("clickable"),i.addClass("list-group-item"),e.get("selected")||e.set("selected",!1),t>1&&i.e("bs-checkbox",{dataid:e.getID(),varName:"selected"}),i.span().text(" ");var n=(i.span("dragLabel").bind(e,"name"),!0);return i.on("click",function(){t>1?e.set("selected",!e.get("selected")):(e.groups.forEach(function(e){e.set("selected",n)}),n=!n)}),i.touchclick(),this.subTree(e[a],i.ul()),i})}})},e.extras=function(){_e().createClass("card-big",{meta:{category:"Metadata",description:"Displays full preview of a given component"},data:{name:"alert-info"},css:function(e){e.bind(".comp-preview",{width:"100%",display:"inline-block",padding:"0em",margin:"1em",overflow:"hidden","box-shadow":"0px 4px 16px #444"}),e.bind(".comp-preview-content",{padding:"2em"}),e.bind(".preview-head",{width:"100%",padding:"0.5em",color:"white","background-color":"#666"}),e.bind(".close-preview",{width:"100%",padding:"1em","font-size":"0.7em",color:"#777"}),e.bind(".close-preview:hover",{"text-decoration":"underline",color:"orange",cursor:"pointer"}),e.bind(".show-toggler",{width:"100%","padding-top":"0.6em","font-size":"0.7em",color:"#777"}),e.bind(".show-toggler:hover",{"text-decoration":"underline",color:"orange",cursor:"pointer"})},"return":function(){this.popView()},init:function(){var e=(this.props().get("title"),this.div("content"));return e}}),_e().createClass("componentPreviewFull",{meta:{category:"Metadata",description:"Displays full preview of a given component"},data:{name:"alert-info"},css:function(e){e.bind(".comp-preview",{width:"100%",display:"inline-block",padding:"0em",margin:"1em",overflow:"hidden","box-shadow":"0px 4px 16px #444"}),e.bind(".comp-preview-content",{padding:"2em"}),e.bind(".preview-head",{width:"100%",padding:"0.5em",color:"white","background-color":"#666"}),e.bind(".close-preview",{width:"100%",padding:"1em","font-size":"0.7em",color:"#777"}),e.bind(".close-preview:hover",{"text-decoration":"underline",color:"orange",cursor:"pointer"}),e.bind(".show-toggler",{width:"100%","padding-top":"0.6em","font-size":"0.7em",color:"#777"}),e.bind(".show-toggler:hover",{"text-decoration":"underline",color:"orange",cursor:"pointer"})},"return":function(){this.popView()},"show-css":function(){var e=this.ref("cssCode");if(e.clear(),this._hasCssVisible)return void(this._hasCssVisible=!1);var t=this.getRegisteredClasses(),i=t[this.props().get("name")],a=i.css;a&&e.pre().text(a.toString()),this._hasCssVisible=!0},"show-render":function(){var e=this.ref("renderCode");if(e.clear(),this._hasRenderVisible)return void(this._hasRenderVisible=!1);var t=this.getRegisteredClasses(),i=t[this.props().get("name")],a=i.render||i.init;a&&e.pre().text(a.toString()),this._hasRenderVisible=!0},init:function(){var e=this.props().get("name"),t=this,i=this.getRegisteredClasses();e?(this.sendHandler("*",function(e,i,a,n){var o=t.ref("handlerOutput");o.clear(),o.div().text("message  '"+n+"'"),o.pre().text(JSON.stringify(e))}),this.addClass("comp-preview"),this.div("preview-head").text(e).clickTo("return"),this.div("close-preview").text("close").clickTo("return"),this.div(function(){this.addClass("comp-preview-content"),this.div("handlerOutput",{ref:"handlerOutput"}),this.e(e),this.div().text("To create the element use");var t={},a=i[e];a.data&&(t=a.data),this.pre().text("_e('"+e+"', "+JSON.stringify(t,null,2)+")"),this.div("show-toggler").text("show render code").clickTo("show-render"),this.div("sourceArea",{ref:"renderCode"}),this.div("show-toggler").text("show css code").clickTo("show-css"),this.div("sourceArea",{ref:"cssCode"})})):this.div().text("Nothing to display")}}),_e().createClass("componentPreview",{meta:{category:"Metadata"},data:{name:"alert-info"},css:function(e){e.bind(".comp-preview",{width:"20%",display:"inline-block",padding:"0em",height:"300px",margin:"1em",overflow:"hidden","box-shadow":"0px 4px 16px #444"}),e.bind(".comp-preview-content",{width:"200%",display:"inline-block",padding:"3em","transform-origin":"0 0",transform:"scale(0.5, 0.5)"}),e.bind(".preview-head",{width:"100%",padding:"0.5em","font-size":"0.8em",color:"white","background-color":"#666"})},init:function(){this.sendHandler("*",function(){});var e=this.props().get("name");e?(this.addClass("comp-preview"),this.div("preview-head").text(e),this.e("div",function(){this.addClass("comp-preview-content"),this.e(e)})):this.div().text("Nothing to display")}}),_e().createClass("registeredComponents",{meta:{category:"Metadata",description:"Displays all registered components in the system"},init:function(){var e=this.getRegisteredClasses(),t=this;this.e("paper-h1",{text:"Currently registered components"}),Object.keys(e).forEach(function(e){"registeredComponents"!=e&&t.e("componentPreview",{name:e}).on("click",function(){t.pushView(_e("componentPreviewFull",{name:e}))})})}}),_e().createClass("registeredComponentsMenu",{meta:{category:"Metadata",description:"Displays all registered components in the system"},init:function(){var e=this.getRegisteredClasses(),t=this.e("v-menu",{dataid:_data({items:[]}).getID()});Object.keys(e).forEach(function(i){if("registeredComponents"!=i&&"registeredComponentsMenu"!=i&&"registeredComponentBrowser"!=i){var a,n=e[i];try{if(n.meta.unlisted)return;var a=n.meta.category}catch(o){return void(a="Misc")}t.pushToPath(a,{name:i,action:"show-component",data:i})}})}}),_e().createClass("registeredComponentBrowser",{meta:{category:"Metadata",description:"Displays full preview of a given component"},css:function(e){var t=e.forMedia("@media screen and (max-width: 480px)");t.bind(".menuLeft",{display:"none"}),e.bind(".menuLeft",{width:"20%",display:"inline-block","vertical-align":"top"}),e.bind(".areaRight",{width:"70%",display:"inline-block","vertical-align":"top"})},"show-component":function(e){e&&this.displayArea.pushView(_e("componentPreviewFull",{name:e}))},init:function(){this.div("menuLeft").e("registeredComponentsMenu"),this.displayArea=this.div("areaRight")}})},e.__traitInit&&!e.hasOwnProperty("__traitInit")&&(e.__traitInit=e.__traitInit.slice()),e.__traitInit||(e.__traitInit=[]),e.__traitInit.push(function(e){var t=_e(document.body);e=e||{},e.material&&this.materialComps(e.root||t),e.bootstrap&&this.bsComps(e.root||t),this.ownComps(),this.extras()}),e.materialComps=function(e){var t=function(e){var t=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;return t.test(e)},i=function(e,i,a,n){n||(n="input"),e.customElement(i,{meta:{category:"Inputs"},data:{title:"input title",value:"the value"},css:function(e){e.bind(".input-container",{"margin-top":"0.2em","margin-bottom":"0.2em","margin-right":"0.2em"}),e.bind("input.invalid",{color:_e().mix("red",a)}),e.bind(".paper-input",{"border-radius":"0",width:"100%","font-size":"1em",outline:"none",border:"none","border-bottom":"1px solid #757575",padding:"10px 10px 10px 5px",display:"block","background-color":"#fafafa"}),e.bind(".box",{width:"100%",height:"2px","background-color":_e().mix("#4a89dc",a),transform:"scale(0,1)",opacity:1}),e.animation("input-enter",{duration:"0.5s","iteration-count":1},{width:"100%",background:"#fff",opacity:1},.3,{width:"100%",background:_e().mix(a,"white",.7),opacity:1},{width:"100%",background:"#fff",opacity:1}),e.animation("input-bar-enter",{duration:"0.5s","iteration-count":1},{opacity:0,transform:"scale(0, 1)"},{opacity:1,transform:"scale(1, 1)"},{duration:.5}),e.animation("input-bar-close",{duration:"0.5s","iteration-count":1},{opacity:0,transform:"scale(1, 1)"},{opacity:1,transform:"scale(0, 1)"},{duration:.5}),e.bind(".entered",{transform:"scale(1,1)"}),e.bind(".paper-input-title",{opacity:.6}),e.bind(".titleFocused",{opacity:.8})},init:function(e){var i,a=this.div("input-container"),o=a.div("paper-input-title").bind(e,"title"),s=a[n]("paper-input");e.get("type")&&(s.attr("type",e.get("type")),"email"==e.get("type")&&(s.attr("type","text"),s.on("value",function(){t(s.val())?s.removeClass("invalid"):s.addClass("invalid")}))),e.get("required")&&s.attr("required",!0),e.get("placeholder")&&s.attr("placeholder",e.get("placeholder")),e.get("height")&&s.height(e.get("height")),s.bind(e,"value"),s.on("focus",function(){i.removeClass("input-bar-close"),i.addClass("input-bar-enter"),i.addClass("entered"),this.addClass("input-enter"),o.addClass("titleFocused")}).on("blur",function(){i.removeClass("input-bar-enter"),i.addClass("input-bar-close"),i.removeClass("entered"),this.removeClass("input-enter"),o.removeClass("titleFocused")});var i=a.div("box");return s},tagName:"div"})};i(e,"paper-input","#4a89dc"),i(e,"paper-textarea","#4a89dc","textarea");var a=function(e,t,i,a,n){e.customElement(t,{meta:{category:"Effects"},css:function(e){n=n||.6,e.bind(".circle",{"border-radius":"50%",width:i,height:i,transform:"translate(-50%, -50%)",position:"absolute",top:0,left:0,"background-color":a}),e.animation("animate",{duration:n+"s","iteration-count":1},{opacity:0,transform:"scale(0,0)"},.1,{opacity:1,transform:"scale(0.3,0.3)"},.4,{transform:"scale(0.7,0.7)",opacity:.8},{transform:"scale(1,1)",opacity:0})},init:function(){var e=_e("div");e.relative(),this.prepend(e);var t=e.div().absolute(),i=this.mousePos();t.x(i.x).y(i.y),t.div("circle"),t.addClass("animate");setTimeout(function(){e.remove()},1e3*n)},tagName:"div"})};a(e,"paper-circle","200px","rgba(255, 255, 255, 0.25)"),a(e,"paper-circle-red","200px","rgba(255, 0, 0, 0.25)"),a(e,"paper-circle-green","200px","rgba(0, 255, 0, 0.25)"),a(e,"paper-circle-dark","200px","rgba(0, 0, 0, 0.15)"),a(e,"paper-circle-huge","1200px","rgba(255, 255, 255, 0.12)",1.4);var n=function(e,t,i,a){e.customElement(t,{meta:{category:"Buttons"},data:{text:"Button text"},css:function(e){var t="0 3px 10px rgba(0, 0, 0, 0.34)",n=_e().mix("#4a89dc",i);e.bind(".btn-content",{display:"inline-block",padding:"0.4em 0.8em",position:"relative",margin:"0.3em",overflow:"hidden",cursor:"pointer",color:"#fff","border-radius":a||0,"background-color":n,"box-shadow":t}),e.bind(".btn-content:hover",{background:_e().dim(_e().mix(i,"#4a89dc"),.1)}),e.animation("tryMe",{duration:"4s","iteration-count":1},{transform:"rotate(0deg)"},{transform:"rotate(360deg)"})},init:function(e){this.addClass("btn-content");var t=this.span().bind(e,"text");return this.on("click",function(){this.e("paper-circle");var e=this.props().get("action"),t=this.props().get("data");e&&this.send(e,t)}),t},tagName:"div"})};n(e,"paper-button","gray","0px"),n(e,"pri-button","gray","0px"),n(e,"danger-button","red","0px"),n(e,"warning-button","yellow","0px");var o=function(e,t,i){e.customElement(t,{meta:{category:"Alerts"},data:{text:"Alert text"},css:function(e){var t="0 3px 10px rgba(0, 0, 0, 0.34)",a=_e().dim(i,.1);e.bind(".btn-content",{display:"block",padding:"0.4em 0.8em",position:"relative","margin-top":"0.3em","margin-bottom":"0.3em",overflow:"hidden",cursor:"pointer",color:"#fff","border-radius":"4px","background-color":a,"box-shadow":t}),e.bind(".btn-content:hover",{background:_e().dim(_e().mix(i,"#4a89dc"),.1)}),e.animation("enter",{duration:"0.3s","iteration-count":1},{transform:"scale(0)"},{transform:"scale(1)"}),e.animation("fadeOut",{duration:"0.5s","iteration-count":1},{transform:"scale(1)"},{transform:"scale(0)"}),e.bind(".out",{display:"none"})},init:function(e){this.addClass("enter"),this.addClass("btn-content"),this.span().bind(e,"text");var t=this;setTimeout(function(){t.addClass("fadeOut"),setTimeout(function(){t.remove()},400)},5e3)},tagName:"div"})};o(e,"alert-info","#4a89dc");var s=function(e,t,i,a){e.customElement(t,{meta:{category:"Headings"},data:{text:"Default heading for the component"},css:function(e){e.bind(".h1-container",{"margin-top":"0.1em","margin-bottom":"0.2em","margin-right":"0.2em",cursor:"pointer","font-size":i,opacity:.9,color:_e().mix("#4a89dc",a,.6)}),e.bind(".box",{width:"100%",height:"2px","transform-origin":"100% 0","background-color":_e().mix("#4a89dc",a),transform:"scale(1,1)","margin-bottom":"0.4em",opacity:.5}),e.animation("box-enter",{duration:"1s","iteration-count":1},{opacity:0,transform:"scale(0, 1)"},{opacity:.5,transform:"scale(1, 1)"},{duration:.5})},init:function(e){this.div("h1-container").bind(e,"text");var t=this.div("box").addClass("box-enter");this.on("click",function(){t.removeClass("box-enter");setTimeout(function(){t.addClass("box-enter")},100)})},tagName:"div"})};s(e,"paper-h1","2em","#333"),s(e,"paper-h2","1.5em","#666"),s(e,"paper-h3","1.3em","#666");var r=function(e,t){e.customElement(t,{meta:{category:"Application"},data:{to_title:"Vastaanottaja(t)",to:"",head_title:"Sähköpostin otsikko",heading:"The e-mail heading",content_title:"Sisältö",content:"",text:"The contents of the email",send_title:"Lähetä"},css:function(){},init:function(e){this.e("paper-input",{title:[e,"to_title"],value:[e,"to"]}),this.e("paper-input",{title:[e,"head_title"],value:[e,"heading"]}),this.e("paper-textarea",{title:[e,"content_title"],value:[e,"content"]}),this.e("paper-button",{text:[e,"send_title"]}).on("click",function(){this.send("send-email",e.toPlainData(),function(){})})},tagName:"div"})};r(e,"send-email");var c=function(e,t){e.customElement(t,{meta:{category:"Application"},data:{},css:function(e){e.bind(".alert-area",{height:"40px"})},init:function(e){var t=(this.div("faq-area"),e.get("dataid"));if(t){var i=_data(t);this.div("faq-items").mvc(i.items,function(e){var t=_e("div").addClass("faq-item"),i=_e();i.p().text(e.text());var a=!1;return t.e("paper-h2",{text:e.heading()}).on("click",function(){a?i.hide():i.show(),a=!a}),i.hide(),t.add(i),t})}},tagName:"div"})};c(e,"faq-list");var d=function(e,i){e.customElement(i,{meta:{category:"Application"},data:{from_title:"Sähköpostiosoite vastausta varten",from:"",please_fill_email:"Ole hyvä ja anna sähköpostiosoite",please_check_email:"Ole hyvä ja tarkasta, että sähköpostiosoite on oikein",content_title:"Palautteen aihe ja sisältö",content:"",text:"The contents of the email",send_title:"Lähetä"},css:function(e){e.bind(".alert-area",{height:"40px"})},init:function(e){var i=this.div("alert-area");this.e("paper-textarea",{title:[e,"content_title"],height:"5em",value:[e,"content"]}),this.e("paper-input",{type:"email",required:!0,title:[e,"from_title"],value:[e,"from"]}),this.e("paper-button",{text:[e,"send_title"]}).on("click",function(){return e.get("from")?t(e.get("from"))?void this.send("support-question",e.toPlainData(),function(){}):(i.clear(),void i.e("alert-info",{text:e.get("please_check_email")})):(i.clear(),void i.e("alert-info",{text:e.get("please_fill_email")}))}),e.get("faqid")&&(this.e("paper-h1",{text:"Usein kysyttyjä kysymyksiä"}),this.e("faq-list",{dataid:e.get("faqid")}))},tagName:"form"})};d(e,"support-question");var l=function(e,t){e.customElement(t,{meta:{category:"Panels"},data:{title:"Content frame",sub_title:"The subtitle",send_title:"Tallenna tiedot"},css:function(e){e.bind(".frameContent",{padding:"1em"}),e.bind(".contentHead",{"border-radius":"4px 4px 0px 0px",width:"100%","background-color":"#3f50b5",color:"white","line-height":"2","font-size":"2em",padding:"0.3em"}),e.bind(".contentFrame",{border:"0px","border-radius":"5px",padding:"0em","background-color":"#f7f7f7"})},init:function(e){this.addClass("contentFrame"),this.div("contentHead").bind(e,"title");var t=this.div("frameContent");return t},tagName:"div"})};l(e,"panel")},e.materialize=function(){},e.ownComps=function(){_e().createClass("d3-charts",{meta:{category:"Application"},requires:{js:[{url:"https://cdnjs.cloudflare.com/ajax/libs/d3/3.2.2/d3.v3.min.js"},{url:"https://cdn.rawgit.com/novus/nvd3/v1.8.1/build/nv.d3.js"}],css:[{url:"https://cdn.rawgit.com/novus/nvd3/v1.8.1/build/nv.d3.css"}]},data:{},css:function(){},init:function(){var e=this.svg({width:600,height:400}),t=[{key:"Cumulative Return",values:[{label:"A",value:29.765957771107},{label:"B",value:0},{label:"C",value:32.807804682612},{label:"D",value:196.45946739256},{label:"E",value:.19434030906893},{label:"F",value:98.079782601442},{label:"G",value:13.925743130903},{label:"H",value:5.1387322875705}]}];nv.addGraph(function(){var i=nv.models.discreteBarChart().x(function(e){return e.label}).y(function(e){return e.value}).staggerLabels(!0).showValues(!0).duration(250);return d3.select(e._dom).datum(t).call(i),nv.utils.windowResize(i.update),i})}}),_e().createClass("view-demo",{meta:{category:"Application"},requires:{js:[{url:"https://rawgit.com/terotests/displayList/master/release/displayList-0.05.js?v=2"}]},data:{},css:function(){},init:function(){var e=this.div(),t=this.div();e.width(300).height(300),displayView().ePlugin();var i=e.displayView(300,300,{});i.on("load",function(){i.createObject("box",{x:10,y:10,bgcolor:"red",w:40,h:40}),i.createObject("path",{x:70,y:40,bgcolor:"blue",w:40,h:40,scaleFactor:3,svgPath:"M16,1.466C7.973,1.466,1.466,7.973,1.466,16c0,8.027,6.507,14.534,14.534,14.534c8.027,0,14.534-6.507,14.534-14.534C30.534,7.973,24.027,1.466,16,1.466zM20.729,7.375c0.934,0,1.688,1.483,1.688,3.312S21.661,14,20.729,14c-0.932,0-1.688-1.483-1.688-3.312S19.798,7.375,20.729,7.375zM11.104,7.375c0.932,0,1.688,1.483,1.688,3.312S12.037,14,11.104,14s-1.688-1.483-1.688-3.312S10.172,7.375,11.104,7.375zM16.021,26c-2.873,0-5.563-1.757-7.879-4.811c2.397,1.564,5.021,2.436,7.774,2.436c2.923,0,5.701-0.98,8.215-2.734C21.766,24.132,18.99,26,16.021,26z"}),i.createObject("path",{x:60,y:120,bgcolor:"orange",w:40,h:40,scaleFactor:3,svgPath:"M11.791,25.229c1.027-0.104,1.162-1.191,0.68-1.666c-0.398-0.392-2.598-2.022-3.171-2.664C9.033,20.6,8.673,20.454,8.52,20.12c-0.352-0.771-0.598-1.869-0.151-2.658c0.081-0.144,0.133-0.078,0.071,0.22c-0.351,1.684,0.746,3.059,0.986,2.354c0.167-0.487,0.013-1.358,0.102-2.051c0.158-1.226,1.273-3.577,1.763-3.712c-0.755-1.398,0.886-2.494,0.866-3.723c-0.014-0.798,0.701,0.982,1.419,1.359c0.802,0.422,1.684-0.794,2.936-1.41c0.354-0.176,0.809-0.376,0.776-0.524c-0.146-0.718-1.644,0.886-2.979,0.939c-0.61,0.024-0.837-0.12-1.072-0.347c-0.712-0.689,0.073-0.115,1.132-0.307c0.471-0.085,0.629-0.163,1.128-0.365c0.5-0.201,1.069-0.5,1.636-0.654c0.395-0.106,0.361-0.402,0.208-0.491c-0.088-0.051-0.219-0.046-0.321,0.133c-0.244,0.419-1.383,0.661-1.74,0.771c-0.457,0.14-0.962,0.271-1.634,0.243c-1.021-0.042-0.782-0.509-1.513-0.928c-0.213-0.122-0.156-0.444,0.129-0.729c0.148-0.148,0.557-0.232,0.76-0.572c0.028-0.047,0.289-0.32,0.494-0.461c0.07-0.049,0.076-1.295-0.562-1.32c-0.543-0.021-0.697,0.398-0.675,0.818c0.022,0.419,0.245,0.765,0.393,0.764c0.285-0.004,0.019,0.311-0.138,0.361c-0.237,0.078-0.562-0.934-0.525-1.418c0.039-0.506,0.303-1.4,0.942-1.383c0.576,0.016,0.993,0.737,0.973,1.983c-0.003,0.211,0.935-0.101,1.247,0.229c0.224,0.236-0.767-2.207,1.438-2.375c0.582,0.111,1.14,0.305,1.371,1.641c-0.086,0.139,0.146,1.07-0.215,1.182c-0.438,0.135-0.707-0.02-0.453-0.438c0.172-0.418,0.004-1.483-0.882-1.42c-0.887,0.064-0.769,1.637-0.526,1.668c0.243,0.031,0.854,0.465,1.282,0.549c1.401,0.271,0.371,1.075,0.555,2.048c0.205,1.099,0.929,0.809,1.578,3.717c0.137,0.177,0.676,0.345,1.199,2.579c0.473,2.011-0.195,3.473,0.938,3.353c0.256-0.026,0.629-0.1,0.792-0.668c0.425-1.489-0.213-3.263-0.855-4.46c-0.375-0.698-0.729-1.174-0.916-1.337c0.738,0.436,1.683,1.829,1.898,2.862c0.286,1.358,0.49,1.934,0.059,3.37c0.25,0.125,0.871,0.39,0.871,0.685c-0.647-0.53-2.629-0.625-2.68,0.646c-0.338,0.008-0.594,0.034-0.811,0.293c-0.797,0.944-0.059,2.842-0.139,3.859c-0.07,0.896-0.318,1.783-0.46,2.683c-0.474-0.019-0.428-0.364-0.274-0.852c0.135-0.431,0.351-0.968,0.365-1.484c0.012-0.467-0.039-0.759-0.156-0.831c-0.118-0.072-0.303,0.074-0.559,0.485c-0.543,0.875-1.722,1.261-2.821,1.397c-1.099,0.138-2.123,0.028-2.664-0.578c-0.186-0.207-0.492,0.058-0.529,0.111c-0.049,0.074,0.18,0.219,0.352,0.533c0.251,0.461,0.49,1.159-0.105,1.479C12.83,26.314,12.316,26.221,11.791,25.229L11.791,25.229zM11.398,25.188c0.395,0.621,1.783,3.232-0.652,3.571c-0.814,0.114-2.125-0.474-3.396-0.784c-1.142-0.279-2.301-0.444-2.949-0.627c-0.391-0.108-0.554-0.25-0.588-0.414c-0.091-0.434,0.474-1.041,0.503-1.555c0.028-0.514-0.188-0.779-0.364-1.199c-0.177-0.42-0.224-0.734-0.081-0.914c0.109-0.141,0.334-0.199,0.698-0.164c0.462,0.047,1.02-0.049,1.319-0.23c0.505-0.309,0.742-0.939,0.516-1.699c0,0.744-0.244,1.025-0.855,1.366c-0.577,0.319-1.467,0.062-1.875,0.416c-0.492,0.427,0.175,1.528,0.12,2.338c-0.042,0.622-0.69,1.322-0.401,1.946c0.291,0.627,1.648,0.695,3.064,0.99c2.012,0.422,3.184,1.153,4.113,1.188c1.356,0.05,1.564-1.342,3.693-1.36c0.621-0.033,1.229-0.052,1.835-0.06c0.688-0.009,1.375-0.003,2.079,0.014c1.417,0.034,0.931,0.773,1.851,1.246c0.774,0.397,2.17,0.241,2.504-0.077c0.451-0.431,1.662-1.467,2.592-1.935c1.156-0.583,3.876-1.588,1.902-2.812c-0.461-0.285-1.547-0.588-1.639-2.676c-0.412,0.366-0.365,2.312,0.784,2.697c1.283,0.431,2.085,1.152-0.301,1.969c-1.58,0.54-1.849,0.706-3.099,1.747c-1.267,1.054-3.145,0.636-2.815-1.582c0.171-1.155,0.269-2.11-0.019-3.114c-0.142-0.49-0.211-1.119-0.114-1.562c0.187-0.858,0.651-1.117,1.106-0.293c0.285,0.519,0.385,1.122,1.408,1.171c1.607,0.077,1.926-1.553,2.439-1.627c0.343-0.05,0.686-1.02,0.425-2.589c-0.28-1.681-1.269-4.332-2.536-5.677c-1.053-1.118-1.717-2.098-2.135-3.497c-0.352-1.175-0.547-2.318-0.475-3.412c0.094-1.417-0.691-3.389-1.943-4.316c-0.782-0.581-2.011-0.893-3.122-0.88c-0.623,0.007-1.21,0.099-1.661,0.343c-1.855,1.008-2.113,2.445-2.086,4.088c0.025,1.543,0.078,3.303,0.254,4.977c-0.208,0.77-1.288,2.227-1.979,3.114C8.59,14.233,8.121,16.01,7.52,17.561c-0.321,0.828-0.862,1.2-0.908,2.265C6.6,20.122,6.61,20.891,6.894,20.672C7.98,19.829,9.343,21.95,11.398,25.188L11.398,25.188zM17.044,2.953c-0.06,0.176-0.3,0.321-0.146,0.443c0.152,0.123,0.24-0.171,0.549-0.281c0.08-0.028,0.449,0.012,0.519-0.164c0.03-0.077-0.19-0.164-0.321-0.291c-0.133-0.125-0.262-0.236-0.386-0.229C16.938,2.451,17.096,2.798,17.044,2.953L17.044,2.953zM18.934,9.35c0.115-0.121,0.174,0.207,0.483,0.402c0.244,0.154,0.481,0.04,0.545,0.354c0.044,0.225-0.097,0.467-0.284,0.436C19.35,10.486,18.596,9.705,18.934,9.35L18.934,9.35zM13.832,7.375c-0.508-0.037-0.543,0.33-0.375,0.324C13.629,7.693,13.523,7.408,13.832,7.375L13.832,7.375zM12.96,6.436c0.06-0.013,0.146,0.09,0.119,0.233c-0.037,0.199-0.021,0.324,0.117,0.325c0.022,0,0.048-0.005,0.056-0.057c0.066-0.396-0.14-0.688-0.225-0.711C12.834,6.178,12.857,6.458,12.96,6.436L12.96,6.436zM16.663,6.268c0.129,0.039,0.253,0.262,0.28,0.504c0.002,0.021,0.168-0.035,0.17-0.088c0.011-0.389-0.321-0.571-0.408-0.562C16.506,6.139,16.562,6.238,16.663,6.268L16.663,6.268zM14.765,7.423c0.463-0.214,0.625,0.118,0.465,0.171C15.066,7.648,15.065,7.345,14.765,7.423L14.765,7.423zM9.178,15.304c-0.219-0.026,0.063-0.19,0.184-0.397c0.131-0.227,0.105-0.511,0.244-0.469s0.061,0.2-0.033,0.461C9.491,15.121,9.258,15.313,9.178,15.304L9.178,15.304z"})
}),i._dom.addEventListener("click",function(e){var i=e.srcElement,a=i.getAttribute("data-id");a&&t.pre().text("Clicked item "+a)},!0)}}),_e().createClass("v-menu",{meta:{category:"Menus"},css:function(e){e.bind(".menuStyle",{cursor:"pointer","font-size":"0.9em"});var t=_e().mix("#555","#333",.4);e.bind(".menu-top-head",{cursor:"pointer","background-color":t,background:"linear-gradient("+t+", "+_e().dim(t,.1)+")",color:"#aaa",padding:"0.8em","padding-left":"0.8em","border-bottom":"1px solid"+_e().dim(t,.2),"border-top":"1px solid"+_e().dim(t,-.2)}),e.bind(".menu-top-head:hover",{color:"white","text-shadow":"1px 6px 10px #333","background-color":_e().dim(t,-.1),background:"linear-gradient("+t+", "+_e().dim(t,-.1)+")","border-bottom":"1px solid"+_e().dim(t,.2),"border-top":"1px solid"+_e().dim(t,-.2)});var i=_e().mix("#476392","#aaa");e.bind(".sub-top-head",{cursor:"pointer","padding-left":"1.2em","background-color":"#eee",padding:"0.8em",color:"#555","border-top":"1px solid"+_e().dim(i,.1)}),e.bind(".sub-top-head:hover",{color:"#222","background-color":"#fff"})},getInitialState:function(){return{items:[{name:"Effects",items:[{name:"Cartoon",action:"menuClick",data:"menu-data1"},{name:"Movies",action:"menuClick",data:"menu-data2"}]},{name:"Colors",items:[{name:"Ocean",action:"menuClick",data:"menu-data3"},,{name:"Sunrise",action:"menuClick",data:"menu-data4"},,]}]}},init:function(){var e,t=this.props().get("dataid");e=t?_data(t):this.state();this.pushToPath=function(t,i){var a=t.split("/"),n=function(e,t){var i=a[e];if(!i)return t;t.hasOwn("items")||t.set("items",[]);var o;return t.items.forEach(function(e){e.get("name")==i&&(o=e)}),o||(t.items.push({name:i,items:[]}),o=t.items.at(t.items.length()-1)),o&&a.length<=e+1?o:n(e+1,o)},o=n(0,e);o&&o.items.push(i)},this.addClass("menuStyle");this.div().mvc(e.items,function(e){var t=_e(),i=t.div("menu-top-head").text(e.name());if(e.hasOwn("items")){var a=t.e("contentToggle").mvc(e.items,function(e){var t=_e();t.addClass("sub-top-head"),t.text(e.name());var i=e.get("action");return i&&t.clickTo(i,e.get("data")),t});i.on("click",function(){a.toggle();var i=e.get("action");e.get("action")&&t.send(i,e.get("data"))})}return t})}}),_e().createClass("contentToggle",{init:function(){var e=!!this.props().get("visible"),t=this.div();return e?t.show():t.hide(),t.toggle=function(){e=!e,e?t.show():t.hide()},t}})}}(this)},i=function(e,t,a,n,o,s,r,c){var d,l=this;if(!(l instanceof i))return new i(e,t,a,n,o,s,r,c);var u=[e,t,a,n,o,s,r,c];if(l.__factoryClass)if(l.__factoryClass.forEach(function(e){d=e.apply(l,u)}),"function"==typeof d){if(d._classInfo.name!=i._classInfo.name)return new d(e,t,a,n,o,s,r,c)}else if(d)return d;l.__traitInit?l.__traitInit.forEach(function(e){e.apply(l,u)}):"function"==typeof l.init&&l.init.apply(l,u)};i._classInfo={name:"_eComponents"},i.prototype=new t,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(e._eComponents=i,this._eComponents=i):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports._eComponents=i:this._eComponents=i}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(e)}).call(new Function("return this")());