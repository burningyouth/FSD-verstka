# Основные сведения
В проекте есть немного несоответствий с макетом из-за неточности маржинов, несоответствия шрифтов и неточностей картинок из макета (некоторые картинки там отображаются не полностью, а скачиваются они в полном размере и редактировать их под макет я не стал). Опирался я больше на ui-kit, так что на некоторых страницах есть ощутимые несоответствия блоков с макетом.

# Использованные технологии
В своем проекте я использовал less и pug, логика написана на jQuery. При сборке все текстовые файлы сжимаются, проставляются префиксы в css и babel переписывает js код под старые браузеры. Файлы стилей и js скидываются в один kit.* 

# Примеси less
Примеси less состоят в основном из вспомогательных классов. Выглядят эти классы практически так же, как и Bootstrap (за исключением флекса, там наименования переделал под БЭМ, чтобы не путаться). Bootstrap не использую потому что мне нужны оттуда только несколько классов, поэтому я решил написать свои генераторы примесей. 

Генераторы находятся в `src/less/generators.less`. Классы маржинов и паддингов основанны на пикселях, потому что так удобнее соблюдать пиксель перфект.

Переменные находятся в `src/less/variables.less`. Здесь же можно настроить брейкпоинты для примесей.

В файле `src/less/import.less` я импортирую все переменные и на всякий случай генераторы примесей (может понадобится). Этот файл я включаю в файлы less блоков, чтобы пользоваться переменными.

# Примеси pug
Примеси pug для блоков и элементов находятся в своих папках блоков. Примеси элементов я импортирую в файл примеси элемента, чтобы можно было легко импортировать все примеси блока. Примеси всех блоков импортированы в общий файл `src/pug/mixins.pug` для удобства подключения на страницах. Практически для всех миксинов есть переменная classModifier (она обычно находится в конце всех переменных или в начале у bullet-list).

# Заметка по странице Colors & Type
В макете есть блоки цветовой палитры, в своем проекте я решил не делать лишнюю работу и не добавил этот блок. На этой странцие просто вынес основные виды текста.

# Ссылки на UI-KIT
- [Colors & type](https://sadscriptoman.github.io/FSD-verstka/dist/colors-type.html)
- [Form Elements](https://sadscriptoman.github.io/FSD-verstka/dist/form-elements.html)
- [Cards](https://sadscriptoman.github.io/FSD-verstka/dist/cards.html)
- [Headers & footers](https://sadscriptoman.github.io/FSD-verstka/dist/headers-footers.html)

# Ссылки на страницы
- [Landing page](https://sadscriptoman.github.io/FSD-verstka/dist/landing-page.html)
- [Sign in](https://sadscriptoman.github.io/FSD-verstka/dist/login.html)
- [Registration](https://sadscriptoman.github.io/FSD-verstka/dist/registration.html)
- [Search room](https://sadscriptoman.github.io/FSD-verstka/dist/search-room.html)
- [Room details](https://sadscriptoman.github.io/FSD-verstka/dist/room-details.html)
