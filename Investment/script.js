// Initialize portfolio data and retrieve from localStorage if available
let portfolio = JSON.parse(localStorage.getItem('portfolio')) || [];

// DOM Elements
const totalValueEl = document.getElementById('totalValue');
const investmentTable = document.getElementById('investmentTable');
const addInvestmentForm = document.getElementById('addInvestmentForm');

// Add Investment Function
addInvestmentForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const assetName = document.getElementById('assetName').value;
    const investedAmount = parseFloat(document.getElementById('investedAmount').value);
    const currentValue = parseFloat(document.getElementById('currentValue').value);

    const newInvestment = { assetName, investedAmount, currentValue };
    portfolio.push(newInvestment);

    updatePortfolio();
    saveToLocalStorage();
    addInvestmentForm.reset();
});

// Update Portfolio Table and Total Value
function updatePortfolio() {
    investmentTable.innerHTML = ''; // Clear table before rendering new data
    let totalPortfolioValue = 0;

    portfolio.forEach((investment, index) => {
        const percentageChange = ((investment.currentValue - investment.investedAmount) / investment.investedAmount * 100).toFixed(2);

        // Calculate total portfolio value
        totalPortfolioValue += investment.currentValue;

        // Add investment row to the table
        const row = `
            <tr>
                <td>${investment.assetName}</td>
                <td>$${investment.investedAmount.toFixed(2)}</td>
                <td>$${investment.currentValue.toFixed(2)}</td>
                <td>${percentageChange}%</td>
                <td>
                    <button onclick="removeInvestment(${index})">Remove</button>
                    <button onclick="updateInvestment(${index})">Update</button>
                </td>
            </tr>
        `;
        investmentTable.innerHTML += row;
    });

    // Update total portfolio value
    totalValueEl.textContent = totalPortfolioValue.toFixed(2);

    // Update the pie chart
    updateChart();
}

// Remove Investment Function
function removeInvestment(index) {
    portfolio.splice(index, 1);
    updatePortfolio();
    saveToLocalStorage();
}

// Update Investment (prompt for new current value)
function updateInvestment(index) {
    const newCurrentValue = parseFloat(prompt("Enter new current value:", portfolio[index].currentValue));
    if (!isNaN(newCurrentValue)) {
        portfolio[index].currentValue = newCurrentValue;
        updatePortfolio();
        saveToLocalStorage();
    }
}

// Save Portfolio to Local Storage
function saveToLocalStorage() {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
}

// Pie Chart Configuration
const ctx = document.getElementById('portfolioChart').getContext('2d');
let chart;
function updateChart() {
    const assetLabels = portfolio.map(investment => investment.assetName);
    const assetValues = portfolio.map(investment => investment.currentValue);

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: assetLabels,
            datasets: [{
                data: assetValues,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Initialize the portfolio on page load
updatePortfolio();
