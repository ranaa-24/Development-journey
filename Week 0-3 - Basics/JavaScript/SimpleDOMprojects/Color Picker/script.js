let buttons = document.querySelectorAll('.btn');
let isPicked = true;


buttons.forEach((button) => {
    let v1 = getRandVal();
    let v2 = getRandVal();
    let v3 = getRandVal();
    button.style.backgroundColor = `rgb(${v1}, ${v2}, ${v3})`;
    button.addEventListener('click', (e) => {
        document.body.style.backgroundColor = `rgb(${v1}, ${v2}, ${v3})`;
        document.body.style.color = 'black';
    })
})

function reset(){
    document.body.style.backgroundColor = "";
    document.body.style.color = "";
}

function getRandVal(){
    return (Math.random()*100) % 256;
}