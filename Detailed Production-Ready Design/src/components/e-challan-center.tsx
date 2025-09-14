import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  FileText, 
  Camera, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Clock,
  CreditCard,
  Search,
  Filter,
  Download
} from 'lucide-react';

const violations = [
  {
    id: 'VIO001',
    type: 'Red Light Jump',
    junction: 'MG Road - Brigade Road',
    timestamp: '2024-09-14 14:30:45',
    vehicle: 'KA 01 AB 1234',
    confidence: 94,
    status: 'pending',
    evidence: 'https://images.unsplash.com/photo-1674683685332-894bed153f19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwdHJhZmZpYyUyMG1vbml0b3JpbmclMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzU3ODMxMTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    estimatedFine: 1000
  },
  {
    id: 'VIO002',
    type: 'Overspeeding',
    junction: 'Electronic City Phase 1',
    timestamp: '2024-09-14 13:15:22',
    vehicle: 'KA 05 XY 9876',
    confidence: 87,
    status: 'pending',
    evidence: 'https://images.unsplash.com/photo-1674683685332-894bed153f19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwdHJhZmZpYyUyMG1vbml0b3JpbmclMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzU3ODMxMTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    speed: '68 km/h',
    speedLimit: '50 km/h',
    estimatedFine: 500
  },
  {
    id: 'VIO003',
    type: 'Wrong Lane',
    junction: 'Silk Board Junction',
    timestamp: '2024-09-14 12:45:18',
    vehicle: 'KA 03 MN 5432',
    confidence: 91,
    status: 'approved',
    evidence: 'https://images.unsplash.com/photo-1674683685332-894bed153f19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwdHJhZmZpYyUyMG1vbml0b3JpbmclMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzU3ODMxMTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    estimatedFine: 300
  }
];

const challans = [
  {
    id: 'CH001',
    violationId: 'VIO003',
    vehicle: 'KA 03 MN 5432',
    fine: 300,
    status: 'paid',
    issuedAt: '2024-09-14 15:00:00',
    paidAt: '2024-09-14 16:45:22',
    paymentRef: 'PAY123456789'
  },
  {
    id: 'CH002',
    violationId: 'VIO004',
    vehicle: 'KA 02 CD 7890',
    fine: 1000,
    status: 'pending',
    issuedAt: '2024-09-14 11:30:15',
    dueDate: '2024-09-24 23:59:59'
  }
];

export function EChallanCenter() {
  const [selectedViolation, setSelectedViolation] = useState<typeof violations[0] | null>(null);
  const [issuingChallan, setIssuingChallan] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleApproveViolation = (violationId: string) => {
    console.log('Approving violation:', violationId);
    setIssuingChallan(true);
    setTimeout(() => {
      setIssuingChallan(false);
      setSelectedViolation(null);
    }, 2000);
  };

  const handleRejectViolation = (violationId: string) => {
    console.log('Rejecting violation:', violationId);
    setSelectedViolation(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-900/20 text-orange-400 border-orange-400/30';
      case 'approved': return 'bg-green-900/20 text-green-400 border-green-400/30';
      case 'rejected': return 'bg-red-900/20 text-red-400 border-red-400/30';
      case 'paid': return 'bg-blue-900/20 text-blue-400 border-blue-400/30';
      default: return 'bg-gray-900/20 text-gray-400 border-gray-400/30';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 80) return 'text-orange-400';
    return 'text-red-400';
  };

  const filteredViolations = violations.filter(violation => {
    const matchesSearch = violation.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         violation.junction.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         violation.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || violation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
            E-Challan Center
          </h1>
          <p className="text-muted-foreground mt-1">AI-powered violation detection and challan management</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="live-indicator bg-orange-900/20 text-orange-400 border-orange-400/30">
            {violations.filter(v => v.status === 'pending').length} Pending Review
          </Badge>
          <Button variant="outline" className="border-white/20 hover:bg-white/5">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="violations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="violations">Violation Queue</TabsTrigger>
          <TabsTrigger value="challans">Active Challans</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="violations" className="space-y-6">
          {/* Filters */}
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardContent className="p-4">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by vehicle, junction, or violation type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="w-48">
                  <Label>Status Filter</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Violation Queue */}
          <div className="grid gap-4">
            {filteredViolations.map((violation) => (
              <Card key={violation.id} className="bg-card/50 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-16 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                      <Camera className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold">{violation.vehicle}</h3>
                        <Badge variant="outline" className={getStatusColor(violation.status)}>
                          {violation.status.toUpperCase()}
                        </Badge>
                        <span className={`text-sm font-medium ${getConfidenceColor(violation.confidence)}`}>
                          {violation.confidence}% confidence
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {violation.type} at {violation.junction}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {violation.timestamp}
                        </span>
                        {violation.speed && (
                          <span>Speed: {violation.speed} (Limit: {violation.speedLimit})</span>
                        )}
                        <span className="flex items-center gap-1">
                          <CreditCard className="w-3 h-3" />
                          ₹{violation.estimatedFine}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedViolation(violation)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Review
                      </Button>
                      {violation.status === 'pending' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApproveViolation(violation.id)}
                            className="text-green-400 border-green-400/30 hover:bg-green-900/20"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRejectViolation(violation.id)}
                            className="text-red-400 border-red-400/30 hover:bg-red-900/20"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challans" className="space-y-6">
          <div className="grid gap-4">
            {challans.map((challan) => (
              <Card key={challan.id} className="bg-card/50 backdrop-blur-sm border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold">{challan.id}</h3>
                        <Badge variant="outline" className={getStatusColor(challan.status)}>
                          {challan.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Vehicle: {challan.vehicle} • Fine: ₹{challan.fine}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Issued: {challan.issuedAt}</span>
                        {challan.paidAt && <span>Paid: {challan.paidAt}</span>}
                        {challan.dueDate && <span>Due: {challan.dueDate}</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      {challan.status === 'pending' && (
                        <Button variant="outline" size="sm">
                          Send Reminder
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border-white/10">
              <CardContent className="p-6 text-center">
                <p className="text-2xl font-bold text-cyan-400">1,247</p>
                <p className="text-sm text-muted-foreground">Total Challans Issued</p>
                <p className="text-xs text-green-400 mt-1">+18% this month</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-white/10">
              <CardContent className="p-6 text-center">
                <p className="text-2xl font-bold text-green-400">₹4,23,500</p>
                <p className="text-sm text-muted-foreground">Revenue Collected</p>
                <p className="text-xs text-green-400 mt-1">+22% this month</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-white/10">
              <CardContent className="p-6 text-center">
                <p className="text-2xl font-bold text-orange-400">87.3%</p>
                <p className="text-sm text-muted-foreground">Payment Rate</p>
                <p className="text-xs text-green-400 mt-1">+3.2% improvement</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Violation Review Modal */}
      <Dialog open={!!selectedViolation} onOpenChange={() => setSelectedViolation(null)}>
        <DialogContent className="max-w-4xl bg-card/95 backdrop-blur-sm border-white/10">
          <DialogHeader>
            <DialogTitle>
              Violation Review - {selectedViolation?.id}
            </DialogTitle>
            <DialogDescription>
              Review violation evidence and approve or reject the AI detection for challan issuance.
            </DialogDescription>
          </DialogHeader>
          
          {selectedViolation && (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Evidence</h3>
                  <div className="aspect-video bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                    <img 
                      src={selectedViolation.evidence} 
                      alt="Violation Evidence"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Violation Details</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Vehicle:</span>
                      <span className="font-medium">{selectedViolation.vehicle}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Violation:</span>
                      <span className="font-medium">{selectedViolation.type}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">{selectedViolation.junction}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-medium">{selectedViolation.timestamp}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">AI Confidence:</span>
                      <span className={`font-medium ${getConfidenceColor(selectedViolation.confidence)}`}>
                        {selectedViolation.confidence}%
                      </span>
                    </div>
                    {selectedViolation.speed && (
                      <>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <span className="text-muted-foreground">Detected Speed:</span>
                          <span className="font-medium">{selectedViolation.speed}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <span className="text-muted-foreground">Speed Limit:</span>
                          <span className="font-medium">{selectedViolation.speedLimit}</span>
                        </div>
                      </>
                    )}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Estimated Fine:</span>
                      <span className="font-medium">₹{selectedViolation.estimatedFine}</span>
                    </div>
                  </div>
                </div>

                {selectedViolation.status === 'pending' && (
                  <div className="space-y-3 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="remarks">Review Remarks</Label>
                      <Textarea
                        id="remarks"
                        placeholder="Add review comments..."
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
                        onClick={() => handleApproveViolation(selectedViolation.id)}
                        disabled={issuingChallan}
                      >
                        {issuingChallan ? (
                          <>Issuing Challan...</>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve & Issue Challan
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-red-400/30 text-red-400 hover:bg-red-900/20"
                        onClick={() => handleRejectViolation(selectedViolation.id)}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}