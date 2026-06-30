/* ============================================
   NAVEGACIÓN :
   No es scroll simple: cubre la pantalla con una
   página de papel que se desliza de derecha a
   izquierda, como pasar una hoja de manga.
============================================ */
(function () {
  const overlay     = document.getElementById('ptOverlay');
  const chapterNum   = document.getElementById('ptChapterNum');
  const navItems     = document.querySelectorAll('.m-item');
 
  const chapterMap = {
    hero: '01', about: '02',
    skills: '03', projects: '04', contact: '05'
  };
 
  let isTurning = false;
 
  function pageTurnTo(targetId) {
    if (isTurning) return;
    const target = document.getElementById(targetId);
    if (!target) return;
 
    isTurning = true;
 
    if (chapterNum) chapterNum.textContent = chapterMap[targetId] || '';
 
    // Coloca la página fuera de pantalla, a la derecha
    overlay.style.transition = 'none';
    overlay.style.transform  = 'translateX(100%)';
    overlay.classList.remove('pt-in', 'pt-out');
    overlay.getBoundingClientRect(); // fuerza reflow
 
    // La página entra (cubre la pantalla)
    overlay.classList.add('pt-in');
 
    setTimeout(() => {
      // Mientras está cubierto, saltamos a la nueva sección
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
 
      // La página continúa deslizándose hacia la izquierda
      overlay.classList.remove('pt-in');
      overlay.classList.add('pt-out');
 
      setTimeout(() => {
        overlay.classList.remove('pt-out');
        overlay.style.transform = 'translateX(100%)';
        isTurning = false;
      }, 440);
 
    }, 480);
  }
 
  navItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      pageTurnTo(item.dataset.target);
    });
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  /* Resalta el capítulo activo al hacer scroll */
  const sectionIds = ['hero', 'about', 'skills', 'projects', 'contact'];
 
  function updateActiveNav() {
    const trigger = window.scrollY + window.innerHeight * 0.38;
    let current = sectionIds[0];
 
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= trigger) current = id;
    });
 
    navItems.forEach(item => {
      const isActive = item.dataset.target === current;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  }
 
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
})();