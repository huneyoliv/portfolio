import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { test } from 'node:test';

test('Workflow unificado para rodar e persistir tudo no mesmo host temporário', () => {
  const filePath = path.resolve('.github/workflows/deploy.yml');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  assert.ok(!fileContent.includes('scrape-linkedin:'), 'O job scrape-linkedin deve ter sido fundido (removido) e integrado diretamente no build.');
  assert.ok(fileContent.includes('Scrape LinkedIn via Apify'), 'A step do scraper deve estar presente.');
  assert.ok(!fileContent.includes('git commit'), 'Não deve existir um git commit no script de deploy.');
});
