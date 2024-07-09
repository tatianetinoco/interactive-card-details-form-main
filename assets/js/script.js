const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const numberInput = document.getElementById("number");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const cvcInput = document.getElementById("cvc");
const btnForm = document.getElementById("btnSubmit");
const successMessage = document.querySelector(".successMessageForm");

const numberCard = document.getElementsByClassName("card__front__number")
const nameCard = document.getElementById("cardName")
const monthCard = document.getElementById("monthCard")
const yearCard = document.getElementById("yearCard")
const numberBackCard = document.getElementsByClassName("card__back__number")

const errorMsg = document.querySelectorAll("small");


form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (validInput()) {
        numberCard[0].innerText = formatCardNumber(numberInput.value);
        nameCard.innerText = nameInput.value;
        monthCard.innerText = monthInput.value;
        yearCard.innerText = yearInput.value;
        numberBackCard[0].innerText = cvcInput.value;

        form.classList.add("visibility");
        successMessage.classList.remove("visibility");

    }
});

const btnConfirm = document.getElementById("btnConfirm");
btnConfirm.addEventListener("click", () => {

    successMessage.classList.add("visibility");
    form.classList.remove("visibility");

    nameInput.value = "";
    numberInput.value = "";
    monthInput.value = "";
    yearInput.value = "";
    cvcInput.value = "";

    numberCard[0].innerText = "0000 0000 0000 0000";
    nameCard.innerText = "Jane Appleseed";
    monthCard.innerText = "00";
    yearCard.innerText = "00";
    numberBackCard[0].innerText = "000";

    removeInputError(nameInput);
    removeInputError(numberInput);
    removeInputError(monthInput);
    removeInputError(yearInput);
    removeInputError(cvcInput);
});

function validInput() {
    const nameValue = nameInput.value.trim();
    const cardNumberValue = numberInput.value.trim();
    const monthValue = monthInput.value.trim();
    const yearValue = yearInput.value.trim();
    const cvcValue = cvcInput.value.trim();

    let valid = true;

    const nameRegex = /^[A-Za-z\s]+$/;
    if (nameValue === "") {
        showInputError(nameInput, "Can't be blank");
        valid = false;
    } else if (!nameRegex.test(nameValue)) {
        showInputError(nameInput, "Must be a valid name with letters only");
        valid = false;
    } else {
        removeInputError(nameInput);
    }

    if (cardNumberValue === "") {
        showInputError(numberInput, "Can't be blank");
        valid = false;
    } else if (cardNumberValue.length !== 16 || cardNumberValue < 1 || isNaN(cardNumberValue)) {
        showInputError(numberInput, "Must be a valid Number");
        valid = false;
    } else {
        removeInputError(numberInput);
    }

    if (monthValue === "") {
        showInputError(monthInput, "Can't be blank");
        valid = false;
    } else if (isNaN(monthValue) || monthValue < 1 || monthValue > 12 || monthValue.length > 2) {
        showInputError(monthInput, "Must be a valid Month (01 - 12)");
        valid = false;
    } else {
        removeInputError(monthInput);
    }

    if (yearValue === "") {
        showInputError(yearInput, "Can't be blank");
        valid = false;
    } else if (isNaN(yearValue) || yearValue.length !== 2 || yearValue < 0) {
        showInputError(yearInput, "Must be a valid Year");
        valid = false;
    } else {
        removeInputError(yearInput);
    }

    if (cvcValue === "") {
        showInputError(cvcInput, "Can't be blank");
        valid = false;
    } else if (isNaN(cvcValue) || cvcValue.length !== 3 || cvcValue < 0) {
        showInputError(cvcInput, "Must be a valid CVC");
        valid = false;
    } else {
        removeInputError(cvcInput);
    }
        return valid;
}

function showInputError(input, message) {
    const small = input.nextElementSibling;
    small.innerText = message;
    small.classList.add("errorMessage");
    input.classList.add("errorInput");
}

function removeInputError(input) {
    const small = input.nextElementSibling;
    small.innerText = "";
    small.classList.remove("errorMessage");
    input.classList.remove("errorInput");
}

function formatCardNumber(number) {
    return number.replace(/\d{4}(?=.)/g, '$& ');
}

