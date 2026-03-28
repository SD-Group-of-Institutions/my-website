import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Award, Plus, Trash2, Star, BookOpen, Phone, Edit2, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Teacher {
  id: number;
  name: string;
  subject: string;
  qualification: string;
  imageUrl: string;
  phone?: string;
}

interface TeachersSectionProps {
  teachers: Teacher[];
  onAddTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  onUpdateTeacher: (id: number, teacher: Omit<Teacher, 'id'>) => void;
  onDeleteTeacher: (id: number) => void;
  isAdminMode: boolean;
}

export function TeachersSection({ teachers, onAddTeacher, onUpdateTeacher, onDeleteTeacher, isAdminMode }: TeachersSectionProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    subject: '',
    qualification: '',
    imageUrl: '',
    phone: ''
  });

  const handleAdd = () => {
    if (newTeacher.name && newTeacher.subject && newTeacher.qualification) {
      if (editingId) {
        onUpdateTeacher(editingId, newTeacher);
      } else {
        onAddTeacher(newTeacher);
      }
      setNewTeacher({ name: '', subject: '', qualification: '', imageUrl: '', phone: '' });
      setShowAddForm(false);
      setEditingId(null);
    }
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingId(teacher.id);
    setNewTeacher({
      name: teacher.name,
      subject: teacher.subject,
      qualification: teacher.qualification,
      imageUrl: teacher.imageUrl,
      phone: teacher.phone || ''
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setNewTeacher({ name: '', subject: '', qualification: '', imageUrl: '', phone: '' });
    setShowAddForm(false);
    setEditingId(null);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount = 350;
      const currentScroll = carouselRef.current.scrollLeft || 0;
      carouselRef.current.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      const scrollAmount = 350;
      const currentScroll = carouselRef.current.scrollLeft || 0;
      carouselRef.current.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="teachers" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1E3A8A] text-white text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            Our Faculty
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Learn from the Best
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Our expert faculty members bring years of experience and proven teaching methodologies
          </p>
        </motion.div>

        {isAdminMode && (
          <div className="flex justify-center mb-6 sm:mb-8">
            <motion.button
              onClick={() => {
                setShowAddForm(!showAddForm);
                setEditingId(null);
                setNewTeacher({ name: '', subject: '', qualification: '', imageUrl: '', phone: '' });
              }}
              className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-green-600 text-white font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              Add Teacher
            </motion.button>
          </div>
        )}

        {/* Add/Edit Form */}
        {isAdminMode && showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-[#F5F1E8] border-2 border-[#1E3A8A] p-4 sm:p-6 mb-6 sm:mb-8"
          >
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
              {editingId ? 'Edit Teacher' : 'Add New Teacher'}
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Teacher Name"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 focus:border-[#1E3A8A] outline-none"
              />
              <input
                type="text"
                placeholder="Subject (e.g., Physics Faculty)"
                value={newTeacher.subject}
                onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 focus:border-[#1E3A8A] outline-none"
              />
              <input
                type="text"
                placeholder="Image URL (optional)"
                value={newTeacher.imageUrl}
                onChange={(e) => setNewTeacher({ ...newTeacher, imageUrl: e.target.value })}
                className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 focus:border-[#1E3A8A] outline-none"
              />
              <input
                type="text"
                placeholder="Qualification"
                value={newTeacher.qualification}
                onChange={(e) => setNewTeacher({ ...newTeacher, qualification: e.target.value })}
                className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 focus:border-[#1E3A8A] outline-none"
              />
              <input
                type="text"
                placeholder="Phone Number (optional)"
                value={newTeacher.phone}
                onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 focus:border-[#1E3A8A] outline-none"
              />
            </div>
            <div className="flex gap-2 mt-3 sm:mt-4">
              <button
                onClick={handleAdd}
                className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-[#1E3A8A] text-white font-medium hover:bg-[#1E40AF]"
              >
                {editingId ? 'Update Teacher' : 'Add Teacher'}
              </button>
              <button
                onClick={handleCancel}
                className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 border-2 border-gray-300"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Auto-scrolling Horizontal Carousel */}
        {teachers.length > 0 && (
          <div className="relative overflow-hidden">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <div className="overflow-x-auto scrollbar-hide" ref={carouselRef} style={{ scrollBehavior: 'smooth' }}>
              <div 
                className={`flex ${isPaused ? '' : 'animate-scroll-continuous'}`}
              >
                {/* Duplicate teachers for seamless loop */}
                {[...teachers, ...teachers].map((teacher, index) => {
                  return (
                    <motion.div
                      key={`teacher-${index}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="relative bg-white border-2 border-gray-200 hover:border-[#1E3A8A] hover:shadow-2xl transition-all overflow-hidden group flex-shrink-0 w-[380px] sm:w-[420px] mx-2 sm:mx-3"
                    >
                      {/* Top accent bar */}
                      <div className="h-1.5 sm:h-2 bg-gradient-to-r from-[#1E3A8A] to-blue-600" />

                      <div className="p-5 sm:p-6">
                        {/* Avatar - Photo or Initials */}
                        <div className="flex items-start gap-4 mb-4">
                          {teacher.imageUrl ? (
                            <div className="relative w-28 h-32 sm:w-32 sm:h-36 shadow-lg overflow-hidden border-4 border-[#1E3A8A] flex-shrink-0">
                              <img
                                src={teacher.imageUrl}
                                alt={teacher.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-28 h-32 sm:w-32 sm:h-36 bg-gradient-to-br from-[#1E3A8A] to-blue-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg flex-shrink-0">
                              {teacher.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                          
                          <div className="flex-1">
                            {/* Content */}
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                              {teacher.name}
                            </h3>
                            
                            <div className="flex items-center gap-0.5 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-start gap-2">
                            <BookOpen className="h-5 w-5 text-[#1E3A8A] flex-shrink-0 mt-0.5" />
                            <span className="text-sm font-semibold text-[#1E3A8A]">
                              {teacher.subject}
                            </span>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <Award className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">
                              {teacher.qualification}
                            </span>
                          </div>
                          
                          {teacher.phone && (
                            <div className="flex items-start gap-2">
                              <Phone className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-600">
                                {teacher.phone}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Badge */}
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#1E3A8A] to-blue-600 text-white text-xs font-medium">
                          <Award className="h-3.5 w-3.5" />
                          <span>Expert Educator</span>
                        </div>

                        {isAdminMode && index < teachers.length && (
                          <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <button
                              onClick={() => handleEdit(teacher)}
                              className="p-1.5 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => onDeleteTeacher(teacher.id)}
                              className="p-1.5 bg-red-500 text-white hover:bg-red-600 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Control button - Play/Pause */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
              <button
                onClick={togglePause}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors border-2 border-[#1E3A8A]"
                title={isPaused ? 'Play' : 'Pause'}
              >
                {isPaused ? (
                  <Play className="h-5 w-5 text-[#1E3A8A] fill-[#1E3A8A]" />
                ) : (
                  <Pause className="h-5 w-5 text-[#1E3A8A] fill-[#1E3A8A]" />
                )}
              </button>
            </div>

            {/* Scroll buttons */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
              <button
                onClick={handleScrollLeft}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors border-2 border-[#1E3A8A]"
                title="Scroll Left"
              >
                <ChevronLeft className="h-5 w-5 text-[#1E3A8A] fill-[#1E3A8A]" />
              </button>
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
              <button
                onClick={handleScrollRight}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors border-2 border-[#1E3A8A]"
                title="Scroll Right"
              >
                <ChevronRight className="h-5 w-5 text-[#1E3A8A] fill-[#1E3A8A]" />
              </button>
            </div>
          </div>
        )}

        {teachers.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <Award className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
            <p className="text-gray-500 text-base sm:text-lg">No teachers added yet</p>
          </div>
        )}
      </div>
    </section>
  );
}