import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, Phone } from 'lucide-react';

interface FloatingCTAProps {
  scrollToSection: (id: string) => void;
}

export function FloatingCTA({ scrollToSection }: FloatingCTAProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll-to-top button when scrolled down
  useState(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Call Now Button */}
      <motion.a
        href="tel:+919419124153"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 bg-[#1E3A8A] text-white p-3 sm:p-4 shadow-2xl hover:bg-[#1E40AF] transition-all group"
      >
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
          <span className="hidden sm:inline font-semibold text-sm lg:text-base">Call Now</span>
        </div>
      </motion.a>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40 bg-white text-[#1E3A8A] p-3 sm:p-4 shadow-xl hover:shadow-2xl transition-all border-2 border-[#1E3A8A]"
          >
            <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}