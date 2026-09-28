(() => {
  const { courses } = window.VOCACAO_DATA;
  const grid = document.getElementById('course-grid');
  const search = document.getElementById('course-search');
  const count = document.getElementById('course-count');
  if (!grid) return;

  const entries = Object.values(courses);
  grid.innerHTML = entries.map(course => `
    <article class="course-card" data-search="${normalize(`${course.name} ${course.tag} ${course.short} ${course.skills.join(' ')}`)}">
      <div class="course-card-top"><div class="course-icon"><img src="${course.icon}" alt=""></div><span class="course-tag">${course.tag}</span></div>
      <div><h3>${course.name}</h3><p>${course.short}</p><div class="course-skills">${course.skills.map(skill => `<span>${skill}</span>`).join('')}</div></div>
      <a class="button button-secondary" href="teste.html" style="margin-top:20px">Ver minha afinidade</a>
    </article>`).join('');

  function filter() {
    const term = normalize(search.value.trim());
    let visible = 0;
    grid.querySelectorAll('.course-card').forEach(card => {
      const show = !term || card.dataset.search.includes(term);
      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    count.textContent = `${visible} ${visible === 1 ? 'curso encontrado' : 'cursos encontrados'}`;
  }

  function normalize(text) {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  search.addEventListener('input', filter);
  filter();
})();
