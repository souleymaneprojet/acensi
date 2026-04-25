const menuToggle=document.querySelector('.menu-toggle');
const navLinks=document.querySelector('.nav-links');
menuToggle.addEventListener('click',()=>navLinks.classList.toggle('open'));

document.querySelectorAll('.nav-links a').forEach(link=>{
  link.addEventListener('click',()=>navLinks.classList.remove('open'));
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      if(entry.target.querySelectorAll) animateCounters(entry.target);
    }
  });
},{threshold:.15});

document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
let counted=false;
function animateCounters(scope){
  if(counted || !scope.closest('#apropos')) return;
  counted=true;
  document.querySelectorAll('.counter').forEach(counter=>{
    const target=Number(counter.dataset.target);
    let current=0;
    const step=Math.max(1,Math.ceil(target/80));
    const timer=setInterval(()=>{
      current+=step;
      if(current>=target){current=target;clearInterval(timer)}
      counter.textContent=current;
    },18);
  });
}

const topBtn=document.getElementById('topBtn');
window.addEventListener('scroll',()=>{
  topBtn.classList.toggle('show',window.scrollY>500);
  const sections=document.querySelectorAll('section, header');
  let current='accueil';
  sections.forEach(sec=>{if(window.scrollY>=sec.offsetTop-180) current=sec.id});
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.classList.toggle('active',a.getAttribute('href')==='#'+current);
  });
});
topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
