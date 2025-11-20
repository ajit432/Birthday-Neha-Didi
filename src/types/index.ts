export interface ThemeType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export interface WishesConfig {
  name: string;
  age?: number;
  message: string;
  subMessage?: string;
}