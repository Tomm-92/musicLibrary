const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');


describe('create album', () => {
  describe('/artists', () => {
    describe('POST', () => {
      it('creates a new album in the database', async () => {
        const res = await request(app).post('/artists').send({
          name: 'Tame Impala',
          genre: 'rock',
        });

        expect(res.status).to.equal(201);
      });
    });
  });
});








/* describe('create album', () => {
  let artist;
  beforeEach(async () => {
    const { rows } = await db.query(
      'INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *',
      ['Tame Impala', 'rock']
    );

    artist = rows[0];
  });

  
  describe('/albums', () => {
    describe('POST', () => {
      it('adds a new album  in the database', async () => {
        const { status, body } = await request(app).post(`artists/${artist.id}/albums`).send({
          name: 'Whatever People Say I am, thats what im not',
          date: '2006',
        });

        expect(status).to.equal(200);
        expect(body.name).to.equal('Whatever People Say I am, thats what im not');
        expect(body.date).to.equal('2006');
        expect(body.artistId).to.equal('1')

        const {
          rows: [albumData],
        } = await db.query(`SELECT * FROM Album WHERE id = ${body.id}`);
        expect(albumData.name).to.equal('Whatever People Say I am, thats what im not');
        expect(albumData.date).to.equal('2006');
        expect(albumData.artistId).to.equal('1')
      });
    });
  });
}); */