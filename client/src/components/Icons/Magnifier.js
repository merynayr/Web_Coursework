// Создаем функцию для создания и добавления лупы в поисковую строку
function addMagnifierToSearchInput() {
    // Создаем элемент SVG для лупы
    const magnifierSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    magnifierSvg.setAttribute("width", "32");
    magnifierSvg.setAttribute("height", "32");
    magnifierSvg.setAttribute("viewBox", "0 0 32 32");
    magnifierSvg.setAttribute("fill", "none");

    // Создаем элемент path внутри SVG для формы лупы
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M20.6667 18.6667H19.6133L19.24 18.3067C20.5918 16.7387 21.3348 14.7369 21.3333 12.6667C21.3333 10.9526 20.825 9.27696 19.8727 7.85173C18.9204 6.4265 17.5669 5.31567 15.9833 4.65971C14.3996 4.00376 12.6571 3.83213 10.9759 4.16653C9.29472 4.50094 7.75047 5.32636 6.53841 6.53841C5.32636 7.75047 4.50094 9.29472 4.16653 10.9759C3.83213 12.6571 4.00376 14.3996 4.65971 15.9833C5.31567 17.5669 6.4265 18.9204 7.85173 19.8727C9.27696 20.825 10.9526 21.3333 12.6667 21.3333C14.8133 21.3333 16.7867 20.5467 18.3067 19.24L18.6667 19.6133V20.6667L25.3333 27.32L27.32 25.3333L20.6667 18.6667ZM12.6667 18.6667C9.34667 18.6667 6.66667 15.9867 6.66667 12.6667C6.66667 9.34667 9.34667 6.66667 12.6667 6.66667C15.9867 6.66667 18.6667 9.34667 18.6667 12.6667C18.6667 15.9867 15.9867 18.6667 12.6667 18.6667Z");
    path.setAttribute("fill", "#545454");

    // Добавляем элемент path в элемент SVG
    magnifierSvg.appendChild(path);

    // Получаем элемент поисковой строки и вставляем лупу перед ним
    const searchInput = document.getElementById("searchInput");
    const searchContainer = searchInput.parentElement;
    searchContainer.insertBefore(magnifierSvg, searchInput);

    // Добавляем стили для лупы
    magnifierSvg.style.margin = "0px 10px";
}

// Вызываем функцию для добавления лупы при загрузке документа
document.addEventListener("DOMContentLoaded", addMagnifierToSearchInput);
