async function searchGas() {
    const zipCode = document.getElementById('zipInput').value.trim();
    const resultsContainer = document.getElementById('results');

    if (zipCode.length !== 5 || isNaN(zipCode)) {
        alert('Please enter a valid 5-digit zip code.');
        return;
    }

    resultsContainer.innerHTML = '<p style="text-align:center;">Fetching real-time prices for ' + zipCode + '...</p>';

    try {
        // Replace this URL with your chosen gas price API endpoint and your API key headers
        const response = await fetch(`https://api.yourprovider.com/gasprices?zip=${zipCode}`, {
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY'
            }
        });
        
        const data = await response.json();
        
        // Loop through the real stations returned by your API
        let html = `<h3>Cheapest Stations in ${zipCode}</h3>`;
        
        if (data.stations && data.stations.length > 0) {
            data.stations.forEach(station => {
                html += `
                    <div class="station-card">
                        <div class="station-info">
                            <h3>${station.name}</h3>
                            <p>${station.address}</p>
                        </div>
                        <div class="price-tag">$${station.price}</div>
                    </div>
                `;
            });
        } else {
            html += `<p>No gas stations found for this zip code.</p>`;
        }

        resultsContainer.innerHTML = html;

    } catch (error) {
        console.error('Error fetching data:', error);
        resultsContainer.innerHTML = '<p style="text-align:center; color:red;">Failed to fetch live prices. Please check your API configuration.</p>';
    }
}
