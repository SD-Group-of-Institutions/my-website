import { useState } from 'react';
import { motion } from 'motion/react';
import { Quote, Star, Plus, Trash2, X, Edit2 } from 'lucide-react';

export interface Testimonial {
  id: number;
  name: string;
  achievement: string;
  content: string;
  rating: number;
  initials: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  isAdminMode: boolean;
  onAddTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  onUpdateTestimonial: (id: number, testimonial: Omit<Testimonial, 'id'>) => void;
  onDeleteTestimonial: (id: number) => void;
}

export function TestimonialsSection({ testimonials, isAdminMode, onAddTestimonial, onUpdateTestimonial, onDeleteTestimonial }: TestimonialsSectionProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    achievement: '',
    content: '',
    rating: 5,
    initials: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onUpdateTestimonial(editingId, formData);
    } else {
      onAddTestimonial(formData);
    }
    setFormData({ name: '', achievement: '', content: '', rating: 5, initials: '' });
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      name: testimonial.name,
      achievement: testimonial.achievement,
      content: testimonial.content,
      rating: testimonial.rating,
      initials: testimonial.initials
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setFormData({ name: '', achievement: '', content: '', rating: 5, initials: '' });
    setShowAddForm(false);
    setEditingId(null);
  };

  const colors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500'
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold mb-4">
            Student Reviews
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from students who achieved their dreams with Sd Group of Institutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const gradient = colors[index % colors.length];
            
            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border border-gray-100"
              >
                {/* Quote Icon */}
                <div className={`absolute -top-4 left-8 w-12 h-12 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center shadow-lg`}>
                  <Quote className="h-6 w-6 text-white" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4 mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-600 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Profile */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className={`text-sm font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                      {testimonial.achievement}
                    </p>
                  </div>
                </div>

                {/* Admin Controls */}
                {isAdminMode && (
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteTestimonial(testimonial.id)}
                      className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Add Testimonial Form */}
          {isAdminMode && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: testimonials.length * 0.2, duration: 0.5 }}
              className="relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-8 border-2 border-dashed border-indigo-300"
            >
              {!showAddForm ? (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="w-full h-full flex flex-col items-center justify-center gap-4 text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Plus className="h-8 w-8" />
                  </div>
                  <p className="font-semibold text-lg">Add New Testimonial</p>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full p-2 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    {editingId ? 'Edit Testimonial' : 'New Testimonial'}
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                        placeholder="Student name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Achievement *</label>
                      <input
                        type="text"
                        required
                        value={formData.achievement}
                        onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                        placeholder="e.g., IIT Delhi, AIR 156"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Testimonial *</label>
                      <textarea
                        required
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
                        placeholder="Write the testimonial..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Rating *</label>
                        <select
                          required
                          value={formData.rating}
                          onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                        >
                          <option value={5}>5 Stars</option>
                          <option value={4}>4 Stars</option>
                          <option value={3}>3 Stars</option>
                          <option value={2}>2 Stars</option>
                          <option value={1}>1 Star</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Initials *</label>
                        <input
                          type="text"
                          required
                          maxLength={3}
                          value={formData.initials}
                          onChange={(e) => setFormData({ ...formData, initials: e.target.value.toUpperCase() })}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                          placeholder="e.g., AS"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                    >
                      {editingId ? <Edit2 className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                      {editingId ? 'Update Testimonial' : 'Add Testimonial'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}