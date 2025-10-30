import { ProfileQuestionnaire } from "@/components/profile-questionnaire";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Questionnaire() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen relative">
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
  );
}
