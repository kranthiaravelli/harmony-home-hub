import { NavLink } from "@/components/NavLink";
import { Receipt, ShoppingBag, Megaphone, Users } from "lucide-react";

const BottomNav = () => {
  const navItems = [
    { to: "/bills", icon: Receipt, label: "Bills" },
    { to: "/shop", icon: ShoppingBag, label: "Shop" },
    { to: "/notices", icon: Megaphone, label: "Notices" },
    { to: "/communities", icon: Users, label: "Communities" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-2xl transition-smooth-fast text-muted-foreground"
            activeClassName="text-primary bg-secondary"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
