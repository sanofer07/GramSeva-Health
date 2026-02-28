import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Thermometer,
  Pill,
  AlertCircle,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const diseases = [
  {
    name: "Fever",
    icon: "🤒",
    color: "bg-warm-orange-light border-accent/30",
    iconBg: "bg-accent/20 text-accent",
    symptoms: ["High temperature (above 100°F)", "Body pain and weakness", "Headache", "Chills and sweating"],
    medicines: ["Paracetamol (500mg)", "ORS (Oral Rehydration Solution)", "Crocin", "Plenty of fluids"],
    tips: "Rest well, stay hydrated, and monitor temperature regularly. Seek medical help if fever persists beyond 3 days."
  },
  {
    name: "Cold & Cough",
    icon: "🤧",
    color: "bg-medical-blue-light border-primary/30",
    iconBg: "bg-primary/20 text-primary",
    symptoms: ["Sneezing and runny nose", "Sore throat", "Coughing (dry or wet)", "Mild body ache"],
    medicines: ["Cetirizine (10mg)", "Cough syrup (Benadryl)", "Strepsils lozenges", "Steam inhalation"],
    tips: "Keep warm, drink warm fluids like honey-lemon water, and avoid cold foods."
  },
  {
    name: "Diabetes",
    icon: "🩸",
    color: "bg-soft-purple-light border-soft-purple/30",
    iconBg: "bg-soft-purple/20 text-soft-purple",
    symptoms: ["Increased thirst and hunger", "Fatigue and weakness", "Frequent urination", "Blurred vision"],
    medicines: ["Metformin (as prescribed)", "Glimepiride", "Insulin (if required)", "Regular blood sugar monitoring"],
    tips: "Follow a balanced diet, exercise regularly, and take medications as prescribed. Regular check-ups are essential."
  },
  {
    name: "High Blood Pressure",
    icon: "💓",
    color: "bg-destructive/10 border-destructive/30",
    iconBg: "bg-destructive/20 text-destructive",
    symptoms: ["Persistent headache", "Dizziness and lightheadedness", "Chest pain", "Shortness of breath"],
    medicines: ["Amlodipine (5mg)", "Telmisartan", "Atenolol", "Low-salt diet recommended"],
    tips: "Reduce salt intake, manage stress, exercise regularly, and avoid smoking and alcohol."
  },
  {
    name: "Stomach Infection",
    icon: "😣",
    color: "bg-medical-green-light border-secondary/30",
    iconBg: "bg-secondary/20 text-secondary",
    symptoms: ["Vomiting and nausea", "Stomach pain and cramps", "Diarrhea", "Loss of appetite"],
    medicines: ["ORS (Oral Rehydration Solution)", "Norfloxacin (as prescribed)", "Pantoprazole", "Probiotics"],
    tips: "Stay hydrated with ORS, eat light food (khichdi, curd rice), and avoid oily or spicy food."
  },
  {
    name: "Asthma",
    icon: "🌬️",
    color: "bg-sky-100 border-sky-300",
    iconBg: "bg-sky-200 text-sky-600",
    symptoms: ["Breathing difficulty", "Wheezing sounds", "Chest tightness", "Shortness of breath during activity"],
    medicines: ["Inhalers (Salbutamol)", "Budesonide", "Montelukast", "Nebulizer therapy if severe"],
    tips: "Avoid dust, smoke, and allergens. Always carry your inhaler and take preventive medication regularly."
  },
  {
    name: "Anemia",
    icon: "🩺",
    color: "bg-rose-100 border-rose-300",
    iconBg: "bg-rose-200 text-rose-600",
    symptoms: ["Weakness and fatigue", "Pale skin", "Dizziness", "Cold hands and feet"],
    medicines: ["Iron supplements (Ferrous sulfate)", "Folic acid", "Vitamin B12", "Iron-rich diet recommended"],
    tips: "Eat iron-rich foods like spinach, lentils, and jaggery. Take supplements as prescribed by doctor."
  },
  {
    name: "Skin Allergy",
    icon: "🤲",
    color: "bg-amber-100 border-amber-300",
    iconBg: "bg-amber-200 text-amber-600",
    symptoms: ["Itching and rashes", "Red patches on skin", "Swelling", "Burning sensation"],
    medicines: ["Antihistamines (Cetirizine)", "Calamine lotion", "Hydrocortisone cream", "Avoid allergens"],
    tips: "Identify and avoid triggers. Keep skin moisturized and wear loose cotton clothes."
  },
  {
    name: "Typhoid",
    icon: "🤕",
    color: "bg-orange-100 border-orange-300",
    iconBg: "bg-orange-200 text-orange-600",
    symptoms: ["Prolonged fever", "Stomach pain", "Headache", "Weakness and loss of appetite"],
    medicines: ["Prescribed antibiotics (Azithromycin)", "Ciprofloxacin", "ORS for hydration", "Complete bed rest"],
    tips: "Drink only boiled/filtered water, eat freshly cooked food, and complete the full antibiotic course."
  }
];

const DiseasesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDiseases = diseases.filter(disease =>
    disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    disease.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Thermometer className="w-4 h-4" />
                <span>Health Guide</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                Common <span className="gradient-text">Disease</span> Information
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                Learn about symptoms and recommended medicines for common health issues
              </p>

              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search diseases or symptoms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg rounded-2xl"
                />
              </div>
            </div>

            {/* Disease Cards */}
            <div className="space-y-6">
              {filteredDiseases.map((disease, index) => (
                <div 
                  key={index} 
                  className={`medical-card border-2 ${disease.color} overflow-hidden`}
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Disease Header */}
                    <div className="lg:w-1/4">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-5xl">{disease.icon}</span>
                        <h2 className="text-2xl font-bold text-foreground">{disease.name}</h2>
                      </div>
                      <p className="text-muted-foreground text-sm">{disease.tips}</p>
                    </div>

                    {/* Symptoms */}
                    <div className="lg:w-1/3">
                      <div className="flex items-center gap-2 mb-4">
                        <div className={`w-8 h-8 rounded-lg ${disease.iconBg} flex items-center justify-center`}>
                          <AlertCircle className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-foreground">Symptoms</h3>
                      </div>
                      <ul className="space-y-2">
                        {disease.symptoms.map((symptom, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-current mt-2 shrink-0" />
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Medicines */}
                    <div className="lg:w-1/3">
                      <div className="flex items-center gap-2 mb-4">
                        <div className={`w-8 h-8 rounded-lg ${disease.iconBg} flex items-center justify-center`}>
                          <Pill className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-foreground">Recommended Medicines</h3>
                      </div>
                      <ul className="space-y-2">
                        {disease.medicines.map((medicine, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                            {medicine}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-12 p-6 bg-accent/10 rounded-2xl border border-accent/30">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-accent shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Important Disclaimer</h3>
                  <p className="text-muted-foreground">
                    This information is for general awareness only. Always consult a qualified doctor before taking any medicine. 
                    Self-medication can be harmful. If symptoms persist or worsen, please seek immediate medical attention.
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

export default DiseasesPage;
