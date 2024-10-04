import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Taskbar from './components/Taskbar';
import DesktopIcon from './components/DesktopIcon';
import PopupWindow from './components/PopupWindow';
import ContactForm from './components/ContactForm.jsx';
import Notepad from './components/Notepad';
import './App.css';
import githubIcon from './assets/img/github.png';
import cvIcon from './assets/img/cv.png';
import infoIcon from './assets/img/Info.png';
import contactIcon from './assets/img/contact.png';
import sociauxIcon from './assets/img/sociaux.png';
import realisationIcon from './assets/img/realisations.png';
import olivierPhoto from './assets/img/olivier.png'; // Ajoutez votre photo ici

const App = () => {
  const [popup, setPopup] = useState({ isOpen: false, title: '', content: null, position: { top: 100, left: 100 } });
  const [searchQuery, setSearchQuery] = useState('');
  const [icons, setIcons] = useState([
    { id: 'github', label: 'Mon Github', image: githubIcon },
    { id: 'CV', label: 'Mon CV', image: cvIcon },
    { id: 'info', label: 'Qui suis-je', image: infoIcon },
    { id: 'contact', label: 'Me contacter', image: contactIcon },
    { id: 'sociaux', label: 'Mes réseaux sociaux', image: sociauxIcon },
    { id: 'realisations', label: 'Mes réalisations', image: realisationIcon },
  ]);

  const contentMap = {
    github: { title: 'Mon GitHub', content: <p>Voici le lien vers mon GitHub.</p> },
    CV: { title: 'Mon CV', content: <p>Voici mon CV en PDF.</p> },
    info: { 
      title: 'Qui suis-je', 
      content: (
        <Notepad 
          image={olivierPhoto} 
        />
      ) 
    },
    contact: { title: 'Me contacter', content: <ContactForm /> },
    sociaux: { title: 'Mes réseaux sociaux', content: <p>Liens vers mes réseaux sociaux.</p> },
    realisations: { title: 'Mes réalisations', content: <p>Liens vers mes dernières réalisations.</p> },
};


  const openPopup = (iconId) => {
    const { title, content } = contentMap[iconId];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setPopup({ isOpen: true, title, content, position: { top: centerY - 100, left: centerX - 200 } });
  };

  const closePopup = () => {
    setPopup(prevState => ({ ...prevState, isOpen: false }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const moveIcon = (dragIndex, hoverIndex) => {
    const draggedIcon = icons[dragIndex];
    const updatedIcons = [...icons];
    updatedIcons.splice(dragIndex, 1);
    updatedIcons.splice(hoverIndex, 0, draggedIcon);
    setIcons(updatedIcons);
  };

  const filteredIcons = icons.filter(icon => icon.label.toLowerCase().includes(searchQuery));

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <div className="desktop">
          {filteredIcons.map((icon, index) => (
            <DesktopIcon 
              key={icon.id} 
              id={icon.id} 
              label={icon.label} 
              image={icon.image} 
              index={index}
              moveIcon={moveIcon}
              onClick={(e) => openPopup(icon.id)} // Ouvre la fenêtre en cliquant sur l'icône
            />
          ))}
        </div>
        <Taskbar icons={filteredIcons} onIconClick={openPopup} onSearch={handleSearch} />
        {popup.isOpen && (
          <PopupWindow 
            title={popup.title} 
            content={popup.content} 
            onClose={closePopup} 
            initialPosition={popup.position} // Position au centre de l'écran
          />
        )}
      </div>
    </DndProvider>
  );
};

export default App;