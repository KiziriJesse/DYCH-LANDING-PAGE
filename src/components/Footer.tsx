"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact-team" className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Contact Our Team</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-cyan-400 mt-1" />
                <div>
                  <p className="text-slate-400">Call Us</p>
                  <a href="tel:+256767870035" className="block text-white hover:text-cyan-400 transition-colors">
                    +256 767870035
                  </a>
                  <a href="tel:+256788195067" className="block text-white hover:text-cyan-400 transition-colors">
                    +256 788195067
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-cyan-400 mt-1" />
                <div>
                  <p className="text-slate-400">Email Us</p>
                  <a href="mailto:xristeck@gmail.com" className="block text-white hover:text-cyan-400 transition-colors">
                    xristeck@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-cyan-400 mt-1" />
                <div>
                  <p className="text-slate-400">Location</p>
                  <p className="text-white">Kampala, Uganda</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-slate-400 mb-1">
                  Company / School
                </label>
                <input
                  type="text"
                  id="company"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="School Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-colors shadow-lg hover:shadow-cyan-500/20"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 text-center">
          <p className="text-slate-500">
            © {new Date().getFullYear()} Dych Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

