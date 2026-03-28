import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, X, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface GalleryPhoto {
  id: number;
  url: string;
  alt: string;
}

interface GallerySectionProps {
  photos: GalleryPhoto[];
  onAddPhoto: (url: string) => void;
  onDeletePhoto: (id: number) => void;
  isAdminMode: boolean;
}

export function GallerySection({ photos, onAddPhoto, onDeletePhoto, isAdminMode }: GallerySectionProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [showAll, setShowAll] = useState(false);

  const handleAdd = () => {
    if (newPhotoUrl.trim()) {
      onAddPhoto(newPhotoUrl);
      setNewPhotoUrl('');
      setShowAddForm(false);
    }
  };

  // Show only first 5 photos initially, or all if showAll is true
  const displayPhotos = showAll ? photos : photos.slice(0, 5);
  const hasMorePhotos = photos.length > 5;

  return (
    <>
      <section id="gallery" className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold mb-4">
              Our Campus
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Life at Sd Group of Institutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Glimpses of our state-of-the-art facilities and vibrant learning environment
            </p>
          </motion.div>

          {isAdminMode && (
            <div className="flex justify-center mb-8">
              <motion.button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="h-5 w-5" />
                Add Photo
              </motion.button>
            </div>
          )}

          {/* Add Form */}
          {isAdminMode && showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white rounded-2xl p-6 mb-8 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Photo</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Photo URL"
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleAdd}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          {/* Gallery Collage - 5 Photos */}
          {displayPhotos.length > 0 && (
            <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-8" style={{ height: '600px' }}>
              {/* Photo 1 - Large (2 cols, 2 rows) */}
              {displayPhotos[0] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0 }}
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                  className="relative group cursor-pointer col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                  onClick={() => setSelectedPhoto(displayPhotos[0])}
                >
                  <ImageWithFallback
                    src={displayPhotos[0].url}
                    alt={displayPhotos[0].alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {isAdminMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePhoto(displayPhotos[0].id);
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 z-10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </motion.div>
              )}

              {/* Photo 2 - Medium (2 cols, 1 row) */}
              {displayPhotos[1] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                  className="relative group cursor-pointer col-span-2 row-span-1 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                  onClick={() => setSelectedPhoto(displayPhotos[1])}
                >
                  <ImageWithFallback
                    src={displayPhotos[1].url}
                    alt={displayPhotos[1].alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {isAdminMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePhoto(displayPhotos[1].id);
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 z-10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </motion.div>
              )}

              {/* Photo 3 - Small (1 col, 1 row) */}
              {displayPhotos[2] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                  className="relative group cursor-pointer col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                  onClick={() => setSelectedPhoto(displayPhotos[2])}
                >
                  <ImageWithFallback
                    src={displayPhotos[2].url}
                    alt={displayPhotos[2].alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {isAdminMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePhoto(displayPhotos[2].id);
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 z-10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </motion.div>
              )}

              {/* Photo 4 - Small (1 col, 1 row) */}
              {displayPhotos[3] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                  className="relative group cursor-pointer col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                  onClick={() => setSelectedPhoto(displayPhotos[3])}
                >
                  <ImageWithFallback
                    src={displayPhotos[3].url}
                    alt={displayPhotos[3].alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {isAdminMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePhoto(displayPhotos[3].id);
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 z-10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </motion.div>
              )}

              {/* Photo 5 - Small (1 col, 1 row) */}
              {displayPhotos[4] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                  className="relative group cursor-pointer col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                  onClick={() => setSelectedPhoto(displayPhotos[4])}
                >
                  <ImageWithFallback
                    src={displayPhotos[4].url}
                    alt={displayPhotos[4].alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {isAdminMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePhoto(displayPhotos[4].id);
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 z-10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </motion.div>
              )}
            </div>
          )}

          {/* Additional Photos Grid (shown when "Show More" is clicked) */}
          <AnimatePresence>
            {showAll && photos.length > 5 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8"
              >
                {photos.slice(5).map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    className="relative group cursor-pointer aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <ImageWithFallback
                      src={photo.url}
                      alt={photo.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {isAdminMode && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeletePhoto(photo.id);
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 z-10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show More/Show Less Button */}
          {hasMorePhotos && (
            <div className="flex justify-center">
              <motion.button
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showAll ? 'Show Less' : `Show More (${photos.length - 5} more photos)`}
                <ChevronDown className={`h-5 w-5 transition-transform ${showAll ? 'rotate-180' : ''}`} />
              </motion.button>
            </div>
          )}

          {photos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No photos in gallery yet</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="h-6 w-6" />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={selectedPhoto.url}
                alt={selectedPhoto.alt}
                className="w-full h-full object-contain rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}