import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

interface FamilyMember {
  id: number;
  name: string;
  relation: string;
}

const Family = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [members, setMembers] = useState<FamilyMember[]>([
    { id: 1, name: "Jane Doe", relation: "Spouse" },
    { id: 2, name: "John Doe Jr.", relation: "Son" },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRelation, setNewRelation] = useState("");

  const handleAdd = () => {
    if (!newName || !newRelation) {
      toast({
        title: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    setMembers([...members, { id: Date.now(), name: newName, relation: newRelation }]);
    setNewName("");
    setNewRelation("");
    setShowAddForm(false);
    toast({
      title: "Family member added successfully!",
    });
  };

  const handleDelete = (id: number) => {
    setMembers(members.filter(m => m.id !== id));
    toast({
      title: "Family member removed",
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
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Family Members</h1>
        </div>
      </header>

      <div className="px-6 py-6">
        {members.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No family members added.</p>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            {members.map((member) => (
              <div key={member.id} className="card-elevated rounded-3xl p-5 bg-card flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.relation}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-destructive"
                    onClick={() => handleDelete(member.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!showAddForm ? (
          <Button
            onClick={() => setShowAddForm(true)}
            className="w-full rounded-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Family Member
          </Button>
        ) : (
          <div className="card-elevated rounded-3xl p-6 bg-card space-y-4">
            <h3 className="font-semibold text-lg">Add New Member</h3>
            <Input
              placeholder="Full Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="rounded-2xl"
            />
            <Select value={newRelation} onValueChange={setNewRelation}>
              <SelectTrigger className="rounded-2xl">
                <SelectValue placeholder="Select Relation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Spouse">Spouse</SelectItem>
                <SelectItem value="Son">Son</SelectItem>
                <SelectItem value="Daughter">Daughter</SelectItem>
                <SelectItem value="Father">Father</SelectItem>
                <SelectItem value="Mother">Mother</SelectItem>
                <SelectItem value="Brother">Brother</SelectItem>
                <SelectItem value="Sister">Sister</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-3">
              <Button
                onClick={handleAdd}
                className="flex-1 rounded-full bg-primary hover:bg-primary-hover"
              >
                Add Member
              </Button>
              <Button
                onClick={() => {
                  setShowAddForm(false);
                  setNewName("");
                  setNewRelation("");
                }}
                variant="outline"
                className="flex-1 rounded-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Family;
