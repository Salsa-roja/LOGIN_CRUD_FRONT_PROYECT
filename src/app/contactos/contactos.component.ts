import { Component, OnInit } from '@angular/core';
import { ContactoService } from '../service/contacto.service';
import { Subject } from 'rxjs';
import { Contacto } from '../model/Contacto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {

  contactos: Contacto[] = [];
  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private contactoService: ContactoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarContactos();
  }

  private cargarContactos(): void {
    this.contactoService.getContactos().subscribe({
      next: (result: Contacto[]) => {
        this.contactos = result;
      },
      error: () => {
        this.openSnackBar('Ocurrió un error al obtener los contactos', 'Cerrar');
      }
    });
  }

  public irAFormulario(id: number): void {
    this.router.navigate([id === 0 ? 'create' : `update/${id}`]);
  }

  public eliminar(contacto: Contacto): void {
    this.contactoService.deleteContacto(contacto.id).subscribe({
      next: () => {
        this.openSnackBar('Usuario eliminado correctamente', 'Cerrar');
        this.cargarContactos();
      },
      error: () => {
        this.openSnackBar('Error al eliminar el contacto', 'Cerrar');
      }
    });
  }

  public logOut(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
