import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  Video,
  FileText,
  Phone,
  Pill,
  ArrowRight
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Calendar,
      title: "Book Appointment",
      description: "Schedule consultations with available doctors at your convenience",
      link: "/appointment",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: Video,
      title: "Video Consultation",
      description: "Connect face-to-face with doctors through secure video calls",
      link: "/consultation",
      color: "bg-secondary/10 text-secondary"
    },
    {
      icon: FileText,
      title: "Disease Information",
      description: "Learn about common diseases, symptoms, and recommended medicines",
      link: "/diseases",
      color: "bg-accent/10 text-accent"
    },
    {
      icon: Phone,
      title: "Contact Doctors",
      description: "Find and reach out to verified doctors in your area",
      link: "/doctors",
      color: "bg-soft-purple/10 text-soft-purple"
    },
    {
      icon: Pill,
      title: "Nearby Pharmacies",
      description: "Find medicines at pharmacies near you with real-time stock updates",
      link: "/pharmacy",
      color: "bg-secondary/10 text-secondary"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive healthcare services designed for rural communities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link key={index} to={service.link}>
              <div className="medical-card-hover h-full group">
                <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="flex items-center gap-2 text-primary font-medium">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
