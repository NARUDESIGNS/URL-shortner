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


//----------------- API REQUEST ------------------
async function postUrl(link){
    try{
        const requestObj = {
            "url": `${link}`
        };
        await fetch(`https://rel.ink/api/links/`,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(requestObj)
        })
        .then(response => response.json())
        .then(data => {
            processData(data);
        });
    }
    catch(error){
        console.log(error.message)
        message.innerText = "Failed to shorten link!\nCheck your internet connection and try again.";
        logMessage(true);
        setTimeout(() => {
            logMessage(false);
        }, 3000);
    }
}

function processData(data){
    if (data.hashid){
        console.log(data.hashid);
        createShortenedLink(data.url, data.hashid);
        userInput.value = "https://";
    }
    else {
        console.log(data.url[0]);
        message.innerText = data.url[0];
        logMessage(true);
        setTimeout(() => {
            logMessage(false);
        }, 3000);
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
    postUrl(userInput.value); //call the API function when shorten button is clicked
});


//--------------------- PROCESS OUTPUT DATA  ----------------
function createShortenedLink(originalLink, shortenedLink){
    let linkInfo = document.createElement("div");
    linkInfo.setAttribute("class", "main__cutter-shortened-links");
    linkInfo.innerHTML =
        `
          <p id="original-link">${originalLink}</p>
          <hr />
          <p id="shortened-link">https://rel.ink/${shortenedLink}</p>
          <button class="main__cutter-shortened-btn copy-btn">Copy</button>
        `
    ;
    shortenedLinkContainer.insertBefore(linkInfo, shortenedLinkContainer.children[0]);

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