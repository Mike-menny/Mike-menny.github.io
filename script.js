const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('is-open', !isOpen);
  });
  nav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }
  });
}

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

document.querySelectorAll('[data-open-demo]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const dialog = document.getElementById(trigger.dataset.openDemo);
    if (!(dialog instanceof HTMLDialogElement)) return;

    dialog.showModal();
    const video = dialog.querySelector('video');
    if (video instanceof HTMLVideoElement) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  });
});

document.querySelectorAll('.demo-dialog').forEach((dialog) => {
  const pauseVideo = () => {
    const video = dialog.querySelector('video');
    if (video instanceof HTMLVideoElement) video.pause();
  };

  dialog.querySelectorAll('[data-close-demo]').forEach((button) => {
    button.addEventListener('click', () => dialog.close());
  });
  dialog.addEventListener('close', pauseVideo);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
});
