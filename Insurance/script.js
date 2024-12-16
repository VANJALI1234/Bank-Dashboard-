document.getElementById('fileClaimBtn').addEventListener('click', () => {
  document.getElementById('form-section').style.display = 'block';
  document.getElementById('claims-section').style.display = 'none';
  document.getElementById('chatbot-section').style.display = 'none';
});

document.getElementById('trackClaimsBtn').addEventListener('click', () => {
  document.getElementById('claims-section').style.display = 'block';
  document.getElementById('form-section').style.display = 'none';
  document.getElementById('chatbot-section').style.display = 'none';
});

document.getElementById('chatbotBtn').addEventListener('click', () => {
  document.getElementById('chatbot-section').style.display = 'block';
  document.getElementById('form-section').style.display = 'none';
  document.getElementById('claims-section').style.display = 'none';
});

const claims = [];

document.getElementById('claimForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const policyNumber = document.getElementById('policyNumber').value;
  const incidentDate = document.getElementById('incidentDate').value;
  const description = document.getElementById('description').value;
  const claimNumber = `CLM${claims.length + 1}`;
  
  claims.push({
    claimNumber,
    status: 'In Review',
    dateSubmitted: new Date().toLocaleDateString(),
  });

  document.getElementById('claimForm').reset();
  alert('Claim submitted successfully');
  displayClaims();
});

function displayClaims() {
  const tableBody = document.querySelector('#claimsTable tbody');
  tableBody.innerHTML = '';
  
  claims.forEach(claim => {
    const row = `
      <tr>
        <td>${claim.claimNumber}</td>
        <td>${claim.status}</td>
        <td>${claim.dateSubmitted}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}
