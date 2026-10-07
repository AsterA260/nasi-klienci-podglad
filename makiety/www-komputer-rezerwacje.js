'use strict';
// Desktop-only presentation: the mobile catalogue and flow stay unchanged.
const desktopBaseRender = renderPage;
const bookingDraft = {firstName:'',lastName:'',phone:'',email:''};
const today = new Date(); today.setHours(0,0,0,0);
let bookingMonth = new Date(today.getFullYear(),today.getMonth(),1);
let bookingDate = null;
let bookingError = '';
let completedBooking = null;
const monthLabel = () => bookingMonth.toLocaleDateString(window.maliwanLocale||'pl-PL',{month:'long',year:'numeric'});
const dateLabel = () => bookingDate ? new Date(bookingDate+'T12:00:00').toLocaleDateString(window.maliwanLocale||'pl-PL',{day:'numeric',month:'long',year:'numeric'}) : 'Wybierz dzień';
function desktopCalendar(){
 const year=bookingMonth.getFullYear(),month=bookingMonth.getMonth();
 const offset=(new Date(year,month,1).getDay()+6)%7;
 const days=new Date(year,month+1,0).getDate();
 return `<div class="month-nav"><button type="button" data-month="-1" aria-label="Poprzedni miesiąc" ${year===today.getFullYear()&&month===today.getMonth()?'disabled':''}>‹</button><h2>${monthLabel()}</h2><button type="button" data-month="1" aria-label="Następny miesiąc">›</button></div><div class="calendar compact-calendar" aria-label="Wybierz dzień">${['Pn','Wt','Śr','Cz','Pt','So','Nd'].map(d=>`<span class="day-name">${d}</span>`).join('')}${'<span></span>'.repeat(offset)}${Array.from({length:days},(_,i)=>{
 const d=i+1,key=`${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
 return `<button type="button" data-booking-date="${key}" aria-label="${d} ${monthLabel()}" aria-pressed="${bookingDate===key}" class="${bookingDate===key?'selected':''}" ${new Date(year,month,d)<today?'disabled':''}>${d}</button>`;
 }).join('')}</div>`;
}
function compactBooking(){
 const x=state.selected;
 if(!x){state.stage='services';desktopBaseRender();return;}
 const staff=bookingStaff();
 app.innerHTML=`<div class="compact-heading"><div><p class="detail-label">TWOJA CHWILA RELAKSU</p><h1>Dokończ rezerwację</h1></div><label class="compact-salon">Salon<select id="compact-salon" aria-label="Salon"><option value="ZW" ${state.salon==='ZW'?'selected':''}>Zwierzyniecka</option><option value="SZ" ${state.salon==='SZ'?'selected':''}>Szewska</option></select></label></div>
 <div class="chosen-treatment"><div><b>${esc(x.name)}</b><span>${x.minutes} min · ${x.price} zł</span></div>${back('services','Zmień masaż')}</div>
 <form id="compact-booking-form" class="booking-workspace">
 <section class="panel compact-date-panel" aria-label="Termin wizyty">${desktopCalendar()}<div class="time-heading"><h3>Godzina</h3><span>${bookingDate?'Wybierz poniżej':'Najpierw wybierz dzień'}</span></div><div class="times">${['12:00','13:30','15:00','17:30'].map(t=>`<button type="button" class="time ${state.time===t?'selected':''}" data-booking-time="${t}" aria-pressed="${state.time===t}" ${!bookingDate?'disabled':''}>${t}</button>`).join('')}</div><p class="compact-demo-note">Terminy przykładowe — dostępność salonu nie jest jeszcze podłączona.</p></section>
 <section class="panel compact-client-panel" aria-label="Masażystka i dane klienta"><h2>Masażystka i Twoje dane</h2><div class="fields compact-fields"><label class="full-field">Preferowana masażystka<select name="staff" id="compact-staff"><option value="any">Dowolna dostępna</option>${staff.map(name=>`<option value="${esc(name)}" ${state.staff===name?'selected':''}>${esc(name)}</option>`).join('')}</select></label>${['firstName','lastName','phone','email'].map((name,i)=>`<label>${['Imię','Nazwisko','Telefon','E-mail'][i]}<input name="${name}" type="${i===2?'tel':i===3?'email':'text'}" autocomplete="${['given-name','family-name','tel','email'][i]}" ${i===2?'inputmode="tel"':''} maxlength="${i===3?254:i===2?24:60}" value="${esc(bookingDraft[name])}" required></label>`).join('')}</div><p class="compact-demo-note">${state.kind==='pary'||/cztery ręce/i.test(x.name)?'Wybierz preferowaną masażystkę. Pozostały skład zostanie dobrany według dostępności.':'Możesz wybrać masażystkę lub pozostawić wybór nam.'}</p></section>
 <div class="booking-confirm"><div><p class="booking-recap">${dateLabel()}${state.time?' · '+state.time:''}<span>${esc(state.staff||'Dowolna masażystka')} · <b>${x.price} zł</b></span></p><p class="compact-demo-note">Podgląd — użyj fikcyjnych danych. Rezerwacja nie zostanie wysłana.</p><p id="booking-error" role="alert">${esc(bookingError)}</p></div><button class="primary" type="submit">Sprawdź rezerwację →</button></div>
 </form>`;
}
renderPage=function(){
 const compact=view==='reservation'&&['calendar','data'].includes(state.stage);
 document.body.classList.toggle('compact-booking-step',compact);
 if(compact){state.stage='calendar';compactBooking();return;}
 if(state.stage==='done'&&completedBooking){
 const x=completedBooking;
 app.innerHTML=`<div class="compact-heading"><h1>Podsumowanie podglądu</h1></div><section class="panel booking-complete"><h2>${esc(x.name)}</h2><p>${x.salon} · ${x.minutes} min · ${x.price} zł</p><p>${x.dateKey?new Date(x.dateKey+'T12:00:00').toLocaleDateString(window.maliwanLocale||'pl-PL',{day:'numeric',month:'long',year:'numeric'}):x.date} · ${x.time}</p><p>Masażystka: ${esc(x.staff||'Dowolna dostępna')}</p><p>Nie utworzono rezerwacji. Dane formularza nie zostały wysłane ani zapisane.</p><a class="outline-link" href="www-komputer-rezerwacje.html?view=reservation&salon=${state.salon}">Zacznij ponownie →</a></section>`;
 return;
 }
 desktopBaseRender();
};
app.addEventListener('input',e=>{
 if(e.target.form?.id==='compact-booking-form'&&Object.hasOwn(bookingDraft,e.target.name))bookingDraft[e.target.name]=e.target.value;
});
app.addEventListener('change',e=>{
 if(e.target.id==='compact-staff'){state.staff=e.target.value==='any'?null:e.target.value;render();document.querySelector('#compact-staff')?.focus();}
 if(e.target.id==='compact-salon'){
 state.salon=validSalon(e.target.value);state.selected=null;state.detail=null;state.date=null;state.time=null;state.staff=null;bookingDate=null;state.stage='services';bookingError='';render();
 }
});
app.addEventListener('click',e=>{
 const el=e.target.closest('button');if(!el||view!=='reservation')return;
 if(el.dataset.item!==undefined){
 e.stopImmediatePropagation();const x=catalogue[Number(el.dataset.item)],p=x?.prices.find(p=>p.minutes===Number(el.dataset.minutes));if(!p)return;
 state.detail=Number(el.dataset.item);state.selected={...x,...p};state.date=null;state.time=null;state.staff=null;bookingDate=null;bookingError='';state.stage='calendar';render();window.scrollTo({top:0,behavior:'instant'});document.querySelector('.compact-heading h1')?.setAttribute('tabindex','-1');document.querySelector('.compact-heading h1')?.focus({preventScroll:true});return;
 }
 if(el.dataset.month){e.stopImmediatePropagation();const next=new Date(bookingMonth.getFullYear(),bookingMonth.getMonth()+Number(el.dataset.month),1);if(next<new Date(today.getFullYear(),today.getMonth(),1))return;bookingMonth=next;render();document.querySelector(`[data-month="${el.dataset.month}"]`)?.focus();}
 if(el.dataset.bookingDate){e.stopImmediatePropagation();bookingDate=el.dataset.bookingDate;state.date=Number(bookingDate.slice(-2));state.time=null;bookingError='';render();document.querySelector(`[data-booking-date="${bookingDate}"]`)?.focus();}
 if(el.dataset.bookingTime){e.stopImmediatePropagation();state.time=el.dataset.bookingTime;bookingError='';render();document.querySelector(`[data-booking-time="${state.time}"]`)?.focus();}
},true);
app.addEventListener('submit',e=>{
 if(e.target.id!=='compact-booking-form')return;e.preventDefault();e.stopImmediatePropagation();
 const form=e.target;
 if(!bookingDate||!state.time){bookingError='Wybierz dzień i godzinę wizyty.';document.querySelector('#booking-error').textContent=bookingError;return;}
 const phone=bookingDraft.phone.trim();
 if(!/^\+?[0-9 ()-]+$/.test(phone)||!normalizeClientPhone(phone)){bookingError='Podaj poprawny numer telefonu.';document.querySelector('#booking-error').textContent=bookingError;form.elements.phone.focus();return;}
 if(!bookingDraft.firstName.trim()||!bookingDraft.lastName.trim()){bookingError='Uzupełnij imię i nazwisko.';document.querySelector('#booking-error').textContent=bookingError;return;}
 completedBooking={...state.selected,salon:state.salon==='ZW'?'Zwierzyniecka':'Szewska',date:dateLabel(),dateKey:bookingDate,time:state.time,staff:state.staff};
 Object.keys(bookingDraft).forEach(k=>bookingDraft[k]='');state.clientPhone=null;bookingError='';state.stage='done';render();window.scrollTo({top:0,behavior:'instant'});
},true);
