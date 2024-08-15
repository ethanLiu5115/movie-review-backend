const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const reviewsRouter = require('./routes/reviews');
const usersRouter = require('./routes/users');
const watchHistoryRouter = require('./routes/watchHistory');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/movie-review', {
});

app.use('/api/reviews', reviewsRouter);
app.use('/api/users', usersRouter);
app.use('/api/watchHistory', watchHistoryRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
