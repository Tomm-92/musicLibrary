const db = require('../db/index');

const createAlbum = async (req, res) => {
    const { name, date } = req.body;
   const { id } = req.params

    try {
      const {
        rows: [album],
      } = await db.query(
        'INSERT INTO Albums (name, date, artistid) VALUES ($1, $2, $3) RETURNING *',
        [name, date, id]
      );
      res.status(201).json(album);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };



module.exports = { createAlbum }




/* const createAlbum = async (req, res) => {
   
res.sendStatus(200)   
   
   
   try {
        const {name, date, artistId} = req.body
        const {id} = req.params
    const { rows: [albumData]} = await db.query('INSERT INTO albums (name, date , artistId) VALUES ($1, $2, $3) RETURNING *', [name, date, artistId]);
    res.status(200).json(albumData)
    }
    catch (err) {
        res.status(500).json(err.message);
    }
}; */


module.exports = {createAlbum}