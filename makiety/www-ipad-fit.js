/* Scale the complete WWW cylinder, never its photographs individually. */
(function(){
 const tablet=matchMedia('(pointer:coarse) and (min-width:601px) and (max-width:1366px)');
 function fit(){
  document.body.classList.toggle('tablet-www',tablet.matches);
  if(!tablet.matches){window.maliwanTabletScale=1;document.documentElement.style.removeProperty('--tablet-reel-scale');return;}
  const w=innerWidth,h=innerHeight,p=1650,depth=Math.hypot(604,250),available=Math.max(200,h-260);
  let lo=0,hi=1;
  for(let n=0;n<40;n++){const k=(lo+hi)/2;const projectedWidth=2*depth*k/Math.sqrt(1-(depth*k/p)**2);const projectedHeight=452*k*p/(p-depth*k);if(projectedWidth<=w-90&&projectedHeight<=available)lo=k;else hi=k;}
  window.maliwanTabletScale=lo;document.documentElement.style.setProperty('--tablet-reel-scale',lo);
  const center=Math.round(h*.52),half=226*lo*p/(p-depth*lo);
  document.querySelector('.scene').style.top=center+'px';
  for(const selector of ['.orbit','.hub','.arrow'])document.querySelectorAll(selector).forEach(el=>el.style.top=center+'px');
  document.querySelector('.sprocket.top').style.top=(center-half-18)+'px';
  document.querySelector('.sprocket.bot').style.top=(center+half+12)+'px';
 }
 fit();addEventListener('resize',fit);addEventListener('orientationchange',fit);tablet.addEventListener('change',fit);
})();
