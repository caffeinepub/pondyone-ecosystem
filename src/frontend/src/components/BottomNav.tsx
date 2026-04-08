interface NavItem {
  icon: string;
  label: string;
  path: string;
}

interface BottomNavProps {
  items: NavItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function BottomNav({ items, currentPath, onNavigate }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border"
      style={{ height: 64, paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Bottom navigation"
    >
      <div className="flex items-center justify-around h-full max-w-lg mx-auto">
        {items.map((item) => {
          const isActive =
            currentPath === item.path ||
            currentPath.startsWith(`${item.path}/`);
          return (
            <button
              key={item.path}
              type="button"
              onClick={() => onNavigate(item.path)}
              data-ocid={`bottom-nav-${item.label.toLowerCase() as string}`}
              className="relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span
                className="text-[10px] font-medium leading-none"
                style={{ color: isActive ? "#FF6B35" : "#6b7280" }}
              >
                {item.label}
              </span>
              {isActive && (
                <span
                  className="absolute bottom-1 w-1 h-1 rounded-full"
                  style={{ backgroundColor: "#FF6B35" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
