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

/**
 * @swagger
 * /artists/{artistId}:
 *  get:
 *      tags:
 *          - artists
 *      description: Find an artist by ID
 *      parameters:
 *        - in: path
 *          name: artistId
 *          schema:
 *              type: number
 *          required: true
 *          description: ID of artist to find
 *      responses:
 *          200:
 *              description: ID matches an artist in database
 *          404:
 *              description: no artist found with given ID
 */

router.get('/:id', artistController.readById);

/**
 * @swagger
 * /artists/{artistId}:
 *  put:
 *      tags:
 *          - artists
 *      description: Update artist name and genre using their ID
 *      parameters:
 *        - in: path
 *          name: artistId
 *          schema:
 *              type: integer
 *          required: true
 *          description: ID of the artist to update
 *        - in: body
 *          name: artist
 *          description: The artist data to be updated
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
 *            name: Led Zeppelin III
 *            genre: Rock
 *      responses:
 *          200:
 *              description: The updated artist
 *          404:
 *              description: The artist could not be found
 */


router.put('/:id', artistController.updateArtist);


/**
 * @swagger
 * /artists/{artistId}:
 *  patch:
 *      tags:
 *          - artists
 *      description: Update an artists name, genre or both using their ID
 *      parameters:
 *        - in: path
 *          name: artistId
 *          schema:
 *              type: integer
 *          required: true
 *          description: ID of the artist to update
 *        - in: body
 *          name: artist
 *          description: The artist data to be updated
 *          schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  genre:
 *                      type: string
 *          required:
 *            - name
 *          example:
 *            name: Led Zeppelin III
 *            genre: Rock
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
 *      tags:
 *          - artists
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
