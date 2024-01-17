import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  private currentTheme: string = 'light';

  constructor() {
    this.loadTheme();
  }

  private loadTheme(): void {
    this.currentTheme = localStorage.getItem(this.THEME_KEY) || 'light';
    this.setTheme(this.currentTheme);
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(this.currentTheme);
    localStorage.setItem(this.THEME_KEY, this.currentTheme);
  }

  private setTheme(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
