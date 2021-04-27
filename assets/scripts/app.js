const input = document.querySelector('input');

// step 1: adding value function on the input
document.querySelectorAll('.num__key').forEach(el => {
    el.onclick = () => input.value = input.value !== '0' ? input.value + el.innerText : el.innerText;
});

// step 2: array where operations would be stored
const buffer = [];

// step 4: conversion of input value to float and adding function to the percent operator
const operatorCallback = operator => () => {
    let currentVal = parseFloat(input.value);

    if (operator === 'percent') {
        currentVal *= 0.01;
        input.value = currentVal;
    } else {
        if (buffer && buffer.length) {
            buffer.push({ value: currentVal });

            const result = evaluate(buffer);

            buffer.push({ value: result });
            buffer.push({ value: operator });

            input.value = '';
        } else {
            buffer.push({ value: currentVal });
            buffer.push({ value: operator });
            input.value = '';
        }
    }
}

// step 5: adding functions to the rest of the operators
const evaluate = buffer => {
    const secondOperand = buffer.pop().value;
    const operator = buffer.pop().value;
    const firstOperand = buffer.pop().value;

    switch (operator) {
        case 'add':
            return firstOperand + secondOperand;
            break;
        case 'subtract':
            return firstOperand - secondOperand;
        case 'multiply':
            return firstOperand * secondOperand;
        case 'divide':
            return firstOperand / secondOperand;
        default:
            return secondOperand;
    }
};

// step 3: calling the operations
for (const operator of ['add', 'subtract', 'multiply', 'divide', 'percent']) {
    document.querySelector(`.op__key[op=${operator}]`).onclick = operatorCallback(operator);
}

// step 6: adding equal function
document.querySelector('#eq__key').onclick = () => {
    if (buffer && buffer.length) {
        buffer.push({ value: parseFloat(input.value)});
        input.value = evaluate(buffer);
    }
}

// step 7: adding clear function
document.querySelector('.op__key[op=clear]').onclick = () => {
    input.value = 0;
    buffer.length = 0;
};

// step 8: adding negate function
document.querySelector('.op__key[op=negate]').onclick = () => input.value = -parseFloat(input.value);