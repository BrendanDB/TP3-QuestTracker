# TP3: Quest tracker... 2!

- Pondération: 20%
- Date de remise: Vendredi 18 mars à 14h45 (date de l'examen 2)

- Modalités de remise:
  - Par tag (tag `Remise` sur un commit) via Github, n'oubliez pas d'inviter le prof à votre repository privé
  - **REMISE FERME** (les travaux en retard ne seront pas corrigés)

## Mise en situation et besoins

On vous donne le mandat de créer une application web capable de garder le fil des quêtes complétées et non complétées. On souhaite gérer le statut des quêtes des aventuriers. Les aventuriers pourront aussi s'inscrire et s'authentifier.

Vous aurez besoin d'un projet firebase, d'une base de données firestore et du module d'authentication de firebase.

### Authentication

Les aventuriers souhaitent pouvoir s'authentifier des trois méthodes suivantes:

- email/password
- Google
- Github

### Application frontend

On souhaite avoir les fonctionnalités suivantes:

- S'enregistrer et/ou se connecter
- Ajouter une quête
- Supprimer une quête
- Visualiser les quêtes
- Marquer une quête comme complétée
- Se déconecter (ajout d'un bouton au haut droit de l'écran)

Les fonctionnalités se rapprochent drolement de celles d'un task manager... À ne pas confondre avec le TP4 du cours 420-3W5 Architecture Web.

## Entités

Un aventurier est le user dans la BD, résultat de l'authentification.

Un quête est composée d'un nom, d'un statut de completion et d'un userID

```javascript
{
  name:"Rejoindre la guilde JUSTICE",
  completed: true,
  userId: "ABC123",
}
```

## Clarifications

- Il serait aussi possible de mettre les quêtes d'un aventurier dans une sous-table de user plutôt que d'utiliser un ID. C'est une méthode valide mais nous n'avons pas vu comment faire pour utiliser les `paths` de la sorte. Il vous est toutefois permis de tenter l'expérience.
- Aucune technologie ou librairie n'est enforcée, mise à part firebase et react
