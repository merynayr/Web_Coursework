$(document).ready(function() {
    function togglePopup() {
        $(".popup").toggleClass("active");
    }

    $("#openPopupButton").click(function() {
        togglePopup();
    });

    $(".popup").click(function() {
        togglePopup();
    });

    $(".head__close").click(function(e) {
        e.stopPropagation();
        togglePopup();
    });

    // Предотвращаем всплытие события при клике на строку ввода
    $("#adminName").click(function(e) {
        e.stopPropagation();
    });
});
