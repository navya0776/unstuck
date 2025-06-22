let currentIndex = 0;

function loadRiddle() {
  const r = riddles[currentIndex];
  document.getElementById('level-title').innerText = `Level ${r.id} - ${r.level}`;
  document.getElementById('riddle-text').innerText = r.riddle;
  document.getElementById('code-area').value = r.buggyCode;
  document.getElementById('feedback').innerText = '';
}

function submitAnswer() {
  const userCode = document.getElementById('code-area').value;
  const expected = riddles[currentIndex].answerIncludes;

  let isCorrect = expected.every(word => userCode.includes(word));

  if (isCorrect) {
    document.getElementById('feedback').innerText = "✅ Correct! Moving to next...";
    currentIndex++;
    if (currentIndex < riddles.length) {
      setTimeout(loadRiddle, 1000);
    } else {
      document.getElementById('feedback').innerText = "🎉 All riddles solved!";
    }
  } else {
    document.getElementById('feedback').innerText = "❌ Incorrect. Try again!";
  }
}

function showHint() {
  const hint = riddles[currentIndex].hint;
  alert("💡 Hint: " + hint);
}

window.onload = loadRiddle;