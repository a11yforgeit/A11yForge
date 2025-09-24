(() => {
  const panel = document.getElementById('a11y-panel');
  const btn = document.getElementById('a11y-btn');
  if(!btn || !panel) return;
  const root = document.documentElement;
  const prefs = JSON.parse(localStorage.getItem('a11y_prefs')||'{}');
  if(prefs.theme==='dark') root.classList.add('dark-theme');
  if(prefs.contrast==='high') root.classList.add('high-contrast');
  if(prefs.font==='large') document.body.classList.add('large-font');
  btn.addEventListener('click', ()=>{
    const open = btn.getAttribute('aria-expanded')==='true';
    btn.setAttribute('aria-expanded', String(!open));
    if(open){ panel.hidden = true; panel.setAttribute('aria-hidden','true'); }
    else { panel.hidden = false; panel.setAttribute('aria-hidden','false'); panel.querySelector('button')?.focus(); }
  });
  panel.addEventListener('click', (e)=>{
    const act = e.target.closest('button')?.dataset?.action;
    if(!act) return;
    if(act==='toggle-theme'){
      root.classList.toggle('dark-theme');
      prefs.theme = root.classList.contains('dark-theme') ? 'dark' : 'light';
    } else if(act==='toggle-contrast'){
      root.classList.toggle('high-contrast');
      prefs.contrast = root.classList.contains('high-contrast') ? 'high' : 'normal';
    } else if(act==='increase-font'){
      document.body.classList.add('large-font'); prefs.font='large';
    } else if(act==='decrease-font'){
      document.body.classList.remove('large-font'); prefs.font='normal';
    }
    localStorage.setItem('a11y_prefs', JSON.stringify(prefs));
  });
  document.addEventListener('keydown', (e)=>{
    if(e.key==='Escape' && !panel.hidden){ panel.hidden=true; btn.setAttribute('aria-expanded','false'); panel.setAttribute('aria-hidden','true'); btn.focus(); }
  });
})();
