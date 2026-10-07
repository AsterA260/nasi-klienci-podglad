'use strict';
// Reuse the approved About copy; only adapt its presentation and local routes.
const originalAbout=renderAbout;
renderAbout=function(){
 const template=document.createElement('template');template.innerHTML=originalAbout();
 template.content.querySelectorAll('.about-toolbar,.about-bottom').forEach(e=>e.remove());
 // Use the already approved, graded salon photographs without another color filter.
 const heroPhoto=template.content.querySelector('.about-hero img');
 heroPhoto.src='www-assets/rezerwacje-wybrane/kategoria-osoba-klisza.png';
 heroPhoto.alt='Powitanie klientki przez masażystkę w salonie Thai Maliwan';
 heroPhoto.setAttribute('width','1024');heroPhoto.setAttribute('height','1536');
 const ritualPhoto=template.content.querySelector('.about-ritual img');
 ritualPhoto.src='www-assets/rezerwacje-wybrane/kategoria-rytualy-klisza.png';
 ritualPhoto.alt='Stemple ziołowe na ozdobnej tacy w Thai Maliwan';

 template.content.querySelectorAll('a[href]').forEach(a=>{
  const href=a.getAttribute('href');
  if(href==='mobilna-v14.html')a.setAttribute('href','www-komputer-luxury.html?v=20261006-10');
  if(href.startsWith('?')){
   const params=new URLSearchParams(href.slice(1));
   const target=params.get('view');
   let path=target==='reservation'?'www-komputer-rezerwacje.html':target==='voucher'?'www-komputer-bony.html':target==='about'?'www-komputer-o-nas.html':target==='contact'?'www-komputer-kontakt.html':'www.html';
   if(target==='reservation'&&params.has('kind'))path=params.get('kind')==='rytualy'?'www-komputer-rytualy.html':'www-komputer-masaze.html';
   a.setAttribute('href',path+'?'+params.toString());
  }
 });
 const team=template.content.querySelector('.about-team');
 const details=document.createElement('details');details.className='desktop-team-details';
 const summary=document.createElement('summary');summary.innerHTML='<span>Poznaj nasz zespół w obu salonach</span><span aria-hidden="true">＋</span>';
 team.replaceWith(details);details.append(summary,team);
 return template.innerHTML;
};
app.addEventListener('click',e=>{
 const link=e.target.closest('a[href="#poznaj-zespol"]');if(!link)return;
 const details=app.querySelector('.desktop-team-details');if(details)details.open=true;
});
