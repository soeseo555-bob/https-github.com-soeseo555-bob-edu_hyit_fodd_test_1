export type CategoryType = '전체' | '한식' | '양식' | '간편식' | '디저트' | '중식' | '일식';

export type DifficultyLevel = '쉬움' | '매우 쉬움' | '보통' | '중급' | '상급' | 'Easy' | 'Medium' | 'Pro' | 'Expert';

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
  isOptional?: boolean;
}

export interface InstructionStep {
  stepNumber: number;
  description: string;
  timerMinutes?: number;
  tip?: string;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  category: CategoryType;
  cookTimeMinutes: number;
  difficulty: DifficultyLevel;
  rating?: number;
  reviewCount?: number;
  tags: string[];
  isTodaySpecial?: boolean;
  isRecommended?: boolean;
  isScrapped: boolean;
  chef?: {
    name: string;
    title?: string;
    avatarUrl?: string;
  };
  servings: number;
  calories?: number;
  ingredients: Ingredient[];
  instructions: InstructionStep[];
}

export type TabType = 'home' | 'search' | 'scrap' | 'mypage';
