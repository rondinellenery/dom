// Métodos DOM
const form = document.querySelector("#form-tarefa");
const inputTarefa = document.querySelector("#tarefa");
const contador = document.querySelector("#contador");
const listaTarefas = document.querySelector("#lista-tarefa");

//Resgate de tarefas do localStorage
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

//ouvir e agir sobre o clique
form.addEventListener("submit", adicionarTarefa);

// Função para adicionar tarefa
function adicionarTarefa() {
    let texto = inputTarefa.ariaValueMax.trim();
    if (texto === ""){
        alert("Digite uma tarefa!");
        return;
    }
}
