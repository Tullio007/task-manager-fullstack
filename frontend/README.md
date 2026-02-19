# 📋 Gerenciador de Tarefas - Frontend em React

## 🎓 Exemplo Acadêmico

Este é um exemplo didático de como criar uma aplicação React que consome uma API REST. É perfeito para aprender os conceitos fundamentais de React.

## 📚 Conceitos Demonstrados

- **useState**: Gerenciamento de estado local
- **useEffect**: Efeitos colaterais e requisições HTTP
- **Fetch API**: Como fazer requisições HTTP
- **Métodos HTTP**: GET, POST, PUT, DELETE
- **Componentes Funcionais**: Usando hooks do React
- **Renderização Condicional**: Mostrar/esconder elementos baseado em estado
- **Manipulação de Formulários**: onChange e onSubmit
- **CSS Moderno**: Flexbox, Grid, Variáveis CSS

## 🚀 Como Executar

### Pré-requisitos

1. **Node.js** instalado (versão 14+)
2. **npm** instalado (vem com Node.js)
3. **API Backend** rodando na porta 3000

### Passos

1. Navegue para a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências (se não tiver instalado):
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

4. Abra seu navegador em:
```
http://localhost:3000
```

## 📖 Estrutura do Projeto

```
frontend/
├── public/
│   └── index.html          # HTML principal
├── src/
│   ├── App.js              # Componente principal (com muitos comentários!)
│   ├── App.css             # Estilos (bem organizado)
│   ├── index.js            # Ponto de entrada
│   └── index.css           # Estilos globais
├── package.json            # Dependências do projeto
└── README.md              # Este arquivo
```

## 🔧 APIs Utilizadas

A aplicação se conecta com a API Backend rodando em `http://localhost:3000` com os seguintes endpoints:

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/tarefas` | Lista todas as tarefas |
| POST | `/tarefas` | Cria uma nova tarefa |
| PUT | `/tarefas/:id` | Marca tarefa como concluída |
| DELETE | `/tarefas/:id` | Deleta uma tarefa |

### Exemplo de POST (criar tarefa):
```json
{
  "titulo": "Minha Tarefa",
  "descricao": "Descrição da minha tarefa"
}
```

## 📝 Comentários no Código

O arquivo `src/App.js` contém **muitos comentários explicativos** para ajudar no aprendizado:

```javascript
// ======== ESTADO ========
const [tarefas, setTarefas] = useState([]);

// ======== EFEITOS ========
useEffect(() => {
  carregarTarefas();
}, []);

// ======== FUNÇÕES HTTP ========
const carregarTarefas = async () => {
  // Explicação passo a passo de como fazer requisições
};
```

## 🎨 Design

- Gradiente colorido no header
- Layout responsivo (funciona em mobile)
- Animações suaves com CSS
- Ícones emoji para melhor visualização
- Cards para cada tarefa
- Feedback visual ao interagir

## 🐛 Troubleshooting

### "Cannot GET /"
- Certifique-se que o servidor React está rodando em http://localhost:3000

### "Cannot connect to API"
- Verifique se o backend está rodando em http://localhost:3000
- Abra o console do navegador (F12) para ver erros de CORS

### "Erro 404 no Postman"
- O backend deve ter CORS habilitado
- Verifique se está usando a url correta

## 🔍 Para Debugar

1. Abra o **DevTools do navegador** (F12)
2. Vá até a aba **Console** para ver logs
3. Vá até a aba **Network** para ver requisições HTTP
4. Vá até a aba **Application > Local Storage** para ver dados persistidos

## 📚 Recursos de Aprendizado

- [Documentação React](https://react.dev)
- [Guia Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [Hooks do React](https://react.dev/reference/react)

## ✨ Próximos Passos Sugeridos

1. Adicionar edição de tarefas (PUT com atualização de título/descrição)
2. Persistir tarefas em LocalStorage
3. Adicionar categorias ou tags
4. Adicionar filtros (todas, concluídas, pendentes)
5. Adicionar temas (claro/escuro)
6. Converter para TypeScript
7. Adicionar testes com Jest

## 📄 Licença

Este é um projeto didático. Sinta-se livre para usar e modificar.

---

**Feito com ❤️ para fins educacionais**
