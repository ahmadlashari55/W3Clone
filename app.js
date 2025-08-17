
// Minimal SPA behaviors + feature loader + theme toggle + search
const $ = (q,ctx=document)=>ctx.querySelector(q);
const $$ = (q,ctx=document)=>Array.from(ctx.querySelectorAll(q));

const State = {
  theme: localStorage.getItem('w3clone.theme') || 'light',
  features: [],
  user: JSON.parse(localStorage.getItem('w3clone.user') || 'null'),
};

function applyTheme(){
  if(State.theme==='dark') document.body.classList.add('dark');
  else document.body.classList.remove('dark');
}
function toggleTheme(){
  State.theme = (State.theme==='dark')?'light':'dark';
  localStorage.setItem('w3clone.theme', State.theme);
  applyTheme();
}
function loginDemo(){
  const name = prompt('Enter your name:');
  if(!name) return;
  const email = prompt('Enter your email:');
  if(!email) return;
  State.user = {name,email};
  localStorage.setItem('w3clone.user', JSON.stringify(State.user));
  renderUser();
}
function logoutDemo(){
  localStorage.removeItem('w3clone.user');
  State.user = null;
  renderUser();
}
function renderUser(){
  const ui = $('#userBox');
  if(!ui) return;
  ui.innerHTML = State.user ?
   `<span>Hello, <b>${State.user.name}</b></span> <button class="btn ghost" onclick="logoutDemo()">Logout</button>` :
   `<button class="btn" onclick="loginDemo()">Login / Signup</button>`;
}
async function loadFeatures(){
  const res = await fetch('assets/features.json');
  State.features = await res.json();
  $('#featureCount').textContent = State.features.length.toLocaleString();
  renderFeatureList(State.features.slice(0, 60));
}
function renderFeatureList(items){
  const wrap = $('#featureList'); if(!wrap) return;
  wrap.innerHTML = items.map(f => `
    <div class="card">
      <div style="display:flex; align-items:center; gap:8px;">
        <div class="badge">#${f.id}</div>
        <div style="font-weight:700;">${f.name}</div>
        <div class="tag">${f.category}</div>
        <div class="tag">${f.type}</div>
        <div class="tag">${f.status}</div>
      </div>
      <div style="margin-top:8px; color:#64748b;">${f.description}</div>
    </div>
  `).join('');
}
function doSearch(){
  const q = $('#search').value.toLowerCase();
  const cat = $('#filterCat').value;
  const filtered = State.features.filter(f => {
    const okQ = !q || f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q);
    const okC = cat==='all' || f.category===cat;
    return okQ && okC;
  });
  renderFeatureList(filtered.slice(0, 120));
  $('#resultCount').textContent = filtered.length.toLocaleString();
}

window.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  renderUser();
  loadFeatures();
  $('#themeBtn').addEventListener('click', toggleTheme);
  $('#search').addEventListener('input', doSearch);
  $('#filterCat').addEventListener('change', doSearch);
});
