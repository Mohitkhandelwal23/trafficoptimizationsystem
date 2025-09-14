import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  PlayCircle, 
  PauseCircle, 
  RotateCcw, 
  Zap, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Settings,
  Brain
} from 'lucide-react';

const junctions = [
  { id: 1, name: 'MG Road - Brigade Road', mode: 'ai', status: 'active' },
  { id: 2, name: 'Silk Board Junction', mode: 'manual', status: 'active' },
  { id: 3, name: 'KR Puram Junction', mode: 'ai', status: 'active' },
  { id: 4, name: 'Electronic City Phase 1', mode: 'scheduled', status: 'active' },
  { id: 5, name: 'Marathahalli Bridge', mode: 'ai', status: 'maintenance' }
];

const corridors = [
  { id: 1, name: 'ORR South Corridor', junctions: 4, coordination: 'active' },
  { id: 2, name: 'Hosur Road Corridor', junctions: 6, coordination: 'active' },
  { id: 3, name: 'Whitefield Corridor', junctions: 5, coordination: 'inactive' }
];

export function SignalControl() {
  const [globalMode, setGlobalMode] = useState<'ai' | 'scheduled' | 'manual'>('ai');
  const [selectedJunction, setSelectedJunction] = useState(junctions[0]);
  const [manualPhases, setManualPhases] = useState({
    northSouth: 30,
    eastWest: 25,
    pedestrian: 15
  });
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [simulationRunning, setSimulationRunning] = useState(false);

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'ai': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'manual': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'scheduled': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const runSimulation = () => {
    setSimulationRunning(true);
    setTimeout(() => setSimulationRunning(false), 3000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Signal Control Center</h1>
          <p className="text-muted-foreground mt-1">Manage traffic signals and coordination</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge 
            variant="outline" 
            className={emergencyMode ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}
          >
            {emergencyMode ? 'Emergency Mode' : 'Normal Operation'}
          </Badge>
          <Button
            variant={emergencyMode ? "destructive" : "outline"}
            onClick={() => setEmergencyMode(!emergencyMode)}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Emergency Override
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Global Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Global Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Control Mode</Label>
              <Select value={globalMode} onValueChange={(value: any) => setGlobalMode(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai">AI Automated</SelectItem>
                  <SelectItem value="scheduled">Scheduled Plans</SelectItem>
                  <SelectItem value="manual">Manual Override</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <h4 className="font-medium">AI Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Efficiency</span>
                  <span className="text-green-600">+12.3%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Wait Time Reduction</span>
                  <span className="text-green-600">-18.7%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Throughput</span>
                  <span className="text-blue-600">+8.9%</span>
                </div>
              </div>
            </div>

            <Button 
              className="w-full" 
              onClick={runSimulation}
              disabled={simulationRunning}
            >
              {simulationRunning ? (
                <>
                  <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                  Running Simulation...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Run AI Simulation
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Junction List */}
        <Card>
          <CardHeader>
            <CardTitle>Junction Control</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {junctions.map((junction) => (
                <div
                  key={junction.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50
                    ${selectedJunction.id === junction.id ? 'bg-muted border-primary' : ''}`}
                  onClick={() => setSelectedJunction(junction)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{junction.name}</p>
                    <Badge variant="outline" className={getModeColor(junction.mode)}>
                      {junction.mode.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      junction.status === 'active' ? 'bg-green-500' : 'bg-orange-500'
                    }`}></div>
                    <span className="text-xs text-muted-foreground capitalize">{junction.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Manual Control Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Manual Control - {selectedJunction.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>North-South Phase: {manualPhases.northSouth}s</Label>
                <Slider
                  value={[manualPhases.northSouth]}
                  onValueChange={(value) => setManualPhases(prev => ({ ...prev, northSouth: value[0] }))}
                  min={10}
                  max={120}
                  step={5}
                  disabled={selectedJunction.mode === 'ai'}
                />
              </div>

              <div className="space-y-2">
                <Label>East-West Phase: {manualPhases.eastWest}s</Label>
                <Slider
                  value={[manualPhases.eastWest]}
                  onValueChange={(value) => setManualPhases(prev => ({ ...prev, eastWest: value[0] }))}
                  min={10}
                  max={120}
                  step={5}
                  disabled={selectedJunction.mode === 'ai'}
                />
              </div>

              <div className="space-y-2">
                <Label>Pedestrian Phase: {manualPhases.pedestrian}s</Label>
                <Slider
                  value={[manualPhases.pedestrian]}
                  onValueChange={(value) => setManualPhases(prev => ({ ...prev, pedestrian: value[0] }))}
                  min={5}
                  max={60}
                  step={5}
                  disabled={selectedJunction.mode === 'ai'}
                />
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <Button 
                className="w-full" 
                variant={selectedJunction.mode === 'manual' ? 'default' : 'outline'}
                disabled={selectedJunction.mode === 'ai'}
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                Apply Changes
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" disabled={selectedJunction.mode === 'ai'}>
                  <PauseCircle className="w-4 h-4 mr-1" />
                  Force Red
                </Button>
                <Button variant="outline" size="sm" disabled={selectedJunction.mode === 'ai'}>
                  <PlayCircle className="w-4 h-4 mr-1" />
                  Force Green
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Corridor Coordination */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Corridor Coordination
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {corridors.map((corridor) => (
              <div key={corridor.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{corridor.name}</h4>
                  <Switch 
                    checked={corridor.coordination === 'active'}
                    onCheckedChange={() => {}}
                  />
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>{corridor.junctions} linked junctions</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      corridor.coordination === 'active' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                    <span className="capitalize">{corridor.coordination}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Configure
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Preemption */}
      {emergencyMode && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <Zap className="w-5 h-5" />
              Emergency Preemption Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-700">All signals under emergency control</p>
                <p className="text-sm text-red-600 mt-1">Priority routing activated for emergency vehicles</p>
              </div>
              <Button variant="destructive" onClick={() => setEmergencyMode(false)}>
                Deactivate
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}