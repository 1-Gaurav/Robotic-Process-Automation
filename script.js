const employeeInput = document.getElementById('employeeCount');
const savingsOutput = document.getElementById('savingsOutput');
const ctx = document.getElementById('savingsChart');

function updateSavings() {
  const empCount = parseInt(employeeInput.value) || 0;
  const base = 120000; 
  const total = empCount * base;
  savingsOutput.textContent = `₹${total.toLocaleString('en-IN')}`;


  savingsChart.data.datasets[0].data = [1, 2, 3, 4, 5].map(y => y * total);
  savingsChart.update();
}

employeeInput.addEventListener('input', updateSavings);

const savingsChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
    datasets: [{
      label: "Estimated Annual Savings (₹)",
      data: [0, 0, 0, 0, 0],
      backgroundColor: "rgba(31, 56, 125, 0.6)",
      borderColor: "rgba(31, 56, 125, 1)",
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

updateSavings(); 

const form = document.getElementById('leadForm');
const messageBox = document.getElementById('formMessage');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  fetch('https://formspree.io/f/xoqzbdpr', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (res.ok) {
        messageBox.textContent = "✅ Thank you! We’ll be in touch.";
        messageBox.style.color = "green";
        form.reset();
        updateSavings();
      } else {
        throw new Error("Form submission failed.");
      }
    })
    .catch(err => {
      messageBox.textContent = "❌ Submission error. Try again later.";
      messageBox.style.color = "red";
    });
});
