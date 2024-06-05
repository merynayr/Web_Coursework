import { createPlaneTableItemCard } from '../../components/TableItemCard/PlaneTableItemCard.js';
import { renderNoItems } from '../../components/NoItems/NoItems.js';
import { endpoints } from "../../api/index.js";

$(document).ready(function () {
    let planes = [];
    let unChangedPlanes = [];

    $("#createContainer").load("src/components/Popups/CreatePlane.html");
    $("#editContainer").load("src/components/Popups/EditItem.html");
    $("#removeContainer").load("src/components/Popups/RemoveItem.html");

    // Function to render planes
    const renderPlanes = (planeData) => {
        const container = $('#planesContainer');
        container.empty();

        if (planeData.length) {
            planeData.forEach(plane => {
                const card = createPlaneTableItemCard(plane);
                container.append(card);
            });
        } else {
            renderNoItems('#planesContainer', 'Самолеты не найдены 😔', true);
        }
    };

    $('#searchInput').on('input', function (e) {
        const searchValue = e.target.value.toLowerCase();
        const filteredPlanes = unChangedPlanes.filter(plane =>
            plane.planeType.toLowerCase().includes(searchValue) ||
            plane.seatCount.toString().includes(searchValue)
        );
        renderPlanes(filteredPlanes);

        if (searchValue === '') {
            fetchPlanes();
        }
    });

    const fetchPlanes = () => {
        $.ajax({
            url: `${endpoints.SERVER_ORIGIN_URI}${endpoints.PLANES.ROUTE}${endpoints.PLANES.GET_ALL}`,
            method: 'GET',
            success: (data) => {
                planes = data.body;
                unChangedPlanes = data.body;
                renderPlanes(planes);
            },
            error: (err) => {
                console.error('Error fetching planes:', err);
                renderPlanes([]);
            }
        });
    };

    fetchPlanes();
    window.fetchPlanes = fetchPlanes;

});
