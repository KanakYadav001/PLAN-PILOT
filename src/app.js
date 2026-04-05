const express = require('express'); 

const authRouter = require('./routers/auth.router');
const organizationRouter = require('./routers/organization.router');
const app = express();

app.use(express.json());



app.use('/auth', authRouter);
app.use('/organizations', organizationRouter);

module.exports = app;