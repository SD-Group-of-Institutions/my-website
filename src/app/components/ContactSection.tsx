import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Inbox, Trash2 } from 'lucide-react';
import { InteractiveMap } from './InteractiveMap';

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
  timestamp: string;
}

interface ContactSectionProps {
  submissions: ContactSubmission[];
  onSubmit: (submission: Omit<ContactSubmission, 'id' | 'timestamp'>) => void;
  onDelete: (id: number) => void;
  isAdminMode: boolean;
}

export function ContactSection({ submissions, onSubmit, onDelete, isAdminMode }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save the submission
    onSubmit(formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', course: '', message: '' });
    }, 3000);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    setDeletingId(id);
    try {
      await onDelete(id);
    } catch (error) {
      console.error('Error deleting submission:', error);
      alert('Failed to delete submission. Check console for details.');
    } finally {
      setDeletingId(null);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      details: [
        { text: '+91 94191-24153', link: 'tel:+919419124153' },
        { text: '+91 7006071996', link: 'tel:+917006071996' }
      ],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [
        { text: 'contact@sdgi.in', link: 'mailto:contact@sdgi.in' }
      ],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: [
        { text: '107-C, Shastri Nagar, Opp Bank', link: null },
        { text: 'Jammu, Jammu and Kashmir 180004', link: null }
      ],
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: [
        { text: 'Mon - Sat: 8:00 AM - 8:00 PM', link: null },
        { text: 'Sunday: Closed', link: null }
      ],
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1E3A8A] text-white text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Start Your Success Journey Today
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Have questions? We're here to help. Reach out to us and let's discuss your academic goals.
          </p>
        </motion.div>

        {/* Admin Submissions View */}
        {isAdminMode && (
          <div className="mb-6 sm:mb-8">
            <button
              onClick={() => setShowSubmissions(!showSubmissions)}
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-[#1E3A8A] text-white font-semibold hover:bg-[#1E40AF] transition-colors w-full sm:w-auto justify-center"
            >
              <Inbox className="h-4 w-4 sm:h-5 sm:w-5" />
              View Contact Submissions ({submissions.length})
            </button>
            
            {showSubmissions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 bg-white border-2 border-[#1E3A8A] p-4 sm:p-6 overflow-auto max-h-96"
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Contact Form Submissions</h3>
                {submissions.length === 0 ? (
                  <p className="text-gray-500 text-center py-8 text-sm sm:text-base">No submissions yet</p>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {submissions.map((submission) => (
                      <div key={submission.id} className="border-2 border-gray-200 p-3 sm:p-4 hover:border-[#1E3A8A] transition-colors">
                        <div className="flex justify-between items-start mb-2 sm:mb-3">
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm sm:text-base">{submission.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-500">
                              {new Date(submission.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDelete(submission.id)}
                            className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-xs sm:text-sm mb-2">
                          <div>
                            <span className="font-semibold">Email:</span> {submission.email}
                          </div>
                          <div>
                            <span className="font-semibold">Phone:</span> {submission.phone}
                          </div>
                          <div className="sm:col-span-2">
                            <span className="font-semibold">Course:</span> {submission.course}
                          </div>
                        </div>
                        {submission.message && (
                          <div className="text-xs sm:text-sm bg-gray-50 p-2 sm:p-3 mt-2">
                            <span className="font-semibold">Message:</span> {submission.message}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-4 sm:space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="bg-white border-2 border-[#1E3A8A] p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1E3A8A] flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm sm:text-base text-gray-600">
                          {detail.link ? (
                            <a href={detail.link} className="text-blue-500 hover:underline">
                              {detail.text}
                            </a>
                          ) : (
                            detail.text
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Interactive Map */}
            <InteractiveMap />
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border-2 border-[#1E3A8A] p-6 sm:p-8 shadow-xl"
          >
            {!submitted ? (
              <>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Send us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 focus:border-[#1E3A8A] transition-all outline-none"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 focus:border-[#1E3A8A] transition-all outline-none"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 focus:border-[#1E3A8A] transition-all outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Course Interested In *
                    </label>
                    <select
                      required
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 focus:border-[#1E3A8A] transition-all outline-none"
                    >
                      <option value="">Select a course</option>
                      <option value="class-8-10">Class 8-10</option>
                      <option value="class-11-12">Class 11-12</option>
                      <option value="jee-prep">JEE Prep</option>
                      <option value="neet">NEET</option>
                      <option value="nda">NDA Prep</option>
                      <option value="foundation">Foundation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 focus:border-[#1E3A8A] transition-all resize-none outline-none"
                      placeholder="Tell us about your goals and requirements..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#1E3A8A] text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold shadow-lg hover:bg-[#1E40AF] transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                    Send Message
                  </motion.button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8 sm:py-12"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Thank you for reaching out. We'll get back to you soon!
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}