import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { 
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  CheckCircle2
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and message",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitted(true);
    toast({
      title: "Message Sent! ✅",
      description: "We'll get back to you soon"
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="medical-card p-10">
                <div className="w-20 h-20 rounded-full bg-medical-green/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-secondary" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">Thank You!</h2>
                <p className="text-muted-foreground mb-6">
                  Your message has been sent successfully. Our team will contact you shortly.
                </p>
                <Button variant="default" onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: "", email: "", phone: "", message: "" });
                }}>
                  Send Another Message
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <MessageCircle className="w-4 h-4" />
                <span>Get In Touch</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                Contact <span className="gradient-text">Us</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Have questions? We're here to help. Reach out to us anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="medical-card">
                <h2 className="text-xl font-bold mb-6 text-foreground">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-base">Your Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-2 h-12 text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-base">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-2 h-12 text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-base">Phone Number</Label>
                    <div className="flex mt-2">
                      <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-input bg-muted text-muted-foreground text-base">
                        +91
                      </span>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="rounded-l-none h-12 text-base"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-base">Your Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-2 min-h-[150px] text-base"
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    <Send className="w-5 h-5" />
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="medical-card">
                  <h2 className="text-xl font-bold mb-6 text-foreground">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">Phone</h3>
                        <p className="text-muted-foreground">+91 98765 43210</p>
                        <p className="text-muted-foreground">+91 98765 43211</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                        <Mail className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">Email</h3>
                        <p className="text-muted-foreground">help@nabhahealth.com</p>
                        <p className="text-muted-foreground">support@nabhahealth.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">Address</h3>
                        <p className="text-muted-foreground">
                          Nabha Health Center<br />
                          Main Market Road<br />
                          Nabha, Punjab 147201
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="medical-card bg-gradient-to-br from-primary/10 to-secondary/10">
                  <h3 className="font-bold text-foreground mb-2">Working Hours</h3>
                  <p className="text-muted-foreground mb-4">
                    Our support team is available during these hours:
                  </p>
                  <div className="space-y-2 text-foreground">
                    <div className="flex justify-between">
                      <span>Monday - Saturday</span>
                      <span className="font-medium">9:00 AM - 9:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium">10:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
