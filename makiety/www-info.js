'use strict';
const maliwanInfo={
  "intro": "Pozwól sobie zanurzyć się w świecie harmonii i błogości, zaznaj uczucia głębokiego relaksu w umiejętnych rękach naszych specjalistów.",
  "atmosphere": [
    "Thai Maliwan to klimatyczny salon masażu, specjalizujący się w tradycyjnym masażu tajskim. Naszą codzienną działalność opieramy na wierze w to, że masaż, jako jeden z elementów tradycyjnej, tajskiej medycyny, stanowi doskonałą odpowiedź na liczne problemy zdrowotne i napięcia, wynikające z przepracowania, stresu, nadmiaru obowiązków i różnego rodzaju napięć."
  ],
  "team": [
    "Maliwan to miejsce gdzie oddasz się pod opiekę wykwalifikowanych, oraz doświadczonych masażystek, które pochodzą wyłącznie z Tajlandii. Posiadają one certyfikaty poświadczające ukończenie prestiżowych szkół masażu tajskiego. Mogą się one pochwalić wieloletnią praktyką zawodową zdobytą podczas pracy w najlepszych studiach masażu w Azji, czy w Europie. W atmosferze spokoju oraz prywatności przywrócą równowagę między Twoją duszą a ciałem.",
    "W Maliwan wierzymy, że balans między sferą duchową a cielesną to przepis na życie w harmonii i spokoju ducha."
  ],
  "procedures": [
    "Oferowane przez nas zabiegi to dotyk południowo-wschodniej Azji w pigułce. Zaznasz tutaj technik ajurvedy oraz pasywnej yogi wywodzących się z Indii, czy masażu tajskiego, który swoją historią pamięta samego Buddhę.",
    "Prócz bogatej oferty zabiegów, oferujemy również masaż dla par – doskonały, aby świętować wybrane, ważne okazje tylko we dwoje. Polecamy również nasze vouchery podarunkowe, którymi możesz obdarować wybraną osobę i sprezentować jej niepowtarzalny prezent."
  ],
  "aboutSource": "https://thaimaliwan.pl/o-nas/",
  "salons": [
    {
      "id": "ZW",
      "name": "Zwierzyniecka",
      "address": "ul. Zwierzyniecka 14, lok. 7",
      "city": "Kraków",
      "phone": "+48 888 496 495",
      "tel": "+48888496495",
      "email": "info@thaimaliwan.pl",
      "hours": "Poniedziałek–niedziela: 12:00–22:00",
      "reception": "Poniedziałek–niedziela: 12:00–20:00",
      "contactSource": "https://thaimaliwan.pl/kontakt/",
      "aboutSource": "https://thaimaliwan.pl/o-nas/",
      "mapUrl": "https://www.google.com/maps/search/?api=1&query=ul.%20Zwierzyniecka%2014%2C%20lok.%207%2C%20Krak%C3%B3w%2C%20Thai%20Maliwan",
      "staff": [
        "Khanjana",
        "Maliwan",
        "Sumalee",
        "Tip"
      ]
    },
    {
      "id": "SZ",
      "name": "Szewska",
      "address": "ul. Szewska 12, I piętro",
      "city": "Kraków",
      "phone": "+48 881 069 692",
      "tel": "+48881069692",
      "email": "szewska@thaimaliwan.pl",
      "hours": "Poniedziałek–niedziela: 12:00–22:00",
      "reception": "Poniedziałek–niedziela: 12:00–20:00",
      "contactSource": "https://thaimaliwanspa.pl/kontakt/",
      "aboutSource": "https://thaimaliwanspa.pl/o-nas/",
      "mapUrl": "https://www.google.com/maps/search/?api=1&query=ul.%20Szewska%2012%2C%20I%20pi%C4%99tro%2C%20Krak%C3%B3w%2C%20Thai%20Maliwan",
      "staff": [
        "Butsakorn",
        "Cholthida",
        "Kai",
        "Tip"
      ]
    }
  ]
};
const infoNotice='<div class="notice">Makieta — rezerwacje i formularz kontaktowy są testowe. Możesz zadzwonić, napisać e-mail lub otworzyć dojazd do salonu.</div>';
function infoHeading(t){return '<p class="muted"><a href="mobilna-v14.html">Strona główna</a> / '+esc(t)+'</p><h1>'+esc(t)+'</h1>'+infoNotice;}
function paragraphs(list){return list.map(t=>'<p>'+esc(t)+'</p>').join('');}
function salonCard(s,compact=false){return `<section class="panel salon-card" id="salon-${s.id}"><p class="detail-label">THAI MALIWAN · KRAKÓW</p><h2>${esc(s.name)}</h2><address>${esc(s.address)}<br>${esc(s.city)}</address>${compact?'':`<div class="contact-lines"><a href="tel:${s.tel}">${esc(s.phone)}</a><a href="mailto:${esc(s.email)}">${esc(s.email)}</a></div><dl><dt>Salon</dt><dd>${esc(s.hours)}</dd><dt>Recepcja</dt><dd>${esc(s.reception)}</dd></dl>`}<div class="salon-actions"><a href="${esc(s.mapUrl)}" target="_blank" rel="noopener" class="outline-link">Dojazd ↗</a><a href="?view=reservation&salon=${s.id}" class="outline-link">Rezerwacja →</a></div>${compact?'':`<a class="contact-voucher" href="?view=voucher&salon=${s.id}">Kup voucher do tego salonu →</a><details class="source-link"><summary>Dane dotychczasowej strony</summary><a href="${esc(s.contactSource)}" target="_blank" rel="noopener">Porównaj dane kontaktowe ↗</a></details>`}</section>`;}
function staffBySalon(){return '<section class="team-section"><h2>Poznaj nasz zespół</h2><div class="info-grid">'+maliwanInfo.salons.map(s=>`<section class="panel team-salon"><p class="detail-label">THAI MALIWAN</p><h3>${esc(s.name)}</h3><ul class="team-names">${s.staff.map(name=>`<li><span class="team-mark" aria-hidden="true">${esc(name.slice(0,1))}</span><span>${esc(name)}</span>${name==='Tip'?'<small>Oba salony</small>':''}</li>`).join('')}</ul><a class="outline-link" href="?view=reservation&salon=${s.id}">Rezerwacja w tym salonie →</a></section>`).join('')+'</div></section>';}
function renderAbout(){
 const paths=[['osoba','Dla jednej osoby','Chwila tylko dla Ciebie.'],['pary','Dla par','Wspólny relaks w jednym gabinecie.'],['rytualy','Rytuały','Poznaj przebieg każdej ceremonii.']];
 return `<div class="about-toolbar"><a data-context-salon href="mobilna-v14.html">← Strona główna</a><a data-context-salon href="?view=contact">Kontakt →</a></div>
 <section class="about-hero" aria-labelledby="about-title"><figure><img src="www-assets/kadr-3-szkola-maliwan.webp" alt="Masaż tajski w Thai Maliwan — praca masażystki z klientką" width="792" height="582"><figcaption>THAI MALIWAN · TAJSKA TRADYCJA</figcaption></figure><div class="about-hero-copy"><p class="about-eyebrow">O NAS · KRAKÓW</p><h1 id="about-title">Twój czas<br>w Thai Maliwan</h1><p class="about-lead">${esc(maliwanInfo.intro)}</p><div class="about-actions"><a class="about-primary" data-context-salon href="?view=reservation">Rezerwuj chwilę dla siebie →</a><a class="about-text-link" href="#poznaj-zespol">Poznaj nasz zespół ↓</a></div></div></section>
 <section class="about-story" aria-labelledby="about-atmosphere"><div class="about-story-copy"><p class="about-eyebrow">SPOKÓJ · DOTYK · TRADYCJA</p><h2 id="about-atmosphere">O nas</h2>${paragraphs(maliwanInfo.atmosphere)}</div><div class="about-story-copy"><h2>Nasz zespół</h2>${paragraphs(maliwanInfo.team)}</div></section>
 <div id="poznaj-zespol" class="about-team">${staffBySalon()}</div>
 <section class="about-offer" aria-labelledby="about-offer-title"><p class="about-eyebrow">TWÓJ CZAS W MALIWAN</p><h2 id="about-offer-title">Nasze zabiegi i masaże</h2><p>Tradycyjny masaż tajski, tajskie zabiegi dla jednej osoby i dla par oraz rytuały — wybierz swoją chwilę odpoczynku.</p><div class="about-paths">${paths.map(([k,t,d])=>`<a class="about-path" data-context-salon href="?view=reservation&kind=${k}"><h3>${t}</h3><p>${d}</p><span>Zobacz ofertę →</span></a>`).join('')}</div></section>
 <section class="about-ritual"><figure><img src="www-assets/kadr-6-maliwan.png" alt="Ilustracja spokojnego masażu twarzy i głowy w stylu Thai Maliwan" loading="lazy"></figure><div><p class="about-eyebrow">CHWILA TYLKO DLA CIEBIE</p><h2>Odkryj rytuały Thai Maliwan</h2>${paragraphs(maliwanInfo.procedures)}<a class="about-text-link" data-context-salon href="?view=voucher">Podaruj chwilę relaksu — wybierz bon →</a></div></section>
 <section class="about-salons" aria-labelledby="about-salons-title"><p class="about-eyebrow">ZNAJDŹ SWOJE MIEJSCE</p><h2 id="about-salons-title">Nasze salony w Krakowie</h2><div class="info-grid">${maliwanInfo.salons.map(s=>salonCard(s,true)).join('')}</div><a class="about-text-link" data-context-salon href="?view=contact">Kontakt i godziny obu salonów →</a></section>
 <details class="source-link about-source"><summary>Dotychczasowe strony O nas</summary>${maliwanInfo.salons.map(s=>`<a href="${esc(s.aboutSource)}" target="_blank" rel="noopener">${esc(s.name)} — tekst i profile zespołu ↗</a>`).join('<br>')}</details>
 <nav class="about-bottom" aria-label="Powrót i informacje"><a data-context-salon href="mobilna-v14.html">← Strona główna</a><a data-salon-page="rules" href="https://thaimaliwan.pl/regulaminy/">Regulaminy i zasady</a><a data-salon-page="privacy" href="https://thaimaliwan.pl/polityka-prywatnosci/">Prywatność</a></nav>`;
}
function contactLocation(s){return `<section class="panel contact-location" id="salon-${s.id}" aria-labelledby="contact-title-${s.id}"><div class="contact-location-brand"><img src="www-assets/thai-maliwan-mark.png" alt=""><span>THAI MALIWAN · KRAKÓW</span></div><h2 id="contact-title-${s.id}">${esc(s.name)}</h2><address>${esc(s.address)}<br>${esc(s.city)}</address><div class="contact-direct"><a class="contact-phone" href="tel:${s.tel}" aria-label="Zadzwoń do salonu ${esc(s.name)}: ${esc(s.phone)}">${esc(s.phone)}</a><a class="contact-email" href="mailto:${esc(s.email)}">${esc(s.email)}</a></div><dl class="contact-hours"><div><dt>Salon</dt><dd>${esc(s.hours)}</dd></div><div><dt>Recepcja</dt><dd>${esc(s.reception)}</dd></div></dl><div class="contact-location-actions"><a class="about-primary" href="?view=reservation&salon=${s.id}">Rezerwuj wizytę →</a><a class="outline-link" href="${esc(s.mapUrl)}" target="_blank" rel="noopener">Pokaż dojazd ↗</a></div><a class="about-text-link contact-gift" href="?view=voucher&salon=${s.id}">Podaruj bon do tego salonu →</a></section>`;}
function renderContact(){return `<div class="about-toolbar"><a data-context-salon href="mobilna-v14.html">← Strona główna</a><a data-context-salon href="?view=about">O nas →</a></div><section class="contact-heading"><p class="about-eyebrow">THAI MALIWAN · KRAKÓW</p><h1>Kontakt</h1><p class="contact-lead">Serdecznie zapraszamy do kontaktu w sprawach rezerwacji terminu. Chętnie pomożemy również przy doborze odpowiedniego masażu lub zabiegu.</p><nav class="contact-jump" aria-label="Przejdź do salonu"><a href="#salon-ZW">Zwierzyniecka</a><a href="#salon-SZ">Szewska</a></nav></section><div class="info-grid contact-locations">${maliwanInfo.salons.map(contactLocation).join('')}</div><section class="panel contact-form-panel" aria-labelledby="contact-form-title"><div class="contact-form-layout"><div class="contact-form-copy"><p class="about-eyebrow">JESTEŚMY DLA CIEBIE</p><h2 id="contact-form-title">Masz pytanie?</h2><p>Wybierz salon, do którego chcesz napisać. Chętnie pomożemy Ci wybrać masaż lub zaplanować wizytę.</p><p class="contact-preview-note">Formularz testowy — wiadomość nie zostanie wysłana.</p><p>Chcesz wysłać prawdziwą wiadomość? Skorzystaj z adresu e-mail wybranego salonu powyżej.</p></div><form id="contact-demo-form" class="fields"><label>Salon<select name="salon">${maliwanInfo.salons.map(s=>`<option value="${s.id}" ${state.salon===s.id?'selected':''}>${esc(s.name)}</option>`).join('')}</select></label><div class="info-grid"><label>Imię i nazwisko<input name="contactName" autocomplete="off" required></label><label>E-mail<input name="contactEmail" type="email" autocomplete="off" required></label></div><label>Temat<input name="subject" autocomplete="off" required></label><label>Wiadomość<textarea name="message" rows="4" required></textarea></label><button class="primary" type="submit">Sprawdź wiadomość testowo →</button><p id="contact-demo-result" role="status" aria-live="polite"></p></form></div></section><details class="source-link contact-source"><summary>Dane dotychczasowych stron kontaktowych</summary>${maliwanInfo.salons.map(s=>`<a href="${esc(s.contactSource)}" target="_blank" rel="noopener">${esc(s.name)} — dane salonu ↗</a>`).join('<br>')}</details><nav class="about-bottom" aria-label="Powrót i informacje"><a data-context-salon href="mobilna-v14.html">← Strona główna</a><a data-salon-page="rules" href="https://thaimaliwan.pl/regulaminy/">Regulaminy i zasady</a><a data-salon-page="privacy" href="https://thaimaliwan.pl/polityka-prywatnosci/">Prywatność</a></nav>`;}
