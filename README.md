# Gestion d'association et de tontines — écrans de travail

Wireframes d'une application de gestion d'association tontinière, publiés pour relecture par l'association pilote (Gabon).

**À consulter ici :** https://steve-landry-nono.github.io/Tontine/

---

## De quoi il s'agit

L'application remplace le carnet du trésorier par un registre numérique partagé : traçabilité précise des fonds, historique consultable par tous, synthèses lisibles en un coup d'œil. Elle est pensée pour servir n'importe quelle association tontinière, pas seulement le pilote.

## Le modèle (version 4)

```
Association          bureau · fond de référence · caisse (fond, crédits, reconstitution)
 └ Branche           ex. Élites Bayangam, Femmes Bayangam — bureau, jours de séance, caisse
    └ Tontine        = un taux, ex. 1 000 000 par séance — un cycle, une cagnotte, pas de bureau
       └ Position    une « main » ; un adhérent peut en détenir plusieurs
```

- **On tire des positions, pas des personnes.** Deux positions dans le même taux, c'est deux mains.
- **Le fond de référence** fixe le ticket d'entrée, monte chaque année avec le partage des intérêts, et un fond qui tombe sous ce niveau rend inéligible.
- **Autour du fond** : crédit aux adhérents, emprunt bancaire, reconstitution (prolongation → pénalité → coupe du fond), amendes.

## Décisions actées avec le pilote

| Sujet | Décision |
|---|---|
| Fond | Chaque adhérent verse le fond de référence (5 000 000 FCFA au départ) |
| Tontines | Chacun choisit ses tontines ; un taux unique par groupe ; on ne bouffe que dans sa tontine et son taux |
| Positions | Plusieurs positions possibles, dans un taux ou dans plusieurs |
| En cours de cycle | Pas de déplacement, pas d'abandon de position |
| Délai de reconstitution dépassé | Prolongation, puis pénalité, puis coupe du fond → inéligible |
| Intérêts bancaires | Payés par l'association (sortie de caisse), compensés par l'adhérent bénéficiaire ou débités de son fond |
| Fin d'année | Intérêts des crédits partagés à parts égales et ajoutés au fond de chacun ; ce niveau devient le nouveau ticket d'entrée |
| Amendes | Existent, entrent en caisse |
| Configuration | Sanctions, taux et quasi-totalité des réglages nommés et chiffrés par chaque association |
| Branches | Chaque branche a son bureau, ses jours de séance et sa caisse ; une tontine relève du bureau de sa branche |
| Tontine | Une tontine = un taux (montant de cotisation) |
| Bureaux | Président, trésorier(s), commissaire aux comptes, secrétaire(s) ; droits propres à chaque fonction |
| Plusieurs trésoriers | Option de configuration ; si activée, choix de donner ou non les mêmes droits |
| Programme général | Coordonné par le secrétaire général avec les secrétaires de branche |

## Les cinq questions ouvertes

1. **Le fond d'entrée** se paie-t-il en une fois ou en plusieurs versements ?
2. **Le tirage** a-t-il lieu à chaque séance, ou l'ordre complet est-il tiré au début du cycle ?
3. **Les deux caisses** — un crédit remboursé à la séance d'une branche : la branche encaisse et reverse, ou l'association encaisse elle-même ?
4. **L'inéligibilité** — un adhérent au fond coupé peut-il encore bouffer ses positions en cours ? Garde-t-il sa part des intérêts ?
5. **Les amendes et pénalités** restent-elles en caisse ou s'ajoutent-elles au partage ?

Pour chacune, le document dessine les options côte à côte.

## Décisions techniques

- **Multi-association** : un compte unique par numéro de téléphone ; le rôle est attaché à chaque adhésion.
- **Application connectée**, sauf l'encaissement en séance, qui continue hors réseau et se synchronise ensuite.
- **Rien ne s'efface** : une écriture validée se corrige par une écriture inverse, motivée et datée.
- **Double validation** des mouvements d'argent : le trésorier propose, le président valide.
- **Tirage calculé côté serveur**, à partir d'un nombre annoncé en séance, archivé et rejouable.
- **Paiements visés au démarrage** : Airtel Money, Mobicash, Express Union Mobile. Les espèces restent le mode par défaut.

## Contenu du dépôt

| Fichier | Rôle |
|---|---|
| `index.html` | Les wireframes. Fichier autonome, aucune dépendance externe. |
| `robots.txt` | Empêche l'indexation par les moteurs de recherche. |
| `README.md` | Ce document. |

Le site est servi par GitHub Pages depuis la branche `main`, dossier racine. Remplacer `index.html` et pousser suffit à publier une nouvelle version.

---

*Version 4 — septembre 2026. Document de travail, mis à jour à chaque échange avec l'association pilote.*
