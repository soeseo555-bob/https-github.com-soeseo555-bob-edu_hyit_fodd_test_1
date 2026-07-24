import React, { useState } from 'react';
import { RecipeCard } from './RecipeCard';
import { Recipe, CategoryType } from '../types';
import { Heart, Sparkles } from 'lucide-react';

interface ScrapViewProps {
  recipes: Recipe[];
  onToggleScrap: (id: string, e: React.MouseEvent) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onGoToHome: () => void;
}

export const ScrapView: React.FC<ScrapViewProps> = ({
  recipes,
  onToggleScrap,
  onSelectRecipe,
  onGoToHome,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | '전체'>('전체');

  // Filter only scrapped recipes
  const scrappedRecipes = recipes.filter((r) => r.isScrapped);

  // Apply category filter
  const filteredScraps = scrappedRecipes.filter((r) => {
    if (selectedCategory === '전체') return true;
    return r.category === selectedCategory;
  });

  const categoryChips: (CategoryType | '전체')[] = [
    '전체',
    '한식',
    '양식',
    '간편식',
    '디저트',
  ];

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
      {/* Category Filter Chips Bar */}
      <section className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 no-scrollbar">
        {categoryChips.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-bold text-xs transition-colors shrink-0 active:scale-95 ${
                isActive
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </section>

      {/* Grid Layout for Favorite Recipes */}
      {filteredScraps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredScraps.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              variant="scrap"
              onToggleScrap={onToggleScrap}
              onClick={onSelectRecipe}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 p-8">
          <div className="w-16 h-16 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center mx-auto mb-3">
            <Heart className="w-8 h-8 fill-orange-200 text-orange-500" />
          </div>
          <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 mb-1">
            스크랩한 레시피가 없습니다
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto mb-5 leading-relaxed">
            마음에 드는 레시피의 하트 버튼을 눌러 나만의 요리 스크랩북에 저장해보세요!
          </p>
          <button
            onClick={onGoToHome}
            className="px-5 py-2.5 bg-orange-600 text-white font-bold text-xs rounded-full shadow-md hover:bg-orange-700 active:scale-95 transition-all inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>레시피 둘러보기</span>
          </button>
        </div>
      )}
    </div>
  );
};
