"use client";

import { motion } from "framer-motion";
import { Globe2, Smartphone } from "lucide-react";

export function Trust() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-3xl p-8 md:p-12 border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                African-Focused Digital Transformation
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Built for local context, supporting offline/low-bandwidth areas and using
                widely accessible mobile technology (SMS/WhatsApp) to build trust with parents.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-slate-300">
                  <div className="p-2 bg-slate-800 rounded-lg text-cyan-400">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <span>Offline-first architecture for low connectivity</span>
                </div>
                <div className="flex items-center space-x-4 text-slate-300">
                  <div className="p-2 bg-slate-800 rounded-lg text-cyan-400">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <span>SMS & WhatsApp integration for instant updates</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-64 md:h-96 rounded-2xl overflow-hidden bg-slate-800 flex items-center justify-center"
            >
              {/* Abstract Map or Tech Visual Representation */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
              <div className="relative z-10 text-center p-6">
                <span className="text-5xl font-bold text-white block mb-2">100+</span>
                <span className="text-cyan-400 text-lg uppercase tracking-wider">Schools Connected</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

