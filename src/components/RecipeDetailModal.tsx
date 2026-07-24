import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Share2, Clock, BarChart2, Star, Users, Check, Play, Pause, RotateCcw, ChefHat, Sparkles } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  onToggleScrap: (id: string, e: React.MouseEvent) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
  onToggleScrap,
}) => {
  if (!recipe) return null;

  const [servings, setServings] = useState<number>(recipe.servings || 2);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'steps'>('ingredients');
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  // Cooking Timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [activeTimerStep, setActiveTimerStep] = useState<number | null>(null);

  // Calculate multiplier for servings adjustment
  const servingRatio = servings / (recipe.servings || 2);

  // Helper to scale numeric amounts
  const scaleAmount = (amountStr: string) => {
    const num = parseFloat(amountStr);
    if (isNaN(num)) return amountStr;
    const scaled = (num * servingRatio).toFixed(1).replace(/\.0$/, '');
    return scaled;
  };

  const toggleIngredientCheck = (name: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const toggleStepComplete = (stepNum: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNum]: !prev[stepNum],
    }));
  };

  // Timer handlers
  const startStepTimer = (stepNum: number, minutes: number) => {
    setActiveTimerStep(stepNum);
    setTimerSeconds(minutes * 60);
    setIsTimerRunning(true);
  };

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: `${recipe.title} 레시피를 확인해보세요!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      alert('레시피 링크가 복사되었습니다!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Cover Image & Header Actions */}
        <div className="relative h-64 sm:h-72 w-full shrink-0 bg-zinc-100 dark:bg-zinc-800">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Top Bar Floating Buttons */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
              aria-label="닫기"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                aria-label="공유하기"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => onToggleScrap(recipe.id, e)}
                className="w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md flex items-center justify-center text-orange-600 active:scale-90 transition-transform shadow-md"
                aria-label="스크랩 토글"
              >
                <Heart
                  className={`w-5 h-5 ${
                    recipe.isScrapped ? 'fill-orange-500 text-orange-500' : 'text-zinc-600 dark:text-zinc-300'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Title Overlay Info */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-orange-600 text-white text-[11px] font-bold">
                {recipe.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold">
                {recipe.difficulty}
              </span>
              {recipe.calories && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/80 backdrop-blur-md text-white text-[11px] font-semibold">
                  {recipe.calories} kcal
                </span>
              )}
            </div>

            <h1 className="text-2xl font-black text-white leading-tight">
              {recipe.title}
            </h1>
            {recipe.subtitle && (
              <p className="text-xs text-zinc-200 mt-1 line-clamp-1 opacity-90">
                {recipe.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Recipe Meta Info Bar */}
        <div className="bg-zinc-50 dark:bg-zinc-800/60 px-5 py-3 border-b border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-300">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-orange-500" />
            <span>조리 {recipe.cookTimeMinutes}분</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-orange-500" />
            <span>난이도 {recipe.difficulty}</span>
          </div>
          {recipe.rating && (
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{recipe.rating} ({recipe.reviewCount || 100}+)</span>
            </div>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* Chef Tag if available */}
          {recipe.chef && (
            <div className="flex items-center gap-3 p-3 bg-orange-50/60 dark:bg-orange-950/20 rounded-2xl border border-orange-100 dark:border-orange-900/30">
              <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0">
                <ChefHat className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  {recipe.chef.name}
                </p>
                <p className="text-[11px] text-zinc-500 truncate">
                  {recipe.chef.title || '전문 셰프 가이드'}
                </p>
              </div>
            </div>
          )}

          {/* Servings Adjuster */}
          <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 p-3 rounded-2xl">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                기준 분량
              </span>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 px-3 py-1 rounded-xl shadow-2xs">
              <button
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="w-6 h-6 flex items-center justify-center font-bold text-zinc-600 dark:text-zinc-300 hover:text-orange-600 active:scale-90"
              >
                -
              </button>
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 min-w-[32px] text-center">
                {servings}인분
              </span>
              <button
                onClick={() => setServings(servings + 1)}
                className="w-6 h-6 flex items-center justify-center font-bold text-zinc-600 dark:text-zinc-300 hover:text-orange-600 active:scale-90"
              >
                +
              </button>
            </div>
          </div>

          {/* Active Cooking Timer Bar if running */}
          {activeTimerStep !== null && (
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-3.5 rounded-2xl shadow-md flex items-center justify-between">
              <div>
                <p className="text-[10px] text-orange-100 uppercase font-semibold">
                  Step {activeTimerStep} 타이머 진행 중
                </p>
                <p className="text-xl font-black font-mono tracking-wider">
                  {formatTimer(timerSeconds)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setActiveTimerStep(null);
                  }}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Tabs: Ingredients vs Steps */}
          <div className="flex border-b border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-colors ${
                activeTab === 'ingredients'
                  ? 'border-orange-600 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-600'
              }`}
            >
              재료 목록 ({recipe.ingredients.length})
            </button>
            <button
              onClick={() => setActiveTab('steps')}
              className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-colors ${
                activeTab === 'steps'
                  ? 'border-orange-600 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-600'
              }`}
            >
              조리 순서 ({recipe.instructions.length}단계)
            </button>
          </div>

          {/* Tab 1: Ingredients List */}
          {activeTab === 'ingredients' && (
            <div className="space-y-2">
              <p className="text-[11px] text-zinc-400 mb-2">
                체크박스를 눌러 준비 완료한 재료를 표시해보세요.
              </p>
              {recipe.ingredients.map((ing, idx) => {
                const isChecked = checkedIngredients[ing.name];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleIngredientCheck(ing.name)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-orange-50/50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900/40 opacity-70'
                        : 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200/60 dark:border-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-orange-600 text-white'
                            : 'border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          isChecked
                            ? 'line-through text-zinc-400'
                            : 'text-zinc-900 dark:text-zinc-100'
                        }`}
                      >
                        {ing.name}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                      {scaleAmount(ing.amount)} {ing.unit}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2: Instruction Steps */}
          {activeTab === 'steps' && (
            <div className="space-y-4">
              {recipe.instructions.map((step) => {
                const isDone = completedSteps[step.stepNumber];
                return (
                  <div
                    key={step.stepNumber}
                    className={`p-4 rounded-2xl border transition-all ${
                      isDone
                        ? 'bg-zinc-100 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 opacity-60'
                        : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-orange-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                          {step.stepNumber}
                        </span>
                        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                          {step.stepNumber}단계 조리법
                        </h4>
                      </div>

                      <button
                        onClick={() => toggleStepComplete(step.stepNumber)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                          isDone
                            ? 'bg-orange-600 text-white border-orange-600'
                            : 'text-zinc-500 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100'
                        }`}
                      >
                        {isDone ? '완료됨' : '완료 표시'}
                      </button>
                    </div>

                    <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed mb-3">
                      {step.description}
                    </p>

                    {step.tip && (
                      <div className="bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-xl border border-amber-200/60 dark:border-amber-900/40 text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-1.5 mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>팁: {step.tip}</span>
                      </div>
                    )}

                    {step.timerMinutes && (
                      <button
                        onClick={() => startStepTimer(step.stepNumber, step.timerMinutes!)}
                        className="mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 text-xs font-bold hover:bg-orange-200 active:scale-95 transition-all"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{step.timerMinutes}분 타이머 시작</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
