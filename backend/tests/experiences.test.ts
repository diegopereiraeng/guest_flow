import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('GET /api/experiences', () => {
  it('deve retornar array', async () => {
    const res = await request(app).get('/api/experiences');
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('deve conter pelo menos 4 experiências', async () => {
    const res = await request(app).get('/api/experiences');
    expect(res.body.length).toBeGreaterThanOrEqual(4);
  });

  it('deve conter Galaxy Adventure', async () => {
    const res = await request(app).get('/api/experiences');
    const names = res.body.map((e: { name: string }) => e.name);
    expect(names).toContain('Galaxy Adventure');
  });

  it('cada experiência deve ter id, name, status e satisfactionScore', async () => {
    const res = await request(app).get('/api/experiences');
    for (const exp of res.body) {
      expect(exp).toHaveProperty('id');
      expect(exp).toHaveProperty('name');
      expect(exp).toHaveProperty('status');
      expect(exp).toHaveProperty('satisfactionScore');
    }
  });
});
