import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';

export function ConsultationBooking() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [consultationReason, setConsultationReason] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const counselors = [
    {
      id: 'dr-smith',
      name: 'Dr. Sarah Smith',
      specialization: 'Academic & Career Guidance',
      availability: '95%',
      rating: '4.9',
      image: '/placeholder-counselor1.jpg'
    },
    {
      id: 'ms-johnson',
      name: 'Ms. Emily Johnson',
      specialization: 'Personal Development',
      availability: '88%',
      rating: '4.8',
      image: '/placeholder-counselor2.jpg'
    },
    {
      id: 'mr-davis',
      name: 'Mr. Michael Davis',
      specialization: 'Stress & Wellness',
      availability: '92%',
      rating: '4.9',
      image: '/placeholder-counselor3.jpg'
    }
  ];

  const timeSlots = [
    '9:00 AM - 9:45 AM',
    '10:00 AM - 10:45 AM',
    '11:00 AM - 11:45 AM',
    '1:00 PM - 1:45 PM',
    '2:00 PM - 2:45 PM',
    '3:00 PM - 3:45 PM',
    '4:00 PM - 4:45 PM'
  ];

  const consultationTypes = [
    { value: 'academic', label: '📚 Academic Guidance', color: 'blue' },
    { value: 'career', label: '🎯 Career Counseling', color: 'purple' },
    { value: 'personal', label: '💙 Personal Support', color: 'green' },
    { value: 'stress', label: '😌 Stress Management', color: 'orange' },
    { value: 'study', label: '📖 Study Skills', color: 'indigo' },
    { value: 'social', label: '👥 Social Skills', color: 'pink' },
    { value: 'family', label: '🏠 Family Issues', color: 'teal' },
    { value: 'anxiety', label: '😰 Anxiety Support', color: 'red' }
  ];

  const handleBookingSubmit = () => {
    const bookingData = {
      counselor: selectedCounselor,
      type: consultationType,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      reason: consultationReason
    };
    
    console.log('Consultation booked:', bookingData);
    
    // Reset form
    setSelectedCounselor('');
    setSelectedTimeSlot('');
    setConsultationType('');
    setConsultationReason('');
    setSelectedDate('');
    setIsBookingOpen(false);
    
    // Show success message
    alert('Consultation session booked successfully! You will receive a confirmation email shortly.');
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Student Counseling Services</h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Get personalized guidance and support from our qualified counselors
        </p>
      </div>

      {/* Available Counselors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {counselors.map((counselor) => (
          <Card key={counselor.id} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={counselor.image} />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {counselor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{counselor.name}</h3>
                  <p className="text-xs text-foreground/70">{counselor.specialization}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span>Availability</span>
                  <span className="font-medium text-green-600">{counselor.availability}</span>
                </div>
                <Progress value={parseInt(counselor.availability)} className="h-1" />
                
                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="text-xs">
                    ⭐ {counselor.rating}
                  </Badge>
                  <Badge variant="outline" className="text-xs text-green-600">
                    Available Today
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <div className="text-2xl mb-2">📅</div>
          <div className="text-lg font-bold">24/7</div>
          <div className="text-xs text-foreground/70">Availability</div>
        </Card>
        
        <Card className="text-center p-4">
          <div className="text-2xl mb-2">🔒</div>
          <div className="text-lg font-bold">100%</div>
          <div className="text-xs text-foreground/70">Confidential</div>
        </Card>
        
        <Card className="text-center p-4">
          <div className="text-2xl mb-2">⏱️</div>
          <div className="text-lg font-bold">45min</div>
          <div className="text-xs text-foreground/70">Per Session</div>
        </Card>
        
        <Card className="text-center p-4">
          <div className="text-2xl mb-2">💚</div>
          <div className="text-lg font-bold">98%</div>
          <div className="text-xs text-foreground/70">Satisfaction</div>
        </Card>
      </div>

      {/* Book Session */}
      <Card className="border-2 border-dashed border-teal-300 dark:border-teal-700">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-teal-600">
            <span className="text-xl">🧠</span>
            Book Your Counseling Session
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-foreground/70 mb-4">
            Take the first step towards getting the support you need
          </p>
          
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <span className="mr-2">📅</span>
                Schedule Session
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span>🧠</span>
                  Book Your Counseling Session
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 pt-4">
                {/* Counselor Selection */}
                <div className="space-y-2">
                  <Label>Select Counselor</Label>
                  <Select value={selectedCounselor} onValueChange={setSelectedCounselor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a counselor" />
                    </SelectTrigger>
                    <SelectContent>
                      {counselors.map((counselor) => (
                        <SelectItem key={counselor.id} value={counselor.id}>
                          {counselor.name} - {counselor.specialization}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Consultation Type */}
                <div className="space-y-2">
                  <Label>Type of Consultation</Label>
                  <Select value={consultationType} onValueChange={setConsultationType}>
                    <SelectTrigger>
                      <SelectValue placeholder="What would you like to discuss?" />
                    </SelectTrigger>
                    <SelectContent>
                      {consultationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Selection */}
                <div className="space-y-2">
                  <Label>Preferred Date</Label>
                  <Select value={selectedDate} onValueChange={setSelectedDate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="tomorrow">Tomorrow</SelectItem>
                      <SelectItem value="day-after">Day After Tomorrow</SelectItem>
                      <SelectItem value="next-week">Next Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Time Slot */}
                <div className="space-y-2">
                  <Label>Preferred Time</Label>
                  <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot, index) => (
                        <SelectItem key={index} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Reason/Description */}
                <div className="space-y-2">
                  <Label>Brief Description (Optional)</Label>
                  <Textarea
                    placeholder="Help us understand what you'd like to discuss. This information is confidential."
                    value={consultationReason}
                    onChange={(e) => setConsultationReason(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Privacy Notice */}
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-blue-600">🔒</span>
                    <div className="text-blue-700 dark:text-blue-300">
                      <p className="font-medium mb-1">Your Privacy Matters</p>
                      <p className="text-xs">All counseling sessions are strictly confidential and protected by privacy laws.</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsBookingOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleBookingSubmit}
                    disabled={!selectedCounselor || !consultationType || !selectedDate || !selectedTimeSlot}
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

      {/* Emergency Support */}
      <Card className="border-2 border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
              <span className="text-xl">🚨</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-red-700 dark:text-red-300">Need Immediate Support?</h3>
              <p className="text-sm text-red-600 dark:text-red-400">
                If you're experiencing a crisis, don't wait. Contact our emergency support line.
              </p>
            </div>
            <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-300">
              <span className="mr-1">📞</span>
              Emergency Help
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}