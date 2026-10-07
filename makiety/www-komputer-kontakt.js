'use strict';
// Original contact data and test-only form, adapted to the desktop mockup.
const originalDesktopContact=renderContact;
renderContact=function(){
 const template=document.createElement('template');template.innerHTML=originalDesktopContact();
 template.content.querySelectorAll('.about-toolbar,.about-bottom,.contact-jump').forEach(el=>el.remove());
 template.content.querySelectorAll('a[href]').forEach(a=>{
  const href=a.getAttribute('href');
  if(href.startsWith('?')){
   const params=new URLSearchParams(href.slice(1));const target=params.get('view');
   const path=target==='reservation'?'www-komputer-rezerwacje.html':target==='voucher'?'www-komputer-bony.html':target==='about'?'www-komputer-o-nas.html':'www-komputer-kontakt.html';
   a.setAttribute('href',path+'?'+params.toString());
  }
 });
 const form=template.content.querySelector('.contact-form-panel');
 const details=document.createElement('details');details.className='contact-compose';details.id='napisz-do-nas';
 const summary=document.createElement('summary');summary.innerHTML='<span><b>Napisz do wybranego salonu</b><small>Rozwiń formularz wiadomości</small></span><span aria-hidden="true">＋</span>';
 form.replaceWith(details);details.append(summary,form);
 const heading=template.content.querySelector('.contact-heading');
 const note=document.createElement('a');note.className='contact-write-link';note.href='#napisz-do-nas';note.textContent='Wolisz napisać? Otwórz formularz ↓';heading.append(note);
 return template.innerHTML;
};
app.addEventListener('click',e=>{
 if(e.target.closest('a[href="#napisz-do-nas"]'))app.querySelector('.contact-compose').open=true;
});
