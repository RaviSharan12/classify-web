import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function HeroSection() {
  const [quotePhase, setQuotePhase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasFinishedCycling, setHasFinishedCycling] = useState(false);

  const quotes = [
    '"Education is the most powerful weapon which you can use to change the world."',
    '"The future belongs to those who learn more skills and combine them creatively."',
    '"Smart learning creates smarter futures."'
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setQuotePhase((prev) => {
        const nextPhase = prev + 1;
        // Stop cycling after showing all quotes and the final content
        if (nextPhase > quotes.length) {
          setHasFinishedCycling(true);
          return quotes.length; // Stay at final phase
        }
        return nextPhase;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background with enhanced glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/40 via-cyan-50/30 to-fuchsia-50/40 dark:from-violet-950/40 dark:via-cyan-950/30 dark:to-fuchsia-950/40">
        {/* Enhanced Floating Elements with better animations */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-40 left-20 w-28 h-28 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-2xl animate-float-reverse"></div>
        
        {/* New floating geometric shapes */}
        <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-blue-500/30 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-2/3 right-1/4 w-8 h-8 bg-purple-500/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-3/4 w-4 h-4 bg-pink-500/30 animate-bounce"></div>
      </div>

      {/* Enhanced Grid Pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-15">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139,69,255,0.3) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      {/* Content with morphing animation */}
      <div className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Morphing Quote Section */}
        <div className="mb-12 min-h-[120px] flex items-center justify-center">
          {!hasFinishedCycling && quotePhase < quotes.length ? (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl blur-xl"></div>
              <blockquote className={`text-lg sm:text-xl md:text-2xl italic text-foreground/80 max-w-4xl mx-auto leading-relaxed p-6 rounded-2xl bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-white/10 transition-all duration-1000 opacity-100 scale-100`}>
                {quotes[quotePhase]}
                <cite className="block mt-4 text-sm text-foreground/60 not-italic">- Nelson Mandela</cite>
              </blockquote>
            </div>
          ) : (
            // Dashboard preview morphs in and stays
            <div className={`transition-all duration-1000 opacity-100 scale-100`}>
              <div className="mb-8">
                <Badge variant="secondary" className="mb-4 px-6 py-3 text-base bg-gradient-to-r from-blue-100/80 to-purple-100/80 dark:from-blue-900/50 dark:to-purple-900/50 border-0 backdrop-blur-sm">
                  🚀 SIH 2025 - Next Generation Education
                </Badge>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                SmartEdu
              </h1>
              
              <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-foreground/80 leading-relaxed">
                Revolutionizing Education with AI-Powered
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                  Smart Curriculum & Attendance
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Main content appears after quote morphing and stays visible */}
        <div className={`transition-all duration-1000 delay-500 ${hasFinishedCycling || quotePhase === quotes.length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-lg text-foreground/70 mb-12 max-w-4xl mx-auto leading-relaxed">
            Experience the future of learning with gamified attendance tracking, AI-powered insights, 
            and personalized curriculum management designed for the digital age.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 px-10 py-7 text-lg rounded-2xl group">
              <span className="mr-2 group-hover:scale-110 transition-transform">🎯</span>
              Start Learning Journey
            </Button>
            <Button size="lg" variant="outline" className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-10 py-7 text-lg border-2 rounded-2xl group bg-white/10 dark:bg-black/10 backdrop-blur-sm">
              <span className="mr-2 group-hover:rotate-12 transition-transform">📱</span>
              Try Demo Mode
            </Button>
          </div>
          
          {/* Enhanced Statistics with animations */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "10K+", label: "Active Students", color: "blue", icon: "👨‍🎓" },
              { number: "500+", label: "Partner Schools", color: "purple", icon: "🏫" },
              { number: "95%", label: "Attendance Rate", color: "green", icon: "📊" },
              { number: "4.9★", label: "User Rating", color: "pink", icon: "⭐" }
            ].map((stat, index) => (
              <div key={index} className={`text-center p-6 rounded-2xl bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 hover:scale-105 transition-all duration-300 group animate-fade-in-up`} style={{ animationDelay: `${index * 200}ms` }}>
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className={`text-2xl md:text-3xl font-bold ${stat.color === 'blue' ? 'text-blue-600' : stat.color === 'purple' ? 'text-purple-600' : stat.color === 'green' ? 'text-emerald-600' : 'text-pink-600'} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-sm text-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-gradient-to-b from-blue-500 to-purple-500 rounded-full flex justify-center bg-white/10 dark:bg-black/10 backdrop-blur-sm">
          <div className="w-2 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>


    </section>
  );
}