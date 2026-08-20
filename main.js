const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];

// Mobile navigation
const menu=$('.menu-toggle'),nav=$('#mainNav');
function closeMenu(){nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Открыть меню');}
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');});
$$('#mainNav a').forEach(a=>a.addEventListener('click',closeMenu));

// Portfolio expansion
const btn=$('#showAllWorks'),more=$('#worksMore');
btn?.addEventListener('click',()=>{const on=more.classList.toggle('show');btn.textContent=on?'Скрыть дополнительные работы':'Показать все работы';btn.setAttribute('aria-expanded',String(on));});
btn?.setAttribute('aria-expanded','false');

// Service details
const serviceText={'Объёмные буквы':'Световые и несветовые объёмные буквы любых размеров и шрифтов. Подберём материал, подсветку, крепление и способ монтажа.','Световые короба':'Прямоугольные, фигурные, односторонние, двусторонние и торцевые световые короба для фасадов и интерьеров.','Фасадные вывески':'Комплексное оформление фасада: конструкция, дизайн, производство, электрика и монтаж.','Крышные установки':'Крупноформатные рекламные конструкции с расчётом несущей системы и монтажом.','Интерьерные вывески':'Оформление ресепшенов, стен, торговых точек и навигационных зон.','Стелы и пилоны':'Рекламные и навигационные стелы, пилоны и указатели для улицы и помещений.','Рекламные конструкции':'Щиты, лайтбоксы, таблички и нестандартные конструкции под конкретную задачу.','Брендирование':'Оклейка транспорта, витрин, интерьеров и других поверхностей.','Стенды':'Информационные, выставочные, настенные и напольные стенды.','Адресные таблички':'Таблички с названием улицы, номером дома, навигацией и индивидуальным дизайном.','Широкоформатная и интерьерная печать':'Печать баннеров, плёнки, постеров и материалов для оформления интерьеров.','Плоттерная резка':'Резка самоклеящейся плёнки, надписей, логотипов и декоративных элементов.'};
const modal=$('#serviceModal'),mt=$('#modalTitle'),mp=$('#modalText'),modalClose=$('.modal-close');let returnFocus=null;
function setModal(open){modal?.classList.toggle('show',open);modal?.setAttribute('aria-hidden',String(!open));if(open)modalClose?.focus();else returnFocus?.focus();}
function openService(card){returnFocus=card;const n=card.dataset.service;mt.textContent=n;mp.textContent=serviceText[n]||'';setModal(true);}
$$('.service-card').forEach(c=>{c.addEventListener('click',()=>openService(c));c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openService(c);}})});
modalClose?.addEventListener('click',()=>setModal(false));
$('.modal-calc')?.addEventListener('click',()=>{const sel=$('#serviceSelect');if(sel)sel.value=mt.textContent;setModal(false);$('#calc')?.scrollIntoView({behavior:'smooth'});});
modal?.addEventListener('click',e=>{if(e.target===modal)setModal(false)});

// Portfolio lightbox
const works=$$('.work-card img'),lb=$('#lightbox'),lbImg=lb?.querySelector('img');let wi=0,lbReturn=null;
function setLightbox(open){lb?.classList.toggle('show',open);lb?.setAttribute('aria-hidden',String(!open));if(open)$('.lightbox-close')?.focus();else lbReturn?.focus();}
function showWork(i){wi=(i+works.length)%works.length;lbReturn=works[wi];lbImg.src=works[wi].currentSrc||works[wi].src;lbImg.alt=works[wi].alt;setLightbox(true);}
works.forEach((im,i)=>{im.tabIndex=0;im.setAttribute('role','button');im.setAttribute('aria-label','Открыть фото: '+im.alt);im.addEventListener('click',()=>showWork(i));im.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();showWork(i);}})});
$('.lightbox-close')?.addEventListener('click',()=>setLightbox(false));$('.lightbox-prev')?.addEventListener('click',()=>showWork(wi-1));$('.lightbox-next')?.addEventListener('click',()=>showWork(wi+1));lb?.addEventListener('click',e=>{if(e.target===lb)setLightbox(false)});

document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(modal?.classList.contains('show'))setModal(false);if(lb?.classList.contains('show'))setLightbox(false);closeMenu();}if(lb?.classList.contains('show')&&e.key==='ArrowLeft')showWork(wi-1);if(lb?.classList.contains('show')&&e.key==='ArrowRight')showWork(wi+1);});

// Lead form
const form=$('#leadForm'),fileInput=form?.elements.attachment,status=$('#formStatus'),MAX_FILE=10*1024*1024;
fileInput?.addEventListener('change',()=>{const f=fileInput.files?.[0];if(f&&f.size>MAX_FILE){fileInput.value='';status.textContent='Файл слишком большой. Максимальный размер — 10 МБ.';}else if(f){status.textContent='Прикреплён файл: '+f.name;}});
form?.addEventListener('submit',async e=>{e.preventDefault();status.textContent='Отправляем заявку…';const submit=form.querySelector('button[type="submit"]');submit.disabled=true;try{const r=await fetch('/api/lead',{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||'Ошибка отправки');status.textContent=j.attachmentSent===false?'Заявка отправлена. Вложение не удалось передать — мы свяжемся с вами.':'Заявка отправлена. Мы свяжемся с вами.';form.reset();}catch(err){status.textContent=err.message||'Не удалось отправить заявку. Позвоните нам по телефону из раздела «Контакты».';}finally{submit.disabled=false;}});

document.addEventListener('submit',function(e){
 if(e.target&&e.target.id==='lead-form'){
  e.preventDefault();e.stopImmediatePropagation();
  const s=e.target.querySelector('[data-form-status],.form-status');
  const m='Онлайн-отправка пока не подключена. Позвоните нам или напишите на alfavit_b@mail.ru.';
  if(s)s.textContent=m;else alert(m);
 }
},true);

document.addEventListener('submit',function(e){
 const f=e.target;if(!f||f.id!=='leadForm')return;
 const c=f.querySelector('#pd-consent');
 if(!c||!c.checked){e.preventDefault();alert('Для отправки заявки необходимо дать согласие на обработку персональных данных.');return;}
 f.dataset.consentAcceptedAt=new Date().toISOString();
 f.dataset.consentVersion='1.0-2026-08-20';
},true);
