/* ============================================
   PARALLAX — profundidad del bosque, muy calmado
============================================ */
(function () {
  const heroEl      = document.getElementById('hero');
  const heroContent = document.getElementById('heroContent');
  const pL1 = document.getElementById('pL1');
  const pL2 = document.getElementById('pL2');
  const pL3 = document.getElementById('pL3');
 
  let rafId = null;
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
 
  document.addEventListener('mousemove', e => {
    if (window.innerWidth < 768 || !heroEl) return;
    const rect = heroEl.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    targetX = (e.clientX / window.innerWidth  - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    if (!rafId) rafId = requestAnimationFrame(animParallax);
  });
  function animParallax() {
    // Interpolación muy lenta — sensación de respiración, no de máquina
    currentX += (targetX - currentX) * 0.038;
    currentY += (targetY - currentY) * 0.038;
 
    if (pL1) pL1.style.transform = `translate(${currentX * 7}px, ${currentY * 3.5}px)`;
    if (pL2) pL2.style.transform = `translate(${currentX * 15}px, ${currentY * 7.5}px)`;
    if (pL3) pL3.style.transform = `translate(${currentX * 22}px, ${currentY * 11}px)`;
 
    const drift = Math.abs(targetX - currentX) + Math.abs(targetY - currentY);
    rafId = drift > 0.001 ? requestAnimationFrame(animParallax) : null;
  }
  // El contenido del hero flota lentamente hacia arriba al hacer scroll
  window.addEventListener('scroll', () => {
    if (!heroContent) return;
    const s = window.scrollY;
    const v = window.innerHeight;
    if (s < v) {
      heroContent.style.transform = `translateY(${s * 0.17}px)`;
      heroContent.style.opacity   = Math.max(0, 1 - (s / v) * 1.38);
    }
  }, { passive: true });
  /* Barra de progreso de lectura */
  const progressBar = document.getElementById('readingProgress');
  function updateProgress() {
    const total = document.body.scrollHeight - window.innerHeight;
    const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
})();