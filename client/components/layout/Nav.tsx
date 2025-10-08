import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

function BrandIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("inline-block", className)} aria-hidden>
      <defs>
        <radialGradient id="g" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#1ef07a" />
          <stop offset="100%" stopColor="#0a7a46" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="#0a1410" />
      <g fill="url(#g)">
        <circle cx="24" cy="10" r="3" />
        <circle cx="12" cy="24" r="3" />
        <circle cx="36" cy="24" r="3" />
        <circle cx="24" cy="38" r="3" />
      </g>
      <path d="M12 24h24M24 12v24" stroke="#1ef07a" strokeWidth="2.4" opacity="0.8" />
    </svg>
  );
}

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:text-foreground hover:bg-white/5",
      )}
    >
      {children}
    </Link>
  );
};

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-white/10">
      <div className="container max-w-6xl mx-auto flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <BrandIcon className="h-7 w-7" />
          <span className="tracking-tight">Striker 3D</span>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/matches">Matches</NavLink>
        </nav>
      </div>
    </header>
  );
}
