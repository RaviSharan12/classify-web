import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface TeacherDashboardProps {
  onFeatureSelect: (feature: string) => void;
}

export function TeacherDashboard({ onFeatureSelect }: TeacherDashboardProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const teacherFeatures = [
    {
      id: 'attendance',
      title: 'Attendance Tracking',
      description: 'Monitor student attendance with QR codes, face recognition, and real-time classroom visualization',
      icon: '🎭',
      gradient: 'from-blue-500 via-purple-500 to-indigo-600',
      hoverGradient: 'from-blue-600 via-purple-600 to-indigo-700',
      stats: { present: 28, total: 32, percentage: 87.5 },
      features: ['QR Code Scanning', 'Face Recognition', '3D Classroom View', 'Automated Reports']
    },
    {
      id: 'consultation',
      title: 'Consultation Booking',
      description: 'Schedule and manage student consultations, office hours, and academic support sessions',
      icon: '🧠',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
      hoverGradient: 'from-emerald-600 via-teal-600 to-cyan-700',
      stats: { scheduled: 12, completed: 8, pending: 4 },
      features: ['Smart Scheduling', 'Video Calls', 'Session Notes', 'Follow-up Reminders']
    },
    {
      id: 'analytics',
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights into student performance, engagement patterns, and learning analytics',
      icon: '📊',
      gradient: 'from-orange-500 via-red-500 to-pink-600',
      hoverGradient: 'from-orange-600 via-red-600 to-pink-700',
      stats: { improved: 24, stable: 6, needsHelp: 2 },
      features: ['Performance Heatmaps', 'Engagement Metrics', 'Predictive Analytics', 'Custom Reports']
    },
    {
      id: 'arvr',
      title: 'AR/VR Module',
      description: 'Create and manage immersive learning experiences with augmented and virtual reality content',
      icon: '🥽',
      gradient: 'from-purple-500 via-pink-500 to-rose-600',
      hoverGradient: 'from-purple-600 via-pink-600 to-rose-700',
      stats: { modules: 15, active: 8, inDev: 3 },
      features: ['3D Models', 'Virtual Labs', 'AR Overlays', 'VR Simulations']
    },
    {
      id: 'insights',
      title: 'Student Progress Insights',
      description: 'AI-powered reports and recommendations for personalized student learning paths',
      icon: '🧬',
      gradient: 'from-violet-500 via-purple-500 to-indigo-600',
      hoverGradient: 'from-violet-600 via-purple-600 to-indigo-700',
      stats: { recommendations: 45, implemented: 32, success: 89 },
      features: ['AI Analysis', 'Learning Paths', 'Skill Gaps', 'Intervention Alerts']
    },
    {
      id: 'timetable',
      title: 'Smart Timetable',
      description: 'Intelligent scheduling system with conflict detection and optimization for better time management',
      icon: '⏰',
      gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
      hoverGradient: 'from-cyan-600 via-blue-600 to-indigo-700',
      stats: { classes: 18, conflicts: 0, efficiency: 94 },
      features: ['Auto Scheduling', 'Conflict Detection', 'Room Optimization', 'Calendar Sync']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl text-white">👨‍🏫</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Teacher Dashboard
              </h1>
              <p className="text-lg text-foreground/70">
                Manage your classes and empower student success
              </p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Active Classes', value: '6', icon: '📚', color: 'blue' },
              { label: 'Students', value: '142', icon: '👥', color: 'emerald' },
              { label: 'Avg. Attendance', value: '89%', icon: '✅', color: 'green' },
              { label: 'This Week', value: '24h', icon: '⏱️', color: 'purple' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/60 dark:bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{stat.icon}</span>
                  <div>
                    <div className={`text-2xl font-bold ${
                      stat.color === 'blue' ? 'text-blue-600' :
                      stat.color === 'emerald' ? 'text-emerald-600' :
                      stat.color === 'green' ? 'text-green-600' :
                      stat.color === 'purple' ? 'text-purple-600' :
                      'text-blue-600'
                    }`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-foreground/70">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feature Cards Grid - 2 per row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {teacherFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              onHoverStart={() => setHoveredCard(feature.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group cursor-pointer"
              onClick={() => onFeatureSelect(feature.id)}
            >
              <Card className="h-full bg-white/70 dark:bg-black/70 backdrop-blur-lg border border-white/30 dark:border-white/10 shadow-2xl overflow-hidden relative">
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  hoveredCard === feature.id ? feature.hoverGradient : feature.gradient
                } opacity-3 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Floating elements */}
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                  <motion.div
                    animate={{ 
                      rotate: hoveredCard === feature.id ? 360 : 0,
                      scale: hoveredCard === feature.id ? 1.2 : 1
                    }}
                    transition={{ duration: 2 }}
                    className="text-4xl"
                  >
                    {feature.icon}
                  </motion.div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                      >
                        <span className="text-2xl text-white">{feature.icon}</span>
                      </motion.div>
                      <div>
                        <CardTitle className="text-xl mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                          {feature.title}
                        </CardTitle>
                        <Badge 
                          variant="secondary" 
                          className={`bg-gradient-to-r ${feature.gradient} text-white border-0`}
                        >
                          Active
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-foreground/70 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(feature.stats).map(([key, value], idx) => (
                      <div key={idx} className="text-center">
                        <div className={`text-xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                          {typeof value === 'number' && key === 'percentage' ? `${value}%` : value}
                        </div>
                        <div className="text-xs text-foreground/60 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features List */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground/80">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {feature.features.map((feat, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                          className="flex items-center gap-2 text-sm text-foreground/70"
                        >
                          <div className={`w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full`} />
                          {feat}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className={`w-full bg-gradient-to-r ${feature.gradient} hover:${feature.hoverGradient} text-white border-0 rounded-xl py-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
                    >
                      <span className="mr-2">{feature.icon}</span>
                      Open {feature.title}
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="ml-2"
                      >
                        →
                      </motion.span>
                    </Button>
                  </motion.div>
                </CardContent>

                {/* Hover effect overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCard === feature.id ? 0.02 : 0 }}
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} pointer-events-none`}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-6 bg-white/60 dark:bg-black/60 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>⚡</span>
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Take Attendance', icon: '✅', action: 'attendance' },
              { label: 'View Analytics', icon: '📊', action: 'analytics' },
              { label: 'Schedule Meeting', icon: '📅', action: 'consultation' },
              { label: 'Create AR Content', icon: '🥽', action: 'arvr' }
            ].map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onFeatureSelect(action.action)}
                className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 rounded-xl border border-blue-200/30 dark:border-blue-800/30 transition-all duration-300 text-center group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                  {action.icon}
                </div>
                <div className="text-sm font-medium">
                  {action.label}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}