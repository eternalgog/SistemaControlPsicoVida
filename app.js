require('dotenv').config();
const express = require('express');
const path = require('path');
const routes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/adpaciente', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'adpaciente.html'));
});

app.get('/adterapeuta', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'adterapeuta.html'));
});

app.get('/adcita', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'adcita.html'));
});

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Iniciando express desde: http://localhost:${PORT}/`);
});