import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Phone,
  User,
  Clock,
  MapPin,
  Stethoscope,
  Heart,
  Baby,
  Bone,
  Brain,
  Eye
} from "lucide-react";

const doctors = [
  {
    name: "Dr. Rajesh Kumar",
    specialty: "General Physician",
    icon: Stethoscope,
    location: "Amloh Road, Near Nabha",
    phone: "9876543210",
    timing: "9:00 AM - 9:00 PM",
    experience: "15 years",
    color: "bg-primary/10 text-primary"
  },
  {
    name: "Dr. Priya Sharma",
    specialty: "Gynecologist",
    icon: Baby,
    location: "Patiala Road, Nabha Bypass",
    phone: "9812345678",
    timing: "10:00 AM - 6:00 PM",
    experience: "12 years",
    color: "bg-accent/10 text-accent"
  },
  {
    name: "Dr. Amit Singh",
    specialty: "Cardiologist",
    icon: Heart,
    location: "Sangrur Road, Near Nabha",
    phone: "9898765432",
    timing: "9:00 AM - 5:00 PM",
    experience: "18 years",
    color: "bg-destructive/10 text-destructive"
  },
  {
    name: "Dr. Sunita Kaur",
    specialty: "Pediatrician",
    icon: Baby,
    location: "Dhuri Road, Nabha Outskirts",
    phone: "9871234567",
    timing: "10:00 AM - 8:00 PM",
    experience: "10 years",
    color: "bg-secondary/10 text-secondary"
  },
  {
    name: "Dr. Vikram Mehta",
    specialty: "Orthopedic",
    icon: Bone,
    location: "Malerkotla Road, Near Nabha",
    phone: "9845678901",
    timing: "9:00 AM - 7:00 PM",
    experience: "20 years",
    color: "bg-soft-purple/10 text-soft-purple"
  },
  {
    name: "Dr. Neha Gupta",
    specialty: "Neurologist",
    icon: Brain,
    location: "Rajpura Road, Nabha Area",
    phone: "9867890123",
    timing: "11:00 AM - 6:00 PM",
    experience: "14 years",
    color: "bg-primary/10 text-primary"
  },
  {
    name: "Dr. Harpreet Singh",
    specialty: "Ophthalmologist",
    icon: Eye,
    location: "Barnala Road, Near Nabha",
    phone: "9823456789",
    timing: "9:00 AM - 5:00 PM",
    experience: "16 years",
    color: "bg-accent/10 text-accent"
  },
  {
    name: "Dr. Manpreet Kaur",
    specialty: "Dermatologist",
    icon: User,
    location: "Patiala Road, Nabha Junction",
    phone: "9834567890",
    timing: "10:00 AM - 7:00 PM",
    experience: "8 years",
    color: "bg-secondary/10 text-secondary"
  }
];

const DoctorsPage = () => {
  const handleCall = (phone: string) => {
    window.location.href = `tel:+91${phone}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <User className="w-4 h-4" />
                <span>Verified Doctors</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                Find <span className="gradient-text">Doctors</span> Near You
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Contact verified healthcare professionals located around Nabha area
              </p>
            </div>

            {/* Doctor Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor, index) => (
                <div key={index} className="medical-card-hover">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${doctor.color} flex items-center justify-center shrink-0`}>
                      <doctor.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{doctor.name}</h3>
                      <p className="text-primary font-medium">{doctor.specialty}</p>
                      <p className="text-muted-foreground text-sm">{doctor.experience} experience</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="text-sm">{doctor.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="w-4 h-4 shrink-0" />
                      <span className="text-sm">{doctor.timing}</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground font-medium">
                      <Phone className="w-4 h-4 shrink-0 text-secondary" />
                      <span>+91 {doctor.phone}</span>
                    </div>
                  </div>

                  <Button 
                    variant="success" 
                    className="w-full"
                    onClick={() => handleCall(doctor.phone)}
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </Button>
                </div>
              ))}
            </div>

            {/* Emergency Notice */}
            <div className="mt-12 p-6 bg-destructive/10 rounded-2xl border border-destructive/30">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">Emergency?</h3>
                    <p className="text-muted-foreground">Call emergency services immediately</p>
                  </div>
                </div>
                <Button variant="destructive" size="lg" onClick={() => window.location.href = "tel:108"}>
                  <Phone className="w-5 h-5" />
                  Call 108 (Ambulance)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorsPage;
