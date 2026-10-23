// Tahun otomatis di footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menu mobile (buka/tutup)
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Tutup menu setelah link diklik
navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// ===== Popup detail proyek =====
// Popup dibuat otomatis oleh JavaScript, isinya diambil dari
// blok <div class="project-detail"> di dalam tiap kartu proyek.
const modal = document.createElement('div');
modal.className = 'modal';
modal.setAttribute('aria-hidden', 'true');
modal.innerHTML = `
  <div class="modal-backdrop"></div>
  <div class="modal-dialog" role="dialog" aria-modal="true">
    <button class="modal-close" type="button" aria-label="Tutup">&times;</button>
    <div class="modal-body"></div>
  </div>
`;
document.body.appendChild(modal);

const modalBody = modal.querySelector('.modal-body');
const modalClose = modal.querySelector('.modal-close');
let lastFocused = null;

function openModal(card) {
  const detail = card.querySelector('.project-detail');
  if (!detail) return;

  lastFocused = card;
  modalBody.innerHTML = detail.innerHTML;
  modalBody.scrollTop = 0;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
  modalBody.innerHTML = '';
  if (lastFocused) lastFocused.focus();
}

document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('click', () => openModal(card));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(card);
    }
  });
});

modalClose.addEventListener('click', closeModal);
modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});