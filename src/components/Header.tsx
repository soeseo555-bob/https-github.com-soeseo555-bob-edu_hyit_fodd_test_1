import React from 'react';
import { ArrowLeft, Search, Sparkles } from 'lucide-react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  onSearchClick?: () => void;
  onAIClick?: () => void;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  onSearchClick,
  onAIClick,
  showBack = true,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 px-4 h-14 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        {showBack && (
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 rounded-full text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all"
            aria-label="뒤로 가기"
          >
            <ArrowLeft className="w-5 h-5 text-orange-600 dark:text-orange-500" />
          </button>
        )}
        <h1 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 truncate">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {onAIClick && (
          <button
            onClick={onAIClick}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-semibold shadow-xs hover:opacity-95 active:scale-95 transition-all"
            title="AI 레시피 추천"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>AI 추천</span>
          </button>
        )}
        {onSearchClick && (
          <button
            onClick={onSearchClick}
            className="p-2 rounded-full text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all"
            aria-label="검색"
          >
            <Search className="w-5 h-5 text-orange-600 dark:text-orange-500" />
          </button>
        )}
      </div>
    </header>
  );
};
