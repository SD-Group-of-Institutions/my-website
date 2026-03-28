import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen, Award, Users, GraduationCap, Image as ImageIcon, Mail, Phone, MapPin, Upload, Trash2, Edit, LogIn, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CoachingWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // State for editable content
  const [galleryPhotos, setGalleryPhotos] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1654366698665-e6d611a9aaa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3NDM4ODM2N3ww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Students studying' },
    { id: 2, url: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NzQ0MTU1NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Teacher teaching' },
    { id: 3, url: 'https://images.unsplash.com/photo-1605781645799-c9c7d820b4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NzQzNjE5MzV8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Science lab' },
    { id: 4, url: 'https://images.unsplash.com/photo-1666198259234-f7033c78b94e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMGxpYnJhcnklMjBlZHVjYXRpb258ZW58MXx8fHwxNzc0NDM1NDI3fDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Library' },
    { id: 5, url: 'https://images.unsplash.com/photo-1631599143424-5bc234fbebf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzc0MzgxNjk4fDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Campus' },
    { id: 6, url: 'https://images.unsplash.com/photo-1769159522162-335b60c8146a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwc3VjY2VzcyUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc3NDQzNTQyOHww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Graduation' },
  ]);

  const [studyMaterials, setStudyMaterials] = useState([
    { id: 1, title: 'Physics Notes - Class 11', description: 'Complete physics notes for Class 11 CBSE', category: 'Class 11', subject: 'Physics', link: 'https://example.com/physics-notes' },
    { id: 2, title: 'Chemistry Handbook - JEE', description: 'Comprehensive chemistry notes for JEE preparation', category: 'JEE', subject: 'Chemistry', link: 'https://example.com/chemistry' },
    { id: 3, title: 'Biology Notes - NEET', description: 'Complete biology notes for NEET aspirants', category: 'NEET', subject: 'Biology', link: 'https://example.com/biology' },
    { id: 4, title: 'Mathematics Problem Sets', description: 'Advanced math problems for competitive exams', category: 'JEE', subject: 'Mathematics', link: 'https://example.com/math' },
    { id: 5, title: 'English Grammar - Class 10', description: 'Essential grammar rules and exercises', category: 'Class 10', subject: 'English', link: 'https://example.com/english' },
    { id: 6, title: 'Organic Chemistry - JEE Advanced', description: 'Advanced organic chemistry concepts', category: 'JEE Advanced', subject: 'Chemistry', link: 'https://example.com/organic' },
  ]);

  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Dr. Anita Desai', subject: 'Physics Faculty', qualification: 'PhD, 15+ years experience, Ex-IIT Professor', imageUrl: 'https://images.unsplash.com/photo-1746513534315-caa52d3f462c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjB0ZWFjaGVyJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc0NDE4Nzc5fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 2, name: 'Prof. Vikram Singh', subject: 'Mathematics Faculty', qualification: 'M.Tech IIT, 12+ years experience', imageUrl: 'https://images.unsplash.com/photo-1584554376766-ac0f2c65e949?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdGVhY2hlciUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NDQzNTQyNnww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 3, name: 'Dr. Meera Patel', subject: 'Chemistry Faculty', qualification: 'PhD, 10+ years experience, NEET specialist', imageUrl: '' },
    { id: 4, name: 'Prof. Rahul Gupta', subject: 'Biology Faculty', qualification: 'M.Sc, B.Ed, 14+ years experience', imageUrl: '' },
  ]);

  const [toppers, setToppers] = useState([
    { id: 1, name: 'Rajesh Kumar', achievement: 'AIR 42 - JEE Advanced', college: 'Admitted to IIT Delhi', initials: 'RK' },
    { id: 2, name: 'Priya Sharma', achievement: 'AIR 156 - NEET', college: 'Admitted to AIIMS Delhi', initials: 'PS' },
    { id: 3, name: 'Amit Mehta', achievement: 'AIR 89 - JEE Advanced', college: 'Admitted to IIT Bombay', initials: 'AM' },
  ]);

  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newMaterialTitle, setNewMaterialTitle] = useState('');
  const [newMaterialDesc, setNewMaterialDesc] = useState('');
  const [newMaterialCategory, setNewMaterialCategory] = useState('');
  const [newMaterialSubject, setNewMaterialSubject] = useState('');
  const [newMaterialLink, setNewMaterialLink] = useState('');

  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherSubject, setNewTeacherSubject] = useState('');
  const [newTeacherQualification, setNewTeacherQualification] = useState('');
  const [newTeacherImage, setNewTeacherImage] = useState('');

  const [newTopperName, setNewTopperName] = useState('');
  const [newTopperAchievement, setNewTopperAchievement] = useState('');
  const [newTopperCollege, setNewTopperCollege] = useState('');
  const [newTopperInitials, setNewTopperInitials] = useState('');

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % teachers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [teachers.length]);

  const toggleCardFlip = (cardId) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teachers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teachers.length) % teachers.length);
  };

  const getSlidesToShow = () => {
    if (windowWidth < 640) return 1;
    if (windowWidth < 1024) return 2;
    if (windowWidth < 1280) return 3;
    return 4;
  };

  function ImageWithFallback(props) {
    const [didError, setDidError] = useState(false);
    const { src, alt, style, className, ...rest } = props;

    return didError ? (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=="
            alt="Error loading image"
            {...rest}
            data-original-url={src}
          />
        </div>
      </div>
    ) : (
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        {...rest}
        onError={() => setDidError(true)}
      />
    );
  }

  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAdminMode(true);
      setShowAdminLogin(false);
      setAdminPassword('');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminMode(false);
  };

  const addPhoto = () => {
    if (newPhotoUrl.trim()) {
      setGalleryPhotos([...galleryPhotos, { id: Date.now(), url: newPhotoUrl, alt: 'Gallery photo' }]);
      setNewPhotoUrl('');
    }
  };

  const deletePhoto = (id) => {
    setGalleryPhotos(galleryPhotos.filter(photo => photo.id !== id));
  };

  const addMaterial = () => {
    if (newMaterialTitle.trim() && newMaterialDesc.trim()) {
      setStudyMaterials([...studyMaterials, {
        id: Date.now(),
        title: newMaterialTitle,
        description: newMaterialDesc,
        category: newMaterialCategory,
        subject: newMaterialSubject,
        link: newMaterialLink
      }]);
      setNewMaterialTitle('');
      setNewMaterialDesc('');
      setNewMaterialCategory('');
      setNewMaterialSubject('');
      setNewMaterialLink('');
    }
  };

  const deleteMaterial = (id) => {
    setStudyMaterials(studyMaterials.filter(material => material.id !== id));
  };

  const addTeacher = () => {
    if (newTeacherName.trim() && newTeacherSubject.trim() && newTeacherQualification.trim()) {
      setTeachers([...teachers, {
        id: Date.now(),
        name: newTeacherName,
        subject: newTeacherSubject,
        qualification: newTeacherQualification,
        imageUrl: newTeacherImage
      }]);
      setNewTeacherName('');
      setNewTeacherSubject('');
      setNewTeacherQualification('');
      setNewTeacherImage('');
    }
  };

  const deleteTeacher = (id) => {
    setTeachers(teachers.filter(teacher => teacher.id !== id));
  };

  const addTopper = () => {
    if (newTopperName.trim() && newTopperAchievement.trim() && newTopperCollege.trim() && newTopperInitials.trim()) {
      setToppers([...toppers, {
        id: Date.now(),
        name: newTopperName,
        achievement: newTopperAchievement,
        college: newTopperCollege,
        initials: newTopperInitials
      }]);
      setNewTopperName('');
      setNewTopperAchievement('');
      setNewTopperCollege('');
      setNewTopperInitials('');
    }
  };

  const deleteTopper = (id) => {
    setToppers(toppers.filter(topper => topper.id !== id));
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Navigation */}
      <nav className="bg-[#E8DCC4] shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-[#8B6F47]" />
              <span className="ml-2 text-base sm:text-xl text-[#5C4A35] truncate">Excellence Academy</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-4 xl:space-x-8">
              <button onClick={() => scrollToSection('hero')} className="text-sm xl:text-base text-[#5C4A35] hover:text-[#8B6F47] transition">Home</button>
              <button onClick={() => scrollToSection('mission')} className="text-sm xl:text-base text-[#5C4A35] hover:text-[#8B6F47] transition">Mission</button>
              <button onClick={() => scrollToSection('materials')} className="text-sm xl:text-base text-[#5C4A35] hover:text-[#8B6F47] transition">Materials</button>
              <button onClick={() => scrollToSection('results')} className="text-sm xl:text-base text-[#5C4A35] hover:text-[#8B6F47] transition">Results</button>
              <button onClick={() => scrollToSection('teachers')} className="text-sm xl:text-base text-[#5C4A35] hover:text-[#8B6F47] transition">Teachers</button>
              <button onClick={() => scrollToSection('gallery')} className="text-sm xl:text-base text-[#5C4A35] hover:text-[#8B6F47] transition">Gallery</button>
              <button onClick={() => scrollToSection('contact')} className="text-sm xl:text-base text-[#5C4A35] hover:text-[#8B6F47] transition">Contact</button>
            </div>

            {/* Admin Login Button - Desktop */}
            <div className="hidden lg:flex items-center">
              {!isAdminMode ? (
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="flex items-center space-x-2 text-[#5C4A35] hover:text-[#8B6F47] transition"
                >
                  <LogIn className="h-4 w-4 xl:h-5 xl:w-5" />
                  <span className="text-sm xl:text-base">Admin</span>
                </button>
              ) : (
                <button
                  onClick={handleAdminLogout}
                  className="flex items-center space-x-2 text-[#5C4A35] hover:text-[#8B6F47] transition"
                >
                  <LogOut className="h-4 w-4 xl:h-5 xl:w-5" />
                  <span className="text-sm xl:text-base">Logout</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-[#5C4A35] p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#E8DCC4] border-t border-[#D4C4A8]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => scrollToSection('hero')} className="block px-3 py-3 text-[#5C4A35] hover:bg-[#D4C4A8] rounded w-full text-left">Home</button>
              <button onClick={() => scrollToSection('mission')} className="block px-3 py-3 text-[#5C4A35] hover:bg-[#D4C4A8] rounded w-full text-left">Mission</button>
              <button onClick={() => scrollToSection('materials')} className="block px-3 py-3 text-[#5C4A35] hover:bg-[#D4C4A8] rounded w-full text-left">Materials</button>
              <button onClick={() => scrollToSection('results')} className="block px-3 py-3 text-[#5C4A35] hover:bg-[#D4C4A8] rounded w-full text-left">Results</button>
              <button onClick={() => scrollToSection('teachers')} className="block px-3 py-3 text-[#5C4A35] hover:bg-[#D4C4A8] rounded w-full text-left">Teachers</button>
              <button onClick={() => scrollToSection('gallery')} className="block px-3 py-3 text-[#5C4A35] hover:bg-[#D4C4A8] rounded w-full text-left">Gallery</button>
              <button onClick={() => scrollToSection('contact')} className="block px-3 py-3 text-[#5C4A35] hover:bg-[#D4C4A8] rounded w-full text-left">Contact</button>
              {!isAdminMode ? (
                <button onClick={() => setShowAdminLogin(true)} className="block px-3 py-3 text-[#5C4A35] hover:bg-[#D4C4A8] rounded w-full text-left">Admin Login</button>
              ) : (
                <button onClick={handleAdminLogout} className="block px-3 py-3 text-[#5C4A35] hover:bg-[#D4C4A8] rounded w-full text-left">Admin Logout</button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl sm:text-2xl mb-4 text-[#5C4A35]">Admin Login</h2>
            <input
              type="password"
              placeholder="Enter password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
              className="w-full px-4 py-3 border border-[#D4C4A8] rounded mb-4 text-base"
            />
            <p className="text-sm text-gray-600 mb-4">Default password: admin123</p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleAdminLogin}
                className="flex-1 bg-[#8B6F47] text-white px-4 py-3 rounded hover:bg-[#6F5839] transition"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setShowAdminLogin(false);
                  setAdminPassword('');
                }}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-3 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="pt-14 sm:pt-16 bg-gradient-to-br from-[#E8DCC4] to-[#D4C4A8] min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#5C4A35] mb-4 sm:mb-6 leading-tight">
                Shape Your Future with Excellence
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-[#6F5839] mb-6 sm:mb-8">
                Premier coaching institute for Class 8-12, JEE, and NEET preparation. 
                We don't just teach, we inspire excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-[#8B6F47] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg hover:bg-[#6F5839] transition text-base sm:text-lg"
                >
                  Enroll Now
                </button>
                <button
                  onClick={() => scrollToSection('materials')}
                  className="bg-white text-[#8B6F47] px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg border-2 border-[#8B6F47] hover:bg-[#F5F5F0] transition text-base sm:text-lg"
                >
                  View Materials
                </button>
              </div>
            </div>
            <div className="relative order-first lg:order-last">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1654366698665-e6d611a9aaa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc3NDM4ODM2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Students studying"
                className="rounded-lg shadow-2xl w-full max-h-96 lg:max-h-none object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Offerings Section with Flip Cards */}
      <section id="mission" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#5C4A35] mb-3 sm:mb-4">Our Mission & Offerings</h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#6F5839] max-w-3xl mx-auto px-4">
              Empowering students to achieve their academic goals through personalized coaching and comprehensive study programs
            </p>
            <p className="text-xs sm:text-sm text-[#8B6F47] mt-3 sm:mt-4">✨ Click on any card to see more details</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Class 8-10 Flip Card */}
            <div 
              className="relative h-72 sm:h-80 lg:h-80 cursor-pointer"
              style={{ perspective: '1000px' }}
              onClick={() => toggleCardFlip('class810')}
            >
              <div 
                className="relative w-full h-full transition-transform duration-700"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: flippedCards['class810'] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Front */}
                <div className="absolute w-full h-full bg-[#FAF8F3] p-5 sm:p-6 lg:p-8 rounded-lg shadow-md hover:shadow-xl transition" style={{ backfaceVisibility: 'hidden' }}>
                  <div className="bg-[#E8DCC4] w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-[#8B6F47]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl text-[#5C4A35] mb-2 sm:mb-3">Class 8-10</h3>
                  <p className="text-sm sm:text-base text-[#6F5839] mb-4">
                    Strong foundation building for CBSE and State Board students with focus on conceptual clarity
                  </p>
                  <p className="text-xs sm:text-sm text-[#8B6F47] mt-auto absolute bottom-6 sm:bottom-8">Click to see details →</p>
                </div>
                {/* Back */}
                <div className="absolute w-full h-full bg-gradient-to-br from-[#8B6F47] to-[#6F5839] p-5 sm:p-6 lg:p-8 rounded-lg shadow-md" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <h3 className="text-xl sm:text-2xl text-white mb-3 sm:mb-4">What's Offered</h3>
                  <ul className="space-y-2 sm:space-y-3 text-white text-sm sm:text-base">
                    <li>✓ All subjects covered</li>
                    <li>✓ Regular tests & assessments</li>
                    <li>✓ Board exam preparation</li>
                    <li>✓ Conceptual clarity focus</li>
                    <li>✓ Doubt clearing sessions</li>
                    <li>✓ Study material provided</li>
                  </ul>
                  <p className="text-xs sm:text-sm text-[#E8DCC4] mt-auto absolute bottom-6 sm:bottom-8">Click to go back →</p>
                </div>
              </div>
            </div>

            {/* Class 11-12 Flip Card */}
            <div 
              className="relative h-72 sm:h-80 lg:h-80 cursor-pointer"
              style={{ perspective: '1000px' }}
              onClick={() => toggleCardFlip('class1112')}
            >
              <div 
                className="relative w-full h-full transition-transform duration-700"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: flippedCards['class1112'] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Front */}
                <div className="absolute w-full h-full bg-[#FAF8F3] p-5 sm:p-6 lg:p-8 rounded-lg shadow-md hover:shadow-xl transition" style={{ backfaceVisibility: 'hidden' }}>
                  <div className="bg-[#E8DCC4] w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-[#8B6F47]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl text-[#5C4A35] mb-2 sm:mb-3">Class 11-12</h3>
                  <p className="text-sm sm:text-base text-[#6F5839] mb-4">
                    Advanced learning with dual preparation for Board exams and competitive entrance tests
                  </p>
                  <p className="text-xs sm:text-sm text-[#8B6F47] mt-auto absolute bottom-6 sm:bottom-8">Click to see details →</p>
                </div>
                {/* Back */}
                <div className="absolute w-full h-full bg-gradient-to-br from-[#8B6F47] to-[#6F5839] p-5 sm:p-6 lg:p-8 rounded-lg shadow-md" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <h3 className="text-xl sm:text-2xl text-white mb-3 sm:mb-4">What's Offered</h3>
                  <ul className="space-y-2 sm:space-y-3 text-white text-sm sm:text-base">
                    <li>✓ PCM & PCB streams</li>
                    <li>✓ Board + competitive prep</li>
                    <li>✓ Doubt clearing sessions</li>
                    <li>✓ Advanced problem solving</li>
                    <li>✓ Regular mock tests</li>
                    <li>✓ Performance analysis</li>
                  </ul>
                  <p className="text-xs sm:text-sm text-[#E8DCC4] mt-auto absolute bottom-6 sm:bottom-8">Click to go back →</p>
                </div>
              </div>
            </div>

            {/* JEE Mains Flip Card */}
            <div 
              className="relative h-72 sm:h-80 lg:h-80 cursor-pointer"
              style={{ perspective: '1000px' }}
              onClick={() => toggleCardFlip('jeemains')}
            >
              <div 
                className="relative w-full h-full transition-transform duration-700"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: flippedCards['jeemains'] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Front */}
                <div className="absolute w-full h-full bg-[#FAF8F3] p-5 sm:p-6 lg:p-8 rounded-lg shadow-md hover:shadow-xl transition" style={{ backfaceVisibility: 'hidden' }}>
                  <div className="bg-[#E8DCC4] w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-[#8B6F47]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl text-[#5C4A35] mb-2 sm:mb-3">JEE Mains</h3>
                  <p className="text-sm sm:text-base text-[#6F5839] mb-4">
                    Comprehensive coaching for JEE Mains with expert faculty and proven methodology
                  </p>
                  <p className="text-xs sm:text-sm text-[#8B6F47] mt-auto absolute bottom-6 sm:bottom-8">Click to see details →</p>
                </div>
                {/* Back */}
                <div className="absolute w-full h-full bg-gradient-to-br from-[#8B6F47] to-[#6F5839] p-5 sm:p-6 lg:p-8 rounded-lg shadow-md" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <h3 className="text-xl sm:text-2xl text-white mb-3 sm:mb-4">What's Offered</h3>
                  <ul className="space-y-2 sm:space-y-3 text-white text-sm sm:text-base">
                    <li>✓ Complete syllabus coverage</li>
                    <li>✓ Mock tests & analysis</li>
                    <li>✓ Problem-solving techniques</li>
                    <li>✓ Time management skills</li>
                    <li>✓ Previous year papers</li>
                    <li>✓ Expert mentorship</li>
                  </ul>
                  <p className="text-xs sm:text-sm text-[#E8DCC4] mt-auto absolute bottom-6 sm:bottom-8">Click to go back →</p>
                </div>
              </div>
            </div>

            {/* JEE Advanced Flip Card */}
            <div 
              className="relative h-72 sm:h-80 lg:h-80 cursor-pointer"
              style={{ perspective: '1000px' }}
              onClick={() => toggleCardFlip('jeeadvanced')}
            >
              <div 
                className="relative w-full h-full transition-transform duration-700"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: flippedCards['jeeadvanced'] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Front */}
                <div className="absolute w-full h-full bg-[#FAF8F3] p-5 sm:p-6 lg:p-8 rounded-lg shadow-md hover:shadow-xl transition" style={{ backfaceVisibility: 'hidden' }}>
                  <div className="bg-[#E8DCC4] w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <Award className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-[#8B6F47]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl text-[#5C4A35] mb-2 sm:mb-3">JEE Advanced</h3>
                  <p className="text-sm sm:text-base text-[#6F5839] mb-4">
                    Elite training program for IIT aspirants with advanced problem-solving focus
                  </p>
                  <p className="text-xs sm:text-sm text-[#8B6F47] mt-auto absolute bottom-6 sm:bottom-8">Click to see details →</p>
                </div>
                {/* Back */}
                <div className="absolute w-full h-full bg-gradient-to-br from-[#8B6F47] to-[#6F5839] p-5 sm:p-6 lg:p-8 rounded-lg shadow-md" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <h3 className="text-xl sm:text-2xl text-white mb-3 sm:mb-4">What's Offered</h3>
                  <ul className="space-y-2 sm:space-y-3 text-white text-sm sm:text-base">
                    <li>✓ IIT-level questions</li>
                    <li>✓ Previous year papers</li>
                    <li>✓ Intensive practice sessions</li>
                    <li>✓ Advanced concepts</li>
                    <li>✓ Individual attention</li>
                    <li>✓ Strategy sessions</li>
                  </ul>
                  <p className="text-xs sm:text-sm text-[#E8DCC4] mt-auto absolute bottom-6 sm:bottom-8">Click to go back →</p>
                </div>
              </div>
            </div>

            {/* NEET Flip Card */}
            <div 
              className="relative h-72 sm:h-80 lg:h-80 cursor-pointer"
              style={{ perspective: '1000px' }}
              onClick={() => toggleCardFlip('neet')}
            >
              <div 
                className="relative w-full h-full transition-transform duration-700"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: flippedCards['neet'] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Front */}
                <div className="absolute w-full h-full bg-[#FAF8F3] p-5 sm:p-6 lg:p-8 rounded-lg shadow-md hover:shadow-xl transition" style={{ backfaceVisibility: 'hidden' }}>
                  <div className="bg-[#E8DCC4] w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-[#8B6F47]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl text-[#5C4A35] mb-2 sm:mb-3">NEET</h3>
                  <p className="text-sm sm:text-base text-[#6F5839] mb-4">
                    Specialized NEET preparation with focus on Biology, Chemistry, and Physics
                  </p>
                  <p className="text-xs sm:text-sm text-[#8B6F47] mt-auto absolute bottom-6 sm:bottom-8">Click to see details →</p>
                </div>
                {/* Back */}
                <div className="absolute w-full h-full bg-gradient-to-br from-[#8B6F47] to-[#6F5839] p-5 sm:p-6 lg:p-8 rounded-lg shadow-md" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <h3 className="text-xl sm:text-2xl text-white mb-3 sm:mb-4">What's Offered</h3>
                  <ul className="space-y-2 sm:space-y-3 text-white text-sm sm:text-base">
                    <li>✓ Complete NEET syllabus</li>
                    <li>✓ NCERT-based teaching</li>
                    <li>✓ Regular mock tests</li>
                    <li>✓ Biology focus sessions</li>
                    <li>✓ Previous year analysis</li>
                    <li>✓ Medical counseling guidance</li>
                  </ul>
                  <p className="text-xs sm:text-sm text-[#E8DCC4] mt-auto absolute bottom-6 sm:bottom-8">Click to go back →</p>
                </div>
              </div>
            </div>

            {/* Foundation Course Flip Card */}
            <div 
              className="relative h-72 sm:h-80 lg:h-80 cursor-pointer"
              style={{ perspective: '1000px' }}
              onClick={() => toggleCardFlip('foundation')}
            >
              <div 
                className="relative w-full h-full transition-transform duration-700"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: flippedCards['foundation'] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Front */}
                <div className="absolute w-full h-full bg-[#FAF8F3] p-5 sm:p-6 lg:p-8 rounded-lg shadow-md hover:shadow-xl transition" style={{ backfaceVisibility: 'hidden' }}>
                  <div className="bg-[#E8DCC4] w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-[#8B6F47]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl text-[#5C4A35] mb-2 sm:mb-3">Foundation Course</h3>
                  <p className="text-sm sm:text-base text-[#6F5839] mb-4">
                    Early preparation for competitive exams starting from Class 8
                  </p>
                  <p className="text-xs sm:text-sm text-[#8B6F47] mt-auto absolute bottom-6 sm:bottom-8">Click to see details →</p>
                </div>
                {/* Back */}
                <div className="absolute w-full h-full bg-gradient-to-br from-[#8B6F47] to-[#6F5839] p-5 sm:p-6 lg:p-8 rounded-lg shadow-md" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <h3 className="text-xl sm:text-2xl text-white mb-3 sm:mb-4">What's Offered</h3>
                  <ul className="space-y-2 sm:space-y-3 text-white text-sm sm:text-base">
                    <li>✓ Aptitude development</li>
                    <li>✓ Logical reasoning</li>
                    <li>✓ Science & Math focus</li>
                    <li>✓ Competitive exam prep</li>
                    <li>✓ Olympiad training</li>
                    <li>✓ Early concept building</li>
                  </ul>
                  <p className="text-xs sm:text-sm text-[#E8DCC4] mt-auto absolute bottom-6 sm:bottom-8">Click to go back →</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Study Materials Section */}
      <section id="materials" className="py-12 sm:py-16 lg:py-20 bg-[#FAF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#5C4A35] mb-3 sm:mb-4">Study Materials</h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#6F5839] px-4">
              Access our comprehensive collection of notes, worksheets, and practice papers
            </p>
          </div>

          {/* Admin Panel for Materials */}
          {isAdminMode && (
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8 border-2 border-[#8B6F47]">
              <h3 className="text-lg sm:text-xl text-[#5C4A35] mb-4 flex items-center">
                <Edit className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Add New Study Material
              </h3>
              <div className="grid gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder="Material Title"
                  value={newMaterialTitle}
                  onChange={(e) => setNewMaterialTitle(e.target.value)}
                  className="px-4 py-3 border border-[#D4C4A8] rounded text-base"
                />
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <input
                    type="text"
                    placeholder="Category (e.g., JEE, NEET)"
                    value={newMaterialCategory}
                    onChange={(e) => setNewMaterialCategory(e.target.value)}
                    className="px-4 py-3 border border-[#D4C4A8] rounded text-base"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    value={newMaterialSubject}
                    onChange={(e) => setNewMaterialSubject(e.target.value)}
                    className="px-4 py-3 border border-[#D4C4A8] rounded text-base"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Description"
                  value={newMaterialDesc}
                  onChange={(e) => setNewMaterialDesc(e.target.value)}
                  className="px-4 py-3 border border-[#D4C4A8] rounded text-base"
                />
                <input
                  type="text"
                  placeholder="Download Link (URL)"
                  value={newMaterialLink}
                  onChange={(e) => setNewMaterialLink(e.target.value)}
                  className="px-4 py-3 border border-[#D4C4A8] rounded text-base"
                />
              </div>
              <button
                onClick={addMaterial}
                className="mt-4 bg-[#8B6F47] text-white px-6 py-3 rounded hover:bg-[#6F5839] flex items-center text-base"
              >
                <Upload className="h-4 w-4 mr-2" />
                Add Material
              </button>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {studyMaterials.map((material) => (
              <div key={material.id} className="bg-white p-5 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition relative">
                {isAdminMode && (
                  <button
                    onClick={() => deleteMaterial(material.id)}
                    className="absolute top-4 right-4 text-red-600 hover:text-red-800 p-2"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
                <div className="flex items-start mb-4">
                  <div className="bg-[#E8DCC4] p-2.5 sm:p-3 rounded-lg">
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-[#8B6F47]" />
                  </div>
                  <div className="ml-3 sm:ml-4 flex-1">
                    <span className="text-xs sm:text-sm text-[#8B6F47] bg-[#FAF8F3] px-2.5 sm:px-3 py-1 rounded-full inline-block">
                      {material.category}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl text-[#5C4A35] mb-2">{material.title}</h3>
                <p className="text-sm sm:text-base text-[#6F5839] mb-4">{material.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-[#8B6F47]">{material.subject}</span>
                  <a href={material.link} target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base text-[#8B6F47] hover:text-[#6F5839] flex items-center">
                    Download →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results & Toppers Section */}
      <section id="results" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#5C4A35] mb-3 sm:mb-4">Results & Toppers</h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#6F5839] px-4">
              Celebrating the success of our brilliant students
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
            <div className="text-center">
              <div className="bg-[#E8DCC4] w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl lg:text-4xl text-[#8B6F47]">98%</span>
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl text-[#5C4A35] mb-1 sm:mb-2">JEE Success Rate</h3>
              <p className="text-xs sm:text-sm lg:text-base text-[#6F5839]">Students qualifying JEE</p>
            </div>
            <div className="text-center">
              <div className="bg-[#E8DCC4] w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl lg:text-4xl text-[#8B6F47]">95%</span>
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl text-[#5C4A35] mb-1 sm:mb-2">NEET Success Rate</h3>
              <p className="text-xs sm:text-sm lg:text-base text-[#6F5839]">Students qualifying NEET</p>
            </div>
            <div className="text-center">
              <div className="bg-[#E8DCC4] w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl lg:text-4xl text-[#8B6F47]">150+</span>
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl text-[#5C4A35] mb-1 sm:mb-2">IIT Selections</h3>
              <p className="text-xs sm:text-sm lg:text-base text-[#6F5839]">In the last 3 years</p>
            </div>
            <div className="text-center">
              <div className="bg-[#E8DCC4] w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl lg:text-4xl text-[#8B6F47]">200+</span>
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl text-[#5C4A35] mb-1 sm:mb-2">Medical Seats</h3>
              <p className="text-xs sm:text-sm lg:text-base text-[#6F5839]">NEET qualified students</p>
            </div>
          </div>

          {/* Admin Panel for Toppers */}
          {isAdminMode && (
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8 border-2 border-[#8B6F47]">
              <h3 className="text-lg sm:text-xl text-[#5C4A35] mb-4 flex items-center">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Add New Topper
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder="Student Name"
                  value={newTopperName}
                  onChange={(e) => setNewTopperName(e.target.value)}
                  className="px-4 py-3 border border-[#D4C4A8] rounded text-base"
                />
                <input
                  type="text"
                  placeholder="Initials (e.g., RK)"
                  value={newTopperInitials}
                  onChange={(e) => setNewTopperInitials(e.target.value)}
                  className="px-4 py-3 border border-[#D4C4A8] rounded text-base"
                />
                <input
                  type="text"
                  placeholder="Achievement (e.g., AIR 42 - JEE Advanced)"
                  value={newTopperAchievement}
                  onChange={(e) => setNewTopperAchievement(e.target.value)}
                  className="px-4 py-3 border border-[#D4C4A8] rounded text-base"
                />
                <input
                  type="text"
                  placeholder="College (e.g., Admitted to IIT Delhi)"
                  value={newTopperCollege}
                  onChange={(e) => setNewTopperCollege(e.target.value)}
                  className="px-4 py-3 border border-[#D4C4A8] rounded text-base"
                />
              </div>
              <button
                onClick={addTopper}
                className="mt-4 bg-[#8B6F47] text-white px-6 py-3 rounded hover:bg-[#6F5839] flex items-center text-base"
              >
                <Upload className="h-4 w-4 mr-2" />
                Add Topper
              </button>
            </div>
          )}

          <div className="bg-gradient-to-br from-[#E8DCC4] to-[#D4C4A8] rounded-lg p-6 sm:p-8">
            <h3 className="text-2xl sm:text-3xl text-[#5C4A35] mb-6 sm:mb-8 text-center">Our Top Performers 2026</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {toppers.map((topper) => (
                <div key={topper.id} className="bg-white p-5 sm:p-6 rounded-lg text-center shadow-md relative">
                  {isAdminMode && (
                    <button
                      onClick={() => deleteTopper(topper.id)}
                      className="absolute top-3 sm:top-4 right-3 sm:right-4 text-red-600 hover:text-red-800 p-2"
                    >
                      <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  )}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#8B6F47] rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center text-white text-lg sm:text-2xl">
                    {topper.initials}
                  </div>
                  <h4 className="text-lg sm:text-xl text-[#5C4A35] mb-2">{topper.name}</h4>
                  <p className="text-sm sm:text-base text-[#8B6F47] mb-2">{topper.achievement}</p>
                  <p className="text-xs sm:text-sm text-[#6F5839]">{topper.college}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teachers Section with Custom Carousel */}
      <section id="teachers" className="py-12 sm:py-16 lg:py-20 bg-[#FAF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#5C4A35] mb-3 sm:mb-4">Our Expert Faculty</h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#6F5839] px-4">
              Learn from the best minds in education
            </p>
          </div>

          {/* Admin Panel for Teachers */}
          {isAdminMode && (
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8 border-2 border-[#8B6F47]">
              <h3 className="text-lg sm:text-xl text-[#5C4A35] mb-4 flex items-center">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Add New Teacher
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder="Teacher Name"
                  value={newTeacherName}
                  onChange={(e) => setNewTeacherName(e.target.value)}
                  className="px-4 py-3 border border-[#D4C4A8] rounded text-base"
                />
                <input
                  type="text"
                  placeholder="Subject (e.g., Physics Faculty)"
                  value={newTeacherSubject}
                  onChange={(e) => setNewTeacherSubject(e.target.value)}
                  className="px-4 py-3 border border-[#D4C4A8] rounded text-base"
                />
                <input
                  type="text"
                  placeholder="Qualification"
                  value={newTeacherQualification}
                  onChange={(e) => setNewTeacherQualification(e.target.value)}
                  className="px-4 py-3 border border-[#D4C4A8] rounded text-base"
                />
                <input
                  type="text"
                  placeholder="Image URL (optional)"
                  value={newTeacherImage}
                  onChange={(e) => setNewTeacherImage(e.target.value)}
                  className="px-4 py-3 border border-[#D4C4A8] rounded text-base"
                />
              </div>
              <button
                onClick={addTeacher}
                className="mt-4 bg-[#8B6F47] text-white px-6 py-3 rounded hover:bg-[#6F5839] flex items-center text-base"
              >
                <Upload className="h-4 w-4 mr-2" />
                Add Teacher
              </button>
            </div>
          )}

          {/* Custom Carousel */}
          <div className="relative px-8 sm:px-12">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * (100 / getSlidesToShow())}%)` }}
              >
                {teachers.map((teacher) => (
                  <div key={teacher.id} className="flex-shrink-0 px-2 sm:px-3" style={{ width: `${100 / getSlidesToShow()}%` }}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition relative">
                      {isAdminMode && (
                        <button
                          onClick={() => deleteTeacher(teacher.id)}
                          className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-800 z-10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                      {teacher.imageUrl ? (
                        <ImageWithFallback
                          src={teacher.imageUrl}
                          alt={teacher.name}
                          className="w-full h-48 sm:h-56 lg:h-64 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 sm:h-56 lg:h-64 bg-[#E8DCC4] flex items-center justify-center">
                          <Users className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 text-[#8B6F47]" />
                        </div>
                      )}
                      <div className="p-4 sm:p-5 lg:p-6">
                        <h3 className="text-base sm:text-lg lg:text-xl text-[#5C4A35] mb-1 sm:mb-2">{teacher.name}</h3>
                        <p className="text-sm sm:text-base text-[#8B6F47] mb-1 sm:mb-2">{teacher.subject}</p>
                        <p className="text-xs sm:text-sm text-[#6F5839]">{teacher.qualification}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#8B6F47] text-white p-2 sm:p-3 rounded-full hover:bg-[#6F5839] transition shadow-lg"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#8B6F47] text-white p-2 sm:p-3 rounded-full hover:bg-[#6F5839] transition shadow-lg"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
              {teachers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition ${
                    currentSlide === index ? 'bg-[#8B6F47]' : 'bg-[#D4C4A8]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="gallery" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#5C4A35] mb-3 sm:mb-4">Photo Gallery</h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#6F5839] px-4">
              Glimpses of our vibrant learning environment
            </p>
          </div>

          {/* Admin Panel for Gallery */}
          {isAdminMode && (
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8 border-2 border-[#8B6F47]">
              <h3 className="text-lg sm:text-xl text-[#5C4A35] mb-4 flex items-center">
                <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Add New Photo
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder="Enter photo URL"
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="flex-1 px-4 py-3 border border-[#D4C4A8] rounded text-base"
                />
                <button
                  onClick={addPhoto}
                  className="bg-[#8B6F47] text-white px-6 py-3 rounded hover:bg-[#6F5839] flex items-center justify-center text-base"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Add Photo
                </button>
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {galleryPhotos.map((photo) => (
              <div key={photo.id} className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition">
                <ImageWithFallback
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform group-hover:scale-110"
                />
                {isAdminMode && (
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-800 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <p className="text-white p-3 sm:p-4 text-sm sm:text-base">{photo.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#E8DCC4] to-[#D4C4A8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#5C4A35] mb-3 sm:mb-4">Contact Us</h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#6F5839] px-4">
              Get in touch with us to start your journey to excellence
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
              <h3 className="text-xl sm:text-2xl text-[#5C4A35] mb-4 sm:mb-6">Send us a message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm sm:text-base text-[#6F5839] mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-[#D4C4A8] rounded focus:outline-none focus:border-[#8B6F47] text-base"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm sm:text-base text-[#6F5839] mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-[#D4C4A8] rounded focus:outline-none focus:border-[#8B6F47] text-base"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm sm:text-base text-[#6F5839] mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-[#D4C4A8] rounded focus:outline-none focus:border-[#8B6F47] text-base"
                    placeholder="Enter your phone"
                  />
                </div>
                <div>
                  <label className="block text-sm sm:text-base text-[#6F5839] mb-2">Course Interested In</label>
                  <select className="w-full px-4 py-3 border border-[#D4C4A8] rounded focus:outline-none focus:border-[#8B6F47] text-base">
                    <option>Select a course</option>
                    <option>Class 8-10</option>
                    <option>Class 11-12</option>
                    <option>JEE Mains</option>
                    <option>JEE Advanced</option>
                    <option>NEET</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm sm:text-base text-[#6F5839] mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-[#D4C4A8] rounded focus:outline-none focus:border-[#8B6F47] text-base"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#8B6F47] text-white py-3 rounded hover:bg-[#6F5839] transition text-base sm:text-lg"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <h3 className="text-xl sm:text-2xl text-[#5C4A35] mb-4 sm:mb-6">Visit Us</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-[#8B6F47] mt-1 mr-3 sm:mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="text-base sm:text-lg text-[#5C4A35] mb-1">Address</h4>
                      <p className="text-sm sm:text-base text-[#6F5839]">
                        123 Education Lane, Knowledge Park<br />
                        Delhi - 110001, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-[#8B6F47] mt-1 mr-3 sm:mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="text-base sm:text-lg text-[#5C4A35] mb-1">Phone</h4>
                      <p className="text-sm sm:text-base text-[#6F5839]">+91 98765 43210</p>
                      <p className="text-sm sm:text-base text-[#6F5839]">+91 98765 43211</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-[#8B6F47] mt-1 mr-3 sm:mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="text-base sm:text-lg text-[#5C4A35] mb-1">Email</h4>
                      <p className="text-sm sm:text-base text-[#6F5839] break-words">info@excellenceacademy.com</p>
                      <p className="text-sm sm:text-base text-[#6F5839] break-words">admissions@excellenceacademy.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <h3 className="text-xl sm:text-2xl text-[#5C4A35] mb-3 sm:mb-4">Office Hours</h3>
                <div className="space-y-2 text-sm sm:text-base text-[#6F5839]">
                  <p><strong>Monday - Friday:</strong> 9:00 AM - 7:00 PM</p>
                  <p><strong>Saturday:</strong> 9:00 AM - 5:00 PM</p>
                  <p><strong>Sunday:</strong> 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#5C4A35] text-white py-8 sm:py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center mb-3 sm:mb-4">
                <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8" />
                <span className="ml-2 text-lg sm:text-xl">Excellence Academy</span>
              </div>
              <p className="text-sm sm:text-base text-[#D4C4A8]">
                Empowering students to achieve their dreams through quality education
              </p>
            </div>
            <div>
              <h4 className="text-base sm:text-lg mb-3 sm:mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm sm:text-base text-[#D4C4A8]">
                <li><button onClick={() => scrollToSection('hero')} className="hover:text-white transition">Home</button></li>
                <li><button onClick={() => scrollToSection('mission')} className="hover:text-white transition">About Us</button></li>
                <li><button onClick={() => scrollToSection('materials')} className="hover:text-white transition">Study Materials</button></li>
                <li><button onClick={() => scrollToSection('results')} className="hover:text-white transition">Results</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base sm:text-lg mb-3 sm:mb-4">Courses</h4>
              <ul className="space-y-2 text-sm sm:text-base text-[#D4C4A8]">
                <li>Class 8-12</li>
                <li>JEE Mains & Advanced</li>
                <li>NEET</li>
                <li>Foundation Course</li>
              </ul>
            </div>
            <div>
              <h4 className="text-base sm:text-lg mb-3 sm:mb-4">Connect With Us</h4>
              <p className="text-sm sm:text-base text-[#D4C4A8] mb-2">Follow us on social media</p>
              <div className="flex flex-wrap gap-3 sm:gap-4 text-sm sm:text-base">
                <a href="#" className="hover:text-[#E8DCC4] transition">Facebook</a>
                <a href="#" className="hover:text-[#E8DCC4] transition">Twitter</a>
                <a href="#" className="hover:text-[#E8DCC4] transition">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#8B6F47] pt-6 sm:pt-8 text-center text-sm sm:text-base text-[#D4C4A8]">
            <p>&copy; 2026 Excellence Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
