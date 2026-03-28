import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Users, BookOpen, Trophy, Star, TrendingUp, Award } from 'lucide-react';

export function StatsSection() {
  const [counts, setCounts] = useState({
    students: 0,
    courses: 0,
    toppers: 0,
    rating: 0,
    success: 0,
    years: 0
  });

  const stats = [
    {
      id: 'students',
      icon: Users,
      target: 4000,
      suffix: '+',
      label: 'Students',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'courses',
      icon: BookOpen,
      target: 10,
      suffix: '+',
      label: 'Expert Courses',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'toppers',
      icon: Trophy,
      target: 100,
      suffix: '+',
      label: 'Rankers',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 'rating',
      icon: Star,
      target: 4.9,
      suffix: '/5',
      label: 'Student Rating',
      gradient: 'from-yellow-400 to-orange-500',
      decimals: 1
    },
    {
      id: 'success',
      icon: TrendingUp,
      target: 95,
      suffix: '%',
      label: 'Success Rate',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'years',
      icon: Award,
      target: 15,
      suffix: '+',
      label: 'Years of Excellence',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const counters = stats.map(stat => {
      const increment = stat.target / steps;
      let current = 0;
      
      return setInterval(() => {
        current += increment;
        if (current >= stat.target) {
          current = stat.target;
          clearInterval(counters[stats.indexOf(stat)]);
        }
        setCounts(prev => ({
          ...prev,
          [stat.id]: stat.decimals ? Number(current.toFixed(stat.decimals)) : Math.floor(current)
        }));
      }, stepDuration);
    });

    return () => counters.forEach(clearInterval);
  }, []);

  return (
    <section id="stats" className="relative py-20 overflow-hidden">
      {/* Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 text-white"
        >
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
            Our Achievements
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Numbers That Speak Excellence
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Our track record speaks for itself. Join thousands of successful students.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                
                <div className="text-4xl font-bold text-white mb-2">
                  {counts[stat.id as keyof typeof counts]}{stat.suffix}
                </div>
                
                <div className="text-sm text-white/80">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-300/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
}