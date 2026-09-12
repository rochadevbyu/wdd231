// 1. Array de Cursos
const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: false },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false }
];

// 2. Seleção de elementos do HTML
const listaCursos = document.querySelector('#lista-cursos');
const creditosTexto = document.querySelector('#creditos');
const btnTodos = document.querySelector('#btn-todos');
const btnCse = document.querySelector('#btn-cse');
const btnWdd = document.querySelector('#btn-wdd');

// 3. Função para renderizar os cursos na tela
function renderizarCursos(cursosFiltrados) {
    listaCursos.innerHTML = ''; // Limpa a lista antes de gerar os novos

    cursosFiltrados.forEach(curso => {
        const div = document.createElement('div');
        
        // Aplica a classe 'concluido' se a propriedade completed for true
        div.className = curso.completed ? 'curso-card concluido' : 'curso-card';
        div.innerHTML = `<h3>${curso.subject} ${curso.number}</h3>`;
        listaCursos.appendChild(div);
    });

    // 4. Calcula o total de créditos dinamicamente usando reduce
    const totalCreditos = cursosFiltrados.reduce((acumulador, curso) => acumulador + curso.credits, 0);
    creditosTexto.textContent = totalCreditos;
}

// 5. Chamada inicial para exibir todos os cursos quando a página carregar
renderizarCursos(courses);

// Eventos de clique para os botões de filtro
btnTodos.addEventListener('click', () => {
    renderizarCursos(courses);
});

btnCse.addEventListener('click', () => {
    const cseCursos = courses.filter(curso => curso.subject === 'CSE');
    renderizarCursos(cseCursos);
});

btnWdd.addEventListener('click', () => {
    const wddCursos = courses.filter(curso => curso.subject === 'WDD');
    renderizarCursos(wddCursos);
});