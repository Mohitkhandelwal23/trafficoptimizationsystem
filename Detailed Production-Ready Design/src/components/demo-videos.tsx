import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Play, Upload } from 'lucide-react';

interface DemoVideosProps {
  onBackToLanding: () => void;
}

export function DemoVideos({ onBackToLanding }: DemoVideosProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Placeholder for demo videos - you can replace these with actual video URLs
  const demoVideos = [
    {
      id: 'demo-1',
      title: 'Traffic Intersection Analysis',
      thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFmZmljJTIwaW50ZXJzZWN0aW9uJTIwY2l0eXxlbnwxfHx8fDE3NTc3NDAyNzJ8MA&ixlib=rb-4.1.0&q=80&w=800',
      description: 'Real-time AI analysis of busy traffic intersection',
      duration: '2:30'
    },
    {
      id: 'demo-2',
      title: 'Vehicle Detection & Classification',
      thumbnail: 'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFmZmljJTIwY2FycyUyMGhpZ2h3YXl8ZW58MXx8fHwxNzU3NzQwMjcyfDA&ixlib=rb-4.1.0&q=80&w=800',
      description: 'YOLO-based detection of cars, trucks, motorcycles',
      duration: '1:45'
    },
    {
      id: 'demo-3',
      title: 'Signal Optimization Demo',
      thumbnail: 'https://images.unsplash.com/photo-1573160813959-df05f9cdbf55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFmZmljJTIwbGlnaHRzJTIwbmlnaHR8ZW58MXx8fHwxNzU3NzQwMjcyfDA&ixlib=rb-4.1.0&q=80&w=800',
      description: 'AI-powered traffic signal timing optimization',
      duration: '3:15'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBackToLanding}
              className="hover:bg-accent/20 hover:text-accent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Landing
            </Button>
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Netra AI Demo Videos
              </h1>
              <p className="text-muted-foreground mt-1">
                Watch our AI traffic management system in action
              </p>
            </div>
            <div className="w-24"></div> {/* Spacer for balance */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {selectedVideo ? (
          /* Video Player View */
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-card/50 border-border/40">
              <div className="aspect-video bg-black rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Video Player</p>
                  <p className="text-sm">Demo video will be displayed here</p>
                  <p className="text-xs mt-2 text-primary">Video ID: {selectedVideo}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    {demoVideos.find(v => v.id === selectedVideo)?.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {demoVideos.find(v => v.id === selectedVideo)?.description}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setSelectedVideo(null)}
                  className="border-border/40 hover:bg-accent/20"
                >
                  Back to Gallery
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          /* Demo Videos Gallery */
          <div>
            {/* Upload Notice */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-3 bg-card/50 border border-border/40 rounded-lg px-6 py-3">
                <Upload className="w-5 h-5 text-secondary" />
                <span className="text-muted-foreground">
                  Demo videos will be uploaded here soon
                </span>
              </div>
            </div>

            {/* Videos Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {demoVideos.map((video) => (
                <Card
                  key={video.id}
                  className="group cursor-pointer overflow-hidden bg-card/50 border-border/40 hover:border-primary/50 transition-all duration-300 hover:glow-primary"
                  onClick={() => setSelectedVideo(video.id)}
                >
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {video.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Coming Soon Section */}
            <div className="mt-16 text-center">
              <div className="max-w-2xl mx-auto bg-gradient-to-r from-card/50 to-card/30 border border-border/40 rounded-2xl p-8">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">More Demo Videos Coming Soon</h3>
                <p className="text-muted-foreground">
                  We're preparing additional demonstration videos showcasing advanced features like
                  violation detection, emergency vehicle priority, and real-time analytics.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                    <div className="text-primary font-medium">E-Challan System</div>
                  </div>
                  <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3">
                    <div className="text-secondary font-medium">Live Analytics</div>
                  </div>
                  <div className="bg-chart-3/10 border border-chart-3/20 rounded-lg p-3">
                    <div className="text-chart-3 font-medium">Emergency Priority</div>
                  </div>
                  <div className="bg-chart-4/10 border border-chart-4/20 rounded-lg p-3">
                    <div className="text-chart-4 font-medium">Model Monitoring</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}