(function () {
  const FT_LIST_ID = 'ft_list';
  const COOKIE_NAME = 'ft_todos';
  const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

  const listEl = document.getElementById(FT_LIST_ID);
  const emptyEl = document.getElementById('empty');
  const newBtn = document.getElementById('new');

  function readCookie(name) {
    const parts = document.cookie.split('; ').map(s => s.trim());
    for (const part of parts) {
      const [k, ...rest] = part.split('=');
      if (k === name) return decodeURIComponent(rest.join('='));
    }
    return null;
  }
  function writeCookie(name, value, maxAgeSeconds) {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}`;
  }
  function loadTodos() {
    try {
      const raw = readCookie(COOKIE_NAME);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch { return []; }
  }
  function saveTodos(arr) {
    writeCookie(COOKIE_NAME, JSON.stringify(arr), COOKIE_MAX_AGE);
  }

  function makeTodoElement(text) {
    const el = document.createElement('div');
    el.className = 'todo';
    el.textContent = text;
    el.title = 'Click to remove';
    el.addEventListener('click', () => {
      if (confirm(`Remove this TODO?\n\n• ${text}`)) {
        el.remove();
        saveTodos(serializeFromDOM());
        reflectEmpty();
      }
    });
    return el;
  }
  function serializeFromDOM() {
    return Array.from(listEl.children).map(node => node.textContent);
  }
  function reflectEmpty() {
    emptyEl.hidden = listEl.children.length !== 0;
  }
  function addTodoAtTop(text) {
    listEl.prepend(makeTodoElement(text));
    saveTodos(serializeFromDOM());
    reflectEmpty();
  }

  const initial = loadTodos();
  if (initial.length === 0) {
    reflectEmpty();
  } else {
    for (let i = initial.length - 1; i >= 0; i--) {
      listEl.appendChild(makeTodoElement(initial[i]));
    }
    reflectEmpty();
  }

  newBtn.addEventListener('click', () => {
    const text = prompt('Enter a new TO DO:');
    if (text === null) return;
    const cleaned = String(text).trim();
    if (!cleaned) return;
    addTodoAtTop(cleaned);
  });
})();