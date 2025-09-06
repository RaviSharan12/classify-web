import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';

interface Habit {
  id: string;
  name: string;
  category: 'health' | 'productivity' | 'mindfulness' | 'social';
  icon: string;
  streak: number;
  completedToday: boolean;
  weeklyGoal: number;
  weeklyProgress: number;
  description: string;
}

interface MindfulnessSession {
  id: string;
  type: 'breathing' | 'meditation' | 'gratitude' | 'focus';
  duration: number;
  completed: boolean;
  icon: string;
}

export function LifeSkillsTracker() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Morning Exercise',
      category: 'health',
      icon: '🏃‍♂️',
      streak: 7,
      completedToday: true,
      weeklyGoal: 5,
      weeklyProgress: 4,
      description: 'Start your day with 15-30 minutes of physical activity'
    },
    {
      id: '2',
      name: 'Read for 30 mins',
      category: 'productivity',
      icon: '📚',
      streak: 12,
      completedToday: false,
      weeklyGoal: 7,
      weeklyProgress: 5,
      description: 'Read educational or personal development books daily'
    },
    {
      id: '3',
      name: 'Gratitude Journal',
      category: 'mindfulness',
      icon: '📝',
      streak: 3,
      completedToday: true,
      weeklyGoal: 7,
      weeklyProgress: 6,
      description: 'Write down 3 things you are grateful for each day'
    },
    {
      id: '4',
      name: 'Connect with Friends',
      category: 'social',
      icon: '👥',
      streak: 2,
      completedToday: false,
      weeklyGoal: 3,
      weeklyProgress: 2,
      description: 'Reach out to friends or family members for meaningful connection'
    },
    {
      id: '5',
      name: 'Healthy Eating',
      category: 'health',
      icon: '🥗',
      streak: 5,
      completedToday: true,
      weeklyGoal: 7,
      weeklyProgress: 6,
      description: 'Make conscious healthy food choices throughout the day'
    },
    {
      id: '6',
      name: 'Learn Something New',
      category: 'productivity',
      icon: '🧠',
      streak: 8,
      completedToday: false,
      weeklyGoal: 5,
      weeklyProgress: 3,
      description: 'Spend time learning a new skill or exploring a new topic'
    }
  ]);

  const [mindfulnessSessions] = useState<MindfulnessSession[]>([
    { id: '1', type: 'breathing', duration: 5, completed: false, icon: '🫁' },
    { id: '2', type: 'meditation', duration: 10, completed: false, icon: '🧘‍♀️' },
    { id: '3', type: 'gratitude', duration: 3, completed: true, icon: '🙏' },
    { id: '4', type: 'focus', duration: 15, completed: false, icon: '🎯' }
  ]);

  const [timeManagement] = useState({
    pomodoroSessions: 6,
    deepWorkHours: 3.5,
    breakTime: 45,
    focusScore: 85
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCelebration, setShowCelebration] = useState(false);

  const toggleHabit = (habitId: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const newCompleted = !habit.completedToday;
        const newStreak = newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1);
        const newWeeklyProgress = newCompleted ? 
          Math.min(habit.weeklyGoal, habit.weeklyProgress + 1) : 
          Math.max(0, habit.weeklyProgress - 1);

        // Show celebration for streak milestones
        if (newCompleted && (newStreak % 7 === 0 || newStreak % 30 === 0)) {
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }

        return {
          ...habit,
          completedToday: newCompleted,
          streak: newStreak,
          weeklyProgress: newWeeklyProgress
        };
      }
      return habit;
    }));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'health': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'productivity': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'mindfulness': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'social': return 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const filteredHabits = selectedCategory === 'all' ? 
    habits : habits.filter(habit => habit.category === selectedCategory);

  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);
  const completedToday = habits.filter(habit => habit.completedToday).length;
  const completionRate = Math.round((completedToday / habits.length) * 100);

  return (
    <div className="space-y-6">
      {/* Celebration Animation */}
      {showCelebration && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: 2 }}
              className="text-8xl mb-4"
            >
              🎉
            </motion.div>
            <h2 className="text-2xl font-bold text-yellow-600">Streak Milestone!</h2>
            <p className="text-foreground/70">Keep up the amazing work!</p>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
          Life Skills & Wellness Tracker
        </h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Build healthy habits, practice mindfulness, and develop essential life skills for academic and personal success
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="text-2xl mb-2">🔥</div>
            <div className="text-xl font-bold text-green-600 mb-1">{totalStreak}</div>
            <div className="text-xs text-foreground/70">Total Streak Days</div>
          </CardContent>
        </Card>
        
        <Card className="text-center border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-xl font-bold text-blue-600 mb-1">{completedToday}/{habits.length}</div>
            <div className="text-xs text-foreground/70">Today's Habits</div>
          </CardContent>
        </Card>
        
        <Card className="text-center border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-xl font-bold text-purple-600 mb-1">{completionRate}%</div>
            <div className="text-xs text-foreground/70">Completion Rate</div>
          </CardContent>
        </Card>
        
        <Card className="text-center border-orange-200 dark:border-orange-800">
          <CardContent className="p-4">
            <div className="text-2xl mb-2">⭐</div>
            <div className="text-xl font-bold text-orange-600 mb-1">{timeManagement.focusScore}</div>
            <div className="text-xs text-foreground/70">Focus Score</div>
          </CardContent>
        </Card>
      </div>

      {/* Habit Tracker */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">📋</span>
              Daily Habit Tracker
            </CardTitle>
            
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All
              </Button>
              {['health', 'productivity', 'mindfulness', 'social'].map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHabits.map((habit) => (
              <motion.div
                key={habit.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className={`cursor-pointer transition-all duration-300 ${
                  habit.completedToday ? 
                    'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950/20' : 
                    'hover:border-gray-300 dark:hover:border-gray-600'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={habit.completedToday ? { scale: [1, 1.2, 1] } : {}}
                          className="text-2xl"
                        >
                          {habit.icon}
                        </motion.div>
                        <div>
                          <h3 className="font-medium">{habit.name}</h3>
                          <Badge className={getCategoryColor(habit.category)} variant="secondary">
                            {habit.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <Button
                        variant={habit.completedToday ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleHabit(habit.id)}
                        className={habit.completedToday ? 'bg-green-600 hover:bg-green-700' : ''}
                      >
                        {habit.completedToday ? '✓' : '○'}
                      </Button>
                    </div>
                    
                    <p className="text-xs text-foreground/70 mb-3">{habit.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>🔥 Streak: {habit.streak} days</span>
                        <span>Weekly: {habit.weeklyProgress}/{habit.weeklyGoal}</span>
                      </div>
                      <Progress 
                        value={(habit.weeklyProgress / habit.weeklyGoal) * 100} 
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mindfulness & Wellness */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mindfulness Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">🧘‍♀️</span>
              Mindfulness Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mindfulnessSessions.map((session) => (
                <div
                  key={session.id}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    session.completed ? 
                      'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950/20' :
                      'border-border hover:border-purple-300 dark:hover:border-purple-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{session.icon}</span>
                      <div>
                        <div className="font-medium capitalize">{session.type}</div>
                        <div className="text-xs text-foreground/70">{session.duration} minutes</div>
                      </div>
                    </div>
                    <Button
                      variant={session.completed ? 'default' : 'outline'}
                      size="sm"
                      className={session.completed ? 'bg-green-600 hover:bg-green-700' : ''}
                    >
                      {session.completed ? 'Completed' : 'Start'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-purple-600">💡</span>
                <span className="text-sm font-medium">Mindfulness Tip</span>
              </div>
              <p className="text-xs text-foreground/70">
                Even 5 minutes of mindfulness practice can improve focus, reduce stress, and enhance emotional regulation.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Time Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">⏰</span>
              Time Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <div className="text-xl font-bold text-blue-600">{timeManagement.pomodoroSessions}</div>
                  <div className="text-xs text-foreground/70">Pomodoro Sessions</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                  <div className="text-xl font-bold text-green-600">{timeManagement.deepWorkHours}h</div>
                  <div className="text-xs text-foreground/70">Deep Work Time</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Focus Score</span>
                  <span className="text-blue-600">{timeManagement.focusScore}/100</span>
                </div>
                <Progress value={timeManagement.focusScore} className="h-2" />
              </div>
              
              <div className="flex justify-center gap-2">
                <Button variant="outline" size="sm">
                  <span className="mr-1">🍅</span>
                  Start Pomodoro
                </Button>
                <Button variant="outline" size="sm">
                  <span className="mr-1">⏸️</span>
                  Take Break
                </Button>
              </div>
              
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-amber-600">⚡</span>
                  <span className="text-sm font-medium">Productivity Insight</span>
                </div>
                <p className="text-xs text-foreground/70">
                  Your peak focus hours are between 9-11 AM. Schedule your most important tasks during this time.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">🏆</span>
            Achievement Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Early Bird', icon: '🌅', earned: true, description: '7-day morning routine' },
              { name: 'Bookworm', icon: '📚', earned: true, description: 'Read 30 days straight' },
              { name: 'Zen Master', icon: '🧘‍♀️', earned: false, description: '100 meditation sessions' },
              { name: 'Fitness Guru', icon: '💪', earned: true, description: '30-day exercise streak' },
              { name: 'Social Butterfly', icon: '🦋', earned: false, description: 'Connect daily for 2 weeks' },
              { name: 'Mindful Soul', icon: '🌸', earned: false, description: 'Complete mindfulness program' }
            ].map((badge, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`text-center p-3 rounded-xl border-2 ${
                  badge.earned ? 
                    'border-yellow-300 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-950/20' :
                    'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-950/20 opacity-60'
                }`}
              >
                <div className={`text-3xl mb-2 ${badge.earned ? '' : 'grayscale'}`}>
                  {badge.icon}
                </div>
                <div className="text-xs font-medium">{badge.name}</div>
                <div className="text-xs text-foreground/60 mt-1">{badge.description}</div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}