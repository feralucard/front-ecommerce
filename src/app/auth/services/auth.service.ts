

import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of as observableOf } from 'rxjs';
import { of, Observable } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { AuthResponse, User } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})

/**
 * Services para el login, logOut, validacion de token, validacion de rol etc.
 */
export class AuthService {

  private baseUrl: string = environment.SERVER_URL_AUTH;
​  private username = '';
  private password = '';

​
  constructor(
    private http: HttpClient,
    private  router: Router,
  ) {
  }

  private getBasicAuthHeader(): HttpHeaders {
    const authString = `${this.username}:${this.password}`;
    const authHeader = btoa(authString);
    return new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: `Basic ${authHeader}`
    });
  }


​  /**
   * Metodo utilizado para el login del usuario al sistema, guarda el token e información importante en localStorage
​   *
​   * @param data Datos del usuario
​   * @returns Respuesta del usuario
​   */
  login( data: User ) {
    this.username = data.username;
    this.password = data.password
    const url  = `${ this.baseUrl }/auth/login`;
    return this.http.post<AuthResponse>( url, data)
      .pipe(

        tap( resp => {

          let token = resp.token;
          token = token?.replace('Bearer','')!;
          token = token.trim();
          let data = {
            token: token,
          }
          localStorage.setItem('token',  token );


        }),
        map( resp => true),
        catchError( err => of(err.error) )
      );
  }

  /**
   * Metodo para eliminar el logeo del usuario al sistema
   */
  public logOut(): void {
    localStorage.clear();
    this.router.navigateByUrl('/auth');
  }


 /**
 * Metodo para validar si el token aun se encuentra valido o ya expiro
 * @returns
 */
  validarToken(): Observable<boolean> {
    if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) {
      return observableOf(true);
    } else return observableOf(false);
  }

 getToken(): Observable<String> {
    if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) {
      return observableOf(localStorage.getItem('token') + " ");
    } else return observableOf("");
  }
}
