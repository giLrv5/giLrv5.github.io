// flights.js
// Displays flight timetable data from a local JSON file

document.addEventListener('DOMContentLoaded', () => {
  const statusEl = document.getElementById('status');
  const tableEl = document.getElementById('flights-table');
  const tbodyEl = tableEl.querySelector('tbody');

  // Static data file for 2025/06/21 flights
  const DATA_URL = 'out.json';

  fetch(DATA_URL)
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
