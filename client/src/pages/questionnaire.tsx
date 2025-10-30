import { ProfileQuestionnaire } from "@/components/profile-questionnaire";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import questionnaireImage from "@assets/stock_images/african_agriculture__d6f88407.jpg";

export default function Questionnaire() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen relative">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${questionnaireImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
      </div>
      <div className="relative z-10">
        <div className="fixed top-6 left-6 z-50">
          <Button
            variant="outline"
            onClick={() => setLocation("/")}
            data-testid="button-back-home"
            className="backdrop-blur-sm bg-background/80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
        <ProfileQuestionnaire />
      </div>
    </div>
  );
}
