const moodData = require('../data/moods');

const moodController = {
    // GET /api/moods - получить все записи
    getAllMoods: (req, res) => {
        try {
            const moods = moodData.getAllMoods();
            
            // Поддержка query параметров для фильтрации
            let filteredMoods = [...moods];
            
            if (req.query.date) {
                filteredMoods = moodData.getMoodsByDate(req.query.date);
            }
            
            if (req.query.mood) {
                filteredMoods = filteredMoods.filter(
                    mood => mood.mood === req.query.mood
                );
            }
            
            if (req.query.tag) {
                filteredMoods = filteredMoods.filter(
                    mood => mood.tags && mood.tags.includes(req.query.tag)
                );
            }
            
            // Сортировка по дате (новые сначала)
            filteredMoods.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            res.json({
                success: true,
                count: filteredMoods.length,
                data: filteredMoods
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },
    
    // GET /api/moods/:id - получить запись по ID
    getMoodById: (req, res) => {
        try {
            const mood = moodData.getMoodById(req.params.id);
            
            if (!mood) {
                return res.status(404).json({
                    success: false,
                    error: 'Запись не найдена'
                });
            }
            
            res.json({
                success: true,
                data: mood
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },
    
    // POST /api/moods - создать новую запись
    createMood: (req, res) => {
        try {
            const { date, mood, description, tags } = req.body;
            
            // Валидация
            if (!date || !mood) {
                return res.status(400).json({
                    success: false,
                    error: 'Поля date и mood обязательны'
                });
            }
            
            // Проверка допустимых значений настроения
            const validMoods = ['happy', 'sad', 'angry', 'neutral', 'excited', 'tired'];
            if (!validMoods.includes(mood)) {
                return res.status(400).json({
                    success: false,
                    error: `Недопустимое значение mood. Допустимые: ${validMoods.join(', ')}`
                });
            }
            
            const newMood = moodData.addMood({
                date,
                mood,
                description: description || '',
                tags: tags || []
            });
            
            res.status(201).json({
                success: true,
                message: 'Запись успешно создана',
                data: newMood
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },
    
    // PUT /api/moods/:id - обновить запись
    updateMood: (req, res) => {
        try {
            const updatedMood = moodData.updateMood(req.params.id, req.body);
            
            if (!updatedMood) {
                return res.status(404).json({
                    success: false,
                    error: 'Запись не найдена'
                });
            }
            
            res.json({
                success: true,
                message: 'Запись успешно обновлена',
                data: updatedMood
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },
    
    // DELETE /api/moods/:id - удалить запись
    deleteMood: (req, res) => {
        try {
            const isDeleted = moodData.deleteMood(req.params.id);
            
            if (!isDeleted) {
                return res.status(404).json({
                    success: false,
                    error: 'Запись не найдена'
                });
            }
            
            res.json({
                success: true,
                message: 'Запись успешно удалена'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },
    
    // GET /api/moods/stats/overview - получить статистику
    getStats: (req, res) => {
        try {
            const stats = moodData.getStats();
            const total = Object.values(stats).reduce((sum, count) => sum + count, 0);
            
            // Рассчитываем проценты
            const statsWithPercentage = {};
            Object.keys(stats).forEach(mood => {
                statsWithPercentage[mood] = {
                    count: stats[mood],
                    percentage: total > 0 ? ((stats[mood] / total) * 100).toFixed(1) : '0'
                };
            });
            
            res.json({
                success: true,
                total,
                stats: statsWithPercentage
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },
    
    // GET /api/moods/search/by-tag/:tag - поиск по тегу
    searchByTag: (req, res) => {
        try {
            const moods = moodData.getAllMoods();
            const filteredMoods = moods.filter(
                mood => mood.tags && mood.tags.includes(req.params.tag)
            );
            
            res.json({
                success: true,
                tag: req.params.tag,
                count: filteredMoods.length,
                data: filteredMoods
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
};

module.exports = moodController;