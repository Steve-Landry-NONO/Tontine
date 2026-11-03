/**
 * V0 read model. It works on fictional fixtures in the demo.
 * The eventual API must enforce the same scope with authenticated identity
 * and database policies; this browser module is not an authorization boundary.
 */
export function assertValidData(data) {
  const unique = (rows, name) => {
    const ids = rows.map(row => row.id);
    if (new Set(ids).size !== ids.length) throw new Error(`Duplicate ${name} ID`);
  };
  for (const key of ['associations', 'memberships', 'branches', 'tontines', 'cycles', 'positions']) {
    if (!Array.isArray(data[key])) throw new Error(`Missing ${key}`);
    unique(data[key], key);
  }
  const byId = key => new Map(data[key].map(row => [row.id, row]));
  const associations = byId('associations');
  const branches = byId('branches');
  const tontines = byId('tontines');
  const cycles = byId('cycles');
  const memberships = byId('memberships');
  for (const membership of data.memberships) {
    if (!associations.has(membership.associationId)) throw new Error('Membership without association');
  }
  for (const branch of data.branches) {
    if (!associations.has(branch.associationId)) throw new Error('Branch without association');
  }
  for (const tontine of data.tontines) {
    if (!branches.has(tontine.branchId) || branches.get(tontine.branchId).associationId !== tontine.associationId) {
      throw new Error('Tontine scope mismatch');
    }
  }
  for (const cycle of data.cycles) {
    if (!tontines.has(cycle.tontineId) || tontines.get(cycle.tontineId).associationId !== cycle.associationId) {
      throw new Error('Cycle scope mismatch');
    }
  }
  for (const position of data.positions) {
    const cycle = cycles.get(position.cycleId);
    const holder = memberships.get(position.membershipId);
    if (!cycle || !holder || cycle.associationId !== position.associationId ||
        holder.associationId !== position.associationId) throw new Error('Position scope mismatch');
  }
  return true;
}

export function admissionPreview({ referenceAtAdmission, currentReference, payments, exceptionalDecision = null }) {
  if (!Number.isSafeInteger(referenceAtAdmission) || referenceAtAdmission <= 0 ||
      !Number.isSafeInteger(currentReference) || currentReference <= 0 ||
      !Array.isArray(payments) || payments.some(x => !Number.isSafeInteger(x) || x <= 0)) {
    throw new Error('Invalid admission amounts');
  }
  const paid = payments.reduce((sum, amount) => sum + amount, 0);
  if (!Number.isSafeInteger(paid)) throw new Error('Payment overflow');
  const remaining = Math.max(referenceAtAdmission - paid, 0);
  const needsReview = remaining === 0 && currentReference > paid;
  // A review marker alone never grants access. A signed decision will be modeled by the API.
  return {
    paid, remaining,
    status: remaining > 0 ? 'installments_due' : needsReview ? 'bureau_review' : 'complete',
    canJoinTontine: remaining === 0 && !needsReview,
    exceptionalDecision
  };
}

export function associationOverview(data, accountId, associationId) {
  assertValidData(data);
  const membership = data.memberships.find(x =>
    x.accountId === accountId && x.associationId === associationId && x.status === 'active');
  if (!membership) throw new Error('Association inaccessible');
  const association = data.associations.find(x => x.id === associationId);
  const branches = data.branches.filter(x => x.associationId === associationId).map(branch => ({
    id: branch.id, name: branch.name, meetingDay: branch.meetingDay,
    tontines: data.tontines.filter(x => x.associationId === associationId && x.branchId === branch.id)
      .map(tontine => ({
        id: tontine.id, contribution: tontine.contribution,
        cycles: data.cycles.filter(x => x.associationId === associationId && x.tontineId === tontine.id)
          .map(cycle => ({
            id: cycle.id, name: cycle.name, positionsPerMeeting: cycle.positionsPerMeeting,
            positions: data.positions.filter(x => x.associationId === associationId && x.cycleId === cycle.id)
              .map(position => ({
                id: position.id, number: position.number,
                holder: data.memberships.find(x => x.id === position.membershipId).displayName,
                plannedMeeting: position.plannedMeeting
              }))
          }))
      }))
  }));
  return { association: { id: association.id, name: association.name, referenceFund: association.referenceFund },
    role: membership.role, branches };
}
