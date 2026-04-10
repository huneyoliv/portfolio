import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { test } from 'node:test';

test('linkedin-scrape.mjs implementa a extração de cert.logo', () => {
  const filePath = path.resolve('scripts/linkedin-scrape.mjs');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  assert.ok(fileContent.includes('logo: cert.logo'), 'O scraper deve extrair as logos vindas da Apify');
});

test('Certifications.astro usa cert.logo', () => {
  const filePath = path.resolve('src/components/Certifications.astro');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  assert.ok(fileContent.includes('src={cert.logo'), 'O componente deve dar prioridade à imagem provida pela Apify');
});
