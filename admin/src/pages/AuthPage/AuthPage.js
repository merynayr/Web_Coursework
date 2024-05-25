const authForm = document.getElementById('authForm');
const fullNameInput = document.getElementById('fullNameInput');
const passwordInput = document.getElementById('passwordInput');
const secretWordInput = document.getElementById('secretWordInput');
const submitButton = document.getElementById('submitButton');
const loadingSpinner = document.getElementById('loadingSpinner');
submitButton.addEventListener('click', function () {
    const formData = {
        fullName: fullNameInput.value,
        password: passwordInput.value,
        secretWord: secretWordInput.value
    };

    if (formData.fullName && formData.password && formData.secretWord) {
        submitButton.disabled = true;
        const jwtToken = localStorage.getItem('token')

        axios.post(`${endpoints.SERVER_ORIGIN_URI}${endpoints.ADMINS.ROUTE}${endpoints.ADMINS.LOGIN}`,
            {
                ...formData
            },
            {
                headers: {
                    token: `Bearer ${jwtToken}`
                }
            }
        )
            .then(res => {
                if (res.data.adminData.token) {
                    localStorage.setItem('token', res.data.adminData.token)
                    localStorage.setItem('admin-type', res.data.adminData.role)
                    localStorage.setItem('fullName', res.data.adminData.fullName)
                    
                    router.navigate('/register-passenger');
                    location.reload();
                } else {
                    toastError("Что-то пошло не так, попробуйте позже")
                }
                // setIsFetching(prev => !prev)
            })
            .catch(() => {
                toastError("Похоже введеные вами данные оказались не верными")
                submitButton.disabled = false; // Восстановление работы кнопки
                // setIsFetching(prev => !prev)
            })
    } else {
        toastError("Кажется, вы что-то не заполнили");
    }
});
