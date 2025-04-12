import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent {
  public loginForm: FormGroup;
  public errMessage: string = "";
  loginActivo: boolean = false;
  params: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  public singIn() {
    if (this.loginForm.invalid) {
      this.errMessage = "Debes completar todos los campos";
      return;
    }

    this.params = { ...this.loginForm.value };

    this.authService.login(this.params).subscribe(
      (result) => {
        this.openSnackBar(result.message, 'Cerrar');
        if (result.status === true) {
          this.loginActivo = true;
          this.router.navigate(['contactos']);
        }
      },
      (error) => {
        switch (error.status) {
          case 500:
            this.errMessage = "La conexión con el servidor ha fallado (500)";
            break;
          case 400:
            this.errMessage = error.error.message || "Usuario o contraseña incorrectos";
            break;
          case 0:
            this.errMessage = "Error desconocido, intente más tarde";
            break;
          default:
            this.errMessage = "Error inesperado: " + error.status;
        }
      }
    );
  }

  public logOut() {
    localStorage.clear();
    this.loginActivo = false;
  }

  public registrarse() {
    this.router.navigate(['register-auth']);
  }
  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
    });
  }
}
