import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Stethoscope, 
  Menu, 
  X,
  Phone,
  Calendar,
  FileText,
  Video,
  User,
  Pill,
  LogIn,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, loading } = useAuth();

  const navItems = [
    { name: "Home", path: "/", icon: Stethoscope },
    { name: "Book Appointment", path: "/appointment", icon: Calendar },
    { name: "Video Consultation", path: "/consultation", icon: Video },
    { name: "Disease Info", path: "/diseases", icon: FileText },
    { name: "Doctors", path: "/doctors", icon: User },
    { name: "Pharmacy", path: "/pharmacy", icon: Pill },
    { name: "Contact", path: "/contact", icon: Phone },
  ];

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
              <Stethoscope className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-foreground">GramSeva Health</h1>
              <p className="text-xs text-muted-foreground">Rural Telemedicine</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Button>
              </Link>
            ))}
            
            {/* Auth Button */}
            {!loading && (
              user ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 ml-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              ) : (
                <Link to="/auth">
                  <Button
                    variant={location.pathname === "/auth" ? "default" : "outline"}
                    size="sm"
                    className="gap-2 ml-2"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </Button>
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 fade-in-up">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                  <Button
                    variant={location.pathname === item.path ? "default" : "ghost"}
                    className="w-full justify-start gap-3 text-lg"
                    size="lg"
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Button>
                </Link>
              ))}
              
              {/* Mobile Auth Button */}
              {!loading && (
                user ? (
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 text-lg"
                    size="lg"
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </Button>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button
                      variant={location.pathname === "/auth" ? "default" : "outline"}
                      className="w-full justify-start gap-3 text-lg"
                      size="lg"
                    >
                      <LogIn className="w-5 h-5" />
                      Login / Sign Up
                    </Button>
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
