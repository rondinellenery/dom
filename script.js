// Métodos DOM
const form = document.querySelector("#form-tarefa");
const inputTarefa = document.querySelector("#tarefa");
const contador = document.querySelector("#contador");
const listaTarefas = document.querySelector("#lista-tarefa");

//Resgate de tarefas do localStorage
const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

//ouvir e agir sobre o clique
form.addEventListener("submit", adicionarTarefa);

// Função para adicionar tarefa
function adicionarTarefa(event) {
    event.preventDefault();
    const texto = inputTarefa.value.trim();
    if (texto === ""){
        alert("Digite uma tarefa!");
        return;
    }
    const novaTarefa = {
        id: Date.now(),
        texto: texto,
        concluida: false
    };
    tarefas.push(novaTarefa);
    salvarTarefa();
    inputTarefa.value = "";
    inputTarefa.focus();
    console.log(novaTarefa);
}

function salvarTarefa() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
function editarTarefa() {
    const id = this.parentNode.dataset.id;
    const tarefa = tarefas.find(tarefa => tarefa.id == id);
    const novoTexto = prompt("Edite a tarefa:", tarefa.texto);
    if (novoTexto !== null) {
        tarefa.texto = novoTexto;
        salvarTarefa();
    }
}