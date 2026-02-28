import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Video, 
  FileText, 
  Phone,
  Heart,
  Shield,
  Clock
} from "lucide-react";
import MedicalIcons from "@/components/MedicalIcons";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      <MedicalIcons />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 fade-in-up">
            <Heart className="w-4 h-4" />
            <span>Trusted Healthcare for Rural Communities</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 fade-in-up" style={{ animationDelay: "0.1s" }}>
            <span className="gradient-text">GramSeva</span> - Quality{" "}
            <span className="gradient-text">Healthcare</span> for Rural India
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto fade-in-up" style={{ animationDelay: "0.2s" }}>
            Access expert doctors, book appointments, and get video consultations from the comfort of your home. Anytime, anywhere.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/appointment">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                <Calendar className="w-6 h-6" />
                Start Appointment
              </Button>
            </Link>
            <Link to="/consultation">
              <Button variant="outline" size="xl" className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Video className="w-6 h-6" />
                Video Consultation
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 fade-in-up" style={{ animationDelay: "0.4s" }}>
            <FeatureCard
              icon={Clock}
              title="24/7 Available"
              description="Book appointments anytime between 9 AM - 9 PM"
            />
            <FeatureCard
              icon={Shield}
              title="Trusted Doctors"
              description="Verified healthcare professionals near you"
            />
            <FeatureCard
              icon={FileText}
              title="Disease Guide"
              description="Access information about common diseases"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) => (
  <div className="medical-card-hover p-6 text-center">
    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
      <Icon className="w-7 h-7 text-primary" />
    </div>
    <h3 className="text-lg font-bold mb-2 text-foreground">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

export default HeroSection;
