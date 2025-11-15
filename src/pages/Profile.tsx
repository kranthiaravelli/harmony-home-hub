import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Receipt, ShoppingBag, Calendar, IdCard, MessageSquare, Users, UserPlus, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BottomNav from "@/components/BottomNav";

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: User, label: "My Details", path: "/profile/details" },
    { icon: Receipt, label: "My Bills", path: "/bills" },
    { icon: ShoppingBag, label: "My Orders", path: "/orders" },
    { icon: Calendar, label: "Amenities Bookings", path: "/bookings" },
    { icon: IdCard, label: "Security Passes", path: "/passes" },
    { icon: MessageSquare, label: "Complaint Box", path: "/complaints" },
    { icon: Users, label: "My Communities", path: "/communities" },
    { icon: UserPlus, label: "Family Members", path: "/family" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

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
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
      </header>

      {/* Profile Info */}
      <div className="px-6 py-8 text-center">
        <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-secondary">
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl">RS</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold mb-1">Resident Name</h2>
        <p className="text-muted-foreground mb-4">Flat 101, Block A</p>
        <Button variant="outline" className="rounded-full">Edit Profile</Button>
      </div>

      {/* Menu Items */}
      <div className="px-6 space-y-3 max-w-lg mx-auto">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="w-full card-elevated rounded-2xl p-4 flex items-center gap-4 bg-card transition-smooth hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="bg-secondary rounded-xl p-3">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-medium text-foreground">{item.label}</span>
          </button>
        ))}

        <button
          onClick={() => {/* logout logic */}}
          className="w-full card-elevated rounded-2xl p-4 flex items-center gap-4 bg-card transition-smooth hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="bg-destructive/10 rounded-xl p-3">
            <LogOut className="h-5 w-5 text-destructive" />
          </div>
          <span className="text-lg font-medium text-destructive">Logout</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
