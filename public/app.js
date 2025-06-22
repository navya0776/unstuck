let editor;
let currentLevel = 1;
const TOTAL_LEVELS = 15; // Assuming 15 total levels based on your riddles.json

// --- NEW: Variable to store the original buggy code for the current level ---
let currentBuggyCode = '';

document.addEventListener('DOMContentLoaded', () => {
    setupEditor();
    loadLevel(currentLevel);
    updateProgressBar();

    document.getElementById('submitBtn').addEventListener('click', submitSolution);
    // --- NEW: Add event listener for the Reset button ---
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
    const progressBar = document.getElementById('progressBar');
    const completedLevels = currentLevel - 1;
    const progressPercentage = (completedLevels / TOTAL_LEVELS) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}


function loadLevel(levelId) {
    document.getElementById('nextBtn').style.display = 'none';
    // Ensure submit button is always visible when a new level loads
    document.getElementById('submitBtn').style.display = 'inline-block';
    const resultBox = document.getElementById('resultBox');
    resultBox.textContent = '';
    resultBox.className = ''; // Clear previous status classes

    if (levelId > TOTAL_LEVELS) {
        document.getElementById('riddleText').textContent = '🎉 Congratulations! You\'ve solved all the levels!';
        // --- NEW: Ensure 'level' and 'output' elements are cleared/hidden ---
        const levelElement = document.getElementById('level');
        if (levelElement) levelElement.textContent = '';
        const outputElement = document.getElementById('output');
        if (outputElement) outputElement.textContent = '';

        editor.setValue('// Game Completed!');
        document.getElementById('submitBtn').style.display = 'none';
        document.getElementById('resetBtn').style.display = 'none'; // Hide reset button on game completion
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('progressBar').style.width = '100%';
        return;
    }

    fetch(`http://localhost:3000/get-level/${levelId}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            // Assuming you have elements with id="level" and id="output" in your HTML
            // If not, you might want to reconsider where this information is displayed.
            const levelElement = document.getElementById('level');
            if (levelElement) levelElement.textContent = `Level ${data.id}`;
            document.getElementById('riddleText').textContent = ` ${data.riddle}`;
            const outputElement = document.getElementById('output');
            if (outputElement) outputElement.textContent = `Expected output:\n${data.expectedOutput}`;

            editor.setValue(data.buggyCode);
            // --- NEW: Store the original buggy code for resetting ---
            currentBuggyCode = data.buggyCode;
        })
        .catch(error => {
            console.error("Error loading level:", error);
            document.getElementById('riddleText').textContent = 'Oops! Could not load levels. Is the server running?';
            editor.setValue('// Failed to load game. Check server connection.');
            document.getElementById('submitBtn').style.display = 'none';
            document.getElementById('resetBtn').style.display = 'none'; // Hide reset button on error
            document.getElementById('nextBtn').style.display = 'none';
            document.getElementById('progressBar').style.width = '0%';
            const resultBox = document.getElementById('resultBox');
            resultBox.textContent = `❌ Game initialization error: ${error.message}`;
            resultBox.className = 'error';
        });
}

function submitSolution() {
    const userCode = editor.getValue();
    const resultBox = document.getElementById('resultBox');
    resultBox.textContent = 'Checking solution...';
    resultBox.className = '';

    fetch('http://localhost:3000/submit-solution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ levelId: currentLevel, userCode })
    })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                resultBox.textContent = '✅ Correct! Proceed to next level.';
                resultBox.className = 'success';
                document.getElementById('nextBtn').style.display = 'inline-block';
            } else if (data.status === 'fail') {
                resultBox.textContent = `❌ Wrong Output. Try Again.\n(${data.output})`;
                resultBox.className = 'fail';
            } else {
                resultBox.textContent =`⚠ Error: ${data.message}`;
                resultBox.className = 'error';
            }
        })
        .catch(error => {
            console.error("Error submitting solution:", error);
            resultBox.textContent = `❌ Network Error: Could not reach the server. ${error.message}`;
            resultBox.className = 'error';
        });
}

// --- NEW: Reset function ---
function resetCode() {
    editor.setValue(currentBuggyCode); // Set the editor's value back to the stored original code
    const resultBox = document.getElementById('resultBox');
    resultBox.textContent = ''; // Clear any previous result messages
    resultBox.className = ''; // Clear any success/fail/error classes
    document.getElementById('nextBtn').style.display = 'none'; // Hide next button
    document.getElementById('submitBtn').style.display = 'inline-block'; // Ensure submit button is visible
}
