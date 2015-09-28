(function(){var t={},n=function(){!function(t){t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){var t=_e(document.body);this.materialComps(t)}),t.materialComps=function(t){var n=function(t,n,i,e){e||(e="input"),t.customElement(n,{data:{title:"input title",value:"the value"},css:function(t){t.bind(".input-container",{"margin-top":"0.2em","margin-bottom":"0.2em","margin-right":"0.2em"}),t.bind(".paper-input",{"border-radius":"0",width:"100%","font-size":"1em",outline:"none",border:"none","border-bottom":"1px solid #757575",padding:"10px 10px 10px 5px",display:"block","background-color":"#fafafa"}),t.bind(".box",{width:"100%",height:"2px","background-color":_e().mix("#4a89dc",i),transform:"scale(0,1)",opacity:1}),t.animation("input-enter",{duration:"0.5s","iteration-count":1},{width:"100%",background:"#fff",opacity:1},.3,{width:"100%",background:_e().mix(i,"white",.7),opacity:1},{width:"100%",background:"#fff",opacity:1}),t.animation("input-bar-enter",{duration:"0.5s","iteration-count":1},{opacity:0,transform:"scale(0, 1)"},{opacity:1,transform:"scale(1, 1)"},{duration:.5}),t.animation("input-bar-close",{duration:"0.5s","iteration-count":1},{opacity:0,transform:"scale(1, 1)"},{opacity:1,transform:"scale(0, 1)"},{duration:.5}),t.bind(".entered",{transform:"scale(1,1)"}),t.bind(".paper-input-title",{opacity:.6}),t.bind(".titleFocused",{opacity:.8})},init:function(t){var n,i=this.div("input-container"),a=i.div("paper-input-title").bind(t,"title"),o=i[e]("paper-input");o.bind(t,"value"),o.on("focus",function(){n.removeClass("input-bar-close"),n.addClass("input-bar-enter"),n.addClass("entered"),this.addClass("input-enter"),a.addClass("titleFocused")}).on("blur",function(){n.removeClass("input-bar-enter"),n.addClass("input-bar-close"),n.removeClass("entered"),this.removeClass("input-enter"),a.removeClass("titleFocused")});var n=i.div("box")},tagName:"div"})};n(t,"paper-input","orange"),n(t,"paper-textarea","red","textarea");var i=function(t,n,i,e,a){t.customElement(n,{css:function(t){a=a||.6,t.bind(".circle",{"border-radius":"50%",width:i,height:i,transform:"translate(-50%, -50%)",position:"absolute",top:0,left:0,"background-color":e}),t.animation("animate",{duration:a+"s","iteration-count":1},{opacity:0,transform:"scale(0,0)"},.1,{opacity:1,transform:"scale(0.3,0.3)"},.4,{transform:"scale(0.7,0.7)",opacity:.8},{transform:"scale(1,1)",opacity:0})},init:function(){var t=_e("div");t.relative(),this.prepend(t);var n=t.div().absolute(),i=this.mousePos();n.x(i.x).y(i.y),n.div("circle"),n.addClass("animate");setTimeout(function(){t.remove()},1e3*a)},tagName:"div"})};i(t,"paper-circle","200px","rgba(255, 255, 255, 0.25)"),i(t,"paper-circle-red","200px","rgba(255, 0, 0, 0.25)"),i(t,"paper-circle-green","200px","rgba(0, 255, 0, 0.25)"),i(t,"paper-circle-dark","200px","rgba(0, 0, 0, 0.15)"),i(t,"paper-circle-huge","1200px","rgba(255, 255, 255, 0.12)",1.4);var e=function(t,n,i,e){t.customElement(n,{data:{text:"Button text"},css:function(t){var n="0 3px 10px rgba(0, 0, 0, 0.34)",a=_e().mix("#4a89dc",i);t.bind(".btn-content",{display:"inline-block",padding:"0.4em 0.8em",position:"relative",margin:"0.3em",overflow:"hidden",cursor:"pointer",color:"#fff","border-radius":e||0,"background-color":a,"box-shadow":n}),t.bind(".btn-content:hover",{background:_e().dim(_e().mix(i,"#4a89dc"),.1)}),t.animation("tryMe",{duration:"4s","iteration-count":1},{transform:"rotate(0deg)"},{transform:"rotate(360deg)"})},init:function(t){this.addClass("btn-content"),this.span().bind(t,"text"),this.on("click",function(){this.e("paper-circle")})},tagName:"div"})};e(t,"pri-button","gray","0px"),e(t,"danger-button","red","0px"),e(t,"warning-button","yellow","0px");var a=function(t,n,i,e){t.customElement(n,{data:{text:"Default heading for the component"},css:function(t){t.bind(".h1-container",{"margin-top":"0.1em","margin-bottom":"0.2em","margin-right":"0.2em",cursor:"pointer","font-size":i,opacity:.9,color:_e().mix("#4a89dc",e,.6)}),t.bind(".box",{width:"100%",height:"2px","transform-origin":"100% 0","background-color":_e().mix("#4a89dc",e),transform:"scale(1,1)","margin-bottom":"0.4em",opacity:.5}),t.animation("box-enter",{duration:"1s","iteration-count":1},{opacity:0,transform:"scale(0, 1)"},{opacity:.5,transform:"scale(1, 1)"},{duration:.5})},init:function(t){this.div("h1-container").bind(t,"text");var n=this.div("box").addClass("box-enter");this.on("click",function(){n.removeClass("box-enter");setTimeout(function(){n.addClass("box-enter")},100)})},tagName:"div"})};a(t,"paper-h1","2em","#333"),a(t,"paper-h2","1.5em","#666")}}(this)},i=function(t,n,e,a,o,r,s,c){var d,u=this;if(!(u instanceof i))return new i(t,n,e,a,o,r,s,c);var p=[t,n,e,a,o,r,s,c];if(u.__factoryClass)if(u.__factoryClass.forEach(function(t){d=t.apply(u,p)}),"function"==typeof d){if(d._classInfo.name!=i._classInfo.name)return new d(t,n,e,a,o,r,s,c)}else if(d)return d;u.__traitInit?u.__traitInit.forEach(function(t){t.apply(u,p)}):"function"==typeof u.init&&u.init.apply(u,p)};i._classInfo={name:"_eComponents"},i.prototype=new n,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t._eComponents=i,this._eComponents=i):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports._eComponents=i:this._eComponents=i}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(t)}).call(new Function("return this")());