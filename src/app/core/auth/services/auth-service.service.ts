import {computed, Injectable, signal} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, tap, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from "../../../shared/interfaces/user.interface";
import {environment} from "../../../../environments/environment.prod";

export interface AuthResponse {
  user: User;
  token: string;
}

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private apiUrl = environment.baseUrl;
  private readonly TOKEN_KEY = 'token';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  public baseUrl = environment.baseUrl;

  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  isAdmin = computed(() => this._user()?.rol.includes('admin') ?? false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // --- Comprobación de Estado ---

  /** Comprueba si existe un token en localStorage */
  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  /** Devuelve el estado de autenticación actual (síncrono) */
  public get isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /** Obtiene el token de autenticación */
  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /** Cierra la sesión del usuario */
  logout(): void {
    this.removeToken();
    this.isAuthenticatedSubject.next(false);
    console.log('Logged out');

    this.router.navigate(['/login']);

  }

  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }

    return this.http
      .get<AuthResponse>(`${this.baseUrl}/check-status`, {
         headers: {
           Authorization: `Bearer ${token}`,
         },
      })
      .pipe(
        map((resp) => this.handleAuthSuccess(resp)),
        catchError((error: any) => this.handleAuthError(error))
      );
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token);

    localStorage.setItem('token', token);

    return true;
  }

  private handleAuthError(error: any) {
    this.logout();
    return of(false);
  }

}
