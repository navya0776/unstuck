const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const vm = require("vm"); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serves index.html and static files

const riddles = JSON.parse(fs.readFileSync("riddles.json", "utf8"));

// ✅ GET riddle by index
app.get("/get-level/:id", (req, res) => {
  const index = parseInt(req.params.id) - 1;

  if (isNaN(index) || index < 0 || index >= riddles.length) {
    return res.status(404).json({ error: "Riddle not found" });
  }

  const { id, riddle, buggyCode, expectedOutput, level } = riddles[index];
  res.json({ id, riddle, buggyCode, expectedOutput, level });
});

// ✅ POST code to check answer
app.post("/submit-solution", (req, res) => {
  const { levelId, userCode } = req.body;
  const index = levelId - 1;

  const riddle = riddles[index];
  if (!riddle) {
    return res.status(404).json({ status: "error", message: "Invalid level" });
  }

  let output = "";
  const sandbox = {
    console: {
      log: (...args) => {
        output += args.join(" ") + "\n";
      }
    }
  };

  try {
    vm.createContext(sandbox);
    vm.runInContext(userCode, sandbox);

    // Remove trailing newline
    output = output.trim();

    if (output === riddle.expectedOutput.trim()) {
      res.json({ status: "success" });
    } else {
      res.json({ status: "fail", output: output });
    }
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🟢 Server running at http://localhost:${PORT}`);
});
