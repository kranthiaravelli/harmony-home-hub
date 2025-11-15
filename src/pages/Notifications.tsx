import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

interface Notification {
  id: number;
  type: "visitor" | "notice" | "bill";
  title: string;
  description: string;
  time: string;
  read: boolean;
  visitorName?: string;
  visitorPhoto?: string;
  approved?: boolean;
}

const Notifications = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "visitor",
      title: "Visitor Approval Request",
      description: "Security requests approval for visitor",
      time: "5 mins ago",
      read: false,
      visitorName: "John Doe",
      visitorPhoto: "",
    },
    {
      id: 2,
      type: "notice",
      title: "New Notice Posted",
      description: "Community meeting scheduled for next week",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "bill",
      title: "Bill Payment Due",
      description: "Your maintenance bill is due in 3 days",
      time: "2 hours ago",
      read: true,
    },
  ]);

  const handleApproval = (id: number, approved: boolean) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, approved, read: true } : n
    ));
    
    toast({
      title: approved ? "Visitor Approved" : "Visitor Rejected",
      description: approved ? "Security pass sent successfully" : "Visitor entry denied",
    });
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
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>
      </header>

      {/* Notifications List */}
      <div className="px-6 py-6 space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`card-elevated rounded-3xl p-5 bg-card transition-smooth ${
              !notification.read ? "bg-highlight/30" : ""
            }`}
          >
            {notification.type === "visitor" && notification.approved === undefined ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={notification.visitorPhoto} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {notification.visitorName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{notification.visitorName}</h3>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleApproval(notification.id, true)}
                    className="flex-1 rounded-full bg-success hover:bg-success/90 text-success-foreground"
                  >
                    <Check className="h-5 w-5 mr-2" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleApproval(notification.id, false)}
                    variant="outline"
                    className="flex-1 rounded-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="h-5 w-5 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            ) : notification.approved !== undefined ? (
              <div className="text-center py-2">
                <p className="font-semibold text-success">
                  {notification.approved ? "✓ Pass Sent" : "✗ Rejected"}
                </p>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold mb-1">{notification.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{notification.description}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Notifications;
