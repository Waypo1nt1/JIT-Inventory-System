const express = require('express');
const path = require('path');
const warehousesRouter = require('./routes/warehouses');
const warehousesService = require('./services/warehousesService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data/warehouses.json');
warehousesService.init(DATA_FILE_PATH);

app.use(express.json());

app.use('/warehouses', warehousesRouter);

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