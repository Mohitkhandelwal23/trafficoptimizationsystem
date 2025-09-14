import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { 
  Car, 
  AlertTriangle, 
  FileText, 
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  MapPin,
  Play,
  Zap,
  Brain,
  RotateCcw
} from 'lucide-react';

const congestedJunctions = [
  { 
    name: 'MG Road - Brigade Road', 
    severity: 'high', 
    waitTime: '3.2 min', 
    vehicles: 45,
    improvement: '-38%' 
  },
  { 
    name: 'Silk Board Junction', 
    severity: 'high', 
    waitTime: '2.8 min', 
    vehicles: 38,
    improvement: '-25%' 
  },
  { 
    name: 'KR Puram Junction', 
    severity: 'medium', 
    waitTime: '1.9 min', 
    vehicles: 28,
    improvement: '-15%' 
  },
  { 
    name: 'Electronic City Phase 1', 
    severity: 'medium', 
    waitTime: '1.5 min', 
    vehicles: 22,
    improvement: '-20%' 
  },
  { 
    name: 'Marathahalli Bridge', 
    severity: 'low', 
    waitTime: '1.1 min', 
    vehicles: 18,
    improvement: '-12%' 
  }
];

const recentAlerts = [
  { time: '2 min ago', message: 'AI optimization reduced delay by 25% at Silk Board', type: 'success' },
  { time: '5 min ago', message: 'High congestion detected at Brigade Road Junction', type: 'warning' },
  { time: '8 min ago', message: 'Emergency preemption activated on Hosur Road', type: 'info' },
  { time: '12 min ago', message: 'Violation detected: Red light jump at Electronic City', type: 'violation' }
];

export function Dashboard() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [kpis, setKpis] = useState([
    {
      title: 'Active Junctions',
      value: '247',
      change: '+3.2%',
      trend: 'up',
      icon: MapPin,
      color: 'text-cyan-400'
    },
    {
      title: 'Avg Wait Time',
      value: '89s',
      change: 'Baseline',
      trend: 'neutral',
      icon: Clock,
      color: 'text-yellow-400'
    },
    {
      title: 'Pending Violations',
      value: '23',
      change: '+8.3%',
      trend: 'up',
      icon: FileText,
      color: 'text-orange-400'
    },
    {
      title: 'AI Efficiency',
      value: '87.3%',
      change: '+0.2%',
      trend: 'up',
      icon: Brain,
      color: 'text-green-400'
    }
  ]);

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationComplete(false);
    
    // Simulate AI optimization improvements over 3 seconds
    setTimeout(() => {
      setKpis(prev => prev.map(kpi => {
        if (kpi.title === 'Avg Wait Time') {
          return {
            ...kpi,
            value: '67s',
            change: '-25.2% Predicted',
            trend: 'down',
            color: 'text-green-400'
          };
        }
        if (kpi.title === 'AI Efficiency') {
          return {
            ...kpi,
            value: '92.1%',
            change: '+5.5%',
            color: 'text-green-400'
          };
        }
        return kpi;
      }));
      setIsSimulating(false);
      setSimulationComplete(true);
    }, 3000);
  };

  // Live updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setKpis(prev => prev.map(kpi => {
        if (kpi.title === 'Pending Violations') {
          const currentValue = parseInt(kpi.value);
          const newValue = Math.max(20, currentValue + Math.floor(Math.random() * 3 - 1));
          return {
            ...kpi,
            value: newValue.toString()
          };
        }
        return kpi;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Netra Traffic Control
          </h1>
          <p className="text-muted-foreground mt-1">AI-powered traffic optimization for Bangalore</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="live-indicator bg-green-900/20 text-green-400 border-green-400/30">
            System Online
          </Badge>
          <Button
            onClick={runSimulation}
            disabled={isSimulating}
            className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 glow-primary"
          >
            {isSimulating ? (
              <>
                <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                Running AI Simulation...
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="bg-card/50 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{kpi.title}</p>
                    <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                    <div className="flex items-center mt-2">
                      {kpi.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-400 mr-1" />}
                      {kpi.trend === 'down' && <TrendingDown className="w-3 h-3 text-green-400 mr-1" />}
                      {kpi.trend === 'neutral' && <Activity className="w-3 h-3 text-yellow-400 mr-1" />}
                      <span className={`text-xs ${kpi.color}`}>{kpi.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-white/5 ${kpi.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Demo Success Message */}
      {simulationComplete && (
        <Card className="border-green-400/30 bg-green-900/10 glow-secondary">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-green-400 font-medium">
                AI Simulation Complete: Predicted 25.2% reduction in average wait time across all junctions
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Congested Junctions */}
        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              Junction Performance (Live)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {congestedJunctions.map((junction, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-white/10 rounded-lg hover:border-white/20 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium">{junction.name}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <Badge 
                        variant={junction.severity === 'high' ? 'destructive' : 
                               junction.severity === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {junction.severity.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{junction.vehicles} vehicles</span>
                      <span className="text-sm text-muted-foreground">{junction.waitTime} wait</span>
                      {simulationComplete && (
                        <Badge className="text-xs bg-green-900/20 text-green-400 border-green-400/30">
                          {junction.improvement} predicted
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Progress 
                      value={junction.severity === 'high' ? 85 : junction.severity === 'medium' ? 60 : 35} 
                      className="w-20 h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Activity Feed */}
        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              System Activity Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border border-white/10 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'success' ? 'bg-green-400' :
                    alert.type === 'warning' ? 'bg-orange-400' :
                    alert.type === 'violation' ? 'bg-red-400' : 'bg-cyan-400'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demo Stats */}
      <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Live System Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">14,247</p>
              <p className="text-sm text-muted-foreground">Vehicles/Hour</p>
              <p className="text-xs text-green-400 mt-1">+5.2% vs baseline</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-cyan-400">2.8T</p>
              <p className="text-sm text-muted-foreground">CO₂ Saved Today</p>
              <p className="text-xs text-cyan-400 mt-1">Environmental impact</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-400">₹1.2L</p>
              <p className="text-sm text-muted-foreground">Challan Revenue</p>
              <p className="text-xs text-pink-400 mt-1">This month</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">15s</p>
              <p className="text-sm text-muted-foreground">Emergency Response</p>
              <p className="text-xs text-yellow-400 mt-1">Avg preemption time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}