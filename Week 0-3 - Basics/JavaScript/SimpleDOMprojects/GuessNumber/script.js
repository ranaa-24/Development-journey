// window.location.reload()  // reloads the page
let privateNumber = {    // this obj will assign to privatyeNumber and we can access the actualNumber using privateNumber._actualNumber
    _actualNumber: parseInt(Math.random() * 100 + 1),
    dummy: "private number",
    get actualNumber() {
        return this.dummy;
    }
}

let form = document.querySelector('.form');
let guessField = document.querySelector('#guessField');
let submit = document.querySelector('#submit');
let remainings = document.querySelector('.remains');
let guesses = document.querySelector('.prevGuesses');
let hints = document.querySelector('#guess');
let canPlay = true;     // false ristrict submit when attempts 0
// guessField.setAttribute('readonly', true);
let guessTray = new Array(10).fill(null);
let remainIdx = 10;
remainings.innerHTML = '10';

submit.addEventListener('click', function (e) {
    e.preventDefault();
    if (canPlay) {
        validateGuesses(guessField.value);
    }
    else {
        if (confirm(`No More Attempts! Restart?`)) window.location.reload();
    }
})

function validateGuesses(guess) {
    if (guess == null || guess == "" || isNaN(+guess) || guess < 1 || guess > 100) {
        alert("Please Enter Valid Guesses (1 to 100)");
        guessField.value = "";
        return;
    }
    //update states
    changeStats(guess);

    remainings.innerHTML = (remainIdx < 1) ? '0' : --remainIdx;

    if (stillRemains()) {
        let num = parseInt(guess);
        if (num < privateNumber._actualNumber) {
            guessField.value = "";
            hints.innerHTML = "HINT: Try Larger";
        }
        else if (num > privateNumber._actualNumber) {
            guessField.value = "";
            hints.innerHTML = "HINT: Try Smaller";
        }
        else
            congrats();
    }


}
function stillRemains() {
    if (remainIdx == 1) {
        remainings.style.color = "red";
        remainings.style.fontSize = '20px';
    }
    else if (remainIdx <= 0) {
        canPlay = false;
        return false;
    }

    return true;
}


// now change the prev gueses, it will call while validation
function changeStats(guess) {
    guessTray[remainIdx - 1] = guess + '  ';
    let ele = document.createElement('span');
    ele.innerHTML = guessTray[remainIdx - 1];
    guesses.append(ele);
    let num = parseInt(guess)
}


let hiddenEle = document.querySelector('.congrats');
function congrats() {        // when user guesses currect
    hiddenEle.style.display = 'block';
    form.replaceWith(hiddenEle);
    remainings.style.color = "green";
    remainings.style.fontSize = '25px';
}