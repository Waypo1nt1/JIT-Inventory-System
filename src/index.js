const express = require('express');
const path = require('path');
const suppliesRouter = require('./routes/supplies');
const suppliesService = require('./services/suppliesService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data/supplies.json');
suppliesService.init(DATA_FILE_PATH);

app.use(express.json());

app.use('/supplies', suppliesRouter);

app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
    console.log(`API складов JIT запущено: http://localhost:${PORT}`);
});
