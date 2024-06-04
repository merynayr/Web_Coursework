import { endpoints } from '../../api/index.js';

const authForm = document.getElementById('authForm');
const fullNameInput = document.getElementById('fullNameInput');
const passwordInput = document.getElementById('passwordInput');
const secretWordInput = document.getElementById('secretWordInput');
const submitButton = document.getElementById('submitButton');
const loadingSpinner = document.getElementById('loadingSpinner');

submitButton.addEventListener('click', async function () {
    const formData = {
        fullName: fullNameInput.value,
        password: passwordInput.value,
        secretWord: secretWordInput.value
    };

    if (formData.fullName && formData.password && formData.secretWord) {
        submitButton.disabled = true;
        const jwtToken = localStorage.getItem('token');

        try {
            const response = await fetch(`${endpoints.SERVER_ORIGIN_URI}${endpoints.ADMINS.ROUTE}${endpoints.ADMINS.LOGIN}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${jwtToken}`
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (data.adminData.token) {
                localStorage.setItem('token', data.adminData.token);
                localStorage.setItem('admin-type', data.adminData.role);
                localStorage.setItem('fullName', data.adminData.fullName);

                router.navigate('/register-passenger');
                location.reload();
            } else {
                toastError("Что-то пошло не так, попробуйте позже");
            }
        } catch (error) {
            console.error(error);
            toastError("Похоже введенные вами данные оказались неверными");
            submitButton.disabled = false;
        }
    } else {
        toastError("Кажется, вы что-то не заполнили");
    }
});