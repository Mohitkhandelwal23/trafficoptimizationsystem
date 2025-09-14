import { useState, useRef, useCallback } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Upload,
  FileVideo,
  Car,
  Truck,
  Bike,
  User,
  Timer,
  Leaf,
  Route,
  Mic,
  Languages,
  Zap
} from 'lucide-react';

interface LaneData {
  id: number;
  count: number;
  vehicles: {
    cars: number;
    trucks: number;
    bikes: number;
    pedestrians: number;
  };
}

export function TrafficAIDashboard() {
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [currentSignal, setCurrentSignal] = useState({ lane: 2, remaining: 45 });
  const [pedestrianPriority, setPedestrianPriority] = useState('None');
  const [emergencyDetected, setEmergencyDetected] = useState(null);
  
  const [laneData, setLaneData] = useState<LaneData[]>([
    { id: 1, count: 23, vehicles: { cars: 15, trucks: 3, bikes: 4, pedestrians: 1 } },
    { id: 2, count: 31, vehicles: { cars: 20, trucks: 5, bikes: 5, pedestrians: 1 } },
    { id: 3, count: 18, vehicles: { cars: 12, trucks: 2, bikes: 3, pedestrians: 1 } }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback((file: File) => {
    if (!file.type.startsWith('video/')) {
      alert('Please select a valid video file');
      return;
    }

    setVideoUploaded(true);
    setIsAnalyzing(true);
    
    // Simulate analysis completion after 3 seconds
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const totalVehicles = laneData.reduce((total, lane) => total + lane.count, 0);
  const co2Reduction = 24.7; // kg

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-white p-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-b from-[#FF3B3B] via-[#FFD600] to-[#00FF6A] rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-[#0B0B0E] rounded-md flex flex-col items-center justify-center space-y-0.5">
              <div className="w-1.5 h-1.5 bg-[#FF3B3B] rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-[#FFD600] rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-[#00FF6A] rounded-full"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Traffic AI Dashboard
          </h1>
        </div>
        <div className="w-48 h-1 bg-gradient-to-r from-[#00FF6A] via-[#4D9FFF] to-[#FF3B3B] mx-auto rounded-full glow-primary"></div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-8 mb-6">
        {/* Left Column - Video Player & Analysis */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-0 bg-gradient-to-br from-[#0F0F14] to-[#1A1A20] border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
            {/* Upload Button */}
            <div className="p-6 border-b border-gray-700">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-gradient-to-r from-[#4D9FFF] to-[#00FF6A] hover:from-[#00FF6A] hover:to-[#4D9FFF] text-black font-bold py-3 px-6 rounded-2xl transition-all duration-300 glow-secondary"
              >
                <Upload className="w-5 h-5 mr-3" />
                Upload Traffic Video
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Video Player Box */}
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black p-4">
              <div className="w-full h-full bg-black rounded-xl overflow-hidden relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFmZmljJTIwaW50ZXJzZWN0aW9uJTIwY2l0eXxlbnwxfHx8fDE3NTc3NDAyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Traffic Analysis Video"
                  className="w-full h-full object-cover"
                />
                
                {/* Lane Labels */}
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  {laneData.map((lane) => (
                    <div key={lane.id} className="bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg">
                      <span className="text-[#00FF6A] font-bold text-sm">Lane {lane.id}</span>
                      <div className="text-white text-xs">{lane.count} vehicles</div>
                    </div>
                  ))}
                </div>

                {/* YOLO-style Bounding Boxes */}
                {videoUploaded && (
                  <>
                    {/* Car - Green Box */}
                    <div 
                      className="absolute border-2 border-[#00FF6A] bg-[#00FF6A]/20 rounded"
                      style={{ left: '25%', top: '35%', width: '80px', height: '50px' }}
                    >
                      <div className="absolute -top-6 left-0 bg-[#00FF6A] text-black px-2 py-1 rounded text-xs font-bold">
                        car 0.95
                      </div>
                    </div>

                    {/* Truck - Yellow Box */}
                    <div 
                      className="absolute border-2 border-[#FFD600] bg-[#FFD600]/20 rounded"
                      style={{ left: '55%', top: '25%', width: '100px', height: '60px' }}
                    >
                      <div className="absolute -top-6 left-0 bg-[#FFD600] text-black px-2 py-1 rounded text-xs font-bold">
                        truck 0.92
                      </div>
                    </div>

                    {/* Motorcycle - Blue Box */}
                    <div 
                      className="absolute border-2 border-[#4D9FFF] bg-[#4D9FFF]/20 rounded"
                      style={{ left: '70%', top: '55%', width: '50px', height: '35px' }}
                    >
                      <div className="absolute -top-6 left-0 bg-[#4D9FFF] text-black px-2 py-1 rounded text-xs font-bold">
                        motorcycle 0.88
                      </div>
                    </div>

                    {/* Pedestrian - Red Box */}
                    <div 
                      className="absolute border-2 border-[#FF3B3B] bg-[#FF3B3B]/20 rounded"
                      style={{ left: '10%', top: '60%', width: '30px', height: '60px' }}
                    >
                      <div className="absolute -top-6 left-0 bg-[#FF3B3B] text-white px-2 py-1 rounded text-xs font-bold">
                        pedestrian 0.91
                      </div>
                    </div>

                    {/* Bus - Green Box */}
                    <div 
                      className="absolute border-2 border-[#00FF6A] bg-[#00FF6A]/20 rounded"
                      style={{ left: '35%', top: '15%', width: '120px', height: '70px' }}
                    >
                      <div className="absolute -top-6 left-0 bg-[#00FF6A] text-black px-2 py-1 rounded text-xs font-bold">
                        bus 0.97
                      </div>
                    </div>
                  </>
                )}

                {/* Upload Overlay */}
                {!videoUploaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="text-center">
                      <FileVideo className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 text-lg font-medium">Upload a video to start analysis</p>
                      <p className="text-gray-500 text-sm mt-2">AI detection will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Insights Panel */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-[#0F0F14] to-[#1A1A20] border-gray-700 rounded-2xl shadow-2xl">
            <h3 className="text-xl font-bold mb-6 text-[#00FF6A]">Live Insights</h3>
            
            {/* Lane Counts */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <Car className="w-5 h-5 mr-2 text-[#4D9FFF]" />
                Lane Counts
              </h4>
              <div className="space-y-3">
                {laneData.map((lane) => (
                  <div key={lane.id} className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-700">
                    <span className="font-medium">Lane {lane.id}</span>
                    <Badge className="bg-[#00FF6A]/20 text-[#00FF6A] border-[#00FF6A]/30 font-bold">
                      {lane.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Signal Info */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-[#FFD600]" />
                Signal Status
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#00FF6A]/10 rounded-lg border border-[#00FF6A]/30">
                  <span className="font-medium">Current Green Signal</span>
                  <Badge className="bg-[#00FF6A] text-black font-bold">
                    Lane {currentSignal.lane}
                  </Badge>
                </div>
                
                <div className="p-3 bg-black/30 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium flex items-center">
                      <Timer className="w-4 h-4 mr-2 text-[#FFD600]" />
                      Green Time Remaining
                    </span>
                    <span className="font-bold text-[#FFD600]">{currentSignal.remaining}s</span>
                  </div>
                  <Progress 
                    value={(currentSignal.remaining / 60) * 100} 
                    className="h-3 bg-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Priority Status */}
            <div className="mb-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <span className="font-medium flex items-center">
                    <User className="w-4 h-4 mr-2 text-purple-400" />
                    Pedestrian Priority
                  </span>
                  <Badge variant="outline" className="border-purple-400/30 text-purple-400">
                    {pedestrianPriority}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-[#FF3B3B]/10 rounded-lg border border-[#FF3B3B]/30">
                  <span className="font-medium flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-[#FF3B3B]" />
                    Emergency Lane
                  </span>
                  <Badge variant="outline" className="border-[#FF3B3B]/30 text-[#FF3B3B]">
                    {emergencyDetected || 'Clear'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Extra Info */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-4">Environmental Impact</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#00FF6A]/10 rounded-lg border border-[#00FF6A]/30">
                  <span className="font-medium flex items-center">
                    <Leaf className="w-4 h-4 mr-2 text-[#00FF6A]" />
                    CO₂ Reduction
                  </span>
                  <span className="font-bold text-[#00FF6A]">{co2Reduction} kg</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-[#4D9FFF]/10 rounded-lg border border-[#4D9FFF]/30">
                  <span className="font-medium flex items-center">
                    <Route className="w-4 h-4 mr-2 text-[#4D9FFF]" />
                    Alternate Route
                  </span>
                  <Button size="sm" className="bg-[#4D9FFF]/20 hover:bg-[#4D9FFF]/30 text-[#4D9FFF] border-[#4D9FFF]/30">
                    Available
                  </Button>
                </div>
              </div>
            </div>

            {/* Toggle Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-3">
                  <Mic className="w-5 h-5 text-[#00FF6A]" />
                  <span className="font-medium">Voice</span>
                </div>
                <Switch
                  checked={voiceEnabled}
                  onCheckedChange={setVoiceEnabled}
                  className={voiceEnabled ? 'glow-primary' : ''}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-3">
                  <Languages className="w-5 h-5 text-[#4D9FFF]" />
                  <span className="font-medium">Language</span>
                </div>
                <Button
                  size="sm"
                  onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
                  className="bg-[#4D9FFF]/20 hover:bg-[#4D9FFF]/30 text-[#4D9FFF] border border-[#4D9FFF]/30 font-bold min-w-[50px]"
                >
                  {language}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#0F0F14] via-[#1A1A20] to-[#0F0F14] border-t border-gray-700 px-6 py-4">
        <div className="flex items-center justify-center space-x-4">
          <div className={`w-3 h-3 rounded-full ${isAnalyzing ? 'bg-[#00FF6A] animate-pulse' : 'bg-[#FF3B3B]'}`}></div>
          <span className="text-lg font-medium">
            {isAnalyzing ? (
              <>
                Analyzing Traffic Video in Real-Time
                <span className="inline-block animate-pulse">...</span>
              </>
            ) : videoUploaded ? (
              'Analysis Complete - AI Detection Active'
            ) : (
              'Ready for Traffic Video Upload'
            )}
          </span>
        </div>
      </div>
    </div>
  );
}