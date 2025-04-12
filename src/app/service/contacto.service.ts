import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';
import { Observable } from 'rxjs';
import { Contacto } from '../model/Contacto';
import { HttpResponse } from '../model/HttpResponse';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(
    private http: HttpClient,
    private global: Globals
  ) {}

  public getContactos(): Observable<Contacto[]> {
    const url = `${this.global.apiUrl}api/list`;
    return this.http.get<Contacto[]>(url, { headers: this.global.httpOptions });
  }

  public saveContacto(contacto: Contacto): Observable<HttpResponse> {
    const url = `${this.global.apiUrl}api/saveOrUpdate`;
    return this.http.post<HttpResponse>(url, contacto, { headers: this.global.httpOptionsFormData });
  }

  public deleteContacto(contactoId: number): Observable<any> {
    const url = `${this.global.apiUrl}api/delete/${contactoId}`;
    return this.http.delete(url, { headers: this.global.httpOptions });
  }

  public getDetailContacto(id: number): Observable<Contacto> {
    const url = `${this.global.apiUrl}api/detail/${id}`;
    return this.http.get<Contacto>(url, { headers: this.global.httpOptions });
  }
}
