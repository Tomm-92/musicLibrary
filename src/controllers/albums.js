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

const readAlbums = async (_, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Albums');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const readAlbumById = async (req, res) => {
  const { id } = req.params;
  try {
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
  const { id } = req.params;
  const { name, date, artistid } = req.body;
  try {
    const {
      rows: [album],
    } = await db.query(
      `UPDATE Albums SET name = $1, date = $2, artistid = $3 WHERE id = $4 RETURNING *`,
      [name, date, artistid, id]
    );
    if (!album) {
      res.status(404).json({ message: `album ${id} does not exist` });
    }
    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updateAlbumPatch = async (req, res) => {
  const { id } = req.params;
  const { name, date, artistid } = req.body;

  let query;
  let params;

  if (name && date && artistid) {
    query =
      'UPDATE Albums SET name = $1, date = $2, artistid = $3 WHERE id = $4 RETURNING *';
    params = [name, date, artistid, id];
  } else if (name && date) {
    query = 'UPDATE albums SET name = $1, date = $2 WHERE id = $3 RETURNING *';
    params = [name, date, id];
  } else if (name && artistid) {
    query =
      'UPDATE albums SET name = $1, artistid = $2 WHERE id = $3 RETURNING *';
    params = [name, artistid, id];
  } else if (date && artistid) {
    query =
      'UPDATE albums SET date = $1, artistid = $2 WHERE id = $3 RETURNING *';
    params = [date, artistid, id];
  } else if (!name && !date) {
    query = 'UPDATE albums SET artistid = $1 WHERE id = $2 RETURNING *';
    params = [artistid, id];
  } else if (!artistid && !date) {
    query = 'UPDATE albums SET name = $1 WHERE id = $2 RETURNING *';
    params = [name, id];
  } else if (!name && !artistid) {
    query = 'UPDATE albums SET date = $1 WHERE id = $2 RETURNING *';
    params = [date, id];
  }

  try {
    const {
      rows: [album],
    } = await db.query(query, params);
    if (!album) {
      res.status(404).json({ message: `album ${id} does not exist` });
    }
    res.status(200).json(album);
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
  updateAlbumPatch,
};
