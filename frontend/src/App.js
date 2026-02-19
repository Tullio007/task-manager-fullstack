/**
 * EXEMPLO ACADÊMICO: Gerenciador de Tarefas com React + Material UI
 * 
 * Este componente demonstra conceitos fundamentais de React:
 * - useState: para gerenciar estado local
 * - useEffect: para efeitos colaterais (chamadas HTTP)
 * - Requisições HTTP com fetch API
 * - Componentes funcionais
 * - Material UI: componentes profissionais e responsivos
 */

import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Grid,
  AppBar,
  Toolbar
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

function App() {
  // ======== ESTADO ========
  // Estado para armazenar a lista de tarefas
  const [tarefas, setTarefas] = useState([]);
  
  // Estado para o título da nova tarefa
  const [titulo, setTitulo] = useState('');
  
  // Estado para a descrição da nova tarefa
  const [descricao, setDescricao] = useState('');
  
  // Estado para controlar carregamento
  const [isCarregando, setIsCarregando] = useState(false);
  
  // Estado para mensagens de erro
  const [erro, setErro] = useState('');

  // ======== CONSTANTES ========
  // URL base da API (mude isso se seu servidor estiver em outro lugar)
  const API_URL = 'http://localhost:3000';

  // ======== EFEITOS ========
  /**
   * useEffect é executado quando o componente é montado (component did mount)
   * O array vazio [] significa que este effect só executa uma vez
   */
  useEffect(() => {
    // Chamar a função para carregar tarefas quando o componente inicia
    carregarTarefas();
  }, []); // Array vazio = executar apenas uma vez

  // ======== FUNÇÕES HTTP ========
  
  /**
   * Função: Carregar todas as tarefas da API (GET)
   * Demonstra como fazer uma requisição GET com fetch
   */
  const carregarTarefas = async () => {
    setIsCarregando(true);
    setErro('');
    
    try {
      // Fazer requisição GET para obter todas as tarefas
      const resposta = await fetch(`${API_URL}/tarefas`);
      
      // Validar se a resposta foi bem-sucedida
      if (!resposta.ok) {
        throw new Error(`Erro ${resposta.status}: Não foi possível carregar as tarefas`);
      }
      
      // Converter resposta para JSON
      const dados = await resposta.json();
      
      // Atualizar o estado com as tarefas recebidas
      setTarefas(dados);
    } catch (erro) {
      // Se houver erro, armazenar a mensagem de erro
      setErro(`Erro ao carregar tarefas: ${erro.message}`);
      console.error('Erro:', erro);
    } finally {
      // Sempre desativar o estado de carregamento
      setIsCarregando(false);
    }
  };

  /**
   * Função: Criar uma nova tarefa (POST)
   * Demonstra como fazer uma requisição POST com body JSON
   */
  const criarTarefa = async (e) => {
    // Prevenir comportamento padrão do formulário (recarregar página)
    e.preventDefault();
    
    // Validação: verificar se os campos estão preenchidos
    if (!titulo.trim() || !descricao.trim()) {
      setErro('Por favor, preencha todos os campos');
      return;
    }

    setIsCarregando(true);
    setErro('');
    
    try {
      // Fazer requisição POST para criar nova tarefa
      const resposta = await fetch(`${API_URL}/tarefas`, {
        method: 'POST', // Método HTTP POST
        headers: {
          'Content-Type': 'application/json' // Indicar que o body é JSON
        },
        body: JSON.stringify({
          titulo: titulo,
          descricao: descricao
        })
      });

      if (!resposta.ok) {
        throw new Error(`Erro ${resposta.status}: Não foi possível criar a tarefa`);
      }

      // Obter a tarefa criada
      const novaTarefa = await resposta.json();
      
      // Adicionar a nova tarefa à lista (sem recarregar todas)
      setTarefas([...tarefas, novaTarefa]);
      
      // Limpar os campos do formulário
      setTitulo('');
      setDescricao('');
      
      console.log('Tarefa criada com sucesso:', novaTarefa);
    } catch (erro) {
      setErro(`Erro ao criar tarefa: ${erro.message}`);
      console.error('Erro:', erro);
    } finally {
      setIsCarregando(false);
    }
  };

  /**
   * Função: Marcar tarefa como concluída (PUT)
   * Demonstra como fazer uma requisição PUT
   */
  const marcarComoConcluida = async (id) => {
    try {
      const resposta = await fetch(`${API_URL}/tarefas/${id}`, {
        method: 'PUT', // Método HTTP PUT para atualizar
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!resposta.ok) {
        throw new Error(`Erro ${resposta.status}: Não foi possível atualizar a tarefa`);
      }

      // Atualizar a tarefa localmente (marcar como concluída)
      const tarefasAtualizadas = tarefas.map(tarefa =>
        tarefa.id === id ? { ...tarefa, concluida: true } : tarefa
      );
      setTarefas(tarefasAtualizadas);
      
      console.log('Tarefa marcada como concluída');
    } catch (erro) {
      setErro(`Erro ao atualizar tarefa: ${erro.message}`);
      console.error('Erro:', erro);
    }
  };

  /**
   * Função: Deletar uma tarefa (DELETE)
   * Demonstra como fazer uma requisição DELETE
   */
  const deletarTarefa = async (id) => {
    // Confirmar antes de deletar
    if (!window.confirm('Tem certeza que deseja deletar esta tarefa?')) {
      return;
    }

    try {
      const resposta = await fetch(`${API_URL}/tarefas/${id}`, {
        method: 'DELETE' // Método HTTP DELETE para remover
      });

      if (!resposta.ok) {
        throw new Error(`Erro ${resposta.status}: Não foi possível deletar a tarefa`);
      }

      // Remover tarefa da lista (filtrar)
      const tarefasFiltradas = tarefas.filter(tarefa => tarefa.id !== id);
      setTarefas(tarefasFiltradas);
      
      console.log('Tarefa deletada com sucesso');
    } catch (erro) {
      setErro(`Erro ao deletar tarefa: ${erro.message}`);
      console.error('Erro:', erro);
    }
  };

  // ======== RENDER ========
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* ===== HEADER / APP BAR ===== */}
      <AppBar position="sticky" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            📋 Gerenciador de Tarefas
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            React + Material UI + API REST
          </Typography>
        </Toolbar>
      </AppBar>

      {/* ===== MAIN CONTENT ===== */}
      <Container maxWidth="md" sx={{ flex: 1, py: 4 }}>
        {/* ===== MENSAGEM DE ERRO ===== */}
        {erro && (
          <Alert severity="error" onClose={() => setErro('')} sx={{ mb: 3 }}>
            {erro}
          </Alert>
        )}

        {/* ===== SEÇÃO 1: Formulário para criar tarefa ===== */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#667eea' }}>
            ➕ Adicionar Nova Tarefa
          </Typography>

          <Box component="form" onSubmit={criarTarefa} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Título"
              placeholder="Ex: Estudar React"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              disabled={isCarregando}
              fullWidth
              variant="outlined"
            />

            <TextField
              label="Descrição"
              placeholder="Ex: Estudar componentes funcionais e hooks"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              disabled={isCarregando}
              fullWidth
              multiline
              rows={3}
              variant="outlined"
            />

            <Button
              type="submit"
              variant="contained"
              startIcon={<AddIcon />}
              disabled={isCarregando}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              {isCarregando ? 'Carregando...' : 'Adicionar Tarefa'}
            </Button>
          </Box>
        </Paper>

        {/* ===== SEÇÃO 2: Lista de tarefas ===== */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#667eea' }}>
            📌 Minhas Tarefas ({tarefas.length})
          </Typography>

          {isCarregando && tarefas.length === 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {tarefas.length === 0 && !isCarregando && (
            <Alert severity="info">
              📭 Nenhuma tarefa criada ainda. Comece adicionando uma!
            </Alert>
          )}

          <Grid container spacing={2}>
            {tarefas.map((tarefa) => (
              <Grid item xs={12} sm={6} md={4} key={tarefa.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    borderTop: '4px solid',
                    borderColor: tarefa.concluida ? '#2ecc71' : '#667eea',
                    opacity: tarefa.concluida ? 0.7 : 1,
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1,
                        color: tarefa.concluida ? '#95a5a6' : '#2c3e50',
                        textDecoration: tarefa.concluida ? 'line-through' : 'none',
                        fontWeight: 'bold'
                      }}
                    >
                      {tarefa.concluida ? '✅' : '⭕'} {tarefa.titulo}
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1, color: '#555', lineHeight: 1.6 }}>
                      {tarefa.descricao}
                    </Typography>

                    <Typography variant="caption" sx={{ color: '#95a5a6' }}>
                      ID: {tarefa.id}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'space-between', pt: 0 }}>
                    {!tarefa.concluida && (
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        startIcon={<CheckCircleIcon />}
                        onClick={() => marcarComoConcluida(tarefa.id)}
                        sx={{ flex: 1, mr: 1 }}
                      >
                        Concluir
                      </Button>
                    )}

                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => deletarTarefa(tarefa.id)}
                      sx={{ flex: 1 }}
                    >
                      Deletar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* ===== FOOTER ===== */}
      <Box
        component="footer"
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center',
          py: 2,
          mt: 4
        }}
      >
        <Typography variant="caption">
          💡 Conceitos: useState, useEffect, Fetch API, HTTP Methods, Material UI
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
