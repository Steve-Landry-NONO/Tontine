# Gestion d'association et de tontines — écrans de travail

Wireframes d'une application de gestion d'association tontinière, publiés pour relecture par l'association pilote.

**À consulter ici :** https://Steve-Landry-NONO.github.io/Tontine/

---

## De quoi il s'agit

L'application vise à remplacer le carnet du trésorier par un registre numérique partagé : une traçabilité précise des fonds, un historique consultable par tous, et des synthèses lisibles en un coup d'œil.

Elle est pensée pour être utilisable par n'importe quelle association tontinière, pas seulement par le pilote.

### Ce que le modèle couvre

- **L'association et son fond** — entrée d'un adhérent, paiement du fond, niveau du fond
- **Les tontines** — plusieurs en parallèle, séance, encaissement, tirage du bénéficiaire, clôture
- **Le crédit** — prêts aux membres et emprunt de l'association à la banque
- **La reconstitution** — événement, délai, suivi des reconstitutions non réalisées
- **La caisse et le bilan** — situation de caisse au quotidien, bilan mensuel et annuel

---

## Comment lire les écrans

Les maquettes sont **volontairement en noir et blanc**. À ce stade, ce qui compte est ce que chaque écran doit contenir et qui a le droit de faire quoi. L'apparence viendra plus tard.

- Les noms et les montants sont fictifs.
- À droite de chaque écran, une note explique ce qu'il résout.
- **Six blocs encadrés en jaune sont des questions posées à l'association.** Pour chacune, les deux options sont dessinées côte à côte : on choisit en regardant, pas en imaginant.

---

## Les six questions ouvertes

Le travail est suspendu à ces réponses. Les trois premières conditionnent presque tout le reste.

| | Question |
|---|---|
| 1 | **Le fond** — apport individuel de chaque adhérent, ou objectif collectif de l'association ? Restitué au départ d'un membre ? |
| 2 | **Les tontines** — tout le monde participe aux trois, ou chacun s'inscrit ? Rythmes identiques ou différents ? |
| 3 | **La reconstitution** — que se passe-t-il si le délai est dépassé ? Porte-t-elle un intérêt ? Cumulable avec un crédit ? |
| 4 | **L'emprunt bancaire** — dans quels cas, quelle garantie, et qui supporte les intérêts ? |
| 5 | **La fin d'année** — le fond reste-t-il en place, ou tout est-il redistribué ? Bénéfice à parts égales ou au prorata ? |
| 6 | **Les amendes** — en pratique-t-on ? Si oui, quel barème ? |

---

## Ce qui n'est pas encore dessiné

Création de l'association et saisie de son règlement, invitation des adhérents, échange de tours entre participants, rapprochement des paiements Mobile Money côté trésorier.

Ces écrans dépendent trop des six réponses ci-dessus pour être dessinés maintenant.

---

## Décisions techniques déjà prises

- **Multi-association** — un compte unique, identifié par le numéro de téléphone, donne accès à toutes les associations d'une personne. Le rôle est attaché à l'adhésion, pas à la personne.
- **Application connectée**, avec une exception : l'encaissement en séance continue de fonctionner hors réseau et se synchronise ensuite. Sans cela, une coupure devant l'assemblée ferait ressortir le carnet.
- **Rien ne s'efface** — une écriture validée se corrige par une écriture inverse, motivée et datée, jamais par une suppression.
- **Aucun mouvement d'argent validé par une seule personne** — le trésorier propose la clôture, le président valide.
- **Le tirage est calculé côté serveur**, à partir d'un nombre annoncé publiquement en séance, et reste rejouable par n'importe quel membre.
- **Moyens de paiement visés au démarrage** (pilote au Gabon) : Airtel Money, Mobicash, Express Union Mobile. Les espèces restent le mode par défaut.

---

## Contenu du dépôt

| Fichier | Rôle |
|---|---|
| `index.html` | Les wireframes. Fichier autonome, aucune dépendance externe. |
| `robots.txt` | Empêche l'indexation par les moteurs de recherche. |
| `README.md` | Ce document. |

---

## Publier ou mettre à jour

Le site est servi par GitHub Pages depuis la branche `main`, dossier racine.

Pour publier une nouvelle version, remplacer `index.html` et pousser. La mise en ligne prend une à deux minutes.

```
git add index.html
git commit -m "Wireframes v2 — modèle association et fond"
git push
```

---

## Retours

Les remarques peuvent être faites question par question, en indiquant le numéro. Une réponse même partielle sur les questions 1, 3 et 5 permet de reprendre le travail.

---

*Version 2 — septembre 2026. Document de travail, susceptible d'évoluer à chaque échange avec l'association pilote.*
