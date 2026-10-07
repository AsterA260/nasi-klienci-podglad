'use strict';
if (!['osoba','pary'].includes(state.kind)) state.kind='osoba';
// Desktop offer uses the existing catalogue and shared booking form.
const massageBaseRender = renderPage;
const massageGroups = [
 {kind:'osoba',title:'Dla jednej osoby',subtitle:'Chwila tylko dla Ciebie.',photo:'www-assets/rezerwacje-wybrane/kategoria-osoba-klisza.png',number:'01'},
 {kind:'pary',title:'Dla par',subtitle:'Dwie osoby. Wspólna chwila spokoju.',photo:'www-assets/rezerwacje-wybrane/kategoria-pary.jpg',number:'02'}
];
function massageSalon(){return `<label class="massage-salon">Wybierz salon<select id="massage-salon" aria-label="Salon"><option value="ZW" ${state.salon==='ZW'?'selected':''}>Zwierzyniecka</option><option value="SZ" ${state.salon==='SZ'?'selected':''}>Szewska</option></select></label>`;}
function massageHeading(detail=false){return `<div class="massage-heading"><div><p class="detail-label">THAI MALIWAN · MASAŻ TAJSKI</p><h1>${detail?(state.kind==='pary'?'Masaże dla par':'Masaże dla jednej osoby'):'Twój czas. Twój masaż.'}</h1><p>${detail?'Wybierz czas masażu, a następnie dogodny termin.':'Wybierz chwilę dla siebie lub podziel się nią z bliską osobą.'}</p></div>${massageSalon()}</div>`;}
renderPage=function(){
 const browsing=['start','categories','services'].includes(state.stage);
 document.body.classList.toggle('massage-browsing',browsing);
 document.querySelectorAll('header nav [data-view="reservation"]').forEach(a=>a.classList.remove('active'));
 document.querySelector('[data-massage-nav]').classList.add('active');
 if(!browsing){massageBaseRender();return;}
 document.body.classList.remove('compact-booking-step');
 if(state.stage!=='services'){
  app.innerHTML=massageHeading()+`<section class="massage-gateways" aria-label="Wybierz rodzaj masażu">${massageGroups.map(g=>{
   const prices=catalogue.filter(x=>x.salon===state.salon&&x.kind===g.kind).flatMap(x=>x.prices.map(p=>p.price));
   return `<button type="button" class="massage-gateway" data-kind="${g.kind}"><img src="${g.photo}" alt="" fetchpriority="high"><span class="massage-shade"></span><span class="massage-number">${g.number}</span><span class="massage-card-copy"><span class="massage-card-title">${g.title}</span><span class="massage-card-subtitle">${g.subtitle}</span><span class="massage-card-bottom"><span>Zobacz masaże <span aria-hidden="true">↗</span></span>${prices.length?`<span>od ${Math.min(...prices)} zł</span>`:''}</span></span></button>`;
  }).join('')}</section><p class="massage-footnote">Wybierz salon, aby zobaczyć jego ofertę i ceny.</p>`;
  return;
 }
 const template=document.createElement('template');template.innerHTML=compactServices();
 const grid=template.content.querySelector('.offer-grid');
 app.innerHTML=massageHeading(true)+`<div class="massage-toolbar">${back('categories','Wróć do wyboru')}<div class="massage-tabs" role="group" aria-label="Rodzaj masażu">${massageGroups.map(g=>`<button type="button" data-kind="${g.kind}" aria-pressed="${state.kind===g.kind}">${g.title}</button>`).join('')}</div></div>`+grid.outerHTML+`<p class="massage-footnote">Ceny z katalogu zapisanej makiety. Terminy w formularzu są przykładowe.</p>`;
};
app.addEventListener('change',event=>{
 if(event.target.id!=='massage-salon')return;
 state.salon=validSalon(event.target.value);state.selected=null;state.detail=null;state.date=null;state.time=null;state.staff=null;
 render();
});
