document.addEventListener('click',e=>{
 const m=e.target.closest('[data-menu]');
 if(m){document.getElementById('mobileNav')?.classList.toggle('open');return}
 const close=e.target.closest('[data-close-modal]');
 if(close){document.getElementById('modalRoot').innerHTML='';return}
 const faq=e.target.closest('.faq-q');
 if(faq){faq.closest('.faq-item')?.classList.toggle('open');return}
 const passToggle=e.target.closest('.password-toggle');
 if(passToggle){
  const wrap=passToggle.closest('.password-wrap');
  const input=wrap?wrap.querySelector('input'):null;
  if(input){
   const isPass=input.type==='password';
   input.type=isPass?'text':'password';
   passToggle.textContent=isPass?'🙈':'👁️';
  }
  return;
 }
 const forgot=e.target.closest('[data-action="forgotPass"]');
 if(forgot){
  e.preventDefault();
  toast('Password reset link sent to your email (demo mode).');
  return;
 }
});
function toast(message){
 const el=document.getElementById('toast');
 if(!el)return;
 el.textContent=message;el.classList.add('show');
 clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>el.classList.remove('show'),2600);
}
