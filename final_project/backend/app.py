from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import pickle

# Загрузка модели
with open('svm_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Настройки подключения к PostgreSQL
DATABASE = {
    'host': 'monorail.proxy.rlwy.net',
    'port': '56941',
    'dbname': 'railway',
    'user': 'postgres',
    'password': 'zxJnsIDOJlzrEGhzQCkYqMorBPETbFxK'
}

app = Flask(__name__)
CORS(app)

# Подключение к базе данных
def get_db_connection():
    return psycopg2.connect(**DATABASE)

# Маршрут для обработки данных
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    try:
        # Подготовка данных для модели
        features = [
            data['smoking'], data['anxiety'],
            data['peer_pressure'], data['chronic_disease'], data['fatigue'],
            data['allergy'], data['wheezing'], data['alcohol'],
            data['coughing'], data['shortness_of_breath'],
            data['swallowing_difficulty'], data['chest_pain']
        ]

        # Предсказание модели
        prediction = model.predict([features])[0]

        # Сохранение данных в базу
        conn = get_db_connection()
        cursor = conn.cursor()
        query = """
        INSERT INTO medical_results (
            user_id, gender, age, smoking, yellow_fingers, anxiety,
            peer_pressure, chronic_disease, fatigue, allergy, wheezing,
            alcohol, coughing, shortness_of_breath, swallowing_difficulty,
            chest_pain, created_at
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())
        """
        cursor.execute(query, (
            data['user_id'], data['gender'], data['age'], data['smoking'],
            data['anxiety'], data['peer_pressure'],
            data['chronic_disease'], data['fatigue'], data['allergy'],
            data['wheezing'], data['alcohol'], data['coughing'],
            data['shortness_of_breath'], data['swallowing_difficulty'], data['chest_pain']
        ))
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'result': int(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
