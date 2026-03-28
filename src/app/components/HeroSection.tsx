import { motion } from 'motion/react';
import { ArrowRight, Star, Users, Trophy, BookOpen } from 'lucide-react';
import heroImage from '../../assets/033e642ac646d40a5f1c7586d7120041a0f44ac0.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
}

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#1E3A8A]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-40 sm:w-72 h-40 sm:h-72 bg-white/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-56 sm:w-96 h-56 sm:h-96 bg-[#F5F1E8]/20 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-40 sm:w-64 h-40 sm:h-64 bg-blue-300/20 blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 pt-24 sm:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6"
            >
              <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-300 text-yellow-300" />
              <span className="text-xs sm:text-sm font-medium">India's Top Coaching Institute</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6"
            >
              Transform Your{' '}
              <span className="text-[#F5F1E8]">Future</span> with Excellence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed"
            >
              Premier coaching institute for Class 8-12, JEE, and NEET preparation. 
              We don't just teach—we inspire excellence and shape future leaders.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8"
            >
              <div className="text-center bg-white/10 backdrop-blur-sm p-2 sm:p-3">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F5F1E8]">4000+</div>
                <div className="text-xs sm:text-sm text-white/80">Students</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm p-2 sm:p-3">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F5F1E8]">95%</div>
                <div className="text-xs sm:text-sm text-white/80">Success Rate</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm p-2 sm:p-3">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F5F1E8]">15+</div>
                <div className="text-xs sm:text-sm text-white/80">Years Legacy</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="group bg-white text-[#1E3A8A] px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('materials')}
                className="bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold border-2 border-white/30 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Free Resources
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Image with Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full"
          >
            {/* Main Image */}
            <div className="relative overflow-hidden shadow-2xl border-2 sm:border-4 border-white/20">
              <img
                src={heroImage}
                alt="Sd Group of Institutions - Results and Achievements"
                className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/50 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 flex items-start justify-center p-1.5 sm:p-2"
        >
          <motion.div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white" />
        </motion.div>
      </motion.div>
    </section>
  );
}
