import React, { useState } from 'react';
import { RecipeCard } from './RecipeCard';
import { Recipe } from '../types';
import { ChevronDown, UtensilsCrossed } from 'lucide-react';

interface HomeViewProps {
  recipes: Recipe[];
  onToggleScrap: (id: string, e: React.MouseEvent) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onOpenAI: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  recipes,
  onToggleScrap,
  onSelectRecipe,
  onOpenAI,
}) => {
  const [sortOption, setSortOption] = useState<'popular' | 'time' | 'rating'>('popular');
  const [timeFilter, setTimeFilter] = useState<number | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);

  // Dropdown states
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showDifficultyDropdown, setShowDifficultyDropdown] = useState(false);

  // Today's special recipe
  const todaySpecial = recipes.find((r) => r.isTodaySpecial) || recipes[0];

  // List recipes (excluding today's special if desired or keeping all)
  let listRecipes = recipes.filter((r) => r.id !== todaySpecial.id);

  // Apply filters
  if (timeFilter) {
    listRecipes = listRecipes.filter((r) => r.cookTimeMinutes <= timeFilter);
  }
  if (difficultyFilter) {
    listRecipes = listRecipes.filter((r) => r.difficulty === difficultyFilter);
  }

  // Apply sorting
  if (sortOption === 'popular') {
    listRecipes.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
  } else if (sortOption === 'time') {
    listRecipes.sort((a, b) => a.cookTimeMinutes - b.cookTimeMinutes);
  } else if (sortOption === 'rating') {
    listRecipes.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 no-scrollbar text-xs">
        {/* Sort Popularity */}
        <button
          onClick={() => setSortOption('popular')}
          className={`px-4 py-2 rounded-full font-bold whitespace-nowrap transition-colors active:scale-95 ${
            sortOption === 'popular'
              ? 'bg-orange-600 text-white shadow-xs'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
          }`}
        >
          인기순
        </button>

        {/* Cook Time Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowTimeDropdown(!showTimeDropdown);
              setShowDifficultyDropdown(false);
            }}
            className={`px-3.5 py-2 rounded-full font-medium flex items-center gap-1 whitespace-nowrap transition-colors ${
              timeFilter
                ? 'bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-bold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
            }`}
          >
            <span>{timeFilter ? `${timeFilter}분 이내` : '조리 시간'}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>

          {showTimeDropdown && (
            <div className="absolute top-full left-0 mt-1 z-30 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg p-1.5 min-w-[120px] flex flex-col gap-1">
              <button
                onClick={() => {
                  setTimeFilter(null);
                  setShowTimeDropdown(false);
                }}
                className={`text-left px-3 py-1.5 rounded-lg text-xs ${
                  timeFilter === null ? 'font-bold text-orange-600 bg-orange-50' : 'text-zinc-700'
                }`}
              >
                전체 시간
              </button>
              {[15, 20, 30, 45].map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    setTimeFilter(time);
                    setShowTimeDropdown(false);
                  }}
                  className={`text-left px-3 py-1.5 rounded-lg text-xs ${
                    timeFilter === time ? 'font-bold text-orange-600 bg-orange-50' : 'text-zinc-700'
                  }`}
                >
                  {time}분 이내
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Difficulty Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowDifficultyDropdown(!showDifficultyDropdown);
              setShowTimeDropdown(false);
            }}
            className={`px-3.5 py-2 rounded-full font-medium flex items-center gap-1 whitespace-nowrap transition-colors ${
              difficultyFilter
                ? 'bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-bold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
            }`}
          >
            <span>{difficultyFilter || '난이도'}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>

          {showDifficultyDropdown && (
            <div className="absolute top-full left-0 mt-1 z-30 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg p-1.5 min-w-[120px] flex flex-col gap-1">
              <button
                onClick={() => {
                  setDifficultyFilter(null);
                  setShowDifficultyDropdown(false);
                }}
                className={`text-left px-3 py-1.5 rounded-lg text-xs ${
                  difficultyFilter === null ? 'font-bold text-orange-600 bg-orange-50' : 'text-zinc-700'
                }`}
              >
                전체 난이도
              </button>
              {['쉬움', '보통', '중급'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => {
                    setDifficultyFilter(diff);
                    setShowDifficultyDropdown(false);
                  }}
                  className={`text-left px-3 py-1.5 rounded-lg text-xs ${
                    difficultyFilter === diff ? 'font-bold text-orange-600 bg-orange-50' : 'text-zinc-700'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hero Card (Today's Special) */}
      <div className="mb-5">
        <RecipeCard
          recipe={todaySpecial}
          variant="hero"
          onToggleScrap={onToggleScrap}
          onClick={onSelectRecipe}
        />
      </div>

      {/* Vertical Recipe List */}
      <div className="space-y-4">
        {listRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            variant="list"
            onToggleScrap={onToggleScrap}
            onClick={onSelectRecipe}
          />
        ))}
      </div>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={onOpenAI}
        className="fixed bottom-20 right-5 z-40 w-13 h-13 rounded-full bg-orange-600 text-white shadow-lg flex items-center justify-center hover:bg-orange-700 active:scale-90 transition-all duration-200 group"
        aria-label="AI 요리 추천"
        title="AI 요리사 추천 받기"
      >
        <UtensilsCrossed className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};
