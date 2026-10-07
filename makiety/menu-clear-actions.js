/* Customer choices use the same pill treatment as Menu; routing stays unchanged. */
(function(){
 const labels={
  pl:['Dla jednej osoby','Dla pary','Rytuały','Kup voucher'],
  en:['For one person','For couples','Spa rituals','Buy voucher'],
  th:['สำหรับหนึ่งคน','สำหรับคู่','พิธีบำบัด','ซื้อบัตรของขวัญ']
 };
 function refine(){
  let heading=document.querySelector('#menuChoiceHeading');
  if(!heading){heading=document.createElement('h2');heading.id='menuChoiceHeading';document.querySelector('#rowTop').prepend(heading);}
  heading.textContent={pl:'Wybierz chwilę dla siebie',en:'Choose a moment for yourself',th:'เลือกช่วงเวลาสำหรับตัวคุณเอง'}[LANG]||'Wybierz chwilę dla siebie';
  document.querySelector("#rowTop").setAttribute("aria-label",{pl:"Wybierz ofertę",en:"Choose a treatment",th:"เลือกบริการ"}[LANG]||"Wybierz ofertę");
  document.querySelectorAll('#rowTop .mnode').forEach(a=>{
   const label=(labels[LANG]||labels.pl)[NODE_UI[a.dataset.node]];
   a.querySelector('b').textContent=label;
   a.setAttribute('aria-label',label);
   a.removeAttribute('data-top-word');
   if(!a.querySelector('.action-shine')){
    const shine=document.createElement('span');shine.className='action-shine';shine.setAttribute('aria-hidden','true');a.appendChild(shine);
   }
  });
 }
 const original=syncPreviewNav;
 syncPreviewNav=function(){original();refine();};
 refine();
})();
