let menuBtn = document.getElementById('menu');
let menuView = document.getElementById('menu-view');
let dim = document.getElementById('dim');
let message = document.getElementById('message');

let userInput = document.getElementById('user-input');
let inputWarning = document.getElementById('input-warning');
let shortenedLinkContainer = document.getElementById('shortened-link-container');
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

//--------------------- MESSAGE INFO ----------------------
function logMessage(state){
    if(state){
        message.style.display = 'block';
        message.classList.remove('slide-down');
        message.classList.add('slide-up');
    }
    else{
        message.classList.add('slide-down');
        message.classList.remove('slide-up');
    }
}

//--------------------- INPUT VALIDATION ------------------
userInput.addEventListener('input', () => {
    if(userInput.value.startsWith(" ")) userInput.value = userInput.value.replace(" ", "");
    inputWarning.style.visibility = 'hidden';
    userInput.style.border = 'none';
});

shortenBtn.addEventListener('click', () => {
    if(userInput.value == ""){
        inputWarning.style.visibility = 'visible';
        userInput.style.border = '2px solid rgb(201, 89, 89)';
    }
});

//--------------------- PROCESS OUTPUT DATA  ----------------
function createShortenedLink(originalLink, shortenedLink){
    shortenedLinkContainer.innerHTML +=
        `
        <div class="main__cutter-shortened-links">
          <p id="original-link">${originalLink}</p>
          <hr />
          <p id="shortened-link">https://rel.ink/${shortenedLink}</p>
          <button class="main__cutter-shortened-btn copy-btn">Copy</button>
        </div>  
        `
    ;

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
}
