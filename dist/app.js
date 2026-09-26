const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  mobileMenu.classList.toggle('open', !open);
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
  });
});

document.querySelectorAll('.faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const open = button.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-item').forEach((otherItem) => {
      const otherButton = otherItem.querySelector('button');
      const otherAnswer = otherItem.querySelector('.faq-answer');
      otherItem.classList.remove('open');
      otherButton.setAttribute('aria-expanded', 'false');
      otherButton.querySelector('i').textContent = '+';
      otherAnswer.hidden = true;
    });
    if (!open) {
      item.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
      button.querySelector('i').textContent = '−';
      answer.hidden = false;
    }
  });
});

const tabButtons = [...document.querySelectorAll('[data-tab]')];
const tabPanels = [...document.querySelectorAll('[data-panel]')];
tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.tab;
    tabButtons.forEach((tab) => tab.setAttribute('aria-selected', String(tab === button)));
    tabPanels.forEach((panel) => {
      const active = panel.dataset.panel === selected;
      panel.hidden = !active;
      panel.classList.toggle('active', active);
    });
  });
});

const projectTrack = document.querySelector('[data-project-track]');
document.querySelector('[data-project-prev]')?.addEventListener('click', () => {
  projectTrack.scrollBy({ left: -projectTrack.clientWidth * .76, behavior: 'smooth' });
});
document.querySelector('[data-project-next]')?.addEventListener('click', () => {
  projectTrack.scrollBy({ left: projectTrack.clientWidth * .76, behavior: 'smooth' });
});

const backTop = document.querySelector('.back-top');
window.addEventListener('scroll', () => backTop.classList.toggle('visible', window.scrollY > 700), { passive: true });
backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.querySelector('[data-year]').textContent = new Date().getFullYear();
