import React, { useState, useEffect } from 'react';
import './Notepad.css';
import OrbitingCircles from './OrbitingCircles'; // Importer le composant OrbitingCircles

interface NotepadProps {
    image: string; // Définir le type pour l'image en tant que chaîne
}

const Notepad: React.FC<NotepadProps> = ({ image }) => {
    const [displayedText, setDisplayedText] = useState<string[]>([]);
    const fullText: string = `
        Salut ! Je m'appelle Olivier et je suis passionné par la création de projets web.
        Mon parcours a débuté en explorant le développement front-end avec HTML, CSS,
        et des technologies comme JavaScript, Python, Bootstrap, et GSAP.
        Aujourd'hui, je me concentre sur la création d'applications web complètes.
        Voici les langages de programmation utilisés pour mes projets les plus récents.
    `;

    useEffect(() => {
        const lines: string[] = fullText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        let isMounted = true; // Flag to check if the component is mounted

        // Ajoutez un délai avant de commencer à afficher les lignes
        const delayBeforeDisplay = async (delay: number) => {
            await new Promise<void>(resolve => setTimeout(resolve, delay));
        };

        const displayLines = async () => {
            await delayBeforeDisplay(200); // Délai de 1 seconde avant d'afficher les lignes

            for (let i = 0; i < lines.length; i++) {
                if (!isMounted) return; // Exit if the component is unmounted
                await new Promise<void>(resolve => setTimeout(resolve, 1000)); // Délai de 1 seconde entre chaque ligne
                setDisplayedText(prev => [...prev, lines[i]]); // Ajoute chaque ligne
            }
        };

        displayLines();

        return () => {
            isMounted = false; // Cleanup function to set the flag to false
        };
    }, []); // Utiliser un tableau vide pour s'assurer que l'effet ne s'exécute qu'une seule fois

    return (
        <div className="notepad">
            <div className="notepad-content">
                {displayedText.map((line, index) => (
                    <div key={index} className="notepad-line">
                        <span className="line-number">{index + 1}</span>
                        <span className="line-text">{line}</span>
                    </div>
                ))}
                <OrbitingCircles /> {/* Ajouter le composant OrbitingCircles après le texte */}
            </div>
            <div className="notepad-image">
                <img src={image} alt="Olivier" />
            </div>
        </div>
    );
};

export default Notepad;