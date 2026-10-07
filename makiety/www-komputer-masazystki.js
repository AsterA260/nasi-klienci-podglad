"use strict";
// Portraits, surnames and biographies await the owner's material.
const staffProfiles=Array.from(new Set(maliwanInfo.salons.flatMap(s=>s.staff))).map((name,index)=>({id:'staff-'+index,name,surname:'',photo:'',description:'',salons:maliwanInfo.salons.filter(s=>s.staff.includes(name)).map(s=>s.id)}));
// Owner supplied portraits and salon assignments, 7 October 2026.
// Keep these presentation assignments local; shared reservation data is unchanged.
const suppliedStaffPhotos={Maliwan:'maliwan',Sumalee:'sumalee',Khanjana:'khanjana',Butsakorn:'butsakorn',Cholthida:'choltida',Kai:'kai',Tip:'tip'};
const suppliedStaffOrder=['Maliwan','Sumalee','Khanjana','Tip','Butsakorn','Choltida','Kai'];
const suppliedPortraitPositions={Butsakorn:'50% 48%',Choltida:'36% 44%',Kai:'50% 55%',Tip:'50% 40%'};
for(const profile of staffProfiles){
 if(suppliedStaffPhotos[profile.name])profile.photo='www-assets/masazystki/'+suppliedStaffPhotos[profile.name]+'-klisza-v1.png';
 if(profile.name==='Tip')profile.salons=['ZW'];
 if(profile.name==='Cholthida')profile.name='Choltida';
 profile.photoPosition=suppliedPortraitPositions[profile.name]||'50% 20%';
}
staffProfiles.sort((a,b)=>{const rank=p=>{const i=suppliedStaffOrder.indexOf(p.name);return i<0?suppliedStaffOrder.length:i;};return rank(a)-rank(b);});
const staffApp=document.querySelector('#app');
let staffSalon=validSalon(new URLSearchParams(location.search).get('salon'));
const staffEsc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function paintStaff(){
 const salon=maliwanInfo.salons.find(s=>s.id===staffSalon);
 staffApp.innerHTML=`<section class="staff-heading"><p class="staff-eyebrow">THAI MALIWAN · NASZ ZESPÓŁ</p><h1>Poznaj nasze masażystki</h1><p class="staff-intro">Twoja chwila relaksu zaczyna się od spotkania.</p></section>
 <nav class="staff-salons" aria-label="Wybierz salon">${maliwanInfo.salons.map(s=>`<button type="button" data-staff-salon="${s.id}" aria-pressed="${s.id===staffSalon}">${staffEsc(s.name)}<span>${staffEsc(s.address)}</span></button>`).join('')}</nav>
 <section class="staff-grid" aria-label="Masażystki — ${staffEsc(salon.name)}">${staffProfiles.filter(p=>p.salons.includes(staffSalon)).map(p=>`<article class="staff-card"><div class="staff-portrait">${p.photo?`<img src="${staffEsc(p.photo)}" alt="${staffEsc((p.name+' '+p.surname).trim())}" style="object-position:${staffEsc(p.photoPosition)}">`:`<div class="staff-photo-placeholder"><svg viewBox="0 0 60 70" fill="none" aria-hidden="true"><circle cx="30" cy="22" r="11"/><path d="M10 61v-7a20 20 0 0 1 40 0v7"/></svg><span>Miejsce na zdjęcie</span></div>`}<span class="staff-location">${p.salons.length>1?'OBA SALONY':staffEsc(salon.name.toUpperCase())}</span></div><div class="staff-copy"><h2>${staffEsc(p.name)}${p.surname?' '+staffEsc(p.surname):''}</h2>${p.description?`<div class="staff-bio"><p>${staffEsc(p.description)}</p></div>`:''}</div></article>`).join('')}</section>
 <div class="staff-bottom"><p>Wybierz salon i poznaj nasz zespół.</p><a href="www-komputer-rezerwacje.html?view=reservation&salon=${staffSalon}">Rezerwacja w salonie ${staffEsc(salon.name)} →</a></div>`;
 const url=new URL(location.href);url.searchParams.set('salon',staffSalon);history.replaceState(null,'',url);syncSalonLinks(staffSalon);
}
staffApp.addEventListener('click',e=>{const button=e.target.closest('[data-staff-salon]');if(!button)return;staffSalon=validSalon(button.dataset.staffSalon);paintStaff();staffApp.querySelector(`[data-staff-salon="${staffSalon}"]`).focus({preventScroll:true});});
paintStaff();
if(returnsToFilmMenu()){const home=staffApp.ownerDocument.querySelector('.home-return');if(home)home.textContent='← Wróć do menu';}
