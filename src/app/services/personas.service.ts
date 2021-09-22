import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPersonas } from '../personas/personas';

@Injectable({
  providedIn: 'root'
})
export class PersonasService{
  _apiUrl='http://localhost:8000/api/personas';
  constructor( private http: HttpClient){}


  listaPersonas(): Observable<IPersonas[]>{
    return this.http.get<IPersonas[]>(this._apiUrl);
  }


  agregarPersona(persona:IPersonas): Observable<IPersonas[]>{
    return this.http.post<IPersonas[]>(this._apiUrl,persona);
  }

  editarPersona(persona:IPersonas): Observable<IPersonas[]>{
    return this.http.put<IPersonas[]>(`${this._apiUrl}/${persona.id}`,persona);
  }
  eliminarPersona(persona:IPersonas): Observable<boolean>{
    return this.http.delete<boolean>(`${this._apiUrl}/${persona.id}`);
  }

}
