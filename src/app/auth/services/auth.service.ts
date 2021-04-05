import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) {}


  registro(name:string, email:string, password:string){

    const url = `${this.baseUrl}/auth/new`;
    const body = { email, password, name };

    // Sin mutar return this.http.post<AuthResponse>(url, body);

    return this.http.post<AuthResponse>(url, body).pipe(
      //2.- segundo
      tap(({ok, token}) => {
        // console.log(resp);
        if (ok) {
          localStorage.setItem('token', token!);

          // this._usuario = {
          //   name: resp.name!,
          //   uid: resp.uid!,
          // };
        }
      }),

      //1.- primero
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );

  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth`;
    const body = { email, password };

    // Sin mutar return this.http.post<AuthResponse>(url, body);

    return this.http.post<AuthResponse>(url, body).pipe(
      //2.- segundo
      tap((resp) => {
        // console.log(resp);
        if (resp.ok) {
          localStorage.setItem('token', resp.token!);

          // this._usuario = {
          //   name: resp.name!,
          //   uid: resp.uid!,
          // };
        }
      }),

      //1.- primero
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  // validarToken(){
  //     const url = `${this.baseUrl}/auth/renew`;
  //     const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');

  //   return this.http.get(url, { headers });
  // }
  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http
      .get<AuthResponse>(url, { headers })
      .pipe(
        map((resp) => {
          localStorage.setItem('token', resp.token!);

          this._usuario = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email!
          };
          return resp.ok;
        }),
        catchError((err) => of(false))
      );
  }

  logout(){
    localStorage.clear();
  }

}
