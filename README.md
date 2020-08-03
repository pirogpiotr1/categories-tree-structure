Instrukcja inicjalizacji

1. git clone
2. composer install/update
4. stworzenie pliku .env
3. php artisan migrate
4. php artisan key:generate
5. php artisan storage:link

Przy tworzeniu migracji automatycznie tworzony jest użytkownik admin poprzez klasę "UserSeeder"

Dane do konta:
Login: admin@example.com
hasło: admin

Strona po zalogowaniu automatycznie przekieruje na widok kategorii.

Dodawanie/edycja znajduję się po prawej stronie.
Usuwanie, sortowanie oraz przenoszenie węzłów odbywa się przy pomocy AJAX'a.
Do sortowania wykorzystano bibliotekę javascriptową https://github.com/SortableJS/Sortable.
Zmiana pomiędzy formularzem dodawania a edycji kategorii odbywa się bez przeładowywania strony.
Dodana została podstawowa walidacja danych.
Nie tworzyłem funkcji ani procedur składowych, wszystko odbywa się na podstawie klucza obcego tabeli, który odnosi do własnych kolumn.
