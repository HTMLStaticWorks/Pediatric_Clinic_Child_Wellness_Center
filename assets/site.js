document.addEventListener('click',e=>{
 const m=e.target.closest('[data-menu]');
 if(m){document.getElementById('mobileNav')?.classList.toggle('open');return}
 const close=e.target.closest('[data-close-modal]');
 if(close){document.getElementById('modalRoot').innerHTML='';return}
 const faq=e.target.closest('.faq-q');
 if(faq){faq.closest('.faq-item')?.classList.toggle('open');return}
});
function toast(message){
 const el=document.getElementById('toast');
 if(!el)return;
 el.textContent=message;el.classList.add('show');
 clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>el.classList.remove('show'),2600);
}
