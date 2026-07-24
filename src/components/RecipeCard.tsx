import React from 'react';
import { Heart, Clock, BarChart2, Star, ChefHat, Zap } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  variant?: 'hero' | 'list' | 'grid' | 'scrap';
  onToggleScrap: (id: string, e: React.MouseEvent) => void;
  onClick: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  variant = 'list',
  onToggleScrap,
  onClick,
}) => {
  const handleScrapClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleScrap(recipe.id, e);
  };

  // Hero Card View (Today's Special on Home Screen)
  if (variant === 'hero') {
    return (
      <div
        onClick={() => onClick(recipe)}
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden cursor-pointer group hover:shadow-md transition-all duration-200"
      >
        <div className="relative h-60 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          {/* Today's Special Badge */}
          <div className="absolute top-3 left-3 bg-orange-600 text-white text-[11px] font-bold tracking-wider px-3 py-1 rounded-full uppercase shadow-xs">
            TODAY'S SPECIAL
          </div>

          {/* Heart Button */}
          <button
            onClick={handleScrapClick}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md flex items-center justify-center text-orange-600 dark:text-orange-400 active:scale-90 transition-transform shadow-xs hover:bg-white"
            aria-label="스크랩 토글"
          >
            <Heart
              className={`w-5 h-5 ${
                recipe.isScrapped ? 'fill-orange-500 text-orange-500' : 'text-zinc-600 dark:text-zinc-300'
              }`}
            />
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
            {recipe.title}
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3">
            {recipe.subtitle || recipe.description}
          </p>

          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>{recipe.cookTimeMinutes}분</span>
              </span>
              <span className="flex items-center gap-1">
                <BarChart2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>{recipe.difficulty}</span>
              </span>
            </div>
            {recipe.rating && (
              <span className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{recipe.rating}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid Card View (Search Results)
  if (variant === 'grid') {
    return (
      <div
        onClick={() => onClick(recipe)}
        className="bg-zinc-50 dark:bg-zinc-900/80 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden cursor-pointer group hover:-translate-y-1 transition-all duration-200 flex flex-col h-full"
      >
        <div className="relative h-40 w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
            loading="lazy"
          />

          {/* Top Recommendation Badge */}
          {recipe.isRecommended && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs">
              <span>★ 추천 레시피</span>
            </div>
          )}

          {/* Heart Button */}
          <button
            onClick={handleScrapClick}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xs flex items-center justify-center active:scale-90 transition-transform"
          >
            <Heart
              className={`w-4 h-4 ${
                recipe.isScrapped ? 'fill-orange-500 text-orange-500' : 'text-zinc-600 dark:text-zinc-300'
              }`}
            />
          </button>
        </div>

        <div className="p-3 flex flex-col flex-1 justify-between">
          <div>
            {/* Category or Tag Chips */}
            <div className="flex flex-wrap gap-1 mb-1.5">
              <span className="px-1.5 py-0.5 rounded bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 text-[10px] font-semibold">
                {recipe.category}
              </span>
              {recipe.tags.slice(0, 1).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-[10px] font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug mb-1">
              {recipe.title}
            </h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-2">
              {recipe.subtitle || recipe.description}
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-200/50 dark:border-zinc-800">
            <span className="flex items-center gap-0.5">
              <Clock className="w-3 h-3 text-zinc-400" />
              <span>{recipe.cookTimeMinutes}분</span>
            </span>
            <span className="flex items-center gap-0.5">
              <Zap className="w-3 h-3 text-orange-500" />
              <span>{recipe.difficulty}</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Scrap / Favorites Bento View
  if (variant === 'scrap') {
    return (
      <article
        onClick={() => onClick(recipe)}
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-none border border-zinc-100 dark:border-zinc-800 overflow-hidden cursor-pointer group hover:-translate-y-1 transition-all duration-300"
      >
        <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            loading="lazy"
          />

          {/* Heart Button (Scrapped state) */}
          <button
            onClick={handleScrapClick}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md flex items-center justify-center text-orange-600 dark:text-orange-400 active:scale-90 transition-transform shadow-xs"
          >
            <Heart className="w-5 h-5 fill-orange-500 text-orange-500" />
          </button>

          {/* Difficulty Badge */}
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 bg-orange-600/90 text-white text-[11px] font-bold rounded-full backdrop-blur-xs">
              {recipe.difficulty}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-1.5">
            <h2 className="font-bold text-base text-zinc-900 dark:text-zinc-100 line-clamp-1">
              {recipe.title}
            </h2>
            <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 shrink-0 ml-2">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              <span>{recipe.cookTimeMinutes}분</span>
            </span>
          </div>

          <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3">
            {recipe.subtitle || recipe.description}
          </p>

          <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <div className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-950/60 flex items-center justify-center text-[10px] font-bold text-orange-600 dark:text-orange-400">
              <ChefHat className="w-3 h-3" />
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              {recipe.chef?.name || '공식 셰프'}
            </span>
          </div>
        </div>
      </article>
    );
  }

  // Default List Card View (Home Screen vertical list)
  return (
    <div
      onClick={() => onClick(recipe)}
      className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden cursor-pointer group hover:shadow-md transition-all duration-200"
    >
      <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Heart Button */}
        <button
          onClick={handleScrapClick}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xs flex items-center justify-center active:scale-90 transition-transform shadow-xs"
        >
          <Heart
            className={`w-4 h-4 ${
              recipe.isScrapped ? 'fill-orange-500 text-orange-500' : 'text-zinc-600 dark:text-zinc-300'
            }`}
          />
        </button>
      </div>

      <div className="p-3.5">
        <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 mb-1">
          {recipe.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {recipe.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 text-[11px] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>{recipe.cookTimeMinutes}분</span>
          </span>
          <span className="flex items-center gap-1">
            <BarChart2 className="w-3.5 h-3.5 text-zinc-400" />
            <span>{recipe.difficulty}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
