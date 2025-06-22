*About the Project* 🚀

Unstuck: Debug the Code! is an interactive web-based game designed to help aspiring developers, and even seasoned ones, sharpen their debugging skills and deepen their understanding of fundamental JavaScript concepts. Players are presented with a riddle describing a programming concept and a "buggy" code snippet. The challenge is to fix the code to match a specific expectedOutput.

This application aims to provide a fun and engaging learning experience, allowing users to actively experiment with code and immediately see the results of their changes.


*Features* ✨

Interactive Riddles: Engaging puzzles that test your knowledge of JavaScript concepts. 🧩

Live Code Editor: Powered by CodeMirror, offering syntax highlighting and line numbers for a comfortable coding experience. 🧑‍💻

Real-time Feedback: Instantly know if your solution is correct or what output your "fixed" code produced. ✅❌

Progress Tracking: A progress bar visually indicates how many levels you've completed. 📈

Level Progression: Advance through increasingly challenging levels. ➡️

Reset Functionality: Easily revert the code editor to its original "buggy" state for a fresh start on a problem. ↩️

Backend Validation: A robust Node.js/Express server evaluates user-submitted code in a sandboxed environment. 🛡️




*Technical Stack* 🛠️

*Frontend:*

HTML5: Structure of the web application. 📄

CSS3 (Tailwind CSS): Styling and responsive design. 🎨

JavaScript (ES6+): Client-side logic, interactivity, and communication with the backend. ⚡

CodeMirror: In-browser code editor with syntax highlighting. ✍️

*Backend:*

Node.js: JavaScript runtime environment. 🟢

Express.js: Web framework for building the API endpoints. 🌐

body-parser: Middleware for parsing JSON request bodies. 📦

cors: Middleware for enabling Cross-Origin Resource Sharing. 🔗

fs (Node.js built-in): For reading the riddles.json file. 📁

vm (Node.js built-in): For sandboxed code execution, crucial for safely evaluating user-submitted JavaScript. 🔒

*Data:*

riddles.json: JSON file storing all the riddle data, buggy code, and expected outputs for each level. 📊




*How to Play* 🎮

Launch the Application:

Follow the "Installation & Setup" instructions below to get the backend server running and open index.html in your browser. 🌐

Read the Riddle: At the top of the app, you'll see a riddle describing a programming concept and the Expected output your code should produce. 🤔

Inspect the Code: The code editor will contain a JavaScript snippet that currently has a "bug" or doesn't produce the expectedOutput. 🐛

Debug the Code: Modify the code in the editor to make it produce the expected output. Pay close attention to the riddle for clues! 🛠️

Submit Your Solution: Click the "Submit" button to send your code to the server for evaluation. 🚀

Review Feedback: The Result Box will tell you if your solution is Correct! or Wrong Output.. 👍👎

Next Level: If correct, a "Next Level" button will appear. Click it to proceed to the next challenge! ▶️

Reset: If you get stuck or want to start over on a level, click the "Reset" button to revert the code to its original state. 🔄
