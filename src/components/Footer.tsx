// Using simple icons instead of lucide-react to avoid import errors

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-background via-muted/20 to-accent/30 border-t border-border/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Quote */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">📚</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SmartEdu
              </span>
            </div>
            
            <blockquote className="text-lg italic text-foreground/80 border-l-4 border-blue-500 pl-4">
              "Education is the lighting of a fire, not the filling of a vessel."
            </blockquote>
            <p className="text-sm text-foreground/60">- William Butler Yeats</p>
            
            <p className="text-foreground/70 leading-relaxed">
              Transforming education through smart technology, gamification, and student engagement.
              Join thousands of students and teachers on their learning journey.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <nav className="space-y-2">
              <a href="#about" className="block text-foreground/70 hover:text-foreground transition-colors hover:translate-x-1 transform duration-200">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 text-center">ℹ️</span>
                  About SmartEdu
                </div>
              </a>
              <a href="#contact" className="block text-foreground/70 hover:text-foreground transition-colors hover:translate-x-1 transform duration-200">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 text-center">📧</span>
                  Contact Support
                </div>
              </a>
              <a href="#privacy" className="block text-foreground/70 hover:text-foreground transition-colors hover:translate-x-1 transform duration-200">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 text-center">🛡️</span>
                  Privacy Policy
                </div>
              </a>
            </nav>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Features</h3>
            <div className="space-y-2 text-sm text-foreground/70">
              <div>✨ Smart Attendance Tracking</div>
              <div>🎯 Gamified Learning Experience</div>
              <div>📊 Real-time Analytics</div>
              <div>🏆 Achievement System</div>
              <div>📱 Mobile-Responsive Design</div>
              <div>🔔 Smart Notifications</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-foreground/60">
              © {currentYear} SmartEdu. Built with{' '}
              <span className="inline text-red-500 mx-1">❤️</span>
              for better education.
            </p>
            
            <div className="flex items-center gap-6 text-sm text-foreground/60">
              <span>SIH25011 - Smart Curriculum & Attendance</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>System Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}