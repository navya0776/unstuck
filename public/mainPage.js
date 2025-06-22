let currentIndex = 0;
async function loadRiddle() {

  try {
    const res = await fetch(`/api/riddle/${currentIndex}`);
    if (!res.ok) throw new Error('Riddle not found');
    const r = await res.json();

    document.getElementById('level-title').innerText = `Level ${r.id} - ${r.level}`;
    document.getElementById('riddle-text').innerText = r.riddle;
    document.getElementById('code-area').value = r.buggyCode;
    document.getElementById('feedback').innerText = '';
  } catch (error) {
    document.getElementById('feedback').innerText = 'No more riddles or error loading.';
  }
}



async function submitAnswer() {
  const userCode = document.getElementById('code-area').value;

  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index: currentIndex, userCode }),
    });

    const data = await res.json();

    document.getElementById('feedback').innerText = data.message;

    if (data.correct) {
      currentIndex++;
      setTimeout(() => {
        loadRiddle();
      }, 1000);
    }
  } catch (err) {
    document.getElementById('feedback').innerText = "Error submitting answer.";
  }
}

function showHint() {

  fetch(`/api/riddle/${currentIndex}`)
    .then(res => res.json())
    .then(riddle => alert("💡 Hint: " + riddle.hint))
    .catch(() => alert("No hint available."));
}

window.onload = loadRiddle;
