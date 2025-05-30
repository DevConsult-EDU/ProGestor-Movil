import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {Observable} from "rxjs";

export interface Token {
  id: string;
  token: string;
  rol: string;
  name: string;
}

export interface login {
  email: string | undefined,
  password: string | undefined,
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public http = inject(HttpClient)

  public apiUrl = environment.baseUrl;

  login(data: login): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/login`, data)
  }

}
