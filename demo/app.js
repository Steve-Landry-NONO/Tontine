import { admissionPreview, associationOverview } from '../src/domain.js';
import { demoData } from './fixtures.js';

const associationSelect = document.querySelector('#association');
const scenarioSelect = document.querySelector('#scenario');
const summary = document.querySelector('#summary');
const structure = document.querySelector('#structure');
const admission = document.querySelector('#admission');
const format = value => new Intl.NumberFormat('fr-FR').format(value) + ' FCFA';

function el(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function line(label, value) {
  const node = el('div', undefined, 'line');
  node.append(el('span', label), el('strong', value));
  return node;
}
function renderOverview() {
  const view = associationOverview(demoData, 'demo-account', associationSelect.value);
  summary.replaceChildren(
    el('h3', view.association.name),
    line('Mon rôle ici', view.role === 'treasurer' ? 'Trésorière' : 'Adhérente'),
    line('Fond de référence', format(view.association.referenceFund))
  );
  structure.replaceChildren();
  for (const branch of view.branches) {
    const card = el('article', undefined, 'card');
    card.append(el('h3', branch.name), el('p', 'Séance : ' + branch.meetingDay));
    for (const tontine of branch.tontines) {
      card.append(el('h3', 'Tontine ' + format(tontine.contribution) + ' par séance'));
      for (const cycle of tontine.cycles) {
        card.append(el('span', cycle.name + ' · ' + cycle.positionsPerMeeting +
          ' main(s) servie(s) par séance', 'badge'));
        for (const position of cycle.positions) {
          card.append(line('Position ' + position.number + ' · ' + position.holder,
            'Séance ' + position.plannedMeeting));
        }
      }
    }
    structure.append(card);
  }
}
function renderAdmission() {
  const reference = demoData.associations.find(x => x.id === associationSelect.value).referenceFund;
  const scenario = scenarioSelect.value;
  const installments = scenario === 'partial'
    ? [Math.floor(reference / 2)]
    : [Math.floor(reference / 2), reference - Math.floor(reference / 2)];
  const result = admissionPreview({
    referenceAtAdmission: reference,
    currentReference: scenario === 'increase' ? reference + 100_000 : reference,
    payments: installments
  });
  const status = {
    installments_due: 'Échéancier en cours : accès en attente',
    complete: 'Fond complet : accès possible selon les autres conditions',
    bureau_review: 'Fond annoncé payé : décision du bureau requise'
  };
  admission.replaceChildren(
    line('Montant annoncé à l’entrée', format(reference)),
    line('Déjà versé', format(result.paid)),
    line('Reste à l’échéancier', format(result.remaining)),
    line('Référence actuelle', format(scenario === 'increase' ? reference + 100_000 : reference)),
    el('p', status[result.status], 'banner')
  );
}
for (const membership of demoData.memberships.filter(x => x.accountId === 'demo-account')) {
  const association = demoData.associations.find(x => x.id === membership.associationId);
  const option = el('option', association.name);
  option.value = association.id;
  associationSelect.append(option);
}
associationSelect.addEventListener('change', () => { renderOverview(); renderAdmission(); });
scenarioSelect.addEventListener('change', renderAdmission);
renderOverview();
renderAdmission();
