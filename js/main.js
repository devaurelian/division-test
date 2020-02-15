import '/js/division-test.js';

const testsContainer = document.getElementById('tests');
const totalCountElem = document.getElementById('total-count');
const correctCountElem = document.getElementById('correct-count');
const incorrectCountElem = document.getElementById('incorrect-count');

// https://freesound.org/people/zut50/sounds/162395/
const correctAudio = new Audio('/assets/audio/correct.mp3');

// https://freesound.org/people/metekavruk/sounds/348270/
const incorrectAudio = new Audio('/assets/audio/incorrect.ogg');

let totalCount = 0;
let correctCount = 0;
let incorrectCount = 0;


function addTest() {
    const test = document.createElement('division-test');
    test.addEventListener('answered', (e) => {
        console.log(e.detail.correct);

        totalCount += 1;
        totalCountElem.textContent = `Total: ${totalCount}`;

        if (e.detail.correct) {
            correctCount += 1;
            correctCountElem.textContent = `Correct: ${correctCount}`;
            correctAudio.play();
        } else {
            incorrectCount += 1;
            incorrectCountElem.textContent = `Incorrect: ${incorrectCount}`;
            incorrectAudio.play();
        }

        addTest();
    });
    testsContainer.appendChild(test);
}

// Add first test
addTest();
