/* Readable customer-menu actions; keep the existing destination and salon routing. */
(function(){
 const labels={pl:['Dla jednej osoby','Dla par','Rytuały','Kup\nvoucher'],en:['For one person','For couples','Rituals','Buy a\nvoucher'],th:['สำหรับหนึ่งคน','สำหรับคู่','พิธีบำบัด','ซื้อ\nบัตรของขวัญ']};
 const headings={pl:'Wybierz masaż i czas dla siebie',en:'Choose your massage and duration',th:'เลือกการนวดและระยะเวลาสำหรับคุณ'};
 function refine(){
  document.querySelector('#chooseMassage').textContent=headings[LANG];
  document.querySelectorAll('#rowTop .mnode').forEach(a=>{
   const label=labels[LANG][NODE_UI[a.dataset.node]];
   a.querySelector('b').textContent=label;
   a.setAttribute('aria-label',label.replace('\n',' '));
   a.removeAttribute('data-top-word');
  });
 }
 const original=syncPreviewNav;
 syncPreviewNav=function(){original();refine();};
 refine();
 document.querySelector('#chooseMassage').addEventListener('click',openMenu);
})();
