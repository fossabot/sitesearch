import type { FC, ReactNode } from "react";
import { SearchIcon } from "./icons";

interface SearchButtonProps {
  onClick: () => void;
  darkMode?: boolean;
  children?: ReactNode;
}

export const SearchButton: FC<SearchButtonProps> = ({ onClick, darkMode }) => {
  return (
    <button
      className={`sitesearch-button${darkMode ? " dark" : ""}`}
      type="button"
      onClick={onClick}
      aria-label="Open search"
    >
      <span className="search-icon">
        <SearchIcon />
      </span>
      <span className="button-text">Search</span>
      <span className="keyboard-shortcut">⌘ K</span>
    </button>
  );
};
