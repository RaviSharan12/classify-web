import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;
      
      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  
  return count;
}

interface LandingPageProps {
  onLogin: (userType: 'teacher' | 'student') => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Animated counters
  const ratingCount = useAnimatedCounter(showStats ? 49 : 0, 2000);
  const schoolCount = useAnimatedCounter(showStats ? 2500 : 0, 2500);
  const studentCount = useAnimatedCounter(showStats ? 120 : 0, 3000);
  const successRate = useAnimatedCounter(showStats ? 98 : 0, 2000);

  const motivationalQuotes = [
    {
      text: "Education is the most powerful weapon which you can use to change the world.",
      author: "Nelson Mandela",
      icon: "🌍"
    },
    {
      text: "The beautiful thing about learning is that no one can take it away from you.",
      author: "B.B. King",
      icon: "✨"
    },
    {
      text: "Education is not preparation for life; education is life itself.",
      author: "John Dewey",
      icon: "🎓"
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      icon: "🚀"
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 4000);
    
    // Show stats after initial load
    const statsTimer = setTimeout(() => {
      setShowStats(true);
    }, 2000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(statsTimer);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* 3D Animated Background */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-lg backdrop-blur-sm border border-white/10"
        />
        
        <motion.div
          animate={{ 
            y: [0, 40, 0],
            rotate: [0, -180, -360],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-40 right-32 w-20 h-20 bg-gradient-to-br from-purple-400/30 to-pink-500/30 rounded-full backdrop-blur-sm border border-white/10"
        />
        
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            x: [0, 20, 0],
            rotate: [0, 90, 180]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-40 left-40 w-12 h-12 bg-gradient-to-br from-emerald-400/30 to-teal-500/30 rotate-45 backdrop-blur-sm border border-white/10"
        />
        
        <motion.div
          animate={{ 
            y: [0, -50, 0],
            rotate: [0, 270, 540],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-orange-400/30 to-red-500/30 rounded-xl backdrop-blur-sm border border-white/10"
        />

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
            className="absolute w-2 h-2 bg-white/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-3xl shadow-2xl shadow-blue-500/25 border border-white/20 backdrop-blur-sm mb-6">
              <motion.span 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-4xl text-white"
              >
                🎓
              </motion.span>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-6xl font-bold text-white mb-2"
            >
              Classify<span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text"></span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="text-xl text-blue-200"
            >
              Smart Curriculum & Attendance Platform
            </motion.p>
          </motion.div>

          {/* Motivational Quotes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="mb-12"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-center mb-4">
                      <motion.span 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-4xl"
                      >
                        {motivationalQuotes[currentQuote].icon}
                      </motion.span>
                    </div>
                    <blockquote className="text-xl text-white font-medium mb-4 leading-relaxed">
                      "{motivationalQuotes[currentQuote].text}"
                    </blockquote>
                    <cite className="text-cyan-300 font-medium">
                      — {motivationalQuotes[currentQuote].author}
                    </cite>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Login Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => onLogin('teacher')}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 text-white border-0 rounded-2xl px-12 py-6 text-lg font-semibold shadow-2xl shadow-blue-500/25 transform transition-all duration-300"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative flex items-center gap-3">
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-2xl"
                  >
                    👨‍🏫
                  </motion.span>
                  <span>Login as Teacher</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => onLogin('student')}
                className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-800 text-white border-0 rounded-2xl px-12 py-6 text-lg font-semibold shadow-2xl shadow-emerald-500/25 transform transition-all duration-300"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative flex items-center gap-3">
                  <motion.span
                    animate={{ rotate: [0, -15, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="text-2xl"
                  >
                    👨‍🎓
                  </motion.span>
                  <span>Login as Student</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  >
                    →
                  </motion.span>
                </div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Statistics Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="mt-16 mb-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: '⭐',
                  value: `${(ratingCount / 10).toFixed(1)}`,
                  label: 'App Rating',
                  subtitle: 'Based on 50K+ reviews',
                  color: 'from-yellow-400 to-orange-500'
                },
                {
                  icon: '🏫',
                  value: `${schoolCount.toLocaleString()}+`,
                  label: 'Schools Connected',
                  subtitle: 'Across 15 countries',
                  color: 'from-blue-400 to-purple-500'
                },
                {
                  icon: '👨‍🎓',
                  value: `${(studentCount / 100).toFixed(1)}M+`,
                  label: 'Active Students',
                  subtitle: 'Learning daily',
                  color: 'from-emerald-400 to-teal-500'
                },
                {
                  icon: '📚',
                  value: `${successRate}%`,
                  label: 'Success Rate',
                  subtitle: 'Student improvement',
                  color: 'from-pink-400 to-rose-500'
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center"
                >
                  <Card className="bg-white/15 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
                    <CardContent className="p-0">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      >
                        <span className="text-2xl text-white">{stat.icon}</span>
                      </motion.div>
                      
                      <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                        {stat.value}
                      </div>
                      
                      <div className="text-white font-semibold mb-1">
                        {stat.label}
                      </div>
                      
                      <div className="text-blue-200/70 text-sm">
                        {stat.subtitle}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {[
              {
                text: "Classify transformed our classroom experience. Students are more engaged than ever!",
                author: "Dr. Sarah Wilson",
                role: "Principal, Lincoln High School",
                rating: 5
              },
              {
                text: "The AI mentor feature helped me improve my grades by 40%. It's like having a personal tutor 24/7.",
                author: "Alex Chen",
                role: "Grade 11 Student",
                rating: 5
              },
              {
                text: "Best educational platform we've implemented. The analytics help us track student progress effectively.",
                author: "Prof. Michael Davis",
                role: "Stanford University",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, rotateY: -10 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: 2.8 + index * 0.2 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="perspective-1000"
              >
                <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl p-6 h-full">
                  <CardContent className="p-0">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 3 + index * 0.2 + i * 0.1 }}
                          className="text-yellow-400 text-lg"
                        >
                          ⭐
                        </motion.span>
                      ))}
                    </div>
                    
                    <blockquote className="text-white/90 text-sm leading-relaxed mb-4">
                      "{testimonial.text}"
                    </blockquote>
                    
                    <div className="border-t border-white/20 pt-4">
                      <div className="font-semibold text-white text-sm">
                        {testimonial.author}
                      </div>
                      <div className="text-blue-300/70 text-xs">
                        {testimonial.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Trusted by section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2 }}
            className="mt-16 text-center"
          >
            <p className="text-blue-300/70 text-sm mb-6">Trusted by leading educational institutions worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {[
                'Harvard University', 'MIT', 'Stanford', 'Oxford', 'Cambridge', 'IIT Delhi'
              ].map((institution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, opacity: 1 }}
                  className="text-white/60 hover:text-white transition-all duration-300 text-sm font-medium cursor-pointer"
                >
                  {institution}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.8 }}
            className="mt-12 text-blue-300/70 text-sm"
          >
            Experience the future of education with AI-powered learning, immersive AR/VR, and gamified progress tracking
          </motion.p>
        </motion.div>
      </div>

      {/* Quote indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2"
      >
        {motivationalQuotes.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentQuote(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentQuote 
                ? 'bg-white shadow-lg shadow-white/50' 
                : 'bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </motion.div>
    </div>
  );
}