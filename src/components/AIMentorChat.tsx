import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { motion } from 'motion/react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export function AIMentorChat({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI Learning Mentor. I can help you with study tips, career guidance, and personalized learning recommendations. What would you like to explore today?',
      timestamp: new Date(),
      suggestions: ['Study Tips', 'Career Guidance', 'Subject Help', 'Time Management']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(text);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): Message => {
    const responses = {
      'study tips': {
        content: "Here are some effective study techniques:\n\n1. **Pomodoro Technique**: 25min focused study + 5min break\n2. **Active Recall**: Test yourself instead of just re-reading\n3. **Spaced Repetition**: Review material at increasing intervals\n4. **Mind Mapping**: Visualize connections between concepts\n\nWould you like me to create a personalized study plan for you?",
        suggestions: ['Create Study Plan', 'Time Management', 'Subject-specific Tips']
      },
      'career guidance': {
        content: "Let's explore your career path! Based on your academic performance, here are some insights:\n\n📊 **Your Strengths**: Mathematics, Science\n🎯 **Recommended Fields**: Engineering, Data Science, Research\n💡 **Skills to Develop**: Programming, Critical Thinking\n\nI can help you create a roadmap to achieve your goals!",
        suggestions: ['View Career Roadmap', 'Skills Assessment', 'Course Recommendations']
      },
      'time management': {
        content: "Time management is crucial for academic success! Here's your personalized schedule:\n\n⏰ **Peak Learning Hours**: 9-11 AM, 7-9 PM\n📅 **Weekly Goal**: 25 hours of focused study\n🎯 **Priority Tasks**: Upcoming Math exam prep\n\nLet me help you optimize your daily schedule!",
        suggestions: ['Create Schedule', 'Set Reminders', 'Track Progress']
      },
      'default': {
        content: "I understand you're asking about that topic. Based on your learning pattern and current subjects, I recommend focusing on understanding the fundamentals first. Would you like me to break this down into smaller, manageable steps?",
        suggestions: ['Break Down Topic', 'Find Resources', 'Practice Questions']
      }
    };

    const lowerInput = userInput.toLowerCase();
    let responseKey = 'default';
    
    if (lowerInput.includes('study') || lowerInput.includes('tip')) responseKey = 'study tips';
    else if (lowerInput.includes('career') || lowerInput.includes('job')) responseKey = 'career guidance';
    else if (lowerInput.includes('time') || lowerInput.includes('schedule')) responseKey = 'time management';

    const response = responses[responseKey as keyof typeof responses];

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: response.content,
      timestamp: new Date(),
      suggestions: response.suggestions
    };
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col bg-white/95 dark:bg-black/95 backdrop-blur-xl border-2 border-white/20 dark:border-white/10">
        <CardHeader className="pb-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    🤖
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-lg">AI Learning Mentor</h3>
                <p className="text-xs text-foreground/60">Always here to help</p>
              </div>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30"
            >
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* AI Suggestions */}
            {messages.length > 0 && messages[messages.length - 1].type === 'ai' && messages[messages.length - 1].suggestions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-2 pl-4"
              >
                {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-100 hover:border-blue-300 dark:hover:bg-blue-900/30 transition-colors text-xs"
                    onClick={() => handleSendMessage(suggestion)}
                  >
                    {suggestion}
                  </Badge>
                ))}
              </motion.div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border/50">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about your studies..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(inputMessage);
                  }
                }}
                className="flex-1 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
              />
              <Button
                onClick={() => handleSendMessage(inputMessage)}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6"
              >
                <span className="text-lg">🚀</span>
              </Button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-2">
              {['Study Plan', 'Quiz Me', 'Explain Topic', 'Motivate Me'].map((action) => (
                <Badge
                  key={action}
                  variant="secondary"
                  className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-xs"
                  onClick={() => handleSendMessage(action)}
                >
                  {action}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Floating AI Mentor Button Component
export function AIMentorButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <Button
        onClick={onClick}
        className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform group p-0 relative overflow-hidden"
      >
        {/* Pulsing glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full animate-ping opacity-20"></div>
        
        {/* AI Brain Icon */}
        <div className="relative z-10 flex items-center justify-center">
          <span className="text-2xl group-hover:scale-110 transition-transform">🧠</span>
        </div>
        
        {/* Floating particles */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-500 opacity-60"></div>
      </Button>
      
      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        AI Learning Mentor
      </div>
    </motion.div>
  );
}