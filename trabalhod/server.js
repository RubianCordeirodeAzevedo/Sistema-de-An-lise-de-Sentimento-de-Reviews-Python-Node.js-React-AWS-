const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // Para enviar dados ao serviço de análise de sentimento
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

let reviews = []; // Lista de reviews

// Rota para adicionar uma nova review
app.post('/add-review', (req, res) => {
    const { user, product, reviewText } = req.body;
    
    // Simulação de uma requisição para análise de sentimentos
    axios.post('http://localhost:5000/analyze', { review: reviewText })
        .then(response => {
            const sentiment = response.data.sentiment;
            reviews.push({ user, product, reviewText, sentiment });
            res.status(200).send({ message: "Review adicionada com sucesso!", sentiment });
        })
        .catch(error => {
            res.status(500).send("Erro ao processar a análise de sentimento.");
        });
});

// Rota para buscar todas as reviews
app.get('/reviews', (req, res) => {
    res.status(200).json(reviews);
});

// Rota para deletar todas as reviews (reset)
app.delete('/reviews', (req, res) => {
    reviews = [];
    res.status(200).send({ message: "Todas as reviews foram deletadas." });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
