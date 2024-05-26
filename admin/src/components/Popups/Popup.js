// Popup.js
export function togglePopup(popupSelector) {
    $(popupSelector).toggleClass("active");
}

export function closePopup(popupSelector) {
    $(popupSelector).removeClass("active");
}

export function openPopup(popupSelector) {
    $(popupSelector).addClass("active");
}

export function setupPopup(popupSelector, closeButtonSelector) {
    $(document).ready(function() {
        $(document).keyup(function(e) {
            if (e.key === "Escape" && $(popupSelector).hasClass("active")) {
                closePopup(popupSelector);
            }
        });

        $(popupSelector).click(function(e) {
            e.stopPropagation();
            closePopup(popupSelector);
        });

        $(closeButtonSelector).click(function() {
            closePopup(popupSelector);
        });

        $(".popup__container").click(function(e) {
            e.stopPropagation();
        });
    });
}
