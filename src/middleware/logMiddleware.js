const logMiddleware = (req, res, next) => {
    const timestamp = new Date().toLocaleTimeString();
    const method = req.method;
    const url = req.originalUrl || req.url;
    
    console.log(`\n[${timestamp}] ${method} ${url}`);
    
    // Логируем query параметры
    if (Object.keys(req.query).length > 0) {
        console.log('Query параметры:', req.query);
    }
    
    // Логируем параметры маршрута
    if (Object.keys(req.params).length > 0) {
        console.log('Параметры маршрута:', req.params);
    }
    
    // Сохраняем оригинальные методы
    const originalSend = res.send;
    const originalJson = res.json;
    
    // Используем только ОДИН перехватчик
    if (method === 'POST' || method === 'PUT') {
        // Для POST и PUT запросов логируем тело запроса
        res.json = function(data) {
            console.log('Тело запроса:', req.body);
            console.log('Статус ответа:', this.statusCode);
            console.log('Тело ответа:', data);
            return originalJson.call(this, data);
        };
        
        res.send = function(data) {
            console.log('Тело запроса:', req.body);
            console.log('Статус ответа:', this.statusCode);
            console.log('Тело ответа:', data);
            return originalSend.call(this, data);
        };
    } else {
        // Для GET, DELETE и других методов
        res.json = function(data) {
            console.log('Статус ответа:', this.statusCode);
            console.log('Тело ответа:', data);
            return originalJson.call(this, data);
        };
        
        res.send = function(data) {
            console.log('Статус ответа:', this.statusCode);
            console.log('Тело ответа:', data);
            return originalSend.call(this, data);
        };
    }
    
    next();
};

module.exports = logMiddleware;