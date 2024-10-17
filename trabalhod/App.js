import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ user: '', product: '', reviewText: '' });

  useEffect(() => {
    fetchReviews();
  }, []);

  // Função para buscar reviews da API
  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:3001/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error("Erro ao buscar reviews", error);
    }
  };

  // Função para adicionar nova review
  const addReview = async () => {
    try {
      const response = await axios.post('http://localhost:3001/add-review', newReview);
      setNewReview({ user: '', product: '', reviewText: '' });
      fetchReviews();
      alert(`Sentimento da review: ${response.data.sentiment}`);
    } catch (error) {
      console.error("Erro ao adicionar review", error);
    }
  };

  // Função para deletar todas as reviews
  const deleteReviews = async () => {
    try {
      await axios.delete('http://localhost:3001/reviews');
      fetchReviews();
    } catch (error) {
      console.error("Erro ao deletar reviews", error);
    }
  };

  return (
    <div className="App">
      <h1>Análise de Sentimento de Reviews</h1>
      
      <div className="review-form">
        <h2>Adicionar nova review</h2>
        <input
          type="text"
          placeholder="Usuário"
          value={newReview.user}
          onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
        />
        <input
          type="text"
          placeholder="Produto"
          value={newReview.product}
          onChange={(e) => setNewReview({ ...newReview, product: e.target.value })}
        />
        <textarea
          placeholder="Escreva sua review aqui"
          value={newReview.reviewText}
          onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
        />
        <button onClick={addReview}>Adicionar Review</button>
      </div>

      <div className="reviews-list">
        <h2>Lista de Reviews</h2>
        <button onClick={deleteReviews}>Deletar todas as reviews</button>
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <p><strong>Usuário:</strong> {review.user}</p>
              <p><strong>Produto:</strong> {review.product}</p>
              <p><strong>Review:</strong> {review.reviewText}</p>
              <p><strong>Sentimento:</strong> {review.sentiment}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
