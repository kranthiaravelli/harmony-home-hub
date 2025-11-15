import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
}

const Shop = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartCount, setCartCount] = useState(0);

  const foodItems: Product[] = [
    { id: 1, name: "Fresh Vegetables", price: 200, description: "Farm fresh vegetables", category: "Groceries" },
    { id: 2, name: "Milk (1L)", price: 60, description: "Fresh dairy milk", category: "Dairy" },
    { id: 3, name: "Bread", price: 40, description: "Whole wheat bread", category: "Bakery" },
  ];

  const chores: Product[] = [
    { id: 4, name: "Plumbing Service", price: 500, description: "Professional plumbing repair", category: "Plumbing" },
    { id: 5, name: "Electrical Repair", price: 600, description: "Certified electrician service", category: "Electrical" },
    { id: 6, name: "AC Servicing", price: 800, description: "Complete AC maintenance", category: "AC Repair" },
  ];

  const amenities: Product[] = [
    { id: 7, name: "Swimming Pool", price: 200, description: "2-hour slot booking", category: "Recreation" },
    { id: 8, name: "Community Hall", price: 1500, description: "Full day booking", category: "Events" },
    { id: 9, name: "Gym", price: 100, description: "Daily pass", category: "Fitness" },
  ];

  const addToCart = (item: Product) => {
    setCartCount(prev => prev + 1);
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const ProductCard = ({ item }: { item: Product }) => (
    <div className="card-elevated rounded-3xl p-5 bg-card">
      <div className="aspect-video bg-muted rounded-2xl mb-4" />
      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">₹{item.price}</p>
        <Button
          onClick={() => addToCart(item)}
          size="sm"
          className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground animate-bounce-subtle"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
    </div>
  );

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
            <h1 className="text-2xl font-bold">Shop</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full relative"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-accent text-accent-foreground">
                {cartCount}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      <div className="px-6 py-6">
        <Tabs defaultValue="food" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-full p-1 bg-muted mb-6">
            <TabsTrigger value="food" className="rounded-full transition-smooth">Food</TabsTrigger>
            <TabsTrigger value="chores" className="rounded-full transition-smooth">Chores</TabsTrigger>
            <TabsTrigger value="amenities" className="rounded-full transition-smooth">Amenities</TabsTrigger>
          </TabsList>

          <TabsContent value="food" className="space-y-4 animate-slide-up">
            {foodItems.map(item => <ProductCard key={item.id} item={item} />)}
          </TabsContent>

          <TabsContent value="chores" className="space-y-4 animate-slide-up">
            {chores.map(item => <ProductCard key={item.id} item={item} />)}
          </TabsContent>

          <TabsContent value="amenities" className="space-y-4 animate-slide-up">
            {amenities.map(item => <ProductCard key={item.id} item={item} />)}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Shop;
