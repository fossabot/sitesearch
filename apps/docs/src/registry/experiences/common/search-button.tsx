import { SearchIcon } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";

interface SearchButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

export const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      variant="outline"
      className="md:min-w-[200px] justify-between hover:shadow-md transition-transform duration-400 translate-y-0 py-3 h-auto cursor-pointer hover:bg-transparent hover:translate-y-[-2px] border shadow-none"
      aria-label="Open search"
    >
      <span className="flex items-center gap-2 opacity-80">
        <SearchIcon size={24} color="currentColor" />
        <span className="hidden sm:inline text-muted-foreground">Search</span>
      </span>
      <div className="hidden md:inline-block rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
        ⌘ K
      </div>
    </Button>
  );
};
