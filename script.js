let currentInput = '0';
let previousInput = '';
let operation = null;

// Display the current input
function updateDisplay() {
  document.getElementById('display').textContent = currentInput;
}

// Append a number to the current input
function appendNumber(number) {
  if (currentInput === '0') {
    currentInput = number;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

// Add a decimal point
function appendDecimal() {
  if (!currentInput.includes('.')) {
    currentInput += '.';
    updateDisplay();
  }
}

// Set the operation (+, -, *, /)
function setOperation(op) {
  if (previousInput !== '') {
    calculate();
  }
  operation = op;
  previousInput = currentInput;
  currentInput = '0';
}

// Clear the display
function clearDisplay() {
  currentInput = '0';
  previousInput = '';
  operation = null;
  updateDisplay();
}

// Calculate the result based on the operation
function calculate() {
  if (operation === null || previousInput === '') {
    return;
  }
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) {
        alert("Division by zero is not allowed.");
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }
  currentInput = result.toString();
  operation = null;
  previousInput = '';
  updateDisplay();
}

// Key Listener for keyboard input
document.addEventListener('keydown', function (event) {
  const key = event.key;

  if (key >= '0' && key <= '9') {
    appendNumber(key); // Handle number input
  } else if (key === '.') {
    appendDecimal(); // Handle decimal point
  } else if (key === '+') {
    setOperation('+');
  } else if (key === '-') {
    setOperation('-');
  } else if (key === '*') {
    setOperation('*');
  } else if (key === '/') {
    setOperation('/');
  } else if (key === 'Enter' || key === '=') {
    calculate(); // Handle equal key
  } else if (key === 'Backspace') {
    clearDisplay(); // Handle backspace key for clearing
  }
});