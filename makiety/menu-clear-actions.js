/* One calm invitation; existing category destinations remain in the menu. */
(function(){
 const copy={
  pl:['Wybierz masaż','Swój czas tylko dla Ciebie','Kliknij i wybierz','Kup\nvoucher'],
  en:['Choose your massage','A moment just for you','Click and choose','Buy a\nvoucher'],
  th:['เลือกการนวด','ช่วงเวลาสำหรับคุณโดยเฉพาะ','แตะเพื่อเลือก','ซื้อ\nบัตรของขวัญ']
 };
 function refine(){
  const c=copy[LANG]||copy.pl;
  const button=document.querySelector('#chooseMassage');
  button.replaceChildren();
  ['invitation-title','invitation-subtitle','invitation-cue'].forEach((className,i)=>{
   const span=document.createElement('span');span.className=className;span.textContent=c[i];button.appendChild(span);
  });
  button.setAttribute('aria-label',c.slice(0,3).join('. '));
  const voucher=document.querySelector('#rowTop [data-node="3"]');
  voucher.querySelector('b').textContent=c[3];voucher.setAttribute('aria-label',c[3].replace('\n',' '));
 }
 const original=syncPreviewNav;
 syncPreviewNav=function(){original();refine();};
 refine();
 document.querySelector('#chooseMassage').addEventListener('click',openMenu);
})();
