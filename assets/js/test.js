(() => {
  const { questions, courses } = window.VOCACAO_DATA;
  const STATE_KEY = 'vocacaoPolarTestState';
  const RESULT_KEY = 'vocacaoPolarResult';
  const root = document.getElementById('test-root');
  const progressBar = document.getElementById('test-progress');
  const progressText = document.getElementById('progress-text');
  const progressPercent = document.getElementById('progress-percent');
  const exitButton = document.getElementById('test-exit');

  const defaultState = () => ({ step: 'intro', questionIndex: 0, answers: [], profile: {}, updatedAt: Date.now() });

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STATE_KEY));
      if (!parsed || !Array.isArray(parsed.answers)) return defaultState();
      parsed.questionIndex = Math.max(0, Math.min(Number(parsed.questionIndex) || 0, questions.length - 1));
      return { ...defaultState(), ...parsed };
    } catch {
      return defaultState();
    }
  }

  let state = loadState();

  function persist() {
    state.updatedAt = Date.now();
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  }

  function setProgress(index = 0) {
    const answered = Math.min(state.answers.filter(v => Number.isInteger(v)).length, questions.length);
    const pct = Math.round((answered / questions.length) * 100);
    progressBar.style.width = `${pct}%`;
    progressText.textContent = state.step === 'quiz' || state.step === 'transition' ? `Questão ${Math.min(index + 1, questions.length)} de ${questions.length}` : 'Teste vocacional';
    progressPercent.textContent = `${pct}%`;
  }

  function clearProgress() {
    progressBar.style.width = '0%';
    progressText.textContent = 'Teste vocacional';
    progressPercent.textContent = '0%';
  }

  function renderIntro() {
    state.step = 'intro';
    persist();
    clearProgress();
    const hasProgress = state.answers.length > 0 && state.answers.length < questions.length;
    root.innerHTML = `
      <div class="intro-grid test-enter">
        <div class="intro-copy">
          <span class="eyebrow">Orientação vocacional</span>
          <h1>Descubra caminhos que combinam com você.</h1>
          <p>Um teste interativo com situações do dia a dia para comparar sua afinidade com os cursos da Vocação Polar.</p>
          <div class="intro-points">
            <div class="intro-point"><i>✓</i><span>${questions.length} perguntas divididas em 3 etapas.</span></div>
            <div class="intro-point"><i>✓</i><span>Resultado com 3 cursos de maior afinidade.</span></div>
            <div class="intro-point"><i>✓</i><span>Seu progresso fica salvo neste navegador.</span></div>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:10px">
            ${hasProgress ? '<button class="button button-primary button-lg" id="resume-test">Continuar teste</button><button class="button button-secondary button-lg" id="new-test">Recomeçar</button>' : '<button class="button button-primary button-lg" id="start-test">Começar agora</button>'}
          </div>
        </div>
        <div class="intro-art"><img src="assets/img/urso.png" alt="Mascote urso da Vocação Polar"></div>
      </div>`;

    document.getElementById('start-test')?.addEventListener('click', () => renderProfile());
    document.getElementById('resume-test')?.addEventListener('click', () => {
      state.step = 'quiz';
      state.questionIndex = Math.min(state.answers.length, questions.length - 1);
      persist();
      renderQuestion();
    });
    document.getElementById('new-test')?.addEventListener('click', () => {
      state = defaultState();
      localStorage.removeItem(RESULT_KEY);
      persist();
      renderProfile();
    });
  }

  function renderProfile() {
    state.step = 'profile';
    persist();
    clearProgress();
    const p = state.profile || {};
    root.innerHTML = `
      <div class="test-card-inner test-enter">
        <form class="profile-form" id="profile-form">
          <span class="eyebrow">Antes de começar</span>
          <h1>Seu teste, do seu jeito.</h1>
          <p>Os campos ajudam a personalizar a experiência. Nome, escola e idade ficam salvos somente neste navegador nesta versão.</p>
          <div class="form-grid">
            <div class="form-field full"><label for="name">Como quer ser chamado?</label><input id="name" name="name" autocomplete="name" maxlength="60" placeholder="Seu nome ou apelido" value="${escapeHtml(p.name || '')}"></div>
            <div class="form-field"><label for="age">Idade</label><input id="age" name="age" type="number" inputmode="numeric" min="10" max="99" placeholder="Ex.: 17" value="${escapeHtml(p.age || '')}"></div>
            <div class="form-field"><label for="grade">Série/etapa</label><select id="grade" name="grade"><option value="">Prefiro não informar</option><option ${p.grade === '9º ano' ? 'selected' : ''}>9º ano</option><option ${p.grade === '1º ano EM' ? 'selected' : ''}>1º ano EM</option><option ${p.grade === '2º ano EM' ? 'selected' : ''}>2º ano EM</option><option ${p.grade === '3º ano EM' ? 'selected' : ''}>3º ano EM</option><option ${p.grade === 'Outro' ? 'selected' : ''}>Outro</option></select></div>
            <div class="form-field full"><label for="school">Escola <span style="font-weight:500;color:#7b8997">(opcional)</span></label><input id="school" name="school" maxlength="90" placeholder="Nome da escola" value="${escapeHtml(p.school || '')}"><span class="form-help">Você pode deixar em branco e fazer o teste normalmente.</span></div>
          </div>
          <div class="form-actions"><button type="button" class="button button-secondary" id="profile-back">Voltar</button><button type="submit" class="button button-primary">Ir para as perguntas →</button></div>
        </form>
      </div>`;

    document.getElementById('profile-back').addEventListener('click', renderIntro);
    document.getElementById('profile-form').addEventListener('submit', event => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const age = form.get('age');
      if (age && (Number(age) < 10 || Number(age) > 99)) {
        showToast('Informe uma idade entre 10 e 99 anos ou deixe o campo vazio.');
        return;
      }
      state.profile = {
        name: String(form.get('name') || '').trim(),
        age: String(age || '').trim(),
        grade: String(form.get('grade') || '').trim(),
        school: String(form.get('school') || '').trim()
      };
      state.answers = [];
      state.questionIndex = 0;
      state.step = 'quiz';
      localStorage.removeItem(RESULT_KEY);
      persist();
      renderQuestion();
    });
  }

  function renderQuestion() {
    state.step = 'quiz';
    const index = state.questionIndex;
    const q = questions[index];
    setProgress(index);
    persist();
    root.innerHTML = `
      <div class="test-card-inner test-enter" id="question-panel">
        <div class="question-meta"><span class="question-section">${q.section}</span><span class="question-number">${String(index + 1).padStart(2, '0')} / ${questions.length}</span></div>
        <h1 class="question-title">${q.prompt}</h1>
        <p class="question-hint">${q.hint || 'Escolha a alternativa que mais se aproxima de você.'}</p>
        <div class="options-grid" role="group" aria-label="Alternativas">
          ${q.options.map((option, optionIndex) => `
            <button type="button" class="option-button ${state.answers[index] === optionIndex ? 'selected' : ''}" data-option="${optionIndex}">
              <span class="option-index">${optionIndex + 1}</span>
              <span class="option-copy"><strong>${option.title}</strong><span>${option.detail}</span></span>
            </button>`).join('')}
        </div>
        <div class="question-actions"><button type="button" class="back-button" id="question-back">← ${index === 0 ? 'Início' : 'Pergunta anterior'}</button><span class="keyboard-hint">Dica: use as teclas 1–4 para responder.</span></div>
      </div>`;

    root.querySelectorAll('[data-option]').forEach(button => button.addEventListener('click', () => chooseOption(Number(button.dataset.option), button)));
    document.getElementById('question-back').addEventListener('click', goBack);
  }

  function chooseOption(optionIndex, button) {
    if (root.dataset.locked === 'true') return;
    root.dataset.locked = 'true';
    root.querySelectorAll('.option-button').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    state.answers[state.questionIndex] = optionIndex;
    state.answers = state.answers.slice(0, state.questionIndex + 1);
    persist();
    setProgress(state.questionIndex);

    setTimeout(() => {
      root.dataset.locked = 'false';
      const next = state.questionIndex + 1;
      if (next >= questions.length) {
        finishTest();
        return;
      }
      state.questionIndex = next;
      if (next === 7 || next === 14) renderTransition(next); else renderQuestion();
    }, 220);
  }

  function renderTransition(nextIndex) {
    state.step = 'transition';
    state.questionIndex = nextIndex;
    persist();
    setProgress(nextIndex);
    const stage = nextIndex === 7 ? { n: 2, icon: '❄', title: 'Agora vamos para o seu jeito de trabalhar.', text: 'As próximas perguntas observam como você decide, aprende e coopera.' } : { n: 3, icon: '✦', title: 'Última etapa: situações práticas.', text: 'Imagine que os cenários são reais e escolha o que você teria mais vontade de fazer.' };
    root.innerHTML = `
      <div class="transition-screen test-enter"><div class="transition-box"><div class="transition-icon">${stage.icon}</div><span class="eyebrow">Etapa ${stage.n} de 3</span><h2>${stage.title}</h2><p>${stage.text}</p><button type="button" class="button button-primary button-lg" id="continue-stage">Continuar →</button></div></div>`;
    document.getElementById('continue-stage').addEventListener('click', renderQuestion);
  }

  function goBack() {
    if (state.questionIndex === 0) {
      renderIntro();
      return;
    }
    state.questionIndex -= 1;
    state.answers = state.answers.slice(0, state.questionIndex + 1);
    persist();
    renderQuestion();
  }

  function computeResult() {
    const scores = Object.fromEntries(Object.keys(courses).map(code => [code, 0]));
    state.answers.forEach((answerIndex, questionIndex) => {
      const option = questions[questionIndex]?.options?.[answerIndex];
      if (!option) return;
      Object.entries(option.weights).forEach(([code, value]) => { scores[code] += value; });
    });
    const maxScores = Object.fromEntries(Object.keys(courses).map(code => [code, 0]));
    questions.forEach(question => {
      Object.keys(courses).forEach(code => {
        const bestInQuestion = Math.max(0, ...question.options.map(option => option.weights[code] || 0));
        maxScores[code] += bestInQuestion;
      });
    });
    const normalizedScores = Object.fromEntries(Object.keys(courses).map(code => [code, maxScores[code] ? scores[code] / maxScores[code] : 0]));
    const highestNormalized = Math.max(...Object.values(normalizedScores), 0.0001);
    const ranked = Object.entries(scores)
      .map(([code, score]) => ({
        code,
        score,
        normalized: normalizedScores[code],
        affinity: Math.round((normalizedScores[code] / highestNormalized) * 100)
      }))
      .sort((a, b) => b.normalized - a.normalized || b.score - a.score || courses[a.code].name.localeCompare(courses[b.code].name, 'pt-BR'));
    return {
      completedAt: new Date().toISOString(),
      profile: state.profile,
      answers: [...state.answers],
      scores,
      maxScores,
      normalizedScores,
      ranked,
      questionCount: questions.length,
      version: 2
    };
  }

  function finishTest() {
    state.step = 'finished';
    persist();
    progressBar.style.width = '100%';
    progressText.textContent = 'Concluído';
    progressPercent.textContent = '100%';
    const result = computeResult();
    localStorage.setItem(RESULT_KEY, JSON.stringify(result));
    root.innerHTML = `<div class="finish-screen test-enter"><div><div class="finish-loader" aria-hidden="true"></div><h2>Montando seu mapa de afinidades…</h2><p>Comparando seus interesses, seu jeito de trabalhar e as situações práticas.</p></div></div>`;
    setTimeout(() => { window.location.href = 'resultado.html'; }, 750);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  function showToast(message) {
    let toast = document.querySelector('.test-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'test-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  exitButton.addEventListener('click', () => {
    const hasProgress = state.answers.length > 0 && state.step !== 'finished';
    if (!hasProgress || window.confirm('Seu progresso ficará salvo. Deseja sair do teste?')) window.location.href = 'index.html';
  });

  document.addEventListener('keydown', event => {
    if (state.step !== 'quiz') return;
    if (/^[1-4]$/.test(event.key)) {
      const button = root.querySelector(`[data-option="${Number(event.key) - 1}"]`);
      if (button) button.click();
    }
    if (event.key === 'ArrowLeft' && !event.altKey && !event.ctrlKey && !event.metaKey) goBack();
  });

  if (state.step === 'quiz' && state.answers.length > 0) {
    renderQuestion();
  } else if (state.step === 'profile') {
    renderProfile();
  } else if (state.step === 'transition') {
    renderTransition(state.questionIndex);
  } else {
    renderIntro();
  }
})();
