const request = require('supertest');
const { app, server, pool } = require('../server');

afterAll(async () => {
    await pool.end();
    server.close();
});

describe('KoaSocial Backend API Tests', () => {
    test('GET /api/health should return OK status', async () => {
        const res = await request(app).get('/api/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('OK');
    });
});
