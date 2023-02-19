const express = require('express');
const artistController = require('../controllers/artist');

const router = express.Router();

router.post('/', artistController.createArtist);
router.get('/', artistController.read);
router.get('/:id', artistController.readById);
router.put('/:id', artistController.updateArtist);
router.patch('/:id', artistController.updateArtistPatch);

module.exports = router;