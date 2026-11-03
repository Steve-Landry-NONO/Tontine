import test from 'node:test';
import assert from 'node:assert/strict';
import { admissionPreview, associationOverview, assertValidData } from '../src/domain.js';
import { demoData } from '../demo/fixtures.js';

test('one account has a separate role and positions in each association', () => {
  const gabon = associationOverview(demoData, 'demo-account', 'a-gabon');
  const cameroun = associationOverview(demoData, 'demo-account', 'a-cameroun');
  assert.equal(gabon.role, 'treasurer');
  assert.equal(cameroun.role, 'member');
  assert.deepEqual(gabon.branches[0].tontines[0].cycles[0].positions.map(x => x.id),
    ['p-r1', 'p-r2', 'p-r3']);
  assert.deepEqual(cameroun.branches[0].tontines[0].cycles[0].positions.map(x => x.id),
    ['p-c1', 'p-c2']);
  assert.equal(JSON.stringify(gabon).includes('Joëlle'), false);
});

test('account outside an association cannot request its overview', () => {
  assert.throws(() => associationOverview(demoData, 'paul', 'a-cameroun'), /inaccessible/);
});

test('cross-association position is rejected even when IDs exist', () => {
  const bad = structuredClone(demoData);
  bad.positions[0].membershipId = 'm-alice-c';
  assert.throws(() => assertValidData(bad), /scope mismatch/);
});

test('partial payments do not grant access', () => {
  assert.deepEqual(admissionPreview({
    referenceAtAdmission: 500, currentReference: 500, payments: [200]
  }), { paid: 200, remaining: 300, status: 'installments_due',
    canJoinTontine: false, exceptionalDecision: null });
});

test('reference increase requires review after original schedule is fully paid', () => {
  const result = admissionPreview({
    referenceAtAdmission: 500, currentReference: 600, payments: [250, 250]
  });
  assert.equal(result.status, 'bureau_review');
  assert.equal(result.canJoinTontine, false);
});

test('full reference payment can enter only the admission preview complete state', () => {
  const result = admissionPreview({
    referenceAtAdmission: 500, currentReference: 500, payments: [250, 250]
  });
  assert.equal(result.status, 'complete');
  assert.equal(result.canJoinTontine, true);
});
