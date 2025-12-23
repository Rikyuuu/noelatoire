# 🎄 Noëlatoire - Tirage au Sort de Noël 🎁

Une application moderne et festive pour organiser vos tirages au sort de Noël avec style et magie ! ✨

## 🚀 Fonctionnalités

-   **Interface moderne** avec thème de Noël élégant
-   **Entièrement responsive** pour tous types d'appareils
-   **Animations fluides** et transitions soignées
-   **Effet de neige** lors de la révélation du gagnant
-   **Son de célébration** (fichier audio à ajouter)
-   **Tirage progressif** avec suspense croissant
-   **Partage des résultats** (sur navigateurs compatibles)
-   **Validation intelligente** des participants

## 🎯 Comment utiliser

1. **Choisir le nombre** : Sélectionnez entre 2 et 20 participants
2. **Saisir les noms** : Remplissez les champs avec les noms des participants
3. **Lancer le tirage** : Cliquez sur le bouton magique et découvrez le gagnant !

## 🛠 Technologies

-   **Next.js 15** avec App Router
-   **React 19** avec TypeScript
-   **Tailwind CSS** pour le styling
-   **DaisyUI** pour les composants
-   **Animations CSS** personnalisées

## 🎨 Nouvelles fonctionnalités

### Design & UX

-   Interface avec dégradés et effets glass
-   Thème de Noël avec couleurs festives
-   Animations de célébration pour le gagnant
-   Indicateurs de progression visuels
-   Responsive design optimisé mobile/desktop

### Animations

-   Effet de neige amélioré avec variations
-   Animation de tirage en 3 phases (rapide → lent → final)
-   Confettis animés lors de la révélation
-   Transitions fluides entre les étapes

### Fonctionnalités

-   Validation en temps réel des champs
-   Compteur de participants valides
-   Boutons de partage et nouveau tirage
-   Son de célébration automatique
-   Gestion d'erreurs améliorée

## 🚀 Installation et démarrage

```bash
# Cloner le projet
git clone [url-du-repo]
cd noelatoire

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Construire pour la production
npm run build
npm start
```

## 📁 Structure du projet

```
src/
├── app/
│   ├── globals.css          # Styles globaux et animations
│   ├── layout.tsx           # Layout principal avec métadonnées
│   ├── page.tsx            # Page principale
│   └── enum/
│       └── StepEnum.ts     # Énumération des étapes
└── components/
    ├── common/
    │   └── Steps.tsx       # Indicateur de progression
    ├── DrawButton.tsx      # Bouton de tirage amélioré
    ├── ParticipantAnimation.tsx # Animation du tirage
    ├── ParticipantForm.tsx # Formulaire des participants
    ├── ParticipantList.tsx # Liste responsive des champs
    ├── Snowfall.tsx       # Effet de neige optimisé
    └── WinnerDisplay.tsx   # Affichage spectaculaire du gagnant
```

## 🎵 Fichiers audio

Pour une expérience complète, ajoutez un fichier audio de Noël :

-   Créez le dossier `public/sounds/`
-   Ajoutez votre fichier `christmas2.mp3`
-   Le son se jouera automatiquement lors de la révélation du gagnant

## 📱 Compatibilité

-   **Navigateurs modernes** (Chrome, Firefox, Safari, Edge)
-   **Mobile** et tablettes entièrement supportés
-   **Mode sombre** détecté automatiquement
-   **Partage natif** sur navigateurs compatibles

## 🎅 Utilisation recommandée

Parfait pour :

-   Tirages au sort de Noël en famille
-   Événements d'entreprise de fin d'année
-   Fêtes et animations festives
-   Distribution de cadeaux et surprises

## 🔧 Personnalisation

Le thème peut être facilement modifié dans `tailwind.config.ts` :

-   Couleurs du thème de Noël
-   Animations personnalisées
-   Variants responsive

---

**Joyeux Noël et amusez-vous bien avec vos tirages au sort ! 🎄✨**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# noelatoire
