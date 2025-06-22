const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express(); 
app.use(cors());       

const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); 


const riddles = JSON.parse(fs.readFileSync("riddles.json", "utf8"));


app.get("/api/riddle/:index", (req, res) => {
const index = parseInt(req.params.index);

if (index < 0 || index >= riddles.length) {
return res.status(404).json({ error: "Riddle not found" });
}

const { correctCode, answerIncludes, ...safeRiddle } = riddles[index]; 
res.json(safeRiddle);
});

app.post("/api/submit", (req, res) => {
const { index, userCode } = req.body;

const riddle = riddles[index];
if (!riddle) {
return res.status(404).json({ error: "Riddle not found" });
}

const normalize = (str) => str.replace(/\s+/g, "").trim().toLowerCase();
const isCorrect = riddle.answerIncludes.some((required) =>
normalize(userCode).includes(required.toLowerCase())
);

if (isCorrect) {
res.json({ correct: true, message: "✅ Correct! Great job." });
} else {
res.json({ correct: false, message: "❌ Not quite. Try again!" });
}
});


app.listen(PORT, () => {
console.log(`🟢 Server running at http://localhost:${PORT}`);
});

