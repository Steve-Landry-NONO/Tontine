// Entirely fictional demonstration data. No member or payment from the pilot.
export const demoData = {
  associations: [
    { id: 'a-gabon', name: 'Association des Rives', referenceFund: 5_400_000 },
    { id: 'a-cameroun', name: 'Union des Collines', referenceFund: 300_000 }
  ],
  memberships: [
    { id: 'm-alice-g', accountId: 'demo-account', associationId: 'a-gabon', displayName: 'Alice M.', role: 'treasurer', status: 'active' },
    { id: 'm-paul-g', accountId: 'paul', associationId: 'a-gabon', displayName: 'Paul N.', role: 'member', status: 'active' },
    { id: 'm-alice-c', accountId: 'demo-account', associationId: 'a-cameroun', displayName: 'Alice M.', role: 'member', status: 'active' },
    { id: 'm-jo-c', accountId: 'jo', associationId: 'a-cameroun', displayName: 'Joëlle K.', role: 'member', status: 'active' }
  ],
  branches: [
    { id: 'b-rives', associationId: 'a-gabon', name: 'Rives Centre', meetingDay: '1er samedi' },
    { id: 'b-collines', associationId: 'a-cameroun', name: 'Collines Nord', meetingDay: '2e dimanche' }
  ],
  tontines: [
    { id: 't-rives', associationId: 'a-gabon', branchId: 'b-rives', contribution: 100_000 },
    { id: 't-collines', associationId: 'a-cameroun', branchId: 'b-collines', contribution: 25_000 }
  ],
  cycles: [
    { id: 'c-rives', associationId: 'a-gabon', tontineId: 't-rives', name: 'Cycle 2027', positionsPerMeeting: 2 },
    { id: 'c-collines', associationId: 'a-cameroun', tontineId: 't-collines', name: 'Cycle 2027', positionsPerMeeting: 1 }
  ],
  positions: [
    { id: 'p-r1', associationId: 'a-gabon', cycleId: 'c-rives', membershipId: 'm-alice-g', number: 1, plannedMeeting: 1 },
    { id: 'p-r2', associationId: 'a-gabon', cycleId: 'c-rives', membershipId: 'm-alice-g', number: 2, plannedMeeting: 2 },
    { id: 'p-r3', associationId: 'a-gabon', cycleId: 'c-rives', membershipId: 'm-paul-g', number: 3, plannedMeeting: 1 },
    { id: 'p-c1', associationId: 'a-cameroun', cycleId: 'c-collines', membershipId: 'm-alice-c', number: 1, plannedMeeting: 1 },
    { id: 'p-c2', associationId: 'a-cameroun', cycleId: 'c-collines', membershipId: 'm-jo-c', number: 2, plannedMeeting: 2 }
  ]
};
