# 🎄 Noëlatoire - Tirage au Sort de Noël 🎁

Une application moderne et festive pour organiser vos tirages au sort de Noël avec style et magie ! ✨

## 🚀 Fonctionnalités

-   **Interface moderne** avec thème de Noël élégant et dégradés sophistiqués
-   **Entièrement responsive** pour tous types d'appareils
-   **Animations fluides** et transitions soignées (sans effets agressifs)
-   **Effet de neige** lors de la révélation du gagnant
-   **Tirages successifs** avec élimination automatique des gagnants précédents
-   **Validation unique des noms** en temps réel avec indicateurs visuels
-   **Système audio personnalisé** avec Easter egg pour certains participants
-   **Contrôle utilisateur** avec toggle pour activer/désactiver les fonctionnalités spéciales
-   **Footer professionnel** avec informations développeur et versioning
-   **Effets visuels élégants** avec rubans cadeaux pour les gagnants
-   **Icônes modernes** avec la bibliothèque Lucide React

## 🎯 Comment utiliser

1. **Choisir le nombre** : Sélectionnez entre 2 et 100 participants
2. **Saisir les noms** : Remplissez les champs avec des noms uniques (validation en temps réel)
3. **Configurer** : Activez ou désactivez l'Easter egg sonore selon vos préférences
4. **Lancer le tirage** : Cliquez sur le bouton magique et découvrez le gagnant !
5. **Tirages multiples** : Effectuez des tirages successifs en éliminant les gagnants précédents

## 🛠 Technologies

-   **Next.js 15** avec App Router
-   **React 19** avec TypeScript
-   **Tailwind CSS** pour le styling avec variables CSS personnalisées
-   **DaisyUI** pour les composants UI modernes
-   **Lucide React** pour les icônes élégantes
-   **Animations CSS** personnalisées et transitions subtiles
-   **Système audio HTML5** avec gestion événementielle avancée

## 🎨 Nouvelles fonctionnalités v1.0.0

### Design & UX

-   Interface avec dégradés et effets glass modernisés
-   Thème de Noël sophistiqué avec palette de couleurs harmonieuse
-   Animations de célébration élégantes pour les gagnants
-   Ruban cadeau visuel avec effets CSS réalistes
-   Footer professionnel avec crédits développeur et versioning
-   Icônes Lucide remplaçant les émojis pour une apparence moderne
-   Responsive design optimisé mobile/desktop

### Fonctionnalités avancées

-   **Tirages successifs** : Elimination automatique des gagnants précédents
-   **Validation unique** : Détection en temps réel des noms en doublon
-   **Indicateurs visuels** : Icônes de conflit (❌) et couronnes pour les gagnants
-   **Limite étendue** : Jusqu'à 100 participants (vs 20 précédemment)
-   **État visuel** : Champs verrouillés pendant les phases de tirage

### Système Audio & Easter Egg

-   **Audio personnalisé** pour certaines combinaisons de participants
-   **Lecture séquentielle** sophistiquée avec gestion d'événements
-   **Support des variantes** de noms avec/sans accents
-   **Toggle de contrôle** pour activer/désactiver les fonctionnalités spéciales
-   **Logique conditionnelle** complexe pour différents scénarios de tirages

### Animations

-   Effet de neige amélioré avec variations naturelles
-   Animation de tirage en 3 phases fluides (rapide → lent → final)
-   Transitions subtiles sans effets agressifs
-   Fade-in/fade-out élégants pour les changements d'état

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

Pour une expérience complète, l'application inclut plusieurs fichiers audio :

-   `public/sounds/christmas2.mp3` - Son par défaut de célébration
-   `public/sounds/ChristmasAurelie.mp3` - Audio personnalisé (Easter egg)
-   `public/sounds/ChristmasManon.mp3` - Audio personnalisé (Easter egg)
-   `public/sounds/ChristmasAll.mp3` - Audio finale pour certains scénarios

Le système audio intelligent :
-   Détecte automatiquement certaines combinaisons de participants
-   Joue des sons personnalisés selon les noms présents
-   Supporte la lecture séquentielle (son personnel → son finale)
-   Peut être désactivé via le toggle Easter egg

## 📱 Compatibilité

-   **Navigateurs modernes** (Chrome, Firefox, Safari, Edge)
-   **Mobile** et tablettes entièrement supportés
-   **Mode sombre** détecté automatiquement
-   **Partage natif** sur navigateurs compatibles

## 🎅 Utilisation recommandée

Parfait pour :

-   **Tirages au sort de Noël** en famille ou entre amis
-   **Événements d'entreprise** de fin d'année avec tirages multiples
-   **Fêtes et animations festives** avec gestion de groupes importants
-   **Distribution de cadeaux** avec élimination progressive des gagnants
-   **Animations spéciales** avec Easter eggs personnalisés pour vos proches

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
