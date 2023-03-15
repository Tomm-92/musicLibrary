const express = require('express');
const path = require('path');
const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/albums');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(express.json());

const options = {
    swaggerDefinition: {
      info: {
        title: "My MusicLibrary",
        version: "1.0.0",
        description: "My API for interacting with my Postgres musicLibrary",
      },
    },
    apis: [path.join(__dirname, './routes/*.js')],
  };
  const swaggerSpecs = swaggerJsdoc(options);

app.use('/artists', artistRouter);
app.use('/artists', albumRouter);
app.use('/albums', albumRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get('/', (req, res) => {
  res.status(200).json('Welcome to my Music Library');
});

module.exports = app;
