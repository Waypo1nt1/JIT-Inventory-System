window.onload = function(){ 
    let valA = '';  
    let valB = '';    
    let expressionResult = '';   
    let selectedOperation = null;

    const outputElement = document.getElementById("capacity-display");
    
    const digitButtons = document.querySelectorAll('[id ^= "stock_digit_"]');

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !valA.includes(digit))) { 
                valA += digit;
            }
            outputElement.innerHTML = valA;
        } 
        else {
            if ((digit != '.') || (digit == '.' && !valB.includes(digit))) { 
                valB += digit;
                outputElement.innerHTML = valB;        
            }
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    document.getElementById("stock_op_mult").onclick = function() { 
        if (valA === '') return;
        selectedOperation = 'x';
    }
    document.getElementById("stock_op_plus").onclick = function() { 
        if (valA === '') return;
        selectedOperation = '+';
    }
    document.getElementById("stock_op_minus").onclick = function() { 
        if (valA === '') return;
        selectedOperation = '-';
    }
    document.getElementById("stock_op_div").onclick = function() { 
        if (valA === '') return;
        selectedOperation = '/';
    }

    document.getElementById("stock_op_capacity").onclick = function() { 
        if (valA === '') return;
        selectedOperation = 'capacity';
    }

    document.getElementById("stock_op_clear").onclick = function() { 
        valA = '';
        valB = '';
        selectedOperation = '';
        expressionResult = '';
        outputElement.innerHTML = 0;
    }

    document.getElementById("stock_op_sign").onclick = function() { 
        if (!selectedOperation) {
            if (valA === '') return;
            valA = ((+valA) * -1).toString();
            outputElement.innerHTML = valA;
        } 
        else {
            if (valB === '') return;
            valB = ((+valB) * -1).toString();
            outputElement.innerHTML = valB;
        }
    }

    document.getElementById("stock_op_percent").onclick = function() { 
        if (!selectedOperation) {
            if (valA === '') return;
            valA = ((+valA) / 100).toString();
            outputElement.innerHTML = valA;
        } else {
            if (valB === '') return;
            valB = ((+valB) / 100).toString();
            outputElement.innerHTML = valB;
        }
    }

    document.getElementById("stock_op_backspace").onclick = function() { 
        if (!selectedOperation) {
            valA = valA.slice(0, -1);
            outputElement.innerHTML = valA || '0';
        } else {
            valB = valB.slice(0, -1);
            outputElement.innerHTML = valB || '0';
        }
    }

    document.getElementById("stock_op_sqrt").onclick = function() { 
        if (!selectedOperation) {
            if (valA === '') return;
            valA = Math.sqrt((+valA)).toString();
            outputElement.innerHTML = valA;
        } else {
            if (valB === '') return;
            valB = Math.sqrt((+valB)).toString();
            outputElement.innerHTML = valB;
        }
    }

    document.getElementById("stock_op_sqr").onclick = function() { 
        if (!selectedOperation) {
            if (valA === '') return;
            valA = ((+valA) * (+valA)).toString();
            outputElement.innerHTML = valA;
        } else {
            if (valB === '') return;
            valB = ((+valB) * (+valB)).toString();
            outputElement.innerHTML = valB;
        }
    }

    document.getElementById("stock_op_fact").onclick = function() { 
        if (!selectedOperation) {
            if (valA === '') return;
            let num = Math.floor((+valA)); 
            valA = getFactorial(num).toString();
            outputElement.innerHTML = valA;
        } else {
            if (valB === '') return;
            let num = Math.floor((+valB));
            valB = getFactorial(num).toString();
            outputElement.innerHTML = valB;
        }
    }

    document.getElementById("stock_op_equal").onclick = function() { 
        if (valA === '' || valB === '' || !selectedOperation) return;

        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+valA) * (+valB);
                break;
            case '+':
                expressionResult = (+valA) + (+valB);
                break;
            case '-':
                expressionResult = (+valA) - (+valB);
                break;
            case '/':
                expressionResult = (+valA) / (+valB);
                break;
            case 'capacity':
                if ((+valB) === 0) {
                    expressionResult = "Ошибка";
                } else {
                    expressionResult = Math.floor((+valA) / (+valB));
                }
                break;
            default:
                break;
        }

        valA = expressionResult.toString();
        valB = '';
        selectedOperation = null;

        outputElement.innerHTML = valA;
    }

    document.getElementById('theme-switch-btn').onclick = function() {
        document.body.classList.toggle('dark-theme');
    };

    function getFactorial(n) {
        if (n < 0) return "Ошибка";
        if (n === 0 || n === 1) return 1;
        
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
};