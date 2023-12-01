document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const telefoneInput = document.getElementById('phone');
    
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Coleta dos valores do formulário
        const firstName = document.querySelector('[name="name"]').value;
        const lastName = document.querySelector('[name="lastName"]').value; // Isso deve ser atualizado com nomes de campo apropriados
        const email = document.querySelector('[name="email"]').value;
        const phone = document.querySelector('[name="phone"]').value;
        const genderElements = document.querySelectorAll('[name="genero"]');
        let gender;
        for (const element of genderElements) {
            if (element.checked) {
                gender = element.value;
                break;
            }
        }
    
        const country = document.querySelector('select').value;

        // Validação simples (exemplo)
        if (!firstName || !lastName || !email || !phone ) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Criar objeto de dados do formulário
        const formData = {
            firstName,
            lastName,
            email,
            phone,
            gender,
            date: new Date().toLocaleString()
        };

        // Salvar no LocalStorage
        let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
        submissions.push(formData);
        localStorage.setItem('submissions', JSON.stringify(submissions));

        form.reset();

        const clearFormButton = document.getElementById('clearFormBtn');
        if (clearFormButton) {
            clearFormButton.addEventListener('click', clearForm);
        }
        // Resetar o formulário após a submissão

    });

    // Validacao e  adicao de parenteses ao telefone
    telefoneInput.addEventListener('input', function () {
        let value = telefoneInput.value.replace(/\D/g, ''); // Remove todos os não-dígitos

        // Aplica a máscara (##) #####-####
        telefoneInput.addEventListener('input', function () {
            let value = telefoneInput.value.replace(/\D/g, ''); // Remove todos os não-dígitos
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
            telefoneInput.value = value;
        });
    });

    function searchTable() {
        let input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("searchInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("dataTable");
        tr = table.getElementsByTagName("tr");
    
        for (i = 0; i < tr.length; i++) {
            // Alterado para pesquisar em todas as células da linha
            td = tr[i].getElementsByTagName("td");
            for (let j = 0; j < td.length; j++) {
                if (td[j]) {
                    txtValue = td[j].textContent || td[j].innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                        break; // Pare de procurar outras células nesta linha
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }
    }
    

    function performSearch() {
        const searchText = searchInput.value.toLowerCase();
        const filteredData = submissions.filter(submission =>
            submission.firstName.toLowerCase().includes(searchText) ||
            submission.lastName.toLowerCase().includes(searchText) ||
            submission.email.toLowerCase().includes(searchText)
            // ... outros campos conforme necessário ...
        );
        updateList(filteredData);
    }

    searchInput.addEventListener('input', function() {
        const filteredData = submissions.filter(submission => 
            submission.firstName.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            submission.lastName.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            submission.email.toLowerCase().includes(searchInput.value.toLowerCase())
            // ... incluir outros campos conforme necessário ...
        );
        updateList(filteredData);
    });
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('input', performSearch);
});
