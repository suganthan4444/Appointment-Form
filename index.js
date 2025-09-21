let loanChart; // store chart instance

function updateChart(principal, interest) {
  const total = principal + interest;
  const ctx = document.getElementById("loanGauge").getContext("2d");

  // Destroy old chart before drawing new one
  if (loanChart) {
    loanChart.destroy();
  }

  loanChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Principal", "Interest"],
      datasets: [
        {
          data: [principal, interest],
          backgroundColor: ["#007bff", "#ff6b6b"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      rotation: -90,
      circumference: 180,
      cutout: "70%",
      plugins: {
        legend: {
          onClick: null, // 🔹 disables toggle on click
        },
        doughnutlabel: {
          labels: [
            {
              text: `₹${total.toLocaleString("en-IN")}`, // Indian format
              font: { size: 24, weight: "bold" },
            },
            { text: "Total Loan" },
          ],
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const value = context.raw; // raw dataset value
              return `${context.label}: ₹${Number(value).toLocaleString(
                "en-IN"
              )}`;
            },
          },
        },
      },
      elements: {
        arc: {
          hoverOffset: 0, // 🚫 no slice growth/shrink on hover
        },
      },
    },
  });
}

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
    firstName.value = firstName.value.replace(/[^A-Za-z]/g, "");
    showError(firstName, firstNameError, "Name cannot contain numbers");
    return false;
  } else if (!/^[A-Za-z]+$/.test(firstName.value)) {
    firstName.value = firstName.value.replace(/[^A-Za-z]/g, "");
    showError(firstName, firstNameError, "Only letters are allowed");
    return false;
  } else {
    clearError(firstName, firstNameError);
    return true;
  }
}

function checkFirstName() {
  const firstName = document.getElementById("first-name");
  const firstNameError = document.getElementById("firstNameError");
  if (firstName.value.length == 1) {
    showError(
      firstName,
      firstNameError,
      "First name should contain two letters or more"
    );
    return false;
  } else {
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
    lastName.value = lastName.value.replace(/[^A-Z,a-z]/g, "");
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
  } else if (!/^[0-9]{10}$/.test(mobile.value)) {
    mobile.value = mobile.value.slice(0, 10);
    clearError(mobileWrapper, mobileError);
    return false;
  } else if (!countryCode.value) {
    showError(mobileWrapper, mobileError, "Please select a country code");
    return false;
  } else {
    clearError(mobileWrapper, mobileError);
    return true;
  }
}

//Mobile Length Validation
function validateMobileLength() {
  const countryCode = document.getElementById("country-code");
  const mobileWrapper = document.getElementById("phone-group");
  const mobile = document.getElementById("mobile-number");
  const mobileError = document.getElementById("mobileError");
  if (mobile.value.length >= 1 && mobile.value.length < 10) {
    showError(
      mobileWrapper,
      mobileError,
      "Mobile number should have exactly 10 digits"
    );
    return false;
  } else if (mobile.value.length > 10) {
  } else {
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
  } else if (
    !/^[a-zA-Z0-9._%+-~!]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)
  ) {
    email.value = email.value.replace(/[^0-9A-Za-z.-_%+~!]/g, "");
    showError(email, emailError, "Enter a valid email");
    return false;
  } else {
    clearError(email, emailError);
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
  const formatAmount = amount.value.replace(/[^0-9]/g, "");
  amountRange.value = formatAmount;
  num = amount.value;
  if (Number(formatAmount) > 5000000) {
    amount.value = "5000000";
    showError(amount, amountError, "Amount must be between 50K – 50Lakhs");
    setTimeout(() => clearError(amount, amountError), 1500);
    return false;
  } else if (!/^[0-9,]+$/.test(amount.value)) {
    amount.value = amount.value.replace(/[^0-9,]/g, "");
    showError(amount, amountError, "Amount should not contain Letters");
    return false;
  } else if (num.replace(/,/g, "").length > 3) {
    let raw = num.replace(/,/g, "");

    let lastThree = raw.slice(-3);
    let otherNumbers = raw.slice(0, -3);

    if (otherNumbers !== "") {
      otherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
      amount.value = otherNumbers + "," + lastThree;
    } else {
      amount.value = lastThree;
    }

    clearError(amount, amountError);
    return true;
  } else {
    amount.value = num.replace(/,/g, "");
    clearError(amount, amountError);
    return true;
  }
}

function validateAmountChange() {
  const amount = document.getElementById("amount");
  const amountError = document.getElementById("amountError");
  const formatAmount = amount.value.replace(/[^0-9]/g, "");
  if (!amount.value) {
    showError(amount, amountError, "Amount is required");
    return false;
  } else if (Number(formatAmount) < 50000) {
    amount.value = "50000";
    showError(amount, amountError, "Amount must be between 50K – 50Lakhs");
    setTimeout(() => clearError(amount, amountError), 1500);
    return false;
  } else if (Number(formatAmount) % 1000 !== 0) {
    showError(amount, amountError, "Amount must be multiples of 1000");
    return false;
  } else {
    return true;
  }
}

// Interest
function validateInterest() {
  const interest = document.getElementById("interest");
  const interestError = document.getElementById("interestError");
  const interestRange = document.getElementById("interest_range");
  interestRange.value = interest.value;
  if (interest.value > 22) {
    interest.value = 22;
    showError(interest, interestError, "Interest must be between 9.9% – 22%");
    setTimeout(() => clearError(interest, interestError), 1500);
    return false;
  } else if (interest.value > 9.9) {
    interest.value = Number(interest.value).toFixed(1);
    clearError(interest, interestError);
    return true;
  }
}

function validateInterestChange() {
  const interest = document.getElementById("interest");
  const interestError = document.getElementById("interestError");
  const interestRange = document.getElementById("interest_range");
  interestRange.value = interest.value;
  if (!interest.value) {
    showError(interest, interestError, "Interest is required");
    return false;
  } else if (interest.value < 9.9) {
    interest.value = 9.9;
    showError(interest, interestError, "Interest must be between 9.9% – 22%");
    setTimeout(() => clearError(interest, interestError), 1500);
    return false;
  } else {
    interest.value = Number(interest.value).toFixed(1);
    clearError(interest, interestError);
    return true;
  }
}

// Period
function validatePeriod() {
  const period = document.getElementById("period");
  const periodError = document.getElementById("periodError");
  const periodRange = document.getElementById("period_range");
  periodRange.value = period.value;
  if (period.value > 84) {
    period.value = 84;
    showError(period, periodError, "Period must be between 12 – 84 months");
    setTimeout(() => clearError(period, periodError), 1500);
    return false;
  } else {
    period.value = Number(period.value).toFixed(0);
    clearError(period, periodError);
    return true;
  }
}

function validatePeriodChange() {
  const period = document.getElementById("period");
  const periodError = document.getElementById("periodError");
  if (!period.value) {
    showError(period, periodError, "Period is required");
    return false;
  } else if (period.value < 12) {
    period.value = 12;
    showError(period, periodError, "Period must be between 12 – 84 months");
    setTimeout(() => clearError(period, periodError), 1500);
    return false;
  } else {
    period.value = Number(period.value).toFixed(0);
    clearError(period, periodError);
    return true;
  }
}

function calculateResult() {
  const amount = document.getElementById("amount");
  const formatAmount = amount.value.replace(/[^0-9]/g, "");
  const interest = parseFloat(document.getElementById("interest").value);
  const period = parseFloat(document.getElementById("period").value);
  const loanAmount = document.getElementById("loan-amount");
  const loanInterest = document.getElementById("loan-interest");
  const totalAmount = document.getElementById("total-amount");
  const resultChart = document.getElementById("result-chart");

  const monthlyInterest = interest / 1200;
  const emi =
    (formatAmount * monthlyInterest * (1 + monthlyInterest) ** period) /
    ((1 + monthlyInterest) ** period - 1);
  if (formatAmount && interest && period) {
    const loan_amount = Number(formatAmount);
    const interest_amount = Math.round(emi * period - loan_amount);
    const total_amount = loan_amount + interest_amount;
    loanAmount.value = amount.value;
    // Format function
    function formatIndianNumber(num) {
      if (num < 1000) return num.toString();
      let str = num.toString();
      let lastThree = str.slice(-3);
      let otherNumbers = str.slice(0, -3);
      if (otherNumbers !== "") {
        otherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
        return otherNumbers + "," + lastThree;
      } else {
        return lastThree;
      }
    }

    loanInterest.value = formatIndianNumber(interest_amount);
    totalAmount.value = formatIndianNumber(total_amount);
    sessionStorage.setItem("emiRaw", Math.round(emi));
    sessionStorage.setItem("emi", formatIndianNumber(Math.round(emi)));
    updateChart(loan_amount, interest_amount);
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

  if (!validateTitle()) {
    console.log("title");
    valid = false;
  }
  if (!checkFirstName()) {
    console.log("fname");
    valid = false;
  }
  if (!validateFirstName()) {
    console.log("valfname");
    valid = false;
  }
  if (!validateLastName()) {
    console.log("lname");
    valid = false;
  }
  if (!validateMobileLength()) {
    console.log("valmobl");
    valid = false;
  }
  if (!validateMobile()) {
    console.log("mob");
    valid = false;
  }
  if (!validateEmail()) {
    console.log("email");
    valid = false;
  }
  if (!validateAppointmentDate()) {
    console.log("date");
    valid = false;
  }
  if (!validateAppointmentTime()) {
    console.log("time");
    valid = false;
  }
  if (!validateAppointmentVenue()) {
    console.log("venue");
    valid = false;
  }
  if (!validateAmount()) {
    console.log("amnt");
    valid = false;
  }
  if (!validateAmountChange()) {
    console.log("amnt");
    valid = false;
  }
  if (!validateInterest()) {
    console.log("int");
    valid = false;
  }
  if (!validateInterestChange()) {
    console.log("int");
    valid = false;
  }
  if (!validatePeriod()) {
    console.log("int");
    valid = false;
  }
  if (!validatePeriodChange()) {
    console.log("int");
    valid = false;
  }

  return valid;
}

function submit_form(event) {
  event.preventDefault();
  if (validateForm()) {
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
    sessionStorage.setItem(
      "appointment_venue",
      document.getElementById("appointment-venue").value
    );
    sessionStorage.setItem("amount", document.getElementById("amount").value);
    sessionStorage.setItem(
      "interest_rate",
      document.getElementById("interest").value
    );
    sessionStorage.setItem(
      "loan_period",
      document.getElementById("period").value
    );
    sessionStorage.setItem(
      "total_amount",
      document.getElementById("total-amount").value
    );
    sessionStorage.setItem(
      "interest_amount",
      document.getElementById("loan-interest").value
    );
    window.location.href = "preview.html";
  }
}
