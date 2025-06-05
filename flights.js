// flights.js
// Fetches flight timetable data from Taoyuan Airport API and displays it

document.addEventListener('DOMContentLoaded', () => {
  const statusEl = document.getElementById('status');
  const tableEl = document.getElementById('flights-table');
  const tbodyEl = tableEl.querySelector('tbody');

  // Placeholder API endpoint. Replace with real endpoint if available.
  const API_URL = 'https://www.taoyuan-airport.com/api/flight_timetable';

  fetch(API_URL)
    .then((resp) => {
      if (!resp.ok) throw new Error('Network response was not ok');
      return resp.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) {
        statusEl.textContent = 'Unexpected API response';
        return;
      }
      data.forEach((flight) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${flight.flightNo || ''}</td>
          <td>${flight.route || ''}</td>
          <td>${flight.time || ''}</td>
          <td>${flight.status || ''}</td>
        `;
        tbodyEl.appendChild(row);
      });
      statusEl.style.display = 'none';
      tableEl.style.display = 'table';
    })
    .catch((err) => {
      console.error(err);
      statusEl.textContent = 'Failed to load data.';
    });
});
