
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { UserRol } from '../models/userRol.interface';

@Injectable({
  providedIn: 'root'
})
export class UserRolService {
  
private fullUrl = environment.apiUrl + "/api/userRoles";
  constructor(private http: HttpClient) {}

  getList(): Observable<any> {
    return this.http.get<any>(`${this.fullUrl}`);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.fullUrl}${id}`);
  }
  
  create(userRol: UserRol): Observable<any> {
    return this.http.post<any>(`${this.fullUrl}`, userRol);
  }

  update(idUserRol: string, userRol: UserRol): Observable<UserRol> {
    return this.http.put<UserRol>(`${this.fullUrl}/${idUserRol}`, userRol);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.fullUrl}/${id}`);
  }

}