const words = 'on a sunny morning in june sarah decided to explore the old abandoned mansion on the outskirts of town she had always been curious about the stories that surrounded it ghostly apparitions mysterious noises and even hidden treasures as she approached the mansion her heart pounded with a mix of fear and excitement the grand wooden doors were slightly ajar creaking as she pushed them open inside the air was cool and musty cobwebs hung from the ceiling and dust covered the antique furniture hello she called out her voice echoing through the empty halls there was no response sarahs footsteps echoed as she moved cautiously through the rooms she noticed a grand staircase leading to the second floor and decided to investigate halfway up she heard a faint whisper sarah she froze gripping the banister whos there she demanded her voice trembling silence gathering her courage she continued to the top at the end of the hallway a door was slightly open she pushed it gently and found an old diary on a desk the first entry read june 9th 1924 today marks the beginning of a new adventure sarah felt a chill run down her spine'.split(' ');

const wordsCount = words.length;

var gameTime = 10;


document.getElementById('sec30').addEventListener("click", () => {
    removeClass(document.querySelector(".info"), "info");
    addClass(document.querySelector("#sec30"), 'info');
    gameTime = 30;
})
document.getElementById('sec10').addEventListener("click", () => {
    removeClass(document.querySelector(".info"), "info");
    addClass(document.querySelector("#sec10"), 'info');
    gameTime = 10;
})
document.getElementById('sec60').addEventListener("click", () => {
    removeClass(document.querySelector(".info"), "info");
    addClass(document.querySelector("#sec60"), 'info');
    gameTime = 60;

})
window.timer = null;
window.gameStart = null;

function addClass(element, nameClass) {
    if (element !== null) {
        element.className += ' ' + nameClass;
    }
}
function removeClass(element, nameClass) {
    if (element !== null) {
        element.className = element.className.replace(nameClass, '')
    }
}
//return random words
function randomWord() {

    const randomIndex = Math.floor(Math.random() * wordsCount);
    return words[randomIndex];
}
//make word as div

function formatWord(randomWord) {
    return `<div class="word"><span class="letter">${randomWord.split('').join('</span><span class="letter">')}</div>`; //split of 'a'
}

//display words
function newGame() {
    document.getElementById("words").innerHTML = ' ';
    for (var i = 0; i < 200; i++) {
        document.getElementById("words").innerHTML += formatWord(randomWord());
    }
    // document.querySelector(".word").classList.add("current");
    addClass(document.getElementsByClassName("word")[0], 'current');
    addClass(document.getElementsByClassName("letter")[0], 'current');
    window.timer = null;

}
function getWPM() {
    const words = [...document.querySelectorAll('.word')];
    const lastTypeWord = document.querySelector('.word.current');
    const typedWordsIndex = words.indexOf(lastTypeWord);
    const typedWords = words.slice(0, typedWordsIndex);
    const correctWords = typedWords.filter(word => {
        const letters = [...word.children]; // yok all letter

        const incorrectLetters = letters.filter(letter => letter.className.includes('incorrect'))
        const correctLetters = letters.filter(letter => letter.className.includes('correct'))
        return incorrectLetters.length === 0 && correctLetters.length === letters.length;
    });
    console.log(correctWords.length);
    return correctWords.length / (gameTime / 60);
}
function gameOver() {
    addClass(document.getElementById("game"), 'over');
    document.getElementsByClassName("info")[0].innerHTML = `WPM: ${getWPM()}`;
}


document.getElementById("game").addEventListener('keyup', (e) => {
    const key = e.key;
    const currentWord = document.querySelector(".word.current");
    const currentLetter = document.querySelector(".letter.current"); //current letter
    const expectedkey = currentLetter?.innerHTML || ' '; //So, the main difference is that the optional chaining operator (?.) prevents an error if currentLetter is null or undefined, while the direct property access (currentLetter.innerHTML) will throw an error in that case.  if one false it's goes to the other
    console.log({ key, expectedkey });
    const isLetter = key.length === 1 && key != ' ';

    //check space typed
    const isSpace = key === ' ';
    const isBackspace = key === 'Backspace';
    const isFirstLetter = currentLetter === currentWord.firstChild;
    if (!window.timer && isLetter) { //not null //only in true
        var countGame = gameTime;
        window.timer = setInterval(() => {

            console.log(countGame);
            document.getElementsByClassName("info")[0].innerHTML = countGame - 1;
            if (countGame > 0) {
                countGame--;
            }
            if (countGame == 0) {
                gameOver();
                return;
            }
        }, 1000)
    }
    if (isLetter) { //check this first
        if (currentLetter) {
            addClass(currentLetter, key === expectedkey ? 'correct' : 'incorrect')
            removeClass(currentLetter, 'current'); //class jas currentletter
            if (currentLetter.nextSibling) { //check if the next sibling is still there if not no more add class
                addClass(currentLetter.nextSibling, 'current'); //add class from class jas to next
            }
        } else {
            const incorrectLetterwhenspace = document.createElement('span');
            incorrectLetterwhenspace.innerHTML = key;
            incorrectLetterwhenspace.className = "letter incorrect extra" //adding class with javascript
            currentWord.appendChild(incorrectLetterwhenspace);
        }
    }
    if (isSpace) { //check if there a space? we type " "
        if (expectedkey !== ' ') { //check if the expectedkey is ' ' or not (mean space in mid)
            const letterToinvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')]; //Have the letter class, Do not have the correct class, And are inside an element with both the word and current classes. //rest of the word in div // only the rest & inncorrect 1
            //querySelectorAll: Returns a NodeList containing all matching elements.
            //can convert to array using spread operator [... ]
            letterToinvalidate.forEach(letter => {   //currentValue of array on first , second is index of array , third is array it's self (currentValue, index , arr )
                addClass(letter, 'incorrect');
            });
        }
        removeClass(currentWord, "current");
        addClass(currentWord.nextSibling, "current");
        if (currentLetter) {
            removeClass(currentLetter, 'current');
        }
        addClass(currentWord.nextSibling.firstChild, "current");

    }
    if (isBackspace) {//check if there a backspace? we type " "
        const extraIncorrectLetters = currentWord.querySelectorAll('.letter.incorrect.extra');
        if (extraIncorrectLetters.length > 0) {
            const lastExtraLetter = extraIncorrectLetters[extraIncorrectLetters.length - 1];
            currentWord.removeChild(lastExtraLetter);
        }
        else {
            if (currentLetter && isFirstLetter) {  //for space purspose
                if (currentWord.previousElementSibling) { // first letter
                    const isOneWrong = ([...currentWord.previousSibling.querySelectorAll('.letter.incorrect.extra')].length );
                    removeClass(currentWord, 'current');
                    addClass(currentWord.previousSibling, 'current');
                    
                    removeClass(currentLetter, 'current');
                    addClass(currentWord.previousSibling.lastChild, 'current');
                        removeClass(currentWord.previousSibling.lastChild, 'incorrect');
                        removeClass(currentWord.previousSibling.lastChild, 'correct');
                        
                        if (isOneWrong > 0){
                                (currentWord.previousSibling.lastChild).remove();
                        }
                        
                }
            }
            if (currentLetter && !isFirstLetter) {
                removeClass(currentLetter, 'current');
                addClass(currentLetter.previousSibling, 'current');
                removeClass(currentLetter.previousSibling, 'incorrect');
                removeClass(currentLetter.previousSibling, 'correct');
            }
            if (!currentLetter) {   //space in the middle of words delete space
                addClass(currentWord.lastChild, 'current');
                removeClass(currentWord.lastChild, 'incorrect');
                removeClass(currentWord.lastChild, 'correct');
            }
        }

    }

    if (currentWord.getBoundingClientRect().top > 250) {
        const wordsline = document.getElementById('words');
        const margin = parseInt(wordsline.style.marginTop || "0px"); //making it add more vea turn px
        console.log(margin);
        wordsline.style.marginTop = (margin - 45) + 'px'; //vea recurisive 
    }
    // console.log(currentWord.getBoundingClientRect().top)
    // from the top


    //move cursor
    const nextLetterorword = document.querySelector('.letter.current'); //let's try
    const nextWord = document.querySelector('.word.current');
    const cursor = document.getElementById("cursor");
    //.....left
    cursor.style.top = (nextLetterorword || nextWord).getBoundingClientRect().top + 3 + 'px';
    cursor.style.left = (nextLetterorword || nextWord).getBoundingClientRect()[nextLetterorword ? 'left' : 'right'] + 'px';
    //.....Bottom
    // cursor.style.top = (nextLetterorword || nextWord).getBoundingClientRect().bottom + 1 + 'px';
    // cursor.style.left = (nextLetterorword || nextWord).getBoundingClientRect()[nextLetterorword ? 'left' : 'right'] + 'px';

})

document.getElementById("newGameBtn").addEventListener('click', () => {
    location.reload(true);
})
document.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        location.reload(true);
    }
});
newGame(); 