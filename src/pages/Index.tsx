import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Bell, Globe, Receipt, MessageSquare, Users as UsersIcon, Megaphone, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const [hasNotifications, setHasNotifications] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const tiles = [
    { icon: Receipt, label: "Bills", color: "bg-primary", path: "/bills" },
    { icon: MessageSquare, label: "Complaints", color: "bg-accent", path: "/complaints" },
    { icon: UsersIcon, label: "Visitors", color: "bg-highlight", path: "/visitors" },
    { icon: Megaphone, label: "Notices", color: "bg-secondary", path: "/notices" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{greeting}, Resident</h1>
            <p className="text-sm text-muted-foreground mt-1">Here is your Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full relative"
              onClick={() => navigate("/notifications")}
            >
              <Bell className="h-5 w-5" />
              {hasNotifications && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground">
                  3
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Globe className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => navigate("/profile")}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Grid */}
      <main className="px-6 py-8">
        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
          {tiles.map((tile) => (
            <button
              key={tile.label}
              onClick={() => navigate(tile.path)}
              className="card-elevated aspect-square rounded-3xl p-6 flex flex-col items-center justify-center gap-4 transition-smooth hover:scale-105 active:scale-95 bg-card"
            >
              <div className={`${tile.color} rounded-2xl p-4`}>
                <tile.icon className="h-8 w-8 text-white" />
              </div>
              <span className="text-lg font-semibold text-foreground">{tile.label}</span>
            </button>
          ))}
        </div>
      </main>

      {/* Floating AI Assistant */}
      <Button
        size="icon"
        className="fixed bottom-24 right-6 h-16 w-16 rounded-full bg-primary hover:bg-primary-hover shadow-lg animate-pulse-slow z-40"
        onClick={() => navigate("/assistant")}
      >
        <Bot className="h-8 w-8" />
      </Button>

      <BottomNav />
    </div>
  );
};

export default Index;
