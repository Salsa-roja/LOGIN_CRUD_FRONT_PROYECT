import { Component, OnInit } from '@angular/core';
import { ContactoService } from '../service/contacto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contacto } from '../model/Contacto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crud-form',
  templateUrl: './contactos-form.component.html',
  styleUrls: ['./contactos-form.component.scss']
})
export class ContactosFormComponent implements OnInit {

  formContacto!: FormGroup;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contactoService: ContactoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formContacto = this.fb.group({
      id: [],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      notes: ['']
    });

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.contactoService.getDetailContacto(id).subscribe(contacto => {
        this.formContacto.patchValue(contacto);
      });
    }
  }

  onSubmit() {
    if (this.formContacto.invalid) return;

    this.contactoService.saveContacto(this.formContacto.value).subscribe(() => {
      this.snackBar.open('Contacto guardado correctamente', 'Cerrar', { duration: 2000 });
      this.router.navigate(['/contactos']);
    });
  }

  cancelar() {
    this.router.navigate(['/contactos']);
  }
}
