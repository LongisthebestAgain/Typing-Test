const words = 'Innovation drives Innovation drives progress fueling advancements in technology education and society Creativity and dedication empower individuals and organizations to overcome challenges and achieve remarkable feats Embracing change and adaptability is crucial in a constantly evolving world Continuous learning and growth foster resilience and innovation enabling success in diverse fields Collaborative efforts and diverse perspectives enrich problem-solving and decision-making processes Investing in education and equal opportunities ensures a brighter future for all Harnessing the power of data and technology can address pressing global issues and improve quality of life Empowering individuals with knowledge and resources creates a more inclusive prosperous world progress fueling advancements in technology education and society Creativity and dedication empower individuals and organizations to overcome challenges and achieve remarkable feats Embracing change and adaptability is crucial in a constantly evolving world Continuous learning and growth foster resilience and innovation enabling success in diverse fields Collaborative efforts and diverse perspectives enrich problem-solving and decision-making processes Investing in education and equal opportunities ensures a brighter future for all Harnessing the power of data and technology can address pressing global issues and improve quality of life Empowering individuals with knowledge and resources creates a more inclusive prosperous world'.split(' ');
// console.log(words);
const wordsCount = words.length;
//return random words
function randomWord(){

    const randomIndex = Math.ceil(Math.random() * wordsCount);
    return words[randomIndex];
}
//make word as div

function formatWord(randomWord){
    // return `<div class="word">  <span class="letter">  ${randomWord.split('').join('</span><span class="letter">')}</div>`;
    return ` <div class="word"><span class="letter">${randomWord.split('').join('</span ><span class="letter">')} </div>` //split of 'a'
}

//display words
function newGame(){
    document.getElementById("words").innerHTML = ' ';
    for(var i = 0 ; i < 200 ; i++){
        document.getElementById("words").innerHTML += formatWord(randomWord());
    }
}
newGame();