import { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, LogIn, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from 'figma:asset/5c3ac69eed99e3349b91b4e467d8218dd1285409.png';

interface NavigationBarProps {
  isAdminMode: boolean;
  onAdminLogin: () => void;
  onAdminLogout: () => void;
  scrollToSection: (id: string) => void;
}

export function NavigationBar({ 
  isAdminMode, 
  onAdminLogin, 
  onAdminLogout,
  scrollToSection 
}: NavigationBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'mission', label: 'Programs' },
    { id: 'stats', label: 'Stats' },
    { id: 'materials', label: 'Resources' },
    { id: 'results', label: 'Toppers' },
    { id: 'teachers', label: 'Faculty' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b-2 border-[#1E3A8A]' 
            : 'bg-[#1E3A8A]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
            <motion.div 
              className="flex items-center gap-2 sm:gap-3 cursor-pointer"
              onClick={() => scrollToSection('hero')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`${scrolled ? '' : ''}`}>
                <img 
                  src={logo} 
                  alt="Sd Group of Institutions" 
                  className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 object-contain"
                />
              </div>
              <div>
                <span className={`text-xs sm:text-base lg:text-xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'} leading-tight`}>
                  Sd Group of Institutions
                </span>
                <p className={`text-[10px] sm:text-xs hidden md:block ${scrolled ? 'text-gray-600' : 'text-white/80'}`}>
                  Shaping Future Leaders
                </p>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 xl:px-4 py-2 text-sm xl:text-base transition-colors ${
                    scrolled 
                      ? 'text-gray-700 hover:bg-[#F5F1E8] hover:text-[#1E3A8A]' 
                      : 'text-white hover:bg-white/20'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Admin Button - Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              {!isAdminMode ? (
                <motion.button
                  onClick={onAdminLogin}
                  className={`flex items-center gap-2 px-3 xl:px-4 py-2 text-sm xl:text-base transition-colors ${
                    scrolled 
                      ? 'text-gray-700 hover:bg-[#F5F1E8]' 
                      : 'text-white hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogIn className="h-4 w-4 xl:h-5 xl:w-5" />
                  <span>Admin</span>
                </motion.button>
              ) : (
                <motion.button
                  onClick={onAdminLogout}
                  className={`flex items-center gap-2 px-3 xl:px-4 py-2 text-sm xl:text-base transition-colors ${
                    scrolled 
                      ? 'bg-red-50 text-red-600 hover:bg-red-100 border-2 border-red-200' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut className="h-4 w-4 xl:h-5 xl:w-5" />
                  <span>Logout</span>
                </motion.button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className={`lg:hidden p-2 ${scrolled ? 'text-gray-900' : 'text-white'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-14 sm:top-16 left-0 right-0 z-40 lg:hidden bg-white shadow-xl border-b-2 border-[#1E3A8A]"
          >
            <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-1 sm:space-y-2 max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleNavClick(item.id)}
                  className="block w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-700 hover:bg-[#F5F1E8] hover:text-[#1E3A8A] transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
              <div className="pt-2 border-t-2 border-gray-200">
                {!isAdminMode ? (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.05 }}
                    onClick={() => {
                      onAdminLogin();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-700 hover:bg-[#F5F1E8]"
                  >
                    <LogIn className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Admin Login</span>
                  </motion.button>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.05 }}
                    onClick={() => {
                      onAdminLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-red-50 text-red-600 border-2 border-red-200"
                  >
                    <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Admin Logout</span>
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}