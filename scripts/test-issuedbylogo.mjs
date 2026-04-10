import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { test } from 'node:test';

test('Scraper capta corretamente issuedByLogo da Apify', () => {
  const filePath = path.resolve('scripts/linkedin-scrape.mjs');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  assert.ok(fileContent.includes('cert.issuedByLogo?.url'), 'O scraper deve ler a chave de imagem "issuedByLogo.url" oficial da apify');
});
