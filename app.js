const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRouter = require('./routes/users');
const reviewsRouter = require('./routes/reviews');
const followersRouter = require('./routes/followers');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/movie-review')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/users', usersRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/followers', followersRouter);

// 处理 404 错误
app.use((req, res, next) => {
    res.status(404).json({ message: 'API not found' });
});

// 全局错误处理
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An error occurred' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
