const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI);

const userRoute = require('./routes/user');
const scrapeRoute = require('./routes/scrape');
const aiRoute = require('./routes/openai');
const promptRoute = require('./routes/prompt');
const verifyToken = require('./verifiedReq/auth');

app.use('/user', userRoute);
app.use('/prompt', verifyToken, promptRoute);
app.use('/scrape', verifyToken, scrapeRoute);
app.use('/openai', aiRoute);


app.get('/', (req, res) => {
  res.send("SERVER IS LIVE");
});

app.listen(port, () => console.log(`Server is listening on ${port}`));
