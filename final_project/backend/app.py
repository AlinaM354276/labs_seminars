from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import pickle
import os
from dotenv import load_dotenv
from joblib import load

# Загрузка переменных окружения
load_dotenv()

# Загрузка модели
with open('svm_model.pkl', 'rb') as file:
    model = load(file)

# Настройки подключения к PostgreSQL
DATABASE = {
    'host': os.getenv('DATABASE_HOST'),
    'port': os.getenv('DATABASE_PORT'),
    'dbname': os.getenv('DATABASE_NAME'),
    'user': os.getenv('DATABASE_USER'),
    'password': os.getenv('DATABASE_PASSWORD'),
    'sslmode': 'require'  # Добавляем SSL
}

app = Flask(__name__)
CORS(app)

# Подключение к базе данных
def get_db_connection():
    return psycopg2.connect(
        host=DATABASE['host'],
        port=DATABASE['port'],
        dbname=DATABASE['dbname'],
        user=DATABASE['user'],
        password=DATABASE['password'],
        sslmode=DATABASE['sslmode']  # Указываем SSL
    )

# Корневой маршрут
@app.route('/')
def home():
    return "Flask app is running!"

# Тест модели
@app.route('/test_model', methods=['GET'])
def test_model():
    sample_features = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
    try:
        prediction = model.predict([sample_features])[0]
        return jsonify({'test_prediction': int(prediction)})
    except Exception as e:
        return jsonify({'error': f'Error with model: {str(e)}'}), 500

# Тест базы данных
@app.route('/db_test', methods=['GET'])
def db_test():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT 1;")
        cursor.close()
        conn.close()
        return jsonify({'db_status': 'Connected successfully'})
    except Exception as e:
        return jsonify({'error': f'Database connection error: {str(e)}'}), 500

# Маршрут для предсказания
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    required_keys = [
        'name', 'family_name', 'phone', 'gender', 'age', 'smoking',
        'anxiety', 'peer_pressure', 'chronic_disease', 'fatigue', 'allergy',
        'wheezing', 'alcohol', 'coughing', 'shortness_of_breath',
        'swallowing_difficulty', 'chest_pain'
    ]
    missing_keys = [key for key in required_keys if key not in data]

    if missing_keys:
        return jsonify({'error': f'Missing keys in request: {missing_keys}'}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Проверяем, существует ли пользователь в таблице users
        cursor.execute(
            "SELECT user_id FROM users WHERE name = %s AND family_name = %s AND phone = %s;",
            (data['name'], data['family_name'], data['phone'])
        )
        user = cursor.fetchone()

        if not user:
            # Если пользователь не существует, добавляем его в таблицу users
            cursor.execute(
                """
                INSERT INTO users (name, family_name, phone)
                VALUES (%s, %s, %s)
                RETURNING user_id;
                """,
                (data['name'], data['family_name'], data['phone'])
            )
            user_id = cursor.fetchone()[0]  # Получаем user_id нового пользователя
        else:
            user_id = user[0]  # Пользователь уже существует

        # Подготавливаем данные для предсказания
        features = [
            int(data['gender']), int(data['age']),
            int(data['smoking']), int(data['anxiety']), int(data['peer_pressure']),
            int(data['chronic_disease']), int(data['fatigue']), int(data['allergy']),
            int(data['wheezing']), int(data['alcohol']), int(data['coughing']),
            int(data['shortness_of_breath']), int(data['swallowing_difficulty']), int(data['chest_pain'])
        ]
        prediction = model.predict([features])[0]

        # Добавляем запись в таблицу medical_results
        cursor.execute(
            """
            INSERT INTO medical_results (
                user_id, gender, age, smoking, anxiety,
                peer_pressure, chronic_disease, fatigue, allergy, wheezing,
                alcohol, coughing, shortness_of_breath, swallowing_difficulty,
                chest_pain, created_at
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW());
            """,
            (
                user_id, data['gender'], data['age'], data['smoking'], data['anxiety'],
                data['peer_pressure'], data['chronic_disease'], data['fatigue'], data['allergy'],
                data['wheezing'], data['alcohol'], data['coughing'], data['shortness_of_breath'],
                data['swallowing_difficulty'], data['chest_pain']
            )
        )
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'result': int(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Запуск приложения
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
