# Architecture V0 — premier incrément exécutable

## Périmètre livré

- Le site public V4 reste à la racine. `demo/` est un parcours interactif autonome avec deux associations et des personnes fictives.
- `src/domain.js` valide les liens entre objets et construit une vue limitée à une association pour un compte déjà membre. Les tests vérifient la séparation et l'état d'admission.
- `db/001_core.sql` prépare la structure PostgreSQL : compte par téléphone, adhésions propres à chaque association, fonctions de bureau propres à l'association ou à la branche, fond de référence versionné, tontines, cycles, positions et admissions. Les clés étrangères composites empêchent une position de pointer vers un membre d'une autre association.

## Frontières de confiance

La démonstration tourne dans le navigateur : elle ne possède ni authentification, ni persistance, ni mouvement d'argent. Le filtrage JavaScript illustre le produit, mais **ne protège aucune donnée réelle**. Le futur serveur devra établir l'identité, vérifier l'adhésion et les droits à chaque requête, puis utiliser des politiques de base de données adaptées. La migration active RLS sans politique d'accès : une application ordinaire ne peut donc pas utiliser ces tables tant que les politiques et le serveur ne sont pas livrés.

Les rôles ne sont pas des propriétés globales du compte. Le schéma sépare `accounts`, `memberships` et `office_assignments`. Un même numéro peut être trésorier d'une association et membre d'une autre. Les montants sont des entiers en XAF ; les dates d'effet de référence sont conservées.

## Hypothèses et limites

- L'échéancier fixe le montant annoncé à l'entrée. Un solde sous la nouvelle référence après hausse produit `bureau_review` et n'ouvre pas automatiquement l'accès. La décision exceptionnelle n'est pas encore un droit technique.
- Le nombre de positions servies par séance appartient au cycle. Le tableau fictif est un calendrier préparé, **pas un tirage** ; aucun résultat aléatoire n'est produit côté navigateur.
- Il n'existe pas encore de caisse, de ledger, de versement validé, de transfert, de partage, d'échange de dates ou de clôture. Les règles financières ouvertes restent dans la PR de cadrage #2.
- Le schéma SQL n'a pas été appliqué à une base : aucune connexion PostgreSQL du projet n'a été fournie ou créée pour cet incrément.

## Prochain incrément

Mettre en place l'API authentifiée et les politiques d'isolation, puis exposer un parcours de création d'association et d'adhésion. Les écritures financières viendront avec journal immuable, idempotence et double validation. Les scénarios de séance seront testés avec le bureau sur données fictives avant usage réel.
