import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('GET /health', () => {
  it('deve retornar 200', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
  });

  it('status deve ser UP', async () => {
    const res = await request(app).get('/health');
    expect(res.body.status).toBe('UP');
  });

  it('service deve ser guestflow-api', async () => {
    const res = await request(app).get('/health');
    expect(res.body.service).toBe('guestflow-api');
  });
});
