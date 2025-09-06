import { useState } from 'react';
import { Button } from './ui/button';
// Using simple icons instead of lucide-react to avoid import errors

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function Navigation({ darkMode, toggleDarkMode }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { icon: '📊', label: 'Dashboard', href: '#dashboard' },
    { icon: '📚', label: 'Attendance', href: '#attendance' },
    { icon: '📅', label: 'Timetable', href: '#timetable' },
    { icon: '🏆', label: 'Rewards', href: '#rewards' },
    { icon: '👥', label: 'Activities', href: '#activities' },
    { icon: '👤', label: 'Profile', href: '#profile' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">📚</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SmartEdu
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="flex items-center space-x-1 text-foreground/70 hover:text-foreground transition-colors"
              >
                <span className="text-sm">{link.icon}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          {/* Dark Mode Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2"
            >
              {darkMode ? <span className="text-sm">☀️</span> : <span className="text-sm">🌙</span>}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <span className="text-sm">✕</span> : <span className="text-sm">☰</span>}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-sm">{link.icon}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}