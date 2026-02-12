let tarefas = [];
let idAtual = 1;

function criarTarefa(titulo, descricao) {
    const novaTarefa = {
        id: idAtual,
        titulo: titulo,
        descricao: descricao,
        concluida: false
    };
    tarefas.push(novaTarefa);
    idAtual++;
}

function listarTarefas() {
    console.log(tarefas);   
}


function concluirTarefa(id) {
    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === id) {
            return { ...tarefa, concluida: true };
        }
        return tarefa;
    });
}


function removerTodasConcluidas() {
    tarefas = tarefas.filter(tarefa => !tarefa.concluida);
}


function removerTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
}



criarTarefa("Estudar JavaScript", "Revisar conceitos de ES6 e praticar exercícios");
criarTarefa("Tomar café", "Preparar um café forte");
listarTarefas();

concluirTarefa(1);
listarTarefas();

concluirTarefa(2);
listarTarefas();

removerTodasConcluidas();
listarTarefas();