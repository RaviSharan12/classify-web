import { QRCodeSVG } from "qrcode.react";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';

// 🔥 Firebase imports
import { db } from "../firebase.js/firebaseConfig";
import { doc, setDoc, collection, onSnapshot } from "firebase/firestore";

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
    avatar: 'https://i.pravatar.cc/100?img=65'
  };

  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Alex Chen', avatar: 'https://i.pravatar.cc/100?img=1', isPresent: false, seatNumber: 1 },
    { id: '2', name: 'Maria Garcia', avatar: 'https://i.pravatar.cc/100?img=2', isPresent: false, seatNumber: 2 },
    { id: '3', name: 'David Kim', avatar: 'https://i.pravatar.cc/100?img=3', isPresent: false, seatNumber: 3 },
    { id: '4', name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/100?img=4', isPresent: false, seatNumber: 4 },
    { id: '5', name: 'James Brown', avatar: 'https://i.pravatar.cc/100?img=5', isPresent: false, seatNumber: 5 },
    { id: '6', name: 'Lisa Wang', avatar: 'https://i.pravatar.cc/100?img=6', isPresent: false, seatNumber: 6 },
    { id: '7', name: 'Ryan Taylor', avatar: 'https://i.pravatar.cc/100?img=7', isPresent: false, seatNumber: 7 },
    { id: '8', name: 'Sophie Miller', avatar: 'https://i.pravatar.cc/100?img=8', isPresent: false, seatNumber: 8 },
    { id: '9', name: 'Ahmed Hassan', avatar: 'https://i.pravatar.cc/100?img=9', isPresent: false, seatNumber: 9 },
    { id: '10', name: 'Zoe Anderson', avatar: 'https://i.pravatar.cc/100?img=10', isPresent: false, seatNumber: 10 },
    { id: '11', name: 'Carlos Rodriguez', avatar: 'https://i.pravatar.cc/100?img=11', isPresent: false, seatNumber: 11 },
    { id: '12', name: 'Nina Patel', avatar: 'https://i.pravatar.cc/100?img=12', isPresent: false, seatNumber: 12 },
  ]);

  // QR code rotating value
  const [qrCodeValue, setQrCodeValue] = useState("");

  useEffect(() => {
    const generateQR = () => {
      const randomCode = `ATTEND-${Math.floor(Math.random() * 100000)}`;
      setQrCodeValue(randomCode);
    };

    generateQR();
    const interval = setInterval(generateQR, 10000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 Firestore helper
  const markAttendanceInFirestore = async (classId: string, studentId: string, isPresent: boolean) => {
    try {
      await setDoc(doc(db, "classes", classId, "attendance", studentId), {
        present: isPresent,
        scannedAt: new Date()
      });
    } catch (error) {
      console.error("❌ Firestore error:", error);
    }
  };

  const startAttendance = (method: 'qr' | 'face') => {
    setAttendanceMethod(method);
    setIsClassroomActive(true);
    setClassProgress(0);
    simulateAttendanceMarking();
  };

  const simulateAttendanceMarking = () => {
    const studentsToMark = [...students];
    let currentIndex = 0;

    const markInterval = setInterval(() => {
      if (currentIndex < studentsToMark.length) {
        const studentToMark = studentsToMark[currentIndex];
        setScanningStudent(studentToMark.id);

        setTimeout(() => {
          const isPresent = Math.random() > 0.1;
          setStudents(prev => prev.map(student =>
            student.id === studentToMark.id
              ? { ...student, isPresent, markTime: new Date() }
              : student
          ));

          const classId = teacher.subject.replace(/\s+/g, "_");
          markAttendanceInFirestore(classId, studentToMark.id, isPresent);

          setScanningStudent(null);
          setClassProgress(((currentIndex + 1) / studentsToMark.length) * 100);
          currentIndex++;
        }, 1500);
      } else {
        clearInterval(markInterval);
        setTimeout(() => {
          setIsClassroomActive(false);
          setAttendanceMethod(null);
        }, 3000);
      }
    }, 2000);
  };

  const presentStudents = students.filter(s => s.isPresent).length;
  const attendanceRate = Math.round((presentStudents / students.length) * 100);

  // 🔥 Firestore listener
  useEffect(() => {
    const classId = teacher.subject.replace(/\s+/g, "_");
    const unsub = onSnapshot(collection(db, "classes", classId, "attendance"), (snapshot) => {
      setStudents(prev =>
        prev.map(student => {
          const docData = snapshot.docs.find(doc => doc.id === student.id)?.data();
          if (docData) {
            return {
              ...student,
              isPresent: docData.present,
              markTime: docData.scannedAt?.toDate?.() || new Date()
            };
          }
          return student;
        })
      );
    });

    return () => unsub();
  }, [teacher.subject]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* --- Control Panel --- */}
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
              <Button onClick={() => startAttendance('qr')} disabled={isClassroomActive}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white group">
                📱 QR Attendance
              </Button>
              <Button onClick={() => startAttendance('face')} disabled={isClassroomActive}
                variant="outline"
                className="border-2 border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 group">
                👤 Face Recognition
              </Button>
            </div>
            <div className="mt-4 flex flex-col items-center">
              <p className="text-sm text-foreground/70 mb-2">Scan this QR to mark attendance</p>
              <QRCodeSVG value={qrCodeValue} size={128} />
              <div className="mt-2 text-xs text-foreground/60">
                Code: <span className="font-mono">{qrCodeValue}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- Virtual Classroom View --- */}
      <Card className="overflow-hidden border-2 border-purple-200 dark:border-purple-800">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950/30 dark:to-pink-950/30">
          <CardTitle className="flex items-center gap-2 text-purple-600">
            <span className="text-xl">👩‍🏫</span>
            Virtual Classroom
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative aspect-[16/9] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl overflow-hidden border border-purple-200/30 flex flex-wrap gap-6 justify-center items-center">
            <AnimatePresence>
              {students.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    y: [0, -15, 0],
                    boxShadow: student.isPresent
                      ? ["0 0 0px #22c55e", "0 0 20px #22c55e", "0 0 0px #22c55e"]
                      : "none",
                    borderColor: student.isPresent ? "#22c55e" : "#ef4444"
                  }}
                  transition={{
                    delay: index * 0.05,
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="flex flex-col items-center w-24"
                >
                  <div className={`w-20 h-20 rounded-full border-4 overflow-hidden relative flex items-center justify-center ${student.isPresent ? "border-green-500" : "border-red-500"}`}>
                    <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                    {scanningStudent === student.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 bg-blue-500/20 backdrop-blur-sm"
                      />
                    )}
                  </div>
                  <div className="mt-2 text-xs font-medium text-center">
                    {student.name}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* --- Attendance Summary --- */}
      <Card className="border-2 border-green-200 dark:border-green-800">
        <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-950/30 dark:to-emerald-950/30">
          <CardTitle className="flex items-center gap-2 text-green-600">
            <span className="text-xl">📊</span>
            Attendance Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {students.map(student => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className={`p-3 rounded-lg border-2 ${student.isPresent
                  ? 'border-green-300 bg-green-50 dark:bg-green-950/30'
                  : 'border-red-300 bg-red-50 dark:bg-red-950/30'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{student.name}</div>
                    <div className="text-xs text-foreground/70">
                      {student.isPresent
                        ? `Present at ${student.markTime?.toLocaleTimeString()}`
                        : 'Absent'}
                    </div>
                  </div>
                  <Badge variant={student.isPresent ? "default" : "destructive"}
                    className={student.isPresent ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                    {student.isPresent ? "Present" : "Absent"}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
