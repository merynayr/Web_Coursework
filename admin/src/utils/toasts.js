icon = {
    success: '<span class="material-symbols-outlined">task_alt</span>',
    danger: '<span class="material-symbols-outlined">error</span>',
    warning: '<span class="material-symbols-outlined">warning</span>',
    info: '<span class="material-symbols-outlined">info</span>',
};

toastConfig = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
};
// toast.js
showToast = (message = "Sample Message", toastType = "info", duration = toastConfig.autoClose) => {
    if (!Object.keys(icon).includes(toastType)) toastType = "info";

    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement("div");
        container.classList.add("toast-container");
        document.body.appendChild(container);
    }

    let box = document.createElement("div");
    box.classList.add("toast", `toast-${toastType}`);
    box.innerHTML = `
        <div class="toast-content-wrapper">
            <div class="toast-icon">${icon[toastType]}</div>
            <div class="toast-message">${message}</div>
            <div class="toast-loader"></div>
        </div>`;

    container.appendChild(box);

    // Set animation duration for the loader
    box.querySelector(".toast-loader").style.animationDuration = `${duration / 1000}s`;

    setTimeout(() => {
        box.remove();
        if (container.childNodes.length === 0) {
            container.remove();
        }
    }, duration);
};


toastSuccess = (text) => {
    showToast(text, "success", 5000);
}

toastError = (text) => {
    showToast(text, "danger", 5000);
}

toastInfo = (text) => {
    showToast(text, "info", 5000);
}

toastWarning = (text) => {
    showToast(text, "warning", 5000);
}

window.toastSuccess = toastSuccess;
window.toastError = toastError;
window.toastInfo = toastInfo;
window.toastWarning = toastWarning;