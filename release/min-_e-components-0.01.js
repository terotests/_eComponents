(function(){var t={},e=function(){!function(t){t.bsComps=function(t){var e=function(t,e){t.get("icon")&&(e.span(e.str(["glyphicon glyphicon-",t.get("icon")])),e.span().html("&nbsp;")),t.get("iconImg")&&aa.img("iconImg",{src:t.get("iconImg")}),t.get("leftBadge")&&e.span("badge").text(t.get("leftBadge")),t.buttongroup,e.span().bind(t,"text"),t.get("rightBadge")&&(console.log("--> biding to rightBadge"),e.span("badge").bind(t,"rightBadge")),t.get("active")&&e.addClass("active"),t.on("active",function(){t.get("active")?e.addClass("active"):e.removeClass("active")})},n=function(t,n){t.customElement("btn-"+n,{data:{text:"Button text"},css:function(){},init:function(t){this.addClass("btn btn-"+n),e(t,this)},tagName:"button"})};n(t,"primary"),n(t,"danger"),n(t,"warning"),n(t,"default"),t.customElement("tabs",{data:{text:"Button text",dataid:""},css:function(t){t.bind(".nav",{cursor:"pointer"})},init:function(t){if(t&&t.get("dataid")){var n=_data(t.get("dataid")),i=this.ul("nav nav-tabs");i.attr("role","tablist"),i.mvc(n,function(t){var i=_e("li"),a=i.a();return e(t,a),t.get("active")&&i.addClass("active"),t.on("active",function(){t.get("active")?i.addClass("active"):i.removeClass("active")}),i.on("click",function(){n.forEach(function(t){t.set("active",!1)}),t.set("active",!0)}),i})}}})},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t){var e=_e(document.body);t=t||{},t.material&&this.materialComps(t.root||e),t.bootstrap&&this.bsComps(t.root||e)}),t.materialComps=function(t){var e=function(t){var e=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;return e.test(t)},n=function(t,n,i,a){a||(a="input"),t.customElement(n,{data:{title:"input title",value:"the value"},css:function(t){t.bind(".input-container",{"margin-top":"0.2em","margin-bottom":"0.2em","margin-right":"0.2em"}),t.bind("input.invalid",{color:_e().mix("red",i)}),t.bind(".paper-input",{"border-radius":"0",width:"100%","font-size":"1em",outline:"none",border:"none","border-bottom":"1px solid #757575",padding:"10px 10px 10px 5px",display:"block","background-color":"#fafafa"}),t.bind(".box",{width:"100%",height:"2px","background-color":_e().mix("#4a89dc",i),transform:"scale(0,1)",opacity:1}),t.animation("input-enter",{duration:"0.5s","iteration-count":1},{width:"100%",background:"#fff",opacity:1},.3,{width:"100%",background:_e().mix(i,"white",.7),opacity:1},{width:"100%",background:"#fff",opacity:1}),t.animation("input-bar-enter",{duration:"0.5s","iteration-count":1},{opacity:0,transform:"scale(0, 1)"},{opacity:1,transform:"scale(1, 1)"},{duration:.5}),t.animation("input-bar-close",{duration:"0.5s","iteration-count":1},{opacity:0,transform:"scale(1, 1)"},{opacity:1,transform:"scale(0, 1)"},{duration:.5}),t.bind(".entered",{transform:"scale(1,1)"}),t.bind(".paper-input-title",{opacity:.6}),t.bind(".titleFocused",{opacity:.8})},init:function(t){var n,i=this.div("input-container"),o=i.div("paper-input-title").bind(t,"title"),r=i[a]("paper-input");t.get("type")&&(r.attr("type",t.get("type")),"email"==t.get("type")&&(r.attr("type","text"),r.on("value",function(){e(r.val())?r.removeClass("invalid"):r.addClass("invalid")}))),t.get("required")&&r.attr("required",!0),t.get("placeholder")&&r.attr("placeholder",t.get("placeholder")),r.bind(t,"value"),r.on("focus",function(){n.removeClass("input-bar-close"),n.addClass("input-bar-enter"),n.addClass("entered"),this.addClass("input-enter"),o.addClass("titleFocused")}).on("blur",function(){n.removeClass("input-bar-enter"),n.addClass("input-bar-close"),n.removeClass("entered"),this.removeClass("input-enter"),o.removeClass("titleFocused")});var n=i.div("box")},tagName:"div"})};n(t,"paper-input","#4a89dc"),n(t,"paper-textarea","#4a89dc","textarea");var i=function(t,e,n,i,a){t.customElement(e,{css:function(t){a=a||.6,t.bind(".circle",{"border-radius":"50%",width:n,height:n,transform:"translate(-50%, -50%)",position:"absolute",top:0,left:0,"background-color":i}),t.animation("animate",{duration:a+"s","iteration-count":1},{opacity:0,transform:"scale(0,0)"},.1,{opacity:1,transform:"scale(0.3,0.3)"},.4,{transform:"scale(0.7,0.7)",opacity:.8},{transform:"scale(1,1)",opacity:0})},init:function(){var t=_e("div");t.relative(),this.prepend(t);var e=t.div().absolute(),n=this.mousePos();e.x(n.x).y(n.y),e.div("circle"),e.addClass("animate");setTimeout(function(){t.remove()},1e3*a)},tagName:"div"})};i(t,"paper-circle","200px","rgba(255, 255, 255, 0.25)"),i(t,"paper-circle-red","200px","rgba(255, 0, 0, 0.25)"),i(t,"paper-circle-green","200px","rgba(0, 255, 0, 0.25)"),i(t,"paper-circle-dark","200px","rgba(0, 0, 0, 0.15)"),i(t,"paper-circle-huge","1200px","rgba(255, 255, 255, 0.12)",1.4);var a=function(t,e,n,i){t.customElement(e,{data:{text:"Button text"},css:function(t){var e="0 3px 10px rgba(0, 0, 0, 0.34)",a=_e().mix("#4a89dc",n);t.bind(".btn-content",{display:"inline-block",padding:"0.4em 0.8em",position:"relative",margin:"0.3em",overflow:"hidden",cursor:"pointer",color:"#fff","border-radius":i||0,"background-color":a,"box-shadow":e}),t.bind(".btn-content:hover",{background:_e().dim(_e().mix(n,"#4a89dc"),.1)}),t.animation("tryMe",{duration:"4s","iteration-count":1},{transform:"rotate(0deg)"},{transform:"rotate(360deg)"})},init:function(t){this.addClass("btn-content"),this.span().bind(t,"text"),this.on("click",function(){this.e("paper-circle")})},tagName:"div"})};a(t,"paper-button","gray","0px"),a(t,"pri-button","gray","0px"),a(t,"danger-button","red","0px"),a(t,"warning-button","yellow","0px");var o=function(t,e,n){t.customElement(e,{data:{text:"Alert text"},css:function(t){var e="0 3px 10px rgba(0, 0, 0, 0.34)",i=_e().mix("#4a89dc",n,.3);t.bind(".btn-content",{display:"block",padding:"0.4em 0.8em",position:"relative",margin:"0.3em",overflow:"hidden",cursor:"pointer",color:"#fff","border-radius":"4px","background-color":i,"inner-shadow":e}),t.bind(".btn-content:hover",{background:_e().dim(_e().mix(n,"#4a89dc"),.1)}),t.animation("tryMe",{duration:"4s","iteration-count":1},{transform:"rotate(0deg)"},{transform:"rotate(360deg)"})},init:function(t){this.addClass("btn-content"),this.span().bind(t,"text"),this.e("paper-circle");var e=this;setTimeout(function(){e.remove()},5e3)},tagName:"div"})};o(t,"alert-info","#4a89dc");var r=function(t,e,n,i){t.customElement(e,{data:{text:"Default heading for the component"},css:function(t){t.bind(".h1-container",{"margin-top":"0.1em","margin-bottom":"0.2em","margin-right":"0.2em",cursor:"pointer","font-size":n,opacity:.9,color:_e().mix("#4a89dc",i,.6)}),t.bind(".box",{width:"100%",height:"2px","transform-origin":"100% 0","background-color":_e().mix("#4a89dc",i),transform:"scale(1,1)","margin-bottom":"0.4em",opacity:.5}),t.animation("box-enter",{duration:"1s","iteration-count":1},{opacity:0,transform:"scale(0, 1)"},{opacity:.5,transform:"scale(1, 1)"},{duration:.5})},init:function(t){this.div("h1-container").bind(t,"text");var e=this.div("box").addClass("box-enter");this.on("click",function(){e.removeClass("box-enter");setTimeout(function(){e.addClass("box-enter")},100)})},tagName:"div"})};r(t,"paper-h1","2em","#333"),r(t,"paper-h2","1.5em","#666"),r(t,"paper-h3","1.5em","#666");var s=function(t,e){t.customElement(e,{data:{to_title:"Vastaanottaja(t)",to:"",head_title:"Sähköpostin otsikko",heading:"The e-mail heading",content_title:"Sisältö",content:"",text:"The contents of the email",send_title:"Lähetä"},css:function(){},init:function(t){this.e("paper-input",{title:[t,"to_title"],value:[t,"to"]}),this.e("paper-input",{title:[t,"head_title"],value:[t,"heading"]}),this.e("paper-textarea",{title:[t,"content_title"],value:[t,"content"]}),this.e("paper-button",{text:[t,"send_title"]}).on("click",function(){this.send("send-email",t.toPlainData(),function(){})})},tagName:"div"})};s(t,"send-email");var c=function(t,n){t.customElement(n,{data:{from_title:"Sähköpostiosoite vastausta varten",from:"",please_fill_email:"Ole hyvä ja anna sähköpostiosoite",content_title:"Palautteen aihe ja sisältö",content:"",text:"The contents of the email",send_title:"Lähetä"},css:function(){},init:function(t){var n=this.div("alert-area");this.e("paper-textarea",{title:[t,"content_title"],value:[t,"content"]}),this.e("paper-input",{type:"email",required:!0,title:[t,"from_title"],value:[t,"from"]}),this.e("paper-button",{text:[t,"send_title"]}).on("click",function(){return e(t.get("from"))?void this.send("support-question",t.toPlainData(),function(){}):void n.e("alert-info",{text:t.get("please_fill_email")})})},tagName:"form"})};c(t,"support-question")}}(this)},n=function(t,e,i,a,o,r,s,c){var d,l=this;if(!(l instanceof n))return new n(t,e,i,a,o,r,s,c);var u=[t,e,i,a,o,r,s,c];if(l.__factoryClass)if(l.__factoryClass.forEach(function(t){d=t.apply(l,u)}),"function"==typeof d){if(d._classInfo.name!=n._classInfo.name)return new d(t,e,i,a,o,r,s,c)}else if(d)return d;l.__traitInit?l.__traitInit.forEach(function(t){t.apply(l,u)}):"function"==typeof l.init&&l.init.apply(l,u)};n._classInfo={name:"_eComponents"},n.prototype=new e,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t._eComponents=n,this._eComponents=n):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports._eComponents=n:this._eComponents=n}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(t)}).call(new Function("return this")());