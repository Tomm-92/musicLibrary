const db = require('../db/index');

const createAlbum = async (req, res) => {
    try {
        const {name, date, artistId} = req.body
        const {id} = req.params
    const { rows: [albumData]} = await db.query('INSERT INTO albums (name, date , artistId) VALUES ($1, $2, $3) RETURNING *', [name, date, artistId]);
    res.status(200).json(albumData)
    }
    catch (err) {
        res.status(500).json(err.message);
    }
};


module.exports = {createAlbum}