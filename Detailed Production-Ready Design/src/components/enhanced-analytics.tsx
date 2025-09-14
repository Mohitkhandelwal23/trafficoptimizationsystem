import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart } from 'recharts';
import { 
  TrendingUp, 
  Clock, 
  Car, 
  Activity,
  Download,
  Brain,
  Zap,
  MapPin,
  Leaf,
  DollarSign,
  Users
} from 'lucide-react';

const trafficData = [
  { time: '06:00', baseline: 1200, optimized: 1150, baselineWait: 45, optimizedWait: 38 },
  { time: '07:00', baseline: 2800, optimized: 2650, baselineWait: 65, optimizedWait: 52 },
  { time: '08:00', baseline: 4200, optimized: 3950, baselineWait: 95, optimizedWait: 71 },
  { time: '09:00', baseline: 5800, optimized: 5200, baselineWait: 120, optimizedWait: 89 },
  { time: '10:00', baseline: 4500, optimized: 4100, baselineWait: 75, optimizedWait: 58 },
  { time: '11:00', baseline: 3200, optimized: 3050, baselineWait: 60, optimizedWait: 47 },
  { time: '12:00', baseline: 3800, optimized: 3600, baselineWait: 70, optimizedWait: 55 },
  { time: '13:00', baseline: 4100, optimized: 3850, baselineWait: 80, optimizedWait: 62 },
  { time: '14:00', baseline: 3900, optimized: 3700, baselineWait: 75, optimizedWait: 58 },
  { time: '15:00', baseline: 3600, optimized: 3450, baselineWait: 65, optimizedWait: 51 },
  { time: '16:00', baseline: 4800, optimized: 4300, baselineWait: 90, optimizedWait: 68 },
  { time: '17:00', baseline: 6200, optimized: 5500, baselineWait: 135, optimizedWait: 98 },
  { time: '18:00', baseline: 7100, optimized: 6200, baselineWait: 150, optimizedWait: 108 },
  { time: '19:00', baseline: 5900, optimized: 5100, baselineWait: 115, optimizedWait: 84 },
  { time: '20:00', baseline: 4200, optimized: 3850, baselineWait: 85, optimizedWait: 65 }
];

const beforeAfterKPIs = [
  {
    metric: 'Average Wait Time',
    baseline: '89 seconds',
    optimized: '67 seconds',
    improvement: '-25.2%',
    color: 'text-green-400',
    icon: Clock
  },
  {
    metric: 'Traffic Throughput',
    baseline: '14,247 veh/hr',
    optimized: '16,850 veh/hr',
    improvement: '+18.3%',
    color: 'text-cyan-400',
    icon: Car
  },
  {
    metric: 'Fuel Consumption',
    baseline: '4,890L/day',
    optimized: '3,650L/day',
    improvement: '-25.4%',
    color: 'text-green-400',
    icon: Leaf
  },
  {
    metric: 'Emergency Response',
    baseline: '3.2 minutes',
    optimized: '1.8 minutes',
    improvement: '-43.8%',
    color: 'text-pink-400',
    icon: Users
  }
];

const violationTypes = [
  { name: 'Red Light Jump', baseline: 45, optimized: 32, color: '#FF007F' },
  { name: 'Overspeeding', baseline: 30, optimized: 22, color: '#7AE3FF' },
  { name: 'Wrong Lane', baseline: 15, optimized: 12, color: '#2ECC71' },
  { name: 'No Helmet', baseline: 7, optimized: 7, color: '#FFC107' },
  { name: 'Others', baseline: 3, optimized: 3, color: '#9C27B0' }
];

const junctionPerformance = [
  { name: 'MG Road - Brigade', baseline: 78, optimized: 91, improvement: 13 },
  { name: 'Silk Board', baseline: 65, optimized: 82, improvement: 17 },
  { name: 'Electronic City', baseline: 82, optimized: 94, improvement: 12 },
  { name: 'KR Puram', baseline: 71, optimized: 89, improvement: 18 },
  { name: 'Marathahalli', baseline: 89, optimized: 96, improvement: 7 },
  { name: 'Koramangala', baseline: 74, optimized: 88, improvement: 14 }
];

export function EnhancedAnalytics() {
  const [viewMode, setViewMode] = useState<'baseline' | 'optimized' | 'comparison'>('comparison');
  const [timeRange, setTimeRange] = useState('today');

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Traffic Analytics & Impact
          </h1>
          <p className="text-muted-foreground mt-1">AI-powered insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48 bg-card/50 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-white/20 hover:bg-white/5">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* View Mode Selector */}
      <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Brain className="w-5 h-5 text-pink-400" />
              <span className="font-medium">Analysis Mode:</span>
            </div>
            <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)} className="w-auto">
              <TabsList className="bg-background/50">
                <TabsTrigger value="baseline">Baseline</TabsTrigger>
                <TabsTrigger value="optimized">AI Optimized</TabsTrigger>
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Before/After KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {beforeAfterKPIs.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.metric} className="bg-card/50 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-white/5 ${kpi.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge className={`${kpi.color} bg-transparent border-current`}>
                    {kpi.improvement}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{kpi.metric}</p>
                  {viewMode === 'baseline' && (
                    <p className="text-xl font-bold">{kpi.baseline}</p>
                  )}
                  {viewMode === 'optimized' && (
                    <p className="text-xl font-bold">{kpi.optimized}</p>
                  )}
                  {viewMode === 'comparison' && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Before:</span>
                        <span>{kpi.baseline}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">After:</span>
                        <span className={kpi.color}>{kpi.optimized}</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Traffic Flow Comparison */}
      <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Traffic Flow: Baseline vs AI Optimized
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="#9AA0A6" />
              <YAxis yAxisId="left" stroke="#9AA0A6" />
              <YAxis yAxisId="right" orientation="right" stroke="#9AA0A6" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0F0F14', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
              />
              {(viewMode === 'baseline' || viewMode === 'comparison') && (
                <Bar yAxisId="left" dataKey="baseline" fill="#9AA0A6" name="Baseline Vehicles/hr" opacity={0.7} />
              )}
              {(viewMode === 'optimized' || viewMode === 'comparison') && (
                <Bar yAxisId="left" dataKey="optimized" fill="#7AE3FF" name="Optimized Vehicles/hr" />
              )}
              {(viewMode === 'baseline' || viewMode === 'comparison') && (
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="baselineWait"
                  stroke="#FF4D4D"
                  strokeWidth={2}
                  name="Baseline Wait Time (s)"
                  dot={false}
                />
              )}
              {(viewMode === 'optimized' || viewMode === 'comparison') && (
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="optimizedWait"
                  stroke="#2ECC71"
                  strokeWidth={2}
                  name="Optimized Wait Time (s)"
                  dot={false}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Junction Performance Comparison */}
        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-pink-400" />
              Junction Efficiency: Before vs After
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {junctionPerformance.map((junction, index) => (
                <div key={junction.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{junction.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-900/20 text-green-400 border-green-400/30">
                        +{junction.improvement}%
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Baseline: {junction.baseline}%</span>
                      <span>Optimized: {junction.optimized}%</span>
                    </div>
                    <div className="relative">
                      <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gray-500 rounded-full"
                          style={{ width: `${junction.baseline}%` }}
                        ></div>
                      </div>
                      <div className="h-3 bg-white/5 rounded-full overflow-hidden mt-1">
                        <div 
                          className="h-full bg-gradient-to-r from-pink-500 to-cyan-400 rounded-full glow-primary"
                          style={{ width: `${junction.optimized}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Environmental Impact */}
        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-400" />
              Environmental Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-900/20 border border-green-400/30 rounded-lg">
                <p className="text-2xl font-bold text-green-400">2.8T</p>
                <p className="text-sm text-muted-foreground">CO₂ Saved Today</p>
                <p className="text-xs text-green-400 mt-1">-28% emissions</p>
              </div>
              <div className="text-center p-4 bg-blue-900/20 border border-cyan-400/30 rounded-lg">
                <p className="text-2xl font-bold text-cyan-400">1,240L</p>
                <p className="text-sm text-muted-foreground">Fuel Saved</p>
                <p className="text-xs text-cyan-400 mt-1">-25% consumption</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Air Quality Index</span>
                <span className="text-green-400 font-medium">+12% improvement</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Noise Pollution</span>
                <span className="text-green-400 font-medium">-8% reduction</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Traffic Congestion</span>
                <span className="text-green-400 font-medium">-25% decrease</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Economic Impact */}
      <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-yellow-400" />
            Economic Impact Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">₹4.2L</p>
              <p className="text-sm text-muted-foreground">Fuel Cost Savings</p>
              <p className="text-xs text-yellow-400 mt-1">Per month</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-cyan-400">₹1.8L</p>
              <p className="text-sm text-muted-foreground">Time Cost Savings</p>
              <p className="text-xs text-cyan-400 mt-1">Productivity gains</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-400">₹1.2L</p>
              <p className="text-sm text-muted-foreground">Challan Revenue</p>
              <p className="text-xs text-pink-400 mt-1">This month</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">₹2.1L</p>
              <p className="text-sm text-muted-foreground">Healthcare Savings</p>
              <p className="text-xs text-green-400 mt-1">Reduced accidents</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demo Success Banner */}
      <Card className="border-green-400/30 bg-green-900/10 glow-secondary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-400/20 rounded-lg">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400">AI Optimization Results</h3>
                <p className="text-muted-foreground">
                  Comprehensive analysis shows significant improvements across all metrics with AI-powered traffic management
                </p>
              </div>
            </div>
            <Badge className="bg-green-900/30 text-green-400 border-green-400/30 text-lg px-4 py-2">
              25.2% Overall Improvement
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}