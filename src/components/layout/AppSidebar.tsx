import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Anchor,
  Package,
  DollarSign,
  Compass,
  GitBranch,
  Database,
  ChevronLeft,
  ChevronRight,
  Ship,
  Pin,
  PinOff,
  UserCircle,
  Moon,
  Sun,
  Palette,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "@/contexts/ThemeContext";

  const navigation = [
  { name: "My Dashboard", href: "/", icon: UserCircle },
  { name: "Executive Overview", href: "/overview", icon: LayoutDashboard },
  { name: "Port Performance", href: "/ports", icon: Anchor },
  { name: "Product Analysis", href: "/products", icon: Package },
  { name: "Cost Intelligence", href: "/costs", icon: DollarSign },
  { name: "Opportunity Explorer", href: "/opportunities", icon: Compass },
  { name: "Scenario Planner", href: "/scenarios", icon: GitBranch },
  { name: "Data & Assumptions", href: "/data", icon: Database },
];

const themes = [
  { value: 'light' as const, label: 'Light', icon: Sun },
  { value: 'dark' as const, label: 'Dark', icon: Moon },
  { value: 'monokai' as const, label: 'Monokai', icon: Palette },
  { value: 'cyberpunk' as const, label: 'Cyberpunk', icon: Palette },
  { value: 'ocean' as const, label: 'Ocean', icon: Palette },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const [pinned, setPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const isExpanded = pinned || isHovered;

  return (
    <TooltipProvider delayDuration={200}>
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-lg",
          "transition-[width] duration-200 ease-in-out",
          isExpanded ? "w-64" : "w-16"
        )}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white flex-shrink-0">
              <img 
                src="/hpcl-logo-transparent.png" 
                alt="HPCL Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className={cn(
              "flex flex-col transition-opacity duration-200 ease-in-out",
              isExpanded ? "opacity-100" : "opacity-0 w-0"
            )}>
              <span className="text-sm font-semibold text-sidebar-accent-foreground whitespace-nowrap">
                HPCL PowerLab
              </span>
              <span className="text-xs text-sidebar-foreground/60 whitespace-nowrap">
                Trade Analytics
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const navItem = (
                <NavLink
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-4 border-l-sidebar-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground border-l-4 border-l-transparent"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 flex-shrink-0",
                      isActive ? "text-sidebar-primary" : ""
                    )}
                  />
                  <span className={cn(
                    "transition-opacity duration-200 ease-in-out whitespace-nowrap",
                    isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  )}>
                    {item.name}
                  </span>
                </NavLink>
              );

              return (
                <li key={item.name}>
                  {!isExpanded ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {navItem}
                      </TooltipTrigger>
                      <TooltipContent side="right" className="font-medium">
                        {item.name}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    navItem
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Pin Toggle and Theme */}
        <div className="px-2 py-4 border-t border-sidebar-border space-y-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setPinned(!pinned)}
                className={cn(
                  "flex items-center w-full rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors text-sm font-medium",
                  isExpanded ? "gap-3 px-3 py-2.5" : "justify-center py-2.5",
                  pinned && "bg-sidebar-accent/30"
                )}
              >
                {pinned ? (
                  <Pin className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <PinOff className="w-5 h-5 flex-shrink-0" />
                )}
                <span className={cn(
                  "transition-all duration-200 ease-out whitespace-nowrap",
                  isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 w-0 overflow-hidden"
                )}>
                  {pinned ? "Unpin Sidebar" : "Pin Sidebar"}
                </span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium">
              {pinned ? "Unpin sidebar" : "Pin sidebar open"}
            </TooltipContent>
          </Tooltip>
          
          <Popover open={themeMenuOpen} onOpenChange={setThemeMenuOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      "flex items-center w-full rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors text-sm font-medium",
                      isExpanded ? "gap-3 px-3 py-2.5" : "justify-center py-2.5"
                    )}
                  >
                    {theme === 'light' ? (
                      <Sun className="w-5 h-5 flex-shrink-0" />
                    ) : theme === 'dark' ? (
                      <Moon className="w-5 h-5 flex-shrink-0" />
                    ) : theme === 'monokai' ? (
                      <Palette className="w-5 h-5 flex-shrink-0" />
                    ) : theme === 'cyberpunk' ? (
                      <Palette className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <Palette className="w-5 h-5 flex-shrink-0" />
                    )}
                    <span className={cn(
                      "transition-all duration-200 ease-out whitespace-nowrap",
                      isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 w-0 overflow-hidden"
                    )}>
                      Theme
                    </span>
                  </button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                Choose theme
              </TooltipContent>
            </Tooltip>
            <PopoverContent 
              side="top" 
              align="start"
              className="w-48 p-2 bg-card border-border"
            >
              <div className="space-y-1">
                {themes.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => {
                      setTheme(t.value);
                      setThemeMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm transition-colors",
                      theme === t.value
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent/50 text-foreground"
                    )}
                  >
                    <t.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1 text-left">{t.label}</span>
                    {theme === t.value && (
                      <Check className="w-4 h-4 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Data Freshness Indicator */}
        <div className={cn(
          "px-4 pb-4 transition-all duration-200 ease-out",
          isExpanded ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
        )}>
          <div className="flex items-center gap-2 text-xs text-sidebar-foreground/60">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse-subtle" />
            <span>Data as of Jan 2026</span>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
