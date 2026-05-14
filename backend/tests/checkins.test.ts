import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

const validPayload = {
  guestName: 'Ana Silva',
  experienceId: 'exp-001',
  reservationCode: 'GF-2048',
};

describe('POST /api/checkins', () => {
  it('com payload válido deve retornar 201', async () => {
    const res = await request(app).post('/api/checkins').send(validPayload);
    expect(res.status).toBe(201);
  });

  it('resposta deve conter checkinId', async () => {
    const res = await request(app).post('/api/checkins').send(validPayload);
    expect(res.body).toHaveProperty('checkinId');
  });

  it('resposta deve conter status CONFIRMED', async () => {
    const res = await request(app).post('/api/checkins').send(validPayload);
    expect(res.body.status).toBe('CONFIRMED');
  });

  it('POST sem guestName deve retornar 400', async () => {
    const res = await request(app)
      .post('/api/checkins')
      .send({ experienceId: 'exp-001', reservationCode: 'GF-2048' });
    expect(res.status).toBe(400);
  });

  it('POST sem experienceId deve retornar 400', async () => {
    const res = await request(app)
      .post('/api/checkins')
      .send({ guestName: 'Ana', reservationCode: 'GF-2048' });
    expect(res.status).toBe(400);
  });

  it('POST sem reservationCode deve retornar 400', async () => {
    const res = await request(app)
      .post('/api/checkins')
      .send({ guestName: 'Ana', experienceId: 'exp-001' });
    expect(res.status).toBe(400);
  });

  it('POST com experienceId inexistente deve retornar 404', async () => {
    const res = await request(app)
      .post('/api/checkins')
      .send({ guestName: 'Ana', experienceId: 'exp-999', reservationCode: 'GF-0000' });
    expect(res.status).toBe(404);
  });
});

describe('GET /api/checkins', () => {
  it('deve retornar array', async () => {
    const res = await request(app).get('/api/checkins');
    expect(Array.isArray(res.body)).toBe(true);
  });
});
