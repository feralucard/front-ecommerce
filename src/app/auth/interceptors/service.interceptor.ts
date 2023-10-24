import {Injectable} from '@angular/core';
import {HttpHandler, HttpRequest, HttpInterceptor} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor( private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return next.handle(req).pipe(
      catchError(error => {
        let errorMessage = '';
        if (error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          // backend error
          errorMessage = `Server-side error: ${error.status} ${error.message}`;
          if (error.status === 401) {

            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate(['/auth']);
              //window.location.reload();
          });
          } else if (error.status === 500) {

          }

        }

        return throwError(errorMessage);
      })
    );
  }
}
