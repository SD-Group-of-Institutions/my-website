import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Target, Award, CheckCircle2 } from 'lucide-react';

interface ProgramsSectionProps {
  isAdminMode: boolean;
}

export function ProgramsSection({ isAdminMode }: ProgramsSectionProps) {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const programs = [
    {
      id: 'class-8-10',
      title: 'Class 8-10',
      icon: BookOpen,
      description: 'Strong foundation building for CBSE and State Board students with focus on conceptual clarity',
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        'All subjects covered',
        'Regular tests & assessments',
        'Board exam preparation',
        'Conceptual clarity focus',
        'Doubt clearing sessions',
        'Study material provided'
      ]
    },
    {
      id: 'class-11-12',
      title: 'Class 11-12',
      icon: Target,
      description: 'Advanced learning with dual preparation for Board exams and competitive entrance tests',
      gradient: 'from-purple-500 to-pink-500',
      features: [
        'PCM & PCB streams',
        'Board + competitive prep',
        'Doubt clearing sessions',
        'Advanced problem solving',
        'Regular mock tests',
        'Performance analysis'
      ]
    },
    {
      id: 'jee-prep',
      title: 'JEE Prep',
      icon: GraduationCap,
      description: 'Comprehensive coaching for JEE (Mains & Advanced) with expert faculty and proven methodology',
      gradient: 'from-orange-500 to-red-500',
      features: [
        'Complete syllabus coverage',
        'Mock tests & analysis',
        'Problem-solving techniques',
        'Time management skills',
        'Previous year papers',
        'Expert mentorship'
      ]
    },
    {
      id: 'neet',
      title: 'NEET',
      icon: Target,
      description: 'Complete NEET preparation with medical entrance specialists and comprehensive study material',
      gradient: 'from-teal-500 to-blue-500',
      features: [
        'Biology focus',
        'Clinical approach',
        'AIIMS preparation',
        'Medical terminology',
        'Mock tests',
        'Previous year analysis'
      ]
    },
    {
      id: 'nda',
      title: 'NDA Prep',
      icon: Award,
      description: 'Specialized training for National Defence Academy entrance with focus on written exam',
      gradient: 'from-red-600 to-orange-600',
      features: [
        'Mathematics mastery',
        'GAT preparation',
        'Previous year analysis'
      ]
    },
    {
      id: 'foundation',
      title: 'Foundation',
      icon: BookOpen,
      description: 'Early start program for students in classes 6-8 to build strong fundamentals for future success',
      gradient: 'from-indigo-500 to-purple-500',
      features: [
        'Concept building',
        'Mental aptitude',
        'Logical reasoning',
        'Early preparation',
        'Fun learning',
        'Scholarship tests'
      ]
    }
  ];

  return (
    <section id="mission" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold mb-4">
            Our Programs
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Path to Success
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive coaching programs designed to excel in academics and competitive examinations
          </p>
          <p className="text-sm text-indigo-600 mt-4 font-medium">
            ✨ Click any card to explore the program details
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            const isFlipped = flippedCard === program.id;

            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                style={{ perspective: '1000px' }}
                className="h-[400px] cursor-pointer"
                onClick={() => setFlippedCard(isFlipped ? null : program.id)}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative w-full h-full"
                >
                  {/* Front of Card */}
                  <div
                    className="absolute inset-0 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-8"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${program.gradient} flex items-center justify-center mb-6`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {program.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {program.description}
                    </p>

                    <div className={`inline-flex items-center text-sm font-semibold bg-gradient-to-r ${program.gradient} bg-clip-text text-transparent`}>
                      Click to see features →
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${program.gradient} rounded-2xl shadow-lg p-8 text-white`}
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <h3 className="text-2xl font-bold mb-6">What We Offer</h3>
                    
                    <ul className="space-y-3">
                      {program.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: isFlipped ? idx * 0.1 : 0 }}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="absolute bottom-8 left-8 text-sm opacity-80">
                      Click to go back →
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}