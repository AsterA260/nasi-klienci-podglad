/* Mobile reservation presentation. Uses the existing catalogue and preview-only form. */
(()=>{'use strict';
 if(view!=='reservation'||location.pathname.split('/').pop()!=='www.html')return;
 const phone=matchMedia('(max-width:760px)'),baseRender=renderPage;
 const arrow='<span aria-hidden="true">→</span>';
 const paths={calendar:'M5 4v4m14-4v4M3 10h18M5 6h14a2 2 0 0 1 2 2v12H3V8a2 2 0 0 1 2-2Zm2 8h2m4 0h2m-8 3h2',clock:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v6l4 2',person:'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM4 21v-3c0-5 16-5 16 0v3Z',summary:'M5 3h14v18H5ZM8 7h8m-8 4h8m-8 4h5'};
 const icon=name=>`<svg class="ref-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="${paths[name]}"/></svg>`;
 const keyOf=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
 const monday=d=>{const v=new Date(d);v.setDate(v.getDate()-(v.getDay()+6)%7);v.setHours(0,0,0,0);return v;};
 let week=monday(today),isPhone=phone.matches;
 const locale=()=>window.maliwanLocale||'pl-PL';
 const salonName=()=>state.salon==='ZW'?'Zwierzyniecka':'Szewska';
 function selectedPhoto(){const x=state.selected;return offerPhoto(x,catalogue.filter(t=>t.salon===x.salon&&t.kind===x.kind).indexOf(catalogue.find(t=>t.url===x.url&&t.salon===x.salon)));}
 function steps(active=1){return `<ol class="ref-steps" aria-label="Etapy rezerwacji">${['Wybór oferty','Termin i dane','Potwierdzenie'].map((s,i)=>`<li ${active===i+1?'aria-current="step"':''}><span>${i+1}</span><b>${s}</b></li>`).join('')}</ol>`;}
 function salons(){return `<div class="booking-salons" aria-label="Wybierz salon">${['ZW','SZ'].map(s=>`<button type="button" data-salon="${s}" aria-pressed="${state.salon===s}" class="${state.salon===s?'selected':''}"><img class="salon-logo" src="www-assets/thai-maliwan-mark.png" alt=""><b>${s==='ZW'?'Zwierzyniecka':'Szewska'}</b></button>`).join('')}</div>`;}
 function landing(){
  const photos={osoba:'rezerwacje-wybrane/kategoria-osoba-klisza.png',pary:'rezerwacje-wybrane/kategoria-pary.jpg',rytualy:'rezerwacje-wybrane/kategoria-rytualy-klisza.png'};
  return `${steps()}${salons()}<h1>Jak chcesz zarezerwować?</h1><div class="ref-methods"><button type="button" class="ref-gold" data-ref-offers>Rezerwuję wizytę ${arrow}</button><button type="button" data-stage="bon">Mam bon — chcę go wykorzystać ${arrow}</button></div><h2 class="ref-divider" id="ref-offers" tabindex="-1"><span>Wybierz masaż</span></h2><div class="ref-categories">${Object.entries(kinds).map(([k,[name,description]])=>`<button type="button" class="ref-category" data-kind="${k}"><img src="www-assets/${photos[k]}" alt=""><span class="ref-category-copy"><strong>${name}</strong><span>${k==='rytualy'?'Wyjątkowe ceremonie i głęboki relaks.':description}</span><b>Zobacz ofertę →</b></span><span class="ref-chevron" aria-hidden="true">›</span></button>`).join('')}</div>`;
 }
 function calendar(){
  const days=Array.from({length:7},(_,i)=>{const d=new Date(week);d.setDate(d.getDate()+i);return d;});
  const end=days[6],label=week.getMonth()===end.getMonth()?week.toLocaleDateString(locale(),{month:'long',year:'numeric'}):`${week.toLocaleDateString(locale(),{month:'short'})} – ${end.toLocaleDateString(locale(),{month:'short',year:'numeric'})}`;
  return `<div class="ref-date-heading"><h2>${icon('calendar')}<span>1. Wybierz termin wizyty</span></h2><div class="ref-week-nav"><span>${label}</span><button type="button" data-ref-week="-1" aria-label="Poprzedni tydzień" ${week<=monday(today)?'disabled':''}>‹</button><button type="button" data-ref-week="1" aria-label="Następny tydzień">›</button></div></div><div class="ref-calendar compact-calendar" aria-label="Przykładowe terminy">${days.map(d=>{const key=keyOf(d),past=d<today,selected=bookingDate===key;return `<div class="ref-day"><span class="ref-day-name">${d.toLocaleDateString(locale(),{weekday:'short'})}</span><button type="button" data-booking-date="${key}" class="${selected?'selected':''}" aria-pressed="${selected}" aria-label="${d.toLocaleDateString(locale(),{day:'numeric',month:'long',year:'numeric'})}" ${past?'disabled':''}>${d.getDate()}</button><span class="ref-day-state ${past?'unavailable':''}"><i aria-hidden="true"></i><span>${past?'Niedostępny':selected?'Wybrany':'Dostępny'}</span></span></div>`;}).join('')}</div><div class="ref-time-heading"><h2>${icon('clock')}<span>2. Wybierz godzinę</span></h2></div><div class="ref-times">${['12:00','13:30','15:00','17:30','19:00','20:30'].map((t,i)=>`<div><button type="button" data-booking-time="${t}" aria-pressed="${state.time===t}" class="${state.time===t?'selected':''}" ${!bookingDate||i>3?'disabled':''}>${t}</button>${i>3?'<small>Niedostępny</small>':''}</div>`).join('')}</div>`;
 }
 function recap(){const x=state.selected;return `<section class="ref-panel ref-recap"><div class="ref-recap-heading"><h2>${icon('summary')}<span>Podsumowanie rezerwacji</span></h2><button type="button" data-stage="services">Zmień wybór</button></div><div class="ref-recap-body"><img src="${selectedPhoto()}" alt=""><dl><div><dt>Masaż</dt><dd>${esc(x.name)}<small>${x.minutes} min · ${x.price} zł</small></dd></div><div><dt>Salon</dt><dd>${salonName()}</dd></div><div><dt>Data</dt><dd>${bookingDate?new Date(bookingDate+'T12:00:00').toLocaleDateString(locale(),{day:'numeric',month:'long',year:'numeric',weekday:'long'}):'Wybierz dzień'}</dd></div><div><dt>Godzina</dt><dd>${state.time||'Wybierz godzinę'}</dd></div></dl></div></section>`;}
 function appointment(){const x=state.selected;return `<section class="ref-treatment"><img src="${selectedPhoto()}" alt=""><div><h1>${esc(x.name)}</h1><p>${x.minutes} min · ${x.price} zł</p></div><label class="ref-salon-select"><span>Salon</span><select id="compact-salon" aria-label="Salon"><option value="ZW" ${state.salon==='ZW'?'selected':''}>Zwierzyniecka</option><option value="SZ" ${state.salon==='SZ'?'selected':''}>Szewska</option></select></label></section><form id="compact-booking-form" class="ref-booking-form"><section class="ref-panel">${calendar()}</section><section class="ref-panel ref-client"><h2>${icon('person')}<span>3. Masażystka i Twoje dane</span></h2><div class="ref-fields"><label class="ref-full">Preferowana masażystka (opcjonalnie)<select id="compact-staff" name="staff"><option value="any">Dowolna dostępna</option>${bookingStaff().map(name=>`<option value="${esc(name)}" ${state.staff===name?'selected':''}>${esc(name)}</option>`).join('')}</select></label>${['firstName','lastName','phone','email'].map((n,i)=>`<label>${['Imię','Nazwisko','Telefon','E-mail'][i]}<input name="${n}" type="${i===2?'tel':i===3?'email':'text'}" autocomplete="${['given-name','family-name','tel','email'][i]}" placeholder="${['Wpisz imię','Wpisz nazwisko','Wpisz numer telefonu','Wpisz adres e-mail'][i]}" maxlength="${i===3?254:i===2?24:60}" value="${esc(bookingDraft[n])}" required></label>`).join('')}</div><p class="ref-help">Możesz wybrać masażystkę lub pozostawić wybór nam.</p></section>${recap()}<p id="booking-error" role="alert">${esc(bookingError)}</p><button type="submit" class="ref-gold ref-submit">Przejdź do podsumowania ${arrow}</button><p class="ref-preview-note">Podgląd — terminy przykładowe. Użyj fikcyjnych danych; rezerwacja nie zostanie wysłana.</p></form>`;}
 renderPage=function(){
  const active=phone.matches;document.body.classList.toggle('reservation-reference',active);
  document.body.classList.toggle('ref-appointment',active&&['calendar','data'].includes(state.stage)&&!!state.selected);
  if(!active){baseRender();return;}
  if(['start','categories'].includes(state.stage)){document.body.classList.remove('compact-booking-step');app.innerHTML=landing();return;}
  if(['calendar','data'].includes(state.stage)&&state.selected){document.body.classList.add('compact-booking-step');state.stage='calendar';app.innerHTML=appointment();return;}
  baseRender();
  if(state.stage==='services'){const oldBack=app.querySelector('a.back');if(oldBack)oldBack.outerHTML='<button type="button" class="back" data-stage="categories">← Wróć do kategorii</button>';}
  if(['services','bon','done'].includes(state.stage))app.insertAdjacentHTML('afterbegin',steps(state.stage==='done'?3:1));
 };
 app.addEventListener('click',e=>{
  if(!phone.matches)return;const b=e.target.closest('button');if(!b)return;
  if(b.hasAttribute('data-ref-offers')){e.stopImmediatePropagation();const heading=document.querySelector('#ref-offers');heading?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});heading?.focus({preventScroll:true});}
  if(b.dataset.refWeek){e.stopImmediatePropagation();const next=new Date(week);next.setDate(next.getDate()+Number(b.dataset.refWeek)*7);if(next<monday(today))return;week=next;render();document.querySelector(`[data-ref-week="${b.dataset.refWeek}"]`)?.focus({preventScroll:true});}
 });
 phone.addEventListener('change',()=>{if(isPhone!==phone.matches){isPhone=phone.matches;render();}});
 // New labels join the existing PL / EN / TH dictionary before it is initialised.
 window.MALIWAN_TRANSLATIONS.push(
  ['Wybór oferty','Choose a treatment','เลือกบริการ'],['Termin i dane','Date and details','วันเวลาและข้อมูล'],['Potwierdzenie','Confirmation','การยืนยัน'],
  ['Wyjątkowe ceremonie i głęboki relaks.','Special rituals and deep relaxation.','พิธีสปาพิเศษและการผ่อนคลายอย่างล้ำลึก'],
  ['1. Wybierz termin wizyty','1. Choose a date','1. เลือกวันที่'],['2. Wybierz godzinę','2. Choose a time','2. เลือกเวลา'],['3. Masażystka i Twoje dane','3. Therapist and your details','3. หมอนวดและข้อมูลของคุณ'],
  ['Preferowana masażystka (opcjonalnie)','Preferred therapist (optional)','หมอนวดที่ต้องการ (ไม่บังคับ)'],['Podsumowanie rezerwacji','Booking summary','สรุปการจอง'],['Przejdź do podsumowania','Continue to summary','ไปที่สรุปการจอง'],
  ['Wpisz imię','First name','ชื่อ'],['Wpisz nazwisko','Last name','นามสกุล'],['Wpisz numer telefonu','Phone number','หมายเลขโทรศัพท์'],['Wpisz adres e-mail','Email address','อีเมล'],
  ['Niedostępny','Unavailable','ไม่ว่าง'],['Dostępny','Available','ว่าง'],['Wybrany','Selected','เลือกแล้ว'],['Poprzedni tydzień','Previous week','สัปดาห์ก่อน'],['Następny tydzień','Next week','สัปดาห์ถัดไป'],
  ['Przykładowe terminy','Example dates','วันตัวอย่าง'],['Etapy rezerwacji','Booking steps','ขั้นตอนการจอง'],['Podgląd — terminy przykładowe. Użyj fikcyjnych danych; rezerwacja nie zostanie wysłana.','Preview — example dates. Use fictional details; no booking will be sent.','ตัวอย่าง — วันเวลาเป็นข้อมูลตัวอย่าง กรุณาใช้ข้อมูลสมมติ ระบบจะไม่ส่งการจอง']
 );
 render();
})();
