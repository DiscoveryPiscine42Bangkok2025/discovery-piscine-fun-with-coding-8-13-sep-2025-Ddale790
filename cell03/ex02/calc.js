(function () {
  const form = document.getElementById('calc-form');
  const left = document.getElementById('left');
  const right = document.getElementById('right');
  const op = document.getElementById('op');

  const isNonNegInt = (s) => /^\d+$/.test(s);

  function compute(a, operator, b) {
    switch (operator) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      case '%': return a % b;
      default: return NaN;
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const lRaw = left.value.trim();
    const rRaw = right.value.trim();

    if (!isNonNegInt(lRaw) || !isNonNegInt(rRaw)) {
      alert('Error :(');
      console.error('Error :(');
      return;
    }

    const a = parseInt(lRaw, 10);
    const b = parseInt(rRaw, 10);
    const operator = op.value;

    if ((operator === '/' || operator === '%') && b === 0) {
      alert("It's over 9000!");
      console.log("It's over 9000!");
      return;
    }

    const result = compute(a, operator, b);
    alert(String(result));
    console.log(result);
  });

  setInterval(function () {
    alert('Please, use me...');
  }, 30000);
})();