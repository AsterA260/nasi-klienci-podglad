'use strict';
const homePanel=document.querySelector('#home-panel');
const homeContent={
 mission:{title:'Nasza misja',content:'<p>Miejsce na rzetelny opis misji portalu Nasi Klienci i zasad, którymi kieruje się AsterA.</p><p class="panel-note">Podgląd układu. Treść tej sekcji jest jeszcze do uzupełnienia.</p>'},
 faq:{title:'FAQ i pomoc',content:'<p><strong>Jak przejść do portalu?</strong><br>Wybierz „Fakty i opinie”. Otworzy się widok z filmem, wszystkimi kafelkami i przykładami opinii.</p><p><strong>Jak zatrzymać film?</strong><br>W portalu użyj przycisku „Zatrzymaj tło”. Otwarcie panelu również wstrzymuje film na czas czytania.</p><p><strong>Jak wrócić tutaj?</strong><br>Kliknij logo w lewym górnym rogu portalu.</p><a class="help-link" href="portal.html">Przejdź do faktów i opinii →</a>'}
};
document.querySelectorAll('[data-panel]').forEach(button=>button.addEventListener('click',()=>{
 const section=homeContent[button.dataset.panel];
 document.querySelector('#home-panel-title').textContent=section.title;
 document.querySelector('#home-panel-content').innerHTML=section.content;
 homePanel.showModal();
}));
document.querySelector('#close-home-panel').addEventListener('click',()=>homePanel.close());
homePanel.addEventListener('click',event=>{if(event.target!==homePanel)return;const bounds=homePanel.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)homePanel.close();});

const sourceMarks={Google:'<svg viewBox="0 0 48 48" aria-label="Google"><path fill="#4285f4" d="M44 24.5c0-1.6-.1-3-.4-4.5H24v8.5h11.2c-.5 2.6-2 4.8-4.3 6.2v5.2h7C42 36.3 44 31 44 24.5Z"/><path fill="#34a853" d="M24 45c5.6 0 10.3-1.8 13.9-5.1l-7-5.2c-1.9 1.3-4.2 2-6.9 2-5.4 0-10-3.6-11.7-8.5H5.2v5.4C8.7 40.4 15.8 45 24 45Z"/><path fill="#fbbc05" d="M12.3 28.2a12.7 12.7 0 0 1 0-8.4v-5.4H5.2a21 21 0 0 0 0 19.2Z"/><path fill="#ea4335" d="M24 11.3c3 0 5.7 1 7.8 3l5.9-6C34.2 5 29.6 3 24 3 15.8 3 8.7 7.6 5.2 14.4l7.1 5.4c1.7-4.9 6.3-8.5 11.7-8.5Z"/></svg>',Booking:'<span class="booking">B.<small>Booking.com</small></span>',Booksy:'<span class="booksy">⌁Booksy</span>',Tripadvisor:'<svg viewBox="0 0 50 50" aria-label="Tripadvisor"><circle cx="25" cy="25" r="24" fill="#34e0a1"/><g fill="none" stroke="#06251c" stroke-width="2.5"><circle cx="15" cy="26" r="9"/><circle cx="35" cy="26" r="9"/><circle cx="15" cy="26" r="3"/><circle cx="35" cy="26" r="3"/><path d="m21 34 4 5 4-5M5 17l5 4M45 17l-5 4M14 16q11-8 22 0"/></g></svg>'};
const teaserOpinions=[
 {source:'Google',name:'Restauracja',rating:'★☆☆☆☆',text:'Nie byłem, ale wiem.'},
 {source:'Booking',name:'Hotel',rating:'1/10',text:'Bo tak.'},
 {source:'Tripadvisor',name:'Hotel & SPA',rating:'●○○○○',text:'Widok za ładny.'},
 {source:'Booksy',name:'Barber',rating:'★☆☆☆☆',text:'Fryzura dobra. Pogoda słaba.'}
];
document.querySelector('#home-reviews').innerHTML=teaserOpinions.map((r,index)=>`<button type="button" class="home-review" data-review="${index}" aria-haspopup="dialog" aria-label="Przykład fikcyjny: ${r.source}, ${r.name}, ${r.text}"><span class="review-head"><span class="review-source">${sourceMarks[r.source]}</span><span class="review-details"><span class="review-name">${r.name}</span><span class="review-rating ${r.source==='Tripadvisor'?'trip-rating':''}">${r.rating}</span></span></span><span class="review-text">${r.text}</span></button>`).join('');
document.querySelector('#home-reviews').addEventListener('click',event=>{
 const button=event.target.closest('[data-review]');if(!button)return;
 const r=teaserOpinions[Number(button.dataset.review)];
 document.querySelector('#home-panel-title').textContent=r.name+' · '+r.rating;
 document.querySelector('#home-panel-content').innerHTML=`<p>„${r.text}”</p><p class="panel-note">Przykład fikcyjny z oznaczeniem ${r.source}. Nie przedstawia prawdziwej opinii ani rzeczywistej oceny firmy.</p><a class="help-link" href="portal.html">Poznaj pełny kontekst →</a>`;
 homePanel.showModal();
});
