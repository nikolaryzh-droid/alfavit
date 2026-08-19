
const btn=document.getElementById('showAllWorks');
const more=document.getElementById('worksMore');
btn?.addEventListener('click',()=>{const on=more.classList.toggle('show');btn.textContent=on?'Скрыть дополнительные работы':'Показать все работы';});
