import './style.css';
import { initCursor } from './js/cursor.js';
import { initAudio } from './js/audio.js';
import { initHero } from './js/hero.js';
import { initMenu } from './js/menu.js';
import { initGallery } from './js/gallery.js';
import { initReservation } from './js/reservation.js';
import { initScrollEffects } from './js/animations.js';
import { initEasterEggs } from './js/easter-eggs.js';
import { initConcierge } from './js/concierge.js';
import { initMisc } from './js/misc.js';

// ── Greeting based on time ──
const hour = new Date().getHours();
const greetingEl = document.getElementById('hero-greeting');
if (greetingEl) {
  if (hour >= 5 && hour < 12) greetingEl.textContent = 'Good Morning';
  else if (hour >= 12 && hour < 17) greetingEl.textContent = 'Good Afternoon';
  else if (hour >= 17 && hour < 21) greetingEl.textContent = 'Good Evening';
  else greetingEl.textContent = 'Good Night';
}

// ── Loading screen ──
const loadingScreen = document.getElementById('loading-screen');
window.addEventListener('load', () => {
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    document.body.classList.add('loaded');
    initAll();
  }, 2600);
});

function initAll() {
  initCursor();
  initAudio();
  initHero();
  initMenu();
  initGallery();
  initReservation();
  initScrollEffects();
  initEasterEggs();
  initConcierge();
  initMisc();
}
