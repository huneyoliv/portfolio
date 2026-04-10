import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { test } from 'node:test';

test('As certificações contêm o link da logo na base de dados JSON', () => {
  const filePath = path.resolve('data/linkedin/profile.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  data.certifications.forEach(cert => {
    assert.ok(cert.logo, `A certificação ${cert.name} deve possuir o atributo logo.`);
    assert.ok(cert.logo.includes('http'), 'O link deve ser válido');
  });
});
