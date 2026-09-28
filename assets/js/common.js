(() => {
  const STORAGE_KEY = 'vocacaoPolarA11y';
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const links = [
    ['index.html', 'Início'],
    ['descricao.html', 'Como funciona'],
    ['cursos.html', 'Cursos'],
    ['desafios.html', 'Desafios']
  ];

  function loadSettings() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { font: 1, contrast: false, motion: false };
    } catch {
      return { font: 1, contrast: false, motion: false };
    }
  }

  function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }

  function applySettings(settings) {
    document.documentElement.style.setProperty('--font-scale', settings.font);
    document.documentElement.classList.toggle('high-contrast', settings.contrast);
    document.documentElement.classList.toggle('reduce-motion', settings.motion);
  }

  function mountHeader() {
    const host = document.querySelector('[data-site-header]');
    if (!host) return;
    host.innerHTML = `
      <header class="site-header">
        <a class="brand" href="index.html" aria-label="Vocação Polar - página inicial">
          <img src="assets/img/logo.png" alt="" class="brand-logo">
          <span class="brand-copy"><strong>Vocação Polar</strong><small>Descongele seu futuro</small></span>
        </a>
        <button class="mobile-menu" type="button" aria-label="Abrir menu" aria-expanded="false">☰</button>
        <nav class="main-nav" aria-label="Navegação principal">
          ${links.map(([href, label]) => `<a href="${href}" class="${page === href ? 'active' : ''}">${label}</a>`).join('')}
        </nav>
        <div class="header-actions">
          <button class="a11y-button" type="button" aria-label="Abrir opções de acessibilidade" aria-expanded="false">
            <img src="assets/img/acess.png" alt=""><span>Acessibilidade</span>
          </button>
          <a class="button button-primary header-test" href="teste.html">Fazer teste</a>
        </div>
      </header>
      <div class="a11y-panel" hidden>
        <div class="a11y-panel-head"><strong>Acessibilidade</strong><button type="button" class="a11y-close" aria-label="Fechar">×</button></div>
        <div class="a11y-row"><span>Tamanho do texto</span><div class="segmented"><button type="button" data-font="1">A</button><button type="button" data-font="1.15">A+</button><button type="button" data-font="1.3">A++</button></div></div>
        <label class="toggle-row"><span>Alto contraste</span><input type="checkbox" data-a11y="contrast"><i></i></label>
        <label class="toggle-row"><span>Reduzir animações</span><input type="checkbox" data-a11y="motion"><i></i></label>
        <button type="button" class="a11y-reset">Restaurar padrão</button>
      </div>`;

    const menuButton = host.querySelector('.mobile-menu');
    const nav = host.querySelector('.main-nav');
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? '×' : '☰';
    });

    const a11yButton = host.querySelector('.a11y-button');
    const panel = host.querySelector('.a11y-panel');
    const close = host.querySelector('.a11y-close');
    const settings = loadSettings();

    const sync = () => {
      panel.querySelector('[data-a11y="contrast"]').checked = settings.contrast;
      panel.querySelector('[data-a11y="motion"]').checked = settings.motion;
      panel.querySelectorAll('[data-font]').forEach(btn => btn.classList.toggle('selected', Number(btn.dataset.font) === Number(settings.font)));
    };

    const setPanel = open => {
      panel.hidden = !open;
      a11yButton.setAttribute('aria-expanded', String(open));
      if (open) panel.querySelector('.a11y-close').focus();
    };

    a11yButton.addEventListener('click', () => setPanel(panel.hidden));
    close.addEventListener('click', () => setPanel(false));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !panel.hidden) setPanel(false);
    });

    panel.querySelectorAll('[data-font]').forEach(btn => btn.addEventListener('click', () => {
      settings.font = Number(btn.dataset.font);
      applySettings(settings);
      saveSettings(settings);
      sync();
    }));

    panel.querySelector('[data-a11y="contrast"]').addEventListener('change', event => {
      settings.contrast = event.target.checked;
      applySettings(settings);
      saveSettings(settings);
    });

    panel.querySelector('[data-a11y="motion"]').addEventListener('change', event => {
      settings.motion = event.target.checked;
      applySettings(settings);
      saveSettings(settings);
    });

    panel.querySelector('.a11y-reset').addEventListener('click', () => {
      settings.font = 1;
      settings.contrast = false;
      settings.motion = false;
      applySettings(settings);
      saveSettings(settings);
      sync();
    });

    sync();
  }

  function mountFooter() {
    const host = document.querySelector('[data-site-footer]');
    if (!host) return;
    host.innerHTML = `
      <footer class="site-footer">
        <div><strong>Vocação Polar</strong><span>Um projeto de orientação vocacional educacional.</span></div>
        <nav aria-label="Links do rodapé"><a href="descricao.html">Sobre o teste</a><a href="cursos.html">Cursos</a><a href="teste.html">Começar</a></nav>
        <small>O resultado é indicativo e não substitui orientação profissional.</small>
      </footer>`;
  }

  function makeSnow() {
    if (document.documentElement.classList.contains('reduce-motion')) return;
    const layer = document.createElement('div');
    layer.className = 'snow-layer';
    layer.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 28; i++) {
      const dot = document.createElement('i');
      dot.style.setProperty('--x', `${Math.random() * 100}%`);
      dot.style.setProperty('--size', `${3 + Math.random() * 7}px`);
      dot.style.setProperty('--duration', `${8 + Math.random() * 12}s`);
      dot.style.setProperty('--delay', `${-Math.random() * 18}s`);
      dot.style.setProperty('--drift', `${-30 + Math.random() * 60}px`);
      layer.appendChild(dot);
    }
    document.body.prepend(layer);
  }

  function revealOnScroll() {
    const targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;
    if (!('IntersectionObserver' in window) || document.documentElement.classList.contains('reduce-motion')) {
      targets.forEach(el => el.classList.add('revealed'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach(el => observer.observe(el));
  }

  applySettings(loadSettings());
  document.addEventListener('DOMContentLoaded', () => {
    mountHeader();
    mountFooter();
    makeSnow();
    revealOnScroll();
    document.body.classList.add('page-ready');
  });
})();
