const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log(`Статические файлы доступны по http://localhost:${PORT}/`);
    console.log(`API доступно по http://localhost:${PORT}/api/moods`);
});