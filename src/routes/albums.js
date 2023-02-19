const express = require('express');
const albumController = require('../controllers/albums');

const router = express.Router();

router.post('/artists/:id/albums', albumController.createAlbum)

module.exports = router;