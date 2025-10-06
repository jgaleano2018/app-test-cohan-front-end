import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {
  
private fullUrl = environment.apiUrl + "/api/loginUser";
  constructor(private http: HttpClient) {}

  getList(): Observable<any> {
    return this.http.get<any>(`${this.fullUrl}`);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.fullUrl}${id}`);
  }
  
  create(user: User): Observable<any> {
    return this.http.post<any>(`${this.fullUrl}`, user);
  }

  update(idUser: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.fullUrl}/${idUser}`, user);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.fullUrl}/${id}`);
  }

}