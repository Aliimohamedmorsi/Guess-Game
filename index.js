let gameTitle = "Guess The Word";
document.querySelector("h1").innerHTML = gameTitle;
document.querySelector("footer").appendChild(document.createElement("h4")).innerHTML = "Guess The Game Word Created By Ali Morsi";
document.querySelector("footer").appendChild(document.createElement("p")).innerHTML = '<p class="text-white fs-6 mb-0">© 2024 Guess Game</p>';

let NumberOfTries = 6;
let NumberOfLetters = 8;
let CurrentTry = 1;
let numberOfHints = 2;

let messageArea = document.querySelector(".message");

document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint)

let wordToGuess = "";
const words = ["anything","building","computer","language","children","possible","learning","question",
"practice","interest","together","business","distance","solution","provides","describe","everyone","medicine",
"consider"
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
console.log(Math.random());
console.log(wordToGuess);
function GenerateInput () {
    const InputsContainer = document.querySelector(".inputs");

for (let i = 1 ; i <= NumberOfTries ; i++ ){
    const TryDiv = document.createElement("div");
    TryDiv.classList.add(`try-${i}`);
    TryDiv.innerHTML = `<span>Try ${i}</span>`;

    if(i !== 1) TryDiv.classList.add("disabled-inputs");

    for(let j = 1 ; j <= NumberOfLetters ; j++ ){
        const input = document.createElement("input");
        input.type = "text";
        input.id = `guess-${i}-letter-${j}`;
        input.setAttribute("maxlength","1");
        TryDiv.appendChild(input);
    }
    TryDiv.classList.add("col-12");
    InputsContainer.appendChild(TryDiv);
}
InputsContainer.children[0].children[1].focus();

const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input");
inputsInDisabledDiv.forEach((input) => input.disabled = true);

const inputs = document.querySelectorAll("input");
inputs.forEach((input,index) => {
    input.addEventListener("input",function(){
        this.value = this.value.toUpperCase();

        const NextInput = inputs[index + 1];
        if(NextInput) NextInput.focus();
    });
    input.addEventListener("keydown" ,function(event){
        const currentIndex = Array.from(inputs).indexOf(event.target);

        if(event.key === "ArrowRight"){
            const NextInput = currentIndex + 1;
            if(NextInput < inputs.length) inputs[NextInput].focus();
        }
        if(event.key === "ArrowLeft"){
            const prevInput = currentIndex - 1;
            if(prevInput >= 0) inputs[prevInput].focus();
            event.preventDefault();
            prevInput.setSelectionRange(0,5);
        }
    })
});
}

const guessButton = document.querySelector(".check")
guessButton.addEventListener("click",handleGuesses);

function handleGuesses (){
    let successGuesses = true;
    for(let i = 1 ; i <= NumberOfLetters ; i++ ){
        const inputField = document.querySelector(`#guess-${CurrentTry}-letter-${i}`);
        const letter = inputField.value.toLowerCase();
        const actualLetter = wordToGuess[i - 1];
        if(letter === actualLetter){
            inputField.classList.add("yesplace");
        }else if(wordToGuess.includes(letter) && letter !==""){
            inputField.classList.add("notplace");
            successGuesses = false;
        }else{
            inputField.classList.add("wrongplace");
            successGuesses = false;
        }
    }
    if(successGuesses){
        messageArea.innerHTML = `You Win The Word Is<span>${wordToGuess}!</span>`;

        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((TryDiv) => TryDiv.classList.add("disabled-inputs"));
        guessButton.disabled = true;
        getHintButton.disabled = true ;

    }else{
        document.querySelector(`.try-${CurrentTry}`).classList.add("disabled-inputs");
        const currentTryInputs = document.querySelectorAll(`.try-${CurrentTry} input`);
        currentTryInputs.forEach((input) => (input.disabled = true));
        
        CurrentTry++;
        
        const nextTryInputs = document.querySelectorAll(`.try-${CurrentTry} input`);
        nextTryInputs.forEach((input) => (input.disabled = false));
        let el = document.querySelector(`.try-${CurrentTry}`);
        
        if(el){
            document.querySelector(`.try-${CurrentTry}`).classList.remove("disabled-inputs");
            el.children[1].focus();
        }else{
        guessButton.disabled = true ;
        getHintButton.disabled = true ;
        messageArea.innerHTML = `You Loose The Word Is<span>${wordToGuess}!</span>`
        }
    }
}
function getHint () {
if(numberOfHints > 0){
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
}
if(numberOfHints === 0){
    getHintButton.disabled = true;
}
const enabledInputs = document.querySelectorAll("input:not([disabled])");
const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");
if(emptyEnabledInputs.length > 0){
    const randomIndex = Math.floor(Math.random()* emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    if(indexToFill !== -1){
        randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
}
}
function handleBackspace (event) {
    if(event.key === "Backspace"){
        const inputs = document.querySelectorAll("input:not([disabled])");
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);
        if(currentIndex > 0){
            const currentInput = inputs[currentIndex];
            // const prevInput = inputs[currentIndex -1];
            currentInput.value = "";
            // prevInput.focus();
        }
    }
}

document.addEventListener("keydown", handleBackspace);

window.onload = function() {
    GenerateInput();
};
