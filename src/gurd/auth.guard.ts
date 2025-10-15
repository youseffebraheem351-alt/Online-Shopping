import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token === 'true') {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }

    // لو مش في المتصفح (مثلاً SSR)، أمنع الوصول
    return false;
  }
}
