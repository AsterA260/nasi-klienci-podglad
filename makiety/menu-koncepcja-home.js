/* Preview-only connections; never write a booking or charge a payment. */
const previewSalon=validSalon(new URLSearchParams(location.search).get('salon'));
const previewRoutes={0:'www.html?view=reservation&kind=osoba',2:'www.html?view=reservation&kind=pary',1:'www.html?view=reservation&kind=rytualy',3:'www.html?view=voucher'};
const previewNames={pl:['Dla jednej osoby','Dla par','Rytuały','Bony'],en:['For one','For couples','Rituals','Vouchers'],th:['สำหรับหนึ่งคน','สำหรับคู่','พิธีบำบัด','บัตรของขวัญ']};
const singlePersonWords={pl:['Dla','jednej osoby'],en:['For','one person'],th:['สำหรับ','หนึ่งคน']};
function syncPreviewNav(){document.querySelectorAll('.mnode').forEach(a=>{
  const i=Number(a.dataset.node),label=previewNames[LANG][NODE_UI[i]];
  a.href=previewLink(previewRoutes[i]||a.href,previewSalon);
  a.setAttribute('aria-label',label);
  a.querySelector('b').textContent=i===0?singlePersonWords[LANG][1]:(i===2&&LANG==='en'?'FOR\nCOUPLES':label);
  if(i===0)a.setAttribute('data-top-word',singlePersonWords[LANG][0]);
  else a.removeAttribute('data-top-word');
  a.querySelector('svg').innerHTML=({0:ic.osoba,2:'<circle cx="8" cy="7" r="3"/><circle cx="17" cy="8" r="2.5"/><path d="M2 21v-3a6 6 0 0 1 12 0v3M16 14a5 5 0 0 1 6 5v2"/>',1:'<path d="M12 21C4 19 2 13 3 8c5 1 8 4 9 10M12 21c8-2 10-8 9-13-5 1-8 4-9 10M12 18C7 12 9 5 12 2c3 3 5 10 0 16Z"/>',3:ic.prezent})[i];
});}
openRez=function(){location.href=previewLink(previewRoutes[0],previewSalon);};
const oldSetLang=setLang;setLang=function(l){oldSetLang(l);syncPreviewNav();syncPreviewMenu();syncPreviewLegal();syncMaliGuide();syncPreviewAddress();};syncPreviewNav();
const social=document.createElement('nav');social.className='preview-social';social.setAttribute('aria-label','Bądźmy w kontakcie');
// Public contact links already saved in the audited source pages.
social.innerHTML="<a aria-label=\"Instagram\" href=\"https://www.instagram.com/thaimaliwan_zwierzyniecka/?igshid=OGQ5ZDc2ODk2ZA%3D%3D\"><svg viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"17.5\" cy=\"6.5\" r=\".7\"/></svg></a><a aria-label=\"Facebook\" href=\"https://www.facebook.com/thaimaliwanpl/?locale=pl_PL\">f</a><a aria-label=\"E-mail\" href=\"mailto:info@thaimaliwan.pl\"><svg viewBox=\"0 0 24 24\"><rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\"/><path d=\"m2 5 10 8 10-8\"/></svg></a>";
document.body.append(social);
const note=document.createElement('a');note.className='preview-label';note.href='www.html?view=plan';note.textContent='Makieta WWW · plan i zakres testów';if(new URLSearchParams(location.search).get('test')==='1')document.body.append(note);
// Prevent carousel swipe from stealing taps on the added navigation.
social.addEventListener('touchstart',e=>e.stopPropagation(),{passive:true});

// Local preview paths keep the old public SEO addresses unchanged on production.
const previewMenuRoutes=['www.html?view=reservation&kind=osoba','www.html?view=reservation&kind=pary','www.html?view=reservation&kind=rytualy','www-menu-strony.html?view=pricing','www.html?view=voucher','www-menu-strony.html?view=about','www-menu-strony.html?view=gallery','www-menu-strony.html?view=blog'];
const previewTileOrder=[0,1,2,4,5,6,7,3];
const previewTileNodes=Array.from(document.querySelectorAll('#tiles .tile'));
previewTileNodes.forEach((a,i)=>{a.dataset.previewTile=String(i);if(previewMenuRoutes[i])a.href=previewLink(previewMenuRoutes[i],previewSalon);else a.href=sourcePage(({3:'pricing',6:'gallery',7:'blog'})[i],previewSalon);});
const previewMenuGroups={pl:['Oferta','Informacje'],en:['Our offer','Information'],th:['บริการ','ข้อมูล']};
const previewGroupNodes=previewMenuGroups.pl.map(()=>{const h=document.createElement('h2');h.className='preview-menu-group';return h;});
const previewTiles=document.querySelector('#tiles');
previewTileOrder.forEach((idx,pos)=>{if(pos===0)previewTiles.append(previewGroupNodes[0]);if(pos===4)previewTiles.append(previewGroupNodes[1]);previewTileNodes[idx].style.transitionDelay=(.06+pos*.05)+'s';previewTiles.append(previewTileNodes[idx]);});
function syncPreviewMenu(){const u=T();previewTileNodes.forEach((a,i)=>{a.querySelector('.cap b').textContent=u.tiles[i][0];a.querySelector('.cap span').textContent=u.tiles[i][1];});previewGroupNodes.forEach((h,i)=>{h.textContent=previewMenuGroups[LANG][i];});}
syncPreviewMenu();
const legal=document.createElement('nav');legal.className='preview-legal';legal.setAttribute('aria-label','Regulaminy i prywatność');
legal.innerHTML='<a href="https://thaimaliwan.pl/regulaminy/" data-legal="rules"></a><a href="https://thaimaliwan.pl/polityka-prywatnosci/" data-legal="privacy"></a>';document.body.append(legal);
function syncPreviewLegal(){const labels={pl:['Regulaminy i zasady','Prywatność'],en:['Terms and rules','Privacy'],th:['ข้อกำหนดและกฎ','ความเป็นส่วนตัว']};legal.querySelector('[data-legal="rules"]').textContent=labels[LANG][0];legal.querySelector('[data-legal="privacy"]').textContent=labels[LANG][1];}
syncPreviewLegal();legal.querySelector('[data-legal="rules"]').href=sourcePage('rules',previewSalon);legal.querySelector('[data-legal="privacy"]').href=sourcePage('privacy',previewSalon);legal.addEventListener('touchstart',e=>e.stopPropagation(),{passive:true});
document.querySelector('.logo').href='www-komputer-luxury.html';
document.querySelector('.lk a[data-ui="kontakt"]').href='www.html?view=contact';

// Restore selected salon when returning from inner pages.
document.querySelector('.logo').href=previewLink('www-komputer-luxury.html',previewSalon);
document.querySelector('.lk a[data-ui="kontakt"]').href=previewLink('www.html?view=contact',previewSalon);
note.href=previewLink('www.html?view=plan',previewSalon);
social.querySelector('a[href^="mailto:"]').href='mailto:'+salonRoutes[previewSalon].email;
const legacyRules=document.querySelector('.lk a[data-ui="regul"]');if(legacyRules)legacyRules.href=sourcePage('rules',previewSalon);

social.querySelector('a[aria-label="Instagram"]').href=salonRoutes[previewSalon].instagram;
social.querySelector('a[aria-label="Facebook"]').href=salonRoutes[previewSalon].facebook;
if(typeof WORLDS!=='undefined')Object.values(WORLDS).forEach(list=>list.forEach(w=>{if(w.url==='https://thaimaliwan.pl/oferta/rytualy-spa/')w.url=salonRoutes[previewSalon].origin+(previewSalon==='SZ'?'/oferta/rytualy/':'/oferta/rytualy-spa/');}));

// Większa Mali otwiera ten sam panel co dotychczasowy przycisk asystenta.
function syncMaliGuide(){
 const copy={pl:['Jestem Mali.','Pomogę Ci wybrać →','Mali — pomogę Ci wybrać masaż'],en:['I am Mali.','Let me help you choose →','Mali — help me choose a massage'],th:['ฉันคือมะลิ','ให้ฉันช่วยคุณเลือก →','มะลิ — ช่วยฉันเลือกการนวด']}[LANG];
 document.getElementById('maliGreeting').textContent=copy[0];
 document.getElementById('maliInvitation').textContent=copy[1];
 document.getElementById('aiDot').setAttribute('aria-label',copy[2]);
}
syncMaliGuide();

if(new URLSearchParams(location.search).get("open")==="menu")document.querySelector(".ov").classList.add("open");

// Overlay contact details follow the same selected salon as offers and contact links.
function syncPreviewAddress(){
 const address=document.querySelector('.ovFoot .addr');
 if(!address)return;
 const hours=address.querySelector('[data-ui="hours"]');
 const route=salonRoutes[previewSalon];
 const label=document.createElement('span');label.textContent=route.address;
 const phone=document.createElement('a');phone.href='tel:'+route.tel;phone.textContent=route.phone;
 address.replaceChildren(label,document.createElement('br'),phone,document.createTextNode(' · '));
 if(hours)address.append(hours);
}
syncPreviewAddress();
