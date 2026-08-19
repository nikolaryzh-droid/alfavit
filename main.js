
const button = document.getElementById('showMore');
const block = document.getElementById('moreWorks');
button?.addEventListener('click', () => {
  const active = block.classList.toggle('show');
  button.textContent = active ? 'Скрыть' : 'Показать все';
});
