const rulesBox = document.getElementById('rules');
const contactBox = document.getElementById('contact');
const aboutBox = document.getElementById('about');

document.getElementById('rules-btn').onclick = () => {
  rulesBox.style.display = rulesBox.style.display === 'none' ? 'block' : 'none';
  contactBox.style.display = 'none';
  aboutBox.style.display = 'none';
};

document.getElementById('contact-btn').onclick = () => {
  contactBox.style.display = contactBox.style.display === 'none' ? 'block' : 'none';
  rulesBox.style.display = 'none';
  aboutBox.style.display = 'none';
};

document.getElementById('about-btn').onclick = () => {
  aboutBox.style.display = aboutBox.style.display === 'none' ? 'block' : 'none';
  rulesBox.style.display = 'none';
  contactBox.style.display = 'none';
};