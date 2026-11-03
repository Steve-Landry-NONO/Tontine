# Questions au bureau — réponses recueillies auprès de Steve

Date : 16 octobre 2026. Source : échange de cadrage dans ChatGPT. **Ces réponses sont la position de Steve et des propositions produit ; elles ne valent pas validation du bureau pilote.** Les cinq questions du wireframe V4 et la question du départ restent à confirmer auprès du pilote par l'intermédiaire de Steve.

## 1. Fond d'entrée

- **Pratique actuelle rapportée** : paiement en une fois.
- **Proposition produit** : permettre à chaque association d'activer le paiement en plusieurs versements. L'association définit un délai par défaut, modifiable pour une admission, un échéancier et des rappels. L'accès aux positions et aux tontines attend le paiement complet.
- Le montant annoncé à l'ouverture de l'échéancier reste fixe si le fond de référence augmente pendant les versements.
- Si le fond intégralement payé selon cet échéancier reste sous la nouvelle référence, le bureau décide de l'accès ou du complément éventuel. La décision et son motif doivent être tracés. **À confirmer** : cette exception est en tension avec la règle générale « accès après paiement complet du fond de référence courant » ; aucun accès automatique ne doit être déduit de cette réponse.
- **À demander au bureau** : accepte-t-il le paiement échelonné, le délai et les rappels ? Qui prend la décision d'exception lors d'une hausse, sur quels critères et à quel moment ?

## 2. Tirage et dates

- **Réponse de Steve pour le pilote, à confirmer** : l'ordre des positions est tiré au début du cycle.
- Le nombre de positions servies à une même séance dépend de la tontine ; le paramètre appartient donc à chaque tontine/cycle.
- Un échange de dates entre deux positions nécessite l'accord des deux titulaires et la validation du bureau. Conserver le tirage initial, les consentements, la décision et le calendrier modifié.
- **À demander au bureau** : confirme-t-il ce calendrier et les échanges ? Quel membre du bureau valide, et existe-t-il une date limite avant la séance ?

## 3. Caisses

- **Réponse de Steve pour le pilote, à confirmer** : à une séance de branche, la branche encaisse les remboursements de crédits et les versements de reconstitution pour le compte de l'association, puis les reverse. Tracer l'encaissement, la somme à reverser, l'envoi et la réception ; distinguer la caisse de branche de la caisse d'association.
- Après les reversements dus, le solde propre à la branche reste dans sa caisse et est reporté à l'exercice suivant.
- **À demander au bureau** : confirme-t-il les flux concernés, le délai de reversement, les responsables des deux côtés et le contrôle des écarts ?

## 4. Inéligibilité

- L'inéligibilité commence **après la coupe du fond**, et non dès la prolongation ou la pénalité.
- Le membre conserve l'obligation de cotiser à ses positions en cours. S'il doit recevoir alors que son fond est coupé, Steve propose que le bureau décide du sort de la cagnotte au cas par cas.
- Steve propose également une décision du bureau sur la part d'intérêts annuels du membre concerné.
- **Questions bloquantes pour le calcul** : quelles options précises le bureau peut-il choisir, selon quels critères, avant quelle date, avec quelle information aux membres et quel traitement de la part non attribuée ? Une décision individuelle prise après connaissance du résultat d'un tirage ou du montant du partage serait difficile à auditer. Le code financier attend une règle approuvée.

## 5. Amendes, pénalités et partage

- **Proposition produit** : suivre les amendes et pénalités dans une caisse dédiée. Le solde est reporté en réserve par défaut et n'entre pas automatiquement dans le partage annuel. Des transferts partiels ou complets entre caisses peuvent être décidés, avec source, destination, montant, motif, approbation et historique. La présentation des « caisses » doit distinguer les comptes physiques et les enveloppes comptables pour ne pas compter deux fois les mêmes fonds.
- **Réponse de Steve, à confirmer** : partager les intérêts des crédits **nets des intérêts bancaires à la charge de l'association**.
- **À préciser** : les intérêts bancaires compensés par un adhérent ne doivent pas être déduits deux fois. Définir leur compensation, le rattachement des amendes à la branche ou à l'association et les pouvoirs de transfert. Aucun transfert d'argent ne peut être validé par son propre saisissant.

## 6. Départ d'un adhérent

- Steve propose une décision du bureau au cas par cas sur la restitution du fond.
- **À demander au bureau avant implémentation** : quelles sommes peuvent être déduites, que deviennent les positions en cours, quel délai de paiement, qui approuve, et comment le membre peut consulter la décision ? La liquidation financière reste hors du premier flux automatisé tant que ces règles ne sont pas établies.

## Statut d'implémentation

Document de cadrage uniquement. Aucun paiement, tirage, partage, transfert ni départ n'est implémenté. Les réponses ci-dessus ne constituent pas des autorisations de mouvement financier. Prochaine étape : retour du bureau pilote via Steve, puis traduction des règles confirmées en critères d'acceptation et modèle de données.

## Stratégie de développement et de validation en séance pilote

Décision de travail du 3 novembre 2026 : avancer avec les hypothèses ci-dessus, puis les soumettre au bureau dans un parcours concret. Le statut de chaque règle doit être visible : **pratique rapportée**, **hypothèse proposée**, **validée par le bureau** ou **à arbitrer**. Une réponse en séance met à jour la règle, ses critères d'acceptation et les tests avant l'activation de l'opération concernée.

### Ce que l'on peut construire maintenant

1. Socle multi-association : adhérents, rôles par association/branche, tontines, cycles, positions, séances et paramètres versionnés.
2. Accès et contrôle : permissions côté serveur, séparation entre saisie et approbation, journal de toutes les décisions et corrections par contre-écriture.
3. Parcours de démonstration avec données fictives : admission en une fois ou échéancier, préparation du cycle, tirage et calendrier, encaissement partiel, file hors connexion, contrôle et transfert de caisse.
4. Écrans de prévisualisation des conséquences : simulation d'un fond sous la référence, d'un partage net, d'une réserve d'amendes et d'un départ. Les opérations dont la règle est à arbitrer restent en simulation ou en attente de décision.
5. Configuration explicite des choix propres à l'association avec date d'effet. Une règle changée après la réunion ne réécrit pas les mouvements historiques.

### Séance pilote : questions posées au moment utile

- Pendant l'admission : « Acceptez-vous cet échéancier ? Si la référence monte avant la fin, qui décide de l'accès et sur quelle base ? »
- Devant le calendrier tiré : « Ce nombre de mains par séance et cet échange de dates correspondent-ils à vos pratiques ? Qui valide l'échange ? »
- Pendant l'encaissement : « Le trésorier de branche reçoit-il aussi ce remboursement destiné à l'association ? Sous quel délai et avec quelle preuve le reverse-t-il ? »
- Sur un cas de fond coupé : « Le membre doit recevoir à cette date : que décide le bureau, à quel moment et selon une règle connue de tous ? »
- À la clôture annuelle : « La réserve d'amendes reste-t-elle à la branche ou à l'association ? Quelles charges bancaires sont réellement déduites du partage ? »
- Pour un départ : « Quel montant du fond serait restitué après les engagements en cours, par qui et quand ? »

Steve reste l'intermédiaire avec le bureau. Les retours de la réunion sont consignés comme décisions datées, avec les participants, puis traduits en changement de configuration ou en développement. Le parcours pilote peut commencer avec des données fictives ; toute utilisation de fonds réels attend la validation du flux concerné et de ses contrôles.
