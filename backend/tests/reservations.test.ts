import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('GET /api/reservations', () => {
  it('deve retornar array', async () => {
    const res = await request(app).get('/api/reservations');
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('deve conter reservationCode', async () => {
    const res = await request(app).get('/api/reservations');
    expect(res.body[0]).toHaveProperty('reservationCode');
  });

  it('deve conter status', async () => {
    const res = await request(app).get('/api/reservations');
    expect(res.body[0]).toHaveProperty('status');
  });
});
