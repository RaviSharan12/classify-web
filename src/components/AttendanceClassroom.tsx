import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';

interface Student {
  id: string;
  name: string;
  avatar: string;
  isPresent: boolean;
  markTime?: Date;
  seatNumber: number;
}

interface Teacher {
  name: string;
  subject: string;
  avatar: string;
}

export function AttendanceClassroom() {
  const [isClassroomActive, setIsClassroomActive] = useState(false);
  const [attendanceMethod, setAttendanceMethod] = useState<'qr' | 'face' | null>(null);
  const [scanningStudent, setScanningStudent] = useState<string | null>(null);
  const [classProgress, setClassProgress] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const teacher: Teacher = {
    name: 'Dr. Sarah Johnson',
    subject: 'Advanced Mathematics',
    avatar: '/teacher-avatar.jpg'
  };

  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Alex Chen', avatar: '/student1.jpg', isPresent: false, seatNumber: 1 },
    { id: '2', name: 'Maria Garcia', avatar: '/student2.jpg', isPresent: false, seatNumber: 2 },
    { id: '3', name: 'David Kim', avatar: '/student3.jpg', isPresent: false, seatNumber: 3 },
    { id: '4', name: 'Emma Wilson', avatar: '/student4.jpg', isPresent: false, seatNumber: 4 },
    { id: '5', name: 'James Brown', avatar: '/student5.jpg', isPresent: false, seatNumber: 5 },
    { id: '6', name: 'Lisa Wang', avatar: '/student6.jpg', isPresent: false, seatNumber: 6 },
    { id: '7', name: 'Ryan Taylor', avatar: '/student7.jpg', isPresent: false, seatNumber: 7 },
    { id: '8', name: 'Sophie Miller', avatar: '/student8.jpg', isPresent: false, seatNumber: 8 },
    { id: '9', name: 'Ahmed Hassan', avatar: '/student9.jpg', isPresent: false, seatNumber: 9 },
    { id: '10', name: 'Zoe Anderson', avatar: '/student10.jpg', isPresent: false, seatNumber: 10 },
    { id: '11', name: 'Carlos Rodriguez', avatar: '/student11.jpg', isPresent: false, seatNumber: 11 },
    { id: '12', name: 'Nina Patel', avatar: '/student12.jpg', isPresent: false, seatNumber: 12 },
  ]);

  const startAttendance = (method: 'qr' | 'face') => {
    setAttendanceMethod(method);
    setIsClassroomActive(true);
    setClassProgress(0);
    
    // Simulate attendance marking process
    simulateAttendanceMarking();
  };

  const simulateAttendanceMarking = () => {
    const studentsToMark = [...students];
    let currentIndex = 0;
    
    const markInterval = setInterval(() => {
      if (currentIndex < studentsToMark.length) {
        const studentToMark = studentsToMark[currentIndex];
        setScanningStudent(studentToMark.id);
        
        // Simulate scan/recognition time
        setTimeout(() => {
          setStudents(prev => prev.map(student => 
            student.id === studentToMark.id 
              ? { ...student, isPresent: Math.random() > 0.1, markTime: new Date() } // 90% present rate
              : student
          ));
          setScanningStudent(null);
          setClassProgress(((currentIndex + 1) / studentsToMark.length) * 100);
          currentIndex++;
        }, 1500);
      } else {
        clearInterval(markInterval);
        // Class session simulation
        setTimeout(() => {
          setIsClassroomActive(false);
          setAttendanceMethod(null);
        }, 3000);
      }
    }, 2000);
  };

  const presentStudents = students.filter(s => s.isPresent).length;
  const attendanceRate = Math.round((presentStudents / students.length) * 100);

  useEffect(() => {
    // Initialize classroom animation
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <span className="text-xl">🏫</span>
            Smart Classroom Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{presentStudents}/{students.length}</div>
                <div className="text-xs text-foreground/70">Present</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{attendanceRate}%</div>
                <div className="text-xs text-foreground/70">Attendance Rate</div>
              </div>
              {classProgress > 0 && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{Math.round(classProgress)}%</div>
                  <div className="text-xs text-foreground/70">Progress</div>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={() => startAttendance('qr')}
                disabled={isClassroomActive}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white group"
              >
                <span className="mr-2 group-hover:scale-110 transition-transform">📱</span>
                QR Attendance
              </Button>
              
              <Button
                onClick={() => startAttendance('face')}
                disabled={isClassroomActive}
                variant="outline"
                className="border-2 border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 group"
              >
                <span className="mr-2 group-hover:scale-110 transition-transform">👤</span>
                Face Recognition
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3D Classroom Visualization */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">🎭</span>
            Virtual Classroom
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 h-96 overflow-hidden"
          >
            {/* Enhanced Animated Background */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: isInitialized ? 1 : 0 }}
              transition={{ duration: 2 }}
              className="absolute inset-0"
            >
              {/* Floating geometric shapes */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute top-10 left-10 w-8 h-8 bg-blue-200/30 dark:bg-blue-400/20 rounded-full animate-float"
              ></motion.div>
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 45 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="absolute top-20 right-20 w-6 h-6 bg-purple-200/30 dark:bg-purple-400/20 animate-float-delayed"
              ></motion.div>
              <motion.div
                initial={{ scale: 0, x: -50 }}
                animate={{ scale: 1, x: 0 }}
                transition={{ delay: 0.9, type: "spring" }}
                className="absolute bottom-20 left-20 w-10 h-10 bg-green-200/30 dark:bg-green-400/20 rounded-full animate-float-slow"
              ></motion.div>
              <motion.div
                initial={{ scale: 0, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 1.1, type: "spring" }}
                className="absolute bottom-10 right-10 w-4 h-4 bg-pink-200/30 dark:bg-pink-400/20 animate-bounce"
              ></motion.div>
              
              {/* Grid pattern */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 20px 20px, rgba(59,130,246,0.3) 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }}
              ></motion.div>
              
              {/* Subtle animated rays */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.05 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-blue-300 via-transparent to-blue-300 animate-pulse"></div>
                <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-purple-300 via-transparent to-purple-300 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-green-300 via-transparent to-green-300 animate-pulse" style={{ animationDelay: '2s' }}></div>
              </motion.div>

              {/* Welcome message */}
              {!isClassroomActive && isInitialized && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-center bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 dark:border-white/10 shadow-2xl">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-6xl mb-4"
                    >
                      🏫
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Welcome to Smart Classroom
                    </h3>
                    <p className="text-sm text-foreground/70 mb-4">
                      Click on QR or Face Recognition to start attendance
                    </p>
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-2xl"
                    >
                      👆
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>
            
            {/* Enhanced Teacher Section */}
            <AnimatePresence>
              {isClassroomActive && (
                <motion.div
                  initial={{ y: -100, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -100, opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20"
                >
                  <motion.div 
                    animate={{ 
                      boxShadow: [
                        "0 10px 30px rgba(0,0,0,0.1)",
                        "0 15px 40px rgba(59,130,246,0.2)",
                        "0 10px 30px rgba(0,0,0,0.1)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="bg-white/95 dark:bg-black/95 backdrop-blur-lg rounded-2xl p-5 border border-white/30 dark:border-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div 
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="relative"
                      >
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {teacher.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                      </motion.div>
                      <div>
                        <div className="font-semibold text-base">{teacher.name}</div>
                        <div className="text-sm text-foreground/70">{teacher.subject}</div>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 dark:from-green-900 dark:to-emerald-900 dark:text-green-300 px-3 py-1">
                          🎓 Teaching
                        </Badge>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interactive Whiteboard */}
            <AnimatePresence>
              {isClassroomActive && (
                <motion.div
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -200, opacity: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="absolute top-16 left-8 z-10"
                >
                  <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/20 w-20 h-12">
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-xs text-center font-medium text-blue-600 dark:text-blue-400"
                    >
                      📝 Board
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Student Seating Arrangement */}
            <div className="absolute inset-x-0 bottom-0 h-80 flex items-end justify-center pb-8">
              <div className="grid grid-cols-4 gap-6 max-w-2xl w-full px-8">
                {students.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ 
                      y: isClassroomActive ? 0 : 100, 
                      opacity: isClassroomActive ? 1 : 0,
                      scale: scanningStudent === student.id ? 1.1 : 1
                    }}
                    transition={{ 
                      delay: isClassroomActive ? index * 0.1 : 0,
                      duration: 0.3
                    }}
                    className="relative"
                  >
                    {/* Enhanced 3D Desk with Hover Effects */}
                    <div className="relative">
                      <motion.div 
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        className="w-16 h-12 bg-gradient-to-b from-amber-200 via-amber-300 to-amber-400 dark:from-amber-700 dark:via-amber-800 dark:to-amber-900 rounded-lg shadow-lg transform perspective-1000 rotateX-12 border border-amber-300/50 dark:border-amber-600/50"
                        style={{
                          boxShadow: student.isPresent 
                            ? '0 8px 20px rgba(34, 197, 94, 0.3), 0 0 0 2px rgba(34, 197, 94, 0.2)' 
                            : '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        {/* Desk surface details */}
                        <div className="absolute top-1 left-1 w-2 h-2 bg-amber-100/50 dark:bg-amber-600/30 rounded-full"></div>
                        <div className="absolute bottom-1 right-1 w-1 h-1 bg-amber-400/50 dark:bg-amber-500/50 rounded-full"></div>
                      </motion.div>
                      
                      {/* Enhanced Student Avatar with Floating Animation */}
                      <motion.div
                        animate={{
                          scale: scanningStudent === student.id ? [1, 1.2, 1] : 1,
                          y: isClassroomActive ? [0, -2, 0] : 0,
                        }}
                        transition={{ 
                          scale: { duration: 0.5, repeat: scanningStudent === student.id ? Infinity : 0 },
                          y: { duration: 3 + (index * 0.2), repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                      >
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold relative overflow-hidden border-2 ${
                            student.isPresent 
                              ? 'bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 border-green-300 shadow-lg shadow-green-500/30' 
                              : scanningStudent === student.id 
                                ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 border-yellow-300 shadow-lg shadow-orange-500/50' 
                                : 'bg-gradient-to-br from-gray-400 to-gray-600 border-gray-300'
                          }`}
                        >
                          {student.name.split(' ').map(n => n[0]).join('')}
                          
                          {/* Enhanced Scanning Effect */}
                          {scanningStudent === student.id && (
                            <>
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                              />
                              <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="absolute inset-0 border-2 border-yellow-300 rounded-full"
                              />
                            </>
                          )}
                          
                          {/* Idle animation particles */}
                          {student.isPresent && !scanningStudent && (
                            <motion.div
                              animate={{ 
                                scale: [0, 1, 0],
                                opacity: [0, 0.6, 0],
                                y: [0, -10, -20]
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.3
                              }}
                              className="absolute -top-2 left-1/2 w-1 h-1 bg-green-300 rounded-full transform -translate-x-1/2"
                            />
                          )}
                        </motion.div>
                        
                        {/* Enhanced Status Indicator */}
                        {student.isPresent && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                          >
                            <motion.span 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 }}
                              className="text-white text-xs font-bold"
                            >
                              ✓
                            </motion.span>
                          </motion.div>
                        )}
                        
                        {/* Enhanced Scanning Indicator */}
                        {scanningStudent === student.id && (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="absolute -inset-3 border-2 border-yellow-400 border-t-transparent rounded-full"
                            />
                            <motion.div
                              animate={{ rotate: -360 }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                              className="absolute -inset-4 border border-orange-400 border-b-transparent rounded-full opacity-60"
                            />
                            {/* Scanning beams */}
                            <motion.div
                              animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
                              transition={{ duration: 0.8, repeat: Infinity }}
                              className="absolute top-0 left-1/2 w-px h-8 bg-gradient-to-t from-yellow-400 to-transparent transform -translate-x-1/2 -translate-y-full"
                            />
                          </>
                        )}
                      </motion.div>
                      
                      {/* Student Name */}
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-center w-20">
                        <div className="font-medium truncate">{student.name.split(' ')[0]}</div>
                        {student.markTime && (
                          <div className="text-xs text-green-600">
                            {student.markTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Attendance Method Indicator */}
            {attendanceMethod && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-1/2 left-8 transform -translate-y-1/2"
              >
                <div className="bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/20">
                  <div className="text-center">
                    <div className="text-3xl mb-2">
                      {attendanceMethod === 'qr' ? '📱' : '👤'}
                    </div>
                    <div className="text-sm font-medium">
                      {attendanceMethod === 'qr' ? 'QR Scanning' : 'Face Recognition'}
                    </div>
                    <div className="text-xs text-foreground/70">Active</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Enhanced Progress Bar */}
            {classProgress > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-72"
              >
                <motion.div 
                  animate={{ 
                    boxShadow: [
                      "0 10px 25px rgba(0,0,0,0.1)",
                      "0 15px 35px rgba(59,130,246,0.2)",
                      "0 10px 25px rgba(0,0,0,0.1)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-white/95 dark:bg-black/95 backdrop-blur-lg rounded-xl p-4 border border-white/30 dark:border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="text-2xl"
                    >
                      ⚡
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm font-medium mb-2">
                        <span>Attendance Progress</span>
                        <motion.span
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="text-blue-600 dark:text-blue-400"
                        >
                          {Math.round(classProgress)}%
                        </motion.span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${classProgress}%` }}
                          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full relative overflow-hidden"
                        >
                          <motion.div
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Floating Classroom Elements */}
            <AnimatePresence>
              {isClassroomActive && (
                <>
                  {/* Clock */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ delay: 1, type: "spring" }}
                    className="absolute top-6 right-8"
                  >
                    <div className="bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-white/20">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="text-xl"
                      >
                        🕐
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Floating Books */}
                  <motion.div
                    initial={{ x: -100, y: 100, rotate: -45, opacity: 0 }}
                    animate={{ x: 0, y: 0, rotate: 0, opacity: 0.7 }}
                    transition={{ delay: 1.5, type: "spring", stiffness: 100 }}
                    className="absolute bottom-20 right-16"
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0], rotate: [0, 2, -2, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="text-2xl"
                    >
                      📚
                    </motion.div>
                  </motion.div>

                  {/* Floating Apple */}
                  <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.8 }}
                    transition={{ delay: 2, type: "spring" }}
                    className="absolute top-20 right-20"
                  >
                    <motion.div
                      animate={{ y: [0, -3, 0], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-lg"
                    >
                      🍎
                    </motion.div>
                  </motion.div>

                  {/* Attendance Success Particles */}
                  {students.filter(s => s.isPresent).map((student, idx) => (
                    <motion.div
                      key={`particle-${student.id}`}
                      initial={{ 
                        x: 200 + (idx % 4) * 100, 
                        y: 300 - Math.floor(idx / 4) * 80, 
                        scale: 0, 
                        opacity: 0 
                      }}
                      animate={{ 
                        x: [null, Math.random() * 400],
                        y: [null, Math.random() * 200],
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        delay: idx * 0.1,
                        repeat: Infinity,
                        repeatDelay: 5
                      }}
                      className="absolute pointer-events-none"
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>
        </CardContent>
      </Card>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-bold text-green-600 mb-1">{presentStudents}</div>
            <div className="text-sm text-foreground/70">Students Present</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl mb-2">❌</div>
            <div className="text-2xl font-bold text-red-600 mb-1">{students.length - presentStudents}</div>
            <div className="text-sm text-foreground/70">Students Absent</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold text-blue-600 mb-1">{attendanceRate}%</div>
            <div className="text-sm text-foreground/70">Attendance Rate</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}