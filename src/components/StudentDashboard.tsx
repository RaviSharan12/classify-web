import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface StudentDashboardProps {
  onFeatureSelect: (feature: string) => void;
}

export function StudentDashboard({ onFeatureSelect }: StudentDashboardProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const studentFeatures = [
    {
      id: 'peer-learning',
      title: 'Peer Learning',
      description: 'Connect with classmates, join study groups, share notes, and participate in collaborative challenges',
      icon: '👥',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
      hoverGradient: 'from-emerald-600 via-teal-600 to-cyan-700',
      stats: { groups: 8, challenges: 12, friends: 45 },
      features: ['Study Groups', 'Note Sharing', 'Peer Challenges', 'Discussion Forums']
    },
    {
      id: 'lifeskills',
      title: 'Life Skills Tracker',
      description: 'Track and develop essential life skills with personalized goals, challenges, and progress monitoring',
      icon: '🌱',
      gradient: 'from-green-500 via-emerald-500 to-teal-600',
      hoverGradient: 'from-green-600 via-emerald-600 to-teal-700',
      stats: { skills: 15, completed: 8, mastery: 67 },
      features: ['Skill Assessment', 'Goal Setting', 'Progress Tracking', 'Micro-learning']
    },
    {
      id: 'ai-mentor',
      title: 'AI Mentor Chat',
      description: 'Get instant help, study guidance, and personalized learning recommendations from your AI assistant',
      icon: '🤖',
      gradient: 'from-blue-500 via-indigo-500 to-purple-600',
      hoverGradient: 'from-blue-600 via-indigo-600 to-purple-700',
      stats: { conversations: 156, helped: 89, rating: 4.8 },
      features: ['24/7 Support', 'Smart Tutoring', 'Study Plans', 'Question Answering']
    },
    {
      id: 'gamification',
      title: 'Gamification Hub',
      description: 'Earn XP, unlock achievements, compete on leaderboards, and track your learning streaks',
      icon: '🎮',
      gradient: 'from-purple-500 via-pink-500 to-rose-600',
      hoverGradient: 'from-purple-600 via-pink-600 to-rose-700',
      stats: { xp: 2450, rank: 12, streak: 7 },
      features: ['XP System', 'Achievements', 'Leaderboards', 'Daily Streaks']
    },
    {
      id: 'daily-challenge',
      title: 'Daily Challenge',
      description: 'Complete fun daily challenges to reinforce learning and compete with friends for rewards',
      icon: '⚡',
      gradient: 'from-orange-500 via-amber-500 to-yellow-600',
      hoverGradient: 'from-orange-600 via-amber-600 to-yellow-700',
      stats: { completed: 45, streak: 7, rewards: 23 },
      features: ['Daily Quests', 'Bonus XP', 'Streak Rewards', 'Leaderboard']
    },
    {
      id: 'timetable',
      title: 'Smart Timetable',
      description: 'Personalized schedule with intelligent reminders, conflict detection, and study time optimization',
      icon: '📅',
      gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
      hoverGradient: 'from-cyan-600 via-blue-600 to-indigo-700',
      stats: { classes: 6, assignments: 8, events: 3 },
      features: ['Smart Scheduling', 'Reminders', 'Deadline Tracking', 'Study Blocks']
    }
  ];

  const currentStreak = 7;
  const totalXP = 2450;
  const currentLevel = Math.floor(totalXP / 500) + 1;
  const xpForNextLevel = (currentLevel * 500) - totalXP;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-emerald-900 dark:to-teal-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl text-white">👨‍🎓</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Student Dashboard
              </h1>
              <p className="text-lg text-foreground/70">
                Your personalized learning journey starts here
              </p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Current Level', value: currentLevel.toString(), icon: '⭐', color: 'amber' },
              { label: 'Total XP', value: totalXP.toString(), icon: '💎', color: 'blue' },
              { label: 'Learning Streak', value: `${currentStreak} days`, icon: '🔥', color: 'orange' },
              { label: 'Rank', value: '#12', icon: '🏆', color: 'purple' }
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
                      stat.color === 'amber' ? 'text-amber-600' :
                      stat.color === 'blue' ? 'text-blue-600' :
                      stat.color === 'orange' ? 'text-orange-600' :
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

          {/* Level Progress */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/60 dark:bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg mb-8"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Level {currentLevel} Progress</span>
              <span className="text-sm text-foreground/70">{xpForNextLevel} XP to Level {currentLevel + 1}</span>
            </div>
            <Progress 
              value={((totalXP % 500) / 500) * 100} 
              className="h-3 bg-gray-200 dark:bg-gray-700"
            />
          </motion.div>
        </motion.div>

        {/* Feature Cards Grid - 2 per row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {studentFeatures.map((feature, index) => (
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
                        <CardTitle className="text-xl mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:bg-clip-text transition-all">
                          {feature.title}
                        </CardTitle>
                        <Badge 
                          variant="secondary" 
                          className={`bg-gradient-to-r ${feature.gradient} text-white border-0`}
                        >
                          Available
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
                          {typeof value === 'number' && value < 10 && key !== 'rating' ? value : value}
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
                      Explore {feature.title}
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

        {/* Today's Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-6 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 backdrop-blur-lg rounded-2xl border border-orange-200/30 dark:border-orange-800/30 shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⚡
              </motion.span>
              Today's Challenge
            </h3>
            <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0">
              +50 XP
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold mb-1">Complete 3 Math Problems</h4>
              <p className="text-sm text-foreground/70 mb-2">
                Solve algebra equations to strengthen your problem-solving skills
              </p>
              <Progress value={66} className="w-48 h-2" />
              <p className="text-xs text-foreground/60 mt-1">2 of 3 completed</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onFeatureSelect('daily-challenge')}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-medium shadow-lg transition-all"
            >
              Continue Challenge
            </motion.button>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 p-6 bg-white/60 dark:bg-black/60 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>🚀</span>
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Join Study Group', icon: '👥', action: 'peer-learning' },
              { label: 'Chat with AI', icon: '🤖', action: 'ai-mentor' },
              { label: 'Check Timetable', icon: '📅', action: 'timetable' },
              { label: 'View Progress', icon: '📊', action: 'lifeskills' }
            ].map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onFeatureSelect(action.action)}
                className="p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 rounded-xl border border-emerald-200/30 dark:border-emerald-800/30 transition-all duration-300 text-center group"
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