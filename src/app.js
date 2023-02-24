const express = require('express');
const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/albums');

const app = express();

app.use(express.json());

app.use('/artists', artistRouter);
app.use('/artists', albumRouter);
app.use('/albums', albumRouter);

//app.use('/artists/:id', artistRouter);
//app.use('/:id/albums', albumRouter);
//app.use(albumRouter);

module.exports = app;
