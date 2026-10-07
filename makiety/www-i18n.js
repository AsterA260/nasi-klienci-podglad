/* Shared local preview translations. Originals, catalogue, prices and user input stay intact. */
(()=>{'use strict';
 const languages=['pl','en','th'],normalize=s=>s.replace(/\s+/g,' ').trim();
 const dictionary=new Map(window.MALIWAN_TRANSLATIONS.map(([pl,en,th])=>[normalize(pl),{pl,en,th}]));
 const folded=new Map();for(const [key,row]of dictionary)folded.set(key.toLocaleLowerCase(),row);
 const reverse=new Map();for(const [pl,en,th]of window.MALIWAN_TRANSLATIONS)for(const text of [en,th])if(!reverse.has(normalize(text)))reverse.set(normalize(text),normalize(pl));
 let lang=new URLSearchParams(location.search).get('lang');if(!languages.includes(lang)){try{lang=localStorage.getItem('maliwan-language');}catch{} }if(!languages.includes(lang))lang='pl';
 const originals=new WeakMap(),attrs=new WeakMap();let pending=false;
 const excluded='script,style,textarea,input,[contenteditable],.i18n-controls,[data-no-translate],.b.ja';
 function translate(value){
  const key=normalize(value),row=dictionary.get(key)||folded.get(key.toLocaleLowerCase());if(row){if(lang==='pl')return value;return key===key.toUpperCase()&&/[a-ząćęłńóśźż]/i.test(key)&&lang==='en'?row[lang].toUpperCase():row[lang];}
  if(key.endsWith(' ·'))return translate(key.slice(0,-2))+' · ';
  if(key.includes(' · '))return key.split(' · ').map(translate).join(' · ');
  if(key.includes(' — '))return key.split(' — ').map(translate).join(' — ');
  if(key.endsWith(' — czas i cena'))return translate(key.slice(0,-' — czas i cena'.length))+' — '+translate('czas i cena');
  let combined=key.match(/^Masażystka:\s*(.+)$/);if(combined)return translate('Masażystka:')+' '+translate(combined[1]);
  let m=key.match(/^([←→↗↓↑►▸▷▶•\/–—]+\s*)(.+?)(\s*[←→↗↓↑►▸▷▶]+)?$/);if(m&&(dictionary.has(m[2])||folded.has(m[2].toLocaleLowerCase())))return m[1]+translate(m[2])+(m[3]||'');
  m=key.match(/^(.+?)(\s*[←→↗↓↑►▸▷▶]+)$/);if(m&&(dictionary.has(m[1])||folded.has(m[1].toLocaleLowerCase())))return translate(m[1])+m[2];
  m=key.match(/^(\d+)\s*min(?:ut)?$/);if(m)return m[1]+(lang==='th'?' นาที':' min');
  m=key.match(/^([\d\s]+[,.]?\d*)\s*zł$/);if(m)return m[1].trim()+(lang==='pl'?' zł':' PLN');
  for(const [prefix,en,th]of [['Zapraszamy na ','Welcome to ','ยินดีต้อนรับสู่สาขา '],['Dla: ','For: ','สำหรับ: '],['Salon: ','Salon: ','สาขา: '],['Bon: ','Voucher: ','บัตรกำนัล: '],['Zadzwoń do salonu ','Call the salon ','โทรหาสาขา ']])if(key.startsWith(prefix))return (lang==='pl'?prefix:lang==='en'?en:th)+key.slice(prefix.length);
  return value;
 }
 window.maliwanText=translate;
 function setContext(){window.maliwanLanguage=lang;window.maliwanLocale=lang==='th'?'th-TH-u-ca-gregory':lang==='en'?'en-GB':'pl-PL';document.documentElement.lang=lang;try{localStorage.setItem('maliwan-language',lang);}catch{}const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(history.state,'',url);}
 function source(value){const key=normalize(value);return dictionary.has(key)?value:reverse.get(key)||value;}
 function visitText(node){
  const current=node.nodeValue;if(!current.trim()||node.parentElement?.closest(excluded))return;
  let record=originals.get(node);if(!record||current!==record.last)record={base:source(current),last:current};
  let translated=translate(record.base);if(translated!==record.base){const edge=record.base.match(/^(\s*)[\s\S]*?(\s*)$/);translated=edge[1]+translated.trim()+edge[2];}if(translated!==current)node.nodeValue=translated;record.last=translated;originals.set(node,record);
 }
 function apply(){
  observer.disconnect();
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);while(walker.nextNode())visitText(walker.currentNode);
  for(const el of document.querySelectorAll('[aria-label],[placeholder],[alt],[title]')){
   if(el.closest('[data-no-translate]'))continue;let record=attrs.get(el)||{};
   for(const key of ['aria-label','placeholder','alt','title'])if(el.hasAttribute(key)){const value=el.getAttribute(key);let item=record[key];if(!item||value!==item.last)item={base:source(value),last:value};const next=translate(item.base);if(value!==next)el.setAttribute(key,next);item.last=next;record[key]=item;}attrs.set(el,record);
  }
  for(const a of document.querySelectorAll('a[href]')){if(a.getAttribute('href').startsWith('#'))continue;try{const url=new URL(a.getAttribute('href'),location.href);if(url.origin===location.origin&&/\/(?:www(?:-menu-strony|-komputer-[\w-]+)?|menu-filmowe-salony)\.html$/.test(url.pathname)){url.searchParams.set('lang',lang);if(!url.searchParams.has('salon'))url.searchParams.set('salon',new URLSearchParams(location.search).get('salon')||'ZW');const next=url.pathname.split('/').pop()+url.search+url.hash;if(a.getAttribute('href')!==next)a.setAttribute('href',next);}}catch{}}
  for(const button of document.querySelectorAll('#desktopLang button[data-lang],#lang button[data-lang],.i18n-controls button[data-lang]')){button.classList.toggle('on',button.dataset.lang===lang);button.setAttribute('aria-pressed',String(button.dataset.lang===lang));}
  document.documentElement.lang=lang;for(const rail of document.querySelectorAll('.world-rail'))rail.style.setProperty('--rail-txt',JSON.stringify(translate('Wejdź w nasze światy')));
  const title=document.querySelector('title');if(title){let record=originals.get(title)||{base:source(title.textContent),last:title.textContent};let text=translate(record.base);if(text===record.base&&lang!=='pl')text=record.base.replace(/Masażystki/g,lang==='en'?'Therapists':'ทีมหมอนวด').replace(/Rezerwacja/g,lang==='en'?'Booking':'จองคิว').replace(/Masaże/g,lang==='en'?'Massages':'การนวด').replace(/Rytuały/g,lang==='en'?'Spa rituals':'ชุดบริการสปา').replace(/Bony/g,lang==='en'?'Vouchers':'บัตรกำนัล').replace(/Kontakt/g,lang==='en'?'Contact':'ติดต่อเรา').replace(/O nas/g,lang==='en'?'About us':'เกี่ยวกับเรา').replace(/Menu filmowe/g,lang==='en'?'Film menu':'เมนูภาพยนตร์').replace(/makieta|podgląd/gi,lang==='en'?'preview':'หน้าตัวอย่าง');title.textContent=text;record.last=text;originals.set(title,record);}
  observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['href','aria-label','placeholder','alt','title']});pending=false;
 }
 const observer=new MutationObserver(()=>{if(!pending){pending=true;queueMicrotask(apply);}});
 function change(next){if(!languages.includes(next))return;lang=next;setContext();
  if(typeof window.syncDesktopLanguage==='function')window.syncDesktopLanguage(lang);
  if(typeof window.setLang==='function')window.setLang(lang);
  // Calendar renderers preserve their draft; switching only changes locale labels.
  if(document.querySelector('.compact-calendar,.booking-complete')&&typeof window.render==='function')window.render();
  apply();
 }
 setContext();
 if(!document.querySelector('#desktopLang,#lang')){const nav=document.createElement('nav');nav.className='i18n-controls';nav.setAttribute('aria-label','Język');nav.innerHTML=languages.map(l=>`<button type="button" data-lang="${l}" lang="${l}" aria-label="${({pl:'Polski',en:'English',th:'ไทย'})[l]}">${l==='th'?'ไทย':l.toUpperCase()}</button>`).join('');const target=document.querySelector('header .shell,header,.menu-top,.brand-row');if(target)target.append(nav);else document.body.prepend(nav);}
 document.addEventListener('click',event=>{const button=event.target.closest('#desktopLang button[data-lang],#lang button[data-lang],.i18n-controls button[data-lang]');if(button)change(button.dataset.lang);});
 document.addEventListener('invalid',event=>{const input=event.target;if(!input.setCustomValidity)return;input.setCustomValidity(translate(input.validity.typeMismatch?'Podaj poprawny adres e-mail.':'Uzupełnij wymagane pole.'));},true);
 document.addEventListener('input',event=>{if(event.target.setCustomValidity)event.target.setCustomValidity('');});
 // Custom voucher wording is user content, not interface copy.
 
 change(lang);
})();
