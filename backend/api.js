const express = require('express');
const cors = require('cors');
const { tarefas, criarTarefa, concluirTarefa, removerTarefa } = require('./tarefas.js');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

app.post('/tarefas', (req, res) => {
  const { titulo, descricao } = req.body;
  criarTarefa(titulo, descricao);
  const novaTarefa = tarefas[tarefas.length - 1];
  res.status(201).json(novaTarefa);
});

app.put('/tarefas/:id', (req, res) => {
  const id = Number(req.params.id);
  concluirTarefa(id);
  res.sendStatus(204);
});

app.delete('/tarefas/:id', (req, res) => {
  const id = Number(req.params.id);
  removerTarefa(id);
  res.sendStatus(204);
});

app.listen(3000, () => {
  console.log('API server is running on port 3000');
});