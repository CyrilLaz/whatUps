# WHAT-UPS

| React | TypeScript | SCSS | БЭМ |
| ----- | ---------- | ---- | --- |

Приложение дублирующее некоторый функционал web версии whatsapp, и повторяет его дизайн.\
В качестве API решение [Green Api](https://green-api.com/).

В качестве `host` по дефолту стоит `https://api.green-api.com`, задать своё можно переменной окружения `REACT_APP_HOST`.\
Частоту запросов API можно менять в файле `src/constants/settings.js`

- Локальный запуск:  
  `npm run start`
- создать билд:  
  `npm run build`

<details>
  <summary>Dependencies</summary>

- typescript: ^4
- react: ^18
- node-sass: ^7
</details>

------------------------------------

### Инструкция пользователя:

1. Для использования приложения потребуются данные, полученные после авторизации в [Green Api]([https://green-api.com/]). При отправке запроса появляется `loader`.\
При ошибках на данном этапе предусмотрено индикация ошибки.
<details>
  <summary>Screenshot</summary>
<p align="center">
<img  height='150px' 
align-item='center' src='./assets/intro-landing.jpg'>
</p>
</details>

2. После успешного входа пользователя встречает окно с интерфейсом из аватара аккаунта и двумя интерактивными элементами управления приложением: создание чата и обновление состояниями чатов.
<details>
  <summary>Screenshot</summary>
<p align="center">
<img  height='250px' 
align-item='center' src='./assets/intro.jpg'>
</p>
</details>

3. При нажатии на кнопку "новый чат" появляется панель для ввода номера телефона.Запрос осуществляется на клавишу `Enter` или имеющеюся кнопку.\
При отсутствии номера в `WhatsApp` появится соответствующее сообщение. В случае успеха поиска появится карточка с его аватаром и именем.
При нажатии на эту карточку откроется новый чат и этот чат добавится в список.
<details>
  <summary>Screenshot</summary>
<p align="center">
<img  height='150px' 
align-item='center' src='./assets/new-chat.jpg'>
</p>
</details>

4. Отправлять сообщения можно с помощью кнопки "Отправить" или клавишей `Enter`. Сообщения сохраняют форматирование. Перевод строки можно сделать комбинацией `CTRL+Enter`. Время отправки сообщения отображается в карточке с сообщением.
<details>
  <summary>Screenshot</summary>
<p align="center">
<img  height='250px'
align-item='center' src='./assets/chat.jpg'>
</p>
</details>

5. Процесс отправления запроса за уведомлениями о сообщениях сопровождается индикацией кнопки "`Обновить`". Интервал для запросов 10 секунд. Нажатие кнопки `Обновить` отправляет запрос и сбрасывает таймер. Во время активного запроса возможность отправить дубль запроса заблокирована.

6. Возможно создание нескольких чатов и переключение между ними.

<details>
  <summary>Особенности</summary>

- состояние аутентификации не сохраняется;
- верстка адекватно себя ведет при ширине разрешения выше `700px`;
- запросы на отправление и получение сообщений происходят через HTTP с помощью библиотеки [`axios`](https://github.com/axios/axios);
- основа приложения Create-react-app;
- компилятор TypeScript настроен на ES6;
- в вёрстке руководствовался БЭМом.

</details>

<!-- ## BUGS -->
<details>
  <summary>BUGS</summary>

- сообщения в чате участвуют в гонке, первее тот, кто первый попал в массив сообщений;
- не работает scroll в поле ввода сообщения;
</details>

Ссылка для посмотреть
[LINK](https://whatups.klazar.online)
