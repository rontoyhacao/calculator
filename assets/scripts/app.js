const input = document.querySelector('input');

document.querySelectorAll('.num__key').forEach(el => {
    el.onclick = () => input.value = input.value !== '0' ? input.value + el.innerText : el.innerText;
});

const buffer = [];

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

for (const operator of ['add', 'subtract', 'multiply', 'divide', 'percent']) {
    document.querySelector(`.op__key[op=${operator}]`).onclick = operatorCallback(operator);
}

document.querySelector('#eq__key').onclick = () => {
    if (buffer && buffer.length) {
        buffer.push({ value: parseFloat(input.value)});
        input.value = evaluate(buffer);
    }
}

document.querySelector('.op__key[op=clear]').onclick = () => {
    input.value = 0;
    buffer.length = 0;
};

document.querySelector('.op__key[op=negate]').onclick = () => input.value = -parseFloat(input.value);