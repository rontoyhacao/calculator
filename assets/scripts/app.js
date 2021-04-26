const input = document.querySelector('input');

document.querySelectorAll('.num__key').forEach(
    el => {
        el.onclick = () => input.value = input.value !== '0' ? input.value + el.innerText : el.innerText;
    }
)