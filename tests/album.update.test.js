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
      db.query(
        'INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *',
        ['J Cole', 'Hip Hop']
      ),
    ]);
    artists = artistData.map(({ rows }) => rows[0]);
    const artistid = artists[0].id;
    const artistid1 = artists[1].id;

    albumData = await Promise.all([
      db.query(
        'INSERT INTO albums (name, date, artistid) VALUES( $1, $2,$3) RETURNING *',
        ['Humbug', 2009, artistid]
      ),
      db.query(
        'INSERT INTO albums (name, date, artistid) VALUES( $1, $2,$3) RETURNING *',
        ['AM', 2015, artistid1]
      ),
    ]);
    albums = albumData.map(({ rows }) => rows[0]);
    album = albums[0];
  });

  // Hi Stu, I have tried to set up this before each so I can test that the artistid foreign key can also be changed.
  // Please could you let me know your thoughts on the approach. Is there a better way I could be writing this?

  describe('PUT /albums/{id}', () => {
    it('replaces the album and returns the updated record', async () => {
      const { status, body } = await request(app)
        .put(`/albums/${album.id}`)
        .send({
          name: 'something different',
          date: 2000,
          artistid: artists[1].id,
        });

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album.id,
        name: 'something different',
        date: 2000,
        artistid: artists[1].id,
      });
    });
    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app).put('/albums/123').send();

      expect(status).to.equal(404);
      expect(body.message).to.equal('album 123 does not exist');
    });
  });

  describe('PATCH /albums/{id}', () => {
    it('updates the album and returns the updated record', async () => {
      const { status, body } = await request(app)
        .patch(`/albums/${album.id}`)
        .send({
          name: 'something different',
          date: 2000,
          artistid: artists[1].id,
        });

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album.id,
        name: 'something different',
        date: 2000,
        artistid: artists[1].id,
      });
    });

    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app)
        .patch('/albums/999999999')
        .send({
          name: 'something different',
          date: 2000,
          artistid: artists[1].id,
        });

      expect(status).to.equal(404);
      expect(body.message).to.equal('album 999999999 does not exist');
    });
  });
});
