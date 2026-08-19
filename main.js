const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const productType = document.getElementById('productType');
const width = document.getElementById('width');
const height = document.getElementById('height');
const installation = document.getElementById('installation');
const priceResult = document.getElementById('priceResult');

const rates = {
  sign: 18500,
  letters: 24000,
  banner: 3200,
  facade: 14500
};

function formatRub(value) {
  return new Intl.NumberFormat('ru-RU').format(Math.round(value / 1000) * 1000) + ' ₽';
}

function calculate() {
  const w = Math.max(Number(width?.value || 0), 100) / 1000;
  const h = Math.max(Number(height?.value || 0), 100) / 1000;
  const area = Math.max(w * h, 0.5);
  const rate = rates[productType?.value] || rates.sign;
  let price = area * rate;
  if (installation?.checked) price *= 1.22;
  price = Math.max(price, 12000);
  if (priceResult) priceResult.textContent = 'от ' + formatRub(price);
}

[productType, width, height, installation].forEach(el => el?.addEventListener('input', calculate));
calculate();

document.getElementById('year').textContent = new Date().getFullYear();
