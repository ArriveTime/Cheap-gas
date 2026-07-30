function searchGas() {
    const zipCode = document.getElementById('zipInput').value.trim();
    const resultsContainer = document.getElementById('results');

    if (zipCode.length !== 5 || isNaN(zipCode)) {
        alert('Please enter a valid 5-digit zip code.');
        return;
    }

    resultsContainer.innerHTML = '<p style="text-align:center;">Searching for cheapest gas in ' + zipCode + '...</p>';

    // --- MOCK DATA SIMULATION ---
    // Replace this setTimeout block later with a real fetch() request to your chosen gas price API
    setTimeout(() => {
        const mockStations = [
            { name: "Costco Gas", address: "123 Main St", price: "$3.15" },
            { name: "Shell", address: "456 Market St", price: "$3.29" },
            { name: "Chevron", address: "789 Broadway", price: "$3.35" }
        ];

        let html = `<h3>Cheapest Stations in ${zipCode}</h3>`;
        mockStations.forEach(station => {
            html += `
                <div class="station-card">
                    <div class="station-info">
                        <h3>${station.name}</h3>
                        <p>${station.address}</p>
                    </div>
                    <div class="price-tag">${station.price}</div>
                </div>
            `;
        });

        resultsContainer.innerHTML = html;
    }, 800);
}
