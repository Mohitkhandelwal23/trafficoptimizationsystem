import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Camera, 
  MapPin, 
  Users, 
  Bell, 
  Key, 
  Database,
  Plus,
  Edit,
  Trash2,
  Save,
  RotateCcw
} from 'lucide-react';

const cameras = [
  { 
    id: 'CAM001', 
    name: 'MG Road Junction Cam 1', 
    junction: 'MG Road - Brigade Road',
    status: 'online', 
    resolution: '1920x1080',
    fps: 30,
    lastPing: '2 min ago'
  },
  { 
    id: 'CAM002', 
    name: 'Silk Board Cam 1', 
    junction: 'Silk Board Junction',
    status: 'online', 
    resolution: '1920x1080',
    fps: 25,
    lastPing: '1 min ago'
  },
  { 
    id: 'CAM003', 
    name: 'Electronic City Cam 2', 
    junction: 'Electronic City Phase 1',
    status: 'offline', 
    resolution: '1280x720',
    fps: 0,
    lastPing: '2 hours ago'
  }
];

const users = [
  { id: 1, name: 'Admin User', email: 'admin@netra.gov.in', role: 'super-admin', lastLogin: '2 hours ago', status: 'active' },
  { id: 2, name: 'Traffic Controller', email: 'controller@netra.gov.in', role: 'operator', lastLogin: '30 min ago', status: 'active' },
  { id: 3, name: 'Data Analyst', email: 'analyst@netra.gov.in', role: 'auditor', lastLogin: '1 day ago', status: 'inactive' }
];

const junctions = [
  { id: 1, name: 'MG Road - Brigade Road', lat: 12.9716, lon: 77.5946, cameras: 3, signals: 4 },
  { id: 2, name: 'Silk Board Junction', lat: 12.9167, lon: 77.6233, cameras: 2, signals: 6 },
  { id: 3, name: 'Electronic City Phase 1', lat: 12.8456, lon: 77.6603, cameras: 4, signals: 4 }
];

export function Settings() {
  const [newCamera, setNewCamera] = useState({
    name: '',
    junction: '',
    ip: '',
    resolution: '1920x1080',
    fps: 30
  });
  const [isAddingCamera, setIsAddingCamera] = useState(false);

  const handleSaveCamera = () => {
    console.log('Saving camera:', newCamera);
    setIsAddingCamera(false);
    setNewCamera({ name: '', junction: '', ip: '', resolution: '1920x1080', fps: 30 });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">System Settings</h1>
          <p className="text-muted-foreground mt-1">Manage cameras, users, and system configuration</p>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="cameras" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="cameras">Cameras</TabsTrigger>
          <TabsTrigger value="junctions">Junctions</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="notifications">Alerts</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="cameras" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Camera Management
                </CardTitle>
                <Dialog open={isAddingCamera} onOpenChange={setIsAddingCamera}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Camera
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Camera</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="camera-name">Camera Name</Label>
                        <Input
                          id="camera-name"
                          placeholder="e.g., MG Road Cam 1"
                          value={newCamera.name}
                          onChange={(e) => setNewCamera(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="camera-junction">Junction</Label>
                        <Select value={newCamera.junction} onValueChange={(value) => setNewCamera(prev => ({ ...prev, junction: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select junction" />
                          </SelectTrigger>
                          <SelectContent>
                            {junctions.map(junction => (
                              <SelectItem key={junction.id} value={junction.name}>
                                {junction.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="camera-ip">IP Address</Label>
                        <Input
                          id="camera-ip"
                          placeholder="192.168.1.100"
                          value={newCamera.ip}
                          onChange={(e) => setNewCamera(prev => ({ ...prev, ip: e.target.value }))}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="camera-resolution">Resolution</Label>
                          <Select value={newCamera.resolution} onValueChange={(value) => setNewCamera(prev => ({ ...prev, resolution: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1920x1080">1920x1080 (FHD)</SelectItem>
                              <SelectItem value="1280x720">1280x720 (HD)</SelectItem>
                              <SelectItem value="640x480">640x480 (SD)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="camera-fps">FPS</Label>
                          <Input
                            id="camera-fps"
                            type="number"
                            min="1"
                            max="60"
                            value={newCamera.fps}
                            onChange={(e) => setNewCamera(prev => ({ ...prev, fps: parseInt(e.target.value) || 30 }))}
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button onClick={handleSaveCamera} className="flex-1">
                          Add Camera
                        </Button>
                        <Button variant="outline" onClick={() => setIsAddingCamera(false)} className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cameras.map((camera) => (
                  <div key={camera.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${camera.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <div>
                        <p className="font-medium">{camera.name}</p>
                        <p className="text-sm text-muted-foreground">{camera.junction}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-sm text-right">
                        <p className="font-medium">{camera.resolution}</p>
                        <p className="text-muted-foreground">{camera.fps} FPS</p>
                      </div>
                      <Badge variant={camera.status === 'online' ? 'secondary' : 'destructive'}>
                        {camera.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="junctions" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Junction Configuration
                </CardTitle>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Junction
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {junctions.map((junction) => (
                  <div key={junction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{junction.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Lat: {junction.lat}, Lon: {junction.lon}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-sm text-right">
                        <p className="font-medium">{junction.cameras} cameras</p>
                        <p className="text-muted-foreground">{junction.signals} signals</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Management
                </CardTitle>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-sm text-right">
                        <Badge variant="outline">{user.role}</Badge>
                        <p className="text-muted-foreground mt-1">Last: {user.lastLogin}</p>
                      </div>
                      <Badge variant={user.status === 'active' ? 'secondary' : 'outline'}>
                        {user.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Camera Offline Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified when cameras go offline</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">High Congestion Alerts</p>
                    <p className="text-sm text-muted-foreground">Alert when traffic congestion exceeds threshold</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Model Performance Alerts</p>
                    <p className="text-sm text-muted-foreground">Notify when model accuracy drops</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System Health Alerts</p>
                    <p className="text-sm text-muted-foreground">Alert on system errors or outages</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="pt-4 border-t space-y-4">
                <h4 className="font-medium">Alert Thresholds</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Congestion Threshold (%)</Label>
                    <Input type="number" defaultValue="85" min="0" max="100" />
                  </div>
                  <div className="space-y-2">
                    <Label>Model Accuracy Threshold (%)</Label>
                    <Input type="number" defaultValue="80" min="0" max="100" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                API Key Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Google Maps API</p>
                    <p className="text-sm text-muted-foreground">For satellite imagery and mapping</p>
                  </div>
                  <Button size="sm" variant="outline">Configure</Button>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">SMS Gateway API</p>
                    <p className="text-sm text-muted-foreground">For challan notifications</p>
                  </div>
                  <Button size="sm" variant="outline">Configure</Button>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Payment Gateway API</p>
                    <p className="text-sm text-muted-foreground">For challan payments</p>
                  </div>
                  <Button size="sm" variant="outline">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Data Retention</h4>
                  <div className="space-y-2">
                    <Label>Video Retention (days)</Label>
                    <Input type="number" defaultValue="30" min="1" max="365" />
                  </div>
                  <div className="space-y-2">
                    <Label>Analytics Data (months)</Label>
                    <Input type="number" defaultValue="12" min="1" max="60" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Performance Settings</h4>
                  <div className="space-y-2">
                    <Label>Inference Batch Size</Label>
                    <Input type="number" defaultValue="8" min="1" max="64" />
                  </div>
                  <div className="space-y-2">
                    <Label>Model Update Frequency (hours)</Label>
                    <Input type="number" defaultValue="24" min="1" max="168" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-4">System Maintenance</h4>
                <div className="flex gap-3">
                  <Button variant="outline">
                    <Database className="w-4 h-4 mr-2" />
                    Backup Database
                  </Button>
                  <Button variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Counters
                  </Button>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    System Restart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}