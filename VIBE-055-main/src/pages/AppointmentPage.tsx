import { useState } from "react";
import { format, addDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  FileText,
  CheckCircle2,
  Mail
} from "lucide-react";

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"
];

const AppointmentPage = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    email: "",
    healthIssue: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.gender || !formData.mobile || !formData.email || !date || !timeSlot) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Validate mobile number (10 digits)
    if (!/^\d{10}$/.test(formData.mobile)) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive"
      });
      return;
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitted(true);
    toast({
      title: "Appointment Booked! ✅",
      description: `Your appointment is confirmed for ${format(date, "PPP")} at ${timeSlot}`,
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="medical-card p-12">
                <div className="w-24 h-24 rounded-full bg-medical-green/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12 text-secondary" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  Appointment Confirmed!
                </h1>
                <p className="text-muted-foreground text-lg mb-8">
                  Your appointment has been successfully booked.
                </p>
                
                <div className="bg-muted/50 rounded-2xl p-6 text-left space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-primary" />
                    <span className="font-medium">Patient:</span>
                    <span className="text-muted-foreground">{formData.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    <span className="font-medium">Date:</span>
                    <span className="text-muted-foreground">{date && format(date, "PPP")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-medium">Time:</span>
                    <span className="text-muted-foreground">{timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="font-medium">Mobile:</span>
                    <span className="text-muted-foreground">+91 {formData.mobile}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="lg" onClick={() => window.location.href = "/consultation"}>
                    Join Video Consultation
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", age: "", gender: "", mobile: "", email: "", healthIssue: "" });
                    setDate(undefined);
                    setTimeSlot("");
                  }}>
                    Book Another
                  </Button>
                </div>
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
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <CalendarIcon className="w-4 h-4" />
                <span>Easy Booking</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                Book Your <span className="gradient-text">Appointment</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Fill in your details and choose a convenient time slot
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Patient Details */}
                <div className="medical-card">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
                    <User className="w-5 h-5 text-primary" />
                    Patient Details
                  </h2>
                  
                  <div className="space-y-5">
                    <div>
                      <Label htmlFor="name" className="text-base">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-2 h-12 text-base"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="age" className="text-base">Age *</Label>
                        <Input
                          id="age"
                          name="age"
                          type="number"
                          placeholder="Years"
                          value={formData.age}
                          onChange={handleInputChange}
                          className="mt-2 h-12 text-base"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender" className="text-base">Gender *</Label>
                        <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
                          <SelectTrigger className="mt-2 h-12 text-base">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="mobile" className="text-base">Mobile Number *</Label>
                      <div className="flex mt-2">
                        <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-input bg-muted text-muted-foreground text-base">
                          +91
                        </span>
                        <Input
                          id="mobile"
                          name="mobile"
                          placeholder="10-digit number"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          className="rounded-l-none h-12 text-base"
                          maxLength={10}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-base">Email Address *</Label>
                      <div className="flex items-center mt-2">
                        <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-input bg-muted text-muted-foreground text-base h-12">
                          <Mail className="w-5 h-5" />
                        </span>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="rounded-l-none h-12 text-base"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="healthIssue" className="text-base">Health Issue / Description</Label>
                      <Textarea
                        id="healthIssue"
                        name="healthIssue"
                        placeholder="Describe your health issue or symptoms..."
                        value={formData.healthIssue}
                        onChange={handleInputChange}
                        className="mt-2 min-h-[120px] text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Date & Time Selection */}
                <div className="space-y-8">
                  <div className="medical-card">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
                      <CalendarIcon className="w-5 h-5 text-primary" />
                      Select Date *
                    </h2>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
                      className="rounded-xl border-0 pointer-events-auto"
                    />
                  </div>

                  <div className="medical-card">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
                      <Clock className="w-5 h-5 text-primary" />
                      Select Time Slot *
                    </h2>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot}
                          type="button"
                          variant={timeSlot === slot ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTimeSlot(slot)}
                          className="text-sm"
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 text-center">
                <Button type="submit" variant="hero" size="xl" className="w-full sm:w-auto min-w-[300px]">
                  <CheckCircle2 className="w-6 h-6" />
                  Confirm Appointment
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppointmentPage;
