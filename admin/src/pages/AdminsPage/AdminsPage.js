$(document).ready(function() {
    $("#createAdminContainer").load("src/components/Popups/CreateAdmin.html");

    $("#openPopupButton").click(function() {
        $("#adminPopup").addClass("active");
    });

    $("#popupCloseButton").click(function() {
        $("#adminPopup").removeClass("active");
    });
});