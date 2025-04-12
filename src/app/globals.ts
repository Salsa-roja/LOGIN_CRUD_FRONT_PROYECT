import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable()
export class Globals {

  apiUrl = `${environment.hostname}/`;

  

  get httpOptions(): any {
    let header = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : '',
        
      }
    );
    return header;
  }

  get httpOptionsFormData(): any {
    let header = new HttpHeaders(
      {
        'token': localStorage.getItem('token') ?? '',
        'Authorization': localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : '',
      }
    );
    return header;
  }

  get httpOptionsAsync(): any {
    return { headers: new HttpHeaders({}), reportProgress: true };
    // return  { headers: new HttpHeaders({ 'token': this.storage.get('token') }), reportProgress: true };
  }
}
