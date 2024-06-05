import { createAirportTableItemCard } from '../../components/TableItemCard/AirportTableItemCard.js';
import { renderNoItems } from '../../components/NoItems/NoItems.js';
import { endpoints } from "../../api/index.js";
$(document).ready(function () {
    let airports = [];
    let unChangedAirports = [];

    $("#createContainer").load("src/components/Popups/CreateAirport.html");
    $("#editContainer").load("src/components/Popups/EditItem.html");
    $("#removeContainer").load("src/components/Popups/RemoveItem.html");

    // Function to render airports
    const renderAirports = (airportData) => {
        const container = $('#airportsContainer');
        container.empty();

        if (airportData.length) {
            airportData.forEach(airport => {
                const card = createAirportTableItemCard(airport); // Необходимо определить функцию createAirportTableItemCard
                container.append(card);
            });
        } else {
            renderNoItems('#airportsContainer', 'Аэропорты не найдены 😔', true); // Необходимо определить функцию renderNoItems
        }
    };

    $('#searchInput').on('input', function (e) {
        const searchValue = e.target.value.toLowerCase();
        const filteredAirports = unChangedAirports.filter(airport =>
            airport.airportName.toLowerCase().includes(searchValue) ||
            airport.airportPlace.toLowerCase().includes(searchValue)
        );
        renderAirports(filteredAirports);

        if (searchValue === '') {
            fetchAirports();
        }
    });

    const fetchAirports = () => {
        $.ajax({
            url: `${endpoints.SERVER_ORIGIN_URI}${endpoints.AIRPORTS.ROUTE}${endpoints.AIRPORTS.GET_ALL}`,
            method: 'GET',
            success: (data) => {
                airports = data.body;
                unChangedAirports = data.body;
                renderAirports(airports);
            },
            error: (err) => {
                console.error('Error fetching airports:', err);
                renderAirports([]);
            }
        });
    };

    fetchAirports();
    window.fetchAirports = fetchAirports;

});
