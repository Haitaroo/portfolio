import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './SocialMedia.css';

const SocialMedia = () => {
  return (
    <div className="social-media">
      <a href="https://github.com/haitaroo" target="_blank" rel="noopener noreferrer">
        <FaGithub className="social-icon" />
      </a>
      <a href="https://www.linkedin.com/in/taro974/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="social-icon" />
      </a>
      <a href="https://www.instagram.com/oli.taro/" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="social-icon" />
      </a>
    </div>
  );
};

export default SocialMedia;