import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Bell, Settings, User, Moon, Sun, Palette, Volume2, Shield, HelpCircle } from 'lucide-react';

interface UserProfileProps {
  userType: 'teacher' | 'student';
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function UserProfile({ userType, darkMode, onToggleDarkMode }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'settings'>('profile');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'achievement',
      title: 'New Achievement Unlocked!',
      message: 'You\'ve completed 7 days streak. Keep it up!',
      time: '2 minutes ago',
      icon: '🏆',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Class Reminder',
      message: 'Advanced Mathematics starts in 15 minutes',
      time: '15 minutes ago',
      icon: '⏰',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 3,
      type: 'social',
      title: 'New Study Group Invitation',
      message: 'Sarah invited you to join Physics Study Group',
      time: '1 hour ago',
      icon: '👥',
      color: 'from-emerald-500 to-teal-500'
    }
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    soundEffects: true,
    autoSync: true,
    privacyMode: false,
    studyReminders: true
  });

  const userInfo = {
    teacher: {
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@classify.com',
      role: 'Mathematics Professor',
      department: 'Science & Technology',
      experience: '8 years',
      students: 142,
      courses: 6
    },
    student: {
      name: 'Alex Chen',
      email: 'alex.chen@student.classify.com',
      role: 'Computer Science Student',
      year: '3rd Year',
      gpa: '3.8',
      credits: 95,
      level: 12
    }
  };

  const currentUser = userInfo[userType];

  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const markAsRead = (notificationId: number) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {currentUser.name}
              </h1>
              <p className="text-lg text-foreground/70">{currentUser.role}</p>
              <Badge className="mt-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                {userType === 'teacher' ? '👨‍🏫 Educator' : '👨‍🎓 Learner'}
              </Badge>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 bg-white/60 dark:bg-black/60 backdrop-blur-sm rounded-xl p-2 border border-white/20">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-foreground/70 hover:text-foreground hover:bg-white/50 dark:hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.id === 'notifications' && notifications.length > 0 && (
                    <Badge className="ml-1 bg-red-500 text-white text-xs min-w-5 h-5 flex items-center justify-center">
                      {notifications.length}
                    </Badge>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Profile Info */}
              <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-lg border border-white/30 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-foreground/70">Full Name</label>
                      <p className="text-lg font-semibold">{currentUser.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground/70">Email</label>
                      <p className="text-lg">{currentUser.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground/70">
                        {userType === 'teacher' ? 'Department' : 'Year'}
                      </label>
                      <p className="text-lg">
                        {userType === 'teacher' ? currentUser.department : currentUser.year}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground/70">
                        {userType === 'teacher' ? 'Experience' : 'GPA'}
                      </label>
                      <p className="text-lg">
                        {userType === 'teacher' ? currentUser.experience : currentUser.gpa}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-lg border border-white/30 shadow-xl">
                <CardHeader>
                  <CardTitle>Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(userType === 'teacher' ? [
                      { label: 'Total Students', value: currentUser.students, icon: '👥', color: 'blue' },
                      { label: 'Active Courses', value: currentUser.courses, icon: '📚', color: 'emerald' },
                      { label: 'Years Teaching', value: '8', icon: '🎓', color: 'purple' }
                    ] : [
                      { label: 'Current Level', value: currentUser.level, icon: '⭐', color: 'amber' },
                      { label: 'Credits Earned', value: currentUser.credits, icon: '🏆', color: 'emerald' },
                      { label: 'Current GPA', value: currentUser.gpa, icon: '📊', color: 'blue' }
                    ]).map((stat, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-4 bg-gradient-to-br from-white/50 to-white/30 dark:from-black/50 dark:to-black/30 rounded-xl border border-white/20"
                      >
                        <div className="text-3xl mb-2">{stat.icon}</div>
                        <div className={`text-2xl font-bold mb-1 ${
                          stat.color === 'blue' ? 'text-blue-600' :
                          stat.color === 'emerald' ? 'text-emerald-600' :
                          stat.color === 'purple' ? 'text-purple-600' :
                          stat.color === 'amber' ? 'text-amber-600' :
                          'text-blue-600'
                        }`}>
                          {stat.value}
                        </div>
                        <div className="text-sm text-foreground/70">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {notifications.length === 0 ? (
                <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-lg border border-white/30 shadow-xl">
                  <CardContent className="text-center py-12">
                    <div className="text-6xl mb-4">🔔</div>
                    <h3 className="text-xl font-semibold mb-2">No New Notifications</h3>
                    <p className="text-foreground/70">You're all caught up! Check back later for updates.</p>
                  </CardContent>
                </Card>
              ) : (
                notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-lg border border-white/30 shadow-xl hover:shadow-2xl transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${notification.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                            {notification.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold mb-1">{notification.title}</h4>
                            <p className="text-foreground/70 text-sm mb-2">{notification.message}</p>
                            <p className="text-xs text-foreground/50">{notification.time}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="hover:bg-red-100 dark:hover:bg-red-900/30"
                          >
                            ✕
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Appearance */}
              <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-lg border border-white/30 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                      <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-foreground/70">Toggle dark/light theme</p>
                      </div>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={onToggleDarkMode} />
                  </div>
                </CardContent>
              </Card>

              {/* Notifications Settings */}
              <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-lg border border-white/30 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications' },
                    { key: 'studyReminders', label: 'Study Reminders', desc: 'Reminders for study sessions' }
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{setting.label}</p>
                        <p className="text-sm text-foreground/70">{setting.desc}</p>
                      </div>
                      <Switch
                        checked={settings[setting.key as keyof typeof settings]}
                        onCheckedChange={(value) => handleSettingChange(setting.key, value)}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Audio & Privacy */}
              <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-lg border border-white/30 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Audio & Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: 'soundEffects', label: 'Sound Effects', desc: 'Play sounds for interactions', icon: Volume2 },
                    { key: 'autoSync', label: 'Auto Sync', desc: 'Automatically sync data across devices', icon: Settings },
                    { key: 'privacyMode', label: 'Privacy Mode', desc: 'Hide personal information in shared spaces', icon: Shield }
                  ].map((setting) => {
                    const Icon = setting.icon;
                    return (
                      <div key={setting.key} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <div>
                            <p className="font-medium">{setting.label}</p>
                            <p className="text-sm text-foreground/70">{setting.desc}</p>
                          </div>
                        </div>
                        <Switch
                          checked={settings[setting.key as keyof typeof settings]}
                          onCheckedChange={(value) => handleSettingChange(setting.key, value)}
                        />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Help & Support */}
              <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-lg border border-white/30 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    Help & Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Help Center', desc: 'Find answers to common questions' },
                      { label: 'Contact Support', desc: 'Get help from our support team' },
                      { label: 'Feature Requests', desc: 'Suggest new features' },
                      { label: 'Privacy Policy', desc: 'Read our privacy policy' }
                    ].map((item, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 rounded-xl border border-blue-200/30 dark:border-blue-800/30 transition-all text-left"
                      >
                        <p className="font-medium mb-1">{item.label}</p>
                        <p className="text-sm text-foreground/70">{item.desc}</p>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}