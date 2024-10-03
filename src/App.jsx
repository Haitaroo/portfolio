import React, { useState } from 'react';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import DesktopIcon from './components/DesktopIcon';
import './App.css';

const App = () => {
  // Définition d'un tableau d'icônes
  const icons = [
    { id: 'github', label: 'Mon Github', image: require('./assets/img/github.png') },
    { id: 'CV', label: 'Mon CV', image: require('./assets/img/cv.png') },
    { id: 'contact', label: 'Qui suis-je', image: require('./assets/img/Info.png') },
    { id: 'contact', label: 'Me contacter', image: require('./assets/img/contact.png') },
    { id: 'contact', label: 'Mes réseaux sociaux ', image: require('./assets/img/sociaux.png') },
  ];

  const [selectedIcons, setSelectedIcons] = useState([]);

  const handleSelect = (id) => {
    setSelectedIcons((prev) => {
      if (prev.includes(id)) {
        return prev.filter(iconId => iconId !== id); // Désélectionne si déjà sélectionné
      }
      return [...prev, id]; // Sélectionne
    });
  };

  return (
    <div className="app">
      <h1>Mon Portfolio</h1>
      <div className="desktop">
        {icons.map(icon => (
          <DesktopIcon 
            key={icon.id} 
            id={icon.id} 
            onSelect={handleSelect} 
            selected={selectedIcons.includes(icon.id)} 
            label={icon.label} 
            image={icon.image} 
          />
        ))}
      </div>
      <Taskbar />
    </div>
  );
};

export default App;
