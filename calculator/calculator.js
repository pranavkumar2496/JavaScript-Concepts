// Select display
const display = document.querySelector("#display");


// Add value to display
function appendValue(value) {

    // If display contains Error, clear it first
    if (display.value === "Error") {
        display.value = "";
    }

    display.value += value;
}


// Clear display
function clearDisplay() {

    display.value = "";

}


// Delete last character
function deleteLast() {

    display.value = display.value.slice(0, -1);

}


// Calculate result
function calculate() {

    try {

        // Don't calculate empty display
        if (display.value === "") {
            return;
        }

        // Calculate expression
        display.value = eval(display.value);

    }

    catch (error) {

        display.value = "Error";

    }

}