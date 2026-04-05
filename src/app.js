const express = require('express'); 

const authRouter = require('./routers/auth.router');
const app = express();

app.use(express.json());



app.use('/auth', authRouter);

module.exports = app;