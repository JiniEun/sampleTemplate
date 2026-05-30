/* FOUC 방지: 테마를 CSS 적용 전에 설정 */
(function(){
  const t = localStorage.getItem('theme');
  if (t) document.documentElement.setAttribute('data-theme', t);
})();

const SVG = {
  sun:    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
  moon:   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  link:   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  img:    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
  mail:   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  notion: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
  pdf:    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16l-4-4 1.41-1.41L11 13V4h2v9l1.59-2.41L16 12l-4 4z"/><path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/></svg>',
  ext:    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
};

function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function isDark(){ return document.documentElement.getAttribute('data-theme')==='dark'; }

function toggleTheme(){
  const next = isDark() ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  document.getElementById('theme-btn').innerHTML = next==='dark' ? SVG.sun : SVG.moon;
}

function applyTheme(t){
  const r = document.documentElement.style;
  r.setProperty('--accent',       t.accentColor);
  r.setProperty('--accent-light', t.accentLight);
  r.setProperty('--accent-soft',  t.accentSoft);
  r.setProperty('--bg',           t.mainColor);
  r.setProperty('--font',         t.font);
  r.setProperty('--fs',           t.fontSize);
}

/* extra: 테마 버튼 오른쪽에 추가할 HTML (선택) */
function navHTML(site, current, extra){
  const pages = [
    { label:'Home',      href:'./index.html' },
    { label:'Resume',    href:'./resume.html' },
    { label:'Portfolio', href:'./portfolio.html' },
  ];
  const links = pages.map(p =>
    `<a href="${p.href}"${p.label===current?' class="active"':''}>${esc(p.label)}</a>`
  ).join('');
  return `
  <nav>
    <a class="nav-brand" href="./index.html">${esc(site)}</a>
    <div class="nav-links">
      ${links}
      <button class="icon-btn" id="theme-btn" onclick="toggleTheme()" aria-label="테마 전환">
        ${isDark() ? SVG.sun : SVG.moon}
      </button>
      ${extra || ''}
    </div>
  </nav>`;
}

function fetchData(renderFn){
  fetch('./data.json')
    .then(r => { if(!r.ok) throw new Error(); return r.json(); })
    .then(renderFn)
    .catch(() => {
      document.getElementById('app').innerHTML =
        '<p style="padding:2rem;color:#888;font-size:13px;">⚠ data.json 로드 실패.<br>로컬: <code>npx serve .</code> 또는 <code>python3 -m http.server</code></p>';
    });
}
