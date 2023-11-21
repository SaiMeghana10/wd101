// Retrieve entries from local storage when the page loads
document.addEventListener('DOMContentLoaded', function () {
    const entriesFromStorage = JSON.parse(localStorage.getItem('entries')) || [];
    entriesFromStorage.forEach(display);
  });

  function submitForm(event) {
    event.preventDefault();

    // Validate date of birth (between 18 and 55 years)
    const dobInput = document.getElementById('dob');
    const today = new Date();
    const dob = new Date(dobInput.value);
    const age = today.getFullYear() - dob.getFullYear();

    if (age < 18 || age > 55) {
      alert('Please enter a valid date of birth (between 18 and 55 years).');
      return;
    }
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput.value)) {
      alert('Please enter a valid email address.');
      return;
    }

    const formData = {
      name: document.getElementById('name').value,
      age: age,
      email: emailInput.value,
      password: document.getElementById('password').value,
      acceptTerms: document.getElementById('acceptTerms').checked,
    };

    // Save the data to local storage
    saveToLocalStorage(formData);

    // Display the entry in the table
    display(formData);

    // Optionally, clear the form after submission
    document.getElementById('registrationForm').reset();
  }

  function saveToLocalStorage(formData) {
    // Retrieve existing entries from local storage or initialize an empty array
    const entries = JSON.parse(localStorage.getItem('entries')) || [];

    // Add the new entry to the array
    entries.push(formData);

    // Save the updated array back to local storage
    localStorage.setItem('entries', JSON.stringify(entries));
  }

  function display(formData) {
    const entriesTableBody = document.getElementById('tableEntry');
    const newRow = entriesTableBody.insertRow();

    const nameCell = newRow.insertCell(0);
    const emailCell = newRow.insertCell(1);
    const passwordCell = newRow.insertCell(2);
    const dobCell=newRow.insertCell(3);
    const acceptTermsCell = newRow.insertCell(4);

      nameCell.textContent = formData.name;
      emailCell.textContent = formData.email;
      passwordCell.textContent = formData.password; 
      dobCell.textContent = formData.dob;
      acceptTermsCell.textContent = formData.acceptTerms ? 'True' : 'False';
  }
