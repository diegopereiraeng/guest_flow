import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('GET /api/version', () => {
  it('deve retornar app guestflow-api', async () => {
    const res = await request(app).get('/api/version');
    expect(res.body.app).toBe('guestflow-api');
  });

  it('deve retornar environment', async () => {
    const res = await request(app).get('/api/version');
    expect(res.body).toHaveProperty('environment');
  });

  it('deve retornar commit', async () => {
    const res = await request(app).get('/api/version');
    expect(res.body).toHaveProperty('commit');
  });
});
