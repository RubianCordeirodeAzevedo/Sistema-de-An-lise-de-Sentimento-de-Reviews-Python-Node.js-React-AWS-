from flask import Flask, request, jsonify
from textblob import TextBlob

app = Flask(__name__)

# Função que analisa o sentimento de uma review
@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()
    review = data.get('review')

    # Usa o TextBlob para calcular o sentimento
    analysis = TextBlob(review)
    polarity = analysis.sentiment.polarity

    # Define a classificação de sentimento
    if polarity > 0:
        sentiment = "positivo"
    elif polarity < 0:
        sentiment = "negativo"
    else:
        sentiment = "neutro"

    return jsonify({"sentiment": sentiment})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
