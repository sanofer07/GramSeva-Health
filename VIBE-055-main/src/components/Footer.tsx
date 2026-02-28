import { Stethoscope, Heart, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">GramSeva Health</h3>
                <p className="text-sm opacity-70">Rural Telemedicine</p>
              </div>
            </div>
            <p className="opacity-70 max-w-md">
              Connecting rural communities to quality healthcare services. 
              Access doctors, book appointments, and get consultations from home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3 opacity-70">
              <li><Link to="/appointment" className="hover:opacity-100 transition-opacity">Book Appointment</Link></li>
              <li><Link to="/consultation" className="hover:opacity-100 transition-opacity">Video Consultation</Link></li>
              <li><Link to="/diseases" className="hover:opacity-100 transition-opacity">Disease Information</Link></li>
              <li><Link to="/doctors" className="hover:opacity-100 transition-opacity">Find Doctors</Link></li>
              <li><Link to="/pharmacy" className="hover:opacity-100 transition-opacity">Nearby Pharmacies</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 opacity-70">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>help@gramsevahealth.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="opacity-50 text-sm">
            © 2025 GramSeva Health. All rights reserved.
          </p>
          <div className="flex items-center gap-2 opacity-50 text-sm">
            <Heart className="w-4 h-4 text-accent" />
            <span>Made for Rural India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
