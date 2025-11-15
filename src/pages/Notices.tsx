import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import BottomNav from "@/components/BottomNav";

interface Notice {
  id: number;
  title: string;
  preview: string;
  timestamp: string;
  adminName: string;
  likes: number;
  comments: number;
  liked: boolean;
}

const Notices = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: 1,
      title: "Community Meeting - November 2025",
      preview: "Dear residents, we are organizing a community meeting to discuss upcoming maintenance work...",
      timestamp: "2 hours ago",
      adminName: "Admin Team",
      likes: 24,
      comments: 5,
      liked: false,
    },
    {
      id: 2,
      title: "Water Supply Disruption Notice",
      preview: "Please note that water supply will be temporarily disrupted on November 18th from 10 AM to 2 PM...",
      timestamp: "5 hours ago",
      adminName: "Admin Team",
      likes: 18,
      comments: 3,
      liked: true,
    },
    {
      id: 3,
      title: "Festive Celebration Announcement",
      preview: "Join us for the upcoming festive celebration in the community hall. Food and entertainment arranged...",
      timestamp: "1 day ago",
      adminName: "Admin Team",
      likes: 42,
      comments: 12,
      liked: false,
    },
  ]);

  const toggleLike = (id: number) => {
    setNotices(notices.map(notice => 
      notice.id === id 
        ? { ...notice, liked: !notice.liked, likes: notice.liked ? notice.likes - 1 : notice.likes + 1 }
        : notice
    ));
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
          <h1 className="text-2xl font-bold">Notice Board</h1>
        </div>
      </header>

      {/* Notices List */}
      <div className="px-6 py-6 space-y-4">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="card-elevated rounded-3xl p-5 bg-card transition-smooth hover:scale-[1.02] cursor-pointer"
            onClick={() => navigate(`/notices/${notice.id}`)}
          >
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">A</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{notice.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{notice.preview}</p>
                <p className="text-xs text-muted-foreground">{notice.timestamp}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 pt-3 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-full ${notice.liked ? "text-destructive" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(notice.id);
                }}
              >
                <Heart className={`h-4 w-4 mr-1 ${notice.liked ? "fill-current" : ""}`} />
                {notice.likes}
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full">
                <MessageCircle className="h-4 w-4 mr-1" />
                {notice.comments}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Notices;
