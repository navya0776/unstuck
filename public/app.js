let editor;
let currentLevel = 1;
const TOTAL_LEVELS = 15; // Overall total levels in the game

// Variables to manage level range and total levels for the current difficulty
let currentDifficultyTotalLevels = 0;
let currentDifficultyStartLevel = 1;

let currentBuggyCode = ''; // Stores the initial buggy code for the current level (for reset)

document.addEventListener('DOMContentLoaded', () => {
    setupEditor(); // Initialize the CodeMirror editor

    // Get the difficulty parameter from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const difficultyParam = urlParams.get('difficulty');

    // Start the game immediately based on the URL parameter.
    // If no difficulty parameter is found (e.g., direct access to index.html),
    // it will default to 'easy'.
    startGame(difficultyParam || 'easy');

    // Attach event listeners to the control buttons
    document.getElementById('submitBtn').addEventListener('click', submitSolution);
    document.getElementById('resetBtn').addEventListener('click', resetCode);
    document.getElementById('nextBtn').addEventListener('click', () => {
        currentLevel++; // Increment level for the next challenge
        // The progress bar will be updated by loadLevel
        loadLevel(currentLevel); // Load the new level
    });
});

/**
 * Initializes the CodeMirror editor for the code editing area.
 */
function setupEditor() {
    editor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
        mode: 'javascript', // Set syntax highlighting mode to JavaScript
        theme: 'default',   // Use the default CodeMirror theme
        lineNumbers: true   // Display line numbers
    });
}

/**
 * Initializes the game based on the selected difficulty.
 * Sets the starting level and the total levels for the chosen difficulty segment.
 * @param {string} difficulty - The chosen difficulty ('easy', 'intermediate', 'difficult').
 */
function startGame(difficulty) {
    switch (difficulty) {
        case 'easy':
            currentLevel = 1; // Start from level 1
            currentDifficultyStartLevel = 1;
            currentDifficultyTotalLevels = 5; // Levels 1-5
            break;
        case 'intermediate':
            currentLevel = 6; // Start from level 6
            currentDifficultyStartLevel = 6;
            currentDifficultyTotalLevels = 5; // Levels 6-10
            break;
        case 'difficult':
            currentLevel = 11; // Start from level 11
            currentDifficultyStartLevel = 11;
            currentDifficultyTotalLevels = 5; // Levels 11-15
            break;
        default:
            // Fallback for invalid or missing difficulty parameter
            console.warn("Invalid or missing difficulty parameter, defaulting to Easy.");
            currentLevel = 1;
            currentDifficultyStartLevel = 1;
            currentDifficultyTotalLevels = 5;
    }

    loadLevel(currentLevel); // Load the first level of the chosen difficulty
    // When a new game starts, the progress bar should be at 0%
    updateProgressBar(0); 
}

/**
 * Updates the visual progress bar based on the number of levels completed.
 * @param {number} levelsDoneCount - The actual count of levels that are considered completed.
 */
function updateProgressBar(levelsDoneCount) {
    const progressBar = document.getElementById('progressBar');
    let progressPercentage;
    if (currentDifficultyTotalLevels === 0) {
        progressPercentage = 0; // Prevent division by zero
    } else {
        progressPercentage = (levelsDoneCount / currentDifficultyTotalLevels) * 100;
    }
    // Ensure the percentage is always between 0 and 100
    progressBar.style.width = `${Math.min(100, Math.max(0, progressPercentage))}%`;
}


/**
 * Fetches and loads the riddle and code for a specific level.
 * Handles display logic for game completion.
 * @param {number} levelId - The ID of the level to load.
 */
function loadLevel(levelId) {
    document.getElementById('nextBtn').style.display = 'none'; // Hide "Next Level" button by default
    document.getElementById('submitBtn').style.display = 'inline-block'; // Ensure "Submit" is visible
    document.getElementById('resetBtn').style.display = 'inline-block'; // Ensure "Reset" is visible

    const resultBox = document.getElementById('resultBox');
    resultBox.textContent = ''; // Clear previous messages
    resultBox.className = ''; // Clear previous status styles

    // Calculate the actual ending level ID for the current difficulty segment
    const currentDifficultyEndLevel = currentDifficultyStartLevel + currentDifficultyTotalLevels - 1;

    // Check if the user has completed all levels within the selected difficulty range
    if (levelId > currentDifficultyEndLevel) {
        // This means the user has finished all levels for the selected difficulty.
        // Check if they have also finished the absolute last level of the entire game (level 15).
        if (currentLevel > TOTAL_LEVELS) {
            document.getElementById('riddleText').textContent = '🎉 GRAND CONGRATULATIONS! You\'ve solved every single level across all difficulties!';
            document.getElementById('level').textContent = ''; // Clear level number
            document.getElementById('output').textContent = ''; // Clear expected output
            editor.setValue('// Game Master! You solved all riddles!'); // Update editor message
            document.getElementById('submitBtn').style.display = 'none'; // Hide controls
            document.getElementById('resetBtn').style.display = 'none';
            document.getElementById('nextBtn').style.display = 'none';
            updateProgressBar(currentDifficultyTotalLevels); // Ensure progress bar is full for final completion
            resultBox.textContent = 'You are a true debugging master! Time for a new challenge?';
            resultBox.className = 'success';
        } else {
            // User completed current difficulty but not the entire game
            document.getElementById('riddleText').textContent = '🎉 Congratulations! You\'ve solved all levels for this difficulty!';
            document.getElementById('level').textContent = '';
            document.getElementById('output').textContent = '';
            editor.setValue('// Difficulty Completed!');
            document.getElementById('submitBtn').style.display = 'none';
            document.getElementById('resetBtn').style.display = 'none';
            document.getElementById('nextBtn').style.display = 'none'; // No "Next Level" for completing a difficulty segment
            updateProgressBar(currentDifficultyTotalLevels); // Ensure progress bar is full for difficulty completion
            resultBox.textContent = 'Feel free to go back to the landing page to try another difficulty!';
            resultBox.className = 'success';
        }
        return; // Stop function execution as game/difficulty is completed
    }

    // After loading a new level, the progress bar should show the count of levels completed *before* this one.
    const levelsCompletedBeforeThis = currentLevel - currentDifficultyStartLevel;
    updateProgressBar(levelsCompletedBeforeThis);

    // Fetch the level data from your backend server
    fetch(`http://localhost:3000/get-level/${levelId}`)
        .then(res => {
            if (!res.ok) {
                // If HTTP response is not OK (e.g., 404, 500), throw an error
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json(); // Parse the JSON response
        })
        .then(data => {
            // Update the UI with the loaded level's riddle, expected output, and buggy code
            document.getElementById('level').textContent = `Level ${data.id}`;
            document.getElementById('riddleText').textContent = ` ${data.riddle}`;
            document.getElementById('output').textContent = `Expected output:\n${data.expectedOutput}`;

            editor.setValue(data.buggyCode); // Set the buggy code in the CodeMirror editor
            currentBuggyCode = data.buggyCode; // Store this for the reset function
        })
        .catch(error => {
            // Handle any network or server errors during level loading
            console.error("Error loading level:", error);
            document.getElementById('riddleText').textContent = 'Oops! Could not load levels. Is the server running?';
            editor.setValue('// Failed to load game. Check server connection.');
            document.getElementById('submitBtn').style.display = 'none'; // Hide controls on error
            document.getElementById('resetBtn').style.display = 'none';
            document.getElementById('nextBtn').style.display = 'none';
            updateProgressBar(0); // Reset progress bar on error
            resultBox.textContent = `❌ Game initialization error: ${error.message}`;
            resultBox.className = 'error';
        });
}

/**
 * Submits the user's code to the backend for validation.
 * Displays success/failure messages and updates button visibility.
 */
function submitSolution() {
    const userCode = editor.getValue(); // Get the current code from the editor
    const resultBox = document.getElementById('resultBox');
    resultBox.textContent = 'Checking solution...'; // Show a checking message
    resultBox.className = ''; // Clear previous status styles

    fetch('http://localhost:3000/submit-solution', {
        method: 'POST', // Use POST method to send data
        headers: { 'Content-Type': 'application/json' }, // Specify content type
        body: JSON.stringify({ levelId: currentLevel, userCode }) // Send current level ID and user's code
    })
        .then(res => res.json()) // Parse the JSON response from the server
        .then(data => {
            if (data.status === 'success') {
                resultBox.textContent = '✅ Correct! Proceed to next level.';
                resultBox.className = 'success';
                
                // After successful submission, update progress bar to include the just-completed level
                const levelsCompletedIncludingCurrent = currentLevel - currentDifficultyStartLevel + 1;
                updateProgressBar(levelsCompletedIncludingCurrent);

                const currentDifficultyEndLevel = currentDifficultyStartLevel + currentDifficultyTotalLevels - 1;
                if (currentLevel < currentDifficultyEndLevel) {
                     document.getElementById('nextBtn').style.display = 'inline-block';
                } else {
                    document.getElementById('nextBtn').style.display = 'none'; // Hide if at end of difficulty
                }
            } else if (data.status === 'fail') {
                resultBox.textContent = `❌ Wrong Output. Try Again.\n(Your output: ${data.output})`;
                resultBox.className = 'fail';
            } else {
                resultBox.textContent = `⚠ Error: ${data.message}`; // Display general error message
                resultBox.className = 'error';
            }
        })
        .catch(error => {
            // Handle network errors during submission
            console.error("Error submitting solution:", error);
            resultBox.textContent = `❌ Network Error: Could not reach the server. ${error.message}`;
            resultBox.className = 'error';
        });
}

/**
 * Resets the code editor to the original buggy code for the current level.
 * Clears result messages and resets button visibility.
 */
function resetCode() {
    editor.setValue(currentBuggyCode); // Set editor content back to the original buggy code
    const resultBox = document.getElementById('resultBox');
    resultBox.textContent = ''; // Clear any result message
    resultBox.className = ''; // Clear status styles
    document.getElementById('nextBtn').style.display = 'none'; // Hide "Next Level" button
    document.getElementById('submitBtn').style.display = 'inline-block'; // Ensure "Submit" is visible
}
