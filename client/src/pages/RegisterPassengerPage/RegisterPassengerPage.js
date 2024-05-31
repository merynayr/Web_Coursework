import { createRegisterPassengerFlightsCard } from '../../components/TableItemCard/RegisterPassengerFlightsCard.js';
import { socket } from '../../socket.js';
import { renderNoItems } from '../../components/NoItems/NoItems.js';
import { calculateLastCallTime } from '../../utils/calculateLastCallTime.js'

$(document).ready(function () {
    let formData = {};
    let flights = [];
    let unChangedFlights = [];
    let validSeatSelected = false; // Flag to check if a valid seat is selected
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

        // Prevent moving to step 4 if no valid seat is selected
        if (nextStep.is('#step4') && !validSeatSelected) {
            toastWarning("Выберите свободное место перед продолжением");
            return;
        }

        if (nextStep.length) {
            currentStep.hide();
            nextStep.show();
        }

        if (nextStep.is('#step3')) {
            const currentFlightNumber = formData.flightNumber;
            switchStep(3, formData, formData.planeSeatPlaces);
        }

        if (nextStep.is('#step4')) {
            updateBoardingPassInfo();
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

    $('#passengerDataForm').submit(function (event) {
        event.preventDefault();
        formData.fullName = $('#fullName').val();
        formData.passportSeries = $('#passportSeries').val();
        formData.passportNumber = $('#passportNumber').val();
    });

    const handleCardClick = (data) => {
        formData = data;
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
            socket.emit('flightsDataGet');
        }
    });

    socket.emit('flightsDataGet');

    socket.on('flightsResponse', (data) => {
        if (data.body.length) {
            flights = data.body;
            unChangedFlights = data.body;
            renderFlights(flights);
        } else {
            renderNoItems(container, 'Рейсов не найдено 😔', 'flightsDataGet', true);
        }
    });

    socket.on('flightsUpdate', () => {
        socket.emit('flightsDataGet');
    });

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
            formData.selectedSeat = place.seatName;
            validSeatSelected = true;
        } else {
            validSeatSelected = false;
            toastWarning("Это место занято");
        }
    };


    const updateBoardingPassInfo = () => {
        $('#gateInfo').text(formData.gate);
        $('#boardingInfo').text(`${formData.date} | ${formData.flightTime}`);
        $('#lastCallInfo').text(`${formData.date} | ${calculateLastCallTime(formData.flightTime)}`);
        $('#passengerInfo').text(formData.fullName);
        $('#departureInfo').text(formData.departureAirport);
        $('#seatInfo').text(formData.selectedSeat);
        $('#priceInfo').text(`${formData.flightPrice}₽`);
        $('#arrivalInfo').text(formData.destinationAirport);
        $('#flightNumberInfo').text(formData.flightNumber);
    };

    $('#printTicket').click(function () {
        window.print();
    });
});
