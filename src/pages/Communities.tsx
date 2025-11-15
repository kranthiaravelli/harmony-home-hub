import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Users as UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";

interface Community {
  id: number;
  name: string;
  category: string;
  description: string;
  members: number;
  isFree: boolean;
  fee?: number;
}

const Communities = () => {
  const navigate = useNavigate();
  const [communities] = useState<Community[]>([
    {
      id: 1,
      name: "Book Club",
      category: "Literature",
      description: "Monthly book discussions and reading sessions",
      members: 24,
      isFree: true,
    },
    {
      id: 2,
      name: "Yoga & Wellness",
      category: "Fitness",
      description: "Morning yoga sessions and wellness activities",
      members: 45,
      isFree: false,
      fee: 500,
    },
    {
      id: 3,
      name: "Tech Enthusiasts",
      category: "Technology",
      description: "Discuss latest tech trends and gadgets",
      members: 18,
      isFree: true,
    },
  ]);

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
          <h1 className="text-2xl font-bold">Communities</h1>
        </div>
      </header>

      {/* Action Buttons */}
      <div className="px-6 py-6 flex gap-3">
        <Button
          onClick={() => navigate("/communities/create")}
          className="flex-1 rounded-full h-14 bg-primary hover:bg-primary-hover"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Community
        </Button>
        <Button
          onClick={() => navigate("/communities/join")}
          variant="outline"
          className="flex-1 rounded-full h-14"
        >
          <UsersIcon className="h-5 w-5 mr-2" />
          Join Community
        </Button>
      </div>

      {/* My Communities */}
      <div className="px-6">
        <h2 className="text-xl font-bold mb-4">My Communities</h2>
        <div className="space-y-4">
          {communities.map((community) => (
            <div
              key={community.id}
              onClick={() => navigate(`/communities/${community.id}`)}
              className="card-elevated rounded-3xl p-5 bg-card transition-smooth hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{community.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{community.description}</p>
                  <Badge variant="outline" className="rounded-full">
                    {community.category}
                  </Badge>
                </div>
                <Badge
                  className={`${
                    community.isFree
                      ? "bg-success text-success-foreground"
                      : "bg-primary text-primary-foreground"
                  } rounded-full`}
                >
                  {community.isFree ? "Free" : `₹${community.fee}`}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-3 border-t border-border">
                <UsersIcon className="h-4 w-4" />
                <span>{community.members} members</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Communities;
