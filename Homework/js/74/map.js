(async function () {
  'use strict';

  let map, infoWindow;
  let markers = [];
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const resultsDiv = document.getElementById('results');

  // Initialize Google Map
  async function initMap() {
    const { Map } = await google.maps.importLibrary('maps');
    map = new Map(document.getElementById('map'), {
      center: { lat: 20, lng: 0 },
      zoom: 2,
      mapId: 'DEMO_MAP_ID', // optional style customization
    });

    infoWindow = new google.maps.InfoWindow();
    setupSearch();
  }

  // Search setup with button + enter key
  function setupSearch() {
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSearch();
    });
  }

  // Debounce helper (prevents rapid searches)
  function debounce(fn, delay = 500) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  const handleSearch = debounce(async () => {
    const query = searchInput.value.trim();
    if (!query) return;

    showLoading(true);

    const username = 'chaimzvorch';
    const url = `https://secure.geonames.org/wikipediaSearchJSON?q=${encodeURIComponent(query)}&maxRows=10&username=${username}&type=json`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.geonames?.length) {
        displayResults(data.geonames);
      } else {
        showResultsMessage('No results found.');
      }
    } catch (err) {
      console.error('Wikipedia fetch error:', err);
      showResultsMessage('⚠️ Failed to fetch data.');
    } finally {
      showLoading(false);
    }
  }, 700);

  // Show loading spinner
  function showLoading(isLoading) {
    searchBtn.textContent = isLoading ? 'Searching...' : 'Search';
    searchBtn.disabled = isLoading;
  }

  // Display text message in results panel
  function showResultsMessage(message) {
    resultsDiv.innerHTML = `<p style="color:#666; text-align:center;">${message}</p>`;
  }

  // Display search results
  function displayResults(results) {
    // Clear old markers
    markers.forEach(m => m.setMap(null));
    markers = [];
    resultsDiv.innerHTML = '';

    const bounds = new google.maps.LatLngBounds();

    results.forEach((item) => {
      const pos = { lat: item.lat, lng: item.lng };
      const marker = new google.maps.Marker({
        position: pos,
        map,
        animation: google.maps.Animation.DROP,
        icon: item.thumbnailImg
          ? { url: item.thumbnailImg, scaledSize: new google.maps.Size(40, 40) }
          : undefined,
      });

      marker.addListener('click', () => {
        infoWindow.setContent(`
          <div style="max-width:220px;">
            <h3 style="margin-top:0;">${item.title}</h3>
            <p>${item.summary || 'No description available.'}</p>
            <a href="https://${item.wikipediaUrl}" target="_blank">Read more →</a>
          </div>
        `);
        infoWindow.open(map, marker);
      });

      markers.push(marker);
      bounds.extend(pos);

      // Add to results sidebar
      const resultItem = document.createElement('div');
      resultItem.innerHTML = `
        <strong>${item.title}</strong><br>
        <small>${item.countryCode || ''}</small>
      `;
      resultItem.style.cursor = 'pointer';
      resultItem.addEventListener('click', () => {
        map.panTo(pos);
        map.setZoom(6);
        google.maps.event.trigger(marker, 'click');
      });

      resultsDiv.appendChild(resultItem);
    });

    if (results.length) map.fitBounds(bounds);
  }

  await initMap();
}());
