import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import appleIcon from '../../public/apple-touch-icon.png'; // Adjust the path if necessary

const WelcomeContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  color: white;
`;

const Header = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin-left: 10px;
  font-size: 2.5rem;
`;

const Content = styled.div`
  text-align: center;
  font-size: 1.2rem;
`;

const Button = styled(motion.button)`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #0078d7;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005a9e;
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 10px;
  text-align: center;
  font-size: 0.9rem;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
`;

const WindowsWelcome = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 1000); // Match the duration of the fade-out animation
  };

  return (
    <WelcomeContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <Header
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Icon src={appleIcon} alt="Apple Icon" />
        <Title>Bienvenue sur le portfolio d'Olivier BARBIN</Title>
      </Header>
      <Content>
        <p>Votre visite guidée est prête !</p>
        <Button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClose}
        >
          Commencer
        </Button>
      </Content>
      <Footer>
        <p>&copy; 2024 Olivier Barbin. Tous droits réservés.</p>
      </Footer>
    </WelcomeContainer>
  );
};

export default WindowsWelcome;