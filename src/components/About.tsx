"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Intelligent Automation by <span className="text-accent-attendance">Dych Technologies</span>
          </h2>
          
          <p className="text-xl text-muted leading-relaxed mb-6">
            We provide intelligent automation and system management solutions that help
            industries and education across Africa operate more efficiently, securely,
            and reliably.
          </p>

          <div className="inline-block px-6 py-2 rounded-full bg-surface-raised border border-border">
            <span className="text-accent font-medium">
              Scalable & Adaptable for Primary and Secondary Schools
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

