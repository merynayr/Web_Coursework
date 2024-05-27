// Popup.js
export function togglePopup(popupSelector) {
    $(popupSelector).toggleClass("active");
}

export function closePopup(popupSelector) {
    $(popupSelector).removeClass("active");
    clearInputFields(popupSelector); 
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
            console.log(popupSelector);
            closePopup(popupSelector);
        });

        $(".popup__container").click(function(e) {
            e.stopPropagation();
        });
    });
}


function clearInputFields(popupSelector) {
    $(popupSelector).find('input[type="text1"]').val('');
    $(popupSelector).find('input[type="password"]').val('');
}