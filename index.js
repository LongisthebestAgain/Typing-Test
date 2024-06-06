const words = 'Innovation drives Innovation drives progress fueling advancements in technology education and society Creativity and dedication empower individuals and organizations to overcome challenges and achieve remarkable feats Embracing change and adaptability is crucial in a constantly evolving world Continuous learning and growth foster resilience and innovation enabling success in diverse fields Collaborative efforts and diverse perspectives enrich problem-solving and decision-making processes Investing in education and equal opportunities ensures a brighter future for all Harnessing the power of data and technology can address pressing global issues and improve quality of life Empowering individuals with knowledge and resources creates a more inclusive prosperous world progress fueling advancements in technology education and society Creativity and dedication empower individuals and organizations to overcome challenges and achieve remarkable feats Embracing change and adaptability is crucial in a constantly evolving world Continuous learning and growth foster resilience and innovation enabling success in diverse fields Collaborative efforts and diverse perspectives enrich problem-solving and decision-making processes Investing in education and equal opportunities ensures a brighter future for all Harnessing the power of data and technology can address pressing global issues and improve quality of life Empowering individuals with knowledge and resources creates a more inclusive prosperous world'.split(' ');
// console.log(words);
const wordsCount = words.length;

function addClass(element, nameClass) {
    element.className += ' ' + nameClass;
}
function removeClass(element, nameClass) {
    element.className = element.className.replace(nameClass, '')
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
}
document.getElementById("game").addEventListener('keyup', (e) => {
    const key = e.key;
    const currentLetter = document.querySelector(".letter.current");
    const expectedkey = currentLetter.innerHTML;
    console.log({ key, expectedkey });
    const isLetter = key.length === 1 && key != ' ';
    if (isLetter) { //check this first
        if (currentLetter) { 
            addClass(currentLetter, key === expectedkey ? 'correct' : 'incorrect')
            removeClass(currentLetter,'current'); //class jas currentletter
            addClass(currentLetter.nextSibling,'current'); //add class from class jas to next
        }
     }
    // if (key.length === 1 && key != ' ') {
    //     if (key === expectedkey) {
    //         addClass(document.querySelector(".letter.current"), 'correct');
    //     }
    //     else {
    //         addClass(document.querySelector(".letter.current"), 'incorrect');
    //     }
    // }
})
newGame();