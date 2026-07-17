"use client";

import Logo from "./Logo";
import HeaderCountdown from "./HeaderCountDown"
import { useAuth } from "@/features/auth/hooks/useAuth";

interface Props {
  onSettingsOpen: () => void;
}

export function Header({ onSettingsOpen }: Props) {

const {
  user,
  isAuthenticated,
  hydrated,
} = useAuth();

  return (
            <header className="sticky top-0 z-20 border-b transition-colors duration-300"
                     style={{
    background: "var(--mv-header)",
    borderColor: "var(--mv-border-subtle)",
    backdropFilter: "blur(16px)",
}}>
                     
                      <div className="flex h-12 w-full items-center justify-between gap-2 px-3 sm:px-4">
                       <Logo />
                       <HeaderCountdown />
           
                       {/* avatar / profile button — opens settings drawer */}
                       <button
                         onClick={onSettingsOpen}
                         className="flex-shrink-0 transition-all hover:opacity-80 active:scale-95"
                         title="Settings"
                       >
                         {!hydrated ? (
  <div className="w-8 h-8" />
) : isAuthenticated ? (
                           <img
                             src={user?.profile_pic ?? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&auto=format"}
                             alt="Profile"
                             className="w-8 h-8 rounded-full object-cover ring-2"
                             // style={{ ringColor: "#6366f1" }}
                             style={{
             boxShadow: "0 0 0 2px #6366f1",
           }}
                           />
                         ) : (
                           <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black"
                             style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", fontFamily: "'Onest',sans-serif" }}>
                             ?
                           </div>
                         )}
                       </button>
                     </div>
                   </header>
           
  );
}