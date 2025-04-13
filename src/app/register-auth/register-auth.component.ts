import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-crud-form',
  templateUrl: './register-auth.component.html',
  styleUrls: ['./register-auth.component.scss']
})

export class RegisterAuthComponent implements OnInit {
  public createForm: FormGroup;
  public passErrors: String[] = []
  public passLengthErr = ""

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar

  ) {
    this.createForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      pass_repeat: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
  public id?: number;

  ngOnInit(): void {

  }


  public crud() {
    this.router.navigate(['contactos']);
  }

  public onSubmit(): void {
 

    if (this.createForm.invalid) {
      this.openSnackBar('Completa todos los campos obligatorios', 'Cerrar');
      return;
    }
  
    const formValues = this.createForm.value;
  
    this.authService.register(formValues).subscribe({
      next: (result: any) => {
        if (!result.msg) {
          const loginParams = {
            email: formValues.email,
            password: formValues.password
          };
  
          this.authService.login(loginParams).subscribe((loginResult) => {
            this.openSnackBar(loginResult.message, 'Cerrar');
            if (loginResult.status === true) {
              this.router.navigate(['contactos']);
            }
          });
  
        } else {
          this.openSnackBar(result.msg, 'Error');
        }
      },
      error: () => {
        this.openSnackBar('Error en el registro', 'Cerrar');
      }
    });
  }
  
  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
    });
  }

  public passValid() {
    let pass = this.createForm.value["password"]
    this.passErrors = []
    if (pass.length >= 8) {
      if (pass === pass.toLowerCase()) this.passErrors.push("usa una letra mayúscula")
      if (pass === pass.toUpperCase()) this.passErrors.push("usa una letra minúscula")
      if (!/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(pass)) this.passErrors.push("usa un caracter especial")
      if (!/\d/.test(pass)) this.passErrors.push("usa un número")
      if (pass !== this.createForm.value["pass_repeat"]) this.passErrors.push("Las contraseñas deben coincidir")
      this.passLengthErr = ""
    } else {
      this.passLengthErr = "La contraseña debe tener al menos de 8 caracteres"
    }
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const passRepeat = control.get('pass_repeat');

    if (password && passRepeat && password.value !== passRepeat.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }


}
