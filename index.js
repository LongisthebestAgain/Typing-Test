const words = 'Innovation drives Innovation drives progress fueling advancements in technology education and society Creativity and dedication empower individuals and organizations to overcome challenges and achieve remarkable feats Embracing change and adaptability is crucial in a constantly evolving world Continuous learning and growth foster resilience and innovation enabling success in diverse fields Collaborative efforts and diverse perspectives enrich problem-solving and decision-making processes Investing in education and equal opportunities ensures a brighter future for all Harnessing the power of data and technology can address pressing global issues and improve quality of life Empowering individuals with knowledge and resources creates a more inclusive prosperous world progress fueling advancements in technology education and society Creativity and dedication empower individuals and organizations to overcome challenges and achieve remarkable feats Embracing change and adaptability is crucial in a constantly evolving world Continuous learning and growth foster resilience and innovation enabling success in diverse fields Collaborative efforts and diverse perspectives enrich problem-solving and decision-making processes Investing in education and equal opportunities ensures a brighter future for all Harnessing the power of data and technology can address pressing global issues and improve quality of life Empowering individuals with knowledge and resources creates a more inclusive prosperous world'.split(' ');
// console.log(words);
const wordsCount = words.length;

const gameTime = 30 ; //30 sec
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
        window.timer = setInterval(() => {
            if (!window.gameStart) { //
                window.gameStart = (new Date()).getSeconds(); //25 //get current time using data object //static
            }
            const currentTime = (new Date()).getSeconds(); //26
            const sLeft = gameTime - (currentTime - window.gameStart); // 30 - (26 -25) // 30 -15 = 29
            document.getElementById("info").innerHTML = sLeft - 1;
        }, 1000);
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
                    removeClass(currentWord, 'current');
                    addClass(currentWord.previousSibling, 'current');
                    removeClass(currentLetter, 'current');

                    addClass(currentWord.previousSibling.lastChild, 'current');
                    removeClass(currentWord.previousSibling.lastChild, 'incorrect');
                    removeClass(currentWord.previousSibling.lastChild, 'correct');
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
    // cursor.style.top = (nextLetterorword || nextWord).getBoundingClientRect().top + 3 + 'px';
    // cursor.style.left = (nextLetterorword || nextWord).getBoundingClientRect()[nextLetterorword ? 'left' : 'right'] + 'px';
    //.....Bottom
    cursor.style.top = (nextLetterorword || nextWord).getBoundingClientRect().bottom + 1 + 'px';
    cursor.style.left = (nextLetterorword || nextWord).getBoundingClientRect()[nextLetterorword ? 'left' : 'right'] + 'px';

})


document.getElementById("game").addEventListener('keydown', (e) => {
    const isEnter = e.key === 'Enter';
    if (isEnter) {
        newGame();
    }
})
document.getElementById("btn").addEventListener('click', () => {
    newGame();
})
newGame();