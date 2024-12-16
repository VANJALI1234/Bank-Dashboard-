// Initial balance
let balance = 1000;

// Update balance display
function updateBalance() {
    document.getElementById('balance').textContent = balance.toFixed(2);
}

// Deposit money
document.getElementById('depositButton').addEventListener('click', function() {
    const depositAmount = parseFloat(document.getElementById('depositAmount').value);
    if (depositAmount > 0) {
        balance += depositAmount;
        updateBalance();
        document.getElementById('depositAmount').value = '';
    } else {
        alert('Please enter a valid amount.');
    }
});

// Withdraw money
document.getElementById('withdrawButton').addEventListener('click', function() {
    const withdrawAmount = parseFloat(document.getElementById('withdrawAmount').value);
    if (withdrawAmount > 0 && withdrawAmount <= balance) {
        balance -= withdrawAmount;
        updateBalance();
        document.getElementById('withdrawAmount').value = '';
    } else if (withdrawAmount > balance) {
        alert('Insufficient funds.');
    } else {
        alert('Please enter a valid amount.');
    }
});

// Initialize with the default balance
updateBalance();
