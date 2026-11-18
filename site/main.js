// Terminalen i toppen: blippa, vänta, Medges ej. Och knappen som kopierar mejladressen.
(() => {
  const AMOUNTS = [87.5, 149, 212.9, 287.5, 349, 64.9, 499, 1129];
  const NOTES = [
    'Den gick inte igenom. Men tåget kan vi hjälpa dig med.',
    'Fortfarande nej. Det här kan vi inte fixa, men vi fixar annat.',
    'Medges ej, igen. Scrolla ner, där säger vi ja.'
  ];
  const MAIL = 'hej@medgesej.se';
  const fmt = n => n.toFixed(2).replace('.', ',') + ' kr';
  const el = id => document.getElementById(id);
  const show = name => ['idle', 'busy', 'denied'].forEach(s => { el(s).hidden = s !== name; });

  el('amount').textContent = fmt(AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)]);

  // Ett enda blipp när kortet läses
  let ctx = null;
  function blip() {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const t = ctx.currentTime;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = 2200;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.18, t + 0.005);
      g.gain.setValueAtTime(0.18, t + 0.09);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);
      o.connect(g).connect(ctx.destination);
      o.start(t); o.stop(t + 0.15);
    } catch (e) { /* inget ljud, sidan fungerar ändå */ }
  }

  let busy = false, tries = 0;
  el('terminal').addEventListener('click', () => {
    if (busy) return;
    busy = true;
    blip();
    show('busy');
    setTimeout(() => {
      show('denied');
      el('termNote').textContent = NOTES[Math.min(tries, NOTES.length - 1)];
      tries++;
      busy = false;
    }, 1100 + Math.random() * 700);
  });

  const copy = el('copyMail');
  copy.hidden = !navigator.clipboard;
  copy.addEventListener('click', () => {
    navigator.clipboard.writeText(MAIL).then(
      () => { el('copyOut').textContent = 'Kopierad.'; },
      () => { el('copyOut').textContent = 'Gick inte att kopiera.'; }
    );
  });
})();
