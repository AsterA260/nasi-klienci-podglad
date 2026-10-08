/* Width first: taller film panels must not squeeze the whole carousel. */
(function(){
 const original=window.mobileReelLayout;
 function safeInsets(){
  let probe=document.querySelector('.phone-safe-insets');
  if(!probe){probe=document.createElement('div');probe.className='phone-safe-insets';document.body.append(probe);}
  const style=getComputedStyle(probe);
  return [parseFloat(style.paddingTop)||0,parseFloat(style.paddingBottom)||0];
 }
 window.mobileReelLayout=function(width,height,safeTop=0,safeBottom=0,tallTablet=false){
  if(width>600)return original(width,height,safeTop,safeBottom,tallTablet);
  const [topInset,bottomInset]=safeInsets();
  const visibleHeight=Math.min(height,window.visualViewport?window.visualViewport.height:height);
  const canvasHeight=Math.max(visibleHeight,620,550+topInset+bottomInset);
  document.documentElement.style.setProperty('--phone-canvas',canvasHeight+'px');
  const actionsTop=156+topInset,top=actionsTop+52+36;
  const available=Math.max(130,canvasHeight-bottomInset-176-top);
  const p=1340,radius=Math.round(118/Math.tan(Math.PI/8)),depth=Math.hypot(radius,118);
  const project=k=>p/(p-depth*k);
  let lo=0,hi=1.25;
  for(let i=0;i<40;i++){
   const k=(lo+hi)/2,w=2*depth*k/Math.sqrt(1-(depth*k/p)**2);
   if(w<=width-24)lo=k;else hi=k;
  }
  const faceHeight=Math.min(540,available/(lo*project(lo)));
  document.documentElement.style.setProperty('--phone-face-height',faceHeight+'px');
  const half=faceHeight*.5*lo*project(lo),center=top+available/2;
  return{scale:lo,center,top:center-half,bottom:center+half,actionsTop,canvasHeight};
 };
 function mount(){
  const rail=document.querySelector('.world-rail'),dock=document.querySelector('.dock-r');
  if(!rail||!dock)return;
  const wrapper=document.createElement('div');wrapper.className='phone-footer-controls';
  const railParent=rail.parentNode,dockParent=dock.parentNode;
  const railNext=rail.nextSibling,dockNext=dock.nextSibling;
  function arrange(){
   if(innerWidth<=600){document.body.append(wrapper);wrapper.append(rail,dock);}
   else{railParent.insertBefore(rail,railNext);dockParent.insertBefore(dock,dockNext);wrapper.remove();}
   if(typeof placeSprockets==='function')placeSprockets();
  }
  arrange();addEventListener('resize',arrange);
  if(window.visualViewport)window.visualViewport.addEventListener('resize',()=>{if(innerWidth<=600)placeSprockets();});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
