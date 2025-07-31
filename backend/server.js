const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let todos = {
    "alice": [],
    "bob": []
};

app.get('/api/:user/todos', (req, res) => {
    const user = req.params.user;
    res.json(todos[user] || []);
});

app.post('/api/:user/todos', (req, res) => {
    const user = req.params.user;
    const todo = req.body;
    todos[user].push(todo);
    res.status(201).json(todo);
});

app.delete('/api/:user/todos/:index', (req, res) => {
    const { user, index } = req.params;
    todos[user].splice(index, 1);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Backend running on http://localhost:3000');
});
