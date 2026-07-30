let map = null;
let markers = [];

function searchGas() {
    const zipCode = document.getElementById('zipInput').value.trim();
    const contentArea = document.getElementById('contentArea');

    if (zipCode.length !== 5 || isNaN(zipCode)) {
        alert('Please enter a valid 5-digit zip code.');
        return;
    }

    // Switch layout to show side-by-side Map and Results Panel
    contentArea.innerHTML = `
        <div id="map"></div>
        <div class="results-panel" id="resultsPanel"></div>
    `;

    // Initialize Leaflet Map centered roughly on a mock coordinate (e.g., standard US central region for demo)
    // In production, your zip code lookup will return the precise latitude/longitude for the entered ZIP.
    const defaultLat = 37.5407;
    const defaultLng = -77.4360;

    if (map) {
        map.remove(); // Reset map instance if searching again
    }

    map = L.map('map').setView([defaultLat, defaultLng], 13);

    // Add free OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Mock Stations Example Data (Simulating what your API will output)
    const mockStations = [
        { name: "Costco Gas", address: "100 Marketplace Dr", distance: "0.8 miles away", price: "$3.15", lat: 37.5457, lng: -77.4460 },
        { name: "Shell", address: "452 Broad Street", distance: "1.4 miles away", price: "$3.29", lat: 37.5357, lng: -77.4260 },
        { name: "Chevron", address: "890 West End Ave", distance: "2.1 miles away", price: "$3.35", lat: 37.5507, lng: -77.4160 },
        { name: "Exxon", address: "1200 Capital Trail", distance: "2.8 miles away", price: "$3.42", lat: 37.5257, lng: -77.4560 }
    ];

    const resultsPanel = document.getElementById('resultsPanel');
    let panelHtml = `<h4 style="margin:0 0 4px 0; color:#f8fafc;">Stations near ${zipCode}</h4>`;

    mockStations.forEach((station, index) => {
        // Add Marker to Map
        const marker = L.marker([station.lat, station.lng]).addTo(map)
            .bindPopup(`<b>${station.name}</b><br>Price: ${station.price}<br>${station.address}`);
        markers.push(marker);

        // Add Station Card to Right Panel
        panelHtml += `
            <div class="station-card">
                <div class="station-info">
                    <h3>${station.name}</h3>
                    <p>${station.address}</p>
                    <div class="station-meta">📍 ${station.distance}</div>
                </div>
                <div class="price-tag">${station.price}</div>
            </div>
        `;
    });

    resultsPanel.innerHTML = panelHtml;
}
