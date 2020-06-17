let menuBtn = document.getElementById('menu');
let menuView = document.getElementById('menu-view');
let dim = document.getElementById('dim');

let userInput = document.getElementById('user-input');
let inputWarning = document.getElementById('input-warning');
let shortenBtn = document.getElementById('shorten-btn');

let copyBtn = document.getElementsByClassName('copy-btn');

let state = true;
//--------------------- MENU TOGGLE -----------------------
menuBtn.addEventListener('click', () => {
    if (state){
        menuView.style.display = 'flex';
        menuView.classList.remove('slide-out')
        menuView.classList.add('slide-in');
        dim.style.display = 'block';      
        state = !state;
    }
    else {
        menuView.classList.add('slide-out');
        menuView.classList.remove('slide-in');    
        state = !state;
        setTimeout(() => {
            menuView.style.display = 'none';
            dim.style.display = 'none';  
        }, 400);
    }

});


//--------------------- INPUT VALIDATION ------------------
userInput.addEventListener('input', () => {
    if(userInput.value.startsWith(" ")) userInput.value = userInput.value.replace(" ", "");
    inputWarning.style.display = 'none';
    userInput.style.border = 'none';
});

shortenBtn.addEventListener('click', () => {
    if(userInput.value == ""){
        inputWarning.style.display = 'block';
        userInput.style.border = '2px solid rgb(201, 89, 89)';
    }
});

//--------------------- COPY BUTTON IS CLICKED --------------
for (i = 0; i < copyBtn.length; i++){
    let btn = copyBtn[i];
    btn.addEventListener('click', () => {
        // console.log(btn);
        btn.innerText = 'Copied';
        btn.classList.add('copied');
        navigator.clipboard.writeText(btn.previousElementSibling.innerText);
        setTimeout(() => {
            btn.innerText = 'Copy';
            btn.classList.remove('copied');
        }, 4000);
    });
}
