import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('GET /api/dashboard', () => {
  it('deve retornar 200', async () => {
    const res = await request(app).get('/api/dashboard');
    expect(res.status).toBe(200);
  });

  it('deve conter guestExperienceHealth', async () => {
    const res = await request(app).get('/api/dashboard');
    expect(res.body).toHaveProperty('guestExperienceHealth');
  });

  it('deve conter releaseConfidence', async () => {
    const res = await request(app).get('/api/dashboard');
    expect(res.body).toHaveProperty('releaseConfidence');
  });

  it('devopsMaturity deve ser Level 3', async () => {
    const res = await request(app).get('/api/dashboard');
    expect(res.body.devopsMaturity).toBe('Level 3');
  });
});
