"use client";

import { motion } from "framer-motion";
import { Shield, Clock, MessageSquare, CreditCard } from "lucide-react";

const solutions = [
  {
    title: "Improving Student Security",
    description: "We use advanced automated systems, including biometric and digital identification, to help schools monitor student attendance and secure entry points.",
    icon: Shield,
    color: "text-cyan-400",
  },
  {
    title: "Accurate Attendance Management",
    description: "Attendance is automatically recorded as students arrive and leave school, eliminating errors associated with manual registers.",
    icon: Clock,
    color: "text-blue-500",
  },
  {
    title: "Real-Time Parent Communication",
    description: "Bridges the communication gap by sending automatic notifications on student arrival, departure, and daily attendance status.",
    icon: MessageSquare,
    color: "text-green-400",
  },
  {
    title: "School Fees & Finance",
    description: "Student profiles linked to fee payment systems with automated reminders to parents, improving financial tracking.",
    icon: CreditCard,
    color: "text-purple-400",
  },
];

export function Solutions() {
  return (
    <section id="solutions" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Key Solutions
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Comprehensive digital tools designed for modern educational institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-cyan-900/50 transition-colors duration-300 group"
            >
              <div className={`mb-6 p-4 rounded-xl bg-slate-800/50 inline-block ${solution.color}`}>
                <solution.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                {solution.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

