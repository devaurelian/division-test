import '/js/division-test.js';

const testsContainer = document.getElementById('tests');
const totalCountElem = document.getElementById('total-count');
const correctCountElem = document.getElementById('correct-count');
const incorrectCountElem = document.getElementById('incorrect-count');

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
            new Audio('/assets/audio/clapps.wav').play();
        } else {
            incorrectCount += 1;
            incorrectCountElem.textContent = `Incorrect: ${incorrectCount}`;
            new Audio('/assets/audio/t-rex-roar.mp3').play();
        }

        addTest();
    });
    testsContainer.appendChild(test);
}

// Add first test
addTest();
