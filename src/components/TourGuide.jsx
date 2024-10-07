// TourGuide.jsx
import React, { useState } from 'react';
import Joyride from 'react-joyride';

const TourGuide = ({ runTour, setRunTour }) => {
  const [stepIndex, setStepIndex] = useState(0);

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

  const handleJoyrideCallback = (data) => {
    const { action, index, type, status } = data;
    if (type === 'step:after' || type === 'target:notFound') {
      setStepIndex(index + (action === 'next' ? 1 : -1));
    } else if (type === 'tour:end' || status === 'finished' || status === 'skipped') {
      setRunTour(false);
      setStepIndex(0);
    }
  };

  return (
    <Joyride
      steps={steps}
      continuous={true}
      showSkipButton={true}
      run={runTour}
      stepIndex={stepIndex}
      callback={handleJoyrideCallback}
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
  );
};

export default TourGuide;