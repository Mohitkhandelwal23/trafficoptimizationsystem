import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Camera, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Settings,
  Eye,
  Zap,
  AlertTriangle,
  Car,
  Truck,
  Bike,
  User,
  BarChart3,
  Brain,
  Clock,
  Lightbulb
} from 'lucide-react';

interface CameraFeed {
  id: string;
  name: string;
  location: string;
  status: 'live' | 'offline' | 'recording';
  streamUrl?: string;
  detections: {
    cars: number;
    trucks: number;
    bikes: number;
    pedestrians: number;
  };
  violations: number;
  queueLength: number;
  congestionLevel: 'low' | 'medium' | 'high';
  avgWaitTime: number;
  throughput: number;
}

export function LiveTraffic() {
  const [cameras] = useState<CameraFeed[]>([
    {
      id: 'cam-001',
      name: 'Connaught Place Junction',
      location: 'New Delhi',
      status: 'live',
      detections: { cars: 23, trucks: 3, bikes: 15, pedestrians: 8 },
      violations: 2,
      queueLength: 45,
      congestionLevel: 'high',
      avgWaitTime: 85,
      throughput: 324
    },
    {
      id: 'cam-002', 
      name: 'Brigade Road Signal',
      location: 'Bangalore',
      status: 'live',
      detections: { cars: 18, trucks: 1, bikes: 22, pedestrians: 5 },
      violations: 0,
      queueLength: 28,
      congestionLevel: 'medium',
      avgWaitTime: 52,
      throughput: 412
    },
    {
      id: 'cam-003',
      name: 'Marine Drive',
      location: 'Mumbai',
      status: 'live', 
      detections: { cars: 31, trucks: 5, bikes: 12, pedestrians: 3 },
      violations: 1,
      queueLength: 52,
      congestionLevel: 'high',
      avgWaitTime: 78,
      throughput: 298
    },
    {
      id: 'cam-004',
      name: 'Park Street Junction',
      location: 'Kolkata',
      status: 'recording',
      detections: { cars: 12, trucks: 2, bikes: 8, pedestrians: 4 },
      violations: 0,
      queueLength: 18,
      congestionLevel: 'low',
      avgWaitTime: 34,
      throughput: 456
    }
  ]);

  const [selectedCamera, setSelectedCamera] = useState<CameraFeed>(cameras[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [showOverlays, setShowOverlays] = useState(true);
  const [aiAnalysisEnabled, setAiAnalysisEnabled] = useState(true);
  const [autoOptimizeEnabled, setAutoOptimizeEnabled] = useState(true);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedCamera(prev => ({
        ...prev,
        detections: {
          cars: Math.max(0, prev.detections.cars + Math.floor(Math.random() * 6) - 3),
          trucks: Math.max(0, prev.detections.trucks + Math.floor(Math.random() * 3) - 1),
          bikes: Math.max(0, prev.detections.bikes + Math.floor(Math.random() * 8) - 4),
          pedestrians: Math.max(0, prev.detections.pedestrians + Math.floor(Math.random() * 4) - 2)
        },
        violations: Math.max(0, prev.violations + Math.floor(Math.random() * 2) - 1),
        queueLength: Math.max(0, prev.queueLength + Math.floor(Math.random() * 10) - 5),
        avgWaitTime: Math.max(20, prev.avgWaitTime + Math.floor(Math.random() * 20) - 10),
        throughput: Math.max(200, prev.throughput + Math.floor(Math.random() * 40) - 20)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getCongestionColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-400';
      case 'recording': return 'bg-yellow-400';
      case 'offline': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Live Traffic Monitoring</h1>
          <p className="text-muted-foreground">Real-time AI-powered traffic analysis and control</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium">AI Analysis Active</span>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            {cameras.filter(c => c.status === 'live').length} Live Feeds
          </Badge>
        </div>
      </div>

      {/* Camera Grid Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cameras.map((camera) => (
          <Card 
            key={camera.id}
            className={`p-4 cursor-pointer transition-all duration-300 border-border/50 hover:border-primary/50 ${
              selectedCamera.id === camera.id ? 'border-primary glow-primary bg-primary/5' : ''
            }`}
            onClick={() => setSelectedCamera(camera)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Camera className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">{camera.name}</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${getStatusColor(camera.status)}`} />
            </div>
            <div className="text-xs text-muted-foreground mb-3">{camera.location}</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className={getCongestionColor(camera.congestionLevel)}>
                  {camera.congestionLevel.toUpperCase()}
                </span>
                <span className="text-muted-foreground">{camera.queueLength}m queue</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {Object.values(camera.detections).reduce((a, b) => a + b, 0)} vehicles
                </span>
                {camera.violations > 0 && (
                  <Badge variant="destructive" className="text-xs px-1 py-0">
                    {camera.violations}
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Video Feed */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6 border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{selectedCamera.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedCamera.location}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedCamera.status)} animate-pulse`} />
                <span className="text-sm font-medium">{selectedCamera.status.toUpperCase()}</span>
              </div>
            </div>

            {/* Video Player */}
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video mb-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1695902173528-0b15104c4554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwY29tcHV0ZXIlMjB2aXNpb258ZW58MXx8fHwxNzU3NzQwMjcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Live Camera Feed"
                className="w-full h-full object-cover"
              />
              
              {/* AI Detection Overlays */}
              {showOverlays && (
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
                  
                  {/* Traffic density heatmap overlay */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-2">
                    <div className="text-white text-xs font-medium mb-1">Density Heatmap</div>
                    <div className="w-16 h-12 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded opacity-60"></div>
                  </div>
                </div>
              )}

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
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-white hover:bg-white/20"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                      <div className="w-20">
                        <Slider
                          value={volume}
                          onValueChange={setVolume}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant="destructive" className="animate-pulse">
                      ● LIVE YOLOv8
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stream Controls */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Analysis</span>
                <Switch
                  checked={aiAnalysisEnabled}
                  onCheckedChange={setAiAnalysisEnabled}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Overlays</span>
                <Switch
                  checked={showOverlays}
                  onCheckedChange={setShowOverlays}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-Optimize</span>
                <Switch
                  checked={autoOptimizeEnabled}
                  onCheckedChange={setAutoOptimizeEnabled}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Recording</span>
                <Switch
                  checked={selectedCamera.status === 'recording'}
                  disabled
                />
              </div>
            </div>
          </Card>

          {/* Performance Metrics */}
          <Card className="p-4 border-border/50">
            <h4 className="font-semibold mb-4 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2 text-secondary" />
              Junction Performance
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-muted-foreground">Avg Wait</span>
                </div>
                <div className="text-lg font-semibold animate-pulse">{selectedCamera.avgWaitTime}s</div>
                <div className="text-xs text-green-400">-23% vs baseline</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Car className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-muted-foreground">Throughput</span>
                </div>
                <div className="text-lg font-semibold animate-pulse">{selectedCamera.throughput}/hr</div>
                <div className="text-xs text-green-400">+18% vs baseline</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Efficiency</span>
                </div>
                <div className="text-lg font-semibold">94.2%</div>
                <div className="text-xs text-green-400">+12% vs manual</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Panel - Analytics & Controls */}
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
                <Badge variant="secondary" className="animate-pulse">{selectedCamera.detections.cars}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm">Trucks</span>
                </div>
                <Badge variant="secondary" className="animate-pulse">{selectedCamera.detections.trucks}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bike className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Bikes</span>
                </div>
                <Badge variant="secondary" className="animate-pulse">{selectedCamera.detections.bikes}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">Pedestrians</span>
                </div>
                <Badge variant="secondary" className="animate-pulse">{selectedCamera.detections.pedestrians}</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-border/50">
            <h4 className="font-semibold mb-4 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2 text-secondary" />
              Traffic Status
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Queue Length</span>
                <span className="text-sm font-medium animate-pulse">{selectedCamera.queueLength}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Congestion Level</span>
                <span className={`text-sm font-medium ${getCongestionColor(selectedCamera.congestionLevel)}`}>
                  {selectedCamera.congestionLevel.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total Vehicles</span>
                <span className="text-sm font-medium animate-pulse">
                  {Object.values(selectedCamera.detections).reduce((a, b) => a + b, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Signal Phase</span>
                <Badge variant="outline" className="text-xs">Green - 45s remaining</Badge>
              </div>
            </div>
          </Card>

          {selectedCamera.violations > 0 && (
            <Card className="p-4 border-destructive/50 bg-destructive/5">
              <h4 className="font-semibold mb-4 flex items-center text-destructive">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Active Violations
              </h4>
              <div className="space-y-2">
                <div className="text-sm">
                  <Badge variant="destructive" className="mb-1 animate-pulse">Signal Jump</Badge>
                  <div className="text-xs text-muted-foreground">
                    Vehicle crossed on red signal - 2:34 PM
                  </div>
                </div>
                {selectedCamera.violations > 1 && (
                  <div className="text-sm">
                    <Badge variant="destructive" className="mb-1 animate-pulse">Wrong Lane</Badge>
                    <div className="text-xs text-muted-foreground">
                      Two-wheeler in car lane - 2:31 PM
                    </div>
                  </div>
                )}
              </div>
              <Button size="sm" variant="destructive" className="w-full mt-3">
                Review & Process Challans
              </Button>
            </Card>
          )}

          <Card className="p-4 border-border/50">
            <h4 className="font-semibold mb-4 flex items-center">
              <Brain className="w-4 h-4 mr-2 text-green-400" />
              AI Recommendations
            </h4>
            <div className="space-y-2 text-sm">
              <div className="p-3 bg-primary/10 rounded border border-primary/20 animate-pulse">
                <div className="flex items-center space-x-2 mb-1">
                  <Lightbulb className="w-3 h-3 text-primary" />
                  <div className="font-medium text-primary">Extend Green Phase</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  High vehicle density detected. Recommend +15s green time to clear queue.
                </div>
                <Button size="sm" className="mt-2 w-full bg-primary/20 hover:bg-primary/30 text-primary border-primary/30">
                  Apply Recommendation
                </Button>
              </div>
              <div className="p-3 bg-secondary/10 rounded border border-secondary/20 animate-pulse">
                <div className="flex items-center space-x-2 mb-1">
                  <User className="w-3 h-3 text-secondary" />
                  <div className="font-medium text-secondary">Pedestrian Priority</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  8 pedestrians waiting. Consider activating walk signal.
                </div>
                <Button size="sm" className="mt-2 w-full bg-secondary/20 hover:bg-secondary/30 text-secondary border-secondary/30">
                  Activate Walk Signal
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-border/50">
            <h4 className="font-semibold mb-4">Quick Actions</h4>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Zap className="w-4 h-4 mr-2" />
                Emergency Override
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Adjust Signal Timing
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Camera className="w-4 h-4 mr-2" />
                Switch Camera View
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}