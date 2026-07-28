import { MessageCircle,Lock } from "lucide-react";
interface CommentEmptyStateProps {
    isLoggedIn: boolean;
    onAuthRequired?: () => void;
}
export default function CommentEmptyState({
    isLoggedIn,
    onAuthRequired,
}: CommentEmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
      <div className="mb-4 rounded-full bg-[var(--mv-surface)] p-4">
        <MessageCircle
          size={28}
          color="var(--mv-text-dim)"
        />
      </div>

      <h3
        className="text-sm font-semibold"
        style={{
          fontFamily: "'Onest', sans-serif",
          color: "var(--mv-text)",
        }}
      >
        No comments yet
      </h3>
{!isLoggedIn ? (<p
        className="mt-2 text-sm"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "var(--mv-text-muted)",
        }}
      >
        
        Sign in below to join the conversation
      </p>):
      (<p
        className="mt-2 text-sm"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "var(--mv-text-muted)",
        }}
      >
        Be the first to comment.
      </p>)}
      
      

      {!isLoggedIn && (
    <button
        onClick={onAuthRequired}
        className="flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-all mt-2"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            borderColor: "var(--mv-border)",
            color: "var(--mv-text-muted)",
          }}
    >
      <Lock size={13} />
        Sign In / Register
    </button>
)}

    </div>
  );
}