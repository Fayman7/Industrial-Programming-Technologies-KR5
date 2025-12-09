const express = require('express');
const moodRoutes = require('./routes/moodRoutes');
const logMiddleware = require('./middleware/logMiddleware');

const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// Middleware для парсинга URL-encoded данных
app.use(express.urlencoded({ extended: true }));

// Раздача статических файлов из папки public
app.use(express.static('public'));

// Наш собственный middleware для логирования
app.use(logMiddleware);

// Подключение маршрутов
app.use('/api/moods', moodRoutes);

// Middleware для обработки ошибок 404
app.use((req, res, next) => {
    res.status(404).json({
        error: 'Маршрут не найден'
    });
});

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Что-то пошло не так!'
    });
});

module.exports = app;