(function(){var e={},t=function(){!function(e){e.bsComps=function(e){e.customElement("popup-menu",{init:function(){var e=this.relative(),t=e.div().absolute(),i=t.div(""),n=!1,a=i.ul("dropdown-menu",function(){});return t.x(0).y(0),this.toggle=function(){n?i.removeClass("open"):(e.z(1e5),i.addClass("open")),n=!n},a}});var t=_data({text:"Valitse",items:[{text:"Valikko item 1",action:"select-saved-selection",data:"1"},{text:"Valikko item 2",action:"select-saved-selection",data:"2"}]});e.customElement("dropdown-button",{meta:{category:"Buttons"},data:{dataid:t.getID()},init:function(e){{var t,i=_data(e.get("dataid"));this.e("btn-default",{text:i.get("text")||"Dropdown",icon:i.get("icon")||"circle-arrow-down"}).on("click",function(){t.toggle()})}t=this.div().e("popup-menu"),t.mvc(i.items,function(e){return _e("li",function(){this.a({href:"#"}).text(e.text()).on("click",function(){this.send(e.get("action"),e.get("data"))})})}),this.toggle=function(){t.toggle()},this._dom.style.display="inline-block"},tagName:"span"});var i=1,n=_data({id:i++,items:[{id:i++,name:"topitem 1",icon:"user",selected:!1,items:[{id:i++,name:"Item1",selected:!1},{id:i++,name:"item 2",selected:!0},{id:i++,name:"item 3",selected:!1},{id:i++,name:"item 4",selected:!1}]},{name:"topitem 2",icon:"user",id:i++,selected:!1,items:[{id:i++,name:"item 5",selected:!1},{id:i++,name:"item 6",selected:!1},{id:i++,name:"item 7",selected:!1},{id:i++,name:"item 8",selected:!1}]},{id:i++,name:"topitem 3",icon:"user",selected:!1,items:[{id:i++,name:"item 9",selected:!1},{id:i++,name:"item 10",selected:!1},{id:i++,name:"item 11",selected:!0},{id:i++,name:"item 12",selected:!1}]}]});e.customElement("tree-select",{meta:{category:"Multiselect"},css:function(e){e.bind(".treeItem",{cursor:"pointer"}),e.bind(".list-icon",{width:"1.3em","line-height":"1.7em",display:"inline-block"}),e.bind(".level-1",{padding:"5px",color:"#eee","background-color":"#4a89dc"}),e.bind(".level-2",{padding:"0px"}),e.bind(".list-select",{padding:"5px",display:"inline-block"}),e.bind(".list-select-sub",{padding:"5px",display:"inline-block"}),e.bind(".list-1",{padding:"5px",display:"inline-block"}),e.bind(".list-select-item .selected",{color:"black","background-color":"#fff"}),e.bind(".list-select-item",{color:"#777","background-color":"#eee"})},data:{dataid:n.getID(),firstLevel:"items",secondLevel:"items"},init:function(e){var t=_data(e.get("dataid")),i=e.get("firstLevel"),n=e.get("secondLevel"),a=e.get("defaultIcon"),o=!1,s=this.div("tools",function(){this.e("btn-default").text("Valitse kaikki").on("click",function(){var e=0,a=0;t[i].forEach(function(t){t[n].forEach(function(t){t.get("selected")&&e++,a++})}),0==e&&(o=!1),o?(t[i].forEach(function(e){e.set("selected",!1),e[n].forEach(function(e){e.set("selected",!1)})}),o=!1):(t[i].forEach(function(e){e.set("selected",!0),e[n].forEach(function(e){e.set("selected",!0)})}),o=!0)}),this.e("btn-default",{icon:"fast-backward",text:"Peruuta"}).on("click",function(){t.undoStep()}),this.e("btn-default",{icon:"fast-forward",text:"Uudelleen"}).on("click",function(){t.redoStep()})});return this.div("list-select").tree(t[i],function(e,t){var i=_e("div");if(i.addClass("list-"+t),1==t)var o=i.div("level-"+t);else var o=i.span("level-"+t);var r=o.div("list-icon");(a||e.get("icon"))&&r.span("glyphicon glyphicon-"+(e.get("icon")||a)),o.addClass("clickable"),i.addClass("treeItem"),i.addClass("list-select-item"),e.get("selected")||e.set("selected",!1),t>1&&o.e("bs-checkbox",{dataid:e.getID(),varName:"selected"}),o.span().text(" ");o.span("dragLabel").bind(e,"name");e.get("selected")&&i.addClass("selected"),e.on("selected",function(){e.get("selected")&&(i.addClass("selected"),s.send("selected",e.getID())),e.get("selected")||(i.removeClass("selected"),s.send("unselected",e.getID()))});var c=!0;return i.on("click",function(){t>1?e.set("selected",!e.get("selected")):(e[n].forEach(function(e){e.set("selected",c)}),c=!c)}),i.touchclick(),1==t&&this.subTree(e[n],i.div("list-select-sub")),i}),s}});var a=function(e,t){e.get("icon")&&(t.span(t.str(["glyphicon glyphicon-",e.get("icon")])),t.span().html("&nbsp;")),e.get("iconImg")&&aa.img("iconImg",{src:e.get("iconImg")}),e.get("leftBadge")&&t.span("badge").text(e.get("leftBadge")),e.buttongroup,t.span().bind(e,"text"),e.get("rightBadge")&&t.span("badge").bind(e,"rightBadge"),e.get("active")&&t.addClass("active"),e.on("active",function(){e.get("active")?t.addClass("active"):t.removeClass("active")})};e.customElement("bs-checkbox",{meta:{category:"Checkbox"},data:{icon:"glyphicon glyphicon-check"},css:function(){},init:function(e){if(e.get("dataid")){var t=_data(e.get("dataid")),i=e.get("varName"),n=_e("span");return n.touchclick(),n._type="checkbox",n.addClass("glyphicon glyphicon-check"),n.bind(t,i,function(e){var t="glyphicon glyphicon-check",i="glyphicon glyphicon-unchecked";e?(n.removeClass(i),n.addClass(t)):(n.removeClass(t),n.addClass(i))}),this.add(n),n}},tagName:"span"}),e.customElement("bs-panel",{data:{title:"Default title"},meta:{category:"Panels"},css:function(){},init:function(){return this.addClass("panel panel-default"),this.panelHead=this.div("panel-heading"),this.panelHead.span().bind(this.props(),"title"),this.panelBody=this.div("panel-body"),this.panelFooter=this.div("panel-footer"),this.panelBody}});var o=function(e,t){e.customElement("btn-"+t,{meta:{category:"Buttons"},data:{text:"Button text",action:"default-action",data:"default-data"},css:function(){},init:function(e){this.addClass("btn btn-"+t),a(e,this),this.on("click",function(){var e=this.props().get("action");e&&this.send(e,this.props().get("data"))})},tagName:"button"})};o(e,"primary"),o(e,"danger"),o(e,"warning"),o(e,"default");var s=_data([{text:"tab1",action:"tab-selected",data:"tab1"},{text:"tab2",action:"tab-selected",data:"tab2"},{text:"tab3",active:!0,action:"tab-selected",data:"tab3"},{text:"tab4",action:"tab-selected",data:"tab4"}]);e.customElement("tabs",{meta:{category:"Tabs"},data:{text:"Button text",dataid:s.getID()},css:function(e){e.bind(".nav",{cursor:"pointer"})},init:function(){var e=this.props().get("dataid");if(e){var t=_data(e),i=this.ul("nav nav-tabs");i.attr("role","tablist"),i.mvc(t,function(e){var i=_e("li"),n=i.a();return a(e,n),e.get("active")&&i.addClass("active"),e.on("active",function(){e.get("active")?i.addClass("active"):i.removeClass("active")}),i.on("click",function(){t.forEach(function(e){e.set("active",!1)}),e.set("active",!0);var i=e.get("action"),n=e.get("data");i&&this.send(i,n||e.getID())}),i})}}});var r=_data({items:[{name:"topitem 1",selected:!1,items:[{name:"item 1",selected:!1},{name:"item 2",selected:!0},{name:"item 3",selected:!1},{name:"item 4",selected:!1}]},{name:"topitem 2",selected:!1,items:[{name:"item 5",selected:!1},{name:"item 6",selected:!1},{name:"item 7",selected:!1},{name:"item 8",selected:!1}]},{name:"topitem 3",selected:!1,items:[{name:"item 9",selected:!1},{name:"item 10",selected:!1},{name:"item 11",selected:!1},{name:"item 12",selected:!1}]}]});e.customElement("select-tree",{meta:{category:"Multiselect"},css:function(){},data:{dataid:r.getID(),firstLevel:"items",secondLevel:"items"},init:function(e){var t=_data(e.get("dataid")),i=e.get("firstLevel"),n=e.get("secondLevel"),a=!1;this.e("btn-default").text("Valitse kaikki").on("click",function(){var e=0,o=0;t[i].forEach(function(t){t[n].forEach(function(t){t.get("selected")&&e++,o++})}),0==e&&(a=!1),a?(t[i].forEach(function(e){e.set("selected",!1),e[n].forEach(function(e){e.set("selected",!1)})}),a=!1):(t[i].forEach(function(e){e.set("selected",!0),e[n].forEach(function(e){e.set("selected",!0)})}),a=!0)}),this.ul("nav nav-pills").tree(t[i],function(e,t){var i=_e("li");i.addClass("clickable"),i.addClass("list-group-item"),e.get("selected")||e.set("selected",!1),t>1&&i.e("bs-checkbox",{dataid:e.getID(),varName:"selected"}),i.span().text(" ");var a=(i.span("dragLabel").bind(e,"name"),!0);return i.on("click",function(){t>1?e.set("selected",!e.get("selected")):(e.groups.forEach(function(e){e.set("selected",a)}),a=!a)}),i.touchclick(),this.subTree(e[n],i.ul()),i})}})},e.extras=function(){_e().createClass("componentPreviewFull",{meta:{category:"Metadata",description:"Displays full preview of a given component"},css:function(e){e.bind(".comp-preview",{width:"100%",display:"inline-block",padding:"0em",margin:"1em",overflow:"hidden","box-shadow":"0px 4px 16px #444"}),e.bind(".comp-preview-content",{padding:"2em"}),e.bind(".preview-head",{width:"100%",padding:"0.5em",color:"white","background-color":"#666"}),e.bind(".close-preview",{width:"100%",padding:"1em","font-size":"0.7em",color:"#777"}),e.bind(".close-preview:hover",{"text-decoration":"underline",color:"orange",cursor:"pointer"}),e.bind(".show-toggler",{width:"100%","padding-top":"0.6em","font-size":"0.7em",color:"#777"}),e.bind(".show-toggler:hover",{"text-decoration":"underline",color:"orange",cursor:"pointer"})},"return":function(){this.popView()},"show-css":function(){var e=this.ref("cssCode");if(e.clear(),this._hasCssVisible)return void(this._hasCssVisible=!1);var t=this.getRegisteredClasses(),i=t[this.props().get("name")],n=i.css;n&&e.pre().text(n.toString()),this._hasCssVisible=!0},"show-render":function(){var e=this.ref("renderCode");if(e.clear(),this._hasRenderVisible)return void(this._hasRenderVisible=!1);var t=this.getRegisteredClasses(),i=t[this.props().get("name")],n=i.render||i.init;n&&e.pre().text(n.toString()),this._hasRenderVisible=!0},init:function(){{var e=this.props().get("name"),t=this;this.getRegisteredClasses()}e?(this.sendHandler("*",function(e,i,n,a){var o=t.ref("handlerOutput");o.clear(),o.div().text("message  '"+a+"'"),o.pre().text(JSON.stringify(e))}),this.addClass("comp-preview"),this.div("preview-head").text(e).clickTo("return"),this.div("close-preview").text("close").clickTo("return"),this.div(function(){this.addClass("comp-preview-content"),this.div("handlerOutput",{ref:"handlerOutput"}),this.e(e),this.div("show-toggler").text("show render code").clickTo("show-render"),this.div("sourceArea",{ref:"renderCode"}),this.div("show-toggler").text("show css code").clickTo("show-css"),this.div("sourceArea",{ref:"cssCode"})})):this.div().text("Nothing to display")}}),_e().createClass("componentPreview",{meta:{category:"Metadata"},css:function(e){e.bind(".comp-preview",{width:"20%",display:"inline-block",padding:"0em",height:"300px",margin:"1em",overflow:"hidden","box-shadow":"0px 4px 16px #444"}),e.bind(".comp-preview-content",{width:"200%",display:"inline-block",padding:"3em","transform-origin":"0 0",transform:"scale(0.5, 0.5)"}),e.bind(".preview-head",{width:"100%",padding:"0.5em","font-size":"0.8em",color:"white","background-color":"#666"})},init:function(){this.sendHandler("*",function(){});var e=this.props().get("name");e?(this.addClass("comp-preview"),this.div("preview-head").text(e),this.e("div",function(){this.addClass("comp-preview-content"),this.e(e)})):this.div().text("Nothing to display")}}),_e().createClass("registeredComponents",{meta:{category:"Metadata",description:"Displays all registered components in the system"},init:function(){var e=this.getRegisteredClasses(),t=this;this.e("paper-h1",{text:"Currently registered components"}),Object.keys(e).forEach(function(e){"registeredComponents"!=e&&t.e("componentPreview",{name:e}).on("click",function(){t.pushView(_e("componentPreviewFull",{name:e}))})})}})},e.__traitInit&&!e.hasOwnProperty("__traitInit")&&(e.__traitInit=e.__traitInit.slice()),e.__traitInit||(e.__traitInit=[]),e.__traitInit.push(function(e){var t=_e(document.body);e=e||{},e.material&&this.materialComps(e.root||t),e.bootstrap&&this.bsComps(e.root||t),this.ownComps(),this.extras()}),e.materialComps=function(e){var t=function(e){var t=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;return t.test(e)},i=function(e,i,n,a){a||(a="input"),e.customElement(i,{meta:{category:"Inputs"},data:{title:"input title",value:"the value"},css:function(e){e.bind(".input-container",{"margin-top":"0.2em","margin-bottom":"0.2em","margin-right":"0.2em"}),e.bind("input.invalid",{color:_e().mix("red",n)}),e.bind(".paper-input",{"border-radius":"0",width:"100%","font-size":"1em",outline:"none",border:"none","border-bottom":"1px solid #757575",padding:"10px 10px 10px 5px",display:"block","background-color":"#fafafa"}),e.bind(".box",{width:"100%",height:"2px","background-color":_e().mix("#4a89dc",n),transform:"scale(0,1)",opacity:1}),e.animation("input-enter",{duration:"0.5s","iteration-count":1},{width:"100%",background:"#fff",opacity:1},.3,{width:"100%",background:_e().mix(n,"white",.7),opacity:1},{width:"100%",background:"#fff",opacity:1}),e.animation("input-bar-enter",{duration:"0.5s","iteration-count":1},{opacity:0,transform:"scale(0, 1)"},{opacity:1,transform:"scale(1, 1)"},{duration:.5}),e.animation("input-bar-close",{duration:"0.5s","iteration-count":1},{opacity:0,transform:"scale(1, 1)"},{opacity:1,transform:"scale(0, 1)"},{duration:.5}),e.bind(".entered",{transform:"scale(1,1)"}),e.bind(".paper-input-title",{opacity:.6}),e.bind(".titleFocused",{opacity:.8})},init:function(e){var i,n=this.div("input-container"),o=n.div("paper-input-title").bind(e,"title"),s=n[a]("paper-input");e.get("type")&&(s.attr("type",e.get("type")),"email"==e.get("type")&&(s.attr("type","text"),s.on("value",function(){t(s.val())?s.removeClass("invalid"):s.addClass("invalid")}))),e.get("required")&&s.attr("required",!0),e.get("placeholder")&&s.attr("placeholder",e.get("placeholder")),e.get("height")&&s.height(e.get("height")),s.bind(e,"value"),s.on("focus",function(){i.removeClass("input-bar-close"),i.addClass("input-bar-enter"),i.addClass("entered"),this.addClass("input-enter"),o.addClass("titleFocused")}).on("blur",function(){i.removeClass("input-bar-enter"),i.addClass("input-bar-close"),i.removeClass("entered"),this.removeClass("input-enter"),o.removeClass("titleFocused")});var i=n.div("box");return s},tagName:"div"})};i(e,"paper-input","#4a89dc"),i(e,"paper-textarea","#4a89dc","textarea");var n=function(e,t,i,n,a){e.customElement(t,{meta:{category:"Effects"},css:function(e){a=a||.6,e.bind(".circle",{"border-radius":"50%",width:i,height:i,transform:"translate(-50%, -50%)",position:"absolute",top:0,left:0,"background-color":n}),e.animation("animate",{duration:a+"s","iteration-count":1},{opacity:0,transform:"scale(0,0)"},.1,{opacity:1,transform:"scale(0.3,0.3)"},.4,{transform:"scale(0.7,0.7)",opacity:.8},{transform:"scale(1,1)",opacity:0})},init:function(){var e=_e("div");e.relative(),this.prepend(e);var t=e.div().absolute(),i=this.mousePos();t.x(i.x).y(i.y),t.div("circle"),t.addClass("animate");setTimeout(function(){e.remove()},1e3*a)},tagName:"div"})};n(e,"paper-circle","200px","rgba(255, 255, 255, 0.25)"),n(e,"paper-circle-red","200px","rgba(255, 0, 0, 0.25)"),n(e,"paper-circle-green","200px","rgba(0, 255, 0, 0.25)"),n(e,"paper-circle-dark","200px","rgba(0, 0, 0, 0.15)"),n(e,"paper-circle-huge","1200px","rgba(255, 255, 255, 0.12)",1.4);var a=function(e,t,i,n){e.customElement(t,{meta:{category:"Buttons"},data:{text:"Button text"},css:function(e){var t="0 3px 10px rgba(0, 0, 0, 0.34)",a=_e().mix("#4a89dc",i);e.bind(".btn-content",{display:"inline-block",padding:"0.4em 0.8em",position:"relative",margin:"0.3em",overflow:"hidden",cursor:"pointer",color:"#fff","border-radius":n||0,"background-color":a,"box-shadow":t}),e.bind(".btn-content:hover",{background:_e().dim(_e().mix(i,"#4a89dc"),.1)}),e.animation("tryMe",{duration:"4s","iteration-count":1},{transform:"rotate(0deg)"},{transform:"rotate(360deg)"})},init:function(e){this.addClass("btn-content");var t=this.span().bind(e,"text");return this.on("click",function(){this.e("paper-circle");var e=this.props().get("action"),t=this.props().get("data");e&&this.send(e,t)}),t},tagName:"div"})};a(e,"paper-button","gray","0px"),a(e,"pri-button","gray","0px"),a(e,"danger-button","red","0px"),a(e,"warning-button","yellow","0px");var o=function(e,t,i){e.customElement(t,{meta:{category:"Alerts"},data:{text:"Alert text"},css:function(e){var t="0 3px 10px rgba(0, 0, 0, 0.34)",n=_e().dim(i,.1);e.bind(".btn-content",{display:"block",padding:"0.4em 0.8em",position:"relative","margin-top":"0.3em","margin-bottom":"0.3em",overflow:"hidden",cursor:"pointer",color:"#fff","border-radius":"4px","background-color":n,"box-shadow":t}),e.bind(".btn-content:hover",{background:_e().dim(_e().mix(i,"#4a89dc"),.1)}),e.animation("enter",{duration:"0.3s","iteration-count":1},{transform:"scale(0)"},{transform:"scale(1)"}),e.animation("fadeOut",{duration:"0.5s","iteration-count":1},{transform:"scale(1)"},{transform:"scale(0)"}),e.bind(".out",{display:"none"})},init:function(e){this.addClass("enter"),this.addClass("btn-content"),this.span().bind(e,"text");var t=this;setTimeout(function(){t.addClass("fadeOut"),setTimeout(function(){t.remove()},400)},5e3)},tagName:"div"})};o(e,"alert-info","#4a89dc");var s=function(e,t,i,n){e.customElement(t,{meta:{category:"Headings"},data:{text:"Default heading for the component"},css:function(e){e.bind(".h1-container",{"margin-top":"0.1em","margin-bottom":"0.2em","margin-right":"0.2em",cursor:"pointer","font-size":i,opacity:.9,color:_e().mix("#4a89dc",n,.6)}),e.bind(".box",{width:"100%",height:"2px","transform-origin":"100% 0","background-color":_e().mix("#4a89dc",n),transform:"scale(1,1)","margin-bottom":"0.4em",opacity:.5}),e.animation("box-enter",{duration:"1s","iteration-count":1},{opacity:0,transform:"scale(0, 1)"},{opacity:.5,transform:"scale(1, 1)"},{duration:.5})},init:function(e){this.div("h1-container").bind(e,"text");var t=this.div("box").addClass("box-enter");this.on("click",function(){t.removeClass("box-enter");setTimeout(function(){t.addClass("box-enter")},100)})},tagName:"div"})};s(e,"paper-h1","2em","#333"),s(e,"paper-h2","1.5em","#666"),s(e,"paper-h3","1.5em","#666");var r=function(e,t){e.customElement(t,{meta:{category:"Application"},data:{to_title:"Vastaanottaja(t)",to:"",head_title:"Sähköpostin otsikko",heading:"The e-mail heading",content_title:"Sisältö",content:"",text:"The contents of the email",send_title:"Lähetä"},css:function(){},init:function(e){this.e("paper-input",{title:[e,"to_title"],value:[e,"to"]}),this.e("paper-input",{title:[e,"head_title"],value:[e,"heading"]}),this.e("paper-textarea",{title:[e,"content_title"],value:[e,"content"]}),this.e("paper-button",{text:[e,"send_title"]}).on("click",function(){this.send("send-email",e.toPlainData(),function(){})})},tagName:"div"})};r(e,"send-email");var c=function(e,t){e.customElement(t,{meta:{category:"Application"},data:{from_title:"Sähköpostiosoite vastausta varten",from:"",please_fill_email:"Ole hyvä ja anna sähköpostiosoite",content_title:"Palautteen aihe ja sisältö",content:"",text:"The contents of the email",send_title:"Lähetä"},css:function(e){e.bind(".alert-area",{height:"40px"})},init:function(e){var t=(this.div("faq-area"),e.get("dataid"));if(t){var i=_data(t);this.div("faq-items").mvc(i.items,function(e){var t=_e("div").addClass("faq-item"),i=_e();i.p().text(e.text());var n=!1;return t.e("paper-h2",{text:e.heading()}).on("click",function(){n?i.hide():i.show(),n=!n}),i.hide(),t.add(i),t})}},tagName:"div"})};c(e,"faq-list");var d=function(e,i){e.customElement(i,{meta:{category:"Application"},data:{from_title:"Sähköpostiosoite vastausta varten",from:"",please_fill_email:"Ole hyvä ja anna sähköpostiosoite",please_check_email:"Ole hyvä ja tarkasta, että sähköpostiosoite on oikein",content_title:"Palautteen aihe ja sisältö",content:"",text:"The contents of the email",send_title:"Lähetä"},css:function(e){e.bind(".alert-area",{height:"40px"})},init:function(e){var i=this.div("alert-area");this.e("paper-textarea",{title:[e,"content_title"],height:"5em",value:[e,"content"]}),this.e("paper-input",{type:"email",required:!0,title:[e,"from_title"],value:[e,"from"]}),this.e("paper-button",{text:[e,"send_title"]}).on("click",function(){return e.get("from")?t(e.get("from"))?void this.send("support-question",e.toPlainData(),function(){}):(i.clear(),void i.e("alert-info",{text:e.get("please_check_email")})):(i.clear(),void i.e("alert-info",{text:e.get("please_fill_email")}))}),e.get("faqid")&&(this.e("paper-h1",{text:"Usein kysyttyjä kysymyksiä"}),this.e("faq-list",{dataid:e.get("faqid")}))},tagName:"form"})};d(e,"support-question");var l=function(e,t){e.customElement(t,{meta:{category:"Panels"},data:{title:"Content frame",sub_title:"The subtitle",send_title:"Tallenna tiedot"},css:function(e){e.bind(".frameContent",{padding:"1em"}),e.bind(".contentHead",{"border-radius":"4px 4px 0px 0px",width:"100%","background-color":"#3f50b5",color:"white","line-height":"2","font-size":"2em",padding:"0.3em"}),e.bind(".contentFrame",{border:"0px","border-radius":"5px",padding:"0em","background-color":"#f7f7f7"})},init:function(e){this.addClass("contentFrame"),this.div("contentHead").bind(e,"title");var t=this.div("frameContent");return t},tagName:"div"})};l(e,"panel")},e.ownComps=function(){_e().createClass("v-menu",{meta:{category:"Menus"},css:function(e){e.bind(".menuStyle",{cursor:"pointer","font-size":"0.9em"});var t=_e().mix("#555","#333");e.bind(".menu-top-head",{cursor:"pointer","background-color":t,background:"linear-gradient("+t+", "+_e().dim(t,.1)+")",color:"#aaa",padding:"0.8em","padding-left":"0.8em","border-bottom":"1px solid"+_e().dim(t,.2),"border-top":"1px solid"+_e().dim(t,-.2)}),e.bind(".menu-top-head:hover",{color:"white","text-shadow":"1px 6px 10px #333","background-color":_e().dim(t,-.1),background:"linear-gradient("+t+", "+_e().dim(t,-.1)+")","border-bottom":"1px solid"+_e().dim(t,.2),"border-top":"1px solid"+_e().dim(t,-.2)});var i=_e().mix("#476392","#aaa");e.bind(".sub-top-head",{cursor:"pointer","padding-left":"1.2em","background-color":"#eee",padding:"0.8em",color:"#555","border-top":"1px solid"+_e().dim(i,.1)}),e.bind(".sub-top-head:hover",{color:"#222","background-color":"#fff"})},getInitialState:function(){return{items:[{name:"Effects",items:[{name:"Cartoon",action:"menuClick",data:"menu-data1"},{name:"Movies",action:"menuClick",data:"menu-data2"}]},{name:"Colors",items:[{name:"Ocean",action:"menuClick",data:"menu-data3"},,{name:"Sunrise",action:"menuClick",data:"menu-data4"},,]}]}},init:function(){var e,t=this.props().get("dataid");e=t?_data(t):this.state();this.pushToPath=function(t,i){var n=t.split("/"),a=function(e,t){var i=n[e];if(!i)return t;t.hasOwn("items")||t.set("items",[]);var o;return t.items.forEach(function(e){e.get("name")==i&&(o=e)}),o||(t.items.push({name:i,items:[]}),o=t.items.at(t.items.length()-1)),o&&n.length<=e+1?o:a(e+1,o)},o=a(0,e);o&&o.items.push(i)},this.addClass("menuStyle");this.div().mvc(e.items,function(e){var t=_e(),i=t.div("menu-top-head").text(e.name());if(e.hasOwn("items")){var n=t.e("contentToggle").mvc(e.items,function(e){var t=_e();t.addClass("sub-top-head"),t.text(e.name());var i=e.get("action");return i&&t.clickTo(i,e.get("data")),t});i.on("click",function(){n.toggle();var i=e.get("action");e.get("action")&&t.send(i,e.get("data"))})}return t})}})}}(this)},i=function(e,t,n,a,o,s,r,c){var d,l=this;if(!(l instanceof i))return new i(e,t,n,a,o,s,r,c);var m=[e,t,n,a,o,s,r,c];if(l.__factoryClass)if(l.__factoryClass.forEach(function(e){d=e.apply(l,m)}),"function"==typeof d){if(d._classInfo.name!=i._classInfo.name)return new d(e,t,n,a,o,s,r,c)}else if(d)return d;l.__traitInit?l.__traitInit.forEach(function(e){e.apply(l,m)}):"function"==typeof l.init&&l.init.apply(l,m)};i._classInfo={name:"_eComponents"},i.prototype=new t,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(e._eComponents=i,this._eComponents=i):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports._eComponents=i:this._eComponents=i}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(e)}).call(new Function("return this")());