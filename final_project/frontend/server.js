const express = require('express');
const path = require('path');
const app = express();

// Используем папку build для раздачи статических файлов
app.use(express.static(path.join(__dirname, 'build')));

// Обрабатываем маршруты
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Настройка порта
const PORT = process.env.PORT || 8080; // Указываем 8080 в качестве порта по умолчанию
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

