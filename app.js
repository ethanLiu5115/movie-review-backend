const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const reviewsRouter = require('./routes/reviews');
const usersRouter = require('./routes/users'); // 确保有用户相关的路由

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/movie-review', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/api/reviews', reviewsRouter);
app.use('/api/users', usersRouter); // 确保有用户相关的路由

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
