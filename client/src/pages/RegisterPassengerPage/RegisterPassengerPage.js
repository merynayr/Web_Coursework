import { createRegisterPassengerFlightsCard } from '../../components/TableItemCard/RegisterPassengerFlightsCard.js';
// import { socket } from '../../socket.js';
import { renderNoItems } from '../../components/NoItems/NoItems.js';
import { calculateLastCallTime } from '../../utils/calculateLastCallTime.js'

$(document).ready(function () {
    let formData = {};
    let flights = [];
    let unChangedFlights = [];
    let validSeatSelected = false;
    const container = $('#flightCardsContainer');

    // Function to switch between steps
    const switchStep = (stepIndex, selectedFlight, planeSeatPlaces) => {
        $('.step').hide();
        $(`#step${stepIndex}`).show();
        if (stepIndex === 3 && selectedFlight && planeSeatPlaces) {
            loadSeats(selectedFlight, planeSeatPlaces);
        }
    };

    switchStep(1);

    $('.next-step-button').click(function () {
        const currentStep = $(this).closest('.step');
        const nextStep = currentStep.next('.step');

        if (nextStep.is('#step2')) {
            formData.fullName = $('#fullName').val();
            formData.passportSeries = $('#passportSeries').val();
            formData.passportNumber = $('#passportNumber').val();

            if (validateStep1(formData)) {
                switchStep(2);
            } else {
                toastError("Корректно введите данные");
            }
        }

        if (nextStep.is('#step3')) {
            console.log(formData);
            switchStep(3, formData.flightInfo, formData.flightInfo.planeSeatPlaces);
        }

        if (nextStep.is('#step4')) {
            if (validSeatSelected) {
                switchStep(4);
                updateBoardingPassInfo();
            } else {
                toastWarning("Выберите свободное место перед продолжением");
            }
        }
    });

    $('.cancel-step-button').click(function () {
        const currentStep = $(this).closest('.step');
        const prevStep = currentStep.prev('.step');
        if (prevStep.length) {
            currentStep.hide();
            prevStep.show();
        }
    });


    const handleCardClick = (flightInfo) => {
        formData = { ...formData, flightInfo };
    };

    const renderFlights = (flightData) => {
        container.empty();
        if (flightData.length) {
            flightData.forEach(flight => {
                const card = createRegisterPassengerFlightsCard(flight, handleCardClick);
                container.append(card);
            });
        } else {
            renderNoItems(container, 'Рейсов не найдено 😔', 'flightsDataGet', true);
        }
    };

    $('#searchFlights').on('input', function (e) {
        const searchValue = e.target.value.toLowerCase();
        const filteredFlights = unChangedFlights.filter(flight =>
            Object.values(flight).some(value => value.toString().toLowerCase().includes(searchValue))
        );
        renderFlights(filteredFlights);

        if (searchValue === '') {
            fetchFlights()
        }
    });
    const fetchFlights = () => {
        $.ajax({
            url:`http://localhost:5000/api/flights`,
            method: 'GET',
            success: (data) => {
                    flights = data.body;
                    unChangedFlights = data.body;
                    renderFlights(flights);
            },
            error: (err) => {
                console.error('Error fetching flights:', err);
                renderNoItems(container, 'Рейсов не найдено 😔', 'flightsDataGet', true);
            }
        });
    };

    // Вызов функции для получения данных о рейсах при загрузке страницы
    fetchFlights();

    const loadSeats = (selectedFlight, planeSeatPlaces) => {
        const seatSelectionContainer = $('#seatSelectionContainer');
        seatSelectionContainer.empty();

        $('#selectedFlightNumber').text(selectedFlight.flightNumber);
        $('#selectedDepartureAirport').text(selectedFlight.departureAirport);
        $('#selectedDestinationAirport').text(selectedFlight.destinationAirport);

        planeSeatPlaces.forEach(place => {
            const tooltip = `Место ${place.seatName} ${place.status === 'free' ? 'свободно' : 'занято'}`;
            const seatClass = place.status === 'free' ? 'item' : 'item busy';
            const seatElement = $(`
                <div 
                    class="${seatClass}" 
                    title="${tooltip}" 
                    data-toggle="tooltip"
                >
                    ${place.seatName}
                </div>
            `);

            seatElement.click(() => addPassengerPlace(place));
            seatSelectionContainer.append(seatElement);
        });
    };

    const addPassengerPlace = (place) => {
        if (place.status === 'free') {
            formData.flightInfo.seatNumber = place.seatName;
            validSeatSelected = true;
            toastInfo(`Выбрано место: ${place.seatName}`);
        } else {
            validSeatSelected = false;
            toastWarning("Это место занято");
        }
    };


    const updateBoardingPassInfo = () => {
        $('#gateInfo').text(formData.flightInfo.gate);
        $('#boardingInfo').text(`${formData.flightInfo.date} | ${formData.flightInfo.flightTime}`);
        $('#lastCallInfo').text(`${formData.flightInfo.date} | ${calculateLastCallTime(formData.flightInfo.flightTime)}`);
        $('#passengerInfo').text(formData.fullName);
        $('#departureInfo').text(formData.flightInfo.departureAirport);
        $('#seatInfo').text(formData.flightInfo.seatNumber);
        $('#priceInfo').text(`${formData.flightInfo.flightPrice}₽`);
        $('#arrivalInfo').text(formData.flightInfo.destinationAirport);
        $('#flightNumberInfo').text(formData.flightInfo.flightNumber);
    };

    $('#printTicket').click(async function () {
        console.log("FormData: ", formData);
        try {
            const response = await fetch(`http://localhost:5000/api/passengers/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
    
            if (data.error) {
                toastError("Данный пассажир уже существует");
                return;
            }
    
            toastSuccess("Новый пассажир успешно создан");
    
            // print the ticket
            window.print();
            if (window.location === '/register-passenger') {
                setTimeout(() => {
                    window.location = '/register-passenger';
                }, 5000);
            } else {
                setTimeout(() => {
                    window.location = '/passenger';
                }, 3000);
            }
        } catch (error) {
            console.error(error);
            toastError("Что-то пошло не так, попробуйте позже");
        }
    });
    

    function validateStep1(data) {
        const fullNameValid = data.fullName && data.fullName.trim().length > 0;
        const passportSeriesValid = data.passportSeries && data.passportSeries.trim().length === 4;
        const passportNumberValid = data.passportNumber && data.passportNumber.trim().length === 6;
        return fullNameValid && passportSeriesValid && passportNumberValid;
    }
});
