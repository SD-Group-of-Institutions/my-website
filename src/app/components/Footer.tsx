import { motion } from 'motion/react';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../../assets/5c3ac69eed99e3349b91b4e467d8218dd1285409.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About Us', href: '#' },
    { label: 'Our Programs', href: '#programs' },
    { label: 'Faculty', href: '#teachers' },
    { label: 'Results', href: '#hall-of-fame' },
  ];

  return (
    <footer className="bg-[#1a1f2e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logo} 
                alt="Sd Group of Institutions" 
                className="h-16 w-16 object-contain"
              />
              <div>
                <h3 className="text-xl font-bold">Sd Group of Institutions</h3>
                <p className="text-sm text-gray-400">Shaping Future Leaders</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              India's premier coaching institute for competitive exams and board preparations.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors inline-block hover:translate-x-1 transition-transform text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  107-C, Shastri Nagar, Opp Bank<br />
                  Jammu, Jammu and Kashmir 180004
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919419124153" className="text-gray-400 hover:text-white transition-colors text-sm">
                    +91 94191-24153
                  </a>
                  <a href="tel:+917006071996" className="text-gray-400 hover:text-white transition-colors text-sm">
                    +91 7006071996
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                <a href="mailto:contact@sdgi.in" className="text-gray-400 hover:text-white transition-colors text-sm">
                  contact@sdgi.in
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Sd Group of Institutions. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
