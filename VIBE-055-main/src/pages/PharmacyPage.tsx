import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { 
  Pill,
  MapPin,
  Phone,
  Clock,
  Package,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PharmacyMedicine {
  id: string;
  medicine_name: string;
  quantity: number;
  unit: string | null;
  status: string | null;
  last_updated: string | null;
}

interface Pharmacy {
  id: string;
  name: string;
  location: string;
  contact_number: string;
  timings: string | null;
  last_updated: string | null;
  pharmacy_medicines: PharmacyMedicine[];
}

const PharmacyPage = () => {
  const { data: pharmacies, isLoading, refetch } = useQuery({
    queryKey: ['pharmacies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pharmacies')
        .select(`
          *,
          pharmacy_medicines (*)
        `)
        .order('name');
      
      if (error) throw error;
      return data as Pharmacy[];
    }
  });

  const formatLastUpdated = (dateStr: string | null) => {
    if (!dateStr) return "Not updated";
    const date = new Date(dateStr);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const time = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    return isToday ? `Today, ${time}` : `${date.toLocaleDateString('en-IN')}, ${time}`;
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case "available":
        return <CheckCircle2 className="w-4 h-4 text-secondary" />;
      case "low":
        return <AlertTriangle className="w-4 h-4 text-accent" />;
      case "out":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-secondary" />;
    }
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "available":
        return "bg-secondary/10 text-secondary border-secondary/30";
      case "low":
        return "bg-accent/10 text-accent border-accent/30";
      case "out":
        return "bg-destructive/10 text-destructive border-destructive/30";
      default:
        return "bg-secondary/10 text-secondary border-secondary/30";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-20 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading pharmacies...</p>
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
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Pill className="w-4 h-4" />
                <span>Medicine Availability</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                Nearby <span className="gradient-text">Pharmacies</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
                Find medicines at pharmacies near you with real-time stock information
              </p>

              <Button 
                variant="outline" 
                onClick={() => refetch()}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Stock
              </Button>
            </div>

            {/* Pharmacy Cards */}
            {pharmacies && pharmacies.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pharmacies.map((pharmacy) => (
                  <div key={pharmacy.id} className="medical-card">
                    {/* Pharmacy Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-foreground mb-2">{pharmacy.name}</h2>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                          <MapPin className="w-4 h-4" />
                          <span>{pharmacy.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                          <Phone className="w-4 h-4" />
                          <a href={`tel:+91${pharmacy.contact_number}`} className="hover:text-primary transition-colors">
                            +91 {pharmacy.contact_number}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{pharmacy.timings || '9:00 AM – 9:00 PM'}</span>
                        </div>
                      </div>
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Pill className="w-7 h-7 text-primary" />
                      </div>
                    </div>

                    {/* Last Updated */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
                      <RefreshCw className="w-4 h-4" />
                      <span>Last Updated: {formatLastUpdated(pharmacy.last_updated)}</span>
                    </div>

                    {/* Medicines List */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-5 h-5 text-primary" />
                        <h3 className="font-bold text-foreground">Available Medicines</h3>
                      </div>

                      <div className="space-y-2">
                        {pharmacy.pharmacy_medicines && pharmacy.pharmacy_medicines.length > 0 ? (
                          pharmacy.pharmacy_medicines.map((medicine) => (
                            <div 
                              key={medicine.id} 
                              className={`flex items-center justify-between p-3 rounded-xl border ${getStatusBadge(medicine.status)}`}
                            >
                              <div className="flex items-center gap-3">
                                {getStatusIcon(medicine.status)}
                                <span className="font-medium">{medicine.medicine_name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold">{medicine.quantity}</span>
                                <span className="text-sm opacity-70">{medicine.unit || 'units'}</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted-foreground text-center py-4">No medicines listed</p>
                        )}
                      </div>
                    </div>

                    {/* Call Button */}
                    <div className="mt-6 pt-4 border-t border-border">
                      <a href={`tel:+91${pharmacy.contact_number}`}>
                        <Button variant="medical" className="w-full gap-2">
                          <Phone className="w-5 h-5" />
                          Call Pharmacy
                        </Button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Pill className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">No Pharmacies Found</h3>
                <p className="text-muted-foreground">Pharmacy information will be added soon.</p>
              </div>
            )}

            {/* Legend */}
            <div className="mt-12 p-6 bg-muted/50 rounded-2xl">
              <h3 className="font-bold text-foreground mb-4">Stock Status Legend</h3>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-secondary" />
                  <span className="text-muted-foreground">Available (100+ units)</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  <span className="text-muted-foreground">Low Stock (21-100 units)</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  <span className="text-muted-foreground">Out of Stock (0-20 units)</span>
                </div>
              </div>
            </div>

            {/* Info Note */}
            <div className="mt-8 p-6 bg-primary/10 rounded-2xl border border-primary/30">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Daily Stock Updates</h3>
                  <p className="text-muted-foreground">
                    Medicine availability is updated daily by pharmacy staff. Stock information shown is approximate 
                    and may vary. Please call the pharmacy to confirm availability before visiting.
                  </p>
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

export default PharmacyPage;
