import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { motion } from 'motion/react';

interface PeerChallenge {
  id: string;
  title: string;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  creator: {
    name: string;
    avatar: string;
    level: number;
  };
  participants: number;
  timeLimit: number;
  questions: number;
  xpReward: number;
  status: 'active' | 'completed' | 'upcoming';
}

interface StudyNote {
  id: string;
  title: string;
  subject: string;
  author: {
    name: string;
    avatar: string;
    rating: number;
  };
  downloads: number;
  rating: number;
  preview: string;
  tags: string[];
  xpEarned: number;
}

interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  members: {
    name: string;
    avatar: string;
    role: 'leader' | 'member';
  }[];
  nextSession: string;
  topic: string;
  isJoined: boolean;
}

export function PeerLearning() {
  const [activeTab, setActiveTab] = useState<'challenges' | 'notes' | 'groups'>('challenges');
  const [showCreateChallenge, setShowCreateChallenge] = useState(false);
  const [showShareNotes, setShowShareNotes] = useState(false);

  const peerChallenges: PeerChallenge[] = [
    {
      id: '1',
      title: 'Algebra Speedrun Challenge',
      subject: 'Mathematics',
      difficulty: 'Medium',
      creator: { name: 'Sarah Chen', avatar: '/student-sarah.jpg', level: 15 },
      participants: 12,
      timeLimit: 15,
      questions: 10,
      xpReward: 150,
      status: 'active'
    },
    {
      id: '2',
      title: 'Physics Formula Quiz',
      subject: 'Physics',
      difficulty: 'Hard',
      creator: { name: 'Alex Kumar', avatar: '/student-alex.jpg', level: 22 },
      participants: 8,
      timeLimit: 20,
      questions: 15,
      xpReward: 250,
      status: 'active'
    },
    {
      id: '3',
      title: 'History Timeline Challenge',
      subject: 'History',
      difficulty: 'Easy',
      creator: { name: 'Emma Wilson', avatar: '/student-emma.jpg', level: 11 },
      participants: 18,
      timeLimit: 10,
      questions: 8,
      xpReward: 100,
      status: 'upcoming'
    }
  ];

  const studyNotes: StudyNote[] = [
    {
      id: '1',
      title: 'Calculus Derivatives Simplified',
      subject: 'Mathematics',
      author: { name: 'David Kim', avatar: '/student-david.jpg', rating: 4.9 },
      downloads: 234,
      rating: 4.8,
      preview: 'Comprehensive guide to understanding derivatives with step-by-step examples...',
      tags: ['calculus', 'derivatives', 'step-by-step'],
      xpEarned: 89
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      author: { name: 'Lisa Wang', avatar: '/student-lisa.jpg', rating: 4.7 },
      downloads: 156,
      rating: 4.6,
      preview: 'Visual guide to common organic chemistry reactions with mechanisms...',
      tags: ['organic chemistry', 'reactions', 'visual'],
      xpEarned: 124
    },
    {
      id: '3',
      title: 'World War II Timeline',
      subject: 'History',
      author: { name: 'Carlos Rodriguez', avatar: '/student-carlos.jpg', rating: 4.5 },
      downloads: 189,
      rating: 4.4,
      preview: 'Interactive timeline of major WWII events with detailed explanations...',
      tags: ['WWII', 'timeline', 'interactive'],
      xpEarned: 67
    }
  ];

  const studyGroups: StudyGroup[] = [
    {
      id: '1',
      name: 'Advanced Physics Study Circle',
      subject: 'Physics',
      members: [
        { name: 'Sarah Chen', avatar: '/student-sarah.jpg', role: 'leader' },
        { name: 'Mike Johnson', avatar: '/student-mike.jpg', role: 'member' },
        { name: 'Ana Garcia', avatar: '/student-ana.jpg', role: 'member' },
        { name: 'Tom Wilson', avatar: '/student-tom.jpg', role: 'member' }
      ],
      nextSession: 'Tomorrow 4:00 PM',
      topic: 'Quantum Mechanics Basics',
      isJoined: true
    },
    {
      id: '2',
      name: 'Calculus Problem Solvers',
      subject: 'Mathematics',
      members: [
        { name: 'David Kim', avatar: '/student-david.jpg', role: 'leader' },
        { name: 'Emma Thompson', avatar: '/student-emma2.jpg', role: 'member' },
        { name: 'Ryan Lee', avatar: '/student-ryan.jpg', role: 'member' }
      ],
      nextSession: 'Friday 3:30 PM',
      topic: 'Integration Techniques',
      isJoined: false
    },
    {
      id: '3',
      name: 'Literature Discussion Group',
      subject: 'English',
      members: [
        { name: 'Sophia Martinez', avatar: '/student-sophia.jpg', role: 'leader' },
        { name: 'James Brown', avatar: '/student-james.jpg', role: 'member' },
        { name: 'Nina Patel', avatar: '/student-nina.jpg', role: 'member' },
        { name: 'Oliver Davis', avatar: '/student-oliver.jpg', role: 'member' },
        { name: 'Zoe Anderson', avatar: '/student-zoe.jpg', role: 'member' }
      ],
      nextSession: 'Monday 5:00 PM',
      topic: 'Shakespeare Analysis',
      isJoined: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const joinChallenge = (challengeId: string) => {
    // In a real app, this would send a request to join the challenge
    alert(`🎯 Joined challenge! Get ready to compete and earn XP!`);
  };

  const downloadNotes = (noteId: string) => {
    // In a real app, this would download the study notes
    alert(`📚 Notes downloaded! You earned 5 XP for downloading peer-shared content.`);
  };

  const joinStudyGroup = (groupId: string) => {
    // In a real app, this would send a request to join the study group
    alert(`👥 Study group join request sent! You'll be notified when accepted.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
          Peer Learning Hub
        </h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Learn together, compete with peers, and share knowledge to earn XP and strengthen your understanding
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[
          { id: 'challenges', label: '🎯 Peer Challenges', count: peerChallenges.length },
          { id: 'notes', label: '📚 Shared Notes', count: studyNotes.length },
          { id: 'groups', label: '👥 Study Groups', count: studyGroups.length }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'outline'}
            onClick={() => setActiveTab(tab.id as any)}
            className="relative"
          >
            {tab.label}
            <Badge variant="secondary" className="ml-2 text-xs">
              {tab.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl mb-2">🏆</div>
            <div className="text-xl font-bold text-orange-600 mb-1">1,240</div>
            <div className="text-xs text-foreground/70">XP from Peer Learning</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-xl font-bold text-blue-600 mb-1">15</div>
            <div className="text-xs text-foreground/70">Challenges Won</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl mb-2">📚</div>
            <div className="text-xl font-bold text-green-600 mb-1">23</div>
            <div className="text-xs text-foreground/70">Notes Shared</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl mb-2">⭐</div>
            <div className="text-xl font-bold text-purple-600 mb-1">4.8</div>
            <div className="text-xs text-foreground/70">Peer Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Peer Challenges Tab */}
      {activeTab === 'challenges' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Active Peer Challenges</h3>
            <Dialog open={showCreateChallenge} onOpenChange={setShowCreateChallenge}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white">
                  <span className="mr-2">⚡</span>
                  Create Challenge
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Peer Challenge</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Challenge title" />
                  <select className="w-full p-2 border border-border rounded-lg bg-background">
                    <option>Select Subject</option>
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>History</option>
                  </select>
                  <select className="w-full p-2 border border-border rounded-lg bg-background">
                    <option>Select Difficulty</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                  <Button className="w-full">Create Challenge</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {peerChallenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="h-full border-2 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg leading-tight">{challenge.title}</CardTitle>
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="w-fit text-xs">
                      {challenge.subject}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={challenge.creator.avatar} />
                        <AvatarFallback className="bg-orange-100 text-orange-600 text-xs">
                          {challenge.creator.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{challenge.creator.name}</div>
                        <div className="text-xs text-foreground/60">Level {challenge.creator.level}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <span>👥</span>
                        <span>{challenge.participants} participants</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>⏱️</span>
                        <span>{challenge.timeLimit} minutes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>❓</span>
                        <span>{challenge.questions} questions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>⭐</span>
                        <span>{challenge.xpReward} XP</span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => joinChallenge(challenge.id)}
                      disabled={challenge.status !== 'active'}
                      className="w-full bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white"
                    >
                      {challenge.status === 'active' ? 'Join Challenge' : 
                       challenge.status === 'upcoming' ? 'Starting Soon' : 'Completed'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Shared Notes Tab */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Community Study Notes</h3>
            <Dialog open={showShareNotes} onOpenChange={setShowShareNotes}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                  <span className="mr-2">📝</span>
                  Share Notes
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Share Study Notes</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Notes title" />
                  <select className="w-full p-2 border border-border rounded-lg bg-background">
                    <option>Select Subject</option>
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>History</option>
                  </select>
                  <Textarea placeholder="Brief description or preview..." rows={3} />
                  <Input placeholder="Tags (comma separated)" />
                  <Button className="w-full">Share Notes</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyNotes.map((note) => (
              <motion.div
                key={note.id}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="h-full border-2 hover:border-green-300 dark:hover:border-green-700 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg leading-tight">{note.title}</CardTitle>
                    <Badge variant="outline" className="w-fit text-xs">
                      {note.subject}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={note.author.avatar} />
                        <AvatarFallback className="bg-green-100 text-green-600 text-xs">
                          {note.author.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{note.author.name}</div>
                        <div className="flex items-center gap-1 text-xs text-foreground/60">
                          <span>⭐</span>
                          <span>{note.author.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-foreground/70 line-clamp-2">{note.preview}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {note.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between text-xs text-foreground/60">
                      <span>📥 {note.downloads} downloads</span>
                      <span>⭐ {note.rating}/5</span>
                    </div>
                    
                    <Button
                      onClick={() => downloadNotes(note.id)}
                      variant="outline"
                      className="w-full border-green-300 hover:bg-green-50 dark:border-green-700 dark:hover:bg-green-950/30"
                    >
                      <span className="mr-2">📚</span>
                      Download (+5 XP)
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Study Groups Tab */}
      {activeTab === 'groups' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Study Groups</h3>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
              <span className="mr-2">➕</span>
              Create Group
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studyGroups.map((group) => (
              <motion.div
                key={group.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className={`h-full border-2 transition-all duration-300 ${
                  group.isJoined ? 
                    'border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-950/20' :
                    'hover:border-purple-300 dark:hover:border-purple-700'
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg leading-tight">{group.name}</CardTitle>
                      {group.isJoined && (
                        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                          Joined
                        </Badge>
                      )}
                    </div>
                    <Badge variant="outline" className="w-fit text-xs">
                      {group.subject}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex -space-x-2">
                      {group.members.slice(0, 4).map((member, index) => (
                        <Avatar key={index} className="w-8 h-8 border-2 border-background">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {group.members.length > 4 && (
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 border-2 border-background rounded-full flex items-center justify-center text-xs">
                          +{group.members.length - 4}
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span>📅</span>
                        <span>{group.nextSession}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📖</span>
                        <span>{group.topic}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>👥</span>
                        <span>{group.members.length} members</span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => group.isJoined ? null : joinStudyGroup(group.id)}
                      className={`w-full ${
                        group.isJoined ? 
                          'bg-blue-600 hover:bg-blue-700' :
                          'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                      } text-white`}
                      disabled={group.isJoined}
                    >
                      {group.isJoined ? 'View Group' : 'Request to Join'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">🏆</span>
            Peer Learning Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { rank: 1, name: 'Sarah Chen', avatar: '/student-sarah.jpg', xp: 2450, badge: '🥇' },
              { rank: 2, name: 'Alex Kumar', avatar: '/student-alex.jpg', xp: 2380, badge: '🥈' },
              { rank: 3, name: 'Emma Wilson', avatar: '/student-emma.jpg', xp: 2290, badge: '🥉' },
              { rank: 4, name: 'David Kim', avatar: '/student-david.jpg', xp: 2180, badge: '4️⃣' },
              { rank: 5, name: 'You', avatar: '/your-avatar.jpg', xp: 2120, badge: '5️⃣' }
            ].map((student) => (
              <div
                key={student.rank}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  student.name === 'You' ? 
                    'bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800' :
                    'bg-gray-50 dark:bg-gray-900/50'
                }`}
              >
                <span className="text-lg">{student.badge}</span>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={student.avatar} />
                  <AvatarFallback className="bg-orange-100 text-orange-600">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">{student.name}</div>
                  <div className="text-sm text-foreground/60">{student.xp} XP</div>
                </div>
                {student.name === 'You' && (
                  <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    You
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}