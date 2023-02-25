const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('create album', () => {
  let artist;
  beforeEach(async () => {
    const { rows } = await db.query(
      'INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *',
      ['Arctic Monkey', 'rock']
    );

    artist = rows[0];
  });

  describe('POST', () => {
    it('creates a new album in the database', async () => {
      const { status, body } = await request(app)
        .post(`/artists/${artist.id}/albums`)
        .send({
          name: 'Test',
          date: 2006,
          // artistid: `${(artist.id)}`
        });

      expect(status).to.equal(201);
      expect(body.name).to.equal('Test');
      expect(body.date).to.equal(2006);
      // expect(body.artistid).to.equal(`${(artist.id)}`)

      const {
        rows: [albumData],
      } = await db.query(`SELECT * FROM Albums WHERE id = ${body.id}`);
      expect(albumData.name).to.equal('Test');
      expect(albumData.date).to.equal(2006);
      // expect(albumData.artistid).to.equal(`${(artist.id)}`);
    });
  });
});

