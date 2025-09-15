// Title
function validateTitle() {
  const title = document.getElementById("title-options");
  const titleError = document.getElementById("titleError");
  if (!title.value) {
    showError(title, titleError, "Please select a title");
    return false;
  } else {
    clearError(title, titleError);
    return true;
  }
}

// First name
function validateFirstName() {
  const firstName = document.getElementById("first-name");
  const firstNameError = document.getElementById("firstNameError");
  if (!firstName.value.trim()) {
    showError(firstName, firstNameError, "First name is required");
    return false;
  } else if (/\d/.test(firstName.value)) {
    firstName.value = firstName.value.replace(/[^A-Z,a-z]/g, "");
    showError(firstName, firstNameError, "Name cannot contain numbers");
    return false;
  } else if (!/^[A-Za-z]+$/.test(firstName.value)) {
    showError(firstName, firstNameError, "Only letters are allowed");
    return false;
  } else {
    clearError(firstName, firstNameError);
    return true;
  }
}

// Last name
function validateLastName() {
  const lastName = document.getElementById("last-name");
  const lastNameError = document.getElementById("lastNameError");
  if (!lastName.value.trim()) {
    showError(lastName, lastNameError, "Last name is required");
    return false;
  } else if (/\d/.test(lastName.value)) {
    lastName.value = lastName.value.replace(/[^A-Z,a-z]/g, "");
    showError(lastName, lastNameError, "Name cannot contain numbers");
    return false;
  } else if (!/^[A-Za-z]+$/.test(lastName.value)) {
    showError(lastName, lastNameError, "Only letters are allowed");
    return false;
  } else {
    clearError(lastName, lastNameError);
    return true;
  }
}

// Mobile
function validateMobile() {
  const countryCode = document.getElementById("country-code");
  const mobileWrapper = document.getElementById("phone-group");
  const mobile = document.getElementById("mobile-number");
  const mobileError = document.getElementById("mobileError");
  if (!mobile.value.trim()) {
    showError(mobileWrapper, mobileError, "Mobile number is required");
    return false;
  } else if (!/^[0-9]+$/.test(mobile.value)) {
    mobile.value = mobile.value.replace(/[^0-9]/g, "");
    showError(
      mobileWrapper,
      mobileError,
      "Mobile number can only contain numbers"
    );
    return false;
  } else if (!countryCode.value) {
    showError(mobileWrapper, mobileError, "Please select a country code");
    return false;
  } else {
    clearError(mobileWrapper, mobileError);
    return true;
  }
}

// Email
function validateEmail() {
  const email = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  if (!email.value.trim()) {
    showError(email, emailError, "Email is required");
    return false;
  } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email.value)) {
    showError(email, emailError, "Enter a valid email");
    return false;
  } else {
    clearError(email, emailError);
    return true;
  }
}

// Interest
function validateInterest() {
  const interest = document.getElementById("interest");
  const interestError = document.getElementById("interestError");
  if (!interest.value) {
    showError(interest, interestError, "Interest is required");
    return false;
  } else if (interest.value && (interest.value < 4.5 || interest.value > 20)) {
    showError(interest, interestError, "Interest must be between 4.5–20");
    return false;
  } else {
    clearError(interest, interestError);
    return true;
  }
}

// Appointment date
function validateAppointmentDate() {
  const date = document.getElementById("appointment-date");
  const dateError = document.getElementById("dateError");
  if (!date.value) {
    showError(date, dateError, "Date is required");
    return false;
  } else {
    clearError(date, dateError);
    return true;
  }
}

// Appointment time
function validateAppointmentTime() {
  const time = document.getElementById("appointment-time");
  const timeError = document.getElementById("timeError");
  if (!time.value) {
    showError(time, timeError, "Time is required");
    return false;
  } else {
    clearError(time, timeError);
    return true;
  }
}

// Venue
function validateAppointmentVenue() {
  const venue = document.getElementById("appointment-venue");
  const venueError = document.getElementById("venueError");
  if (!venue.value) {
    showError(venue, venueError, "Venue is required");
    return false;
  } else {
    clearError(venue, venueError);
    return true;
  }
}

// Amount
function validateAmount() {
  const amountRange = document.getElementById("amount_range");
  const amount = document.getElementById("amount");
  const amountError = document.getElementById("amountError");
  amountRange.value = amount.value;
  const formatAmount = amount.value.replace(",", "");
  if (!amount.value) {
    showError(amount, amountError, "Amount is required");
    return false;
  } else if (!/^[0-9,]+$/.test(amount.value)) {
    amount.value = amount.value.replace(/[^0-9,]/g, "");
    showError(amount, amountError, "Amount should not contain Letters");
    return false;
  } else if (Number(formatAmount) < 500 || Number(formatAmount) > 100000) {
    showError(amount, amountError, "Amount must be between 500–100000");
    return false;
  } else {
    clearError(amount, amountError);
    return true;
  }
}
function formatAmount() {
  const amount = document.getElementById("amount");
  const formatAmount = amount.value.replace(",", "");
  let num = amount.value.replace(/[^0-9]/g, "");
  if (Number(formatAmount) < 500 || Number(formatAmount) > 100000) {
    showError(amount, amountError, "Amount must be between 500–100000");
    return false;
  } else if (num.replace(/,/g, "").length > 3) {
    let lastThree = num.replace(/,/g, "").slice(-3);
    let otherNumbers = num.replace(/,/g, "").slice(0, -3);
    otherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    amount.value = otherNumbers + "," + lastThree;
    return true;
  } else {
    amount.value = num.replace(/,/g, "");
    return true;
  }
}

function showError(input, errorElement, message) {
  input.classList.add("error");
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

function clearError(input, errorElement) {
  input.classList.remove("error");
  errorElement.textContent = "";
  errorElement.style.display = "none";
  return;
}

function validateForm() {
  let valid = true;

  if (!validateTitle()) valid = false;
  if (!validateFirstName()) valid = false;
  if (!validateLastName()) valid = false;
  if (!validateMobile()) valid = false;
  if (!validateEmail()) valid = false;
  if (!validateInterest()) valid = false;
  if (!validateAppointmentDate()) valid = false;
  if (!validateAppointmentTime()) valid = false;
  if (!validateAppointmentVenue()) valid = false;
  if (!validateAmount()) valid = false;
  if (!formatAmount()) valid = false;

  return valid;
}

function submit_form(event) {
  event.preventDefault();
  if (validateForm()) {
    // save to session storage and redirect
    sessionStorage.setItem(
      "title",
      document.getElementById("title-options").value
    );
    sessionStorage.setItem(
      "first_name",
      document.getElementById("first-name").value
    );
    sessionStorage.setItem(
      "last_name",
      document.getElementById("last-name").value
    );
    sessionStorage.setItem(
      "country_code",
      document.getElementById("country-code").value
    );
    sessionStorage.setItem(
      "mobile_number",
      document.getElementById("mobile-number").value
    );
    sessionStorage.setItem("email", document.getElementById("email").value);
    sessionStorage.setItem(
      "appointment_date",
      document.getElementById("appointment-date").value
    );
    sessionStorage.setItem(
      "appointment_time",
      document.getElementById("appointment-time").value
    );
    sessionStorage.setItem("amount", document.getElementById("amount").value);
    sessionStorage.setItem(
      "appointment_venue",
      document.getElementById("appointment-venue").value
    );
    sessionStorage.setItem(
      "interest_rate",
      document.getElementById("interest").value
    );
    alert("Form submitted successfully!");
    window.location.href = "preview.html";
  }
}
