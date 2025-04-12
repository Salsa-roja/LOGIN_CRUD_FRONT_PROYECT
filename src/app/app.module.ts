import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app.component';
import { Globals } from './globals';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ContactosComponent } from './contactos/contactos.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterAuthComponent  } from './register-auth/register-auth.component';
import { CommonModule } from '@angular/common';
import { ContactosFormComponent } from './contactos-form/contactos-form.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    ContactosComponent,
    AuthComponent,
    RegisterAuthComponent ,
    ContactosFormComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule
  ],
  providers: [Globals,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
