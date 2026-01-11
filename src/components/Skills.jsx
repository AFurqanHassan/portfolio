import React from 'react';
import { motion } from 'framer-motion';

const Skills = ({ skills }) => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-white">Expertise</h2>
      <div className="flex flex-wrap gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="px-6 py-3 rounded-2xl glass-card text-lg font-medium text-gray-300 hover:text-white hover:border-purple-500/50 transition-all cursor-default"
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
