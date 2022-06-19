const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");

const form = document.querySelector("#signup");

const checkfname = () => {
  let valid = false;

  const min = 3,
    max = 25;

  const fname = firstName.value.trim();

  if (!isRequired(fname)) {
    showError(firstName, "First Name cannot be empty");
  } else if (!isBetween(fname.length, min, max)) {
    showError(
      firstName,
      `First Name must be between ${min} and ${max} characters`
    );
  } else {
    showSuccess(firstName);
    valid = true;
  }
  return valid;
};

const checklname = () => {
  let valid = false;

  const min = 3,
    max = 25;

  const lname = lastName.value.trim();

  if (!isRequired(lname)) {
    showError(lastName, "Last Name cannot be empty");
  } else if (!isBetween(lname.length, min, max)) {
    showError(
      lastName,
      `Last Name must be between ${min} and ${max} characters`
    );
  } else {
    showSuccess(lastName);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be empty");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Looks like this is not an email");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const error = formField.nextSibling("p");
  error.innerHTML = message;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.nextSibling("p");
  error.innerHTML = "";
};

form.addEventListener("submit", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate fields
  let isFirstNameValid = checkfname(),
    isLastNameValid = checklname(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword();

  let isFormValid = isFirstNameValid && isLastNameValid;
  isEmailValid && isPasswordValid;

  // submit to the server if the form is valid
  if (isFormValid) {
    this.unbind("submit").submit();
  }
});

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "firstName":
        checkfname();
        break;
      case "lastName":
        checklname();
        break;
      case "email":
        checkEmail();
        break;
      case "password":
        checkPassword();
        break;
    }
  })
);
