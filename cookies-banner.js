(function() {
  if (localStorage.getItem('clicsight_cookies') === '1') return;

  var style = document.createElement('style');
  style.textContent = [
    '#ck-banner{position:fixed;bottom:20px;left:20px;z-index:99999;max-width:380px;width:calc(100% - 40px);background:#0a0a10;border:1px solid rgba(232,255,71,.25);border-radius:20px;padding:18px;box-shadow:0 8px 40px rgba(0,0,0,.6);animation:ckIn .5s cubic-bezier(.34,1.56,.64,1) forwards;}',
    '@keyframes ckIn{from{transform:translateY(120%);opacity:0;}to{transform:translateY(0);opacity:1;}}',
    '@keyframes ckOut{from{transform:translateY(0);opacity:1;}to{transform:translateY(120%);opacity:0;}}',
    '@keyframes ckFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-5px);}}',
    '#ck-banner .ck-inner{display:flex;align-items:flex-start;gap:14px;}',
    '#ck-banner .ck-astro{flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:5px;}',
    '#ck-banner .ck-emoji{font-size:36px;line-height:1;animation:ckFloat 3s ease-in-out infinite;display:block;}',
    '#ck-banner .ck-bubble{background:rgba(232,255,71,.12);border:1px solid rgba(232,255,71,.3);border-radius:100px;padding:2px 8px;font-family:Outfit,sans-serif;font-size:9px;font-weight:700;color:#e8ff47;white-space:nowrap;}',
    '#ck-banner .ck-body{flex:1;min-width:0;}',
    '#ck-banner .ck-title{font-family:Outfit,sans-serif;font-size:14px;font-weight:700;color:#f5f2ee;margin:0 0 5px;}',
    '#ck-banner .ck-desc{font-size:11px;line-height:1.6;color:rgba(245,242,238,.52);margin:0 0 12px;}',
    '#ck-banner .ck-actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}',
    '#ck-banner .ck-btn{background:#e8ff47;color:#050508;font-family:Outfit,sans-serif;font-weight:700;font-size:12px;padding:7px 18px;border-radius:100px;border:none;cursor:pointer;white-space:nowrap;}',
    '#ck-banner .ck-link{font-size:11px;color:rgba(245,242,238,.4);text-decoration:underline;text-underline-offset:2px;white-space:nowrap;}',
    '@media(max-width:480px){#ck-banner{bottom:12px;left:12px;width:calc(100% - 24px);padding:14px;border-radius:16px;}',
    '#ck-banner .ck-emoji{font-size:28px;}',
    '#ck-banner .ck-title{font-size:13px;}',
    '#ck-banner .ck-desc{font-size:11px;}}'
  ].join('');
  document.head.appendChild(style);

  var banner = document.createElement('div');
  banner.id = 'ck-banner';
  banner.innerHTML = [
    '<div class="ck-inner">',
    '<div class="ck-astro"><span class="ck-emoji">👨‍🚀</span><div class="ck-bubble">🍪 Cookies !</div></div>',
    '<div class="ck-body">',
    '<p class="ck-title">On utilise des cookies</p>',
    '<p class="ck-desc">Ce site utilise des cookies pour améliorer votre expérience. En continuant, vous acceptez leur utilisation.</p>',
    '<div class="ck-actions"><button class="ck-btn" id="ck-accept">Accepter</button><a href="mentions-legales.html" class="ck-link">En savoir plus</a></div>',
    '</div></div>'
  ].join('');
  document.body.appendChild(banner);

  document.getElementById('ck-accept').addEventListener('click', function() {
    localStorage.setItem('clicsight_cookies', '1');
    var b = document.getElementById('ck-banner');
    b.style.animation = 'ckOut .4s ease forwards';
    setTimeout(function() { b.remove(); }, 400);
  });
})();
