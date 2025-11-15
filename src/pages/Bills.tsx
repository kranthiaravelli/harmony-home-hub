import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, HelpCircle, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNav from "@/components/BottomNav";

interface Bill {
  id: number;
  name: string;
  amount: number;
  period: string;
  dueDate?: string;
  paidDate?: string;
  status: "due" | "paid";
}

const Bills = () => {
  const navigate = useNavigate();
  const [bills] = useState<Bill[]>([
    { id: 1, name: "Maintenance Fee", amount: 5000, period: "November 2025", dueDate: "2025-11-20", status: "due" },
    { id: 2, name: "Water Bill", amount: 800, period: "November 2025", dueDate: "2025-11-18", status: "due" },
    { id: 3, name: "Maintenance Fee", amount: 5000, period: "October 2025", paidDate: "2025-10-15", status: "paid" },
    { id: 4, name: "Water Bill", amount: 750, period: "October 2025", paidDate: "2025-10-12", status: "paid" },
  ]);

  const dueAmount = bills.filter(b => b.status === "due").reduce((sum, b) => sum + b.amount, 0);
  const dueBills = bills.filter(b => b.status === "due");
  const paidBills = bills.filter(b => b.status === "paid");

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
            <h1 className="text-2xl font-bold">Bills</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <HelpCircle className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="px-6 py-6">
        <Tabs defaultValue="dues" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-full p-1 bg-muted mb-6">
            <TabsTrigger value="dues" className="rounded-full transition-smooth">Dues</TabsTrigger>
            <TabsTrigger value="paid" className="rounded-full transition-smooth">Paid</TabsTrigger>
          </TabsList>

          <TabsContent value="dues" className="space-y-4 animate-slide-up">
            {/* Total Due Card */}
            <div className="card-elevated-lg rounded-3xl p-6 bg-gradient-to-br from-primary to-primary-hover text-primary-foreground">
              <p className="text-sm opacity-90 mb-2">Total Amount Due</p>
              <h2 className="text-4xl font-bold mb-4">₹{dueAmount}</h2>
              <Button className="w-full rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-12">
                Pay Now
              </Button>
              <p className="text-xs text-center mt-3 opacity-75">Due by 20th Nov 2025</p>
            </div>

            {/* Due Bills List */}
            {dueBills.map((bill) => (
              <div key={bill.id} className="card-elevated rounded-3xl p-5 bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{bill.name}</h3>
                    <p className="text-sm text-muted-foreground">{bill.period}</p>
                    <p className="text-xs text-destructive mt-1">Due: {bill.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">₹{bill.amount}</p>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="paid" className="space-y-4 animate-slide-up">
            {paidBills.map((bill) => (
              <div key={bill.id} className="card-elevated rounded-3xl p-5 bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{bill.name}</h3>
                    <p className="text-sm text-muted-foreground">{bill.period}</p>
                    <p className="text-xs text-success mt-1">Paid: {bill.paidDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-muted-foreground">₹{bill.amount}</p>
                    <Button variant="outline" size="sm" className="mt-2 rounded-full">
                      <Receipt className="h-3 w-3 mr-1" />
                      Receipt
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Bills;
