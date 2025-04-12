import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Globals } from 'src/app/globals';
import { Observable, catchError, map } from 'rxjs';
import { UsuarioToken } from '../model/UsuarioToken';
import { HttpResponse } from '../model/HttpResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private global: Globals) { }

    public login(loginForm: any): Observable<UsuarioToken> {
      const url = `${this.global.apiUrl}api/login`;
    
      return this.http.post<UsuarioToken>(url, loginForm, {
        headers: this.global.httpOptions,
      }).pipe(
        map((result) => {
          if (result.status === true) {
            localStorage.setItem('token', result.token);
          }
          return result;
        }),
        catchError((error) => {
          throw error;
        })
      );
    }

  public register(params: any): Observable<HttpResponse> {
    const url = `${this.global.apiUrl}api/register`;
    return this.http.post<HttpResponse>(url, params, { headers: this.global.httpOptionsFormData });
  }
}
