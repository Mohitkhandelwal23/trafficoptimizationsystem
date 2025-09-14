import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { Alert, AlertDescription } from './ui/alert';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Eye,
  Zap,
  Activity,
  Database,
  Clock,
  Target
} from 'lucide-react';

const models = [
  {
    id: 'vehicle-detection',
    name: 'Vehicle Detection (YOLOv8)',
    version: 'v2.3.1',
    status: 'healthy',
    accuracy: 94.2,
    latency: 23,
    throughput: 156,
    lastUpdated: '2 hours ago',
    deployed: '2024-09-10',
    confidence: 91.8
  },
  {
    id: 'traffic-prediction',
    name: 'Traffic Prediction (LSTM)',
    version: 'v1.8.2',
    status: 'warning',
    accuracy: 87.5,
    latency: 45,
    throughput: 89,
    lastUpdated: '15 minutes ago',
    deployed: '2024-09-08',
    confidence: 84.2
  },
  {
    id: 'signal-optimization',
    name: 'Signal Optimization (RL)',
    version: 'v1.2.0',
    status: 'healthy',
    accuracy: 89.8,
    latency: 12,
    throughput: 234,
    lastUpdated: '5 minutes ago',
    deployed: '2024-09-12',
    confidence: 92.5
  },
  {
    id: 'violation-detection',
    name: 'Violation Detection',
    version: 'v3.1.0',
    status: 'drift',
    accuracy: 82.1,
    latency: 67,
    throughput: 45,
    lastUpdated: '1 hour ago',
    deployed: '2024-09-05',
    confidence: 78.9
  }
];

const performanceData = [
  { time: '00:00', accuracy: 92, latency: 23, throughput: 145 },
  { time: '04:00', accuracy: 93, latency: 25, throughput: 142 },
  { time: '08:00', accuracy: 89, latency: 45, throughput: 189 },
  { time: '12:00', accuracy: 91, latency: 38, throughput: 167 },
  { time: '16:00', accuracy: 88, latency: 52, throughput: 201 },
  { time: '20:00', accuracy: 94, latency: 28, throughput: 156 }
];

const driftData = [
  { date: 'Sep 1', confidence: 95, accuracy: 94 },
  { date: 'Sep 3', confidence: 93, accuracy: 93 },
  { date: 'Sep 5', confidence: 90, accuracy: 91 },
  { date: 'Sep 7', confidence: 87, accuracy: 89 },
  { date: 'Sep 9', confidence: 84, accuracy: 86 },
  { date: 'Sep 11', confidence: 81, accuracy: 83 },
  { date: 'Sep 13', confidence: 79, accuracy: 81 }
];

const labelerQueue = [
  { id: 1, type: 'Vehicle Detection', image: 'traffic_001.jpg', confidence: 0.65, priority: 'high' },
  { id: 2, type: 'Violation', image: 'violation_023.jpg', confidence: 0.72, priority: 'medium' },
  { id: 3, type: 'Traffic Sign', image: 'sign_045.jpg', confidence: 0.58, priority: 'high' },
  { id: 4, type: 'Lane Detection', image: 'lane_078.jpg', confidence: 0.69, priority: 'low' }
];

export function ModelMonitoring() {
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [retrainingModel, setRetrainingModel] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-50 text-green-700 border-green-200';
      case 'warning': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'drift': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'drift': return <TrendingDown className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const triggerRetrain = (modelId: string) => {
    setRetrainingModel(modelId);
    setTimeout(() => setRetrainingModel(null), 5000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Model Monitoring</h1>
          <p className="text-muted-foreground mt-1">AI model performance and health monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            4 Models Active
          </Badge>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh All
          </Button>
        </div>
      </div>

      {/* Model Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {models.map((model) => (
          <Card 
            key={model.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedModel.id === model.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedModel(model)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline" className={getStatusColor(model.status)}>
                  {getStatusIcon(model.status)}
                  <span className="ml-1 capitalize">{model.status}</span>
                </Badge>
                <span className="text-xs text-muted-foreground">{model.version}</span>
              </div>
              
              <h3 className="font-semibold text-sm mb-2">{model.name}</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Accuracy</span>
                  <span className="font-medium">{model.accuracy}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Latency</span>
                  <span className="font-medium">{model.latency}ms</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Throughput</span>
                  <span className="font-medium">{model.throughput}/min</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-muted-foreground">
                  Updated {model.lastUpdated}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Model Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              {selectedModel.name} - Detailed Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Model Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-semibold text-blue-600">{selectedModel.accuracy}%</p>
                <p className="text-sm text-muted-foreground">Accuracy</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-semibold text-green-600">{selectedModel.latency}ms</p>
                <p className="text-sm text-muted-foreground">Latency</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-semibold text-purple-600">{selectedModel.throughput}</p>
                <p className="text-sm text-muted-foreground">Throughput/min</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-semibold text-orange-600">{selectedModel.confidence}%</p>
                <p className="text-sm text-muted-foreground">Confidence</p>
              </div>
            </div>

            {/* Performance Chart */}
            <div>
              <h4 className="font-semibold mb-3">24-Hour Performance Trend</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Accuracy %"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="latency" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Latency (ms)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Model Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button 
                onClick={() => triggerRetrain(selectedModel.id)}
                disabled={retrainingModel === selectedModel.id}
                className="flex-1"
              >
                {retrainingModel === selectedModel.id ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Retraining...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Trigger Retrain
                  </>
                )}
              </Button>
              <Button variant="outline" className="flex-1">
                <Eye className="w-4 h-4 mr-2" />
                View Logs
              </Button>
              <Button variant="outline" className="flex-1">
                <Database className="w-4 h-4 mr-2" />
                Export Model
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Actions */}
        <div className="space-y-6">
          {/* Model Health Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Health Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Traffic Prediction model showing accuracy drift. Consider retraining.
                </AlertDescription>
              </Alert>
              
              <Alert>
                <TrendingDown className="h-4 w-4" />
                <AlertDescription>
                  Violation Detection confidence below threshold (78.9%).
                </AlertDescription>
              </Alert>

              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Auto-retrain</span>
                  <Switch defaultChecked />
                </div>
                <p className="text-xs text-muted-foreground">
                  Automatically retrain models when drift is detected
                </p>
              </div>
            </CardContent>
          </Card>

          {/* System Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">System Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>GPU Utilization</span>
                  <span>67%</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Memory Usage</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Storage</span>
                  <span>82%</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>

              <div className="pt-2 border-t text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Inference Queue</span>
                  <span>23 pending</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Drift Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Model Drift Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={driftData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="confidence" 
                stroke="#ef4444" 
                fill="#ef4444" 
                fillOpacity={0.1}
                name="Confidence %"
              />
              <Area 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.1}
                name="Accuracy %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Active Learning Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Active Learning Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {labelerQueue.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.image}</p>
                    <p className="text-xs text-muted-foreground">{item.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Confidence</p>
                    <p className="font-medium text-sm">{(item.confidence * 100).toFixed(1)}%</p>
                  </div>
                  <Badge 
                    variant={item.priority === 'high' ? 'destructive' : 
                           item.priority === 'medium' ? 'default' : 'secondary'}
                  >
                    {item.priority}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Label
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline">
              View All ({labelerQueue.length + 15} items)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}