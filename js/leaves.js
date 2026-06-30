/* ============================================
   HOJAS — flotan en el hero y caen lentamente
   sobre toda la página, todo el tiempo.
============================================ */
(function () {
  /* Hojas flotantes dentro del SVG del hero */
  const heroLeaves = document.querySelectorAll('#floatLeaves ellipse');
  heroLeaves.forEach((leaf, i) => {
    const dur   = 4.2 + i * 0.65;
    const delay = i * 0.55;
    const amp   = 5 + (i % 3) * 3;
    let t = delay;
    (function tick() {
      t += 0.016;
      const dy = Math.sin(t * (2 * Math.PI / dur)) * amp;
      const dx = Math.cos(t * (2 * Math.PI / (dur * 1.38))) * (amp * 0.44);
      const base = leaf.getAttribute('transform') || '';
      const clean = base.replace(/\s*translate\([^)]*\)/g, '');
      leaf.setAttribute('transform', clean + ` translate(${dx.toFixed(2)},${dy.toFixed(2)})`);
      requestAnimationFrame(tick);
    })();
  });
 
  /* Hojas ambientales que caen sobre toda la página */
  const container = document.getElementById('leafAmbient');
  if (!container) return;
 
  const svgNS = 'http://www.w3.org/2000/svg';
  const shapes = [
    'M6,0 Q12,4 10,10 Q6,14 2,10 Q-2,4 6,0Z',
    'M7,0 Q14,5 11,12 Q7,16 3,11 Q-1,5 7,0Z',
    'M5,0 Q10,3 8.5,9 Q5,12 1.5,9 Q-1,3 5,0Z',
    'M8,0 Q15,6 12,13 Q8,17 3,12 Q-1,5 8,0Z',
  ];
  const colors = ['#9a8840', '#7a6a30', '#b09848', '#8a7830', '#a08038'];
 
  for (let i = 0; i < 11; i++) {
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '15');
    svg.setAttribute('height', '17');
    svg.setAttribute('viewBox', '-3 -2 18 20');
    svg.style.overflow = 'visible';
 
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', shapes[i % shapes.length]);
    path.setAttribute('fill', colors[i % colors.length]);
    svg.appendChild(path);
 
    const wrap = document.createElement('div');
    wrap.className = 'la';
 
    const left  = 4 + Math.random() * 90;
    const dur   = 20 + Math.random() * 24;
    const delay = Math.random() * 36;
    const op    = 0.10 + Math.random() * 0.14;
    const rA    = (Math.random() * 160 - 80)  + 'deg';
    const rB    = (Math.random() * 340 - 170) + 'deg';
    const dA    = (Math.random() * 70  - 35)  + 'px';
    const dB    = (Math.random() * 110 - 55)  + 'px';
 
    wrap.style.cssText = [
      `left:${left}%`,
      `top:-20px`,
      `--op:${op}`,
      `--rA:${rA}`,
      `--rB:${rB}`,
      `--dA:${dA}`,
      `--dB:${dB}`,
      `animation-duration:${dur}s`,
      `animation-delay:-${delay}s`,
    ].join(';');
 
    wrap.appendChild(svg);
    container.appendChild(wrap);
  }
})();