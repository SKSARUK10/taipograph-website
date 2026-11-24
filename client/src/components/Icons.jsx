// SVG sprite (same icons as the original site). Use <Icon name="file" />.
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="i-file" viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6z M14 3v4h4" /></symbol>
        <symbol id="i-audit" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6" /><path d="M16 16l5 5" /></symbol>
        <symbol id="i-build" viewBox="0 0 24 24"><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></symbol>
        <symbol id="i-check" viewBox="0 0 24 24"><path d="M4 12l5 5L20 6" /></symbol>
        <symbol id="i-send" viewBox="0 0 24 24"><path d="M3 12h15M13 6l6 6-6 6" /></symbol>
        <symbol id="i-brief" viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4h6v3H9zM8 12h8M8 16h6" /></symbol>
        <symbol id="i-design" viewBox="0 0 24 24"><path d="M4 20l1-5L16 4l4 4L9 19z M14 6l4 4" /></symbol>
        <symbol id="i-appr" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></symbol>
        <symbol id="i-proof" viewBox="0 0 24 24"><path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5" /></symbol>
        <symbol id="i-print" viewBox="0 0 24 24"><path d="M7 9V4h10v5M7 17H4v-7h16v7h-3M7 14h10v7H7z" /></symbol>
        <symbol id="i-upload" viewBox="0 0 24 24"><path d="M12 16V4M7 9l5-5 5 5M5 20h14" /></symbol>
        <symbol id="i-chat" viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9.5h8M8 12.5h5" /></symbol>
        <symbol id="i-up" viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6" /></symbol>
        <symbol id="i-copy" viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 012-2h9" /></symbol>
        <symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" /></symbol>
        <symbol id="i-moon" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z" /></symbol>
      </defs>
    </svg>
  );
}

export function Icon({ name, className = 'ic' }) {
  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <use href={`#i-${name}`} />
    </svg>
  );
}
