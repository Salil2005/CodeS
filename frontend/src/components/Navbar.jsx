import { Link, useLocation } from "react-router";
import { BookOpenIcon, Code2Icon, LayoutDashboardIcon } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-900 bg-[#06080d]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-8 py-6">
        {/* LOGO */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 transition-transform duration-200"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#0084ff] text-white shadow-[0_0_12px_rgba(0,132,255,0.4)] transition-transform group-hover:scale-105">
            <Code2Icon className="size-5" />
          </div>
          <span className="font-sans text-xl font-extrabold tracking-tight text-white">
            CodeS
          </span>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* PROBLEMS PAGE LINK */}
          <Link
            to={"/problems"}
            className={`rounded-lg px-3 py-2 text-sm transition-all duration-200 sm:px-4 
              ${
                isActive("/problems")
                  ? "bg-[#0084ff] text-white shadow-[0_0_15px_rgba(0,132,255,0.2)]"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }
              
              `}
          >
            <div className="flex items-center gap-x-2.5">
              <BookOpenIcon className="size-4" />
              <span className="hidden font-semibold sm:inline">Problems</span>
            </div>
          </Link>

          {/* DASHBORD PAGE LINK */}
          <Link
            to={"/dashboard"}
            className={`rounded-lg px-3 py-2 text-sm transition-all duration-200 sm:px-4 
              ${
                isActive("/dashboard")
                  ? "bg-[#0084ff] text-white shadow-[0_0_15px_rgba(0,132,255,0.2)]"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }
              
              `}
          >
            <div className="flex items-center gap-x-2.5">
              <LayoutDashboardIcon className="size-4" />
              <span className="hidden font-semibold sm:inline">Dashboard</span>
            </div>
          </Link>

          <div className="ml-2 border-l border-slate-800 pl-3 sm:ml-3">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
