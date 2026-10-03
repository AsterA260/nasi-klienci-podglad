# WWW — punkt powrotu, 03.10.2026

## Etap 1 — podgląd na GitHubie
Repo: AsterA260/nasi-klienci-podglad. Zmiany wyłącznie w makiety/; niezależny projekt Nasi Klienci (index.html/portal.html) niezmieniony.

- Front: mobilna-v14.html, oryginalna rolka, zdjęcia i światy zachowane.
- Nawigacja: Rezerwacja, Kup voucher, O nas, Kontakt. Menu poniżej nagłówka, delikatna stała poświata; sociale pośrodku dołu, mniejszy ekran przenosi je o jeden rząd wyżej.
- www.html: testowe ścieżki rezerwacji oraz kupna bonu, kategorie, salon i katalog 49 adresów. Tylko przykładowy wariant tradycyjnego ma jawne ceny (210/270/330). Pozostałe ceny niezgadywane; dostęp do źródłowych wariantów/sklepu.
- O nas / Kontakt: szkielety i linki do pełnych istniejących stron, nie kompletne przeniesienie treści. Szewska wymaga uzupełnienia danych kontaktowych.
- Rezerwacja bez bonu: test terminu i formularza, bez przesyłania lub zapisywania danych. Mam bon: formularz bez walidacji serwerowej, komunikat jawnie mówi, że nie jest podłączony.
- Kup voucher: podsumowanie testowe, bez utworzenia zamówienia; źródłowe sklepy i płatności niezmienione.
- wizualizacje.html: wszystkie uzgodnione obrazy do porównania z działającym podglądem; implementacja nadal etapowa.

## Weryfikacja
22 sprawdzenia logiki przejść OK. Składnia JavaScript OK. 50/50 istniejących linków HTTP200 po przekierowaniach; katalog wykorzystuje ich końcowe adresy. 8 lokalnych plików HTTP200. Oryginalny skrypt rolki i zdjęcia porównane: identyczne. Wszystkie nowe widoki oraz wejście makiety mają noindex,nofollow.
NIEZWERYFIKOWANE: render desktop/iPad/iPhone, overflow, konsola rzeczywistej przeglądarki. Narzędzie CUA: app-server exited; następna próba: browser security check unavailable. Nie obchodzić blokady inną automatyką.

## Kolejne małe etapy
1. Przywrócić podgląd przeglądarki, obejrzeć 1440px / iPad poziomo i pionowo / iPhone, poprawić tylko wykryte problemy.
2. Podłączyć dokładne opisy/czasy/ceny i identyfikatory produktów wszystkich usług obu salonów. Rytuały wymagają rozstrzygnięcia zapisanych sprzeczności, nie wymyślać składu.
3. Dopasować pełne treści O nas i dane Kontakt z zachowaniem adresów i informacji.
4. Uzgodnić i połączyć kalendarz z faktyczną dostępnością. Testowy formularz bonu połączyć z walidacją systemu, nie z ręcznym statusem płatności.
5. Sprawdzić sklep/PayU odrębnie; nie zmieniać zaakceptowanego wyglądu płatności.
6. Dopiero potem mała partia wdrożenia produkcyjnego z kopią, możliwością cofnięcia, kontrolą URL/title/H1/canonical/hreflang oraz GSC.

Nie zmieniono nic na produkcyjnych domenach, w WordPress, AWS ani PayU. Ochrona SEO: PRIORYTET_SEO.md. Żadna gwarancja pozycji w Google.
