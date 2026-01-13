import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ username, name, tagline, bio, avatar }) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        {avatar && (
          <motion.img
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={avatar}
            alt={name}
            className="w-32 h-32 rounded-full border-4 border-purple-500/30 mb-8 mx-auto shadow-[0_0_30px_rgba(168,85,247,0.4)]"
          />
        )}
        
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-6 leading-tight">
          {name} <span className="text-gray-500 font-light text-3xl md:text-5xl">({username})</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-purple-300 font-medium mb-8">
          {tagline}
        </p>

        {bio && (
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-12 glass-card p-6 bg-white/5 border-white/10 mx-auto">
            {bio}
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gray-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
