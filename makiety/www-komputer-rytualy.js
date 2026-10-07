'use strict';
// Dedicated ritual catalogue; dates and client details use the accepted shared form.
const ritualDescriptions={
 "rytual-krolewski-thai-spa": {
  "short": "Kąpiel stóp, masaż tajski, ciepłe zioła i refleksologia.",
  "details": "Ceremonia łączy kąpiel stóp, tradycyjny masaż tajski, ciepłe kompresy ziołowe i elementy refleksologii. To rozbudowany rytuał, w którym spotykają się dotyk, ciepło i aromat ziół."
 },
 "rytual-gorace-kamienie-i-ziola": {
  "short": "Ciepło kamieni i aromat tajskich kompresów ziołowych.",
  "details": "Rytuał łączy masaż rozgrzanymi kamieniami z pracą tajskimi kompresami ziołowymi. Ciepło kamieni przeplata się z aromatem i dotykiem ziołowych stempli."
 },
 "rytual-detoks-i-odnowa": {
  "short": "Peeling, drenaż i maska na ciało.",
  "details": "Ceremonia rozpoczyna się peelingiem całego ciała. Następnie wykonywany jest drenaż limfatyczny z elementami akupresury, a ostatni etap stanowi maska na ciało z naturalnych składników."
 },
 "rytual-kwiat-duszy-dla-kobiet": {
  "short": "Olejek różany i delikatny masaż twarzy oraz ciała.",
  "details": "Rytuał dla kobiet wykonywany z użyciem olejku różanego. Delikatne techniki masażu obejmują twarz i ciało, tworząc spokojną ceremonię zapachu i dotyku."
 },
 "rytual-ocean-breath-energetyczny": {
  "short": "Rozciąganie, świadomy oddech i masaż energetyczny.",
  "details": "Dynamiczny rytuał łączący stretching, świadomy oddech i masaż energetyczny. To propozycja dla osób, które szukają bardziej aktywnej pracy z ciałem."
 },
 "klasyczna-maliwan-spa-terapia": {
  "short": "Tradycyjny masaż tajski z refleksoterapią głowy lub stóp.",
  "details": "Pakiet łączy tradycyjny masaż tajski z refleksoterapią. Do wyboru jest praca z głową, ze stopami lub połączenie obu tych zabiegów."
 },
 "oil-aroma-relaks-spa": {
  "short": "Masaż olejkami z refleksoterapią głowy lub stóp.",
  "details": "Masaż olejkami aromatycznymi uzupełnia refleksoterapia głowy lub stóp. Można również wybrać połączenie refleksoterapii stóp i głowy w ramach jednego pakietu."
 },
 "rytual-romantyczny-maliwan-dla-dwojga": {
  "short": "Kąpiel stóp, masaż olejkowy i wspólna chwila przy herbacie.",
  "details": "Ceremonia dla dwóch osób rozpoczyna się aromatyczną kąpielą stóp. Następnie wykonywany jest masaż olejkowy z elementami refleksologii. Rytuał kończy chwila odpoczynku przy tajskiej herbacie."
 }
};
const ritualBaseRender=renderPage;
renderPage=function(){
 state.kind='rytualy';
 const browsing=['start','categories','services'].includes(state.stage);
 document.body.classList.toggle('massage-browsing',browsing);
 document.querySelectorAll('header nav [data-view="reservation"]').forEach(a=>a.classList.remove('active'));
 document.querySelector('[data-ritual-nav]').classList.add('active');
 if(!browsing){ritualBaseRender();return;}
 document.body.classList.remove('compact-booking-step');
 const list=catalogue.filter(x=>x.salon===state.salon&&x.kind==='rytualy');
 const first=list[0];
 const cards=list.slice(1).map((x,index)=>ritualCard(x,index+1)).join('');
 app.innerHTML=`<div class="massage-heading"><div><p class="detail-label">THAI MALIWAN · CEREMONIE SPA</p><h1>Zatrzymaj czas. Wybierz rytuał.</h1><p>Zapach, ciepło i dotyk. Poznaj nasze ceremonie.</p></div><label class="massage-salon">Wybierz salon<select id="ritual-salon" aria-label="Salon"><option value="ZW" ${state.salon==='ZW'?'selected':''}>Zwierzyniecka</option><option value="SZ" ${state.salon==='SZ'?'selected':''}>Szewska</option></select></label></div>${first?ritualCard(first,0,true):'<p>Oferta tego salonu wymaga uzupełnienia.</p>'}<div class="ritual-section-heading"><span>ODKRYJ POZOSTAŁE CEREMONIE</span><span aria-hidden="true"></span></div><section class="ritual-grid" aria-label="Rytuały">${cards}</section><p class="massage-footnote">Ceny z katalogu zapisanej makiety. Wybór czasu otwiera formularz z przykładowymi terminami.</p>`;
};
function ritualCard(x,index,featured=false){
 const idx=catalogue.indexOf(x);
 const slug=(x.url||'').split('/').filter(Boolean).pop();
 const description=ritualDescriptions[slug];
 const sentence=description?.short||(x.text||'');
 const detail=description?.details||(x.text||'');
 return `<article class="ritual-card ${featured?'ritual-featured':''}"><div class="ritual-image"><img src="${offerPhoto(x,index)}" alt="Zdjęcie poglądowe rytuału" ${featured?'fetchpriority="high"':'loading="lazy"'}><span class="ritual-index">${String(index+1).padStart(2,'0')} · THAI MALIWAN</span></div><div class="ritual-copy">${featured?'<p class="detail-label">KRÓLEWSKA CHWILA ODPRĘŻENIA</p>':''}<h2>${esc(x.name)}</h2><p class="ritual-intro">${esc(sentence)}</p><div class="ritual-choice"><p>Wybierz czas i przejdź do rezerwacji</p><div class="variants" role="group" aria-label="${esc(x.name)} — czas i cena">${x.prices.map(p=>`<button type="button" class="variant" data-item="${idx}" data-minutes="${p.minutes}"><span>${p.minutes} min</span><b>${p.price} zł</b><span aria-hidden="true">→</span></button>`).join('')}</div></div><details class="offer-description"><summary>Poznaj przebieg rytuału <span aria-hidden="true">＋</span></summary><p>${esc(detail)}</p></details></div></article>`;
}
app.addEventListener('change',e=>{
 if(e.target.id!=='ritual-salon')return;
 state.salon=validSalon(e.target.value);state.selected=null;state.detail=null;state.date=null;state.time=null;state.staff=null;render();
});
