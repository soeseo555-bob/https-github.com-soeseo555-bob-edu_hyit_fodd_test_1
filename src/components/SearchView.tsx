import React, { useState } from 'react';
import { Search as SearchIcon, X, Filter } from 'lucide-react';
import { RecipeCard } from './RecipeCard';
import { Recipe } from '../types';

interface SearchViewProps {
  recipes: Recipe[];
  onToggleScrap: (id: string, e: React.MouseEvent) => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  recipes,
  onToggleScrap,
  onSelectRecipe,
}) => {
  const [searchQuery, setSearchQuery] = useState('볶음밥');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  // Quick tag suggestions
  const popularKeywords = ['볶음밥', '김치', '치킨', '파스타', '연어', '갈비찜', '계란'];

  // Filter recipes based on search query and category
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesQuery =
      searchQuery.trim() === '' ||
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      recipe.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === '전체' || recipe.category === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
      {/* Search Input Bar */}
      <div className="relative mb-4">
        <div className="relative flex items-center">
          <SearchIcon className="absolute left-3.5 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="어떤 요리가 먹고 싶으신가요?"
            className="w-full pl-10 pr-10 py-2.5 bg-zinc-100 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm font-medium rounded-full border border-transparent focus:border-orange-500 focus:bg-white dark:focus:bg-zinc-900 outline-none transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 p-1 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              aria-label="지우기"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Popular Keyword Chips */}
        <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-[11px] text-zinc-400 shrink-0 font-medium ml-1">추천 검색어:</span>
          {popularKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => setSearchQuery(kw)}
              className={`px-2.5 py-1 rounded-full text-xs transition-colors shrink-0 ${
                searchQuery === kw
                  ? 'bg-orange-500 text-white font-bold'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
              }`}
            >
              #{kw}
            </button>
          ))}
        </div>
      </div>

      {/* Title & Count Header */}
      <div className="mb-4 pt-1">
        <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100 leading-snug">
          {searchQuery ? (
            <>
              '<span className="text-orange-600 dark:text-orange-500">{searchQuery}</span>'에 대한 검색 결과
            </>
          ) : (
            '전체 레시피 탐색'
          )}
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          총 {filteredRecipes.length}개의 레시피를 찾았습니다
        </p>
      </div>

      {/* 2-Column Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              variant="grid"
              onToggleScrap={onToggleScrap}
              onClick={onSelectRecipe}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <Filter className="w-10 h-10 text-zinc-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">
            검색 결과가 없습니다
          </p>
          <p className="text-xs text-zinc-400 mt-1">
            다른 키워드로 검색해보시거나 검색어를 초기화해보세요.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 px-4 py-2 bg-orange-600 text-white text-xs font-bold rounded-full hover:bg-orange-700 active:scale-95 transition-all"
          >
            검색어 초기화
          </button>
        </div>
      )}
    </div>
  );
};
