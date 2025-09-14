import { useState, useRef, useCallback } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  CloudUpload, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  FileVideo,
  Clock,
  HardDrive,
  Car,
  Truck,
  Bike,
  User,
  BarChart3,
  Brain,
  Eye,
  Download,
  Zap
} from 'lucide-react';

interface UploadedFile {
  file: File;
  name: string;
  size: string;
  duration: string;
  url: string;
  thumbnail?: string;
}

interface DetectionData {
  cars: number;
  trucks: number;
  bikes: number;
  pedestrians: number;
  queueLength: number;
  congestionLevel: 'low' | 'medium' | 'high';
  totalVehicles: number;
}

export function VideoUpload() {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showOverlays, setShowOverlays] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  
  const [detections, setDetections] = useState<DetectionData>({
    cars: 0,
    trucks: 0,
    bikes: 0,
    pedestrians: 0,
    queueLength: 0,
    congestionLevel: 'low',
    totalVehicles: 0
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file.type.startsWith('video/')) {
      alert('Please select a valid video file');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Create video element to get duration
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    
    video.onloadedmetadata = () => {
      const fileData: UploadedFile = {
        file,
        name: file.name,
        size: formatFileSize(file.size),
        duration: formatDuration(video.duration),
        url: URL.createObjectURL(file)
      };

      setTimeout(() => {
        setUploadedFile(fileData);
        setIsUploading(false);
        setUploadProgress(100);
      }, 2000);
    };
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const runAIAnalysis = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with progressive detection updates
    const analysisInterval = setInterval(() => {
      setDetections(prev => ({
        cars: Math.max(0, prev.cars + Math.floor(Math.random() * 8) - 2),
        trucks: Math.max(0, prev.trucks + Math.floor(Math.random() * 3) - 1),
        bikes: Math.max(0, prev.bikes + Math.floor(Math.random() * 10) - 3),
        pedestrians: Math.max(0, prev.pedestrians + Math.floor(Math.random() * 6) - 2),
        queueLength: Math.max(0, prev.queueLength + Math.floor(Math.random() * 20) - 8),
        congestionLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
        totalVehicles: 0
      }));
    }, 1000);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setShowOverlays(true);
      clearInterval(analysisInterval);
      
      // Set final detection numbers
      setDetections({
        cars: 23,
        trucks: 4,
        bikes: 15,
        pedestrians: 8,
        queueLength: 45,
        congestionLevel: 'high',
        totalVehicles: 50
      });
    }, 8000);
  };

  const getCongestionColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AI Traffic Analysis</h1>
          <p className="text-muted-foreground">Upload traffic videos for real-time AI-powered analysis and insights</p>
        </div>
        <div className="flex items-center space-x-4">
          {analysisComplete && (
            <Badge variant="secondary" className="bg-green-400/10 text-green-400 border-green-400/20 animate-pulse">
              Analysis Complete
            </Badge>
          )}
          {isAnalyzing && (
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 animate-pulse">
              AI Processing...
            </Badge>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Upload/Video Panel */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6 border-border/50 bg-[#0B0B0F] rounded-2xl shadow-2xl">
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Upload Traffic Video</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Upload or drag & drop a video file to analyze traffic in real-time using AI.
              </p>
            </div>

            {!uploadedFile && !isUploading && (
              <div
                className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer ${
                  isDragOver 
                    ? 'border-primary bg-primary/10 glow-primary' 
                    : 'border-gray-600 hover:border-primary/50 hover:bg-primary/5'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
              >
                <CloudUpload className={`w-16 h-16 mx-auto mb-4 ${isDragOver ? 'text-primary glow-primary' : 'text-white'}`} />
                <div className="text-lg font-medium mb-2">
                  Click to upload or drag & drop your video here
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  Supported formats: MP4, AVI, MKV, MOV, WMV
                </div>
                <div className="text-xs text-muted-foreground">
                  Maximum file size: 500MB
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>
            )}

            {isUploading && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CloudUpload className="w-8 h-8 text-primary animate-pulse" />
                  <div className="flex-1">
                    <div className="text-lg font-medium">Uploading video...</div>
                    <div className="text-sm text-muted-foreground">Processing your video file</div>
                  </div>
                </div>
                <Progress value={uploadProgress} className="w-full" />
                <div className="text-center text-sm text-muted-foreground">
                  {Math.round(uploadProgress)}% complete
                </div>
              </div>
            )}

            {uploadedFile && (
              <div className="space-y-4">
                {/* Video Player */}
                <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                  <video
                    ref={videoRef}
                    src={uploadedFile.url}
                    className="w-full h-full object-cover"
                    controls={false}
                    muted={isMuted}
                  />
                  
                  {/* AI Overlays */}
                  {showOverlays && (
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Simulated detection boxes */}
                      <div className="absolute top-1/4 left-1/3 w-16 h-12 border-2 border-primary bg-primary/20 rounded animate-pulse">
                        <div className="absolute -top-6 left-0 bg-primary text-white text-xs px-2 py-1 rounded">
                          Car 0.95
                        </div>
                      </div>
                      <div className="absolute top-1/2 right-1/4 w-12 h-8 border-2 border-secondary bg-secondary/20 rounded animate-pulse">
                        <div className="absolute -top-6 left-0 bg-secondary text-black text-xs px-2 py-1 rounded">
                          Bike 0.87
                        </div>
                      </div>
                      <div className="absolute bottom-1/3 left-1/4 w-20 h-16 border-2 border-yellow-400 bg-yellow-400/20 rounded animate-pulse">
                        <div className="absolute -top-6 left-0 bg-yellow-400 text-black text-xs px-2 py-1 rounded">
                          Truck 0.92
                        </div>
                      </div>
                      <div className="absolute top-3/4 right-1/3 w-8 h-16 border-2 border-purple-400 bg-purple-400/20 rounded animate-pulse">
                        <div className="absolute -top-6 left-0 bg-purple-400 text-white text-xs px-2 py-1 rounded">
                          Person 0.89
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Video Controls */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            if (videoRef.current) {
                              if (isPlaying) {
                                videoRef.current.pause();
                              } else {
                                videoRef.current.play();
                              }
                              setIsPlaying(!isPlaying);
                            }
                          }}
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
                      </div>

                      {showOverlays && (
                        <Badge variant="destructive" className="animate-pulse">
                          ● AI OVERLAYS ACTIVE
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* File Info */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FileVideo className="w-4 h-4 text-primary" />
                    <div>
                      <div className="text-sm font-medium">{uploadedFile.name}</div>
                      <div className="text-xs text-muted-foreground">Filename</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <HardDrive className="w-4 h-4 text-secondary" />
                    <div>
                      <div className="text-sm font-medium">{uploadedFile.size}</div>
                      <div className="text-xs text-muted-foreground">File size</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <div>
                      <div className="text-sm font-medium">{uploadedFile.duration}</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button
                    onClick={runAIAnalysis}
                    disabled={isAnalyzing}
                    className="bg-[#FF2D95] hover:bg-[#FF2D95]/80 text-white glow-primary"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    {isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}
                  </Button>
                  
                  <Button
                    onClick={() => setShowOverlays(!showOverlays)}
                    disabled={!analysisComplete}
                    className="bg-[#00CFFF] hover:bg-[#00CFFF]/80 text-black glow-secondary"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {showOverlays ? 'Hide' : 'Show'} Overlays
                  </Button>
                  
                  <Button
                    disabled={!analysisComplete}
                    className="bg-[#FFD600] hover:bg-[#FFD600]/80 text-black"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Record Insights
                  </Button>
                  
                  <Button
                    disabled={!analysisComplete}
                    className="bg-[#00FF85] hover:bg-[#00FF85]/80 text-black"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right Side Panel - Analytics */}
        <div className="space-y-4">
          <Card className="p-4 border-border/50">
            <h4 className="font-semibold mb-4 flex items-center">
              <Eye className="w-4 h-4 mr-2 text-primary" />
              Real-Time Detections
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Car className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">Cars</span>
                </div>
                <Badge variant="secondary" className={isAnalyzing ? 'animate-pulse' : ''}>
                  {detections.cars}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm">Trucks</span>
                </div>
                <Badge variant="secondary" className={isAnalyzing ? 'animate-pulse' : ''}>
                  {detections.trucks}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bike className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Bikes</span>
                </div>
                <Badge variant="secondary" className={isAnalyzing ? 'animate-pulse' : ''}>
                  {detections.bikes}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">Pedestrians</span>
                </div>
                <Badge variant="secondary" className={isAnalyzing ? 'animate-pulse' : ''}>
                  {detections.pedestrians}
                </Badge>
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
                <span className={`text-sm font-medium ${isAnalyzing ? 'animate-pulse' : ''}`}>
                  {detections.queueLength}m
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Congestion Level</span>
                <span className={`text-sm font-medium ${getCongestionColor(detections.congestionLevel)} ${isAnalyzing ? 'animate-pulse' : ''}`}>
                  {detections.congestionLevel.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total Vehicles</span>
                <span className={`text-sm font-medium ${isAnalyzing ? 'animate-pulse' : ''}`}>
                  {detections.cars + detections.trucks + detections.bikes}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Analysis Status</span>
                <Badge 
                  variant={analysisComplete ? "default" : isAnalyzing ? "secondary" : "outline"}
                  className={`text-xs ${isAnalyzing ? 'animate-pulse' : ''}`}
                >
                  {analysisComplete ? 'Complete' : isAnalyzing ? 'Processing' : 'Pending'}
                </Badge>
              </div>
            </div>
          </Card>

          {analysisComplete && (
            <Card className="p-4 border-border/50 bg-primary/5 border-primary/20">
              <h4 className="font-semibold mb-4 flex items-center text-primary">
                <Zap className="w-4 h-4 mr-2" />
                AI Insights
              </h4>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-primary/10 rounded border border-primary/20">
                  <div className="font-medium text-primary mb-1">Traffic Flow Analysis</div>
                  <div className="text-xs text-muted-foreground">
                    High congestion detected. Average wait time: 85 seconds.
                  </div>
                </div>
                <div className="p-3 bg-yellow-400/10 rounded border border-yellow-400/20">
                  <div className="font-medium text-yellow-400 mb-1">Violation Detection</div>
                  <div className="text-xs text-muted-foreground">
                    2 traffic violations identified for challan processing.
                  </div>
                </div>
                <div className="p-3 bg-green-400/10 rounded border border-green-400/20">
                  <div className="font-medium text-green-400 mb-1">Optimization Potential</div>
                  <div className="text-xs text-muted-foreground">
                    Signal timing adjustments could reduce wait time by 23%.
                  </div>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-4 border-border/50">
            <h4 className="font-semibold mb-4">Export Options</h4>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                disabled={!analysisComplete}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Analysis Report
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                disabled={!analysisComplete}
              >
                <FileVideo className="w-4 h-4 mr-2" />
                Export Annotated Video
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                disabled={!analysisComplete}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Traffic Statistics CSV
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}