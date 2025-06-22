📂 Unstuck – A Riddle-Based Debugger Game

🧠 Description
Unstuck is a fun and challenging web-based puzzle game where debugging meets brain teasers! Each level presents you with a riddle and a snippet of buggy code. Your task is to interpret the riddle, analyze the code, and fix the bug to move forward.

Think of it as Wordle meets LeetCode — but for bugs. Ideal for coders who love solving mysteries through logic and creativity.

🚀 Features

🧩 Riddle + Code per level — fun storytelling + debugging

🛠 Built-in code editor (with syntax highlighting)

✅ Real-time feedback on submitted fixes

🧪 Test case validation for code corrections

⏱️ Timer and XP system (future enhancement)

🧠 Hints available after wrong attempts

📸 Preview (optional)
You can add a screenshot or GIF demo here once the UI is ready.

🛠️ Tech Stack

Frontend: HTML, CSS, JavaScript, CodeMirror (code editor)

Backend: Python + Flask

Database: JSON (for levels), or SQLite/Firebase (optional for user data)

Optional: Docker (for deployment)

📁 Project Structure

unstuck/
├── backend/
│ └── app.py # Flask server for game logic
│ └── levels.json # All riddle + code levels
├── frontend/
│ ├── index.html # Main game UI
│ ├── style.css # Basic styling
│ ├── game.js # Handles gameplay, submissions
│ └── editor.js # CodeMirror setup
└── README.md

🧩 Sample Level Format

{
"id": 1,
"riddle": "I’m used before I’m born. Who am I?",
"code": "print(name)\nname = 'Alex'",
"expected_fix": "name = 'Alex'\nprint(name)"
}

🧪 How it Works

User picks a level

Reads the riddle and inspects the buggy code

Fixes it in the code editor

Presses "Submit"

Backend checks if it matches expected solution or passes hidden tests

If correct → Next level. If wrong → hint / retry
