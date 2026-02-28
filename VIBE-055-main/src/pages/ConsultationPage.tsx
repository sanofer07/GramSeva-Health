import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Clock,
  User,
  Calendar
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ConsultationPage = () => {
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  // Mock appointment details
  const appointmentDetails = {
    doctor: "Dr. Rajesh Kumar",
    specialty: "General Physician",
    date: "December 28, 2025",
    time: "10:00 AM"
  };

  const startCall = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setStream(mediaStream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }
      setIsInCall(true);
      toast({
        title: "Connected!",
        description: "You are now in the consultation room"
      });
    } catch (error) {
      toast({
        title: "Camera Access Required",
        description: "Please allow camera and microphone access to join the call",
        variant: "destructive"
      });
    }
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setIsInCall(false);
    setIsMuted(false);
    setIsVideoOn(true);
    toast({
      title: "Call Ended",
      description: "Thank you for your consultation"
    });
  };

  const toggleMute = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = isMuted;
      });
    }
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoOn;
      });
    }
    setIsVideoOn(!isVideoOn);
  };

  // Ensure video element is updated when stream changes
  useEffect(() => {
    if (localVideoRef.current && stream && isVideoOn) {
      localVideoRef.current.srcObject = stream;
    }
  }, [stream, isVideoOn]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Video className="w-4 h-4" />
                <span>Video Consultation</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Virtual <span className="gradient-text">Consultation</span> Room
              </h1>
            </div>

            {/* Appointment Info Card */}
            {!isInCall && (
              <div className="medical-card mb-8 max-w-2xl mx-auto">
                <h2 className="text-xl font-bold mb-4 text-foreground">Upcoming Appointment</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Doctor</p>
                      <p className="font-medium text-sm">{appointmentDetails.doctor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="font-medium text-sm">{appointmentDetails.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Time</p>
                      <p className="font-medium text-sm">{appointmentDetails.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-soft-purple/10 flex items-center justify-center">
                      <Video className="w-5 h-5 text-soft-purple" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <p className="font-medium text-sm text-secondary">Ready</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Video Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Doctor's Video (Placeholder) */}
              <div className="medical-card overflow-hidden aspect-video relative">
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/90 to-foreground flex items-center justify-center">
                  <div className="text-center text-background">
                    <div className="w-24 h-24 rounded-full bg-background/20 flex items-center justify-center mx-auto mb-4">
                      <User className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-bold">{appointmentDetails.doctor}</h3>
                    <p className="opacity-70">{appointmentDetails.specialty}</p>
                    {isInCall && (
                      <p className="mt-2 text-sm opacity-50">Waiting for doctor to join...</p>
                    )}
                  </div>
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 bg-background/20 backdrop-blur-sm rounded-full text-background text-sm font-medium">
                  Doctor
                </div>
              </div>

              {/* Patient's Video (Local) */}
              <div className="medical-card overflow-hidden aspect-video relative bg-foreground/5">
                {isInCall && isVideoOn ? (
                  <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        {isVideoOn ? (
                          <Video className="w-12 h-12 text-muted-foreground" />
                        ) : (
                          <VideoOff className="w-12 h-12 text-destructive" />
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-foreground">You (Patient)</h3>
                      <p className="text-muted-foreground text-sm">
                        {isInCall ? "Camera is OFF - Doctor cannot see you" : "Click 'Join Call' to start"}
                      </p>
                    </div>
                  </div>
                )}
                <div className="absolute top-4 left-4 px-3 py-1 bg-foreground/80 backdrop-blur-sm rounded-full text-background text-sm font-medium">
                  You (Patient)
                </div>
                {/* Camera Status Indicator */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${isInCall ? (isVideoOn ? 'bg-secondary text-secondary-foreground' : 'bg-destructive text-destructive-foreground') : 'bg-muted text-muted-foreground'}`}>
                  {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  {isInCall ? (isVideoOn ? 'Camera ON' : 'Camera OFF') : 'Not Connected'}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              {isInCall ? (
                <>
                  <Button
                    variant={isMuted ? "destructive" : "outline"}
                    size="lg"
                    onClick={toggleMute}
                    className="w-16 h-16 rounded-full"
                  >
                    {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                  </Button>
                  
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={endCall}
                    className="w-20 h-20 rounded-full"
                  >
                    <PhoneOff className="w-8 h-8" />
                  </Button>

                  <Button
                    variant={!isVideoOn ? "destructive" : "outline"}
                    size="lg"
                    onClick={toggleVideo}
                    className="w-16 h-16 rounded-full"
                  >
                    {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                  </Button>
                </>
              ) : (
                <Button variant="hero" size="xl" onClick={startCall} className="min-w-[200px]">
                  <Phone className="w-6 h-6" />
                  Join Call
                </Button>
              )}
            </div>

            {/* Instructions */}
            {!isInCall && (
              <div className="mt-12 max-w-2xl mx-auto">
                <div className="medical-card">
                  <h3 className="text-lg font-bold mb-4 text-foreground">Before You Join</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">1</div>
                      <span>Make sure you have a stable internet connection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">2</div>
                      <span>Allow camera and microphone access when prompted</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">3</div>
                      <span>Find a quiet, well-lit place for your consultation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">4</div>
                      <span>Keep your medical reports or prescriptions ready if needed</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConsultationPage;
