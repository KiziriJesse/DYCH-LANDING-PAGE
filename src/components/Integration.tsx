"use client";

import { motion } from "framer-motion";
import { Camera, Fingerprint, Bell, BarChart3 } from "lucide-react";

const steps = [
  {
    title: "Security",
    description: "CCTV & Facial recognition linked to entry points.",
    icon: Camera,
  },
  {
    title: "Attendance",
    description: "RFID/Biometric marking upon arrival.",
    icon: Fingerprint,
  },
  {
    title: "Alerts",
    description: "Instant SMS/App notifications to parents.",
    icon: Bell,
  },
  {
    title: "Analytics",
    description: "Dashboards for security logs and attendance trends.",
    icon: BarChart3,
  },
];

export function Integration() {
  return (
    <section id="integration" className="py-24 bg-surface relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 -left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-accent-attendance/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            System Integration
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            A seamless flow from entry to insight.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Horizontal on Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-border -translate-y-1/2 rounded-full" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-surface-raised border border-accent-line flex items-center justify-center mb-6 z-10">
                  <step.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Step {index + 1}: {step.title}</h3>
                <p className="text-muted text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

