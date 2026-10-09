(function(){'use strict';
window.pokerCreateLoungeLive=function(options){var timer=null,epoch=0,running=false,inFlight=false;var delay=options.delay||30000;
function stop(){running=false;epoch++;inFlight=false;clearTimeout(timer);timer=null;}
function refresh(){if(!running||inFlight||document.hidden||!options.active())return;clearTimeout(timer);timer=null;inFlight=true;var token=epoch;Promise.resolve().then(options.request).then(function(value){if(running&&token===epoch&&options.active()&&!document.hidden)options.update(value);},function(){if(running&&token===epoch&&options.active()&&!document.hidden)options.update({available:false,friends:[],checkedAt:Date.now()});}).finally(function(){if(token!==epoch)return;inFlight=false;if(running&&options.active()&&!document.hidden)timer=setTimeout(refresh,delay);});}
function start(){if(running)return;running=true;epoch++;refresh();}
function visible(){if(document.hidden){clearTimeout(timer);timer=null;epoch++;inFlight=false;}else if(running)refresh();}
document.addEventListener('visibilitychange',visible);window.addEventListener('pageshow',visible);return {start:start,stop:stop,refresh:refresh,destroy:function(){stop();document.removeEventListener('visibilitychange',visible);window.removeEventListener('pageshow',visible);}};
};})();
