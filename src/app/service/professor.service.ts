import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Professor } from '../models/professor.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  
private fullUrl = environment.apiUrl + "/api/professors";
  constructor(private http: HttpClient) {}

  getList(): Observable<any> {
    return this.http.get<any>(`${this.fullUrl}`);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.fullUrl}${id}`);
  }
  
  create(professor: Professor): Observable<any> {
    return this.http.post<any>(`${this.fullUrl}`, professor);
  }

  update(idProfesor: string, professor: Professor): Observable<Professor> {
    return this.http.put<Professor>(`${this.fullUrl}/${idProfesor}`, professor);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.fullUrl}/${id}`);
  }

}