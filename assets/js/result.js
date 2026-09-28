(() => {
  const RESULT_KEY = 'vocacaoPolarResult';
  const STATE_KEY = 'vocacaoPolarTestState';
  const { courses } = window.VOCACAO_DATA;
  const root = document.getElementById('result-root');

  function loadResult() {
    try { return JSON.parse(localStorage.getItem(RESULT_KEY)); } catch { return null; }
  }

  const result = loadResult();
  if (!result || !Array.isArray(result.ranked) || result.ranked.length === 0) {
    root.innerHTML = `<div class="no-result"><div><span class="eyebrow">Resultado</span><h1>Seu resultado ainda não está pronto.</h1><p>Conclua o teste para gerar o mapa de afinidades com os cursos.</p><a href="teste.html" class="button button-primary button-lg">Fazer o teste</a></div></div>`;
    return;
  }

  const ranked = result.ranked.filter(item => courses[item.code]);
  const top = ranked[0];
  const winner = courses[top.code];
  const name = (result.profile?.name || '').trim();
  const greeting = name ? `${escapeHtml(name)}, seu caminho com maior afinidade é` : 'Seu caminho com maior afinidade é';
  const initials = name ? name.split(/\s+/).slice(0,2).map(part => part[0]).join('').toUpperCase() : 'VP';
  const meta = [result.profile?.grade, result.profile?.age ? `${result.profile.age} anos` : ''].filter(Boolean).join(' • ') || 'Teste concluído';

  root.innerHTML = `
    <section class="result-hero">
      <div class="result-layout">
        <article class="result-main-card">
          <div class="result-winner">
            <div class="result-winner-copy"><span class="eyebrow">Resultado principal</span><p style="margin-bottom:8px;color:#567">${greeting}</p><h1>${winner.name}</h1><p>${winner.profile}</p></div>
            <div class="result-icon-wrap"><img src="${winner.icon}" alt="Ícone de ${winner.name}"></div>
          </div>
          <div class="result-body">
            <h2 class="result-section-title">Seu mapa de afinidades</h2>
            <div class="affinity-list">
              ${ranked.map(item => {
                const course = courses[item.code];
                return `<div class="affinity-row"><div class="affinity-name"><img src="${course.icon}" alt=""><span>${course.name}</span></div><div class="affinity-track"><div class="affinity-fill" data-width="${item.affinity}"></div></div><div class="affinity-value">${item.affinity}%</div></div>`;
              }).join('')}
            </div>
            <p class="affinity-caption">A porcentagem é uma afinidade relativa: o curso com maior pontuação no seu teste é usado como referência de 100%.</p>
            <div class="podium">
              ${ranked.slice(0,3).map((item, index) => `<div class="podium-card"><span class="podium-rank">${index + 1}º</span><h3>${courses[item.code].name}</h3><p>${courses[item.code].short}</p></div>`).join('')}
            </div>
          </div>
        </article>
        <aside class="result-side-card">
          <h2>Seu resultado</h2><p>Salve, compare os cursos e use o resultado como ponto de partida para pesquisar.</p>
          <div class="profile-chip"><div class="profile-avatar">${escapeHtml(initials)}</div><div><strong>${escapeHtml(name || 'Participante')}</strong><span>${escapeHtml(meta)}</span></div></div>
          <div class="result-actions">
            <button class="button button-primary" id="print-result">Salvar / imprimir</button>
            <button class="button button-secondary" id="copy-result">Copiar resumo</button>
            <a class="button button-secondary" href="cursos.html">Explorar cursos</a>
            <a class="button button-secondary" href="desafios.html">Abrir desafios</a>
            <button class="button button-danger" id="restart-test">Refazer teste</button>
          </div>
          <div class="side-note"><strong>Importante:</strong> este teste é uma ferramenta educacional de exploração. Ele não determina sua profissão nem substitui orientação profissional.</div>
        </aside>
      </div>
      <section class="result-detail">
        <div class="result-detail-grid">
          <div><span class="section-kicker">Por que apareceu no topo</span><h2>${winner.name}</h2><p>${winner.short}</p><div class="course-skills">${winner.skills.map(skill => `<span>${skill}</span>`).join('')}</div></div>
          <div><span class="section-kicker">Áreas para pesquisar</span><h2>Onde esse caminho pode levar</h2><ul>${winner.areas.map(area => `<li>${area}</li>`).join('')}</ul></div>
        </div>
        <div class="next-step" style="margin-top:22px"><strong>Próximo passo sugerido</strong><p>${winner.next}</p></div>
      </section>
    </section>`;

  requestAnimationFrame(() => requestAnimationFrame(() => {
    root.querySelectorAll('.affinity-fill').forEach(el => { el.style.width = `${el.dataset.width}%`; });
  }));

  document.getElementById('print-result').addEventListener('click', () => window.print());
  document.getElementById('copy-result').addEventListener('click', async event => {
    const text = buildSummary(ranked, result.profile);
    try {
      await navigator.clipboard.writeText(text);
      const old = event.currentTarget.textContent;
      event.currentTarget.textContent = 'Resumo copiado!';
      setTimeout(() => { event.currentTarget.textContent = old; }, 1800);
    } catch {
      window.prompt('Copie seu resultado:', text);
    }
  });
  document.getElementById('restart-test').addEventListener('click', () => {
    if (window.confirm('Deseja apagar o resultado atual e refazer o teste?')) {
      localStorage.removeItem(RESULT_KEY);
      localStorage.removeItem(STATE_KEY);
      window.location.href = 'teste.html';
    }
  });

  function buildSummary(items, profile) {
    const person = profile?.name ? `${profile.name}: ` : '';
    const topThree = items.slice(0,3).map((item, index) => `${index + 1}. ${courses[item.code].name} (${item.affinity}% de afinidade relativa)`).join('\n');
    return `${person}resultado do Vocação Polar\n${topThree}\n\nO resultado é indicativo e serve como ponto de partida para explorar cursos.`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }
})();
