const btn = document.getElementById('changer');
const code = document.getElementById('code');

function randomHex() {
  return (
    '#' +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0')
      .toUpperCase()
  );
}

function changeBackground() {
  const c = randomHex();
  document.body.style.backgroundColor = c;
  code.textContent = 'Current: ' + c;
}

btn.addEventListener('click', changeBackground);

// เปลี่ยนสีทันทีตอนโหลด
changeBackground();
