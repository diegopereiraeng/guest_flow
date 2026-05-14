/**
 * generate-spec.ts
 *
 * Generates the OpenAPI 3.0 specification from JSDoc annotations in route files
 * and writes the result to docs/openapi.yaml.
 *
 * Usage:
 *   npm run generate:spec
 *
 * This script is also called as a CI pipeline step to ensure the published
 * spec always reflects the actual implementation.
 */

import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'GuestFlow API',
      description:
        'Backend REST API for the GuestFlow digital guest experience platform. ' +
        'This spec is auto-generated from JSDoc annotations by the CI pipeline.',
      version: process.env.APP_VERSION ?? '1.0.0',
      contact: {
        name: 'Digital Experience Team',
        url: 'https://github.com/your-org/guestflow',
      },
    },
    servers: [
      { url: 'http://localhost:8080', description: 'Local development' },
      { url: 'https://api.guestflow.internal', description: 'Production' },
    ],
    tags: [
      { name: 'Observability', description: 'Health, readiness and version probes' },
      { name: 'Dashboard', description: 'Operational KPI metrics' },
      { name: 'Experiences', description: 'Guest-facing attraction and show data' },
      { name: 'Reservations', description: 'Guest reservation management' },
      { name: 'Check-ins', description: 'Guest check-in flow' },
    ],
    components: {
      schemas: {
        DashboardMetrics: {
          type: 'object',
          properties: {
            guestExperienceHealth: { type: 'number', example: 96 },
            liveGuestsToday: { type: 'number', example: 1248 },
            activeReservations: { type: 'number', example: 342 },
            checkinsCompleted: { type: 'number', example: 289 },
            averageWaitTimeMinutes: { type: 'number', example: 24 },
            topExperience: { type: 'string', example: 'Galaxy Adventure' },
            currentRelease: { type: 'string', example: 'v1.3.0' },
            releaseConfidence: { type: 'number', example: 92 },
            securityReadiness: { type: 'number', example: 95 },
            testReliability: { type: 'number', example: 88 },
            devopsMaturity: { type: 'string', example: 'Level 3' },
          },
        },
        Experience: {
          type: 'object',
          required: ['id', 'name', 'type', 'status', 'waitTimeMinutes', 'capacity', 'satisfactionScore'],
          properties: {
            id: { type: 'string', example: 'exp-001' },
            name: { type: 'string', example: 'Galaxy Adventure' },
            type: { type: 'string', example: 'Attraction' },
            status: { type: 'string', enum: ['AVAILABLE', 'DELAYED', 'FULL'] },
            waitTimeMinutes: { type: 'number', example: 25 },
            capacity: { type: 'number', example: 120 },
            satisfactionScore: { type: 'number', example: 4.8 },
          },
        },
        Reservation: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'res-001' },
            guestName: { type: 'string', example: 'Ana Silva' },
            experienceId: { type: 'string', example: 'exp-001' },
            experienceName: { type: 'string', example: 'Galaxy Adventure' },
            reservationCode: { type: 'string', example: 'GF-2048' },
            status: { type: 'string', enum: ['CONFIRMED', 'PENDING', 'CANCELLED'] },
            scheduledTime: { type: 'string', example: '14:30' },
          },
        },
        CheckInRequest: {
          type: 'object',
          required: ['guestName', 'experienceId', 'reservationCode'],
          properties: {
            guestName: { type: 'string', example: 'Ana Silva' },
            experienceId: { type: 'string', example: 'exp-001' },
            reservationCode: { type: 'string', example: 'GF-2048' },
          },
        },
        CheckIn: {
          type: 'object',
          properties: {
            checkinId: { type: 'string', example: 'chk-1700000000000-abc12' },
            guestName: { type: 'string', example: 'Ana Silva' },
            experienceId: { type: 'string', example: 'exp-001' },
            experienceName: { type: 'string', example: 'Galaxy Adventure' },
            reservationCode: { type: 'string', example: 'GF-2048' },
            status: { type: 'string', example: 'CONFIRMED' },
            timestamp: { type: 'string', format: 'date-time' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Guest name is required' },
          },
        },
      },
    },
  },
  // Scan all route files for @openapi JSDoc blocks
  apis: [path.join(__dirname, '../routes/*.ts'), path.join(__dirname, '../routes/*.js')],
};

function main() {
  console.log('⚙️  Generating OpenAPI spec from JSDoc annotations...');

  const spec = swaggerJsdoc(options);

  // Write YAML
  const yaml = require('js-yaml');
  const outputPath = path.join(__dirname, '../../../docs/openapi.yaml');
  const yamlContent = [
    '# ============================================================',
    '# GuestFlow OpenAPI Specification',
    '# AUTO-GENERATED by CI pipeline — do not edit manually.',
    `# Generated at: ${new Date().toISOString()}`,
    `# Commit: ${process.env.GIT_COMMIT ?? 'local'}`,
    `# Version: ${process.env.APP_VERSION ?? '1.0.0'}`,
    '# ============================================================',
    yaml.dump(spec, { lineWidth: 120 }),
  ].join('\n');

  fs.writeFileSync(outputPath, yamlContent, 'utf8');

  // Also write JSON for tooling
  const jsonOutputPath = path.join(__dirname, '../../../docs/openapi.json');
  fs.writeFileSync(jsonOutputPath, JSON.stringify(spec, null, 2), 'utf8');

  console.log(`✅  OpenAPI YAML written to: ${outputPath}`);
  console.log(`✅  OpenAPI JSON written to: ${jsonOutputPath}`);
  const openapi = spec as { paths?: object; components?: { schemas?: object } };
  console.log(`📄  Paths documented: ${Object.keys(openapi.paths ?? {}).length}`);
  console.log(`📦  Schemas defined:  ${Object.keys(openapi.components?.schemas ?? {}).length}`);
}

main();
