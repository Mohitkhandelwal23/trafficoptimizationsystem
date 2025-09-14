import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Eye,
  Car,
  Truck,
  Bike,
  User,
  AlertTriangle,
  Zap,
  BarChart3
} from 'lucide-react';

export function DemoLivestream() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [detections, setDetections] = useState({
    cars: 23,
    trucks: 3,
    bikes: 15,
    pedestrians: 8
  });
  const [violations, setViolations] = useState(2);
  const [queueLength, setQueueLength] = useState(45);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDetections(prev => ({
        cars: Math.max(0, prev.cars + Math.floor(Math.random() * 6) - 3),
        trucks: Math.max(0, prev.trucks + Math.floor(Math.random() * 3) - 1),
        bikes: Math.max(0, prev.bikes + Math.floor(Math.random() * 8) - 4),
        pedestrians: Math.max(0, prev.pedestrians + Math.floor(Math.random() * 4) - 2)
      }));
      setViolations(Math.max(0, violations + Math.floor(Math.random() * 2) - 1));
      setQueueLength(Math.max(0, queueLength + Math.floor(Math.random() * 10) - 5));
    }, 3000);

    return () => clearInterval(interval);
  }, [violations, queueLength]);

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main Video Feed */}
      <div className="lg:col-span-2">
        <Card className="p-6 border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Connaught Place Junction</h3>
              <p className="text-sm text-muted-foreground">New Delhi • Live Demo</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium">LIVE DEMO</span>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative bg-black rounded-lg overflow-hidden aspect-video mb-4">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1695902173528-0b15104c4554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwY29tcHV0ZXIlMjB2aXNpb258ZW58MXx8fHwxNzU3NzQwMjcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Demo Traffic Feed"
              className="w-full h-full object-cover"
            />
            
            {/* AI Detection Overlays */}
            <div className="absolute inset-0">
              {/* Simulated bounding boxes */}
              <div className="absolute top-1/4 left-1/3 w-16 h-12 border-2 border-primary bg-primary/10 rounded animate-pulse">
                <div className="absolute -top-6 left-0 bg-primary text-white text-xs px-2 py-1 rounded">
                  Car 0.95
                </div>
              </div>
              <div className="absolute top-1/2 right-1/4 w-12 h-8 border-2 border-secondary bg-secondary/10 rounded animate-pulse">
                <div className="absolute -top-6 left-0 bg-secondary text-black text-xs px-2 py-1 rounded">
                  Bike 0.87
                </div>
              </div>
              <div className="absolute bottom-1/3 left-1/4 w-20 h-16 border-2 border-yellow-400 bg-yellow-400/10 rounded animate-pulse">
                <div className="absolute -top-6 left-0 bg-yellow-400 text-black text-xs px-2 py-1 rounded">
                  Truck 0.92
                </div>
              </div>
              <div className="absolute top-3/4 right-1/3 w-8 h-16 border-2 border-purple-400 bg-purple-400/10 rounded animate-pulse">
                <div className="absolute -top-6 left-0 bg-purple-400 text-white text-xs px-2 py-1 rounded">
                  Person 0.89
                </div>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>

                  <Badge variant="destructive" className="animate-pulse">
                    ● LIVE AI DETECTION
                  </Badge>
                </div>

                <div className="text-white text-sm">
                  YOLOv8 Detection Active
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Real-time AI vehicle detection and traffic analysis demo
          </div>
        </Card>
      </div>

      {/* Live Analytics */}
      <div className="space-y-4">
        <Card className="p-4 border-border/50">
          <h4 className="font-semibold mb-4 flex items-center">
            <Eye className="w-4 h-4 mr-2 text-primary" />
            Live Detections
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Car className="w-4 h-4 text-blue-400" />
                <span className="text-sm">Cars</span>
              </div>
              <Badge variant="secondary" className="animate-pulse">{detections.cars}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">Trucks</span>
              </div>
              <Badge variant="secondary" className="animate-pulse">{detections.trucks}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bike className="w-4 h-4 text-green-400" />
                <span className="text-sm">Bikes</span>
              </div>
              <Badge variant="secondary" className="animate-pulse">{detections.bikes}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-purple-400" />
                <span className="text-sm">Pedestrians</span>
              </div>
              <Badge variant="secondary" className="animate-pulse">{detections.pedestrians}</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-border/50">
          <h4 className="font-semibold mb-4 flex items-center">
            <BarChart3 className="w-4 h-4 mr-2 text-secondary" />
            Traffic Metrics
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Queue Length</span>
              <span className="text-sm font-medium animate-pulse">{queueLength}m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Congestion</span>
              <span className="text-sm font-medium text-red-400">HIGH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Total Vehicles</span>
              <span className="text-sm font-medium animate-pulse">
                {Object.values(detections).reduce((a, b) => a + b, 0)}
              </span>
            </div>
          </div>
        </Card>

        {violations > 0 && (
          <Card className="p-4 border-destructive/50 bg-destructive/5">
            <h4 className="font-semibold mb-4 flex items-center text-destructive">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Live Violations
            </h4>
            <div className="space-y-2">
              <div className="text-sm">
                <Badge variant="destructive" className="mb-1 animate-pulse">Signal Jump</Badge>
                <div className="text-xs text-muted-foreground">
                  Vehicle crossed on red signal
                </div>
              </div>
              {violations > 1 && (
                <div className="text-sm">
                  <Badge variant="destructive" className="mb-1 animate-pulse">Wrong Lane</Badge>
                  <div className="text-xs text-muted-foreground">
                    Vehicle in opposite direction
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        <Card className="p-4 border-border/50">
          <h4 className="font-semibold mb-4 flex items-center">
            <Zap className="w-4 h-4 mr-2 text-yellow-400" />
            AI Recommendations
          </h4>
          <div className="space-y-2 text-sm">
            <div className="p-2 bg-primary/10 rounded border border-primary/20 animate-pulse">
              <div className="font-medium text-primary">Extend Green Phase</div>
              <div className="text-xs text-muted-foreground">
                High vehicle density detected. Recommend +15s green time.
              </div>
            </div>
            <div className="p-2 bg-secondary/10 rounded border border-secondary/20 animate-pulse">
              <div className="font-medium text-secondary">Pedestrian Priority</div>
              <div className="text-xs text-muted-foreground">
                Pedestrians waiting. Consider walk signal activation.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}