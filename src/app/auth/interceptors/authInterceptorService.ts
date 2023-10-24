import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

/**
 * Clase Interceptor, agrega el token, content-type..., etc al Header de todas las peticiones POST, GET ....
 */
export class AuthInterceptorService implements HttpInterceptor {
  private baseUrl: string = environment.SERVER_URL_AUTH;
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let infoUfer;
    let token = null;

    if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) {
      token = localStorage.getItem('token');
    }
    let request = req;
    // Se agrega el token a todas las rutas con excepción de login
    if ( request.url !== `${ this.baseUrl }/login`) {
      if (token !== null) {
        request = req.clone({
          setHeaders: {
            authorization: `Bearer ${ token }`,
            'Content-Type': 'application/json',
            "Accept": 'application/json',


          },

        });
      }
    }

    return next.handle(request);
  }

}
