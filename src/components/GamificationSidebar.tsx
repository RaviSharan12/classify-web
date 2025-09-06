import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// Using simple icons instead of lucide-react to avoid import errors

export function GamificationSidebar() {
  const [isFireActive, setIsFireActive] = useState(false);
  const [embers, setEmbers] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const leaderboardData = [
    { name: 'Sarah Chen', xp: 2540, avatar: 'SC', rank: 1 },
    { name: 'Mike Johnson', xp: 2387, avatar: 'MJ', rank: 2 },
    { name: 'Alex Student', xp: 2156, avatar: 'AS', rank: 3 },
  ];

  const badges = [
    { icon: '🏅', name: 'Perfect Week', color: 'gold', earned: true },
    { icon: '🎯', name: '100% Month', color: 'silver', earned: true },
    { icon: '⚡', name: 'Quick Learner', color: 'bronze', earned: true },
    { icon: '⭐', name: 'Top Performer', color: 'gold', earned: false },
    { icon: '👑', name: 'Class Leader', color: 'platinum', earned: false },
    { icon: '🏆', name: 'Dedication', color: 'bronze', earned: true },
  ];

  const getBadgeColor = (color: string, earned: boolean) => {
    if (!earned) return 'text-foreground/30 bg-muted/50';
    
    switch (color) {
      case 'gold': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'silver': return 'text-gray-600 bg-gray-100 dark:bg-gray-800/50';
      case 'bronze': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'platinum': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      default: return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
    }
  };

  const handleFireClick = () => {
    setIsFireActive(true);
    
    // Create ember particles
    const newEmbers = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 60 - 30, // Random x offset
      y: Math.random() * 20 - 10   // Random y offset
    }));
    setEmbers(newEmbers);
    
    // Reset fire after animation
    setTimeout(() => {
      setIsFireActive(false);
      setEmbers([]);
    }, 3000);
  };

  useEffect(() => {
    if (embers.length > 0) {
      const timer = setTimeout(() => {
        setEmbers([]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [embers]);

  return (
    <div className="w-full lg:w-80 space-y-6">
      {/* Streak Tracker */}
      <Card className={`bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800 transition-all duration-300 ${isFireActive ? 'fire-glow' : ''}`}>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-orange-600">
            <span className="text-lg">🔥</span>
            Current Streak
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center relative">
            {/* Main Fire Icon */}
            <div 
              className={`text-4xl mb-2 cursor-pointer transition-all duration-300 ${isFireActive ? 'fire-active' : 'animate-pulse hover:scale-110'}`}
              onClick={handleFireClick}
              style={{
                filter: isFireActive ? 'hue-rotate(20deg) brightness(1.3) saturate(1.5)' : '',
                textShadow: isFireActive ? '0 0 10px rgba(255, 100, 0, 0.8), 0 0 20px rgba(255, 165, 0, 0.6)' : ''
              }}
            >
              🔥
            </div>
            
            {/* Ember Particles */}
            {embers.map((ember) => (
              <div
                key={ember.id}
                className="ember"
                style={{
                  left: `50%`,
                  top: `40%`,
                  transform: `translate(${ember.x}px, ${ember.y}px)`,
                }}
              />
            ))}
            
            <div className="text-3xl font-bold text-orange-600">7</div>
            <p className="text-sm text-foreground/70">Consecutive Days</p>
            <p className="text-xs text-orange-600 font-medium mt-1">
              {isFireActive ? '🔥 FIRE STREAK ACTIVATED! 🔥' : 'Click the fire to ignite!'}
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Next Milestone</span>
              <span className={`text-orange-600 ${isFireActive ? 'font-bold animate-pulse' : ''}`}>10 days</span>
            </div>
            <Progress 
              value={70} 
              className={`h-3 bg-orange-100 dark:bg-orange-900/30 transition-all duration-300 ${isFireActive ? 'fire-glow' : ''}`}
              style={{
                filter: isFireActive ? 'hue-rotate(10deg) brightness(1.2)' : ''
              }}
            />
            <p className="text-xs text-foreground/60 text-center">
              {isFireActive ? '🔥 BLAZING TOWARDS EPIC STREAK! 🔥' : '3 more days for Epic Streak badge! 🏆'}
            </p>
          </div>
          
          {/* Weekly streak visualization */}
          <div className="grid grid-cols-7 gap-1 mt-4">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <div key={`${day}-${index}`} className="text-center">
                <div className="text-xs text-foreground/60 mb-1">{day}</div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                  index < 5 ? `bg-orange-500 text-white ${isFireActive ? 'fire-glow animate-pulse' : 'hover:scale-110'}` : 
                  index === 5 ? `bg-orange-200 text-orange-700 ${isFireActive ? 'fire-glow' : ''}` : 
                  'bg-muted text-foreground/40'
                }`}>
                  {index < 5 ? (isFireActive ? '🔥' : '✓') : index === 5 ? '●' : '○'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-purple-600">
            <span className="text-lg">🏆</span>
            Class Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {leaderboardData.map((student, index) => (
            <div 
              key={student.name}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                student.rank === 3 ? 'bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700' : 
                'bg-background/50 hover:bg-accent/50'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                student.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                student.rank === 2 ? 'bg-gray-400 text-gray-900' :
                'bg-orange-400 text-orange-900'
              }`}>
                {student.rank}
              </div>
              
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs">{student.avatar}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{student.name}</div>
                <div className="text-xs text-foreground/70">{student.xp} XP</div>
              </div>
              
              {student.rank === 1 && <span className="text-yellow-500">👑</span>}
              {student.rank === 2 && <span className="text-gray-500">🥈</span>}
              {student.rank === 3 && <span className="text-orange-500">🥉</span>}
            </div>
          ))}
          
          <div className="text-center pt-2">
            <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">
              View Full Leaderboard →
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Badges Collection */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <span className="text-lg">⭐</span>
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge, index) => (
              <div 
                key={badge.name}
                className={`text-center p-3 rounded-lg transition-all cursor-pointer hover:scale-105 ${
                  getBadgeColor(badge.color, badge.earned)
                } ${badge.earned ? 'shadow-sm' : ''}`}
                title={badge.name}
              >
                <span className={`text-2xl mx-auto mb-1 block ${
                  badge.earned ? '' : 'opacity-50'
                }`}>{badge.icon}</span>
                <div className="text-xs font-medium">{badge.name}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center p-3 bg-accent/50 rounded-lg">
            <div className="text-sm font-medium mb-1">Progress</div>
            <div className="text-xs text-foreground/70">4 of 6 badges earned</div>
            <Progress value={67} className="mt-2 h-2" />
          </div>
          
          <div className="text-center">
            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
              View All Achievements →
            </button>
          </div>
        </CardContent>
      </Card>

      {/* XP Progress */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-green-600">
            <span className="text-lg">📈</span>
            XP Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">2,156</div>
            <p className="text-sm text-foreground/70">Total Experience Points</p>
          </div>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Daily Goal</span>
                <span className="text-green-600">45/50 XP</span>
              </div>
              <Progress value={90} className="h-2 bg-green-100 dark:bg-green-900/30" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Weekly Goal</span>
                <span className="text-green-600">280/350 XP</span>
              </div>
              <Progress value={80} className="h-2 bg-green-100 dark:bg-green-900/30" />
            </div>
          </div>
          
          <div className="text-xs text-center text-foreground/60 bg-accent/50 p-2 rounded">
            ⚡ 5 XP bonus for perfect attendance!
          </div>
        </CardContent>
      </Card>
    </div>
  );
}