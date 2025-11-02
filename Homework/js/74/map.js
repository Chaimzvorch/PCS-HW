(async function () {
    'use strict';
    let map;
    let markers = [];
    let infoWindow;

    async function initMap() {
        const { Map } = await google.maps.importLibrary('maps');
        map = new Map(document.getElementById('map'), {
            center: { lat: 20, lng: 0 },
            zoom: 2,
        });
        infoWindow = new google.maps.InfoWindow();

        document.getElementById('searchBtn').addEventListener('click', async () => {
            const query = document.getElementById('searchInput').value.trim();
            if (!query) return;

            const username = 'chaimzvorch';
            const url = `https://secure.geonames.org/wikipediaSearchJSON?q=${encodeURIComponent(query)}&maxRows=10&username=${username}&type=json`;

            try {
                const res = await fetch(url);
                const data = await res.json();
                if (data.geonames && data.geonames.length > 0) {
                    displayResults(data.geonames);
                } else {
                    alert('No results found.');
                }
            } catch (err) {
                console.error('Error fetching Wikipedia data:', err);
                alert('Failed to fetch data.');
            }
        });
    }

    function displayResults(results) {
        markers.forEach((m) => m.setMap(null));
        markers = [];

        const bounds = new google.maps.LatLngBounds();

        results.forEach((item) => {
            const position = { lat: item.lat, lng: item.lng };
            const marker = new google.maps.Marker({
                position,
                map,
                icon: item.thumbnailImg
                    ? {
                        url: item.thumbnailImg,
                        scaledSize: new google.maps.Size(40, 40),
                    }
                    : undefined,
            });

            marker.addListener('click', () => {
                infoWindow.setContent(`
          <div style='max-width:200px'>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            <a href='https://${item.wikipediaUrl}' target='_blank'>Read more</a>
          </div>
        `);
                infoWindow.open(map, marker);
            });

            markers.push(marker);
            bounds.extend(position);
        });

        if (results.length) {
            map.fitBounds(bounds);
        }
    }

    initMap();
}());