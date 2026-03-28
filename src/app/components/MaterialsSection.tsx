import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Download, ExternalLink, Trash2, Plus, Search, Filter, Edit2 } from 'lucide-react';

export interface StudyMaterial {
  id: number;
  title: string;
  description: string;
  category: string;
  subject: string;
  link: string;
}

interface MaterialsSectionProps {
  materials: StudyMaterial[];
  onAddMaterial: (material: Omit<StudyMaterial, 'id'>) => void;
  onUpdateMaterial: (id: number, material: Omit<StudyMaterial, 'id'>) => void;
  onDeleteMaterial: (id: number) => void;
  isAdminMode: boolean;
}

export function MaterialsSection({ materials, onAddMaterial, onUpdateMaterial, onDeleteMaterial, isAdminMode }: MaterialsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    description: '',
    category: '',
    subject: '',
    link: ''
  });

  const categories = ['All', ...Array.from(new Set(materials.map(m => m.category)))];
  
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || material.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAdd = () => {
    if (newMaterial.title && newMaterial.description) {
      onAddMaterial(newMaterial);
      setNewMaterial({ title: '', description: '', category: '', subject: '', link: '' });
      setShowAddForm(false);
    }
  };

  const handleEdit = (material: StudyMaterial) => {
    setEditingId(material.id);
    setNewMaterial({
      title: material.title,
      description: material.description,
      category: material.category,
      subject: material.subject,
      link: material.link
    });
    setShowAddForm(true);
  };

  const handleUpdate = () => {
    if (editingId && newMaterial.title && newMaterial.description) {
      onUpdateMaterial(editingId, newMaterial);
      setNewMaterial({ title: '', description: '', category: '', subject: '', link: '' });
      setShowAddForm(false);
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setNewMaterial({ title: '', description: '', category: '', subject: '', link: '' });
    setShowAddForm(false);
    setEditingId(null);
  };

  const subjectColors: Record<string, string> = {
    Physics: 'from-blue-500 to-cyan-500',
    Chemistry: 'from-purple-500 to-pink-500',
    Biology: 'from-green-500 to-emerald-500',
    Mathematics: 'from-orange-500 to-red-500',
    English: 'from-indigo-500 to-purple-500'
  };

  return (
    <section id="materials" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1E3A8A] text-white text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            Study Resources
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Free Learning Resources
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Access our comprehensive collection of study materials, notes, and practice papers
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 focus:border-[#1E3A8A] outline-none transition-colors"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium whitespace-nowrap transition-all ${
                  filterCategory === category
                    ? 'bg-[#1E3A8A] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {isAdminMode && (
            <motion.button
              onClick={() => {
                setShowAddForm(!showAddForm);
                setEditingId(null);
                setNewMaterial({ title: '', description: '', category: '', subject: '', link: '' });
              }}
              className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-green-600 text-white font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              Add Material
            </motion.button>
          )}
        </div>

        {/* Add/Edit Form */}
        {isAdminMode && showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#F5F1E8] border-2 border-[#1E3A8A] p-4 sm:p-6 mb-6 sm:mb-8"
          >
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
              {editingId ? 'Edit Material' : 'Add New Material'}
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Title"
                value={newMaterial.title}
                onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 focus:border-[#1E3A8A] outline-none"
              />
              <input
                type="text"
                placeholder="Subject"
                value={newMaterial.subject}
                onChange={(e) => setNewMaterial({ ...newMaterial, subject: e.target.value })}
                className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 focus:border-[#1E3A8A] outline-none"
              />
              <input
                type="text"
                placeholder="Category (e.g., Class 11, JEE)"
                value={newMaterial.category}
                onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value })}
                className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 focus:border-[#1E3A8A] outline-none"
              />
              <input
                type="text"
                placeholder="Link URL"
                value={newMaterial.link}
                onChange={(e) => setNewMaterial({ ...newMaterial, link: e.target.value })}
                className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 focus:border-[#1E3A8A] outline-none"
              />
              <textarea
                placeholder="Description"
                value={newMaterial.description}
                onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                className="sm:col-span-2 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 focus:border-[#1E3A8A] outline-none min-h-[100px]"
              />
            </div>
            <div className="flex gap-2 mt-3 sm:mt-4">
              <button
                onClick={editingId ? handleUpdate : handleAdd}
                className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-[#1E3A8A] text-white font-medium hover:bg-[#1E40AF]"
              >
                {editingId ? 'Update Material' : 'Add Material'}
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

        {/* Materials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredMaterials.map((material, index) => {
            const gradient = subjectColors[material.subject] || 'from-gray-500 to-gray-600';
            
            return (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-white border-2 border-gray-200 hover:border-[#1E3A8A] overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className={`h-2 sm:h-3 bg-gradient-to-r ${gradient}`} />
                
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 sm:p-3 bg-gradient-to-br ${gradient}`}>
                      <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    {isAdminMode && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(material)}
                          className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Edit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                        <button
                          onClick={() => onDeleteMaterial(material.id)}
                          className="p-1.5 sm:p-2 text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mb-2 sm:mb-3">
                    <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-700 text-xs font-semibold">
                      {material.category}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-[#1E3A8A] transition-colors">
                    {material.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                    {material.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className={`text-xs sm:text-sm font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                      {material.subject}
                    </span>
                    <a
                      href={material.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-[#F5F1E8] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white transition-colors group"
                    >
                      <Download className="h-3 w-3 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Download</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
            <p className="text-gray-500 text-base sm:text-lg">No materials found matching your criteria</p>
          </div>
        )}
      </div>
    </section>
  );
}