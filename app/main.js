import { sections } from './data.js';
import * as views from './views.js';

const main = document.querySelector('#app');
const mobileNav = document.querySelector('#mobile-nav');
const menu = document.querySelector('.menu');
const renderers = [views.home, views.population, views.economy, views.prices,
  views.labor, views.fiscal, views.explore, views.about];
let renderVersion = 0;
let ascending = false;

function setMenu(open) {
  mobileNav.hidden = !open;
  menu.setAttribute('aria-expanded', String(open));
}

function render(focus = false) {
  window.__shotReady = false;
  const version = ++renderVersion;
  const index = Math.max(0, sections.findIndex(([route]) => '#'+route === location.hash));
  const nav = sections.map(([route,label],i) =>
    `<a href="#${route}" ${i===index?'aria-current="page"':''}>${label}</a>`).join('');
  document.querySelector('#desktop-nav').innerHTML = nav;
  mobileNav.innerHTML = nav;
  setMenu(false);
  ascending = false;
  main.innerHTML = renderers[index]();
  document.title = sections[index][1]+' ｜ 国勢図鑑';
  window.scrollTo(0,0);
  if (focus) main.focus({ preventScroll:true });
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (version === renderVersion) window.__shotReady = true;
  }));
}

function updatePrefectures() {
  document.querySelector('#pref-rows').innerHTML = views.prefectureRows(document.querySelector('#pref-search').value,ascending);
}

document.addEventListener('click', event => {
  if (event.target.closest('.menu')) setMenu(mobileNav.hidden);
  if (event.target.closest('#mobile-nav a')) {
    setMenu(false);
    main.focus({ preventScroll:true });
  }
  if (event.target.closest('.skip')) {
    event.preventDefault();
    main.focus();
  }
  const sort = event.target.closest('#sort-prefs');
  if (sort) {
    ascending = !ascending;
    sort.querySelector('span').textContent = ascending ? '↑' : '↓';
    sort.parentElement.setAttribute('aria-sort',ascending ? 'ascending' : 'descending');
    updatePrefectures();
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    setMenu(false);
    menu.focus();
  }
});
matchMedia('(max-width: 680px)').addEventListener('change', () => setMenu(false));

document.addEventListener('input', event => {
  if (event.target.id === 'pref-search') updatePrefectures();
  if (event.target.id === 'indicator-search') {
    const {html,count} = views.indicatorRows(event.target.value);
    document.querySelector('#indicator-rows').innerHTML = html;
    document.querySelector('#result-count').textContent = count+'件';
  }
});
document.addEventListener('change', event => {
  if (event.target.matches('#pref-a, #pref-b')) {
    const a = Number(document.querySelector('#pref-a').value);
    const b = Number(document.querySelector('#pref-b').value);
    document.querySelector('#comparison').innerHTML = views.comparison(a,b);
  }
});

window.addEventListener('hashchange', () => render(true));
render();
