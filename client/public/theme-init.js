// Applies the saved theme before first paint (no flash). External file so a strict CSP can stay on.
try { var t = localStorage.getItem('tp-theme'); if (t === 'dark' || t === 'light') document.documentElement.setAttribute('data-theme', t); } catch (e) {}
