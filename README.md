# 🐞 Unstuck: Debug the Code!

**Unstuck: Debug the Code!** is an interactive web-based game designed to help developers sharpen their debugging skills while deepening their understanding of fundamental JavaScript concepts.  
Players are presented with a **riddle**, a buggy code snippet, and an **expected output**. The challenge is to **fix the code** to match the output. It’s fun, educational, and rewarding!

---

## ✨ Features

- 🧩 **Interactive Riddles** – Engaging JS puzzles built around conceptual clues.
- 🧑‍💻 **Live Code Editor** – Integrated CodeMirror editor with syntax highlighting.
- ✅ **Real-time Feedback** – Instant evaluation of your code with output comparison.
- 📈 **Progress Tracking** – Progress bar shows how far you've come.
- ➡️ **Level Progression** – Challenges increase in difficulty as you move ahead.
- 🔄 **Reset Functionality** – Revert your code to its original buggy state.
- 🛡️ **Backend Validation** – Node server evaluates code in a sandboxed environment.

---

## 🛠️ Tech Stack

### 🔹 Frontend

| Tech              | Purpose                          |
|-------------------|----------------------------------|
| HTML5             | App structure                    |
| Tailwind CSS      | Styling and responsiveness       |
| JavaScript (ES6+) | App logic & interactivity        |
| CodeMirror        | In-browser code editor           |

### 🔸 Backend

| Tech             | Purpose                            |
|------------------|------------------------------------|
| Node.js          | JS runtime environment             |
| Express.js       | Backend routing and endpoints      |
| body-parser      | Parses JSON request bodies         |
| cors             | Handles CORS requests              |
| fs (built-in)    | Reads riddle data from file        |
| vm (built-in)    | Safely evaluates JS code submitted |

### 📊 Data

- `riddles.json` – Contains:
  - Riddle text
  - Buggy code
  - Expected output

---

## 🎮 How to Play

1. **Launch the App**  
   - Start the backend server (see Setup below).  
   - Open `index.html` in a browser.

2. **Read the Riddle**  
   - Hints are hidden in the wording. The `expectedOutput` is also shown.

3. **Fix the Code**  
   - Debug the buggy code using clues and expected result.

4. **Submit**  
   - Click **Submit** to send your code to the server.

5. **Get Feedback**  
   - You'll see either ✅ _"Correct!"_ or ❌ _"Wrong Output"_.

6. **Advance or Reset**  
   - Click **Next Level** to move ahead, or **Reset** to retry.

---

## ⚙️ Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/unstuck-debug.git
cd unstuck-debug

# 2. Install backend dependencies
cd server
npm install

# 3. Start backend server
node index.js

# 4. Open frontend
cd ../client
Open index.html in your browser

*Dependencies:-*

| Package           | Description                                                           |
| ----------------- | --------------------------------------------------------------------- |
| `express`         | Fast, minimalist web framework for Node.js.                           |
| `cors`            | Middleware to allow cross-origin requests.                            |
| `body-parser`     | Parses incoming request bodies in a middleware before your handlers.  |
| `fs` *(built-in)* | Node.js file system module used to read `riddles.json`.               |
| `vm` *(built-in)* | Runs user-submitted code in a sandboxed virtual machine for security. |
| Library        | Description                                                                |
| -------------- | -------------------------------------------------------------------------- |
| `CodeMirror`   | In-browser code editor with syntax highlighting and configurable behavior. |
| `Tailwind CSS` | Utility-first CSS framework for rapid UI development.                      |
| `Vanilla JS`   | Handles interactivity and API communication on the client side.            |

Future Enhancements:-

| Feature                     | Description                                                             |
| --------------------------- | ----------------------------------------------------------------------- |
| 👤 **User Accounts**        | Enable user authentication and persistent progress tracking.            |
| 🔄 **Progress Saving**      | Store current level, completed riddles, and solutions.                  |
| ➕ **More Riddles & Levels** | Expand the pool with new concepts and debugging scenarios.              |
| 💡 **Hint System**          | Let players request hints after failed attempts.                        |
| 🎯 **Difficulty Modes**     | Tag puzzles as Beginner, Intermediate, or Advanced.                     |
| 📘 **Explanations**         | Show correct explanations and learning points after solving each level. |
| 🌈 **UI Improvements**      | Add dark mode, animations, and better feedback UX.                      |
| ⏱ **Time-based Challenges** | Add speed challenges for bonus points and fun.                          |


