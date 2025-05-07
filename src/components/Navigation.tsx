
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/">oustKotek.com</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              {/* Conditional 'Posts' link for admins only */}
              {/* {isAuthenticated && (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link to="/posts">Posts</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )} */}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {isAuthenticated ? user.username : ""}
              </span>
              <Button variant="outline" onClick={() => logout()}>
                Sign Out
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
