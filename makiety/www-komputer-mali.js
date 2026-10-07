'use strict';
// Local guided preview only: no chat service, personal data or transmission.
const maliApp=document.getElementById('app');
const maliEsc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let maliSalon=validSalon(new URLSearchParams(location.search).get('salon'));
let maliStep='start';
let maliAudience='osoba';
const maliIcons={
 self:'<circle cx="12" cy="7" r="3"/><path d="M5 21v-3a7 7 0 0 1 14 0v3"/>',
 pair:'<circle cx="8" cy="7" r="3"/><circle cx="18" cy="8" r="2.5"/><path d="M2 21v-3a6 6 0 0 1 12 0v3m3-7a5 5 0 0 1 5 5v2"/>',
 gift:'<path d="M3 9h18v4H3zm2 4v8h14v-8M12 9v12M12 9C3 9 5 1 9 4l3 5c9 0 7-8 3-5z"/>',
 salon:'<path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 0 1 14 0z"/><circle cx="12" cy="10" r="2"/>',
 lotus:'<path d="M12 2c5 6 5 12 0 18-5-6-5-12 0-18zM10 20C3 18 2 11 3 7c6 2 9 6 9 13M14 20c7-2 8-9 7-13-6 2-9 6-9 13"/>'
};
const maliIcon=name=>`<svg viewBox="0 0 24 24" aria-hidden="true">${maliIcons[name]||maliIcons.lotus}</svg>`;
function maliChoice(id,icon,title,sub){return `<button type="button" data-mali-choice="${id}" class="mali-choice"><span class="mali-choice-icon">${maliIcon(icon)}</span><span><b>${title}</b><small>${sub}</small></span><span aria-hidden="true">↗</span></button>`;}
function maliLink(url,icon,title,sub){return `<a class="mali-choice" href="${maliEsc(previewLink(url,maliSalon))}"><span class="mali-choice-icon">${maliIcon(icon)}</span><span><b>${title}</b><small>${sub}</small></span><span aria-hidden="true">↗</span></a>`;}
function renderMali(focus=false){
 let heading='W czym mogę Ci pomóc?',intro='Wybierz, czego szukasz. Pokażę Ci, od czego zacząć.',choices='';
 if(maliStep==='start') choices=maliChoice('self','self','Chwila dla mnie','Chcę wybrać masaż')+maliChoice('pair','pair','Chwila we dwoje','Szukamy wspólnego relaksu')+maliChoice('gift','gift','Szukam prezentu','Chcę podarować bon')+maliChoice('salon','salon','Pytanie o salon','Adres, godziny i kontakt');
 if(maliStep==='offer'){
  heading=maliAudience==='pary'?'Wspólna chwila dla Was.':'Zrób miejsce na odpoczynek.';
  intro='Wolisz wybrać masaż czy poznać nasze rytuały? W ofercie znajdziesz opis, czas i cenę.';
  choices=maliLink('www-komputer-masaze.html?view=reservation&kind='+maliAudience,maliAudience==='pary'?'pair':'self',maliAudience==='pary'?'Masaże dla par':'Masaże dla jednej osoby','Porównaj masaże i wybierz czas')+maliLink('www-komputer-rytualy.html?view=reservation','lotus','Poznaj rytuały','Odkryj ceremonie Thai Maliwan');
 }
 if(maliStep==='gift'){
  heading='Komu podarujesz chwilę relaksu?';intro='Wybierz rodzaj bonu. Dalej zobaczysz zabiegi, ceny i podgląd prezentu.';
  choices=maliLink('www-komputer-bony.html?view=voucher&kind=osoba','self','Bon dla jednej osoby','Chwila tylko dla obdarowanej osoby')+maliLink('www-komputer-bony.html?view=voucher&kind=pary','pair','Bon dla pary','Wspólny czas w Thai Maliwan')+maliLink('www-komputer-bony.html?view=voucher&kind=rytualy','lotus','Bon na rytuał','Podaruj ceremonię spa');
 }
 if(maliStep==='salon'){
  const salon=maliwanInfo.salons.find(s=>s.id===maliSalon);
  heading='Zapraszamy na '+(maliSalon==='ZW'?'Zwierzyniecką.':'Szewską.');intro='Tu znajdziesz nas i skontaktujesz się z recepcją.';
  choices=`<div class="mali-contact"><p><b>${maliEsc(salon.address)}</b><span>${maliEsc(salon.city)}</span></p><p><span>Godziny salonu</span><b>${maliEsc(salon.hours)}</b></p><p><span>Recepcja</span><b>${maliEsc(salon.reception)}</b></p><div><a href="tel:${maliEsc(salon.tel)}">${maliEsc(salon.phone)}</a><a href="${maliEsc(salon.mapUrl)}" target="_blank" rel="noopener">Pokaż drogę ↗</a></div></div>`;
 }
 maliApp.innerHTML=`<div class="mali-topline"><p class="detail-label">TWÓJ PRZEWODNIK PO THAI MALIWAN</p><label class="massage-salon">Wybierz salon<select id="mali-salon" aria-label="Salon"><option value="ZW" ${maliSalon==='ZW'?'selected':''}>Zwierzyniecka</option><option value="SZ" ${maliSalon==='SZ'?'selected':''}>Szewska</option></select></label></div><section class="mali-scene" aria-label="Pomoc Mali"><div class="mali-host"><div class="mali-halo" aria-hidden="true"></div><div class="mali-greeting"><span>Jestem Mali.</span><small>Pomogę Ci wybrać.</small></div><img class="mali-portrait" src="www-assets/menu-koncepcja/mali-cutout-v1.png" alt="Mali, wirtualna przewodniczka Thai Maliwan"></div><div class="mali-conversation"><p class="mali-eyebrow">${maliStep==='start'?'ZACZNIJMY OD CIEBIE':'TWOJA CHWILA W MALIWAN'}</p><h1 tabindex="-1">${heading}</h1><p class="mali-intro">${intro}</p><div class="mali-choices ${maliStep==='start'?'mali-start':''}">${choices}</div>${maliStep!=='start'?'<button type="button" class="mali-back" data-mali-choice="start">← Wróć do początku</button>':''}<p class="mali-preview">Podgląd przewodnika z gotowymi wskazówkami. Czat AI nie jest jeszcze podłączony.</p></div></section>`;
 syncSalonLinks(maliSalon);document.querySelector('[data-mali-nav]').classList.add('active');
 if(focus)maliApp.querySelector('h1').focus({preventScroll:true});
}
maliApp.addEventListener('click',e=>{
 const button=e.target.closest('[data-mali-choice]');if(!button)return;
 const id=button.dataset.maliChoice;
 if(id==='self'||id==='pair'){maliAudience=id==='pair'?'pary':'osoba';maliStep='offer';}else maliStep=id;
 renderMali(true);
});
maliApp.addEventListener('change',e=>{
 if(e.target.id!=='mali-salon')return;
 maliSalon=validSalon(e.target.value);const url=new URL(location.href);url.searchParams.set('salon',maliSalon);history.replaceState(null,'',url);renderMali();
});
renderMali();
