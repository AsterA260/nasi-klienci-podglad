/* Width remains independent; never stretch photographs to fill a tall screen. */
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
  const canvasHeight=Math.max(visibleHeight,620,576+topInset+bottomInset);
  document.documentElement.style.setProperty('--phone-canvas',canvasHeight+'px');
  const actionsTop=128+topInset,top=actionsTop+50+36;
  const footer=document.querySelector('.phone-footer-controls');
  const footerHeight=footer?footer.getBoundingClientRect().height:120;
  const bottom=canvasHeight-bottomInset-14-footerHeight-44;
  const available=Math.max(130,bottom-top);
  const p=780,radius=Math.round(118/Math.tan(Math.PI/8)),depth=Math.hypot(radius,118);
  const project=k=>p/(p-depth*k);
  let lo=0,hi=1.25;
  for(let i=0;i<40;i++){
   const k=(lo+hi)/2,w=2*depth*k/Math.sqrt(1-(depth*k/p)**2);
   if(w<=width-28)lo=k;else hi=k;
  }
  const faceHeight=Math.min(386,available/(lo*project(lo)));
  document.documentElement.style.setProperty('--phone-face-height',faceHeight+'px');
  const half=faceHeight*.5*lo*project(lo),center=bottom-half;
  return{scale:lo,center,top:center-half,bottom:center+half,actionsTop,canvasHeight};
 };
 function mount(){
  const elements=['.preview-social','.preview-legal','.world-rail','.dock-r'].map(s=>document.querySelector(s));
  if(elements.some(e=>!e))return;
  const wrapper=document.createElement('div');wrapper.className='phone-footer-controls';
  const originalNav=syncPreviewNav;
  syncPreviewNav=function(){
   window.maliwanLanguage=LANG;
   originalNav();
   syncSalonLinks(previewSalon);
   if(innerWidth<=600&&LANG==='pl'){
    const book=document.querySelector('.mnode[data-node="0"]');
    book.querySelector('b').textContent='Rezerwuj';book.setAttribute('aria-label','Rezerwuj');
   }
  };
  function arrange(){
   if(innerWidth<=600){document.body.append(wrapper);wrapper.append(...elements);}
   else{elements.forEach(e=>document.body.append(e));wrapper.remove();}
   syncPreviewNav();
   if(typeof placeSprockets==='function')placeSprockets();
  }
  const requestedLanguage=new URLSearchParams(location.search).get('lang');
  if(['pl','en','th'].includes(requestedLanguage))setLang(requestedLanguage);
  arrange();addEventListener('resize',arrange);
  if(window.visualViewport)window.visualViewport.addEventListener('resize',()=>{if(innerWidth<=600)placeSprockets();});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
