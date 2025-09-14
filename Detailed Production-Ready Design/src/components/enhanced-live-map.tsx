import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  MapPin, 
  Camera, 
  Play, 
  Settings, 
  BarChart3,
  Clock,
  Car,
  AlertTriangle,
  Zap,
  Brain,
  Activity,
  TrendingDown,
  Pause,
  RotateCcw
} from 'lucide-react';

const junctions = [
  { 
    id: 1, 
    name: 'MG Road - Brigade Road', 
    status: 'critical', 
    position: { top: '30%', left: '40%' },
    vehicles: 45,
    waitTime: '3.2 min',
    waitTimeOptimized: '2.4 min',
    signalPhase: 'red-all',
    aiRecommendation: 'Extend NS green by 15s',
    lastUpdate: '2 min ago',
    improvement: '-25%'
  },
  { 
    id: 2, 
    name: 'Silk Board Junction', 
    status: 'high', 
    position: { top: '60%', left: '35%' },
    vehicles: 38,
    waitTime: '2.8 min',
    waitTimeOptimized: '2.1 min',
    signalPhase: 'green-ns',
    aiRecommendation: 'Optimize for corridor flow',
    lastUpdate: '1 min ago',
    improvement: '-25%'
  },
  { 
    id: 3, 
    name: 'KR Puram Junction', 
    status: 'medium', 
    position: { top: '25%', left: '60%' },
    vehicles: 28,
    waitTime: '1.9 min',
    waitTimeOptimized: '1.4 min',
    signalPhase: 'green-ew',
    aiRecommendation: 'Normal operations',
    lastUpdate: '3 min ago',
    improvement: '-26%'
  },
  { 
    id: 4, 
    name: 'Electronic City Phase 1', 
    status: 'medium', 
    position: { top: '75%', left: '45%' },
    vehicles: 22,
    waitTime: '1.5 min',
    waitTimeOptimized: '1.1 min',
    signalPhase: 'amber-ns',
    aiRecommendation: 'Reduce cycle time',
    lastUpdate: '1 min ago',
    improvement: '-27%'
  },
  { 
    id: 5, 
    name: 'Marathahalli Bridge', 
    status: 'low', 
    position: { top: '40%', left: '70%' },
    vehicles: 18,
    waitTime: '1.1 min',
    waitTimeOptimized: '0.8 min',
    signalPhase: 'green-ns',
    aiRecommendation: 'Maintain current timing',
    lastUpdate: '4 min ago',
    improvement: '-27%'
  }
];

export function EnhancedLiveMap() {
  const [selectedJunction, setSelectedJunction] = useState<typeof junctions[0] | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [showOptimized, setShowOptimized] = useState(false);
  const [liveData, setLiveData] = useState(junctions);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-500 border-red-400 shadow-red-500/50';
      case 'high': return 'bg-orange-500 border-orange-400 shadow-orange-500/50';
      case 'medium': return 'bg-yellow-500 border-yellow-400 shadow-yellow-500/50';
      case 'low': return 'bg-green-500 border-green-400 shadow-green-500/50';
      default: return 'bg-gray-500 border-gray-400';
    }
  };

  const getSignalPhaseColor = (phase: string) => {
    if (phase.includes('green')) return 'bg-green-500';
    if (phase.includes('red')) return 'bg-red-500';
    if (phase.includes('amber')) return 'bg-amber-500';
    return 'bg-gray-500';
  };

  const runOptimization = () => {
    setIsSimulating(true);
    setSimulationComplete(false);
    
    setTimeout(() => {
      setShowOptimized(true);
      setSimulationComplete(true);
      setIsSimulating(false);
    }, 3000);
  };

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => prev.map(junction => ({
        ...junction,
        vehicles: Math.max(10, junction.vehicles + Math.floor(Math.random() * 6 - 3)),
        lastUpdate: 'Just now'
      })));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Live Traffic Intelligence
          </h1>
          <p className="text-muted-foreground mt-1">Real-time AI-powered junction monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="live-indicator bg-green-900/20 text-green-400 border-green-400/30">
            Live Monitoring
          </Badge>
          <Button
            onClick={runOptimization}
            disabled={isSimulating}
            className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 glow-primary"
          >
            {isSimulating ? (
              <>
                <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Run AI Optimization
              </>
            )}
          </Button>
        </div>
      </div>

      {simulationComplete && (
        <Card className="mb-6 border-green-400/30 bg-green-900/10 glow-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-green-400 font-medium">
                  AI Optimization Complete: Average wait time reduced by 25.8% across all junctions
                </p>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                className="border-green-400/30 text-green-400 hover:bg-green-900/20"
                onClick={() => setShowOptimized(!showOptimized)}
              >
                {showOptimized ? 'Show Current' : 'Show Optimized'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-6 flex-1">
        {/* Map Area */}
        <Card className="flex-1 bg-card/50 backdrop-blur-sm border-white/10">
          <CardContent className="p-0 h-full">
            <div className="relative h-full bg-gray-900 rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1687657280605-9f2ca065ba59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFmZmljJTIwaW50ZXJzZWN0aW9uJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NTc4MzExODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Bangalore Traffic Intelligence Map"
                className="w-full h-full object-cover opacity-70"
              />
              
              {/* Overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
              
              {/* Junction Overlays */}
              {liveData.map((junction) => (
                <div
                  key={junction.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                  style={junction.position}
                  onClick={() => setSelectedJunction(junction)}
                >
                  <div className={`w-6 h-6 rounded-full border-2 ${getStatusColor(junction.status)} 
                    shadow-lg animate-pulse hover:scale-125 transition-all duration-300`}>
                  </div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 
                    bg-black/80 backdrop-blur-sm rounded px-3 py-2 text-xs whitespace-nowrap shadow-xl border border-white/10">
                    <p className="text-white font-medium">{junction.name}</p>
                    <p className="text-cyan-400">
                      {showOptimized ? junction.waitTimeOptimized : junction.waitTime} wait
                    </p>
                    {showOptimized && (
                      <p className="text-green-400 text-xs">{junction.improvement} improvement</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Map Controls */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-white/10">
                <h3 className="text-sm font-semibold mb-2 text-white">Traffic Density</h3>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-green-500/50 shadow-lg"></div>
                    <span className="text-xs text-gray-300">Optimal Flow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-yellow-500/50 shadow-lg"></div>
                    <span className="text-xs text-gray-300">Moderate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500 shadow-orange-500/50 shadow-lg"></div>
                    <span className="text-xs text-gray-300">Congested</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-red-500/50 shadow-lg"></div>
                    <span className="text-xs text-gray-300">Critical</span>
                  </div>
                </div>
              </div>

              {/* Live Status */}
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-white/10">
                <div className="flex items-center gap-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium">Live Data Stream</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Junction List */}
        <div className="w-80 space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                Live Junction Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {liveData.map((junction) => (
                <div
                  key={junction.id}
                  className={`p-3 border border-white/10 rounded-lg cursor-pointer transition-all duration-300 hover:border-white/20 hover:bg-white/5
                    ${selectedJunction?.id === junction.id ? 'border-pink-500/50 bg-pink-900/10 glow-primary' : ''}`}
                  onClick={() => setSelectedJunction(junction)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{junction.name}</p>
                    <Badge 
                      variant={junction.status === 'critical' ? 'destructive' : 
                             junction.status === 'high' ? 'default' : 
                             junction.status === 'medium' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {junction.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Car className="w-3 h-3" />
                      {junction.vehicles} vehicles
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {showOptimized ? junction.waitTimeOptimized : junction.waitTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${getSignalPhaseColor(junction.signalPhase)}`}></div>
                      <span className="text-xs text-muted-foreground">Signal</span>
                    </div>
                    {showOptimized && (
                      <div className="flex items-center gap-1">
                        <TrendingDown className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-green-400">{junction.improvement}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="w-5 h-5 text-pink-400" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-pink-900/20 border border-pink-500/30 rounded-lg">
                  <Zap className="w-4 h-4 text-pink-400" />
                  <span className="text-sm">Corridor optimization active</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-cyan-900/20 border border-cyan-500/30 rounded-lg">
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm">Predictive model running</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Emergency preemption ready</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Junction Detail Modal */}
      <Dialog open={!!selectedJunction} onOpenChange={() => setSelectedJunction(null)}>
        <DialogContent className="max-w-3xl bg-card/95 backdrop-blur-sm border-white/10">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              {selectedJunction?.name}
            </DialogTitle>
            <DialogDescription>
              View live traffic data, AI analysis, and control options for this junction.
            </DialogDescription>
          </DialogHeader>
          
          {selectedJunction && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-orange-400">{selectedJunction.vehicles}</p>
                    <p className="text-sm text-muted-foreground">Vehicles in Queue</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-red-400">
                      {showOptimized ? selectedJunction.waitTimeOptimized : selectedJunction.waitTime}
                    </p>
                    <p className="text-sm text-muted-foreground">Average Wait Time</p>
                    {showOptimized && (
                      <p className="text-xs text-green-400 mt-1">{selectedJunction.improvement} improvement</p>
                    )}
                  </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className={`w-3 h-3 rounded-full ${getSignalPhaseColor(selectedJunction.signalPhase)}`}></div>
                      <p className="text-sm font-medium capitalize">
                        {selectedJunction.signalPhase.replace('-', ' ')}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">Current Phase</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Camera className="w-4 h-4 text-cyan-400" />
                      Live Detection Feed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-cyan-500/10"></div>
                      <div className="text-center z-10">
                        <Play className="w-8 h-8 text-white mb-2 mx-auto" />
                        <p className="text-sm text-gray-300">AI Detection Active</p>
                      </div>
                      {/* Simulated detection boxes */}
                      <div className="absolute top-4 left-4 w-16 h-12 border-2 border-pink-400 rounded">
                        <span className="absolute -top-5 left-0 text-xs text-pink-400">Car 94%</span>
                      </div>
                      <div className="absolute bottom-8 right-6 w-12 h-8 border-2 border-cyan-400 rounded">
                        <span className="absolute -top-5 left-0 text-xs text-cyan-400">Bike 91%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Brain className="w-4 h-4 text-pink-400" />
                      AI Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">AI Confidence</span>
                        <span className="text-green-400">94.2%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    <div className="p-3 bg-pink-900/20 border border-pink-500/30 rounded-lg">
                      <p className="text-sm text-pink-400 font-medium">Recommendation:</p>
                      <p className="text-sm text-gray-300 mt-1">{selectedJunction.aiRecommendation}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last updated: {selectedJunction.lastUpdate}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500">
                  <Settings className="w-4 h-4 mr-2" />
                  Manual Control
                </Button>
                <Button variant="outline" className="flex-1 border-white/20 hover:bg-white/5">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}