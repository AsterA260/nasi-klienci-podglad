/* Desktop-only geometry. Mobile retains its existing layout. */
(function(){
  window.desktopReelLayout=function(width,height,radius,tablet=false){
    const compact=height<760;
    const actionsTop=compact?112:132;
    const actionsHeight=compact?68:78;
    const reservedTop=actionsTop+actionsHeight+(tablet?24:44);
    const reservedBottom=height-(tablet?165:214);
    const availableHeight=Math.max(8,reservedBottom-reservedTop);
    const perspective=1650;
    const maxDepth=Math.hypot(radius,250);
    const project=k=>perspective/(perspective-maxDepth*k);
    let low=0,high=1.4;
    // Reserve both vertical space and the whole visible cylinder width.
    for(let i=0;i<40;i++){
      const k=(low+high)/2;
      if((tablet?540:452)*k*project(k)<=availableHeight && 2*Math.hypot(radius,250)*k/Math.sqrt(1-(Math.hypot(radius,250)*k/perspective)**2)<=width-96)low=k;
      else high=k;
    }
    const scale=low;
    const center=(reservedTop+reservedTop+availableHeight)/2;
    const half=(tablet?270:226)*scale*project(scale);
    return {scale,actionsTop,center,top:center-half,bottom:center+half,footerTop:height-138};
  };
})();

window.mobileReelLayout=function(width,height,safeTop=0,safeBottom=0,tallTablet=false){
 const tablet=width>=601;
 const canvasHeight=Math.max(height,tablet?700:740);
 const radius=(tablet?190:118)/Math.tan(Math.PI/8);
 const halfWidth=tablet?190:118,faceHeight=tablet?(tallTablet?540:400):318,p=tablet?1650:1340;
 const actionsTop=(tablet?180:156)+safeTop,actionsHeight=tablet?72:60;
 const reservedTop=actionsTop+actionsHeight+(tallTablet?24:40);
 const reservedBottom=canvasHeight-(tablet?(tallTablet?180:228):268)-safeBottom;
 const depth=Math.hypot(radius,halfWidth);
 const project=k=>p/(p-depth*k);
 let lo=0,hi=1.25;
 for(let i=0;i<40;i++){
  const k=(lo+hi)/2;
  const projectedWidth=2*depth*k/Math.sqrt(1-(depth*k/p)**2);
  if(faceHeight*k*project(k)<=reservedBottom-reservedTop && projectedWidth<=width-48)lo=k;else hi=k;
 }
 const scale=lo,center=(reservedTop+reservedBottom)/2,half=faceHeight*.5*scale*project(scale);
 return{scale,center,top:center-half,bottom:center+half,actionsTop,canvasHeight};
};
