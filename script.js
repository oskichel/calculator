let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '×', '÷'];

const out = document.querySelector('.output');

function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
};

document.querySelector('.ac').onclick = clearAll;

function del() {
    if (a !== '' && b === '' && sign === '') {
        a = a.slice(0, -1);
        console.log(a, b, sign);
        out.textContent = a;
    } else if (a !== '' && b !== '' && sign !== '') {
        b = b.slice(0, -1);
        console.log(a, b, sign);
        out.textContent = b;
    }
};

document.querySelector('.del').onclick = del;

function percent() {
    if (a !== '' && b === '' && sign === '') {
        a = a / 100;
        console.log(a, b, sign);
        out.textContent = a;
    } else if (a !== '' && b !== '' && sign !== '') {
        /*b = b / 100;*/
        switch (sign) {
            case "+":
                b = (+a) + b * (a / 100);
                break;
            case "-":
                b = a - b * (a / 100);
                break;
            case "×":
                b = (a / 100) * b;
                break;
            case "÷":
                if (b === '0') {
                    out.textContent = 'Ошибка';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                b = a * ((a / 100) * b);
                break;
        }
        console.log(a, b, sign);
        out.textContent = b;
    }
};

document.querySelector('.percent').onclick = percent;

document.querySelector('.container').onclick = (event) => {
    if (!event.target.classList.contains('button')) return;
    if  (event.target.classList.contains('ac')) return;
    if  (event.target.classList.contains('del')) return;
    if  (event.target.classList.contains('percent')) return;

    out.textContent = '';
    const key = event.target.textContent;

    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            if (key === '.' && a.includes('.')) {
                a += '';
                console.log(a, b, sign);
                out.textContent = a;
            } else {
                a += key;
                console.log(a, b, sign);
                out.textContent = a;
            }
        } else if (a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        } else {
            if (key === '.' && b.includes('.')) {
                b += '';
                console.log(a, b, sign);
                out.textContent = b;
            } else {
                b += key;
                console.log(a, b, sign);
                out.textContent = b;
            }
        }

        if (a.length > 6 || b.length > 6) {
            out.style.fontSize = '2rem';
        } else {
            out.style.fontSize = '7rem';
        }

        console.log(a, b, sign);
        return;
    }

    

    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        console.log(a, b, sign);
        return;
    }

    if (key === '=') {
        if (b === '') b = a;
        switch (sign) {
            case "+":
                a = (+a) + (+b);
                break;
            case "-":
                a = a - b;
                break;
            case "×":
                a = a * b;
                break;
            case "÷":
                if (b === '0') {
                    out.textContent = 'Ошибка';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = a / b;
                break;
        }
        
        finish = true;
        a = a.toString();
        if (a.endsWith('.')) {
            return out.textContent = Number(a).slice(-1);
        } else out.textContent = Number(a).toFixed(8).replace(/0*$/,"");

        console.log(a, b, sign);
    }
};

