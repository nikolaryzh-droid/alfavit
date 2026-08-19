
document.getElementById('showMore')?.addEventListener('click', function(){
 const block=document.getElementById('moreWorks');
 const shown=block.classList.toggle('show');
 this.textContent=shown?'Скрыть дополнительные работы':'Показать больше работ';
});
