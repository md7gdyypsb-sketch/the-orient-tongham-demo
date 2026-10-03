const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectCategory(tab, moveFocus = false) {
  tabs.forEach(item => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
  });
  if (moveFocus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectCategory(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectCategory(tabs[next], true); }
  });
});
const navToggle = document.querySelector('.mobile-nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
function closeNavigation() {
  mobileNav.hidden = true;
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation');
}
navToggle.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') !== 'true';
  mobileNav.hidden = !open;
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));
window.matchMedia('(min-width: 641px)').addEventListener('change', closeNavigation);
document.getElementById('print-menu').addEventListener('click', () => window.print());
const dialog = document.getElementById('demo-dialog');
document.querySelectorAll('[data-open-demo]').forEach(button => button.addEventListener('click', () => { dialog.showModal(); document.body.classList.add('modal-open'); }));
document.getElementById('close-demo').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
const today = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', weekday: 'long' }).format(new Date());
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const todayRow = document.querySelector(`tr[data-day="${days.indexOf(today)}"]`);
todayRow.classList.add('is-today');
const todaySlots = [...todayRow.querySelector('td').childNodes].map(node => node.nodeName === 'BR' ? ' & ' : node.textContent).join('');
document.getElementById('today-hours').textContent = `${today} · ${todaySlots} (listed hours)`;
