// Métodos DOM
const form = document.querySelector("#form-tarefa");
const inputTarefa = document.querySelector("#tarefa");
const contador = document.querySelector("#contador");
const listaTarefas = document.querySelector("#lista-tarefa");

//Resgate de tarefas do localStorage
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

