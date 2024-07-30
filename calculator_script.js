document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    const display = document.querySelector('.result-div p');
    let currentInput = '';
    let firstOperand = null;
    let secondOperand = null;
    let currentOperation = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent.trim();
            handleButtonClick(value);
        });
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (isNumber(key) || key === '.') {
            handleNumberInput(key);
        } else if (isOperator(key)) {
            handleOperatorInput(key);
        } else if (key === 'Enter' || key === '=') {
            event.preventDefault();
            calculateResult();
        } else if (key === 'Backspace') {
            clearLastEntry();
        } else if (key === 'Escape' || key === 'c') {
            clearDisplay();
        }
    });

    function handleButtonClick(value) {
        if (isNumber(value) || value === '.') {
            handleNumberInput(value);
        } else if (isOperator(value)) {
            handleOperatorInput(value);
        } else if (value === 'C') {
            clearDisplay();
        } else if (value === '=') {
            calculateResult();
        }
    }

    function isNumber(value) {
        return !isNaN(value);
    }

    function isOperator(value) {
        return value === '+' || value === '-' || value === '*' || value === '/';
    }

    function handleNumberInput(value) {
        if (value === '.' && currentInput.includes('.')) return; // Prevent multiple decimals
        if (currentInput.length === 1 && currentInput === '0' && value !== '.') {
            currentInput = value; // Replace leading zero
        } else {
            currentInput += value;
        }
        updateDisplay(currentInput);
    }

    function handleOperatorInput(operator) {
        if (currentInput === '') return; // Do nothing if no input

        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
            currentOperation = operator;
            currentInput = '';
        } else if (currentOperation) {
            secondOperand = parseFloat(currentInput);
            calculateIntermediateResult();
            currentOperation = operator; // Set new operation
        }
    }

    function updateDisplay(value) {
        display.textContent = value;
    }

    function clearDisplay() {
        currentInput = '';
        firstOperand = null;
        secondOperand = null;
        currentOperation = null;
        updateDisplay('0');
    }

    function clearLastEntry() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || '0');
    }

    function calculateIntermediateResult() {
        if (currentOperation === null || currentInput === '') return;

        secondOperand = parseFloat(currentInput);
        let result;
        switch (currentOperation) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                result = secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
                break;
            default:
                return;
        }

        updateDisplay(result);
        firstOperand = result === 'Error' ? null : result;
        currentInput = '';
        currentOperation = null;
    }

    function calculateResult() {
        if (currentOperation === null || currentInput === '') return;

        secondOperand = parseFloat(currentInput);
        let result;
        switch (currentOperation) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                result = secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
                break;
            default:
                return;
        }
        updateDisplay(result);
        firstOperand = result === 'Error' ? null : result;
        currentInput = '';
        currentOperation = null;
    }
});



// create variable message
// message += result
// updateDisplay must display the result and the string which will be the math behind the result
