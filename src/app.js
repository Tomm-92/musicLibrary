const express = require('express');
const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/albums');

const app = express();

app.use(express.json());

app.use('/artists', artistRouter);
app.use('/artists', albumRouter);
app.use('/albums', albumRouter);

// The problem with this is that you have created all the album endpoints off the /artists route as well as off the /albums route/ You only want the POST request for albums off the artists route /artists/:id/albums. So I was able to create an album entry by using /artists/:is/albums and /albums/:id/albums

module.exports = app;
