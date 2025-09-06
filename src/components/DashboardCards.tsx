import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
// Using simple icons instead of lucide-react to avoid import errors

export function DashboardCards() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [consultationReason, setConsultationReason] = useState('');

  const handleConsultationSubmit = () => {
    // Mock consultation booking
    console.log('Consultation booked:', {
      type: consultationType,
      timeSlot: selectedTimeSlot,
      reason: consultationReason
    });
    setIsConsultationOpen(false);
    // Reset form
    setSelectedTimeSlot('');
    setConsultationType('');
    setConsultationReason('');
    // Show success message (you could use a toast here)
    alert('Consultation session booked successfully!');
  };

  return (
    <section id="dashboard" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Your Learning Dashboard
        </h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Track your progress, manage your schedule, and unlock achievements
        </p>
      </div>

      {/* Improved grid layout with better space utilization */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {/* Attendance Card */}
        <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 bg-gradient-to-br from-background to-blue-50/50 dark:to-blue-950/20 border-2 hover:border-blue-500/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <span className="text-lg">📱</span>
              Attendance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold">92%</div>
            <p className="text-sm text-foreground/70">This month's attendance</p>
            
            <div className="flex gap-2">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex-1 group-hover:shadow-lg transition-all">
                <span className="mr-1">📱</span>
                QR Scan
              </Button>
              <Button size="sm" variant="outline" className="flex-1 group-hover:shadow-lg transition-all">
                <span className="mr-1">🔍</span>
                Face ID
              </Button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground/70">Today</span>
              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                Present
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Timetable Card */}
        <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 bg-gradient-to-br from-background to-purple-50/50 dark:to-purple-950/20 border-2 hover:border-purple-500/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-purple-600">
              <span className="text-lg">📅</span>
              Timetable
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-accent/50">
                <div className="flex items-center gap-2">
                  <span className="text-purple-600">🕰️</span>
                  <span className="text-sm font-medium">Mathematics</span>
                </div>
                <span className="text-xs text-foreground/70">10:00 AM</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-foreground/50">🕰️</span>
                  <span className="text-sm">Physics</span>
                </div>
                <span className="text-xs text-foreground/70">11:30 AM</span>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full group-hover:shadow-lg transition-all">
              View Full Schedule
              <span className="ml-1">▶️</span>
            </Button>
          </CardContent>
        </Card>

        {/* Streaks & Rewards Card */}
        <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 bg-gradient-to-br from-background to-orange-50/50 dark:to-orange-950/20 border-2 hover:border-orange-500/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <span className="text-lg">🔥</span>
              Streaks & Rewards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-2xl font-bold text-orange-600">7</div>
              <p className="text-sm text-foreground/70">Day Streak</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>XP Progress</span>
                <span className="text-orange-600">850/1000</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            
            <Button variant="outline" size="sm" className="w-full group-hover:shadow-lg transition-all">
              <span className="mr-1">🏆</span>
              Redeem Rewards
            </Button>
          </CardContent>
        </Card>

        {/* Activities Hub Card */}
        <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 bg-gradient-to-br from-background to-green-50/50 dark:to-green-950/20 border-2 hover:border-green-500/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-600">
              <span className="text-lg">👥</span>
              Activities Hub
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors cursor-pointer">
                <span className="text-2xl mx-auto mb-1 text-green-600">🎯</span>
                <span className="text-xs">Clubs</span>
              </div>
              <div className="text-center p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors cursor-pointer">
                <span className="text-2xl mx-auto mb-1 text-blue-600">📚</span>
                <span className="text-xs">Workshops</span>
              </div>
            </div>
            
            <div className="text-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-foreground/70">Upcoming</span>
                <Badge variant="secondary">3 events</Badge>
              </div>
              <p className="text-xs text-foreground/60">Science Club Meeting - Tomorrow 4 PM</p>
            </div>
            
            <Button variant="outline" size="sm" className="w-full group-hover:shadow-lg transition-all">
              Explore Activities
            </Button>
          </CardContent>
        </Card>

        {/* Analytics Card */}
        <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 bg-gradient-to-br from-background to-indigo-50/50 dark:to-indigo-950/20 border-2 hover:border-indigo-500/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-indigo-600">
              <span className="text-lg">📈</span>
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold text-indigo-600">
              92%
              <span className="text-sm text-foreground/70 ml-2">Overall</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Math</span>
                <span className="font-medium">95%</span>
              </div>
              <Progress value={95} className="h-1" />
              
              <div className="flex justify-between text-sm">
                <span>Science</span>
                <span className="font-medium">88%</span>
              </div>
              <Progress value={88} className="h-1" />
            </div>
            
            <Button variant="outline" size="sm" className="w-full group-hover:shadow-lg transition-all">
              View Detailed Report
            </Button>
          </CardContent>
        </Card>

        {/* Profile Card */}
        <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20 bg-gradient-to-br from-background to-pink-50/50 dark:to-pink-950/20 border-2 hover:border-pink-500/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-pink-600">
              <span className="text-lg">⭐</span>
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-pink-100 text-pink-600">AS</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Alex Student</div>
                <div className="text-sm text-foreground/70">Grade 12</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1">
              <Badge variant="secondary" className="text-xs">
                <span className="mr-1">🏅</span>
                Honor Roll
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Perfect Attendance
              </Badge>
            </div>
            
            <Button variant="outline" size="sm" className="w-full group-hover:shadow-lg transition-all">
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* New Consultation/Counseling Card */}
        <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/20 bg-gradient-to-br from-background to-teal-50/50 dark:to-teal-950/20 border-2 hover:border-teal-500/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-teal-600">
              <span className="text-lg">🧠</span>
              Counseling
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl mb-2">💬</div>
              <p className="text-sm text-foreground/70 mb-3">
                Book a session with our guidance counselors
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground/70">Next available</span>
                <Badge variant="secondary" className="bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300">
                  Today 2 PM
                </Badge>
              </div>
              
              <div className="text-xs text-foreground/60 space-y-1">
                <p>• Academic guidance</p>
                <p>• Career counseling</p>
                <p>• Personal support</p>
              </div>
            </div>
            
            <Dialog open={isConsultationOpen} onOpenChange={setIsConsultationOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full group-hover:shadow-lg transition-all">
                  <span className="mr-1">📅</span>
                  Book Session
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <span>🧠</span>
                    Book Counseling Session
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="consultation-type">Type of Consultation</Label>
                    <Select value={consultationType} onValueChange={setConsultationType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select consultation type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">📚 Academic Guidance</SelectItem>
                        <SelectItem value="career">🎯 Career Counseling</SelectItem>
                        <SelectItem value="personal">💙 Personal Support</SelectItem>
                        <SelectItem value="stress">😌 Stress Management</SelectItem>
                        <SelectItem value="study">📖 Study Skills</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time-slot">Preferred Time Slot</Label>
                    <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today-10am">Today - 10:00 AM</SelectItem>
                        <SelectItem value="today-2pm">Today - 2:00 PM</SelectItem>
                        <SelectItem value="today-4pm">Today - 4:00 PM</SelectItem>
                        <SelectItem value="tomorrow-9am">Tomorrow - 9:00 AM</SelectItem>
                        <SelectItem value="tomorrow-11am">Tomorrow - 11:00 AM</SelectItem>
                        <SelectItem value="tomorrow-3pm">Tomorrow - 3:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reason">Brief Description (Optional)</Label>
                    <Textarea
                      id="reason"
                      placeholder="Tell us what you'd like to discuss..."
                      value={consultationReason}
                      onChange={(e) => setConsultationReason(e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsConsultationOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleConsultationSubmit}
                      disabled={!consultationType || !selectedTimeSlot}
                      className="flex-1 bg-teal-600 hover:bg-teal-700"
                    >
                      Book Session
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Quick Actions Card - Additional utility card to fill space */}
        <Card className="sm:col-span-2 lg:col-span-1 xl:col-span-2 group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 bg-gradient-to-br from-background to-cyan-50/50 dark:to-cyan-950/20 border-2 hover:border-cyan-500/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-cyan-600">
              <span className="text-lg">⚡</span>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-3 group-hover:shadow-lg transition-all">
                <span className="text-lg">📝</span>
                <span className="text-xs">Submit Assignment</span>
              </Button>
              
              <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-3 group-hover:shadow-lg transition-all">
                <span className="text-lg">📊</span>
                <span className="text-xs">View Grades</span>
              </Button>
              
              <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-3 group-hover:shadow-lg transition-all">
                <span className="text-lg">💬</span>
                <span className="text-xs">Message Teacher</span>
              </Button>
              
              <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-3 group-hover:shadow-lg transition-all">
                <span className="text-lg">📚</span>
                <span className="text-xs">Library Access</span>
              </Button>
            </div>
            
            <div className="p-3 rounded-lg bg-accent/30 border border-cyan-200 dark:border-cyan-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-cyan-600">🔔</span>
                <span className="text-sm font-medium">Recent Notifications</span>
              </div>
              <div className="space-y-1 text-xs text-foreground/70">
                <p>• New assignment posted in Mathematics</p>
                <p>• Parent-teacher meeting scheduled</p>
                <p>• Science fair registration open</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}