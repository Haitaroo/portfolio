import React, { useState, useEffect } from 'react';
import './Notepad.css';
import OrbitingCircles from './OrbitingCircles'; // Composant OrbitingCircles

interface NotepadProps {
    image: string;
}

const Notepad: React.FC<NotepadProps> = ({ image }) => {
    const [displayedText, setDisplayedText] = useState<string[]>([]);
    const [showFullText, setShowFullText] = useState(false); // État pour gérer l'affichage complet du texte

    const fullText: string = `
        Salut ! Je m'appelle Olivier et je suis passionné par la création de projets web.
        Mon parcours a débuté en explorant le développement front-end avec HTML, CSS,
        et des technologies comme JavaScript, Python, Bootstrap, et GSAP.
        Aujourd'hui, je me concentre sur la création d'applications web complètes`;

    const firstSentence: string = fullText.split('\n')[1].trim(); // Première phrase du texte

    useEffect(() => {
        let isMounted = true;

        const displayInitialText = async () => {
            if (isMounted) {
                setDisplayedText([firstSentence]); // Affiche seulement la première phrase
            }
        };

        displayInitialText();

        return () => {
            isMounted = false;
        };
    }, [firstSentence]);

    const handleShowMore = () => {
        const remainingText = fullText
            .split('\n')
            .slice(2)
            .map(line => line.trim())
            .filter(line => line.length > 0); // Supprime les lignes vides
        setDisplayedText(prev => [...prev, ...remainingText]); // Ajoute les lignes restantes
        setShowFullText(true); // Cache le bouton après avoir affiché tout le texte
    };

    return (
        <div className="notepad">
            <div className="notepad-content">
                {displayedText.map((line, index) => (
                    <div key={index} className="notepad-line">
                        <span className="line-number">{index + 1}</span>
                        <span className="line-text">{line}</span>
                    </div>
                ))}

                {/* Bouton "Voir plus" qui s'affiche seulement si tout le texte n'est pas encore affiché */}
                {!showFullText && (
                    <button className="see-more-button" onClick={handleShowMore}>
                        Voir plus
                    </button>
                )}
            </div>
            <div className="notepad-image">
                <img src={image} alt="Olivier" />
            </div>
        </div>
    );
};

export default Notepad;
