import { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Play, 
  Pause, 
  Camera, 
  Maximize2, 
  Settings,
  Volume2,
  VolumeX,
  Clock,
  Car,
  Truck,
  Bike,
  User,
  Zap,
  AlertTriangle,
  Eye,
  Brain,
  Lightbulb,
  MapPin,
  Timer,
  BarChart3,
  TrendingUp,
  Leaf,
  Route,
  Mic,
  Languages,
  FileText,
  Download,
  CheckCircle,
  XCircle,
  Camera as CameraIcon
} from 'lucide-react';

interface Detection {
  id: string;
  type: 'car' | 'truck' | 'bike' | 'pedestrian' | 'emergency';
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
  speed?: number;
  plate?: string;
  lane?: string;
}

interface ViolationData {
  id: string;
  type: string;
  vehicle: string;
  lane: string;
  timestamp: string;
  plate: string;
  speed: number;
  suggestedFine: number;
  snapshot: string;
}

export function NetraDashboard() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState([75]);
  
  // Toggle states
  const [aiAnalysisEnabled, setAiAnalysisEnabled] = useState(true);
  const [overlaysEnabled, setOverlaysEnabled] = useState(true);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [language, setLanguage] = useState('EN');
  
  // Signal and traffic data
  const [currentSignal, setCurrentSignal] = useState({ lane: 2, remaining: 45 });
  const [pedestrianPriority, setPedestrianPriority] = useState(false);
  const [emergencyDetected, setEmergencyDetected] = useState(false);
  
  // Lane counts
  const [laneCounts, setLaneCounts] = useState({
    lane1: { cars: 8, trucks: 2, bikes: 5, total: 15 },
    lane2: { cars: 12, trucks: 1, bikes: 8, total: 21 },
    lane3: { cars: 6, trucks: 3, bikes: 4, total: 13 }
  });
  
  // Traffic metrics
  const [metrics, setMetrics] = useState({
    queueLength: 45,
    congestionLevel: 'high' as 'low' | 'medium' | 'high',
    totalVehicles: 49,
    co2Reduction: 23.5,
    avgWaitTime: 85
  });
  
  // Detections
  const [detections, setDetections] = useState<Detection[]>([
    { id: '1', type: 'car', confidence: 0.95, x: 30, y: 40, width: 60, height: 40, speed: 25, plate: 'DL 01 AB 1234', lane: 'Lane 2' },
    { id: '2', type: 'bike', confidence: 0.87, x: 60, y: 60, width: 30, height: 25, speed: 35, plate: 'DL 02 XY 5678', lane: 'Lane 1' },
    { id: '3', type: 'truck', confidence: 0.92, x: 15, y: 25, width: 80, height: 50, speed: 20, plate: 'DL 03 CD 9012', lane: 'Lane 3' },
    { id: '4', type: 'pedestrian', confidence: 0.89, x: 75, y: 80, width: 20, height: 40 },
  ]);
  
  // Violation modal
  const [selectedViolation, setSelectedViolation] = useState<ViolationData | null>(null);
  const [violationModalOpen, setViolationModalOpen] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update signal countdown
      setCurrentSignal(prev => ({
        ...prev,
        remaining: prev.remaining > 0 ? prev.remaining - 1 : 60
      }));
      
      // Update lane counts randomly
      setLaneCounts(prev => ({
        lane1: {
          cars: Math.max(0, prev.lane1.cars + Math.floor(Math.random() * 6) - 3),
          trucks: Math.max(0, prev.lane1.trucks + Math.floor(Math.random() * 2) - 1),
          bikes: Math.max(0, prev.lane1.bikes + Math.floor(Math.random() * 4) - 2),
          total: 0
        },
        lane2: {
          cars: Math.max(0, prev.lane2.cars + Math.floor(Math.random() * 6) - 3),
          trucks: Math.max(0, prev.lane2.trucks + Math.floor(Math.random() * 2) - 1),
          bikes: Math.max(0, prev.lane2.bikes + Math.floor(Math.random() * 4) - 2),
          total: 0
        },
        lane3: {
          cars: Math.max(0, prev.lane3.cars + Math.floor(Math.random() * 6) - 3),
          trucks: Math.max(0, prev.lane3.trucks + Math.floor(Math.random() * 2) - 1),
          bikes: Math.max(0, prev.lane3.bikes + Math.floor(Math.random() * 4) - 2),
          total: 0
        }
      }));
      
      // Update metrics
      setMetrics(prev => ({
        ...prev,
        queueLength: Math.max(20, prev.queueLength + Math.floor(Math.random() * 10) - 5),
        totalVehicles: Math.max(30, prev.totalVehicles + Math.floor(Math.random() * 8) - 4),
        avgWaitTime: Math.max(30, prev.avgWaitTime + Math.floor(Math.random() * 20) - 10)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const getDetectionColor = (type: string) => {
    switch (type) {
      case 'car': return '#FF007F'; // Pink
      case 'truck': return '#FFD600'; // Yellow
      case 'bike': return '#7AE3FF'; // Blue
      case 'pedestrian': return '#2ECC71'; // Green
      case 'emergency': return '#FF4D4D'; // Red
      default: return '#FFFFFF';
    }
  };

  const getCongestionColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'high': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDetectionClick = (detection: Detection) => {
    if (detection.type !== 'pedestrian') {
      const violation: ViolationData = {
        id: detection.id,
        type: 'Signal Jump',
        vehicle: detection.type.charAt(0).toUpperCase() + detection.type.slice(1),
        lane: detection.lane || 'Unknown',
        timestamp: new Date().toLocaleTimeString(),
        plate: detection.plate || 'OCR Failed',
        speed: detection.speed || 0,
        suggestedFine: detection.type === 'car' ? 1000 : detection.type === 'bike' ? 500 : 2000,
        snapshot: 'violation-snapshot.jpg'
      };
      setSelectedViolation(violation);
      setViolationModalOpen(true);
    }
  };

  // Calculate total vehicles per lane
  Object.keys(laneCounts).forEach(lane => {
    const laneData = laneCounts[lane as keyof typeof laneCounts];
    laneData.total = laneData.cars + laneData.trucks + laneData.bikes;
  });

  return (
    <div className="p-6 space-y-6 bg-[#0B0B0E] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <span>Netra</span>
            <span className="text-muted-foreground">– AI Traffic Control</span>
          </h1>
          <p className="text-muted-foreground mt-1">Real-time AI-powered traffic monitoring and signal optimization</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="default" className="bg-green-400/10 text-green-400 border-green-400/30 animate-pulse">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
            LIVE
          </Badge>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/30">
            Connaught Place, New Delhi
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Video Section */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="p-0 border-border/50 bg-[#0F0F14] rounded-2xl overflow-hidden glow-primary">
            {/* Video Player */}
            <div className="relative aspect-video bg-black">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFmZmljJTIwaW50ZXJzZWN0aW9uJTIwY2l0eXxlbnwxfHx8fDE3NTc3NDAyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Live Traffic Feed"
                className="w-full h-full object-cover"
              />
              
              {/* Live Badge */}
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <Badge variant="destructive" className="animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                  LIVE
                </Badge>
                <Badge variant="secondary" className="bg-black/70 text-white border-white/20">
                  Connaught Place Junction
                </Badge>
              </div>

              {/* Recording Indicator */}
              {isRecording && (
                <div className="absolute top-4 right-4 flex items-center space-x-2 bg-red-500/90 text-white px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-sm font-medium">REC {formatTime(recordingTime)}</span>
                </div>
              )}
              
              {/* AI Detection Overlays */}
              {overlaysEnabled && detections.map((detection) => (
                <div
                  key={detection.id}
                  className="absolute cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    left: `${detection.x}%`,
                    top: `${detection.y}%`,
                    width: `${detection.width}px`,
                    height: `${detection.height}px`,
                    border: `2px solid ${getDetectionColor(detection.type)}`,
                    backgroundColor: `${getDetectionColor(detection.type)}20`,
                    borderRadius: '4px',
                    animation: detection.type === 'emergency' ? 'pulse 1s infinite' : 'none'
                  }}
                  onClick={() => handleDetectionClick(detection)}
                >
                  <div 
                    className="absolute -top-8 left-0 px-2 py-1 rounded text-xs font-medium text-white"
                    style={{ backgroundColor: getDetectionColor(detection.type) }}
                  >
                    {detection.type.charAt(0).toUpperCase() + detection.type.slice(1)} {detection.confidence.toFixed(2)}
                  </div>
                </div>
              ))}

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between">
                  {/* Playback Controls */}
                  <div className="flex items-center space-x-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    
                    <Select value={playbackSpeed.toString()} onValueChange={(value) => setPlaybackSpeed(parseFloat(value))}>
                      <SelectTrigger className="w-20 h-8 bg-black/50 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.5">0.5x</SelectItem>
                        <SelectItem value="1">1x</SelectItem>
                        <SelectItem value="2">2x</SelectItem>
                      </SelectContent>
                    </Select>
                    
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
                    
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <CameraIcon className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Control Toggles */}
            <div className="p-4 bg-[#0F0F14] border-t border-border/50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center">
                    <Brain className="w-4 h-4 mr-2 text-primary" />
                    AI Analysis
                  </span>
                  <Switch
                    checked={aiAnalysisEnabled}
                    onCheckedChange={setAiAnalysisEnabled}
                    className={aiAnalysisEnabled ? 'glow-primary' : ''}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center">
                    <Eye className="w-4 h-4 mr-2 text-secondary" />
                    Overlays
                  </span>
                  <Switch
                    checked={overlaysEnabled}
                    onCheckedChange={setOverlaysEnabled}
                    className={overlaysEnabled ? 'glow-secondary' : ''}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center">
                    <Camera className="w-4 h-4 mr-2 text-yellow-400" />
                    Recording
                  </span>
                  <Switch
                    checked={isRecording}
                    onCheckedChange={setIsRecording}
                    className={isRecording ? 'glow-primary' : ''}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-red-400" />
                    Alerts
                  </span>
                  <Switch
                    checked={alertsEnabled}
                    onCheckedChange={setAlertsEnabled}
                    className={alertsEnabled ? 'glow-primary' : ''}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side Panel */}
        <div className="space-y-4">
          {/* Lane Counts */}
          <Card className="p-4 border-border/50 bg-[#0F0F14]">
            <h4 className="font-semibold mb-4 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2 text-primary" />
              Lane Counts
            </h4>
            <div className="space-y-3">
              {Object.entries(laneCounts).map(([lane, counts], index) => (
                <div key={lane} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Lane {index + 1}</span>
                    <Badge variant="secondary" className="animate-pulse">
                      {counts.total}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <Car className="w-3 h-3 text-blue-400" />
                      <span>{counts.cars}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Truck className="w-3 h-3 text-yellow-400" />
                      <span>{counts.trucks}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Bike className="w-3 h-3 text-green-400" />
                      <span>{counts.bikes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Signal Status */}
          <Card className="p-4 border-border/50 bg-[#0F0F14]">
            <h4 className="font-semibold mb-4 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-green-400" />
              Signal Status
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Green Signal</span>
                <Badge variant="default" className="bg-green-400/20 text-green-400 border-green-400/30">
                  Lane {currentSignal.lane}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Timer className="w-4 h-4 text-green-400" />
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Time Remaining</span>
                    <span className="font-medium">{currentSignal.remaining}s</span>
                  </div>
                  <Progress 
                    value={(currentSignal.remaining / 60) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
              {pedestrianPriority && (
                <div className="p-2 bg-purple-400/10 border border-purple-400/30 rounded">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-purple-400">Pedestrian Priority Active</span>
                  </div>
                </div>
              )}
              {emergencyDetected && (
                <div className="p-2 bg-red-400/10 border border-red-400/30 rounded animate-pulse">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-red-400">Emergency Lane Active</span>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Traffic Metrics */}
          <Card className="p-4 border-border/50 bg-[#0F0F14]">
            <h4 className="font-semibold mb-4 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-secondary" />
              Traffic Metrics
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Queue Length</span>
                <span className="text-sm font-medium animate-pulse">{metrics.queueLength}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Congestion Level</span>
                <Badge className={getCongestionColor(metrics.congestionLevel)}>
                  {metrics.congestionLevel.toUpperCase()}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total Vehicles</span>
                <span className="text-sm font-medium animate-pulse">{metrics.totalVehicles}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Avg Wait Time</span>
                <span className="text-sm font-medium animate-pulse">{metrics.avgWaitTime}s</span>
              </div>
            </div>
          </Card>

          {/* AI Recommendations */}
          <Card className="p-4 border-border/50 bg-[#0F0F14]">
            <h4 className="font-semibold mb-4 flex items-center">
              <Brain className="w-4 h-4 mr-2 text-green-400" />
              AI Recommendations
            </h4>
            <div className="space-y-2">
              <div className="p-3 bg-red-400/10 border border-red-400/30 rounded animate-pulse">
                <div className="flex items-center space-x-2 mb-2">
                  <Lightbulb className="w-3 h-3 text-red-400" />
                  <span className="text-sm font-medium text-red-400">Extend Green Phase</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  High congestion detected. Recommend +15s extension.
                </p>
                <div className="flex space-x-2">
                  <Button size="sm" className="h-6 text-xs bg-red-400/20 hover:bg-red-400/30 text-red-400 border-red-400/30">
                    Apply
                  </Button>
                  <Button size="sm" variant="outline" className="h-6 text-xs border-red-400/30 text-red-400">
                    Simulate
                  </Button>
                </div>
              </div>
              
              <div className="p-3 bg-purple-400/10 border border-purple-400/30 rounded">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-3 h-3 text-purple-400" />
                  <span className="text-sm font-medium text-purple-400">Pedestrian Priority</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  8 pedestrians waiting. Activate walk signal.
                </p>
                <div className="flex space-x-2">
                  <Button size="sm" className="h-6 text-xs bg-purple-400/20 hover:bg-purple-400/30 text-purple-400 border-purple-400/30">
                    Apply
                  </Button>
                  <Button size="sm" variant="outline" className="h-6 text-xs border-purple-400/30 text-purple-400">
                    Simulate
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Extra Info */}
          <Card className="p-4 border-border/50 bg-[#0F0F14]">
            <h4 className="font-semibold mb-4">Environmental Impact</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Leaf className="w-4 h-4 text-green-400" />
                  <span className="text-sm">CO₂ Reduction</span>
                </div>
                <span className="text-sm font-medium text-green-400">
                  {metrics.co2Reduction}kg
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Route className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">Alt Route</span>
                </div>
                <Button size="sm" variant="outline" className="h-6 text-xs">
                  View Map
                </Button>
              </div>
            </div>
          </Card>

          {/* Voice & Language Controls */}
          <Card className="p-4 border-border/50 bg-[#0F0F14]">
            <h4 className="font-semibold mb-4">Controls</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mic className="w-4 h-4 text-primary" />
                  <span className="text-sm">Voice</span>
                </div>
                <Switch
                  checked={voiceEnabled}
                  onCheckedChange={setVoiceEnabled}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Languages className="w-4 h-4 text-secondary" />
                  <span className="text-sm">Language</span>
                </div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-16 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EN">EN</SelectItem>
                    <SelectItem value="HI">HI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Violations Quick Access */}
          <Card className="p-4 border-border/50 bg-[#0F0F14]">
            <h4 className="font-semibold mb-4">Quick Actions</h4>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-xs h-8">
                <FileText className="w-4 h-4 mr-2" />
                Open Violations (3)
              </Button>
              <Button variant="outline" className="w-full justify-start text-xs h-8">
                <Download className="w-4 h-4 mr-2" />
                Issue E-Challan
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Violation Modal */}
      <Dialog open={violationModalOpen} onOpenChange={setViolationModalOpen}>
        <DialogContent className="max-w-2xl bg-[#0F0F14] border-border/50">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span>Traffic Violation Detected</span>
            </DialogTitle>
          </DialogHeader>
          
          {selectedViolation && (
            <div className="space-y-4">
              {/* Violation Snapshot */}
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFmZmljJTIwaW50ZXJzZWN0aW9uJTIwY2l0eXxlbnwxfHx8fDE3NTc3NDAyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Violation Evidence"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-4 border-red-400 pointer-events-none" />
              </div>
              
              {/* Violation Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Vehicle Type</label>
                  <p className="font-medium">{selectedViolation.vehicle}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Lane</label>
                  <p className="font-medium">{selectedViolation.lane}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Plate Number</label>
                  <p className="font-medium">{selectedViolation.plate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Speed</label>
                  <p className="font-medium">{selectedViolation.speed} km/h</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Violation Type</label>
                  <p className="font-medium text-red-400">{selectedViolation.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Suggested Fine</label>
                  <p className="font-medium text-yellow-400">₹{selectedViolation.suggestedFine}</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <Button className="flex-1 bg-green-400/20 hover:bg-green-400/30 text-green-400 border-green-400/30">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Challan
                </Button>
                <Button variant="outline" className="flex-1 border-red-400/30 text-red-400">
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button variant="outline" className="border-blue-400/30 text-blue-400">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}