
document.addEventListener('DOMContentLoaded', function() {
    const inscricoesList = document.getElementById('inscricoesList');

    let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    updateList(submissions);

    function updateList(submissions) {
        const inscricoesList = document.getElementById('inscricoesList');
        inscricoesList.innerHTML = ''; // Limpa a lista atual
    
        // Criação do cabeçalho da tabela
        const table = document.createElement('table');
        table.id = 'dataTable'; // Adiciona o ID para a busca
        table.classList.add('responsive-table'); // Classe para estilos CSS
    
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Endereço</th>
                <th>Data de Inscrição</th>
                <th>Ações</th>
            </tr>
        `;
        table.appendChild(thead);
    
        // Criação do corpo da tabela
        const tbody = document.createElement('tbody');
        submissions.forEach((submission, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${escapeHTML(submission.firstName)} ${escapeHTML(submission.lastName)}</td>
                <td>${escapeHTML(submission.email)}</td>
                <td>${escapeHTML(submission.phone)}</td>
                <td>${escapeHTML(submission.address)}</td>
                <td>${escapeHTML(submission.date)}</td>
                <td><button onclick="removeSubmission(${index})">Remover</button></td>
            `;
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        inscricoesList.appendChild(table);
    }
    
    // Função para escapar caracteres HTML especiais para prevenir XSS
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
            }[tag] || tag));
    }
    


    // Função para remover uma inscrição específica
    window.removeSubmission = function(index) {
        submissions.splice(index, 1);
        localStorage.setItem('submissions', JSON.stringify(submissions));
        updateList(); // Atualiza a lista sem recarregar a página
    };

    // Função para remover todas as inscrições
    window.clearAllSubmissions = function() {
        submissions = [];
        localStorage.removeItem('submissions');
        updateList(); // Atualiza a lista sem recarregar a página
    };

    
    // Cria um botão para remover todas as inscrições
    const removeAllButton = document.createElement('button');
    removeAllButton.textContent = 'Remover Todos';
    removeAllButton.onclick = removeAllSubmissions;
    document.body.insertBefore(removeAllButton, inscricoesList);
});