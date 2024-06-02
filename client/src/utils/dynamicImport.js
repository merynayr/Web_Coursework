// dynamicImport.js

// Функция для динамической загрузки модуля
function loadModule(src) {
    const oldScript = document.querySelector(`script[src="${src}"]`);
    if (oldScript) {
        oldScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'module';
    script.src = `${src}?v=${new Date().getTime()}`; // Добавляем уникальный параметр для предотвращения кэширования
    document.body.appendChild(script);
}

// Экспортируем функцию
window.loadModule = loadModule;

