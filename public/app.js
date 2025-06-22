let editor;
let currentLevel = 1;
const TOTAL_LEVELS = 15;
let currentBuggyCode = ''; 

document.addEventListener('DOMContentLoaded', () => {
    setupEditor();
    loadLevel(currentLevel);
    updateProgressBar();

    document.getElementById('submitBtn').addEventListener('click', submitSolution);
    document.getElementById('resetBtn').addEventListener('click', resetCode);
    document.getElementById('nextBtn').addEventListener('click', () => {
        currentLevel++;
        loadLevel(currentLevel);
        updateProgressBar();
    });
});

function setupEditor() {
    editor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
        mode: 'javascript',
        theme: 'default',
        lineNumbers: true
    });
}

function updateProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  const completedLevels = currentLevel - 1;
  const progressPercentage = (completedLevels / TOTAL_LEVELS) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}


function loadLevel(levelId) {
    const riddleText = document.getElementById('riddleText');
    const levelElement = document.getElementById('level');
    const outputElement = document.getElementById('output');
    const resultBox = document.getElementById('resultBox');

    // Show the buttons in case they were hidden
    document.getElementById('submitBtn').style.display = 'inline-block';
    document.getElementById('resetBtn').style.display = 'inline-block';
    document.getElementById('nextBtn').style.display = 'none';

    // Clear old messages
    resultBox.textContent = '';
    resultBox.className = '';

    if (levelId > TOTAL_LEVELS) {
        riddleText.textContent = '🎉 Congratulations! You\'ve solved all the levels!';
        if (levelElement) levelElement.textContent = '';
        if (outputElement) outputElement.textContent = '';
        editor.setValue('// Game Completed!');
        document.getElementById('submitBtn').style.display = 'none';
        document.getElementById('resetBtn').style.display = 'none';
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('progressBar').style.width = '100%';
        return;
    }



    fetch(`http://localhost:5000/get-level/${levelId}`)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        })
        .then(data => {
            if (levelElement) levelElement.textContent = `Level ${data.id}`;
            riddleText.textContent = `${data.riddle}`;
            if (outputElement) outputElement.textContent = `Expected output:\n${data.expectedOutput}`;
            editor.setValue(data.buggyCode);
            currentBuggyCode = data.buggyCode;
        })
        .catch(error => {
            console.error("Error loading level:", error);
            riddleText.textContent = '❌ Could not load levels. Is the server running?';
            editor.setValue('// Error loading game.');
            resultBox.textContent = `⚠ ${error.message}`;
            resultBox.className = 'error';
            document.getElementById('submitBtn').style.display = 'none';
            document.getElementById('resetBtn').style.display = 'none';
            document.getElementById('nextBtn').style.display = 'none';
            document.getElementById('progressBar').style.width = '0%';
        });
}

function submitSolution() {
    const userCode = editor.getValue();
    const resultBox = document.getElementById('resultBox');
    resultBox.textContent = 'Checking solution...';
    resultBox.className = '';

    fetch('http://localhost:5000/submit-solution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ levelId: currentLevel, userCode })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            resultBox.textContent = "✅ Correct!";
            resultBox.className = 'success';
            document.getElementById('nextBtn').style.display = 'inline-block';
        } else if (data.status === "fail") {
            resultBox.textContent = (data.output ? `❌ Incorrect.\nYour Output:\n${data.output}` : '❌ Incorrect.');
            resultBox.className = 'fail';
            document.getElementById('nextBtn').style.display = 'none';
        } else {
            resultBox.textContent = data.message || '❌ Error.';
            resultBox.className = 'error';
            document.getElementById('nextBtn').style.display = 'none';
        }
    })
    .catch(error => {
        console.error("Error submitting solution:", error);
        resultBox.textContent = `❌ Network Error: ${error.message}`;
        resultBox.className = 'error';
    });
}

function resetCode() {
    editor.setValue(currentBuggyCode);
    const resultBox = document.getElementById('resultBox');
    resultBox.textContent = '';
    resultBox.className = '';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'inline-block';
}
