import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Trophy, Plus, Trash2, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';

export interface Topper {
  id: number;
  imageUrl: string;
}

interface ToppersSectionProps {
  toppers: Topper[];
  onAddTopper: (topper: Omit<Topper, 'id'>) => void;
  onDeleteTopper: (id: number) => void;
  isAdminMode: boolean;
}

export function ToppersSection({ toppers, onAddTopper, onDeleteTopper, isAdminMode }: ToppersSectionProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleAdd = () => {
    if (newImageUrl.trim()) {
      onAddTopper({ imageUrl: newImageUrl.trim() });
      setNewImageUrl('');
      setShowAddForm(false);
    }
  };

  const handleCancel = () => {
    setNewImageUrl('');
    setShowAddForm(false);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      const currentScroll = carouselRef.current.scrollLeft || 0;
      carouselRef.current.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      const currentScroll = carouselRef.current.scrollLeft || 0;
      carouselRef.current.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="results" className="py-12 sm:py-16 lg:py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1E3A8A] text-white text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our Hall of Fame
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Celebrating the achievements of our brilliant students
          </p>
        </motion.div>

        {isAdminMode && (
          <div className="flex justify-center mb-6 sm:mb-8">
            <motion.button
              onClick={() => {
                setShowAddForm(!showAddForm);
                setNewImageUrl('');
              }}
              className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-green-600 text-white font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              Add Photo
            </motion.button>
          </div>
        )}

        {/* Add Form */}
        {isAdminMode && showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white border-2 border-[#1E3A8A] p-4 sm:p-6 mb-6 sm:mb-8 max-w-xl mx-auto"
          >
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
              Add Trophy Ceremony Photo
            </h3>
            <input
              type="text"
              placeholder="Image URL"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 focus:border-[#1E3A8A] outline-none mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-[#1E3A8A] text-white font-medium hover:bg-[#1E40AF]"
              >
                Add Photo
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

        {/* Photo Gallery Grid */}
        {toppers.length > 0 && (
          <div className="relative overflow-hidden">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F5F1E8] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F5F1E8] to-transparent z-10 pointer-events-none" />
            
            <div className="overflow-x-auto scrollbar-hide" ref={carouselRef} style={{ scrollBehavior: 'smooth' }}>
              <div 
                className={`flex ${isPaused ? '' : 'animate-scroll-continuous'}`}
              >
                {/* Duplicate toppers for seamless scrolling */}
                {[...toppers, ...toppers].map((topper, index) => {
                  return (
                    <motion.div
                      key={`topper-${index}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="group relative bg-white border-2 border-gray-200 hover:border-[#1E3A8A] hover:shadow-2xl transition-all overflow-hidden flex-shrink-0 w-[350px] sm:w-[400px] mx-2 sm:mx-3"
                    >
                      {/* Image */}
                      <div className="relative h-64 sm:h-72 overflow-hidden">
                        <img
                          src={topper.imageUrl}
                          alt="Trophy Ceremony"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Delete Button (Admin Mode) */}
                        {isAdminMode && index < toppers.length && (
                          <button
                            onClick={() => onDeleteTopper(topper.id)}
                            className="absolute top-3 right-3 p-2 bg-red-500 text-white hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 z-20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
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

        {toppers.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <Trophy className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
            <p className="text-gray-500 text-base sm:text-lg">No photos added yet</p>
          </div>
        )}
      </div>
    </section>
  );
}