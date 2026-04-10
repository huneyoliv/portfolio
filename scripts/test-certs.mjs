import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { test } from 'node:test';

test('Certifications.astro contém o import do Clearbit Logo API', () => {
  const filePath = path.resolve('src/components/Certifications.astro');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  assert.ok(fileContent.includes('logo.clearbit.com'), 'O logo da empresa deve estar sendo chamado via Clearbit');
});

test('Certifications.astro tem fallback de erro', () => {
  const filePath = path.resolve('src/components/Certifications.astro');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  assert.ok(fileContent.includes('ui-avatars.com'), 'O fallback de erro do logo deve usar ui-avatars.com');
});

test('Certifications.astro tem link de verificação separado', () => {
  const filePath = path.resolve('src/components/Certifications.astro');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  assert.ok(fileContent.includes('Link de verificação'), 'O botão/link de verificação deve existir e ser explícito separadamente');
});
