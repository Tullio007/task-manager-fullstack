# 🎓 Guia de Aprendizado - React Hooks

Este guia explica os conceitos principais usados no Gerenciador de Tarefas.

## 1. useState - Gerenciando Estado

### O que é?
`useState` é um Hook que permite adicionar estado a componentes funcionais.

### Sintaxe:
```javascript
const [valor, setValor] = useState(valorInicial);
```

### Exemplo do projeto:
```javascript
// Criar estado para armazenar tarefas
const [tarefas, setTarefas] = useState([]);

// Criar estado para o título
const [titulo, setTitulo] = useState('');

// Atualizar o estado
setTitulo('Nova Tarefa'); // Trigger re-render
```

### Como funciona:
1. `useState` retorna um array com 2 elementos: `[estado, função para atualizar]`
2. Quando você chama `setValor()`, o React re-renderiza o componente
3. O novo estado é usado no próximo render

---

## 2. useEffect - Efeitos Colaterais

### O que é?
`useEffect` executa código após o componente ser renderizado. É perfeito para requisições HTTP.

### Sintaxe:
```javascript
useEffect(() => {
  // Código que executa após render
}, []);  // Array de dependências
```

### O Array de Dependências:

**Array vazio []** - Executa apenas uma vez (quando o componente monta):
```javascript
useEffect(() => {
  carregarTarefas(); // Executa apenas uma vez
}, []);
```

**Sem array** - Executa após cada render:
```javascript
useEffect(() => {
  console.log('Renderizou!');
}); // CUIDADO: Pode causar loops infinitos!
```

**Com dependências** - Executa quando as dependências mudam:
```javascript
useEffect(() => {
  console.log(titulo); // Executa quando 'titulo' muda
}, [titulo]);
```

### Exemplo do projeto:
```javascript
useEffect(() => {
  // Quando o componente monta, carregar tarefas da API
  carregarTarefas();
}, []); // Executa uma vez
```

---

## 3. Fetch API - Comunicação com Servidor

### O que é?
É uma forma moderna de fazer requisições HTTP em JavaScript.

### Métodos HTTP:

#### GET - Obter dados
```javascript
const resposta = await fetch('http://localhost:3000/tarefas');
const dados = await resposta.json();
```

#### POST - Criar dados
```javascript
const resposta = await fetch('http://localhost:3000/tarefas', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    titulo: 'Minha Tarefa',
    descricao: 'Descrição'
  })
});
```

#### PUT - Atualizar dados
```javascript
const resposta = await fetch(`http://localhost:3000/tarefas/1`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    concluida: true
  })
});
```

#### DELETE - Deletar dados
```javascript
const resposta = await fetch(`http://localhost:3000/tarefas/1`, {
  method: 'DELETE'
});
```

### Erro Handling:
```javascript
try {
  const resposta = await fetch(url);
  
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status}`);
  }
  
  const dados = await resposta.json();
  return dados;
} catch (erro) {
  console.error('Erro:', erro);
}
```

---

## 4. Fluxo de Dados do Projeto

### 1. Componente Monta
```
useEffect() → carregarTarefas()
```

### 2. Carregando Tarefas (GET)
```
carregarTarefas()
  ↓
fetch('http://localhost:3000/tarefas')
  ↓
setTarefas(dados)
  ↓
Re-render com tarefas na tela
```

### 3. Criando Tarefa (POST)
```
Usuário clica em "Adicionar"
  ↓
criarTarefa(event)
  ↓
fetch (POST) com dados
  ↓
setTarefas([...tarefas, novaTarefa])
  ↓
Re-render com nova tarefa
```

### 4. Concluindo Tarefa (PUT)
```
Usuário clica em "✓ Concluir"
  ↓
marcarComoConcluida(id)
  ↓
fetch (PUT) para API
  ↓
setTarefas(tarefas.map(...))
  ↓
Re-render com tarefa marcada
```

### 5. Deletando Tarefa (DELETE)
```
Usuário clica em "🗑️ Deletar"
  ↓
deletarTarefa(id)
  ↓
fetch (DELETE) para API
  ↓
setTarefas(tarefas.filter(...))
  ↓
Re-render sem a tarefa deletada
```

---

## 5. Renderização Condicional

### Renderizar baseado em estado:
```javascript
{tarefas.length === 0 && (
  <p>Nenhuma tarefa</p>
)}

{erro && (
  <div className="erro">⚠️ {erro}</div>
)}
```

### Operador Ternário:
```javascript
{isCarregando ? (
  <p>Carregando...</p>
) : (
  <p>Carregado!</p>
)}
```

---

## 6. Manipulação de Formulário

### onChange - Atualizar estado enquanto digita:
```javascript
<input
  value={titulo}
  onChange={(e) => setTitulo(e.target.value)}
/>
```

### onSubmit - Enviar formulário:
```javascript
<form onSubmit={(e) => {
  e.preventDefault(); // Impedir recarregar página
  criarTarefa();
}}>
  {/* conteúdo */}
</form>
```

---

## 7. Array Methods Uteis

### map() - Transformar array:
```javascript
// Marcar tarefa como concluída
const tarefasAtualizadas = tarefas.map(tarefa =>
  tarefa.id === id
    ? { ...tarefa, concluida: true }
    : tarefa
);
```

### filter() - Filtrar array:
```javascript
// Remover tarefa deletada
const tarefasFiltradas = tarefas.filter(
  tarefa => tarefa.id !== idDeletada
);
```

### spread operator (...):
```javascript
// Adicionar item a um array
const novaLista = [...tarefas, novaTarefa];
```

---

## 8. CSS - Variáveis e Flexbox

### Variáveis CSS:
```css
:root {
  --cor-primaria: #3498db;
  --espaco-padrao: 16px;
}

.botao {
  background-color: var(--cor-primaria);
  padding: var(--espaco-padrao);
}
```

### Flexbox:
```css
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
}
```

### Grid:
```css
.tarefas-lista {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
```

---

## 9. Debugging Tips

### Console.log:
```javascript
console.log('Tarefas:', tarefas);
console.error('Erro:', erro);
```

### DevTools do Navegador:
1. Pressione **F12**
2. Vá em **Console** para ver logs
3. Vá em **Network** para ver requisições HTTP
4. Vá em **Application** para ver LocalStorage

### React Developer Tools:
- Extensão do Chrome que mostra componentes e state
- Visite: https://chrome.google.com/webstore

---

## 10. Exercícios Práticos

### Exercício 1: Adicionar edição
```javascript
// Criar função para editar tarefa (PUT)
const editarTarefa = async (id, novoTitulo, novaDescricao) => {
  // Fazer fetch PUT com novo dados
  // Atualizar estado local
};
```

### Exercício 2: Filtrar tarefas
```javascript
// Adicionar buttons para filtrar
// GET apenas tarefas concluídas ou pendentes
```

### Exercício 3: LocalStorage
```javascript
// Salvar tarefas no LocalStorage
useEffect(() => {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}, [tarefas]);
```

### Exercício 4: Tema escuro
```javascript
// Adicionar toggle para dark mode
// Mudar cores com CSS variables
```

---

## 11. Recursos Adicionais

- [React Official Docs](https://react.dev)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [JavaScript Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [CSS Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

---

**Bom aprendizado! 🎓**
