import { Stethoscope, Pill, Heart, Activity, Thermometer } from "lucide-react";

const MedicalIcons = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating medical icons */}
      <div className="absolute top-20 left-[10%] animate-float opacity-20">
        <Stethoscope className="w-16 h-16 text-primary" />
      </div>
      <div className="absolute top-40 right-[15%] animate-float-delayed opacity-20">
        <Pill className="w-12 h-12 text-secondary" />
      </div>
      <div className="absolute bottom-40 left-[20%] animate-float opacity-15">
        <Heart className="w-14 h-14 text-accent" />
      </div>
      <div className="absolute bottom-32 right-[10%] animate-float-delayed opacity-20">
        <Activity className="w-16 h-16 text-primary" />
      </div>
      <div className="absolute top-60 left-[5%] animate-float opacity-15">
        <Thermometer className="w-10 h-10 text-secondary" />
      </div>
      
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
    </div>
  );
};

export default MedicalIcons;
