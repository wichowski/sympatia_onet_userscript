Skrypt do wtyczki GreaseMonkey / TamperMonkey w przeglądarce.

Pozwala na usuwanie z wyników wyszukiwania osób, których nie chcemy więcej zobaczyć.
Korzysta z Local Storage przeglądarki, które przechowuje informacje o ukrywanych profilach.
Reszta funkcji serwisu bez zmian.

Instalacja:
- przeciągnij skrypt SympatiaVisualBan.js do okna z panelem twojego menedżera Userscriptowego - np. TamperMonkey

Dodatkowo:
- Do wyświetlania w jednym ciągu wszystkich stron użyj Userscriptu Pagetual => https://github.com/hoothin/UserScripts/tree/master/Pagetual
i dopisz regułę z następującym kodem:


  {
    "name": "Poznaj - Portal Randkowy Sympatia",
    "url": "^https?://sympatia\\.onet\\.pl/",
    "example": "https://sympatia.onet.pl/meet?md5=49994f34936d6f943799d62d8d7e9ef0&offset=100",
    "pageElement": "/html/body/div[1]/div[3]/div/div[2]/div[2]/div/div[2]",
    "nextLink": "[class^=\"Paginaton_pageCircle\"]:last-of-type"
  }
  

Changelog:

- v 2 - ukrywanie w widoku wszystkich stron na jednej stronie; Local Storage zamiast Cookies
- v 1 - ukrywanie na każdej stronie oddzielnie
