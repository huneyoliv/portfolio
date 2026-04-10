import assert from 'node:assert';
import { test } from 'node:test';

test('Regex para extrair múltiplas skills da URL', () => {
    const text1 = 'bla bla https://skillicons.dev/icons?i=linux,ts,js,react,py bla bla';
    const match1 = text1.match(/https:\/\/skillicons\.dev\/icons\?i=([a-zA-Z0-9_,]+)/);
    
    assert.ok(match1);
    assert.strictEqual(match1[1], 'linux,ts,js,react,py');

    const skills = match1[1].split(',');
    assert.deepStrictEqual(skills, ['linux', 'ts', 'js', 'react', 'py']);
});

test('Regex para extrair skill única da URL', () => {
    const text2 = 'Link único: https://skillicons.dev/icons?i=react';
    const match2 = text2.match(/https:\/\/skillicons\.dev\/icons\?i=([a-zA-Z0-9_,]+)/);

    assert.ok(match2);
    assert.strictEqual(match2[1], 'react');

    const skills = match2[1].split(',');
    assert.deepStrictEqual(skills, ['react']);
});

test('Regex para quando não existe link da skillicons', () => {
    const text3 = 'Sem link nenhum aqui';
    const match3 = text3.match(/https:\/\/skillicons\.dev\/icons\?i=([a-zA-Z0-9_,]+)/);
    
    assert.strictEqual(match3, null);
});
