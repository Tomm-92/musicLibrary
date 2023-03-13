const express = require('express');
const albumsController = require('../controllers/albums');
const router = express.Router();


/**
 * @swag
 * /{id}/albums:
 *  post:
 *      description: Add a new album
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: album
 *          description: The album to add
 *          schema:
 *              type: object
 *              required:
 *                - name
 *              properties:
 *                  name:
 *                      type: string
 *                  date:
 *                      type: number
 *                  artistId:
 *                      type: number
 *      responses:
 *          201:
 *              description: User created
 */





router.post('/:id/albums', albumsController.createAlbum);

/**
 * @swag
 * /albums:
 *  get:
 *      tags:
 *          - albums
 *      description: Returns all of the albums held in the database.
 *      responses: 
 *          200:
 *              description: All albums successfully retrieved
 */

router.get('/', albumsController.readAlbums);






router.get('/:id', albumsController.readAlbumById);
router.delete('/:id', albumsController.deleteAlbum);
router.put('/:id', albumsController.updatePut);
router.patch('/:id', albumsController.updateAlbumPatch);

module.exports = router;
