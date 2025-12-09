const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodController');

// GET /api/moods - все записи с возможностью фильтрации через query параметры
router.get('/', moodController.getAllMoods);

// GET /api/moods/stats/overview - статистика по настроениям
router.get('/stats/overview', moodController.getStats);

// GET /api/moods/search/by-tag/:tag - поиск по тегу
router.get('/search/by-tag/:tag', moodController.searchByTag);

// GET /api/moods/:id - получить запись по ID
router.get('/:id', moodController.getMoodById);

// POST /api/moods - создать новую запись
router.post('/', moodController.createMood);

// PUT /api/moods/:id - обновить запись
router.put('/:id', moodController.updateMood);

// DELETE /api/moods/:id - удалить запись
router.delete('/:id', moodController.deleteMood);

module.exports = router;