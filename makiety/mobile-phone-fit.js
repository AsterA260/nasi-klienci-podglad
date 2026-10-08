/* Match the phone reel to available space without changing its rotation. */
(function(){
 const original=window.mobileReelLayout;
 window.mobileReelLayout=function(width,height,safeTop=0,safeBottom=0,tallTablet=false){
  if(width>600)return original(width,height,safeTop,safeBottom,tallTablet);
  const old=original(width,height,safeTop,safeBottom,tallTablet);
  const p=1340,radius=118/Math.tan(Math.PI/8),depth=Math.hypot(radius,118);
  const canvasHeight=Math.max(height,640);
  const actionsTop=156+safeTop,center=Math.min(old.center,(actionsTop+80+canvasHeight-150-safeBottom)/2);
  const room=Math.min(center-(actionsTop+52+28),canvasHeight-150-safeBottom-center);
  const project=k=>p/(p-depth*k);
  let lo=0,hi=1.25;
  for(let i=0;i<40;i++){
   const k=(lo+hi)/2,w=2*depth*k/Math.sqrt(1-(depth*k/p)**2);
   if(220*k*project(k)<=room&&w<=width-36)lo=k;else hi=k;
  }
  const half=220*lo*project(lo);
  return{scale:lo,center,top:center-half,bottom:center+half,actionsTop,canvasHeight};
 };
})();
