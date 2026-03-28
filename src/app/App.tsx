import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NavigationBar } from './components/NavigationBar';
import { HeroSection } from './components/HeroSection';
import { ProgramsSection } from './components/ProgramsSection';
import { StatsSection } from './components/StatsSection';
import { MaterialsSection, StudyMaterial } from './components/MaterialsSection';
import { ToppersSection, Topper } from './components/ToppersSection';
import { TeachersSection, Teacher } from './components/TeachersSection';
import { TestimonialsSection, Testimonial } from './components/TestimonialsSection';
import { GallerySection, GalleryPhoto } from './components/GallerySection';
import { ContactSection, ContactSubmission } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { FloatingCTA } from './components/FloatingCTA';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import trophy1 from 'figma:asset/36ea5951d2d63f5719670d6653c8b0c26917d78b.png';
import trophy2 from 'figma:asset/0486b818ac9e8a5612a310a9d73be298771460f8.png';
import trophy3 from 'figma:asset/f457a852b8bf6d699bf2ed366ec0868460d11417.png';
import trophy4 from 'figma:asset/4e53994bdd4422f33616c0213068db46aa0f7216.png';
import trophy5 from 'figma:asset/730822c96174e42b62b6dd48f56ed2f4a26ae910.png';
import trophy6 from 'figma:asset/9fa8dd154177699407f5c44216642c52d4793c1a.png';
import trophy7 from 'figma:asset/6542e6d143a437d09542e341bcc2d0fde9557fd7.png';
import trophy8 from 'figma:asset/2d68f16cfddbeb86c9310db4c1bf0fe3aa63dd0c.png';
import sunilPhoto from 'figma:asset/6b24aec63921f2f9f14683d5cfa87ef4b03d2e14.png';
import nikhilPhoto from 'figma:asset/fb24e62e19dd9fca2b7e7bf0dee2fcbcaa57c960.png';
import kkVermaPhoto from 'figma:asset/a9e9e7b3889177d21e827d6cb1510bd40e377851.png';
import karanPhoto from 'figma:asset/76cc0989b616e663024022f4c106aacdf45c4f20.png';
import navdeepPhoto from 'figma:asset/6f07826498eceb6f90ba29752081379ba8f7560f.png';
import abhinandanPhoto from 'figma:asset/a23bb5128b3850d6a0f89c89ad8bc3de39443c3d.png';
import vikramPhoto from 'figma:asset/5370796b3685cf46f8fa7eb3fa8a56291e1dee3b.png';
import boardResultBanner from 'figma:asset/acd67c9cdc875381edcf4c6cd01767faa445ccaf.png';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9be6440c`;

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // Gallery Photos State
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([
    { id: 1, url: boardResultBanner, alt: '12th Board Result Excellence - Tamana Gupta & Ritika Bhau' },
    { id: 2, url: 'https://images.unsplash.com/photo-1760348082205-8bda5fbdd7b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3VjY2VzcyUyMGNlbGVicmF0aW9uJTIwYWNoaWV2ZW1lbnR8ZW58MXx8fHwxNzc0NDM3NDkzfDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Student Success' },
    { id: 3, url: 'https://images.unsplash.com/photo-1758685848174-e061c6486651?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjbGFzc3Jvb20lMjB0ZWFjaGluZyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NzQ0Mzc0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Modern Classroom' },
    { id: 4, url: 'https://images.unsplash.com/photo-1542725752-e9f7259b3881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMGxpYnJhcnklMjBib29rcyUyMGxlYXJuaW5nfGVufDF8fHx8MTc3NDQzNzQ5M3ww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Library' },
    { id: 5, url: 'https://images.unsplash.com/photo-1758685848001-0396a85ba84f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXQlMjBjb25maWRlbnR8ZW58MXx8fHwxNzc0NDM3NDk0fDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Professional Teacher' },
    { id: 6, url: 'https://images.unsplash.com/photo-1758685734153-132c8620c1bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMGV4cGVyaW1lbnQlMjBzdHVkZW50c3xlbnwxfHx8fDE3NzQ0Mzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Science Lab' },
    { id: 7, url: 'https://images.unsplash.com/photo-1680444873773-7c106c23ac52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYXJjaGl0ZWN0dXJlJTIwbW9kZXJufGVufDF8fHx8MTc3NDQzNzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Campus' },
  ]);

  // Study Materials State
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>([
    { id: 1, title: 'Physics Notes - Class 11', description: 'Complete physics notes for Class 11 CBSE covering mechanics, thermodynamics, and optics', category: 'Class 11', subject: 'Physics', link: 'https://example.com/physics-notes' },
    { id: 2, title: 'Chemistry Handbook - JEE', description: 'Comprehensive chemistry notes for JEE preparation with solved examples', category: 'JEE', subject: 'Chemistry', link: 'https://example.com/chemistry' },
    { id: 3, title: 'Biology Notes - NEET', description: 'Complete biology notes for NEET aspirants covering botany and zoology', category: 'NEET', subject: 'Biology', link: 'https://example.com/biology' },
    { id: 4, title: 'Mathematics Problem Sets', description: 'Advanced math problems for competitive exams with detailed solutions', category: 'JEE', subject: 'Mathematics', link: 'https://example.com/math' },
    { id: 5, title: 'English Grammar - Class 10', description: 'Essential grammar rules and exercises for board exam preparation', category: 'Class 10', subject: 'English', link: 'https://example.com/english' },
    { id: 6, title: 'Organic Chemistry - JEE Advanced', description: 'Advanced organic chemistry concepts with reaction mechanisms', category: 'JEE Advanced', subject: 'Chemistry', link: 'https://example.com/organic' },
  ]);

  // Teachers State
  const [teachers, setTeachers] = useState<Teacher[]>([
    { id: 1, name: 'SUNIL SHARMA', subject: 'Maths By', qualification: '(M.Sc, B.Ed) - "A name that students trust upon"', imageUrl: sunilPhoto, phone: '94191-24153, 7006071996' },
    { id: 2, name: 'VIKRAMJEET SINGH', subject: 'Physics By', qualification: '(B.E)', imageUrl: vikramPhoto, phone: '7006327241' },
    { id: 3, name: 'NIKHIL RANDHAWA', subject: 'Chemistry By', qualification: '(M.Sc + GATE Qualified)', imageUrl: nikhilPhoto, phone: '9697914897' },
    { id: 4, name: 'K.K VERMA', subject: 'Arts By', qualification: '', imageUrl: kkVermaPhoto, phone: '9469098053' },
    { id: 5, name: 'NAVDEEP KOUR', subject: 'Biology', qualification: '(M.Sc. Botany + B.Ed)', imageUrl: navdeepPhoto, phone: '' },
    { id: 6, name: 'KARAN SINGH', subject: 'Class 8th, 9th & 10th - All Subjects', qualification: '', imageUrl: karanPhoto, phone: '7006143584' },
    { id: 7, name: 'ABHINANDAN SANMOTRA', subject: 'Class 8th, 9th & 10th - All Subjects', qualification: '', imageUrl: abhinandanPhoto, phone: '9086356199' },
  ]);

  // Toppers State
  const [toppers, setToppers] = useState<Topper[]>([
    { id: 1, imageUrl: trophy1 },
    { id: 2, imageUrl: trophy2 },
    { id: 3, imageUrl: trophy3 },
    { id: 4, imageUrl: trophy4 },
    { id: 5, imageUrl: trophy5 },
    { id: 6, imageUrl: trophy6 },
    { id: 7, imageUrl: trophy7 },
    { id: 8, imageUrl: trophy8 },
  ]);

  // Contact Submissions State
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);

  // Testimonials State
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    { id: 1, name: 'Arjun Sharma', achievement: 'IIT Delhi, AIR 156', content: 'Sd Group of Institutions transformed my preparation journey. The faculty\'s dedication and personalized attention helped me achieve my dream of getting into IIT Delhi.', rating: 5, initials: 'AS' },
    { id: 2, name: 'Priya Gupta', achievement: 'AIIMS Delhi, AIR 42', content: 'The structured curriculum and regular tests kept me on track. The biology faculty here are exceptional and their teaching methods are unmatched.', rating: 5, initials: 'PG' },
    { id: 3, name: 'Rahul Verma', achievement: 'IIT Bombay, AIR 89', content: 'Best decision of my life was joining Sd Group of Institutions. The study materials, mock tests, and faculty support were instrumental in my success.', rating: 5, initials: 'RV' }
  ]);

  // Admin handlers
  const handleAdminLogin = (password: string) => {
    setIsAdminMode(true);
    setShowAdminLogin(false);
  };

  const handleAdminLogout = () => {
    setIsAdminMode(false);
  };

  // Gallery handlers - Use API
  const handleAddPhoto = async (url: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ url, alt: 'Gallery photo' })
      });
      const data = await response.json();
      if (data.success) {
        console.log('Gallery photo saved to backend:', data.photo);
        setGalleryPhotos([...galleryPhotos, data.photo]);
      } else {
        console.error('Error saving gallery photo:', data.error);
      }
    } catch (error) {
      console.error('Error adding gallery photo to API:', error);
    }
  };

  const handleDeletePhoto = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      const data = await response.json();
      if (data.success) {
        console.log('Gallery photo deleted from backend:', id);
        setGalleryPhotos(galleryPhotos.filter(photo => photo.id !== id));
      } else {
        console.error('Error deleting gallery photo:', data.error);
      }
    } catch (error) {
      console.error('Error deleting gallery photo from API:', error);
    }
  };

  // Materials handlers - Use API
  const handleAddMaterial = async (material: Omit<StudyMaterial, 'id'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/materials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(material)
      });
      const data = await response.json();
      if (data.success) {
        console.log('Material saved to backend:', data.material);
        setStudyMaterials([...studyMaterials, data.material]);
      } else {
        console.error('Error saving material:', data.error);
      }
    } catch (error) {
      console.error('Error adding material to API:', error);
    }
  };

  const handleUpdateMaterial = async (id: number, material: Omit<StudyMaterial, 'id'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/materials/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(material)
      });
      const data = await response.json();
      if (data.success) {
        console.log('Material updated in backend:', data.material);
        setStudyMaterials(studyMaterials.map(m => m.id === id ? data.material : m));
      } else {
        console.error('Error updating material:', data.error);
      }
    } catch (error) {
      console.error('Error updating material in API:', error);
    }
  };

  const handleDeleteMaterial = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/materials/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      const data = await response.json();
      if (data.success) {
        console.log('Material deleted from backend:', id);
        setStudyMaterials(studyMaterials.filter(material => material.id !== id));
      } else {
        console.error('Error deleting material:', data.error);
      }
    } catch (error) {
      console.error('Error deleting material from API:', error);
    }
  };

  // Teachers handlers - Use API
  const handleAddTeacher = async (teacher: Omit<Teacher, 'id'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/teachers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(teacher)
      });
      const data = await response.json();
      if (data.success) {
        console.log('Teacher saved to backend:', data.teacher);
        setTeachers([...teachers, data.teacher]);
      } else {
        console.error('Error saving teacher:', data.error);
      }
    } catch (error) {
      console.error('Error adding teacher to API:', error);
    }
  };

  const handleUpdateTeacher = async (id: number, teacher: Omit<Teacher, 'id'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/teachers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(teacher)
      });
      const data = await response.json();
      if (data.success) {
        console.log('Teacher updated in backend:', data.teacher);
        setTeachers(teachers.map(t => t.id === id ? data.teacher : t));
      } else {
        console.error('Error updating teacher:', data.error);
      }
    } catch (error) {
      console.error('Error updating teacher in API:', error);
    }
  };

  const handleDeleteTeacher = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/teachers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      const data = await response.json();
      if (data.success) {
        console.log('Teacher deleted from backend:', id);
        setTeachers(teachers.filter(teacher => teacher.id !== id));
      } else {
        console.error('Error deleting teacher:', data.error);
      }
    } catch (error) {
      console.error('Error deleting teacher from API:', error);
    }
  };

  // Toppers handlers - Use API
  const handleAddTopper = async (topper: Omit<Topper, 'id'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/toppers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(topper)
      });
      const data = await response.json();
      if (data.success) {
        console.log('Topper saved to backend:', data.topper);
        setToppers([...toppers, data.topper]);
      } else {
        console.error('Error saving topper:', data.error);
      }
    } catch (error) {
      console.error('Error adding topper to API:', error);
    }
  };

  const handleUpdateTopper = async (id: number, topper: Omit<Topper, 'id'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/toppers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(topper)
      });
      const data = await response.json();
      if (data.success) {
        console.log('Topper updated in backend:', data.topper);
        setToppers(toppers.map(t => t.id === id ? data.topper : t));
      } else {
        console.error('Error updating topper:', data.error);
      }
    } catch (error) {
      console.error('Error updating topper in API:', error);
    }
  };

  const handleDeleteTopper = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/toppers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      const data = await response.json();
      if (data.success) {
        console.log('Topper deleted from backend:', id);
        setToppers(toppers.filter(topper => topper.id !== id));
      } else {
        console.error('Error deleting topper:', data.error);
      }
    } catch (error) {
      console.error('Error deleting topper from API:', error);
    }
  };

  // Testimonials handlers - Use API
  const handleAddTestimonial = async (testimonial: Omit<Testimonial, 'id'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/testimonials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(testimonial)
      });
      const data = await response.json();
      if (data.success) {
        console.log('Testimonial saved to backend:', data.testimonial);
        setTestimonials([...testimonials, data.testimonial]);
      } else {
        console.error('Error saving testimonial:', data.error);
      }
    } catch (error) {
      console.error('Error adding testimonial to API:', error);
    }
  };

  const handleUpdateTestimonial = async (id: number, testimonial: Omit<Testimonial, 'id'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(testimonial)
      });
      const data = await response.json();
      if (data.success) {
        console.log('Testimonial updated in backend:', data.testimonial);
        setTestimonials(testimonials.map(t => t.id === id ? data.testimonial : t));
      } else {
        console.error('Error updating testimonial:', data.error);
      }
    } catch (error) {
      console.error('Error updating testimonial in API:', error);
    }
  };

  const handleDeleteTestimonial = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      const data = await response.json();
      if (data.success) {
        console.log('Testimonial deleted from backend:', id);
        setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
      } else {
        console.error('Error deleting testimonial:', data.error);
      }
    } catch (error) {
      console.error('Error deleting testimonial from API:', error);
    }
  };

  // Contact submission handlers - Use API
  const fetchContactSubmissions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact-submissions`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setContactSubmissions(data.submissions);
        console.log('Fetched contact submissions from backend:', data.submissions);
      } else {
        console.error('Error fetching contact submissions:', data.error);
      }
    } catch (error) {
      console.error('Error fetching contact submissions from API:', error);
    }
  };

  const handleContactSubmit = async (submission: Omit<ContactSubmission, 'id' | 'timestamp'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact-submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(submission)
      });
      const data = await response.json();
      if (data.success) {
        console.log('Contact submission saved to backend:', data.submission);
        // Refresh submissions list
        await fetchContactSubmissions();
      } else {
        console.error('Error saving contact submission:', data.error);
      }
    } catch (error) {
      console.error('Error submitting contact form to API:', error);
    }
  };

  const handleDeleteContactSubmission = async (id: number) => {
    try {
      console.log(`Attempting to delete contact submission with ID: ${id}`);
      const response = await fetch(`${API_BASE_URL}/contact-submissions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      console.log(`Delete response status: ${response.status}`);
      const data = await response.json();
      console.log('Delete response data:', data);
      
      if (data.success) {
        console.log('Contact submission deleted from backend:', id);
        // Refresh submissions list
        await fetchContactSubmissions();
      } else {
        console.error('Error deleting contact submission:', data.error);
        alert(`Failed to delete submission: ${data.error}`);
      }
    } catch (error) {
      console.error('Error deleting contact submission from API:', error);
      alert(`Error deleting submission: ${error}`);
    }
  };

  // Smooth scroll utility
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Fetch contact submissions on mount
  useEffect(() => {
    fetchContactSubmissions();
  }, []);

  // Fetch all data from backend on mount
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch materials
        const materialsRes = await fetch(`${API_BASE_URL}/materials`, {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        });
        const materialsData = await materialsRes.json();
        if (materialsData.success && materialsData.materials.length > 0) {
          setStudyMaterials(materialsData.materials);
          console.log('Fetched materials from backend:', materialsData.materials);
        }

        // Fetch toppers
        const toppersRes = await fetch(`${API_BASE_URL}/toppers`, {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        });
        const toppersData = await toppersRes.json();
        if (toppersData.success && toppersData.toppers.length > 0) {
          setToppers(toppersData.toppers);
          console.log('Fetched toppers from backend:', toppersData.toppers);
        }

        // Fetch teachers
        const teachersRes = await fetch(`${API_BASE_URL}/teachers`, {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        });
        const teachersData = await teachersRes.json();
        if (teachersData.success && teachersData.teachers.length > 0) {
          setTeachers(teachersData.teachers);
          console.log('Fetched teachers from backend:', teachersData.teachers);
        }

        // Fetch gallery
        const galleryRes = await fetch(`${API_BASE_URL}/gallery`, {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        });
        const galleryData = await galleryRes.json();
        if (galleryData.success && galleryData.photos.length > 0) {
          setGalleryPhotos(galleryData.photos);
          console.log('Fetched gallery photos from backend:', galleryData.photos);
        }

        // Fetch testimonials
        const testimonialsRes = await fetch(`${API_BASE_URL}/testimonials`, {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        });
        const testimonialsData = await testimonialsRes.json();
        if (testimonialsData.success && testimonialsData.testimonials.length > 0) {
          setTestimonials(testimonialsData.testimonials);
          console.log('Fetched testimonials from backend:', testimonialsData.testimonials);
        }
      } catch (error) {
        console.error('Error fetching data from backend:', error);
      }
    };

    fetchAllData();
    fetchContactSubmissions();
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <NavigationBar
          isAdminMode={isAdminMode}
          onAdminLogin={() => setShowAdminLogin(true)}
          onAdminLogout={handleAdminLogout}
          scrollToSection={scrollToSection}
        />

        {/* Hero Section */}
        <HeroSection scrollToSection={scrollToSection} />

        {/* Toppers Section - Moved right after Hero */}
        <ToppersSection
          toppers={toppers}
          isAdminMode={isAdminMode}
          onAddTopper={handleAddTopper}
          onDeleteTopper={handleDeleteTopper}
        />

        {/* Programs Section */}
        <ProgramsSection />

        {/* Stats Section */}
        <StatsSection />

        {/* Materials Section */}
        <MaterialsSection
          materials={studyMaterials}
          isAdminMode={isAdminMode}
          onAddMaterial={handleAddMaterial}
          onUpdateMaterial={handleUpdateMaterial}
          onDeleteMaterial={handleDeleteMaterial}
        />

        {/* Teachers Section */}
        <TeachersSection
          teachers={teachers}
          isAdminMode={isAdminMode}
          onAddTeacher={handleAddTeacher}
          onUpdateTeacher={handleUpdateTeacher}
          onDeleteTeacher={handleDeleteTeacher}
        />

        {/* Testimonials Section */}
        <TestimonialsSection
          testimonials={testimonials}
          isAdminMode={isAdminMode}
          onAddTestimonial={handleAddTestimonial}
          onUpdateTestimonial={handleUpdateTestimonial}
          onDeleteTestimonial={handleDeleteTestimonial}
        />

        {/* Gallery Section */}
        <GallerySection
          photos={galleryPhotos}
          isAdminMode={isAdminMode}
          onAddPhoto={handleAddPhoto}
          onDeletePhoto={handleDeletePhoto}
        />

        {/* Contact Section */}
        <ContactSection
          isAdminMode={isAdminMode}
          onSubmit={handleContactSubmit}
          submissions={contactSubmissions}
          onDelete={handleDeleteContactSubmission}
        />

        {/* Footer */}
        <Footer />

        {/* Admin Login Modal */}
        <AdminLoginModal
          show={showAdminLogin}
          onClose={() => setShowAdminLogin(false)}
          onLogin={handleAdminLogin}
        />

        {/* Floating CTA */}
        <FloatingCTA scrollToSection={scrollToSection} />
      </div>
    </ErrorBoundary>
  );
}