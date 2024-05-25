// // Sidebar.js

// export function renderSidebar() {
//     console.log("HIIII");
//     const rootElement = document.getElementById('root');
//     const sidebarElement = document.createElement('div');
//     sidebarElement.className = 'sidebar';

//     // Проверяем, авторизован ли пользователь
//     const isAuthorized = !!localStorage.getItem('token') && 
//                          !!localStorage.getItem('fullName') && 
//                          !!localStorage.getItem('admin-type');

//     if (isAuthorized) {
//         // Создаем ссылки для различных разделов админ-панели
//         const links = [
//             { path: '/register-passenger', icon: 'NewPassenger', titleMain: 'Регистрация пассажира', titleSub: 'Добавление пассажиров на рейс' },
//             { path: '/passengers', icon: 'Passenger', titleMain: 'Управление пассажирами', titleSub: 'Редактирование пассажиров' },
//             { path: '/flights', icon: 'Flight', titleMain: 'Рейсы', titleSub: 'Создание рейсов' },
//             { path: '/planes', icon: 'Plane', titleMain: 'Самолеты', titleSub: 'Создание самолетов' },
//             { path: '/airports', icon: 'Airport', titleMain: 'Аэропорты', titleSub: 'Создание аэропортов' },
//         ];

//         // Создаем ссылки для каждого раздела
//         links.forEach(link => {
//             const linkElement = document.createElement('a');
//             linkElement.href = link.path;
//             linkElement.className = 'sidebar__link';
//             linkElement.innerHTML = `
//                 <img src="/src/assets/sidebar/${link.icon}.svg" alt="${link.titleMain}" />
//                 <div class="title">
//                     <div class="title__main">${link.titleMain}</div>
//                     <div class="title__sub">${link.titleSub}</div>
//                 </div>
//             `;
//             sidebarElement.appendChild(linkElement);

//             // Добавляем обработчик события для активации ссылки
//             linkElement.addEventListener('click', function(event) {
//                 event.preventDefault(); // Отменяем стандартное поведение ссылки
//                 const path = linkElement.getAttribute('href');
//                 // Здесь можно добавить логику для перехода по ссылке с использованием JavaScript
//                 console.log('Переход на страницу:', path);
//             });
//         });

//         // Добавляем ссылку для выхода из аккаунта
//         const quitElement = document.createElement('div');
//         quitElement.className = 'sidebar__link';
//         quitElement.innerHTML = `
//             <img src="/src/assets/sidebar/Exit.svg" alt="Выйти из аккаунта" />
//             <div class="title">
//                 <div class="title__main">Выйти из аккаунта</div>
//             </div>
//         `;
//         quitElement.addEventListener('click', function() {
//             localStorage.setItem('token', '');
//             localStorage.setItem('admin-type', '');
//             localStorage.setItem('fullName', '');
//             window.location.href = '/auth';
//         });
//         sidebarElement.appendChild(quitElement);
//     } else {
//         // Если пользователь не авторизован, добавляем ссылку для входа
//         const authElement = document.createElement('a');
//         authElement.href = '/auth';
//         authElement.className = 'sidebar__link';
//         authElement.innerHTML = `
//             <img src="/src/assets/sidebar/Exit.svg" alt="Выйти из аккаунта" />
//             <div class="title">
//                 <div class="title__main">Авторизация</div>
//             </div>
//         `;
//         sidebarElement.appendChild(authElement);
//     }

//     // Добавляем боковую панель на страницу
//     rootElement.appendChild(sidebarElement);
// }

// function loadSidebar() {
//     $('#sidebar').html(`
//         <ul>
//             <li><a href="/register-passenger" class="nav-link">Register Passenger</a></li>
//             <li><a href="/flights" class="nav-link">Flights</a></li>
//             <li><a href="/airports" class="nav-link">Airports</a></li>
//             <li><a href="/planes" class="nav-link">Planes</a></li>
//             <li><a href="/admins" class="nav-link">Admins</a></li>
//             <li><a href="/passengers" class="nav-link">Passengers</a></li>
//         </ul>
//     `);

//     $('.nav-link').on('click', function(event) {
//         event.preventDefault();
//         const path = $(this).attr('href');
//         router.navigate(path);
//     });
// }
