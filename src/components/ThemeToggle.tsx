import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div onClick={toggleTheme} className="cursor-pointer flex-shrink-0">
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-sidebar-foreground transition-transform duration-300 hover:rotate-12" />
      ) : (
        <Sun className="w-5 h-5 text-sidebar-foreground transition-transform duration-300 hover:rotate-12" />
      )}
    </div>
  );
}
