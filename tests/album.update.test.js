const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Update Album', () => {
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

  describe('PUT /albums/{id}', () => {
    it('replaces the album and returns the updated record', async () => {
      const { status, body } = await request(app)
        .put(`/albums/${album.id}`)
        .send({
          name: 'something different',
          date: 2000,
          artistid: album.artistid,
        });

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album.id,
        name: 'something different',
        date: 2000,
        artistid: album.artistid,
      });
    });
    it('returns a 404 if the artist does not exist', async () => {
      const { status, body } = await request(app).get('/albums/123').send();

      expect(status).to.equal(404);
      expect(body.message).to.equal('album 123 does not exist');
    });

    describe('PATCH /albums/{id}', () => {
      it('updates the album and returns the updated record', async () => {
        const { status, body } = await request(app)
          .patch(`/albums/${album.id}`)
          .send({
            name: 'something different',
            date: 2000,
            artistid: album.artistid,
          });

        expect(status).to.equal(200);

        expect(body).to.deep.equal({
          id: album.id,
          name: 'something different',
          date: 2000,
          artistid: album.artistid,
        });
      });

      it('returns a 404 if the artist does not exist', async () => {
        const { status, body } = await request(app)
          .patch('/albums/999999999')
          .send({ name: 'something different', date: 2000 });

        expect(status).to.equal(404);
        expect(body.message).to.equal('artist 999999999 does not exist');
      });
    });
  });
});
