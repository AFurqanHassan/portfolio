import React from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import { getProjectPattern } from './canvas/Patterns';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-card overflow-hidden group hover:border-purple-500/50 transition-colors"
    >
      <div className="h-48 relative overflow-hidden bg-black/40">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {getProjectPattern(project.name, index)}
        </Canvas>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-white">{project.name}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description || "No description provided."}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.languages.slice(0, 3).map(lang => (
            <span key={lang} className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {lang}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-4">
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <ExternalLink size={20} />
            </a>
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <Star size={16} className="text-yellow-500" />
            <span>{project.stars}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
