import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/**
 * Clase guard para validar si el token es valido(Activo) para acceder a las rutas
 */
export class ValidarTokenGuard implements CanActivate, CanLoad {
  constructor( private authService: AuthService,
               private router: Router){

  }

  canActivate(): Observable<boolean> | boolean {
    // Descomentar al agregar un endpoint para validar el token y dar acceso a las rutas
     return this.authService.validarToken().pipe(
      tap( valid => {

        if ( !valid  ) {
            this.router.navigate(['/auth']);
        }
      })
    );
     return true;
  }
  canLoad(): Observable<boolean> |  boolean {

    // Descomentar al agregar un endpoint para validar el token y dar acceso a las rutas
    return this.authService.validarToken().pipe(
      tap( valid => {
        if ( !valid ) {

          this.router.navigateByUrl('/auth');
        }
      })
    );
    return true;
  }
}
