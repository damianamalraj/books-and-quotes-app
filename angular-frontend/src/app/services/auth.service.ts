import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private jwtHelper = new JwtHelperService();
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.isLoggedInSubject.next(this.isAuthenticated());
  }

  register(user: User) {
    return this.http.post(`${this.apiUrl}/Auth/register`, user, {
      responseType: 'text',
    });
  }

  login(user: User) {
    return this.http
      .post(`${this.apiUrl}/Auth/login`, user, {
        responseType: 'text',
      })
      .pipe(
        map((response: string) => {
          sessionStorage.setItem('authToken', response);

          this.isLoggedInSubject.next(true);
          return response;
        })
      );
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('authToken');

    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  signout() {
    sessionStorage.removeItem('authToken');
    this.isLoggedInSubject.next(false);
  }
}
