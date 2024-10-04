# 💼 Olivier Barbin - Portfolio Interactif

Bienvenue sur mon portfolio interactif développé avec **React**, conçu pour offrir une expérience utilisateur unique et immersive. Que vous soyez un recruteur, un collaborateur ou simplement curieux de découvrir mon parcours, ce portfolio présente de manière dynamique qui je suis, mes compétences, mes réalisations et bien plus encore. 

## 🌟 Fonctionnalités principales

- **Icônes de bureau dynamiques** : Chaque section est représentée par des icônes de style Windows, permettant une navigation fluide et intuitive. Cliquez sur une icône pour ouvrir une fenêtre et découvrir les informations associées.
- **Fenêtres interactives** : Chaque section s'ouvre sous forme de fenêtres popup, pour une exploration immersive.
- **Formulaire de contact intégré** : Besoin de me contacter ? Envoyez-moi un message directement depuis le site grâce à un formulaire de contact ergonomique et sécurisé via EmailJS.
- **Responsive Design** : Que vous soyez sur ordinateur, tablette ou smartphone, le design s’adapte pour garantir une expérience optimale.

## 📂 Structure du Projet

Mon portfolio est construit avec des composants réutilisables et bien organisés :

- **src/components** : Contient tous les composants React.
    - `Taskbar.jsx` : Barre des tâches avec icônes et barre de recherche.
    - `DesktopIcon.jsx` : Gestion des icônes de bureau.
    - `PopupWindow.jsx` : Fenêtres pour chaque section du portfolio.
    - `ContactForm.jsx` : Formulaire de contact.
    - `Notepad.jsx` : Informations personnelles affichées de manière créative.
- **src/assets** : Stocke les images et ressources.
- **src/App.jsx** : Composant principal orchestrant l’application.
- **src/App.css** : Styles globaux pour uniformiser le design.


## ⚙️ Installation & Utilisation

1. Clonez ce dépôt sur votre machine :
   ```bash
   git clone https://github.com/haitaroo/portfolio.git
   ```
2. Accédez au répertoire du projet :
   ```bash
   cd portfolio
   ```
3. Installez les dépendances nécessaires :
   ```bash
   npm install
   ```
4. Lancez le serveur de développement :
   ```bash
   npm start
   ```
5. Ouvrez votre navigateur et visitez [http://localhost:3000](http://localhost:3000) pour explorer le portfolio.

## 🎨 Personnalisation

Pour adapter ce portfolio à vos besoins, vous pouvez facilement :

- Ajouter ou modifier des icônes et leur contenu dans `src/App.jsx`.
- Créer de nouveaux composants ou ajuster ceux existants dans `src/components`.
- Remplacer les images dans `src/assets` pour refléter votre style personnel.

## 🚀 Déploiement

Déployez facilement ce portfolio en ligne grâce à des services comme **GitHub Pages**, **Vercel** ou **Netlify**. Par exemple, pour un déploiement sur GitHub Pages :

1. Installez le package `gh-pages` :
   ```bash
   npm install gh-pages --save-dev
   ```
2. Ajoutez les scripts suivants à votre `package.json` :
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Déployez le portfolio :
   ```bash
   npm run deploy
   ```

## ✨ Pourquoi ce projet ?

Ce portfolio n'est pas qu'une simple vitrine ; il est conçu pour démontrer ma maîtrise technique de **React**, **CSS** et de l'architecture des applications modernes. Il reflète aussi mon souci du détail et mon engagement à offrir des expériences utilisateurs riches, fluides et visuellement plaisantes.

## 🤝 Contribuer

Vous avez une suggestion, une amélioration ou avez trouvé un bug ? Je suis toujours ouvert aux idées ! N'hésitez pas à ouvrir une **issue** ou soumettre une **pull request**.

## 📄 Licence

Ce projet est sous licence **MIT**. Consultez le fichier [LICENSE](./LICENSE) pour plus de détails.

---

Merci de prendre le temps de découvrir mon portfolio. J’espère que cette expérience interactive vous a plu, et n’hésitez pas à me contacter pour toute question ou collaboration future !

---

### 📬 Restons en contact !
[LinkedIn](https://www.linkedin.com/in/taro974/) | [GitHub](https://github.com/haitaroo) | [Me contacter via le site](https://haitaroo.github.io/portfolio)
