import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";

interface Complaint {
  id: number;
  title: string;
  status: "pending" | "resolved";
  date: string;
  response?: string;
}

const Complaints = () => {
  const navigate = useNavigate();
  const [complaints] = useState<Complaint[]>([
    {
      id: 1,
      title: "Water leakage in bathroom",
      status: "pending",
      date: "2025-11-10",
    },
    {
      id: 2,
      title: "Parking space issue",
      status: "resolved",
      date: "2025-11-05",
      response: "Issue has been resolved. Parking allocated.",
    },
    {
      id: 3,
      title: "Lift not working properly",
      status: "pending",
      date: "2025-11-12",
    },
  ]);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Complaint Box</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <HelpCircle className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Complaints List */}
      <div className="px-6 py-6 space-y-4">
        {complaints.map((complaint) => (
          <div
            key={complaint.id}
            className="card-elevated rounded-3xl p-5 bg-card transition-smooth hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold flex-1">{complaint.title}</h3>
              <Badge
                className={`${
                  complaint.status === "pending"
                    ? "bg-pending text-pending-foreground"
                    : "bg-resolved text-resolved-foreground"
                } rounded-full`}
              >
                {complaint.status === "pending" ? "Pending" : "Resolved"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{complaint.date}</p>
            {complaint.response && (
              <div className="mt-3 p-3 bg-highlight/20 rounded-2xl">
                <p className="text-sm font-medium mb-1">Admin Response:</p>
                <p className="text-sm">{complaint.response}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* File New Complaint Button */}
      <div className="fixed bottom-24 left-0 right-0 px-6 max-w-lg mx-auto">
        <Button
          onClick={() => navigate("/complaints/new")}
          className="w-full rounded-full h-14 text-lg font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Plus className="h-6 w-6 mr-2" />
          File a New Complaint
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Complaints;
