import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

const NewComplaint = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [complaint, setComplaint] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!complaint.trim()) {
      toast({
        title: "Please describe your complaint",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      toast({
        title: "Complaint Submitted Successfully!",
        description: "We'll get back to you soon.",
      });
      navigate("/complaints");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => navigate("/complaints")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">File a New Complaint</h1>
        </div>
      </header>

      {/* Form */}
      <div className="px-6 py-8 space-y-6 max-w-lg mx-auto">
        <div>
          <label className="text-lg font-semibold mb-3 block">
            Describe your complaint
          </label>
          <Textarea
            placeholder="Please provide detailed information about your complaint..."
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            className="min-h-[200px] rounded-3xl resize-none text-base"
          />
        </div>

        <div className="card-elevated rounded-3xl p-6 bg-card border-2 border-dashed border-border text-center">
          <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm font-medium mb-1">Upload Photos or Videos</p>
          <p className="text-xs text-muted-foreground">Support images and videos up to 10MB</p>
          <Button variant="outline" className="mt-4 rounded-full">
            Choose Files
          </Button>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full h-14 rounded-full text-lg font-semibold bg-primary hover:bg-primary-hover"
        >
          {isSubmitting ? (
            <>
              <CheckCircle2 className="h-6 w-6 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Complaint"
          )}
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default NewComplaint;
