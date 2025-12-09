// Имитация базы данных в памяти
let moods = [
    {
        id: 1,
        date: '2024-01-15',
        mood: 'happy',
        description: 'Отличный день! Защитил проект на отлично.',
        tags: ['учеба', 'успех']
    },
    {
        id: 2,
        date: '2024-01-16',
        mood: 'neutral',
        description: 'Обычный учебный день.',
        tags: ['учеба']
    },
    {
        id: 3,
        date: '2024-01-17',
        mood: 'sad',
        description: 'Не получилось сдать лабораторную работу.',
        tags: ['учеба', 'проблемы']
    }
];

let nextId = 4;

module.exports = {
    getAllMoods: () => [...moods],
    
    getMoodById: (id) => {
        return moods.find(mood => mood.id === parseInt(id));
    },
    
    addMood: (moodData) => {
        const newMood = {
            id: nextId++,
            ...moodData
        };
        moods.push(newMood);
        return newMood;
    },
    
    updateMood: (id, moodData) => {
        const index = moods.findIndex(mood => mood.id === parseInt(id));
        if (index === -1) return null;
        
        moods[index] = { ...moods[index], ...moodData };
        return moods[index];
    },
    
    deleteMood: (id) => {
        const index = moods.findIndex(mood => mood.id === parseInt(id));
        if (index === -1) return false;
        
        moods.splice(index, 1);
        return true;
    },
    
    getMoodsByDate: (date) => {
        return moods.filter(mood => mood.date === date);
    },
    
    getMoodsByMoodType: (moodType) => {
        return moods.filter(mood => mood.mood === moodType);
    },
    
    getStats: () => {
        const stats = {};
        moods.forEach(mood => {
            stats[mood.mood] = (stats[mood.mood] || 0) + 1;
        });
        return stats;
    }
};