
/* ============================================
   FORMULARIO DE CONTACTO
============================================ */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
 
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = 'Enviado &nbsp;✓';
    btn.style.background = 'var(--forest)';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3200);
  });
 
  /* Skip link de accesibilidad */
  document.addEventListener('keydown', e => {
    if (e.key === 'Tab' && !document.querySelector('.skip-link')) {
      const skip = document.createElement('a');
      skip.className = 'skip-link';
      skip.href = '#about';
      skip.textContent = 'Saltar al contenido';
      skip.style.cssText =
        'position:fixed;top:8px;left:8px;z-index:9999;padding:8px 14px;' +
        'background:var(--wood);color:#f7f2ea;font-size:13px;text-decoration:none;';
      document.body.prepend(skip);
    }
  });
})();
 