const db = require('../db/index');

const createAlbum = async (req, res) => {
  const { name, date } = req.body;
  const { id } = req.params;

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

const readAlbums = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Albums');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const readAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      rows: [albums],
    } = await db.query('SELECT * FROM Albums WHERE id = $1', [id]);
    if (!albums) {
      res.status(404).json({ message: `album ${id} does not exist` });
    }
    res.status(200).json(albums);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteAlbum = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      rows: [album],
    } = await db.query(`delete from albums where id = $1 RETURNING *`, [id]);
    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }
    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updatePut = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date } = req.body;
    const {
      rows: [album],
    } = await db.query(
      `UPDATE Albums SET name = $1, date = $2 WHERE id = $3 RETURNING *`,
      [name, date, id]
    );
    if (!album) {
      res.status(404).json({ message: `album ${id} does not exist` });
    }
    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updatePatch = async (req, res) => {
  const { id } = req.params;
  const { name, genre } = req.body;

  let query, params;

  if (name && genre) {
    query = `UPDATE artists SET name = $1, genre = $2 WHERE id = $3 RETURNING *`;
    params = [name, genre, id];
  } else if (!name) {
    query = `UPDATE artists SET genre = $1 WHERE id = $2 RETURNING *`;
    params = [genre, id];
  } else if (!genre) {
    query = `UPDATE artists SET name = $1 WHERE id = $2 RETURNING *`;
    params = [name, id];
  }

  try {
    const {
      rows: [artist],
    } = await db.query(query, params);

    if (!artist) {
      res.status(404).json({ message: `artist ${id} does not exist` });
    }
    res.status(200).json(artist);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  createAlbum,
  readAlbums,
  readAlbumById,
  deleteAlbum,
  updatePut,
  updatePatch,
};
