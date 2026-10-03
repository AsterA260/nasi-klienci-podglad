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
function renderAbout(){return infoHeading('O nas')+`<section class="about-intro"><img class="about-image" src="www-assets/scena-7.jpg" alt="Zdjęcie poglądowe wspólnego relaksu w Thai Maliwan"><div><p class="detail-label">TAJSKA TRADYCJA · TWÓJ CZAS</p><h2>Atmosfera Thai Maliwan</h2><p>${esc(maliwanInfo.intro)}</p></div></section><div class="info-grid"><section class="panel"><h2>Atmosfera</h2>${paragraphs(maliwanInfo.atmosphere)}</section><section class="panel"><h2>Nasz zespół</h2>${paragraphs(maliwanInfo.team)}</section></div>${staffBySalon()}<section class="panel"><h2>Nasze zabiegi i masaże</h2><p>Tradycyjny masaż tajski, tajskie zabiegi dla jednej osoby i dla par oraz rytuały — wybierz swoją chwilę odpoczynku.</p><div class="about-offer-links"><a href="?view=reservation&kind=osoba">Dla jednej osoby →</a><a href="?view=reservation&kind=pary">Dla par →</a><a href="?view=reservation&kind=rytualy">Rytuały →</a></div></section><section class="panel"><h2>Procedury</h2>${paragraphs(maliwanInfo.procedures)}<a class="outline-link" href="?view=voucher">Podaruj voucher →</a></section><h2>Nasze salony w Krakowie</h2><div class="info-grid">${maliwanInfo.salons.map(s=>salonCard(s,true)).join('')}</div><p><a href="?view=contact">Kontakt i godziny obu salonów →</a></p><details class="source-link about-source"><summary>Dotychczasowe strony O nas</summary>${maliwanInfo.salons.map(s=>`<a href="${esc(s.aboutSource)}" target="_blank" rel="noopener">${esc(s.name)} — tekst i profile zespołu ↗</a>`).join('<br>')}</details>`;}
function renderContact(){return infoHeading('Kontakt')+'<p class="info-lead">Serdecznie zapraszamy do kontaktu w sprawach rezerwacji terminu. Chętnie pomożemy również przy doborze odpowiedniego masażu lub zabiegu.</p><div class="contact-jump"><a href="#salon-ZW">Zwierzyniecka</a><a href="#salon-SZ">Szewska</a></div><div class="info-grid">'+maliwanInfo.salons.map(s=>salonCard(s)).join('')+'</div><section class="panel contact-form-panel"><h2>Masz pytanie?</h2><p>Wybierz salon, do którego chcesz napisać. Poniższy formularz służy tylko do sprawdzenia makiety — niczego nie wysyła.</p><form id="contact-demo-form" class="fields"><label>Salon<select name="salon">'+maliwanInfo.salons.map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join('')+'</select></label><div class="info-grid"><label>Imię i nazwisko<input name="contactName" autocomplete="off" required></label><label>E-mail<input name="contactEmail" type="email" autocomplete="off" required></label></div><label>Temat<input name="subject" autocomplete="off" required></label><label>Wiadomość<textarea name="message" rows="5" required></textarea></label><button class="primary" type="submit">Sprawdź formularz testowo →</button><p id="contact-demo-result" role="status" aria-live="polite"></p></form><p>Chcesz wysłać prawdziwą wiadomość? Skorzystaj z adresu e-mail przy wybranym salonie powyżej.</p></section>';}
