import React from 'react';
import { Github, Linkedin, Instagram, Mail, Globe } from 'lucide-react';
import logo_social from "../assets/img/1090.jpg";
const SocialMedia = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-lg w-full h-full">
      {/* Section Profil */}
      <div className="relative flex flex-col items-center mb-8">
  <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-xl mb-4">
    <img
      src={logo_social}
      alt="Profil"
      className="w-full h-full object-cover transform scale-125" // Zoom de l'image
      style={{ objectPosition: '50% 25%' }} // Centre l'image sur le visage
    />
  </div>
  <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">
    Taro
  </h2>
  <p className="text-lg text-gray-700 dark:text-gray-300 mb-1">
    Développeur Full Stack
  </p>
  <p className="text-sm text-gray-500 dark:text-gray-400">
    La Réunion, France 🌴
  </p>
</div> 


      {/* Liens Sociaux */}
      <div className="grid gap-4 w-full px-4">
        {[
          {
            icon: Github,
            label: 'GitHub',
            href: 'https://github.com/haitaroo',
            color: 'from-gray-600 to-gray-800',
            description: 'Explorez mon code'
          },
          {
            icon: Linkedin,
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/taro974/',
            color: 'from-blue-500 to-blue-600',
            description: 'Connectons-nous professionnellement'
          },
          {
            icon: Instagram,
            label: 'Instagram',
            href: 'https://www.instagram.com/taro.vsc/',
            color: 'from-pink-500 to-purple-600',
            description: 'Suivez mon quotidien'
          },
          {
            icon: Mail,
            label: 'Email',
            href: 'mailto:oli.f.barbin@gmail.com',
            color: 'from-red-500 to-red-600',
            description: 'Contactez-moi directement'
          }
        ].map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center p-4 rounded-lg bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-opacity-20 hover:to-opacity-20 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${social.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              <social.icon size={24} />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {social.label}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {social.description}
              </p>
            </div>
            <span className="ml-2 text-gray-400 group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;
