import React from 'react';
import { User, Heart, Clock, Award, ChevronRight, Settings, Moon, Sun, BookOpen, ShieldCheck } from 'lucide-react';
import { Recipe } from '../types';

interface MyPageViewProps {
  scrappedCount: number;
  allRecipes: Recipe[];
  onGoToTab: (tab: 'home' | 'search' | 'scrap' | 'mypage') => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export const MyPageView: React.FC<MyPageViewProps> = ({
  scrappedCount,
  allRecipes,
  onGoToTab,
  onSelectRecipe,
}) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const scrappedItems = allRecipes.filter((r) => r.isScrapped);

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
      {/* User Profile Card */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl p-5 text-white shadow-md mb-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-white shrink-0">
            <User className="w-8 h-8" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold truncate">요리 마스터</h2>
              <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[10px] font-semibold uppercase">
                PRO CHEF
              </span>
            </div>
            <p className="text-xs text-orange-100 mt-0.5 truncate">soeseo555@gmail.com</p>
          </div>
        </div>

        {/* User Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-white/20 text-center text-xs">
          <div
            onClick={() => onGoToTab('scrap')}
            className="cursor-pointer hover:bg-white/10 py-1.5 rounded-xl transition-colors"
          >
            <span className="block text-lg font-black">{scrappedCount}</span>
            <span className="text-[11px] text-orange-100">스크랩 레시피</span>
          </div>
          <div className="py-1.5">
            <span className="block text-lg font-black">12</span>
            <span className="text-[11px] text-orange-100">완성한 요리</span>
          </div>
          <div className="py-1.5">
            <span className="block text-lg font-black">Lv. 3</span>
            <span className="text-[11px] text-orange-100">요리 레벨</span>
          </div>
        </div>
      </div>

      {/* Recent Scrapped Carousel Preview */}
      {scrappedItems.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>최근 스크랩한 요리</span>
            </h3>
            <button
              onClick={() => onGoToTab('scrap')}
              className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-0.5"
            >
              전체보기 <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {scrappedItems.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => onSelectRecipe(recipe)}
                className="shrink-0 w-36 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden cursor-pointer hover:shadow-xs transition-all"
              >
                <div className="h-24 w-full relative bg-zinc-100">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/60 text-white text-[9px] rounded font-medium">
                    {recipe.cookTimeMinutes}분
                  </span>
                </div>
                <div className="p-2">
                  <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 truncate">
                    {recipe.title}
                  </h4>
                  <p className="text-[10px] text-zinc-500 truncate mt-0.5">
                    {recipe.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Options List */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-800 overflow-hidden">
        <div
          onClick={toggleDarkMode}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">다크 모드</p>
              <p className="text-xs text-zinc-500">화면 테마 전환</p>
            </div>
          </div>
          <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
            {isDarkMode ? '켜짐' : '꺼짐'}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-orange-50 dark:bg-orange-950/40 flex items-center justify-center text-orange-600">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">선호 요리 및 식습관 설정</p>
              <p className="text-xs text-zinc-500">매운 맛, 채식, 알레르기 관리</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </div>

        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">최근 본 레시피 히스토리</p>
              <p className="text-xs text-zinc-500">지난 30일 간 조회 기록</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </div>

        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">요리 가이드 & 팁</p>
              <p className="text-xs text-zinc-500">기본 칼질, 육수 내기 노하우</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </div>
      </div>
    </div>
  );
};
