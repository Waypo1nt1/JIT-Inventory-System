window.onload = function(){ 
    let a = '';                  
    let b = '';                  
    let expressionResult = '';   
    let selectedOperation = null;

    const outputElement = document.getElementById("result");
    
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit;
            }
            outputElement.innerHTML = a;
        } 
        else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit;
                outputElement.innerHTML = b;        
            }
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return;
        selectedOperation = 'x';
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return;
        selectedOperation = '+';
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return;
        selectedOperation = '-';
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return;
        selectedOperation = '/';
    }

    document.getElementById("btn_op_clear").onclick = function() { 
        a = '';
        b = '';
        selectedOperation = '';
        expressionResult = '';
        outputElement.innerHTML = 0;
    }

    document.getElementById("btn_op_sign").onclick = function() { 
        if (!selectedOperation) {
            if (a === '') return;
            a = ((+a) * -1).toString();
            outputElement.innerHTML = a;
        } 
        else {
            if (b === '') return;
            b = ((+b) * -1).toString();
            outputElement.innerHTML = b;
        }
    }

    document.getElementById("btn_op_percent").onclick = function() { 
        if (!selectedOperation) {
            if (a === '') return;
            a = ((+a) / 100).toString();
            outputElement.innerHTML = a;
        } else {
            if (b === '') return;
            b = ((+b) / 100).toString();
            outputElement.innerHTML = b;
        }
    }

    document.getElementById("btn_op_backspace").onclick = function() { 
        if (!selectedOperation) {
            a = a.slice(0, -1);
            outputElement.innerHTML = a || '0';
        } else {
            b = b.slice(0, -1);
            outputElement.innerHTML = b || '0';
        }
    }

    document.getElementById("btn_op_sqrt").onclick = function() { 
        if (!selectedOperation) {
            if (a === '') return;
            a = Math.sqrt((+a)).toString();
            outputElement.innerHTML = a;
        } else {
            if (b === '') return;
            b = Math.sqrt((+b)).toString();
            outputElement.innerHTML = b;
        }
    }

    document.getElementById("btn_op_sqr").onclick = function() { 
        if (!selectedOperation) {
            if (a === '') return;
            a = ((+a) * (+a)).toString();
            outputElement.innerHTML = a;
        } else {
            if (b === '') return;
            b = ((+b) * (+b)).toString();
            outputElement.innerHTML = b;
        }
    }

    document.getElementById("btn_op_fact").onclick = function() { 
        function getFactorial(n) {
            if (n < 0) return "Ошибка";
            if (n === 0 || n === 1) return 1;
            
            let result = 1;
            for (let i = 2; i <= n; i++) {
                result *= i;
            }
            return result;
        }

        if (!selectedOperation) {
            if (a === '') return;
            let num = Math.floor((+a)); 
            a = getFactorial(num).toString();
            outputElement.innerHTML = a;
        } else {
            if (b === '') return;
            let num = Math.floor((+b));
            b = getFactorial(num).toString();
            outputElement.innerHTML = b;
        }
    }

    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation) return;

        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b);
                break;
            case '+':
                expressionResult = (+a) + (+b);
                break;
            case '-':
                expressionResult = (+a) - (+b);
                break;
            case '/':
                expressionResult = (+a) / (+b);
                break;
            default:
                break;
        }

        a = expressionResult.toString();
        b = '';
        selectedOperation = null;

        outputElement.innerHTML = a;
    }

    document.getElementById('theme-btn').onclick = function() {
        document.body.classList.toggle('dark-theme');
    };
};