/* Preview-only connections; never write a booking or charge a payment. */
const previewRoutes={0:'www.html?view=reservation',2:'www.html?view=voucher',1:'www.html?view=about',3:'www.html?view=contact'};
const previewNames={pl:['Rezerwacja','Kup voucher','O nas','Kontakt'],en:['Book','Gift voucher','About us','Contact'],th:['จองคิว','ซื้อบัตรกำนัล','เกี่ยวกับเรา','ติดต่อ']};
function syncPreviewNav(){document.querySelectorAll('.mnode').forEach(a=>{const i=Number(a.dataset.node);a.href=previewRoutes[i]||a.href;a.querySelector('b').textContent=previewNames[LANG][NODE_UI[i]];a.querySelector('svg').innerHTML=i===1?ic.osoba:i===3?ic.pin:NODES[i].i;});}
openRez=function(){location.href=previewRoutes[0];};
const oldSetLang=setLang;setLang=function(l){oldSetLang(l);syncPreviewNav();};syncPreviewNav();
const social=document.createElement('nav');social.className='preview-social';social.setAttribute('aria-label','Bądźmy w kontakcie');
// Public contact links already saved in the audited source pages.
social.innerHTML="<a aria-label=\"Instagram\" href=\"https://www.instagram.com/thaimaliwan_zwierzyniecka/?igshid=OGQ5ZDc2ODk2ZA%3D%3D\"><svg viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"17.5\" cy=\"6.5\" r=\".7\"/></svg></a><a aria-label=\"Facebook\" href=\"https://www.facebook.com/thaimaliwanpl/?locale=pl_PL\">f</a><a aria-label=\"E-mail\" href=\"mailto:info@thaimaliwan.pl\"><svg viewBox=\"0 0 24 24\"><rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\"/><path d=\"m2 5 10 8 10-8\"/></svg></a>";
document.body.append(social);
const note=document.createElement('a');note.className='preview-label';note.href='www.html?view=plan';note.textContent='Makieta WWW · plan i zakres testów';document.body.append(note);
// Prevent carousel swipe from stealing taps on the added navigation.
social.addEventListener('touchstart',e=>e.stopPropagation(),{passive:true});
