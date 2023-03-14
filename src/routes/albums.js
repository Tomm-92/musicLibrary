const express = require('express');
const albumsController = require('../controllers/albums');
const router = express.Router();

/**
 * @swagger
 * /artists/{artistId}/albums/:
 *  post:
 *      tags:
 *          - albums
 *      description: Adds a new album into database
 *      parameters:
 *        - in: path
 *          name: artistId
 *          schema:
 *              type: number
 *          required: true
 *          description: ID of album artist
 *        - in: body
 *          name: album
 *          description: Album to add to database
 *          schema:
 *              type: object
 *              required:
 *                - name
 *                - date
 *              properties:
 *                  name:
 *                      type: string
 *                  date:
 *                      type: number
 *              example:
 *                  name: Led Zeppelin 3
 *                  date: 1970
 *      responses:
 *          201:
 *              description: Album successfully added
 */

router.post('/:id/albums', albumsController.createAlbum);

/**
 * @swagger
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

/**
 * @swagger
 * /albums/{albumId}:
 *  get:
 *      tags:
 *          - albums
 *      description: Find an album by ID
 *      parameters:
 *        - in: path
 *          name: albumId
 *          schema:
 *              type: number
 *          required: true
 *          description: ID of album to find
 *      responses:
 *          200:
 *              description: ID matches an album in database
 *          404:
 *              description: no album found with given ID
 */

router.get('/:id', albumsController.readAlbumById);

/**
 * @swagger
 * /albums/{albumId}:
 *  delete:
 *      tags:
 *          - albums
 *      description: Delete album
 *      parameters:
 *        - in: path
 *          name: albumId
 *          schema:
 *              type: string
 *          required: true
 *          description: string id of album to delete
 *      responses:
 *          200:
 *              description: Album that was deleted
 *          404:
 *              description: Album ID does not exist
 */

router.delete('/:id', albumsController.deleteAlbum);

/**
 * @swagger
 * /albums/{albumId}:
 *  put:
 *      tags:
 *          - albums
 *      description: Update an album name and date using their ID
 *      parameters:
 *        - in: path
 *          name: albumId
 *          schema:
 *              type: number
 *          required: true
 *          description: ID of album
 *        - in: body
 *          name: album
 *          description: Album to add to database
 *          schema:
 *              type: object
 *              required:
 *                - name
 *                - date
 *                - artistid
 *              properties:
 *                  name:
 *                      type: string
 *                  date:
 *                      type: number
 *                  artistid:
 *                      type: number
 *              example:
 *                  name: Led Zeppelin 3
 *                  date: 1970
 *                  artistid: 1
 *      responses:
 *          200:
 *              description: Album successfully added
 *          404:
 *              description: The album could not be found
 */

router.put('/:id', albumsController.updatePut);

/**
 * @swagger
 * /albums/{albumId}:
 *  patch:
 *      tags:
 *          - albums
 *      description: Update an album name, date or both using their ID
 *      parameters:
 *        - in: path
 *          name: albumId
 *          schema:
 *              type: number
 *          required: true
 *          description: ID of album
 *        - in: body
 *          name: album
 *          description: Album to add to database
 *          schema:
 *              type: object
 *              required:
 *                - name
 *                - date
 *                - artistid
 *              properties:
 *                  name:
 *                      type: string
 *                  date:
 *                      type: number
 *                  artistid:
 *                      type: number
 *              example:
 *                  name: Led Zeppelin 3
 *                  date: 1970
 *                  artistid: 1
 *      responses:
 *          200:
 *              description: Album successfully added
 *          404:
 *              description: The album could not be found
 */


router.patch('/:id', albumsController.updateAlbumPatch);

module.exports = router;
