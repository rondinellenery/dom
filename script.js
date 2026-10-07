// ========================================
// MÉTODOS DOM
// ========================================

const form = document.querySelector("#form-tarefa");

const inputTarefa = document.querySelector("#tarefa");

const contador = document.querySelector("#contador");

const listaTarefas = document.querySelector("#lista-tarefas");


// ========================================
// RESGATE DAS TAREFAS DO LOCALSTORAGE
// ========================================

const tarefas =
    JSON.parse(localStorage.getItem("tarefas")) || [];


// ========================================
// OUVIR O ENVIO DO FORMULÁRIO
// ========================================

form.addEventListener("submit", adicionarTarefa);


// ========================================
// FUNÇÃO PARA ADICIONAR TAREFA
// ========================================

function adicionarTarefa(event) {

    // Impede a página de recarregar
    event.preventDefault();


    // Pega o texto digitado
    const texto = inputTarefa.value.trim();


    // Verifica se o campo está vazio
    if (texto === "") {

        alert("Digite uma tarefa!");

        return;
    }


    // Cria o objeto da nova tarefa
    const novaTarefa = {

        id: Date.now(),

        texto: texto,

        concluida: false
    };


    // Adiciona no array
    tarefas.push(novaTarefa);


    // Salva no navegador
    salvarTarefas();


    // Atualiza a tabela
    renderizarTarefas();


    // Limpa o input
    inputTarefa.value = "";


    // Volta o cursor para o input
    inputTarefa.focus();


    console.log(novaTarefa);
}


// ========================================
// FUNÇÃO PARA MOSTRAR AS TAREFAS
// ========================================

function renderizarTarefas() {

    // Limpa a tabela antes de criar novamente
    listaTarefas.innerHTML = "";


    tarefas.forEach(function (tarefa, indice) {

        // Cria a linha
        const linha = document.createElement("tr");


        // --------------------------------
        // COLUNA DO NÚMERO
        // --------------------------------

        const colunaNumero =
            document.createElement("td");

        colunaNumero.textContent =
            indice + 1;


        // --------------------------------
        // COLUNA DO NOME
        // --------------------------------

        const colunaNome =
            document.createElement("td");

        colunaNome.textContent =
            tarefa.texto;


        // Se estiver concluída
        if (tarefa.concluida) {

            colunaNome.classList.add(
                "text-decoration-line-through",
                "text-muted"
            );
        }


        // --------------------------------
        // COLUNA DO STATUS
        // --------------------------------

        const colunaStatus =
            document.createElement("td");


        if (tarefa.concluida) {

            colunaStatus.innerHTML =
                '<span class="badge text-bg-success">Concluída</span>';

        } else {

            colunaStatus.innerHTML =
                '<span class="badge text-bg-warning">Pendente</span>';
        }


        // --------------------------------
        // COLUNA DE AÇÕES
        // --------------------------------

        const colunaAcoes =
            document.createElement("td");

        colunaAcoes.classList.add(
            "text-center"
        );


        // ========================================
        // BOTÃO CONCLUIR / REABRIR
        // ========================================

        const botaoConcluir =
            document.createElement("button");

        botaoConcluir.textContent =
            tarefa.concluida
                ? "Reabrir"
                : "Concluir";

        botaoConcluir.classList.add(
            "btn",
            tarefa.concluida
                ? "btn-warning"
                : "btn-success",
            "btn-sm",
            "me-2"
        );


        botaoConcluir.addEventListener(
            "click",
            function () {

                alterarStatus(tarefa.id);
            }
        );


        // ========================================
        // BOTÃO EDITAR
        // ========================================

        const botaoEditar =
            document.createElement("button");

        botaoEditar.textContent =
            "Editar";

        botaoEditar.classList.add(
            "btn",
            "btn-primary",
            "btn-sm",
            "me-2"
        );


        botaoEditar.addEventListener(
            "click",
            function () {

                editarTarefa(tarefa.id);
            }
        );


        // ========================================
        // BOTÃO EXCLUIR
        // ========================================

        const botaoExcluir =
            document.createElement("button");

        botaoExcluir.textContent =
            "Excluir";

        botaoExcluir.classList.add(
            "btn",
            "btn-danger",
            "btn-sm"
        );


        botaoExcluir.addEventListener(
            "click",
            function () {

                excluirTarefa(tarefa.id);
            }
        );


        // ========================================
        // COLOCA OS BOTÕES NA COLUNA
        // ========================================

        colunaAcoes.appendChild(
            botaoConcluir
        );

        colunaAcoes.appendChild(
            botaoEditar
        );

        colunaAcoes.appendChild(
            botaoExcluir
        );


        // --------------------------------
        // MONTA A LINHA
        // --------------------------------

        linha.appendChild(
            colunaNumero
        );

        linha.appendChild(
            colunaNome
        );

        linha.appendChild(
            colunaStatus
        );

        linha.appendChild(
            colunaAcoes
        );


        // Coloca a linha na tabela
        listaTarefas.appendChild(
            linha
        );

    });


    // Atualiza o contador
    contador.textContent =
    `${tarefas.length} ${tarefas.length === 1 ? "tarefa" : "tarefas"}`;
}


// ========================================
// FUNÇÃO PARA ALTERAR O STATUS
// ========================================

function alterarStatus(id) {

    const tarefaEncontrada =
        tarefas.find(function (tarefa) {

            return tarefa.id === id;
        });


    if (tarefaEncontrada) {

        tarefaEncontrada.concluida =
            !tarefaEncontrada.concluida;

        salvarTarefas();

        renderizarTarefas();
    }
}


// ========================================
// FUNÇÃO PARA EDITAR TAREFA
// ========================================

function editarTarefa(id) {

    const tarefaEncontrada =
        tarefas.find(function (tarefa) {

            return tarefa.id === id;
        });


    if (tarefaEncontrada) {

        const novoTexto =
            prompt(
                "Edite a tarefa:",
                tarefaEncontrada.texto
            );


        // Se clicar em cancelar
        if (novoTexto === null) {

            return;
        }


        const textoEditado =
            novoTexto.trim();


        // Não permite tarefa vazia
        if (textoEditado === "") {

            alert("Digite uma tarefa!");

            return;
        }


        tarefaEncontrada.texto =
            textoEditado;


        salvarTarefas();

        renderizarTarefas();
    }
}


// ========================================
// FUNÇÃO PARA EXCLUIR TAREFA
// ========================================

function excluirTarefa(id) {

    const indice =
        tarefas.findIndex(function (tarefa) {

            return tarefa.id === id;
        });


    if (indice !== -1) {

        tarefas.splice(indice, 1);

        salvarTarefas();

        renderizarTarefas();
    }
}


// ========================================
// FUNÇÃO PARA SALVAR NO LOCALSTORAGE
// ========================================

function salvarTarefas() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}


// ========================================
// MOSTRA AS TAREFAS AO ABRIR A PÁGINA
// ========================================

renderizarTarefas();