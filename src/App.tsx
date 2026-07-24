import React, { useState } from 'react';
import { INITIAL_RECIPES } from './data/recipes';
import { Recipe, TabType } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { SearchView } from './components/SearchView';
import { ScrapView } from './components/ScrapView';
import { MyPageView } from './components/MyPageView';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { AIRecipeModal } from './components/AIRecipeModal';

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  // Toggle scrap status for a recipe
  const handleToggleScrap = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isScrapped: !r.isScrapped } : r))
    );

    // Keep selectedRecipe updated if open
    if (selectedRecipe && selectedRecipe.id === id) {
      setSelectedRecipe((prev) => (prev ? { ...prev, isScrapped: !prev.isScrapped } : null));
    }
  };

  // Add generated AI recipe to state
  const handleAddGeneratedRecipe = (newRecipe: Recipe) => {
    setRecipes((prev) => [newRecipe, ...prev]);
    setSelectedRecipe(newRecipe);
  };

  // Header Title mapping per tab
  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'home':
        return '한국 음식';
      case 'search':
        return '레시피 검색';
      case 'scrap':
        return '스크랩';
      case 'mypage':
        return '마이페이지';
      default:
        return '한국 음식';
    }
  };

  const handleBackHeader = () => {
    if (activeTab !== 'home') {
      setActiveTab('home');
    }
  };

  const scrappedCount = recipes.filter((r) => r.isScrapped).length;

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 font-sans antialiased text-zinc-900 dark:text-zinc-100 flex flex-col justify-between">
      {/* Container Frame to mimic pristine mobile app viewport layout */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto bg-white dark:bg-zinc-900 min-h-screen shadow-2xl relative flex flex-col">
        {/* Sticky Header */}
        <Header
          title={getHeaderTitle()}
          onBack={handleBackHeader}
          showBack={activeTab !== 'home'}
          onSearchClick={() => setActiveTab('search')}
          onAIClick={() => setIsAIModalOpen(true)}
        />

        {/* Main View Area based on activeTab */}
        <main className="flex-1">
          {activeTab === 'home' && (
            <HomeView
              recipes={recipes}
              onToggleScrap={handleToggleScrap}
              onSelectRecipe={(r) => setSelectedRecipe(r)}
              onOpenAI={() => setIsAIModalOpen(true)}
            />
          )}

          {activeTab === 'search' && (
            <SearchView
              recipes={recipes}
              onToggleScrap={handleToggleScrap}
              onSelectRecipe={(r) => setSelectedRecipe(r)}
            />
          )}

          {activeTab === 'scrap' && (
            <ScrapView
              recipes={recipes}
              onToggleScrap={handleToggleScrap}
              onSelectRecipe={(r) => setSelectedRecipe(r)}
              onGoToHome={() => setActiveTab('home')}
            />
          )}

          {activeTab === 'mypage' && (
            <MyPageView
              scrappedCount={scrappedCount}
              allRecipes={recipes}
              onGoToTab={(tab) => setActiveTab(tab)}
              onSelectRecipe={(r) => setSelectedRecipe(r)}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          scrapCount={scrappedCount}
        />

        {/* Recipe Detail Modal */}
        {selectedRecipe && (
          <RecipeDetailModal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
            onToggleScrap={handleToggleScrap}
          />
        )}

        {/* AI Recipe Generator Modal */}
        <AIRecipeModal
          isOpen={isAIModalOpen}
          onClose={() => setIsAIModalOpen(false)}
          onAddGeneratedRecipe={handleAddGeneratedRecipe}
        />
      </div>
    </div>
  );
}
