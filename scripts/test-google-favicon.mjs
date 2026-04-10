import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { test } from 'node:test';

test('Certifications.astro usa fallback global do Google ao invés da Clearbit restrita', () => {
  const filePath = path.resolve('src/components/Certifications.astro');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  assert.ok(fileContent.includes('t2.gstatic.com/faviconV2'), 'A API do Google Favicons deve ser usada para não sofrer bloqueios 403');
  assert.ok(!fileContent.includes('logo.clearbit.com'), 'A API restrita da Clearbit deve ser removida permanentemente do código');
});
