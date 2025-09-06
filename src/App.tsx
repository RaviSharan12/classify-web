import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { TeacherDashboard } from './components/TeacherDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { UserProfile } from './components/UserProfile';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { DashboardCards } from './components/DashboardCards';
import { GamificationSidebar } from './components/GamificationSidebar';
import { ConsultationBooking } from './components/ConsultationBooking';
import { AIMentorChat, AIMentorButton } from './components/AIMentorChat';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { AttendanceClassroom } from './components/AttendanceClassroom';
import { ARVRModule } from './components/ARVRModule';
import { LifeSkillsTracker } from './components/LifeSkillsTracker';
import { PeerLearning } from './components/PeerLearning';
import { Footer } from './components/Footer';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'teacher' | 'student' | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'profile' | string>('dashboard');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAIMentorOpen, setIsAIMentorOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  // Check for saved theme preference or default to system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogin = (type: 'teacher' | 'student') => {
    setUserType(type);
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setCurrentView('dashboard');
  };

  const handleFeatureSelect = (feature: string) => {
    setCurrentView(feature);
  };

  // If not logged in, show landing page
  if (!isLoggedIn) {
    return <LandingPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Enhanced Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-xl text-white">🎓</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Classify
                </h1>
                <p className="text-xs text-foreground/60">
                  {userType === 'teacher' ? 'Teacher Portal' : 'Student Portal'}
                </p>
              </div>
            </motion.div>

            {/* Navigation Items */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentView === 'dashboard'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                }`}
              >
                🏠 Dashboard
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView('profile')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentView === 'profile'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                }`}
              >
                👤 Profile
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                {darkMode ? '☀️' : '🌙'}
              </motion.button>

              {/* Logout */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg font-medium transition-all"
              >
                🚪 Logout
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>
      
      {/* Main Content */}
      <main className="pt-16">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && userType && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              {userType === 'teacher' ? (
                <TeacherDashboard onFeatureSelect={handleFeatureSelect} />
              ) : (
                <StudentDashboard onFeatureSelect={handleFeatureSelect} />
              )}
            </motion.div>
          )}

          {currentView === 'profile' && userType && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <UserProfile 
                userType={userType} 
                darkMode={darkMode} 
                onToggleDarkMode={toggleDarkMode} 
              />
            </motion.div>
          )}

          {/* Feature Views */}
          {currentView === 'attendance' && (
            <motion.div
              key="attendance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="pt-8"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Button 
                  onClick={() => setCurrentView('dashboard')}
                  className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  ← Back to Dashboard
                </Button>
                <AttendanceClassroom />
              </div>
            </motion.div>
          )}

          {currentView === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="pt-8"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Button 
                  onClick={() => setCurrentView('dashboard')}
                  className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  ← Back to Dashboard
                </Button>
                <AnalyticsDashboard />
              </div>
            </motion.div>
          )}

          {currentView === 'consultation' && (
            <motion.div
              key="consultation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="pt-8"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Button 
                  onClick={() => setCurrentView('dashboard')}
                  className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  ← Back to Dashboard
                </Button>
                <ConsultationBooking />
              </div>
            </motion.div>
          )}

          {currentView === 'arvr' && (
            <motion.div
              key="arvr"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="pt-8"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Button 
                  onClick={() => setCurrentView('dashboard')}
                  className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  ← Back to Dashboard
                </Button>
                <ARVRModule />
              </div>
            </motion.div>
          )}

          {currentView === 'lifeskills' && (
            <motion.div
              key="lifeskills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="pt-8"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Button 
                  onClick={() => setCurrentView('dashboard')}
                  className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  ← Back to Dashboard
                </Button>
                <LifeSkillsTracker />
              </div>
            </motion.div>
          )}

          {(currentView === 'peer-learning' || currentView === 'peer') && (
            <motion.div
              key="peer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="pt-8"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Button 
                  onClick={() => setCurrentView('dashboard')}
                  className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  ← Back to Dashboard
                </Button>
                <PeerLearning />
              </div>
            </motion.div>
          )}

          {(currentView === 'ai-mentor' || currentView === 'gamification' || currentView === 'daily-challenge' || currentView === 'timetable' || currentView === 'insights') && (
            <motion.div
              key="feature"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="pt-8"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Button 
                  onClick={() => setCurrentView('dashboard')}
                  className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  ← Back to Dashboard
                </Button>
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🚀</div>
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Feature Coming Soon
                  </h2>
                  <p className="text-foreground/70 max-w-2xl mx-auto">
                    This feature is being developed and will be available soon. 
                    {currentView === 'ai-mentor' && ' The AI Mentor is accessible via the floating chat button on any page.'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* Floating AI Mentor Chat Button */}
      {currentView !== 'profile' && (
        <div className="fixed bottom-6 right-6 z-40">
          <AIMentorButton onClick={() => setIsAIMentorOpen(true)} />
        </div>
      )}

      {/* AI Mentor Chat */}
      <AIMentorChat 
        isOpen={isAIMentorOpen} 
        onClose={() => setIsAIMentorOpen(false)} 
      />
    </div>
  );
}