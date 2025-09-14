import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Eye, 
  Brain, 
  Zap, 
  Shield, 
  FileCheck, 
  MapPin, 
  Users, 
  Github, 
  Linkedin, 
  Mail,
  Play,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Camera,
  Car
} from 'lucide-react';

interface LandingPageProps {
  onNavigateToLogin: () => void;
  onNavigateToDemo: () => void;
}

export function LandingPage({ onNavigateToLogin, onNavigateToDemo }: LandingPageProps) {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">Netra</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Features', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.toLowerCase() ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={onNavigateToDemo} className="hidden sm:flex">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
              <Button onClick={onNavigateToLogin} className="glow-primary">
                Admin Login
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  🚀 Hackathon MVP • Live Demo Ready
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  AI Traffic Optimization for Smarter Cities
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Netra combines real-time video analytics, predictive AI, and automated signal control 
                  to reduce traffic congestion by up to 40% in Indian cities.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={onNavigateToDemo} className="glow-primary">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Live Demo
                </Button>
                <Button size="lg" variant="outline" onClick={onNavigateToLogin}>
                  Access Admin Panel
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">40%</div>
                  <div className="text-sm text-muted-foreground">Congestion Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">95%</div>
                  <div className="text-sm text-muted-foreground">Detection Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">30%</div>
                  <div className="text-sm text-muted-foreground">Faster Signal Response</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden glow-primary">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1753164886859-418da16e3474?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGNpdHklMjB0cmFmZmljJTIwbGlnaHRzJTIwdXJiYW4lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NzgzNjQwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Smart City Traffic Technology"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm font-medium">Live AI Analysis Running</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-card/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Traffic Intelligence Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From computer vision to automated enforcement, Netra provides end-to-end traffic optimization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Core Features */}
            <Card className="p-6 border-border/50 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Vehicle Detection</h3>
              <p className="text-muted-foreground">YOLOv8-powered real-time detection with 95% accuracy across Indian traffic conditions.</p>
            </Card>

            <Card className="p-6 border-border/50 hover:border-secondary/50 transition-colors">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Density Calculation</h3>
              <p className="text-muted-foreground">Real-time traffic density analysis for optimal signal timing decisions.</p>
            </Card>

            <Card className="p-6 border-border/50 hover:border-green-400/50 transition-colors">
              <div className="w-12 h-12 bg-green-400/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Smart Signal Timing</h3>
              <p className="text-muted-foreground">AI-driven signal optimization reducing wait times by 30%.</p>
            </Card>

            <Card className="p-6 border-border/50 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Simulation Dashboard</h3>
              <p className="text-muted-foreground">Interactive what-if scenarios and AI optimization previews.</p>
            </Card>

            <Card className="p-6 border-border/50 hover:border-secondary/50 transition-colors">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">E-Challan System</h3>
              <p className="text-muted-foreground">Automated violation detection with human-in-the-loop approval workflow.</p>
            </Card>

            <Card className="p-6 border-border/50 hover:border-green-400/50 transition-colors">
              <div className="w-12 h-12 bg-green-400/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Live City Map</h3>
              <p className="text-muted-foreground">Real-time traffic visualization across multiple junctions.</p>
            </Card>
          </div>

          {/* Advanced Features */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-12">Advanced Capabilities</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, title: 'Emergency Preemption', desc: 'Priority signals for ambulances' },
                { icon: Brain, title: 'Predictive Modeling', desc: 'Traffic pattern forecasting' },
                { icon: Camera, title: 'Multi-Junction Sync', desc: 'Coordinated signal networks' },
                { icon: Car, title: 'Pedestrian Detection', desc: 'Safe crossing optimization' }
              ].map((feature, index) => (
                <Card key={index} className="p-4 text-center border-border/50">
                  <feature.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Preview */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                See Netra in Action
              </h2>
              <p className="text-xl text-muted-foreground">
                Watch our AI detect vehicles, calculate traffic density, and optimize signal timings 
                in real-time on Indian roads.
              </p>
              
              <div className="space-y-4">
                {[
                  'Real-time YOLOv8 vehicle detection overlays',
                  'Live traffic density heat maps',
                  'AI signal optimization recommendations',
                  'Before/after performance analytics'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" onClick={onNavigateToDemo} className="glow-primary">
                <Play className="w-5 h-5 mr-2" />
                Launch Full Demo
              </Button>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-border glow-secondary">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1561565824-3b777e0452e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFmZmljJTIwbW9uaXRvcmluZyUyMGRhc2hib2FyZCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU3ODM2NDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Traffic Monitoring Dashboard"
                  className="w-full h-[350px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <Button 
                  onClick={onNavigateToDemo}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glow-primary"
                  size="lg"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Play Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Solving India's Traffic Crisis with AI
            </h2>
            <p className="text-xl text-muted-foreground">
              Built for Indian cities, by innovators who understand the unique challenges 
              of mixed traffic, diverse vehicle types, and complex intersection layouts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 text-center border-border/50">
              <div className="text-3xl font-bold text-primary mb-2">2.5M+</div>
              <div className="text-muted-foreground">Vehicles detected daily</div>
            </Card>
            <Card className="p-6 text-center border-border/50">
              <div className="text-3xl font-bold text-secondary mb-2">15+</div>
              <div className="text-muted-foreground">Cities ready for deployment</div>
            </Card>
            <Card className="p-6 text-center border-border/50">
              <div className="text-3xl font-bold text-green-400 mb-2">40%</div>
              <div className="text-muted-foreground">Average congestion reduction</div>
            </Card>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-bold mb-4">The Problem</h3>
            <p className="text-muted-foreground mb-6">
              Indian cities lose ₹1.47 lakh crores annually due to traffic congestion. Traditional 
              fixed-time signals can't adapt to dynamic traffic patterns, leading to unnecessary delays, 
              increased pollution, and frustrated commuters.
            </p>
            
            <h3 className="text-2xl font-bold mb-4">Our Solution</h3>
            <p className="text-muted-foreground">
              Netra uses computer vision and AI to understand traffic in real-time, automatically 
              optimizing signal timings while maintaining safety. Our system learns from traffic 
              patterns and continuously improves performance.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your City's Traffic?
            </h2>
            <p className="text-xl text-muted-foreground">
              Get in touch with our team to discuss deployment and customization for your city.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-border/50">
              <h3 className="text-xl font-bold mb-6">Connect with the Team</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>team@netra.ai</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Github className="w-5 h-5 text-primary" />
                  <span>github.com/netra-ai</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Linkedin className="w-5 h-5 text-primary" />
                  <span>linkedin.com/company/netra-ai</span>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-border/50">
              <h3 className="text-xl font-bold mb-6">Quick Demo Access</h3>
              <p className="text-muted-foreground mb-6">
                Skip the wait - access our live demo environment and see Netra in action immediately.
              </p>
              <div className="space-y-3">
                <Button onClick={onNavigateToDemo} className="w-full glow-primary">
                  <Play className="w-4 h-4 mr-2" />
                  Launch Interactive Demo
                </Button>
                <Button onClick={onNavigateToLogin} variant="outline" className="w-full">
                  Admin Panel Access
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Netra</span>
              <Badge variant="secondary">Hackathon MVP</Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 Netra AI. Built for smarter cities.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}