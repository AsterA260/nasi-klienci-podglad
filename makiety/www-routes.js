/* Preview routing only. No bookings, orders or storage. */
'use strict';
const salonRoutes={
 ZW:{name:'Zwierzyniecka',address:'ul. Zwierzyniecka 14, lok. 7, Kraków',phone:'+48 888 496 495',tel:'+48888496495',origin:'https://thaimaliwan.pl',email:'info@thaimaliwan.pl',instagram:'https://www.instagram.com/thaimaliwan_zwierzyniecka/?igshid=OGQ5ZDc2ODk2ZA%3D%3D',facebook:'https://www.facebook.com/thaimaliwanpl/?locale=pl_PL'},
 SZ:{name:'Szewska',address:'ul. Szewska 12, I piętro, Kraków',phone:'+48 881 069 692',tel:'+48881069692',origin:'https://thaimaliwanspa.pl',email:'szewska@thaimaliwan.pl',instagram:'https://www.instagram.com/thaimaliwan_szewska/',facebook:'https://www.facebook.com/thaimaliwanszewska?locale=pl_PL'}
};
const salonPages={pricing:'/cennik/',gallery:'/galeria/',blog:'/blog/',rules:'/regulaminy/',privacy:'/polityka-prywatnosci/'};
function validSalon(s){return s==='SZ'?'SZ':'ZW';}
function sourcePage(page,salon){if(['pricing','gallery','blog'].includes(page))return 'www-menu-strony.html?view='+page+'&returnTo='+(returnsToFilmMenu()?'menu':'www')+'&salon='+validSalon(salon);return salonRoutes[validSalon(salon)].origin+salonPages[page];}
function returnsToFilmMenu(){
 const page=location.pathname.split('/').pop();
 return new URLSearchParams(location.search).get('returnTo')==='menu'||page==='www.html';
}
function previewLink(href,salon,keepExplicit=false){
 // Every legacy home link returns to the approved current homepage.
 href=href.replace(/^mobilna-v14\.html(?=\?|#|$)/,'www-komputer-luxury.html');
 if(returnsToFilmMenu())href=href.replace(/^www-komputer-luxury\.html(?=\?|#|$)/,'menu-filmowe-salony.html');
 if(!/^(?:\?|www(?:-menu-strony|-komputer-(?:luxury|rezerwacje|bony|masaze|rytualy|mali|o-nas|kontakt|masazystki))?\.html(?:\?|$)|menu-filmowe-salony\.html|mobilna-v14\.html(?:\?|$))/.test(href))return href;
 const i=href.indexOf('#'),hash=i<0?'':href.slice(i),raw=i<0?href:href.slice(0,i),q=raw.indexOf('?'),path=q<0?raw:raw.slice(0,q),params=new URLSearchParams(q<0?'':raw.slice(q+1));
 if(path!=='menu-filmowe-salony.html'&&path!=='www-komputer-luxury.html'&&(returnsToFilmMenu()||location.pathname.endsWith('/menu-filmowe-salony.html')))params.set('returnTo','menu');
 if(path==='menu-filmowe-salony.html'){params.delete('returnTo');params.set('v','20261007-menu-powrot');}
 if(path==='www-komputer-luxury.html')params.set('v','20261007-aktualna');
 if(!keepExplicit||!['ZW','SZ'].includes(params.get('salon')))params.set('salon',validSalon(salon));
 params.set('lang',window.maliwanLanguage||new URLSearchParams(location.search).get('lang')||'pl');
 return path+'?'+params.toString()+hash;
}
function syncSalonLinks(salon){
 document.querySelectorAll('a[href]').forEach(a=>{
  const page=a.getAttribute('data-salon-page');
  if(Object.prototype.hasOwnProperty.call(salonPages,page)){a.href=sourcePage(page,salon);return;}
  const href=a.getAttribute('href');
  if(href)a.setAttribute('href',previewLink(href,salon,!a.hasAttribute('data-context-salon')));
 });
 const picker=document.querySelector('#salon-context');if(picker)picker.value=validSalon(salon);
}
