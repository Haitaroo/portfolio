// Notepad.tsx
// Combined and optimized component

import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { Github, Linkedin, Mail, Bot, Palette, Code, GraduationCap, Globe, Rocket, Gamepad2, Baby, Server } from 'lucide-react';
import logo2 from "../assets/img/olivier2.jpeg";

// Custom hook to detect if an element is in view (useInView)
import { useEffect, useRef, useState } from 'react';

export function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Add a small delay when elements leave viewport
        if (!entry.isIntersecting) {
          setTimeout(() => setIsInView(false), 100);
        } else {
          setIsInView(true);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -10% 0px', // Adjust when elements trigger animation
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isInView };
}

// FadeInView Component for animated fade-in effect
function FadeInView({ children, delay = 0 }) {
  const { ref, isInView } = useInView(0.2);
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.6, delay: isInView ? delay : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Helper function to get gradient color based on skill name
const getSkillColor = (skill) => {
  const colors = {
    'React': { from: '#61DAFB', to: '#2B6CB0' },
    'JavaScript': { from: '#F7DF1E', to: '#B7791F' },
    // Add more colors as needed
  };
  return colors[skill] || { from: '#4F46E5', to: '#3B82F6' };
};

// SkillBar Component with customizable gradient colors for each skill
function SkillBar({ name, level, index }) {
  const colors = getSkillColor(name);
  return (
    <motion.div className="mb-4 sm:mb-6 group" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} 
      transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true, margin: "-50px" }}>
      <div className="flex justify-between mb-1">
        <motion.span className="text-xs sm:text-sm font-medium text-gray-700" whileHover={{ color: colors.from }}>
          {name}
        </motion.span>
        <motion.span className="text-xs sm:text-sm font-medium text-gray-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}>
          {level}%
        </motion.span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(to right, ${colors.from}, ${colors.to})` }}
          initial={{ width: 0 }} whileInView={{ width: `${level}%` }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} 
          viewport={{ once: true, margin: "-50px" }} />
      </div>
    </motion.div>
  );
}

// IntroSection with typewriter effect for name and roles
function IntroSection() {
  const socialLinks = [
    { href: "https://github.com", Icon: Github, label: "GitHub" },
    { href: "https://linkedin.com", Icon: Linkedin, label: "LinkedIn" },
    { href: "mailto:contact@example.com", Icon: Mail, label: "Email" }
  ];
  return (
    <div className="space-y-6 sm:space-y-8">
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, duration: 0.6 }} className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto">
        <motion.div animate={{ rotate: 360, borderColor: ["#4f46e5", "#3b82f6", "#4f46e5"] }} transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            borderColor: { duration: 3, repeat: Infinity, ease: "easeInOut" } }} className="absolute inset-0 rounded-full border-2 border-dashed" />
        <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img src={logo2} alt="Profil"
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" />
        </div>
      </motion.div>

      <FadeInView delay={0.2}>
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-2">
            Olivier Barbin
          </h1>
          <div className="text-lg sm:text-xl text-indigo-600 h-8 mb-4">
            <Typewriter options={{ strings: ['Développeur Full Stack', 'Créatif Passionné', 'Solutionneur de Problèmes'], autoStart: true, loop: true, delay: 75, deleteSpeed: 50 }} />
          </div>
        </div>
      </FadeInView>

      <FadeInView delay={0.4}>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto text-center px-4">
          Passionné par la création d'expériences numériques innovantes, je combine expertise technique et créativité pour développer des solutions web performantes.
        </p>
      </FadeInView>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
        className="flex justify-center space-x-4">
      </motion.div>
    </div>
  );
}

type SkillName = 
  | 'React / Next.js'
  | 'JavaScript / TypeScript'
  | 'Node.js / Express'
  | 'HTML / CSS / Tailwind'
  | 'Python / Django'
  | 'SQL / MongoDB';

interface Skill {
  name: SkillName;
  level: number;
}

const skills: Skill[] = [
  { name: 'React / Next.js', level: 90 },
  { name: 'JavaScript / TypeScript', level: 85 },
  { name: 'Node.js / Express', level: 80 },
  { name: 'HTML / CSS / Tailwind', level: 85 },
  { name: 'Python / Django', level: 75 },
  { name: 'SQL / MongoDB', level: 80 },
];

const skillColors: Record<SkillName, string> = {
  'React / Next.js': 'bg-blue-500',
  'JavaScript / TypeScript': 'bg-yellow-500',
  'Node.js / Express': 'bg-green-500',
  'HTML / CSS / Tailwind': 'bg-pink-500',
  'Python / Django': 'bg-purple-500',
  'SQL / MongoDB': 'bg-teal-500',
};

function SkillsSection() {
  return (
    <div className="mt-16 sm:mt-24">
      <FadeInView>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">Compétences Techniques</h2>
      </FadeInView>
      <div className="max-w-2xl mx-auto px-4">
        {skills.map((skill, index) => (
          <FadeInView key={skill.name} delay={index * 0.1}>
            <SkillBar name={skill.name} level={skill.level} index={index} />
          </FadeInView>
        ))}
      </div>
    </div>
  );
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: JSX.Element;
}

const timeline: TimelineEvent[] = [
  {
    year: '2024-2025',
    title: 'Projet Professionnel',
    description: 'Développement du site des Butineurs',
    icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />,
  },
  {
    year: '2023',
    title: 'Game Jam Ubisoft',
    description: 'Participation à la Game Jam pour Ubisoft',
    icon: <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" />,
  },
  {
    year: '2023',
    title: 'Développement Web',
    description: 'Amélioration du site web Embryo pour le Cégep de Jonquière',
    icon: <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />,
  },
  {
    year: '2022',
    title: 'Formation UI/UX Gaming',
    description: 'Formation sur le Design UI UX pour les jeux vidéos',
    icon: <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" />,
  },
  {
    year: '2022',
    title: 'Projet Professionnel',
    description: "Développement du site web pour le Syndicat Des Travailleurs d'Aluminium d'Alma (Staalma)",
    icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />,
  },
  {
    year: '2021',
    title: 'Parcours Académique',
    description: 'Début des études au Cégep de Jonquière',
    icon: <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />,
  },
  {
    year: '2019',
    title: 'Innovation en Programmation',
    description: 'Création d\'une présence GitHub et développement d\'un langage de programmation personnalisé',
    icon: <Code className="w-5 h-5 sm:w-6 sm:h-6" />,
  },
  {
    year: '2018',
    title: 'Recherche en Génération d\'Images',
    description: 'Exploration autodidacte des techniques de génération d\'images',
    icon: <Palette className="w-5 h-5 sm:w-6 sm:h-6" />,
  },
  {
    year: '2017',
    title: 'Développement de Bot Discord',
    description: 'Création d\'un bot Discord avec système économique en Python',
    icon: <Bot className="w-5 h-5 sm:w-6 sm:h-6" />,
  },
  {
    year: '2013',
    title: 'Serveurs Minecraft',
    description: 'Création et gestion de serveurs Minecraft',
    icon: <Server className="w-5 h-5 sm:w-6 sm:h-6" />,
  },
  {
    year: '1999',
    title: 'Naissance',
    description: 'Ma naissance',
    icon: <Baby className="w-5 h-5 sm:w-6 sm:h-6" />,
  },
];

export function TimelineSection() {
  return (
    <div className="mt-16 sm:mt-24">
      <FadeInView>
        <motion.h2 
          className="text-xl sm:text-2xl font-bold text-gray-800 mb-8 sm:mb-12 text-center"
          whileInView={{ 
            backgroundSize: ["100% 0%", "100% 100%"],
            color: ["#1f2937", "#4f46e5"]
          }}
          transition={{ duration: 0.5 }}
        >
          Mon Parcours Professionnel
        </motion.h2>
      </FadeInView>

      <div className="relative">
        <motion.div 
          className="hidden sm:block absolute left-1/2 transform -translate-x-px w-0.5"
          style={{ height: "100%" }}
          initial={{ background: "linear-gradient(180deg, #4f46e5 0%, #3b82f6 100%)", scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />

        <div className="space-y-8 sm:space-y-12">
          {timeline.map((event, index) => (
            <motion.div
              key={`${event.year}-${event.title}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Layout mobile */}
              <div className="sm:hidden flex items-start space-x-4">
                <motion.div 
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <motion.div 
                      className="text-white"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      {event.icon}
                    </motion.div>
                  </div>
                </motion.div>
                <div className="flex-grow">
                  <motion.span 
                    className="text-indigo-600 font-bold text-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    {event.year}
                  </motion.span>
                  <motion.h3 
                    className="text-base font-semibold text-gray-800 mt-0.5"
                    whileHover={{ color: "#4f46e5" }}
                  >
                    {event.title}
                  </motion.h3>
                  <motion.p 
                    className="text-sm text-gray-600 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {event.description}
                  </motion.p>
                </div>
              </div>

              {/* Layout bureau */}
              <div className={`hidden sm:flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
              <motion.div 
  className={`w-5/12 ${index % 2 === 0 ? 'text-left pr-4' : 'text-right pl-4'}`}
  whileHover={{ y: -5 }}
  transition={{ duration: 0.2 }}
>

                  <motion.span 
                    className="text-indigo-600 font-bold"
                    whileHover={{ scale: 1.05 }}
                  >
                    {event.year}
                  </motion.span>
                  <motion.h3 
                    className="text-lg font-semibold text-gray-800 mt-1"
                    whileHover={{ color: "#4f46e5" }}
                  >
                    {event.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {event.description}
                  </motion.p>
                </motion.div>

                <div className="w-2/12 flex justify-center">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="text-white"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      {event.icon}
                    </motion.div>
                  </motion.div>
                </div>

                <div className="w-5/12" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
// Main Notepad Component
export default function Notepad() {
  return (
    <div className="notepad-container">
      <IntroSection />
      <TimelineSection/>
      <SkillsSection />
    </div>
  );
}
