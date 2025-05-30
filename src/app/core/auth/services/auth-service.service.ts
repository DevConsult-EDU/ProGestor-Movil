import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, tap, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
//import {environment} from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private apiUrl = environment.baseUrl;
  private readonly TOKEN_KEY = 'token';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

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

  // --- Helpers para el Token ---

  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

}
