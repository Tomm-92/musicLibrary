const express = require('express');
const artistController = require('../controllers/artist');

const router = express.Router();

/**
 * @swagger
 * /artists:
 *  post:
 *      tags:
 *          - artists
 *      description: Add a new artist
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: artist information
 *          description: The artist to add
 *          schema:
 *              type: object
 *              required:
 *                - name
 *                - genre
 *              properties:
 *                  name:
 *                      type: string
 *                  genre:
 *                      type: string

 *      responses:
 *          201:
 *              description: Artist created
 */

router.post('/', artistController.createArtist);

/**
 * @swagger
 * /artists:
 *  get:
 *      tags:
 *          - artists
 *      description: Returns all of the artists held in the database.
 *      responses: 
 *          200:
 *              description: All artists successfully retrieved
 */


router.get('/', artistController.read);
router.get('/:id', artistController.readById);
router.put('/:id', artistController.updateArtist);


/**
 * @swagger
 * /artists:
 *  patch:
 *      tags:
 *          - artists
 *      description: Update an artist by ID
 *      parameters:
 *        - in: path
 *          name: artist ID
 *          schema:
 *              type: integer
 *          required: true
 *          description: ID of the artist to be updated
 *        - in: body
 *          name: artist
 *          description: The artist data to update
 *          schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  genre:
 *                      type: string
 *          required:
 *            - name
 *            - genre
 *          example:
 *            name: Led Zeppellin 3
 *            year: 1970
 *      responses:
 *          200:
 *              description: The updated artist
 *          404:
 *              description: The artist could not be found
 */


router.patch('/:id', artistController.updateArtistPatch);

/**
 * @swagger
 * /artists/{id}:
 *  delete:
 *      description: Delete artist
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: string id of artist to delete
 *      responses:
 *          200:
 *              description: Artist that was deleted
 *          404:
 *              description: Artist ID does not exist
 */


router.delete('/:id', artistController.deleteArtist);

module.exports = router;
