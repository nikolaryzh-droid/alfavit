const btn=document.getElementById('showAllWorks');
const more=document.getElementById('worksMore');
btn?.addEventListener('click',()=>{const on=more.classList.toggle('show');btn.textContent=on?'Скрыть дополнительные работы':'Показать все работы';});

const serviceText={
'Объёмные буквы':'Световые и несветовые объёмные буквы любых размеров и шрифтов. Подберём материал, подсветку, крепление и способ монтажа.',
'Световые короба':'Прямоугольные, фигурные, односторонние, двусторонние и торцевые световые короба для фасадов и интерьеров.',
'Фасадные вывески':'Комплексное оформление фасада: конструкция, дизайн, производство, электрика и монтаж.',
'Крышные установки':'Крупноформатные рекламные конструкции с расчётом несущей системы и монтажом.',
'Интерьерные вывески':'Оформление ресепшенов, стен, торговых точек и навигационных зон.',
'Стелы и пилоны':'Рекламные и навигационные стелы, пилоны и указатели для улицы и помещений.',
'Рекламные конструкции':'Щиты, лайтбоксы, таблички и нестандартные конструкции под конкретную задачу.',
'Брендирование':'Оклейка транспорта, витрин, интерьеров и других поверхностей.',
'Стенды':'Информационные, выставочные, настенные и напольные стенды.',
'Адресные таблички':'Таблички с названием улицы, номером дома, навигацией и индивидуальным дизайном.',
'Широкоформатная и интерьерная печать':'Печать баннеров, плёнки, постеров и материалов для оформления интерьеров.',
'Плоттерная резка':'Резка самоклеящейся плёнки, надписей, логотипов и декоративных элементов.'};
const modal=document.getElementById('serviceModal'), mt=document.getElementById('modalTitle'), mp=document.getElementById('modalText');
function openService(card){const n=card.dataset.service;mt.textContent=n;mp.textContent=serviceText[n]||'';modal.classList.add('show');modal.setAttribute('aria-hidden','false');}
document.querySelectorAll('.service-card').forEach(c=>{c.addEventListener('click',()=>openService(c));c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openService(c)}})});
document.querySelector('.modal-close')?.addEventListener('click',()=>modal.classList.remove('show'));
document.querySelector('.modal-calc')?.addEventListener('click',()=>{document.getElementById('serviceSelect').value=mt.textContent;modal.classList.remove('show');document.getElementById('calc').scrollIntoView({behavior:'smooth'})});
modal?.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('show')});

const works=[...document.querySelectorAll('.work-card img')], lb=document.getElementById('lightbox'), lbImg=lb?.querySelector('img');let wi=0;
function showWork(i){wi=(i+works.length)%works.length;lbImg.src=works[wi].src;lb.classList.add('show');}
works.forEach((im,i)=>im.addEventListener('click',()=>showWork(i)));
lb?.querySelector('.lightbox-close')?.addEventListener('click',()=>lb.classList.remove('show'));
lb?.querySelector('.lightbox-prev')?.addEventListener('click',()=>showWork(wi-1));lb?.querySelector('.lightbox-next')?.addEventListener('click',()=>showWork(wi+1));
lb?.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('show')});

document.getElementById('leadForm')?.addEventListener('submit',async e=>{e.preventDefault();const status=document.getElementById('formStatus');status.textContent='Отправляем заявку…';try{const r=await fetch('/api/lead',{method:'POST',body:new FormData(e.currentTarget)});const j=await r.json();if(!r.ok)throw new Error(j.error||'Ошибка отправки');status.textContent='Заявка отправлена. Мы свяжемся с вами.';e.currentTarget.reset();}catch(err){status.textContent='Форма готова, но канал получения заявок ещё не настроен. Укажите контакты и параметры отправки в Cloudflare.';}});
