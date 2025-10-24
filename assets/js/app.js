
const cfg = window.WALL_CFG || {};
const REPO = `https://github.com/${cfg.owner}/${cfg.repo}`;
const ISSUE_URL = `${REPO}/issues/new?template=upload.yml`;

const uploadBtn = document.getElementById('uploadBtn');
const repoLink = document.getElementById('repoLink');
if (uploadBtn) uploadBtn.href = ISSUE_URL;
if (repoLink) { repoLink.href = REPO; repoLink.textContent = `${cfg.owner}/${cfg.repo}`; }

const grid = document.getElementById('grid');
const tpl = document.getElementById('card-tpl');
const empty = document.getElementById('empty');

const search = document.getElementById('search');
const resolution = document.getElementById('resolution');
const sort = document.getElementById('sort');
const refresh = document.getElementById('refresh');

let data = [];

async function loadIndex(){
  try{
    const res = await fetch('wallpapers/index.json', { cache: 'no-store' });
    const items = await res.json();
    // aceita tanto array quanto objeto com .items
    data = Array.isArray(items) ? items : (items.items || []);
    render();
  }catch(e){
    console.error('Erro ao carregar index.json', e);
    grid.innerHTML = '';
    empty.classList.remove('hidden');
  }
}

function render(){
  const q = (search.value || '').toLowerCase();
  const res = (resolution.value || '').toLowerCase();
  let list = data.slice();

  list = list.filter(it => {
    const hay = `${it.name} ${it.author||''} ${(it.tags||[]).join(' ')}`.toLowerCase();
    const matchesQ = q ? hay.includes(q) : true;
    const matchesR = res ? (it.resolution||'').toLowerCase().includes(res) : true;
    return matchesQ && matchesR;
  });

  if (sort.value === 'name') {
    list.sort((a,b)=> a.name.localeCompare(b.name));
  } else {
    list.sort((a,b)=> (b.added||'').localeCompare(a.added||''));
  }

  grid.innerHTML = '';
  for(const it of list){
    const node = tpl.content.cloneNode(true);
    const img = node.querySelector('img');
    const title = node.querySelector('.title');
    const resEl = node.querySelector('.res');
    const author = node.querySelector('.author');
    const tagsEl = node.querySelector('.tags');
    const aDownload = node.querySelector('.actions a:nth-child(1)');
    const aGitHub = node.querySelector('.actions a:nth-child(2)');
    const thumb = node.querySelector('.thumb');

    img.src = it.url;
    img.alt = it.name;
    title.textContent = it.name || 'Sem nome';
    resEl.textContent = it.resolution || '';
    author.textContent = it.author ? `por ${it.author}` : 'autor desconhecido';
    (it.tags||[]).slice(0,6).forEach(t => {
      const s = document.createElement('span');
      s.className = 'tag';
      s.textContent = t;
      tagsEl.appendChild(s);
    });

    aDownload.href = it.url;
    aGitHub.href = it.github_url || REPO;
    thumb.href = it.url;
    grid.appendChild(node);
  }
  empty.classList.toggle('hidden', list.length>0);
}

search.addEventListener('input', render);
resolution.addEventListener('change', render);
sort.addEventListener('change', render);
refresh.addEventListener('click', loadIndex);

loadIndex();
