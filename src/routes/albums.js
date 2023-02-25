const express = require('express');
const albumsController = require('../controllers/albums');
const router = express.Router();

router.post('/:id/albums', albumsController.createAlbum);
router.get('/', albumsController.readAlbums);
router.get('/:id', albumsController.readAlbumById);
router.delete('/:id', albumsController.deleteAlbum);
router.put('/:id', albumsController.updatePut);
router.patch('/:id', albumsController.updateAlbumPatch);

module.exports = router;
