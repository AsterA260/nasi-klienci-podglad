/* Preview-only connections; never write a booking or charge a payment. */
const previewRoutes={0:'www.html?view=reservation',2:'www.html?view=voucher',1:'www.html?view=about',3:'www.html?view=contact'};
const previewNames={pl:['Rezerwacja','Kup voucher','O nas','Kontakt'],en:['Book','Gift voucher','About us','Contact'],th:['จองคิว','ซื้อบัตรกำนัล','เกี่ยวกับเรา','ติดต่อ']};
function syncPreviewNav(){document.querySelectorAll('.mnode').forEach(a=>{const i=Number(a.dataset.node);a.href=previewRoutes[i]||a.href;a.querySelector('b').textContent=previewNames[LANG][NODE_UI[i]];a.querySelector('svg').innerHTML=i===1?ic.osoba:i===3?ic.pin:NODES[i].i;});}
openRez=function(){location.href=previewRoutes[0];};
const oldSetLang=setLang;setLang=function(l){oldSetLang(l);syncPreviewNav();syncPreviewMenu();syncPreviewLegal();};syncPreviewNav();
const social=document.createElement('nav');social.className='preview-social';social.setAttribute('aria-label','Bądźmy w kontakcie');
// Public contact links already saved in the audited source pages.
social.innerHTML="<a aria-label=\"Instagram\" href=\"https://www.instagram.com/thaimaliwan_zwierzyniecka/?igshid=OGQ5ZDc2ODk2ZA%3D%3D\"><svg viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"17.5\" cy=\"6.5\" r=\".7\"/></svg></a><a aria-label=\"Facebook\" href=\"https://www.facebook.com/thaimaliwanpl/?locale=pl_PL\">f</a><a aria-label=\"E-mail\" href=\"mailto:info@thaimaliwan.pl\"><svg viewBox=\"0 0 24 24\"><rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\"/><path d=\"m2 5 10 8 10-8\"/></svg></a>";
document.body.append(social);
const note=document.createElement('a');note.className='preview-label';note.href='www.html?view=plan';note.textContent='Makieta WWW · plan i zakres testów';document.body.append(note);
// Prevent carousel swipe from stealing taps on the added navigation.
social.addEventListener('touchstart',e=>e.stopPropagation(),{passive:true});

// Local preview paths keep the old public SEO addresses unchanged on production.
const previewMenuRoutes=['www.html?view=reservation&kind=osoba','www.html?view=reservation&kind=pary','www.html?view=reservation&kind=rytualy',null,'www.html?view=voucher','www.html?view=about',null,null];
const previewTileOrder=[0,1,2,4,5,6,7,3];
const previewTileNodes=Array.from(document.querySelectorAll('#tiles .tile'));
previewTileNodes.forEach((a,i)=>{a.dataset.previewTile=String(i);if(previewMenuRoutes[i])a.href=previewMenuRoutes[i];});
const previewMenuGroups={pl:['Oferta','Informacje'],en:['Our offer','Information'],th:['บริการ','ข้อมูล']};
const previewGroupNodes=previewMenuGroups.pl.map(()=>{const h=document.createElement('h2');h.className='preview-menu-group';return h;});
const previewTiles=document.querySelector('#tiles');
previewTileOrder.forEach((idx,pos)=>{if(pos===0)previewTiles.append(previewGroupNodes[0]);if(pos===4)previewTiles.append(previewGroupNodes[1]);previewTileNodes[idx].style.transitionDelay=(.06+pos*.05)+'s';previewTiles.append(previewTileNodes[idx]);});
function syncPreviewMenu(){const u=T();previewTileNodes.forEach((a,i)=>{a.querySelector('.cap b').textContent=u.tiles[i][0];a.querySelector('.cap span').textContent=u.tiles[i][1];});previewGroupNodes.forEach((h,i)=>{h.textContent=previewMenuGroups[LANG][i];});}
syncPreviewMenu();
const legal=document.createElement('nav');legal.className='preview-legal';legal.setAttribute('aria-label','Regulaminy i prywatność');
legal.innerHTML='<a href="https://thaimaliwan.pl/regulaminy/" data-legal="rules"></a><a href="https://thaimaliwan.pl/polityka-prywatnosci/" data-legal="privacy"></a>';document.body.append(legal);
function syncPreviewLegal(){const labels={pl:['Regulaminy i zasady','Prywatność'],en:['Terms and rules','Privacy'],th:['ข้อกำหนดและกฎ','ความเป็นส่วนตัว']};legal.querySelector('[data-legal="rules"]').textContent=labels[LANG][0];legal.querySelector('[data-legal="privacy"]').textContent=labels[LANG][1];}
syncPreviewLegal();legal.addEventListener('touchstart',e=>e.stopPropagation(),{passive:true});
document.querySelector('.logo').href='mobilna-v14.html';
document.querySelector('.lk a[data-ui="kontakt"]').href='www.html?view=contact';
