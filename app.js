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


//----------------- API REQUEST (OLD API) ------------------
//var link = "https://github.com/NARUDESIGNS"
async function postUrl(link){
    try{
        const requestObj = {
            "url": link
        };
        await fetch("https://url-shortener-service.p.rapidapi.com/shorten",
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8',
                "x-rapidapi-host": "url-shortener-service.p.rapidapi.com",
		        "x-rapidapi-key": "04a1f72586mshc6316760c3ac7c2p168b5cjsn6034ad522b33",
            },
            body: JSON.stringify(requestObj)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            processData(data);
        })
    }
    catch(error){
        console.log("Guy no Joy!", error.message);
        message.innerText = "Failed to shorten Link, Please check your internet";
        logMessage(true);
        setTimeout(() => {
            logMessage(false);
        }, 2000);
        shortenBtn.innerHTML = "Shorten it!";
    }
}


function processData(data){
    if (data.result_url){
        createShortenedLink(userInput.value, data.result_url);
        userInput.value = "";
    }
    else {
        console.log(data.error);
        message.innerText = "Link not valid, please insert a valid link";
        logMessage(true);
        setTimeout(() => {
            logMessage(false);
        }, 2000);
    }
    shortenBtn.innerHTML = "Shorten it!";
}

//--------------------- INPUT VALIDATION ------------------
userInput.addEventListener('input', () => {
    if(userInput.value.includes(" ")) userInput.value = userInput.value.replace(/\s/g, "");
    inputWarning.style.visibility = 'hidden';
    userInput.style.border = 'none';
});

//-------------------- Shorten Button is clicked --------------------
shortenBtn.addEventListener('click', () => {
    if(userInput.value == ""){
        inputWarning.style.visibility = 'visible';
        userInput.style.border = '2px solid rgb(201, 89, 89)';
    }
    shortenBtn.innerHTML = `<div class="dots"><span></span><span></span><span></span><span></span></div>`;
    postUrl(userInput.value); //call the API function when shorten button is clicked
});

//when user hit the enter key
document.addEventListener('keydown', (e) => {
    if(e.key == "Enter") shortenBtn.click();
});


//--------------------- PROCESS AND CREATE OUTPUT DATA  ----------------
function createShortenedLink(originalLink, shortenedLink){
    let linkInfo = document.createElement("div");
    linkInfo.setAttribute("class", "main__cutter-shortened-links");
    linkInfo.innerHTML =
        `
          <p id="original-link">${originalLink}</p>
          <hr />
          <p><a href="${originalLink}" id="shortened-link">${shortenedLink}</a></p>
          <button class="main__cutter-shortened-btn copy-btn">Copy</button>
        `
    ;
    shortenedLinkContainer.insertBefore(linkInfo, shortenedLinkContainer.children[0]);

    //--------------------- COPY BUTTON IS CLICKED --------------
    for (i = 0; i < copyBtn.length; i++){
        let btn = copyBtn[i];
        btn.addEventListener('click', () => {
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