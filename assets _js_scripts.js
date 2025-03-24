// Load scores dynamically for school tables
document.addEventListener('DOMContentLoaded', () => {
    const tableLinks = document.querySelectorAll('.table-link');
    const tableContainer = document.getElementById('table-container');

    // Load table content when a link is clicked
    tableLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tableFile = link.getAttribute('data-table');

            fetch(`/tables/${tableFile}.md`)
                .then(response => response.text())
                .then(data => {
                    tableContainer.innerHTML = marked.parse(data);
                })
                .catch(error => {
                    console.error('Error loading table:', error);
                    tableContainer.innerHTML = `<p style="color: red;">Failed to load table. Please try again.</p>`;
                });
        });
    });
});

// Calculate total scores in tables
function calculateTotals() {
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        const rows = table.querySelectorAll('tr');
        rows.forEach((row, index) => {
            if (index === 0) return; // Skip header row
            const cells = row.querySelectorAll('td');
            if (cells.length === 4) {
                const first = parseInt(cells[1].innerText) || 0;
                const second = parseInt(cells[2].innerText) || 0;
                const exam = parseInt(cells[3].innerText) || 0;
                cells[4].innerText = first + second + exam;
            }
        });
    });
}

// Execute total calculation on window load
window.onload = () => calculateTotals();

RND
