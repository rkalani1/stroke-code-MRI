import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('../src/components/DecisionSection.tsx', import.meta.url), 'utf8');

test('decision radios remain a required native single-selection group', () => {
  assert.equal((source.match(/name="decision"/g) || []).length, 3);
  assert.equal((source.match(/\srequired\s/g) || []).length, 3);
  assert.doesNotMatch(source, /readOnly|preventDefault|decision === .* \? null/);

  for (const decision of ['thrombolytic', 'evt', 'both']) {
    assert.match(source, new RegExp(`id="decision-${decision}"[\\s\\S]*?checked=\\{state\\.decision === '${decision}'\\}[\\s\\S]*?onChange=\\{\\(\\) => onChange\\('${decision}'\\)\\}`));
  }
});
