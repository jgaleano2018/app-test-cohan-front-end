
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../models/rol.interface';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  
private fullUrl = environment.apiUrl + "/api/roles";
  constructor(private http: HttpClient) {}

  getList(): Observable<any> {
    return this.http.get<any>(`${this.fullUrl}`);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.fullUrl}${id}`);
  }
  
  create(rol: Rol): Observable<any> {
    return this.http.post<any>(`${this.fullUrl}`, rol);
  }

  update(idRol: string, rol: Rol): Observable<Rol> {
    return this.http.put<Rol>(`${this.fullUrl}/${idRol}`, rol);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.fullUrl}/${id}`);
  }

}