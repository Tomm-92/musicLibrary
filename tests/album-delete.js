const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Delete Album', () => {
  let album;
  let artists;
  let albums;
  beforeEach(async () => {
    let artistData;
    let albumData;
    artistData = await Promise.all([
      db.query(
        'INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *',
        ['Arctic Monkeys', 'rock']
      ),
    ]);
    artists = artistData.map(({ rows }) => rows[0]);
    const artistid = artists[0].id;

    albumData = await Promise.all([
      db.query(
        'INSERT INTO albums (name, date, artistid) VALUES( $1, $2,$3) RETURNING *',
        ['Humbug', 2009, artistid]
      ),
      db.query(
        'INSERT INTO albums (name, date, artistid) VALUES( $1, $2,$3) RETURNING *',
        ['AM', 2015, artistid]
      ),
    ]);
    albums = albumData.map(({ rows }) => rows[0]);
    album = albums[0];
  });

  describe('DELETE /albums/{id}', () => {
    it('deletes the album and returns the deleted data', async () => {
      const { status, body } = await request(app)
        .delete(`/albums/${album.id}`)
        .send();

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album.id,
        name: album.name,
        date: album.date,
        artistid: album.artistid,
      });
    });

    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app)
        .delete('/albums/999999999')
        .send();

      expect(status).to.equal(404);
      expect(body.message).to.equal('album 999999999 does not exist');
    });
  });
});
