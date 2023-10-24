import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  isOperative: boolean = false;
  constructor(private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private dialogRef: MatDialog,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar) {
      this.ngZone.run(() => {
        ;
      });
    }
    ngOnInit(): void {
      this.generateForm();
      this.dialogRef.closeAll();
    }
    public onLogin() {
      if (this.loginForm.valid) {
          this.authService.login(this.loginForm.value).subscribe( (data) => {
            if (data) {
              this.router.navigateByUrl('/ecommerce');
            } else  {
              this.openSnackBar('El correo eléctronico o el password son incorrectos','Aceptar');

            }

          }, (err) => {
            this.openSnackBar('El correo eléctronico o el password son incorrectos','Aceptar');
            console.error(err);
          }
      );
      } else  {
        this.openSnackBar('Ingresa todos los datos','Aceptar');
      }

    }

    private openSnackBar(message: string, action: string) {
      console.log("entra")
      this._snackBar.open(message, action, {
        duration: 1.2 * 1000,
      });
    }

    private generateForm(): void {
      this.loginForm = this.fb.group({
        username: ['admin', [Validators.required]],
        password: ['123456789', [Validators.required]],
        email: ['admin@correo.com', [Validators.required]],
      });

    }

}
