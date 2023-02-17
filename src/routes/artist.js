const { addArtist } = require("../controllers/artist");

const express = require('express');

const app = express();

app.post('/artist', (req, res) => {
    res.status(201).json({ result: addArtist(req.body) });
  });