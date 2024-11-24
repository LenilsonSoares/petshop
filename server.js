const express = require('express');
const cors = require('cors'); // Importe o pacote CORS
const path = require('path'); // Importe o pacote path
const app = express();
const port = 3000;

// Habilite o CORS para todas as rotas
app.use(cors());

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Dados em memória (exemplo de pets)
let pets = [
  { id: 1, nome: 'Rex', tipo: 'Cachorro' },
  { id: 2, nome: 'Mimi', tipo: 'Gato' },
  { id: 3, nome: 'Bobby', tipo: 'Cachorro' }
];
let nextId = 4; // Próximo ID disponível

// Rota GET para obter um pet pelo ID
app.get('/pets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pet = pets.find(p => p.id === id);
  if (pet) {
    res.json(pet);
  } else {
    res.status(404).json({ error: 'Pet não encontrado' });
  }
});

// Rota GET para obter todos os pets
app.get('/pets', (req, res) => {
  res.json(pets);
});

// Rota POST para adicionar um novo pet
app.post('/pets', (req, res) => {
  const novoPet = {
    id: nextId++,
    nome: req.body.nome,
    tipo: req.body.tipo
  };
  pets.push(novoPet);
  res.status(201).json(novoPet);
});

// Rota PUT para atualizar um pet existente
app.put('/pets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pet = pets.find(p => p.id === id);
  if (pet) {
    pet.nome = req.body.nome || pet.nome;
    pet.tipo = req.body.tipo || pet.tipo;
    res.json(pet);
  } else {
    res.status(404).json({ error: 'Pet não encontrado' });
  }
});

// Rota DELETE para excluir um pet
app.delete('/pets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = pets.findIndex(p => p.id === id);
  if (index !== -1) {
    pets.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Pet não encontrado' });
  }
});

// Servir o arquivo index.html na raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});