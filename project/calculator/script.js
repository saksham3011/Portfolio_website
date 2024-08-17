document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentOperand = '';
    let previousOperand = '';
    let operation = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            
            if (value === 'C') {
                currentOperand = '';
                previousOperand = '';
                operation = null;
                display.innerText = '0';
            } else if (value === '=') {
                if (operation && currentOperand) {
                    currentOperand = evaluate(previousOperand, currentOperand, operation);
                    display.innerText = currentOperand;
                    previousOperand = '';
                    operation = null;
                }
            } else if (['+', '-', '*', '/', '%', 'sqrt', '^'].includes(value)) {
                if (currentOperand) {
                    if (value === 'sqrt') {
                        currentOperand = Math.sqrt(parseFloat(currentOperand)).toString();
                    } else if (value === '%') {
                        currentOperand = (parseFloat(currentOperand) / 100).toString();
                    } else if (value === '^') {
                        if (previousOperand) {
                            currentOperand = Math.pow(parseFloat(previousOperand), parseFloat(currentOperand)).toString();
                        } else {
                            previousOperand = currentOperand;
                            currentOperand = '';
                            operation = '^';
                            return;
                        }
                    } else {
                        if (previousOperand) {
                            currentOperand = evaluate(previousOperand, currentOperand, operation);
                        }
                        previousOperand = currentOperand;
                        currentOperand = '';
                        operation = value;
                        return;
                    }
                    display.innerText = currentOperand;
                }
            } else {
                currentOperand += value;
                display.innerText = currentOperand;
            }
        });
    });

    function evaluate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case '+': return (a + b).toString();
            case '-': return (a - b).toString();
            case '*': return (a * b).toString();
            case '/': return (a / b).toString();
            case '%': return (a % b).toString();
            case '^': return Math.pow(a, b).toString();
            default: return b;
        }
    }
});
