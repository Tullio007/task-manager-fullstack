const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tarefas = [];
let currentId = 1;

app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

app.post('/tarefas', (req, res) => {
  const { titulo, descricao } = req.body;
  const criarTarefa = {
     id: currentId++, 
     titulo, 
     descricao,
     concluida: false
    };
  tarefas.push(criarTarefa);

  res.status(201).json(criarTarefa);
});

app.put('/tarefas/:id', (req, res) => {
  const id = Number(req.params.id);

  tarefas = tarefas.map(tarefa =>
    tarefa.id === id
      ? { ...tarefa, concluida: true }
      : tarefa
  );

  res.sendStatus(204);
});

app.delete('/tarefas/:id', (req, res) => {
  const id = Number(req.params.id);

  tarefas = tarefas.filter(tarefa => tarefa.id !== id);

  res.sendStatus(204);
});


app.listen(3000, () => {
  console.log('API server is running on port 3000');
});