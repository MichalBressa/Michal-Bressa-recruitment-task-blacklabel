## Opis rozwiązania

data.json zawiera wiele danych na temat zamówień, więc do wykresów wybrałem te które moim zdaniem mogą mieć największy wpływ na decyzje firmy. Dane takie jak procent powracających konsumentów bądź który sektor najlepiej radzi sobie w sprzedaży. Za mniej istotny ale wciąż warty uwagi uznałem również czas dostarczenia.

Pierwszy wykres - Bar Chart - pokazuje stosunek całości przychodu między głównymi kategoriami oraz jaka część tego przychodu pochodzi od nowych lub powracających kupujących. Wybrałem ten rodzaj wykresu ponieważ jest prosty i czytelny w swojej strukturze - na pierwszy rzut oka widać proporcję. Uważam że z perspektywy biznesu wiedza o tym czy mamy dużo lojalnych kupujących jest bardzo istotna - na jej podstawie można decydować czy istnieje potrzeba przyciągnięcia nowych konsumentów (więcej marketingu, przeceny itd) czy skupić się na utrzymaniu konsumenta.

Następny wykres - Pie Chart - skupia się na podziale całkowitego dochodu między głównymi kategoriami oraz ich podkategoriami. Daje on perspektywę na to ile każda mniejsza kategoria wnosi do ogólnej puli i pozwala na dyskusję o ich dochodowości.

Aby przedstawić dane o czasie dostawy w odniesieniu do lokalizacji zdecydowałem się na Bubble Graph na dwóch osiach reprezentujących długość i szerokość geograficzną. Punkty ładnie układają się jak na mapie i każdy dostarcza informacji o pełnej cenie zamówienia oraz jego kategorii. Im dany punkt ma więszką średnice tym dłużej trwała dostawa. Różnica w wiekości oraz ułożenie odpwiadające mapie z łatwością pozwala na zrozumienie gdzie dostarczenie zajmuję więcej czasu.

Co chciałbym poprawić gdybym miał więcej czasu:

- trzeci wykres aż prosi się o mapę Europy jako tło
- w mojej głowie istnieje możliwość połączenia pierwszych dwóch wykresów w jeden typu Pie o 3 warstwach, ale kosztem przystępności. Nowa trzecia warstwa reprezentowałaby podział na nowych i powracających kupujących.
- React'owe komponenty odpowiedzialne za renderowanie wykresów mają potencjał na bycie bardziej proceduralne

## Technologia i uruchomienie

Korzystałem z MUI X Charts oraz Highcharts do wykresów oraz React, TypeScript, Node oraz Vite. Node jest wymagany do instalacji wszystkich paczek.

Uruchomienie:

- uruchom nowy terminal
- przejdź do folderu blacklabel-task: cd blacklabel-task
- zainstaluj paczki używając: npm i
- uruchom lokalnie projekt komendą: npm run dev
- wejdź w link podany w terminalu
