
// ── CURSOR ──
const cur=document.getElementById('cur'),curR=document.getElementById('cur-r');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'});
(function animR(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;curR.style.left=rx+'px';curR.style.top=ry+'px';requestAnimationFrame(animR)})();
document.querySelectorAll('a,button,.ps-cta,.metric,.testi,.step,.faq-q').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.width='18px';cur.style.height='18px';curR.style.width='55px';curR.style.height='55px'});
  el.addEventListener('mouseleave',()=>{cur.style.width='10px';cur.style.height='10px';curR.style.width='36px';curR.style.height='36px'});
});

// ── STARS CANVAS ──
const sc=document.getElementById('stars'),sctx=sc.getContext('2d');
let SW,SH,stars=[];
function rsz(){SW=sc.width=window.innerWidth;SH=sc.height=window.innerHeight;initStars()}
function initStars(){
  stars=[];
  const layers=[{n:350,rMin:.2,rMax:.5,a:.4,col:'255,255,255'},{n:180,rMin:.4,rMax:.9,a:.65,col:'255,255,255'},{n:60,rMin:.8,rMax:1.4,a:.9,col:'255,255,255'},{n:20,rMin:1.2,rMax:2,a:1,col:'220,200,255'},{n:8,rMin:1.5,rMax:2.5,a:1,col:'200,240,255'}];
  layers.forEach(l=>{for(let i=0;i<l.n;i++){stars.push({x:Math.random()*SW,y:Math.random()*SH,r:l.rMin+Math.random()*(l.rMax-l.rMin),ba:l.a*(.5+Math.random()*.5),col:l.col,ts:.003+Math.random()*.008,to:Math.random()*Math.PI*2,px:.02+Math.random()*.05})}})
}
let smx=0,smy=0,scrollY=0,st=0;
document.addEventListener('mousemove',e=>{smx=(e.clientX/window.innerWidth-.5)*2;smy=(e.clientY/window.innerHeight-.5)*2});
window.addEventListener('scroll',()=>scrollY=window.scrollY,{passive:true});
function starLoop(){
  st+=.016;sctx.clearRect(0,0,SW,SH);
  stars.forEach(s=>{
    const tw=Math.sin(st*s.ts*60+s.to),a=s.ba*(.7+.3*tw);
    const ox=smx*s.px*35,oy=smy*s.px*35+scrollY*s.px*.25;
    const px=(s.x+ox+SW)%SW,py=(s.y+oy+SH)%SH;
    if(s.r>1.2){const g=sctx.createRadialGradient(px,py,0,px,py,s.r*4);g.addColorStop(0,`rgba(${s.col},${a})`);g.addColorStop(1,`rgba(${s.col},0)`);sctx.beginPath();sctx.arc(px,py,s.r*4,0,Math.PI*2);sctx.fillStyle=g;sctx.fill()}
    sctx.beginPath();sctx.arc(px,py,s.r,0,Math.PI*2);sctx.fillStyle=`rgba(${s.col},${a})`;sctx.fill();
  });
  // Shooting stars
  if(Math.random()<.004)shooters.push({x:Math.random()*SW,y:Math.random()*SH*.35,vx:Math.cos(Math.PI/5)*12,vy:Math.sin(Math.PI/5)*12,life:0,max:35});
  shooters=shooters.filter(s=>s.life<s.max);
  shooters.forEach(s=>{
    const a=(1-s.life/s.max)*.9;
    const g=sctx.createLinearGradient(s.x-s.vx*6,s.y-s.vy*6,s.x,s.y);
    g.addColorStop(0,`rgba(255,255,255,0)`);g.addColorStop(1,`rgba(255,255,255,${a})`);
    sctx.beginPath();sctx.moveTo(s.x-s.vx*6,s.y-s.vy*6);sctx.lineTo(s.x,s.y);
    sctx.strokeStyle=g;sctx.lineWidth=1.5;sctx.stroke();
    s.x+=s.vx;s.y+=s.vy;s.life++;
  });
  requestAnimationFrame(starLoop);
}
let shooters=[];
rsz();window.addEventListener('resize',rsz);
starLoop();

// ── TYPEWRITER ──
const msg = "Salut astronaute 👋 Prêt à explorer l'univers du web et de la communication ? Votre voyage commence ici.";
let ti=0;
const typed=document.getElementById('typed');
function typeNext(){
  if(ti<msg.length){typed.textContent=msg.slice(0,++ti);setTimeout(typeNext,ti<20?80:38)}
  else{document.getElementById('scroll-cta').classList.add('show')}
}
setTimeout(typeNext,1800);

// ══════════════════════════════════════
//  ROCKET — dessinée sur canvas, suit le scroll
// ══════════════════════════════════════
const rocketCanvas = document.getElementById('rocket-canvas');
const rctx = rocketCanvas.getContext('2d');

function resizeRC(){
  rocketCanvas.width  = window.innerWidth;
  rocketCanvas.height = window.innerHeight;
}
resizeRC();
window.addEventListener('resize', resizeRC);

// État
let rcx = 0, rcy = 0;       // position actuelle (pixels)
let targetRX = 0, targetRY = 0; // position cible
let rocketLaunched = false;
let flameT = 0;
const TRAIL = [];
const MAX_TRAIL = 120;

// ── Dessiner la fusée sur canvas ──
function drawRocket(ctx, x, y, angle){
  // angle = direction de déplacement en radians
  // La fusée pointe dans la direction du mouvement
  // La flamme est à l'opposé

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  // Corps fusée
  ctx.beginPath();
  ctx.moveTo(0, -22);       // nez
  ctx.bezierCurveTo(8, -10, 8, 6, 6, 14);
  ctx.lineTo(-6, 14);
  ctx.bezierCurveTo(-8, 6, -8, -10, 0, -22);
  ctx.fillStyle = '#f5f2ee';
  ctx.fill();

  // Hublot
  ctx.beginPath();
  ctx.arc(0, -4, 4, 0, Math.PI*2);
  ctx.fillStyle = 'rgba(232,255,71,.8)';
  ctx.fill();

  // Ailerons gauche
  ctx.beginPath();
  ctx.moveTo(-6, 8);
  ctx.lineTo(-14, 18);
  ctx.lineTo(-6, 14);
  ctx.closePath();
  ctx.fillStyle = '#e8ff47';
  ctx.fill();

  // Ailerons droite
  ctx.beginPath();
  ctx.moveTo(6, 8);
  ctx.lineTo(14, 18);
  ctx.lineTo(6, 14);
  ctx.closePath();
  ctx.fillStyle = '#e8ff47';
  ctx.fill();

  // Flamme (scintille)
  const flameH = 18 + Math.sin(flameT * 0.4) * 6;
  const flameW = 5 + Math.sin(flameT * 0.3) * 2;
  const flameGrd = ctx.createLinearGradient(0, 14, 0, 14 + flameH);
  flameGrd.addColorStop(0, 'rgba(255,220,80,1)');
  flameGrd.addColorStop(0.4, 'rgba(255,120,30,.9)');
  flameGrd.addColorStop(1, 'rgba(255,60,0,0)');
  ctx.beginPath();
  ctx.moveTo(-flameW, 14);
  ctx.quadraticCurveTo(0, 14 + flameH * 0.6, 0, 14 + flameH);
  ctx.quadraticCurveTo(0, 14 + flameH * 0.6, flameW, 14);
  ctx.closePath();
  ctx.fillStyle = flameGrd;
  ctx.fill();

  // Halo glow
  const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 28);
  glow.addColorStop(0, 'rgba(232,255,71,.08)');
  glow.addColorStop(1, 'rgba(232,255,71,0)');
  ctx.beginPath();
  ctx.arc(0, 0, 28, 0, Math.PI*2);
  ctx.fillStyle = glow;
  ctx.fill();

  ctx.restore();
}

// ── Calcul scroll → position Y cible ──
function getTargetY(){
  const introH    = document.getElementById('intro').offsetHeight;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const sy        = window.scrollY;
  if(sy <= 0) return window.innerHeight * .5;
  const progress = Math.min(1, Math.max(0, (sy - introH * .2) / (maxScroll - introH * .2)));
  // Descend de 12% en haut à 85% en bas
  return window.innerHeight * (.12 + progress * .73);
}

// ── Click Embarquer ──
function embarquer(){
  if(rocketLaunched) return;
  rocketLaunched = true;

  // Récupère la position exacte du bouton
  const btn = document.getElementById('scroll-cta');
  const btnRect = btn.getBoundingClientRect();
  const startX = btnRect.left + btnRect.width / 2;
  const startY = btnRect.top  + btnRect.height / 2;

  // Cache éléments intro
  btn.style.display = 'none';
  const bubble = document.getElementById('chat-bubble');
  bubble.style.transition = 'opacity .4s, transform .4s';
  bubble.style.opacity = '0';
  document.getElementById('rocket').style.transition = 'opacity .3s';
  document.getElementById('rocket').style.opacity = '0';

  // Fusée démarre depuis le bouton
  rcx = startX;
  rcy = startY;
  targetRX = window.innerWidth * .5;
  targetRY = window.innerHeight * .5;

  rocketCanvas.classList.add('visible');

  // Scroll vers planètes après 1.4s
  setTimeout(()=>{
    const first = document.querySelector('.planet-section');
    if(first) first.scrollIntoView({ behavior:'smooth', block:'start' });
  }, 1400);
}

// ── Boucle RAF ──
let lastRcy = 0;
function animRocket(){
  flameT++;

  if(rocketLaunched){
    // Cible X = toujours centre
    targetRX = window.innerWidth * .5;
    // Cible Y = dépend du scroll
    targetRY = getTargetY();

    // Interpolation
    rcx += (targetRX - rcx) * .07;
    rcy += (targetRY - rcy) * .06;

    // Angle : direction du mouvement
    const dx = targetRX - rcx;
    const dy = targetRY - rcy;
    // angle=0 → pointe vers le haut. On tourne selon dy
    // Fusée descend → tête en bas → angle = PI (180°)
    // Fusée monte  → tête en haut → angle = 0
    const movingDown = (rcy - lastRcy) > 0.3;
    const movingUp   = (rcy - lastRcy) < -0.3;
    let angle = Math.PI * .5; // 90° = pointe vers la droite par défaut
    // 🚀 pointe vers le bas quand elle descend
    angle = Math.atan2(dy, dx) + Math.PI * .5;

    lastRcy = rcy;

    // Trainée
    TRAIL.push({x: rcx, y: rcy});
    if(TRAIL.length > MAX_TRAIL) TRAIL.shift();

    // Clear canvas
    rctx.clearRect(0, 0, rocketCanvas.width, rocketCanvas.height);

    // Dessiner trainée
    if(TRAIL.length > 2){
      for(let i = 1; i < TRAIL.length; i++){
        const p0 = TRAIL[i-1], p1 = TRAIL[i];
        const age = i / TRAIL.length;
        rctx.beginPath();
        rctx.moveTo(p0.x, p0.y);
        rctx.lineTo(p1.x, p1.y);
        rctx.strokeStyle = `rgba(232,255,71,${age * age * .6})`;
        rctx.lineWidth   = age * 4;
        rctx.lineCap     = 'round';
        rctx.stroke();
      }
      // Halo en bout de trainée
      const last = TRAIL[TRAIL.length - 1];
      const g = rctx.createRadialGradient(last.x, last.y, 0, last.x, last.y, 20);
      g.addColorStop(0, 'rgba(255,160,40,.3)');
      g.addColorStop(1, 'rgba(255,160,40,0)');
      rctx.beginPath(); rctx.arc(last.x, last.y, 20, 0, Math.PI*2);
      rctx.fillStyle = g; rctx.fill();
    }

    // Dessiner fusée
    drawRocket(rctx, rcx, rcy, angle);
  } else {
    rctx.clearRect(0, 0, rocketCanvas.width, rocketCanvas.height);
  }

  requestAnimationFrame(animRocket);
}
animRocket();

// ── PLANET SECTION REVEAL ──
const planetSections = document.querySelectorAll('.planet-section');
const psObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.ps-top,.ps-img-wrap,.ps-text').forEach(el=>el.classList.add('in'));
    }
  });
},{threshold:.12});
planetSections.forEach(s=>psObs.observe(s));

// ── SCROLL REVEAL ──
const revObs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{if(e.isIntersecting)setTimeout(()=>e.target.classList.add('visible'),i*70)});
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

// ── COUNTERS ──
const cntObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting&&!e.target.dataset.done){
      e.target.dataset.done=1;
      const target=+e.target.dataset.target,suffix=e.target.dataset.suffix||'';
      let cur=0;const step=target/60;
      const iv=setInterval(()=>{cur=Math.min(cur+step,target);e.target.textContent=Math.round(cur)+suffix;if(cur>=target)clearInterval(iv)},16);
    }
  });
},{threshold:.5});
document.querySelectorAll('[data-target]').forEach(m=>cntObs.observe(m));

// ── FAQ ──
document.querySelectorAll('.faq-q').forEach(q=>{
  q.addEventListener('click',()=>{
    const item=q.parentElement,isOpen=item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
    if(!isOpen)item.classList.add('open');
  });
});

// ── NAV ──
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{nav.style.background=window.scrollY>50?'rgba(5,5,8,.92)':'rgba(5,5,8,.6)'});
