import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

export function ARVRModule() {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const arExperiences = [
    {
      id: 'solar-system',
      title: '🪐 Solar System Explorer',
      description: 'Explore planets and moons in 3D space with interactive information',
      subject: 'Astronomy',
      difficulty: 'Beginner',
      duration: '15 min',
      participants: '1-30 students',
      features: ['3D Models', 'Voice Narration', 'Interactive Quiz']
    },
    {
      id: 'human-anatomy',
      title: '🫀 Human Anatomy VR',
      description: 'Take a virtual journey through the human body systems',
      subject: 'Biology',
      difficulty: 'Intermediate',
      duration: '25 min',
      participants: '1-20 students',
      features: ['Realistic Models', 'System Breakdown', 'Guided Tour']
    },
    {
      id: 'chemistry-lab',
      title: '⚗️ Virtual Chemistry Lab',
      description: 'Conduct safe chemistry experiments in a virtual environment',
      subject: 'Chemistry',
      difficulty: 'Advanced',
      duration: '30 min',
      participants: '1-15 students',
      features: ['Safe Experiments', 'Real Reactions', 'Lab Equipment']
    },
    {
      id: 'historical-sites',
      title: '🏛️ Ancient Civilizations',
      description: 'Walk through ancient Rome, Egypt, and Greece in immersive VR',
      subject: 'History',
      difficulty: 'Beginner',
      duration: '20 min',
      participants: '1-25 students',
      features: ['Time Travel', 'Historical Accuracy', 'Interactive NPCs']
    },
    {
      id: 'math-geometry',
      title: '📐 3D Geometry Visualization',
      description: 'Manipulate geometric shapes and understand spatial relationships',
      subject: 'Mathematics',
      difficulty: 'Intermediate',
      duration: '15 min',
      participants: '1-30 students',
      features: ['3D Manipulation', 'Formula Visualization', 'Problem Solving']
    },
    {
      id: 'physics-simulation',
      title: '⚡ Physics Playground',
      description: 'Experiment with gravity, magnetism, and forces in real-time',
      subject: 'Physics',
      difficulty: 'Advanced',
      duration: '35 min',
      participants: '1-20 students',
      features: ['Real Physics', 'Interactive Experiments', 'Data Collection']
    }
  ];

  const startARDemo = (experienceId: string) => {
    setSelectedDemo(experienceId);
    setIsLoading(true);
    
    // Simulate AR/VR initialization
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, this would launch the AR/VR experience
      alert(`🚀 Launching ${arExperiences.find(exp => exp.id === experienceId)?.title}!\n\nIn a real implementation, this would:\n• Initialize AR/VR session\n• Load 3D models\n• Start the immersive experience\n• Track student interactions`);
      setSelectedDemo(null);
    }, 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          AR/VR Learning Experiences
        </h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Immerse yourself in interactive 3D learning environments that make complex concepts come alive
        </p>
      </div>

      {/* AR/VR Status Panel */}
      <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl">
                🥽
              </div>
              <div>
                <h3 className="text-lg font-semibold">AR/VR System Status</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-foreground/70">All systems operational</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-purple-600">12</div>
                <div className="text-xs text-foreground/70">VR Headsets</div>
              </div>
              <div>
                <div className="text-xl font-bold text-pink-600">24</div>
                <div className="text-xs text-foreground/70">AR Tablets</div>
              </div>
              <div>
                <div className="text-xl font-bold text-blue-600">98%</div>
                <div className="text-xs text-foreground/70">Uptime</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && selectedDemo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <Card className="w-full max-w-md bg-white/95 dark:bg-black/95 backdrop-blur-xl">
            <CardContent className="p-8 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl"
              >
                🥽
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">Initializing AR/VR Experience</h3>
              <p className="text-sm text-foreground/70 mb-4">
                {arExperiences.find(exp => exp.id === selectedDemo)?.title}
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full"
                />
              </div>
              <p className="text-xs text-foreground/60 mt-2">Loading 3D models and environments...</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* AR/VR Experiences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {arExperiences.map((experience) => (
          <motion.div
            key={experience.id}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="h-full border-2 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 bg-gradient-to-br from-white to-purple-50/30 dark:from-black dark:to-purple-950/30 hover:shadow-2xl hover:shadow-purple-500/20">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg leading-tight">{experience.title}</CardTitle>
                  <Badge className={getDifficultyColor(experience.difficulty)}>
                    {experience.difficulty}
                  </Badge>
                </div>
                <Badge variant="outline" className="w-fit text-xs">
                  {experience.subject}
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {experience.description}
                </p>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span>⏱️</span>
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>👥</span>
                    <span>{experience.participants}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground/80">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {experience.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button
                    onClick={() => startARDemo(experience.id)}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <span className="mr-2 group-hover:scale-110 transition-transform">🚀</span>
                    Enter AR Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-purple-600 mb-1">89%</div>
            <div className="text-sm text-foreground/70">Engagement Rate</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-2xl font-bold text-blue-600 mb-1">+34%</div>
            <div className="text-sm text-foreground/70">Learning Retention</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-green-600 mb-1">4.8</div>
            <div className="text-sm text-foreground/70">Student Rating</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-orange-600 mb-1">156</div>
            <div className="text-sm text-foreground/70">Experiences Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon Section */}
      <Card className="border-2 border-dashed border-purple-300 dark:border-purple-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-600">
            <span className="text-xl">🔮</span>
            Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20">
              <h4 className="font-medium mb-2">🌍 Geography Explorer</h4>
              <p className="text-sm text-foreground/70">Virtual field trips to any location on Earth</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20">
              <h4 className="font-medium mb-2">🎨 Art Studio VR</h4>
              <p className="text-sm text-foreground/70">Create and sculpt in virtual 3D space</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20">
              <h4 className="font-medium mb-2">🗣️ Language Immersion</h4>
              <p className="text-sm text-foreground/70">Practice languages with AI native speakers</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20">
              <h4 className="font-medium mb-2">🤖 Coding Playground</h4>
              <p className="text-sm text-foreground/70">Program robots and see code come to life</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}