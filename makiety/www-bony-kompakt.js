'use strict';
// One voucher flow shared by desktop and the saved mobile mockup; no checkout requests.
(()=>{
 if(view!=='voucher')return;
 document.body.classList.add('voucher-flow');
 const baseRender=renderPage;
 const draft={firstName:'',lastName:'',email:'',phone:'',recipient:'',message:''};
 let personalize=false;
 const recipientLabel=()=>state.kind==='pary'?'Dla pary':state.kind==='rytualy'?'Rytuał Thai Maliwan':'Dla jednej osoby';
 const salonLabel=()=>state.salon==='SZ'?'Szewska':'Zwierzyniecka';
 const ribbon=`<svg viewBox="0 0 48 94" fill="none" aria-hidden="true"><path d="M21 0h6v94h-6z" fill="#c6a15b"/><path d="M23 0h2v94h-2z" fill="#ebd197"/><path d="M24 29C12 12 3 18 6 27c2 7 12 5 18 2Zm0 0c12-17 21-11 18-2-2 7-12 5-18 2Z" fill="#d7b677" stroke="#98723b"/><path d="m21 32-9 19 7-2 3 5 4-22m1 0 9 19-7-2-3 5-4-22" fill="#d7b677" stroke="#98723b"/><path d="M20 26h8v7h-8z" fill="#b68e49"/></svg>`;
 function gift(){const x=state.selected;return `<div class="gift-preview" aria-label="Podgląd bonu"><span class="gift-preview-ornament" aria-hidden="true"></span><span class="gift-preview-ribbon">${ribbon}</span><div class="gift-preview-brand"><img src="www-assets/thai-maliwan-mark.png" alt=""><span>THAI MALIWAN<small>MASAŻ TAJSKI · KRAKÓW</small></span></div><p class="gift-preview-heading">Bon podarunkowy</p><div class="gift-preview-treatment"><h2>${esc(x.name)}</h2><p>${recipientLabel()} · ${x.minutes} minut</p></div><p id="gift-for" ${!draft.recipient.trim()?'hidden':''}>Dla: ${esc(draft.recipient.trim())}</p><p id="gift-message" ${draft.message.trim()?'data-no-translate':''}>${esc(draft.message.trim()||'Podaruj chwilę relaksu.')}</p></div>`;}
 function checkout(){
 const x=state.selected;if(!x){state.stage='services';baseRender();return;}
 app.innerHTML=`<div class="voucher-heading"><div><p class="eyebrow">MAŁY GEST. PIĘKNE WSPOMNIENIE.</p><h1>Twój prezent, Twoje słowa.</h1></div><span class="voucher-salon">Salon · ${salonLabel()}</span></div><div class="voucher-checkout"><section class="voucher-preview-column"><div class="voucher-preview-caption"><span>Twój bon podarunkowy</span><button type="button" class="back" data-stage="services">← Zmień masaż</button></div>${gift()}<div class="voucher-amount"><span>${esc(x.name)}<small>${x.minutes} minut · ${recipientLabel()}</small></span><strong>${x.price} zł</strong></div><p class="voucher-footnote">Podgląd graficzny — bez numeru bonu i kodu realizacji.</p></section><section class="panel voucher-buyer"><h2>Dane kupującego</h2><form id="voucher-buyer-form"><div class="fields voucher-fields">${['firstName','lastName','email','phone'].map((n,i)=>`<label>${['Imię','Nazwisko','E-mail','Telefon (opcjonalnie)'][i]}<input name="${n}" type="${i===2?'email':i===3?'tel':'text'}" autocomplete="${['given-name','family-name','email','tel'][i]}" maxlength="${i===2?254:i===3?24:60}" value="${esc(draft[n])}" ${i!==3?'required':''}></label>`).join('')}</div><details class="voucher-personalize" ${personalize?'open':''}><summary>Dodaj imię i dedykację <span>opcjonalnie</span></summary><div class="fields"><label>Dla kogo jest bon?<input name="recipient" maxlength="50" value="${esc(draft.recipient)}" placeholder="np. Anny" autocomplete="off"></label><label>Twoja dedykacja<textarea name="message" maxlength="140" rows="2" placeholder="Kilka słów od Ciebie…">${esc(draft.message)}</textarea></label></div></details><p id="voucher-form-error" role="alert"></p><button class="primary" type="submit">Sprawdź podsumowanie →</button><p class="voucher-footnote">Makieta — użyj fikcyjnych danych. Zamówienie i płatność nie zostaną uruchomione.</p></form></section></div>`;
 }
 renderPage=function(){
 document.body.classList.remove('compact-booking-step');
 document.body.classList.toggle('voucher-checkout-step',state.stage==='voucher-checkout'||state.stage==='voucher-complete');
 if(state.stage==='voucher-checkout'){checkout();return;}
 if(state.stage==='voucher-complete'){
 const x=state.selected;
 app.innerHTML=`<div class="voucher-heading"><div><p class="eyebrow">PODGLĄD ZAMÓWIENIA</p><h1>Prezent wybrany.</h1></div></div><section class="panel voucher-complete"><h2>${esc(x.name)}</h2><p>${recipientLabel()} · ${x.minutes} minut · ${salonLabel()}</p><strong>${x.price} zł</strong><p>Test formularza zakończony. Nie utworzono zamówienia, nie pobrano płatności i nie wystawiono bonu. Dane nie zostały wysłane ani zapisane.</p><button type="button" class="primary" data-stage="categories">Wróć do bonów →</button></section>`;
 return;
 }
 baseRender();
 };
 app.addEventListener('click',e=>{
 const el=e.target.closest('button');if(!el)return;
 if(el.dataset.item!==undefined){
 const item=catalogue[Number(el.dataset.item)],price=item?.prices.find(p=>p.minutes===Number(el.dataset.minutes));if(!price)return;
 e.stopImmediatePropagation();state.detail=Number(el.dataset.item);state.selected={...item,...price};state.stage='voucher-checkout';render();window.scrollTo({top:0,behavior:'instant'});const heading=app.querySelector('h1');heading?.setAttribute('tabindex','-1');heading?.focus({preventScroll:true});
 }
 },true);
 app.addEventListener('input',e=>{
 if(e.target.form?.id!=='voucher-buyer-form'||!Object.hasOwn(draft,e.target.name))return;
 draft[e.target.name]=e.target.value;
 if(e.target.name==='recipient'){const line=document.querySelector('#gift-for');line.hidden=!draft.recipient.trim();line.textContent='Dla: '+draft.recipient.trim();}
 if(e.target.name==='message'){const line=document.querySelector('#gift-message');line.toggleAttribute('data-no-translate',!!draft.message.trim());line.textContent=draft.message.trim()||'Podaruj chwilę relaksu.';}
 });
 app.addEventListener('toggle',e=>{if(e.target.classList?.contains('voucher-personalize'))personalize=e.target.open;},true);
 app.addEventListener('submit',e=>{
 if(e.target.id!=='voucher-buyer-form')return;e.preventDefault();e.stopImmediatePropagation();
 const error=document.querySelector('#voucher-form-error');
 if(!draft.firstName.trim()||!draft.lastName.trim()){error.textContent='Uzupełnij imię i nazwisko.';return;}
 if(draft.phone.trim()&&(!/^\+?[0-9 ()-]+$/.test(draft.phone.trim())||!normalizeClientPhone(draft.phone))){error.textContent='Sprawdź numer telefonu lub pozostaw to pole puste.';e.target.elements.phone.focus();return;}
 Object.keys(draft).forEach(key=>draft[key]='');personalize=false;state.stage='voucher-complete';render();window.scrollTo({top:0,behavior:'instant'});
 },true);
})();
