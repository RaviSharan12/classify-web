import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Alert, AlertDescription } from './ui/alert';
import { motion } from 'motion/react';

interface StudentEngagement {
  id: string;
  name: string;
  avatar: string;
  engagementLevel: 'high' | 'medium' | 'low';
  subjects: {
    math: number;
    science: number;
    english: number;
    history: number;
  };
  riskLevel: 'none' | 'low' | 'medium' | 'high';
  lastActive: string;
}

export function AnalyticsDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  const [selectedClass, setSelectedClass] = useState('all');

  const studentsData: StudentEngagement[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      avatar: '/placeholder-student1.jpg',
      engagementLevel: 'high',
      subjects: { math: 95, science: 88, english: 92, history: 85 },
      riskLevel: 'none',
      lastActive: '2 hours ago'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      avatar: '/placeholder-student2.jpg',
      engagementLevel: 'medium',
      subjects: { math: 78, science: 92, english: 85, history: 88 },
      riskLevel: 'low',
      lastActive: '1 day ago'
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      avatar: '/placeholder-student3.jpg',
      engagementLevel: 'low',
      subjects: { math: 65, science: 72, english: 68, history: 70 },
      riskLevel: 'high',
      lastActive: '3 days ago'
    },
    {
      id: '4',
      name: 'Emma Thompson',
      avatar: '/placeholder-student4.jpg',
      engagementLevel: 'high',
      subjects: { math: 92, science: 95, english: 88, history: 90 },
      riskLevel: 'none',
      lastActive: '1 hour ago'
    },
    {
      id: '5',
      name: 'David Kim',
      avatar: '/placeholder-student5.jpg',
      engagementLevel: 'medium',
      subjects: { math: 82, science: 75, english: 79, history: 84 },
      riskLevel: 'medium',
      lastActive: '5 hours ago'
    }
  ];

  const getEngagementColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-950/20';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20';
      case 'low': return 'border-blue-500 bg-blue-50 dark:bg-blue-950/20';
      default: return 'border-green-500 bg-green-50 dark:bg-green-950/20';
    }
  };

  const predictiveAlerts = [
    {
      id: '1',
      type: 'risk',
      student: 'Mike Rodriguez',
      subject: 'Mathematics',
      message: 'Student showing declining performance in Math. Suggest immediate intervention.',
      probability: 85,
      recommended_actions: ['Schedule 1-on-1 session', 'Provide additional resources', 'Peer tutoring']
    },
    {
      id: '2',
      type: 'opportunity',
      student: 'Emma Thompson',
      subject: 'Science',
      message: 'Student shows exceptional aptitude. Consider advanced placement.',
      probability: 92,
      recommended_actions: ['Advanced coursework', 'Competition participation', 'Mentorship program']
    },
    {
      id: '3',
      type: 'engagement',
      student: 'Sarah Chen',
      subject: 'English',
      message: 'Engagement dropping in recent weeks. Check for external factors.',
      probability: 78,
      recommended_actions: ['Wellness check', 'Family consultation', 'Workload assessment']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Teacher Analytics Dashboard</h2>
          <p className="text-foreground/70">Real-time insights into student engagement and performance</p>
        </div>
        
        <div className="flex gap-2">
          <select 
            value={selectedTimeRange} 
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="semester">This Semester</option>
          </select>
          
          <select 
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
          >
            <option value="all">All Classes</option>
            <option value="class-a">Class 12-A</option>
            <option value="class-b">Class 12-B</option>
            <option value="class-c">Class 11-A</option>
          </select>
        </div>
      </div>

      {/* Predictive Alerts */}
      <Card className="border-2 border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-600">
            <span className="text-xl">⚠️</span>
            Predictive Alerts & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictiveAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-xl border border-border bg-background/50 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      alert.type === 'risk' ? 'bg-red-500' : 
                      alert.type === 'opportunity' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{alert.student}</span>
                        <Badge variant="outline" className="text-xs">{alert.subject}</Badge>
                      </div>
                      <p className="text-sm text-foreground/80">{alert.message}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {alert.probability}% confidence
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {alert.recommended_actions.map((action, index) => (
                    <Button key={index} variant="outline" size="sm" className="text-xs h-7">
                      {action}
                    </Button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Engagement Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">🌡️</span>
            Student Engagement Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studentsData.map((student) => (
              <motion.div
                key={student.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl border-2 ${getRiskColor(student.riskLevel)} transition-all cursor-pointer`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getEngagementColor(student.engagementLevel)} rounded-full border-2 border-white`}></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{student.name}</h3>
                    <p className="text-xs text-foreground/60">{student.lastActive}</p>
                  </div>
                  <Badge
                    variant={student.riskLevel === 'high' ? 'destructive' : 
                            student.riskLevel === 'medium' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {student.riskLevel === 'none' ? 'Safe' : student.riskLevel}
                  </Badge>
                </div>
                
                {/* Subject Performance */}
                <div className="space-y-2">
                  {Object.entries(student.subjects).map(([subject, score]) => (
                    <div key={subject} className="flex items-center gap-2">
                      <span className="text-xs w-16 capitalize">{subject}</span>
                      <div className="flex-1">
                        <Progress 
                          value={score} 
                          className="h-2"
                        />
                      </div>
                      <span className="text-xs w-8 text-right">{score}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-2xl font-bold text-green-600 mb-1">87%</div>
            <div className="text-sm text-foreground/70">Average Engagement</div>
            <div className="text-xs text-green-600 mt-1">↗ +5% from last week</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl mb-2">⚠️</div>
            <div className="text-2xl font-bold text-red-600 mb-1">3</div>
            <div className="text-sm text-foreground/70">At-Risk Students</div>
            <div className="text-xs text-red-600 mt-1">Needs immediate attention</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-blue-600 mb-1">92%</div>
            <div className="text-sm text-foreground/70">Assignment Completion</div>
            <div className="text-xs text-blue-600 mt-1">↗ +3% from last week</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-purple-600 mb-1">15</div>
            <div className="text-sm text-foreground/70">High Performers</div>
            <div className="text-xs text-purple-600 mt-1">Ready for advancement</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-4">
              <span className="text-2xl">📊</span>
              <span className="text-xs">Generate Report</span>
            </Button>
            
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-4">
              <span className="text-2xl">📞</span>
              <span className="text-xs">Parent Conference</span>
            </Button>
            
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-4">
              <span className="text-2xl">📝</span>
              <span className="text-xs">Create Intervention</span>
            </Button>
            
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-4">
              <span className="text-2xl">🎓</span>
              <span className="text-xs">Recommend Program</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}