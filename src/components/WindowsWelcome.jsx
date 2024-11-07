import React, { useState, useEffect } from "react";
import "./WindowsWelcome.css";
import logo from "../assets/img/olivier.png";
import logo2 from "../assets/img/olivier2.jpeg";
import settingsIcon from "../assets/img/settings.png";
import powerIcon from "../assets/img/power.png";
import background1 from "../assets/img/Foret.jpg";
import background2 from "../assets/img/plage.jpg";
import background3 from "../assets/img/pluie.gif";

const WindowsWelcome = ({ onClose }) => {
  const [backgroundImage, setBackgroundImage] = useState(background1);
  const [showSettings, setShowSettings] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [currentLogo, setCurrentLogo] = useState(logo);
  const [iconColor, setIconColor] = useState("black");
  const [textColor, setTextColor] = useState("black");
  const [isShuttingDown, setIsShuttingDown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true);
      setCurrentLogo(logo2); // Change le logo après le chargement
    }, 3000); // Temps de chargement de la barre (3 secondes)

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    checkBackgroundContrast();
  }, [backgroundImage]);

  const handleBackgroundChange = (newBackground) => {
    setBackgroundImage(newBackground);
    setShowSettings(false); // Ferme le menu après avoir choisi une nouvelle image
  };

  const checkBackgroundContrast = () => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;

      context.drawImage(img, 0, 0, img.width, img.height);
      const imageData = context.getImageData(0, 0, img.width, img.height).data;

      let rTotal = 0,
        gTotal = 0,
        bTotal = 0;
      let count = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        rTotal += imageData[i];
        gTotal += imageData[i + 1];
        bTotal += imageData[i + 2];
        count++;
      }

      const rAvg = rTotal / count;
      const gAvg = gTotal / count;
      const bAvg = bTotal / count;
      const brightness = (rAvg * 299 + gAvg * 587 + bAvg * 114) / 1000;

      setIconColor(brightness < 128 ? "white" : "black");
      setTextColor(brightness < 128 ? "white" : "black");
    };
  };

  const extractBackgroundName = (background) => {
    return background.split('/').pop().split('.')[0];
  };

  const handleShutdown = () => {
    setIsShuttingDown(true);
    setTimeout(onClose, 2000); // Simule un arrêt avec un délai de 2 secondes
  };

  return (
    <div
      className={`welcome-screen ${isShuttingDown ? 'shutdown' : ''}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="background-image"></div>
      <div className="login-area" style={{ color: textColor }}>
        <div className="welcome-logo">
          <img src={currentLogo} alt="Logo" />
        </div>
        {loadingComplete && !isShuttingDown ? (
          <>
            <div className="welcome-text">Bienvenue</div>
            <button className="connect-button" onClick={onClose} style={{ color: textColor }}>
              Se connecter
            </button>
          </>
        ) : (
          !isShuttingDown && (
            <>
              <div className="welcome-text">Chargement...</div>
              <div className="loading-bar">
                <div className="loading-bar-fill"></div>
              </div>
            </>
          )
        )}
      </div>

      {isShuttingDown && (
        <div className="shutdown-screen">
          <p>Arrêt en cours...</p>
        </div>
      )}

      <div className="power-settings">
        <img
          src={settingsIcon}
          alt="Settings"
          className="settings-icon"
          onClick={() => setShowSettings(!showSettings)}
          style={{ filter: iconColor === "white" ? "invert(100%)" : "none" }}
        />
      </div>

      {showSettings && (
        <div className="background-options">
          {[background1, background2, background3].map((background, index) => {
            const backgroundName = extractBackgroundName(background);
            return (
              <div
                key={index}
                className="background-option"
                style={{ backgroundImage: `url(${background})` }}
                onClick={() => handleBackgroundChange(background)}
              >
                <p style={{ color: textColor }}>{backgroundName.charAt(0).toUpperCase() + backgroundName.slice(1)}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WindowsWelcome;
