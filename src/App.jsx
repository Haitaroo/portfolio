import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Joyride from 'react-joyride';
import Taskbar from './components/Taskbar';
import DesktopIcon from './components/DesktopIcon';
import PopupWindow from './components/PopupWindow';
import ContactForm from './components/ContactForm.jsx';
import Notepad from './components/Notepad';
import WindowsWelcome from './components/WindowsWelcome';
import MusicPlayer from './components/MusicPlayer';

import './App.css';
import githubIcon from './assets/img/github.png';
import cvIcon from './assets/img/cv.png';
import infoIcon from './assets/img/Info.png';
import contactIcon from './assets/img/contact.png';
import sociauxIcon from './assets/img/sociaux.png';
import realisationIcon from './assets/img/realisations.png';
import olivierPhoto from './assets/img/olivier.png';
import spotifyIcon from './assets/img/30secplayer.png';

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
    { id: 'spotify', label: 'U.B.E', image: spotifyIcon },
  ]);
  const [countdown, setCountdown] = useState(2);
  const [intervalId, setIntervalId] = useState(null);
  const [blinkOrder, setBlinkOrder] = useState(['github', 'CV', 'info', 'contact', 'sociaux', 'realisations']);
  const [blinkTime, setBlinkTime] = useState(1000);
  const [currentBlinkIndex, setCurrentBlinkIndex] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [runTour, setRunTour] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [isPopupMaximized, setIsPopupMaximized] = useState(false);

  const handleMinimize = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  
  const handleMaximize = () => {
    setIsPopupMaximized(!isPopupMaximized);
  };

  const contentMap = {
    github: { title: 'Mon GitHub', content: <p>Voici le lien vers mon GitHub.</p> },
    CV: { 
      title: 'Mon CV', 
      content: (
        <iframe
          src="/portfolio/fichiers/CV_Olivier_BARBIN.pdf"
          type="application/pdf"
          width="100%"
          height="400px"
          style={{ border: 'none' }}
          title="CV"
        />
      ) 
    },
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
    spotify: { title: 'Une breve écoute', content: <MusicPlayer volume={volume} setVolume={setVolume} /> }, // Passer setVolume ici
  };
  
  const steps = [
    {
      target: '.desktop-icon',
      content: 'Voici vos icônes de bureau. Cliquez sur une icône pour ouvrir une application.',
      disableBeacon: true,
    },
    {
      target: '.taskbar',
      content: 'Voici votre barre des tâches. Utilisez-la pour accéder rapidement aux applications.',
      disableBeacon: true,
    },
    {
      target: '.taskbar-search',
      content: 'Utilisez la barre de recherche pour trouver rapidement des applications.',
      disableBeacon: true,
    },
  ];

  const openPopup = (iconId) => {
    setIsPopupVisible(true);
  
    if (iconId === 'github') {
      setCountdown(2);
      if (intervalId) {
        clearInterval(intervalId);
      }
  
      setPopup({
        isOpen: true,
        title: 'Redirection vers GitHub',
        content: <p>Direction vers mon GitHub dans 2 secondes...</p>,
        position: { top: window.innerHeight / 2 - 100, left: window.innerWidth / 2 - 200 }
      });
  
      const newIntervalId = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown === 1) {
            clearInterval(newIntervalId);
            window.open('https://github.com/Haitaroo/', '_blank');
            setPopup({ isOpen: false, title: '', content: null, position: { top: 0, left: 100 } });
            setCountdown(2);
          }
          return prevCountdown - 1;
        });
      }, 1000);
  
      setIntervalId(newIntervalId);
      return;
    }
  
    if (iconId === 'CV') {
      setPopup({
        isOpen: true,
        title: 'Mon CV',
        content: (
          <iframe
            src="/portfolio/fichiers/CV_Olivier_BARBIN.pdf"
            width="100%"
            height="1000px"
            style={{ border: 'none' }}
            title="CV"
          />
        ),
        position: { top: window.innerHeight / 2 - 250, left: window.innerWidth / 2 - 200 }
      });
      return;
    }
  
    const { title, content } = contentMap[iconId];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setPopup({ isOpen: true, title, content, position: { top: centerY - 100, left: centerX - 200 } });
  };

  const closePopup = () => {
    setPopup(prevState => ({ ...prevState, isOpen: false }));
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setCountdown(2);
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
  
  useEffect(() => {
    if (!showWelcome) {
      setRunTour(true);
    }
  }, [showWelcome]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        {showWelcome ? (
          <WindowsWelcome onClose={() => setShowWelcome(false)} />
        ) : (
          <>
            <Joyride
              steps={steps}
              continuous={true}
              showSkipButton={true}
              run={runTour}
              stepIndex={stepIndex}
              callback={(data) => {
                const { action, index, type } = data;
                if (type === 'step:after' || type === 'target:notFound') {
                  setStepIndex(index + (action === 'next' ? 1 : -1));
                } else if (type === 'tour:end') {
                  setRunTour(false);
                  setStepIndex(0);
                }
              }}
              styles={{
                options: {
                  zIndex: 10000,
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                  padding: '20px',
                  maxWidth: '300px',
                },
              }}
            />
            <div className="desktop">
              {filteredIcons.map((icon, index) => (
                <DesktopIcon 
                  key={icon.id} 
                  id={icon.id} 
                  label={icon.label} 
                  image={icon.image} 
                  index={index}
                  moveIcon={moveIcon}
                  onClick={(e) => openPopup(icon.id)} 
                />
              ))}
            </div>
            <Taskbar 
              icons={icons} // Pass icons prop here
              onIconClick={openPopup} 
              onSearch={handleSearch} 
              volume={volume} 
              setVolume={setVolume}
            />
            {popup.isOpen && (
              <PopupWindow 
                title={popup.title} 
                content={popup.content} 
                onClose={closePopup} 
                initialPosition={popup.position}
                onMinimize={handleMinimize}
                onMaximize={handleMaximize}
                isMaximized={isPopupMaximized}
                isVisible={isPopupVisible}
              />
            )}
          </>
        )}
      </div>
    </DndProvider>
  );
};

export default App;