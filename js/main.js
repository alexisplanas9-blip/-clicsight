// ── CURSOR ──
const cur=document.getElementById('cur');
let mx=0,my=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  cur.style.left=mx+'px';cur.style.top=my+'px';
});
// Star spins and grows on hover
document.querySelectorAll('a,button,.ps-cta,.metric,.testi,.step,.faq-q').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    cur.style.transform='translate(-50%,-50%) rotate(45deg) scale(1.6)';
    cur.style.fontSize='22px';
  });
  el.addEventListener('mouseleave',()=>{
    cur.style.transform='translate(-50%,-50%) rotate(0deg) scale(1)';
    cur.style.fontSize='18px';
  });
});

// ── STARS ──
const sc=document.getElementById('stars'),sctx=sc.getContext('2d');
let SW,SH,starList=[];
function rsz(){SW=sc.width=window.innerWidth;SH=sc.height=window.innerHeight;initS()}
function initS(){
  starList=[];
  [{n:350,rMin:.2,rMax:.5,a:.4,col:'255,255,255'},{n:180,rMin:.4,rMax:.9,a:.65,col:'255,255,255'},
   {n:60,rMin:.8,rMax:1.4,a:.9,col:'255,255,255'},{n:20,rMin:1.2,rMax:2,a:1,col:'220,200,255'},
   {n:8,rMin:1.5,rMax:2.5,a:1,col:'200,240,255'}].forEach(l=>{
    for(let i=0;i<l.n;i++) starList.push({
      x:Math.random()*SW,y:Math.random()*SH,
      r:l.rMin+Math.random()*(l.rMax-l.rMin),
      ba:l.a*(.5+Math.random()*.5),col:l.col,
      ts:.003+Math.random()*.008,to:Math.random()*Math.PI*2,
      px:.02+Math.random()*.05
    });
  });
}
let smx=0,smy=0,sT=0,shooters=[];
document.addEventListener('mousemove',e=>{smx=(e.clientX/window.innerWidth-.5)*2;smy=(e.clientY/window.innerHeight-.5)*2});
function starLoop(){
  sT+=.016;sctx.clearRect(0,0,SW,SH);
  starList.forEach(s=>{
    const tw=Math.sin(sT*s.ts*60+s.to),a=s.ba*(.7+.3*tw);
    const ox=smx*s.px*35,oy=smy*s.px*35+window.scrollY*s.px*.2;
    const px=(s.x+ox+SW)%SW,py=(s.y+oy+SH)%SH;
    if(s.r>1.2){const g=sctx.createRadialGradient(px,py,0,px,py,s.r*4);g.addColorStop(0,`rgba(${s.col},${a})`);g.addColorStop(1,`rgba(${s.col},0)`);sctx.beginPath();sctx.arc(px,py,s.r*4,0,Math.PI*2);sctx.fillStyle=g;sctx.fill()}
    sctx.beginPath();sctx.arc(px,py,s.r,0,Math.PI*2);sctx.fillStyle=`rgba(${s.col},${a})`;sctx.fill();
  });
  if(Math.random()<.004) shooters.push({x:Math.random()*SW,y:Math.random()*SH*.3,vx:12,vy:7,life:0,max:35});
  shooters=shooters.filter(s=>s.life<s.max);
  shooters.forEach(s=>{
    const a=(1-s.life/s.max)*.9,g=sctx.createLinearGradient(s.x-s.vx*5,s.y-s.vy*5,s.x,s.y);
    g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(1,`rgba(255,255,255,${a})`);
    sctx.beginPath();sctx.moveTo(s.x-s.vx*5,s.y-s.vy*5);sctx.lineTo(s.x,s.y);
    sctx.strokeStyle=g;sctx.lineWidth=1.5;sctx.stroke();
    s.x+=s.vx;s.y+=s.vy;s.life++;
  });
  requestAnimationFrame(starLoop);
}
rsz();window.addEventListener('resize',rsz);starLoop();

// ── TYPEWRITER ──
const msg="Salut astronaute 👋 Prêt à explorer l'univers du web et de la communication ? Votre voyage commence ici.";
let ti=0;
const typed=document.getElementById('typed');
function typeNext(){
  if(ti<msg.length){typed.textContent=msg.slice(0,++ti);setTimeout(typeNext,ti<20?80:36)}
  else document.getElementById('btn-launch').classList.add('show');
}
setTimeout(typeNext,1800);

// ── ROCKET ──
const rc=document.getElementById('rc');
const rctx=rc.getContext('2d');
function rsrc(){rc.width=window.innerWidth;rc.height=window.innerHeight}
rsrc();window.addEventListener('resize',rsrc);

let rcx=0,rcy=0,rtx=0,rty=0,rAng=0,rOn=false,flameT=0;
const TRAIL=[],MAX_T=120;

function drawRocket(cx,cy,ang){
  rctx.save();
  rctx.translate(cx,cy);
  rctx.rotate(ang);
  // Corps
  rctx.beginPath();
  rctx.moveTo(0,-22);
  rctx.bezierCurveTo(8,-10,8,6,6,14);
  rctx.lineTo(-6,14);
  rctx.bezierCurveTo(-8,6,-8,-10,0,-22);
  rctx.fillStyle='#f5f2ee';rctx.fill();
  // Hublot
  rctx.beginPath();rctx.arc(0,-4,4,0,Math.PI*2);
  rctx.fillStyle='rgba(232,255,71,.85)';rctx.fill();
  // Aileron G
  rctx.beginPath();rctx.moveTo(-6,8);rctx.lineTo(-14,18);rctx.lineTo(-6,14);
  rctx.closePath();rctx.fillStyle='#e8ff47';rctx.fill();
  // Aileron D
  rctx.beginPath();rctx.moveTo(6,8);rctx.lineTo(14,18);rctx.lineTo(6,14);
  rctx.closePath();rctx.fillStyle='#e8ff47';rctx.fill();
  // Flamme
  const fh=16+Math.sin(flameT*.4)*7,fw=5+Math.sin(flameT*.3)*2;
  const fg=rctx.createLinearGradient(0,14,0,14+fh);
  fg.addColorStop(0,'rgba(255,220,80,1)');fg.addColorStop(.5,'rgba(255,110,30,.9)');fg.addColorStop(1,'rgba(255,50,0,0)');
  rctx.beginPath();rctx.moveTo(-fw,14);rctx.quadraticCurveTo(0,14+fh*.6,0,14+fh);
  rctx.quadraticCurveTo(0,14+fh*.6,fw,14);rctx.closePath();
  rctx.fillStyle=fg;rctx.fill();
  rctx.restore();
}

function getTargetY(){
  const introH=document.getElementById('intro').offsetHeight;
  const maxS=document.body.scrollHeight-window.innerHeight;
  const sy=window.scrollY;
  // Stay fixed at center until we're fully past the intro section
  if(sy < introH * .85) return window.innerHeight * .42;
  // Only start moving once deep into planet sections
  const prog=Math.min(1,Math.max(0,(sy - introH*.85)/(maxS - introH*.85)));
  return window.innerHeight*(.15 + prog*.70);
}

function launch(){
  if(rOn)return;
  rOn=true;
  const btn=document.getElementById('btn-launch');
  const br=btn.getBoundingClientRect();
  // Start from button position
  rcx=br.left+br.width/2;
  rcy=br.top+br.height/2;
  // Stay at center of screen — no scroll movement
  rtx=window.innerWidth*.5;
  rty=window.innerHeight*.42;
  btn.style.display='none';
  const chat=document.getElementById('chat');
  chat.style.transition='opacity .5s';chat.style.opacity='0';
  rc.classList.add('on');
  // Scroll to planets after rocket animation settles
  setTimeout(()=>{
    const first=document.querySelector('.planet-section');
    if(first)first.scrollIntoView({behavior:'smooth',block:'start'});
  },1800);
}

window.addEventListener('scroll',()=>{if(rOn){rtx=window.innerWidth*.5;rty=getTargetY()}},{passive:true});

function animR(){
  flameT++;
  if(rOn){
    rtx=window.innerWidth*.5;
    const dy=rty-rcy,dx=rtx-rcx;
    rcx+=dx*.065;rcy+=dy*.065;
    rAng=Math.atan2(dy,dx)+Math.PI*.5;
    TRAIL.push({x:rcx,y:rcy});
    if(TRAIL.length>MAX_T)TRAIL.shift();
    rctx.clearRect(0,0,rc.width,rc.height);
    if(TRAIL.length>2){
      for(let i=1;i<TRAIL.length;i++){
        const p0=TRAIL[i-1],p1=TRAIL[i],age=i/TRAIL.length;
        rctx.beginPath();rctx.moveTo(p0.x,p0.y);rctx.lineTo(p1.x,p1.y);
        rctx.strokeStyle=`rgba(232,255,71,${age*age*.55})`;
        rctx.lineWidth=age*4;rctx.lineCap='round';rctx.stroke();
      }
      const last=TRAIL[TRAIL.length-1];
      const g=rctx.createRadialGradient(last.x,last.y,0,last.x,last.y,18);
      g.addColorStop(0,'rgba(255,160,40,.28)');g.addColorStop(1,'rgba(255,160,40,0)');
      rctx.beginPath();rctx.arc(last.x,last.y,18,0,Math.PI*2);rctx.fillStyle=g;rctx.fill();
    }
    drawRocket(rcx,rcy,rAng);
  } else {
    rctx.clearRect(0,0,rc.width,rc.height);
  }
  requestAnimationFrame(animR);
}
animR();

// ── PLANET REVEAL ──
const planetSections=document.querySelectorAll('.planet-section');
const psObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelector('.ps-left')?.classList.add('in');
      e.target.querySelector('.ps-right')?.classList.add('in');
    }
  });
},{threshold:.12});
planetSections.forEach(s=>psObs.observe(s));

// ── SCROLL REVEAL ──
const revObs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{if(e.isIntersecting)setTimeout(()=>e.target.classList.add('in'),i*60)});
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

// ── COUNTERS ──
const cntObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting&&!e.target.dataset.done){
      e.target.dataset.done=1;
      const tgt=+e.target.dataset.target,suf=e.target.dataset.suffix||'';
      let cur=0;const step=tgt/60;
      const iv=setInterval(()=>{cur=Math.min(cur+step,tgt);e.target.textContent=Math.round(cur)+suf;if(cur>=tgt)clearInterval(iv)},16);
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


// ── BURGER MENU ──
function toggleMenu(){
  document.getElementById('mobile-menu').classList.toggle('open');
}

// ── NAV ──
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{
  nav.style.background=window.scrollY>50?'rgba(5,5,8,.95)':'rgba(5,5,8,.65)';
});